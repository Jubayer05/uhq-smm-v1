// helpers/NowPayment/nowpayment.js
const axios = require('axios');

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
console.log('NOWPayments Key loaded:', NOWPAYMENTS_API_KEY ? '✅' : '❌ Missing'); 

const API_URL = 'https://api.nowpayments.io/v1';

// ✅ Create a new invoice
async function createPayment(amount, priceCurrency, orderId, payCurrency, successUrl, failUrl) {
  console.log("Creating NowPayments invoice with:", { amount, priceCurrency, orderId, payCurrency, successUrl, failUrl, });

  try {
    const response = await axios.post(
      `${API_URL}/invoice`,
      {
        price_amount: amount,           // amount in USD (or other fiat/crypto)
        price_currency: priceCurrency,  // "USD"
        order_id: orderId,              // your internal order ID
        pay_currency: payCurrency,      // crypto user will pay in (BTC, ETH, etc.)
        success_url: successUrl,        // frontend success page
        cancel_url: failUrl             // frontend fail page
      },
      {
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('NowPayments create invoice error:', error.response?.data || error.message);
    throw error;
  }
}

// ✅ Get payment info by ID (to poll/check status)
async function getPayment(paymentId) {
  try {
    const response = await axios.get(`${API_URL}/payment/${paymentId}`, {
      headers: { 'x-api-key': NOWPAYMENTS_API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('NowPayments get payment error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  createPayment,
  getPayment
};
