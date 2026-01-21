const axios = require('axios');
const crypto = require('crypto');

const createCryptomusInvoice = async (amount, currency) => {
  const apiKey = process.env.CRYPTOMUS_API_KEY.trim(); // PRIVATE API KEY
  const merchant = process.env.CRYPTOMUS_MERCHANT.trim(); // MERCHANT UUID

  const payload = {
    amount: amount.toString(),
    currency: currency.toUpperCase(),
    order_id: Math.random().toString(36).substring(2, 10),
    lifetime: 3600,
    url_callback: 'https://uhqsmm.com/api/payments/cryptomus/callback',
    url_success: 'https://uhqsmm.com/payment/success'
  };
  const payloadString = JSON.stringify(payload); // JSON string
const base64 = Buffer.from(payloadString).toString('base64'); // encode once
const sign = crypto.createHash('md5').update(base64 + apiKey).digest('hex');


  console.log('Payload String:', payloadString);
  console.log('Base64 Payload:', base64);
  console.log('Sign:', sign);
  console.log('Merchant UUID:', merchant);



  try {
    const { data } = await axios.post(
      'https://api.cryptomus.com/v1/payment',
       payload,
      {
        headers: {
          merchant,
          sign,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Response:', data);
    return data;
  } catch (error) {
    console.error('❌ Cryptomus error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { createCryptomusInvoice }