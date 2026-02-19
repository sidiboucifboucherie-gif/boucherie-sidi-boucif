// Follows the Monetico CM-CIC HMAC-SHA1 algorithm
// Documentation: https://www.monetico-paiement.fr/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode } from "https://deno.land/std@0.177.0/encoding/base64.ts";
// import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"; // Use global crypto instead

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: Convert hex string to Uint8Array
function hexToBytes(hex: string): Uint8Array {
  // Ensure we have a valid hex string length (even)
  if (hex.length % 2 !== 0) {
    // If odd, prepend 0? Or just warn?
    // console.warn("Odd hex length");
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

// Helper: Get the usable key from the long EPT key
function getUsableKey(eptKey: string): string {
  // Clean the key of any non-hex characters just in case, 
  // BUT only if it looks like the user pasted garbage. 
  // If it's the V1 key with weird chars, we might break it.
  // However, for Case 1 (Long Key), it should be pure hex.
  
  // Case 1: Raw Hex Key (80 chars / 40 bytes) - Monetico V3 HMAC-SHA1
  // The long key provided by user was 80 chars.
  if (eptKey.length >= 64) {
    return eptKey;
  }
  
  // Case 2: Old "Version 1" Key (40 chars / 20 bytes) - needs XOR transformation
  // DISABLED: We suspect the Reference/Text format was the issue.
  // We are reverting to RAW KEY with the now-sanitized data.
  /*
  if (eptKey.length >= 38 && eptKey.length <= 42) {
    const hexStrKey = eptKey.slice(0, 38);
    const hexFinal = eptKey.slice(38, 40) + "00";
    
    const charArrayKey = hexToBytes(hexStrKey); // 19 bytes
    const charFinal = hexToBytes(hexFinal);     // 2 bytes
    
    const usableKey = new Uint8Array(20);
    // XOR the first 19 bytes with the 20th byte
    for (let i = 0; i < 19; i++) {
      usableKey[i] = charArrayKey[i] ^ charFinal[0];
    }
    // The last byte remains as is
    usableKey[19] = charFinal[0];
    
    return Array.from(usableKey)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  */
  
  // Fallback: Return as is
  return eptKey;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, amount, email, origin, formData } = await req.json();

    if (!orderId || !amount || !email) {
      throw new Error('Missing required fields: orderId, amount, or email');
    }

    // Use provided origin or fallback to production URL
    const baseUrl = origin || "https://boucherie-sidi-boucif.fr";

    // 1. Configuration
    const TPE = "7675540";
    const CODE_SOCIETE = "boucheries"; 
    const VERSION = "3.0";
    const DEVISE = "EUR";
    const URL_RETOUR_OK = `${baseUrl}/payment/success`;
    const URL_RETOUR_ERR = `${baseUrl}/payment/error`;
    
    // Retrieve Secret Key from Environment Variable
    let SECRET_KEY = Deno.env.get('MONETICO_SECRET_KEY');
    
    if (!SECRET_KEY) {
      throw new Error('Server misconfiguration: Missing Payment Key (MONETICO_SECRET_KEY)');
    }

    // Clean key: remove "VERSION 1" prefix, spaces, newlines if present
    SECRET_KEY = SECRET_KEY
      .replace(/VERSION \d+ /i, '')
      .replace(/HMAC-SHA1/i, '')
      .replace(/\s/g, '');

    // Monetico Reference: MUST be max 12 chars alphanumeric
    // We take the first 12 chars of the order ID (UUID)
    // FIX: Remove hyphens and ensure alphanumeric
    const reference = String(orderId).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12).toUpperCase();

    // 2. Format Data
    // Date format: dd/mm/yyyy:HH:mm:ss
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}:${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    // Amount format: 12.50EUR
    const formattedAmount = `${parseFloat(amount).toFixed(2)}${DEVISE}`;

    // 3. Construct String to Sign (Phase 1)
    // Sanitize texte-libre: no spaces, just alphanumeric. 
    // We use "Order_" + first 8 chars of UUID to keep it short and safe.
    const texteLibre = `Order_${orderId.substring(0, 8)}`;
    const lgue = "FR";
    const mail = email;

    // NEW FORMAT PER SUPPORT EMAIL (Alphabetical sort + TPE first)
    // TPE=...*contexte_commande=...*date=...*lgue=...*mail=...*montant=...*reference=...*societe=...*texte-libre=...*version=...
    const billingAddress = {
        billing: {
            addressLine1: formData?.address || "1 rue de test",
            city: formData?.city || "Paris",
            postalCode: formData?.postalCode || "75001",
            country: "FR"
        }
    };
    // Base64 encode the JSON string for contexte_commande
    const contexteCommandeBase64 = encode(JSON.stringify(billingAddress));

    const fieldsToSign: Record<string, string> = {
        TPE: TPE,
        "contexte_commande": contexteCommandeBase64,
        date: date,
        montant: formattedAmount,
        reference: reference,
        "texte-libre": texteLibre,
        version: VERSION,
        lgue: lgue,
        societe: CODE_SOCIETE,
        mail: mail
    };

    // 1. TPE First
    let dataToSign = `TPE=${fieldsToSign.TPE}`;

    // 2. Others sorted alphabetically by key
    const otherKeys = Object.keys(fieldsToSign).filter(k => k !== 'TPE').sort();

    for (const key of otherKeys) {
        dataToSign += `*${key}=${fieldsToSign[key]}`;
    }

    // 4. Calculate MAC
    const usableKeyHex = getUsableKey(SECRET_KEY);
    const usableKeyBytes = hexToBytes(usableKeyHex);
    const mac = await computeHmacSha1(usableKeyBytes, dataToSign);

    // Debugging: Log key details (masked) and string to sign
    console.log("DEBUG MONETICO V3:");
    console.log("Usable Key Hex:", usableKeyHex);
    console.log("Data To Sign:", dataToSign);
    console.log("Calculated MAC:", mac);

    // 5. Return Form Data
    return new Response(
      JSON.stringify({
        success: true,
        actionUrl: "https://p.monetico-services.com/paiement.cgi",
        debug: {
            stringToSign: dataToSign,
            mac: mac.toLowerCase(),
            keyUsed: usableKeyHex
        },
        fields: {
          ...fieldsToSign,
          MAC: mac.toLowerCase()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Error:', err);
    // Return 200 with error details to allow frontend to display the specific message
    return new Response(JSON.stringify({ 
      success: false, 
      error: err.message,
      details: err.stack 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
