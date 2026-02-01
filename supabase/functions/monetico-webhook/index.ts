// Follows the Monetico CM-CIC HMAC-SHA1 algorithm for Webhook (Interface Retour)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: Convert hex string to Uint8Array
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

// Helper: Compute HMAC-SHA1
async function computeHmacSha1(key: Uint8Array, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    keyData,
    encoder.encode(data)
  );
  
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper: Get the usable key from the long EPT key
function getUsableKey(eptKey: string): string {
  // Case 1: Raw Hex Key (80 chars / 40 bytes) - Monetico V3 HMAC-SHA1
  if (eptKey.length > 40) {
    return eptKey;
  }
  
  // Case 2: Old "Version 1" Key (40 chars / 20 bytes) - needs XOR transformation
  const hexStrKey = eptKey.slice(0, 38);
  const hexFinal = eptKey.slice(38, 40) + "00";
  const charArrayKey = hexToBytes(hexStrKey);
  const charFinal = hexToBytes(hexFinal);
  const usableKey = new Uint8Array(20);
  for (let i = 0; i < 20; i++) {
    usableKey[i] = charArrayKey[i] ^ charFinal[0];
  }
  return Array.from(usableKey)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Monetico sends data as application/x-www-form-urlencoded
    const formData = await req.formData();
    const data: any = {};
    formData.forEach((value, key) => (data[key] = value));

    console.log("Received Webhook Data:", JSON.stringify(data));

    const {
      TPE, date, montant, reference, 'texte-libre': texteLibre, 
      version, 'code-retour': codeRetour, cvx, vld, brand, status3ds, 
      numauto, motifrefus, originecb, bincb, hpancb, ipclient, 
      originetr, veres, pares, MAC
    } = data;

    // 1. Verify Signature
    const SECRET_KEY = Deno.env.get('MONETICO_SECRET_KEY');
    if (!SECRET_KEY) {
      console.error('Missing MONETICO_SECRET_KEY');
      return new Response("version=2\ncdr=1\n", { headers: { 'Content-Type': 'text/plain' } });
    }

    const usableKey = getUsableKey(SECRET_KEY);
    
    // Construct the string to hash (Order is critical!)
    // TPE*date*montant*reference*texte-libre*version*code-retour*cvx*vld*brand*status3ds*numauto*motifrefus*originecb*bincb*hpancb*ipclient*originetr*veres*pares*
    const fields = [
      TPE, date, montant, reference, texteLibre, version, codeRetour, 
      cvx, vld, brand, status3ds, numauto, motifrefus, originecb, 
      bincb, hpancb, ipclient, originetr, veres, pares
    ];
    
    // Handle undefined/null by replacing with empty string
    const stringToHash = fields.map(f => f === undefined || f === null ? '' : f).join('*') + '*';
    
    const computedMac = await computeHmacSha1(hexToBytes(usableKey), stringToHash);

    if (computedMac.toLowerCase() !== MAC.toLowerCase()) {
      console.error('MAC verification failed', { computedMac, receivedMac: MAC });
      return new Response("version=2\ncdr=1\n", { headers: { 'Content-Type': 'text/plain' } });
    }

    // 2. Process Payment
    // 'payetest' or 'paiement' means success
    const isSuccess = codeRetour.toLowerCase() === 'paiement' || codeRetour.toLowerCase() === 'payetest';
    const orderId = reference;

    // Initialize Supabase Admin Client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (isSuccess) {
      // Update Order to Paid
      const { error } = await supabase
        .from('orders')
        .update({ 
          payment_status: 'paid',
          status: 'confirmed' // Or whatever your workflow is
        })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order:', error);
        // We still return success to Monetico because we received the payment notification
        // but we should probably alert someone (email?)
      } else {
        console.log(`Order ${orderId} marked as paid.`);
      }
    } else {
      // Payment Failed / Refused
      console.log(`Payment refused for order ${orderId}: ${motifrefus}`);
       await supabase
        .from('orders')
        .update({ 
          payment_status: 'failed', // or whatever status you use
        })
        .eq('id', orderId);
    }

    // 3. Acknowledge Receipt
    // cdr=0 means OK
    return new Response("version=2\ncdr=0\n", { headers: { 'Content-Type': 'text/plain' } });

  } catch (err) {
    console.error('Webhook Error:', err);
    return new Response("version=2\ncdr=1\n", { headers: { 'Content-Type': 'text/plain' } });
  }
});
