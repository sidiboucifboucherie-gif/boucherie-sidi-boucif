// Follows the Monetico CM-CIC HMAC-SHA1 algorithm
// Documentation: https://www.monetico-paiement.fr/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: Convert hex string to Uint8Array
function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    console.warn("Warning: Hex key length is odd, this might cause issues.");
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const byteVal = parseInt(hex.substr(i * 2, 2), 16);
    bytes[i] = isNaN(byteVal) ? 0 : byteVal;
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
  
  // Convert buffer to hex string
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, amount, email, origin } = await req.json();

    if (!orderId || !amount || !email) {
      throw new Error('Missing required fields: orderId, amount, or email');
    }

    const baseUrl = origin || "https://boucherie-sidi-boucif.fr";

    // 1. Configuration
    const TPE = "7675540";
    const CODE_SOCIETE = "boucheries"; 
    const VERSION = "3.0";
    const DEVISE = "EUR";
    
    // Retrieve Secret Key
    let SECRET_KEY = Deno.env.get('MONETICO_SECRET_KEY');
    if (!SECRET_KEY) {
      throw new Error('Server misconfiguration: Missing Payment Key');
    }

    // Clean key: remove whitespace/formatting. 
    // For V3, we assume the key in the dashboard is the raw hex key.
    SECRET_KEY = SECRET_KEY.replace(/\s/g, '').replace(/VERSION\d+/, '').replace(/HMAC-SHA1/, '');

    // 2. Format Data
    // Reference: Max 12 chars, alphanumeric
    const reference = String(orderId).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12).toUpperCase();

    // Date: dd/mm/yyyy:HH:mm:ss
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    // Note: getMonth() is 0-indexed, so we add 1
    const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}:${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    // Amount: 12.50EUR (Must include currency)
    const formattedAmount = `${parseFloat(amount).toFixed(2)}${DEVISE}`;

    // Text-free: Alphanumeric safe string
    const texteLibre = `Order_${orderId.substring(0, 8)}`;
    const lgue = "FR";
    const mail = email;

    // 3. Construct String to Sign (Phase 1)
    // STRICT ORDER: TPE * date * montant * reference * texte-libre * version * lgue * societe * mail
    // STOP HERE. Do not add extra fields (like nbrechiffre) if you aren't sending them in the form.
    const dataToSign = [
      TPE,
      date,
      formattedAmount,
      reference,
      texteLibre,
      VERSION,
      lgue,
      CODE_SOCIETE, 
      mail
    ].join('*');

    // 4. Calculate MAC
    // Convert the HEX key string to a Byte Array (Buffer)
    const keyBytes = hexToBytes(SECRET_KEY);
    const mac = await computeHmacSha1(keyBytes, dataToSign);

    // 5. Return Form Data
    return new Response(
      JSON.stringify({
        success: true,
        actionUrl: "https://p.monetico-services.com/test/paiement.cgi",
        fields: {
          TPE,
          date,
          montant: formattedAmount,
          reference,
          "texte-libre": texteLibre,
          version: VERSION,
          lgue,
          societe: CODE_SOCIETE,
          mail,
          MAC: mac.toLowerCase() // Monetico expects the form value to be lowercase
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      error: err.message 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});