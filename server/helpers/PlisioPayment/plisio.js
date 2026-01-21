const axios = require('axios');
require('dotenv').config();

const createPlisioInvoice = async (amount, sourceCurrency, orderName, callbackUrl, email, cryptoCurrency, userId) => {
  const apiKey = process.env.PLISIO_API_KEY;
  console.log('🔑 Using API Key:', apiKey);

  const params = {
    source_currency: sourceCurrency.toUpperCase(),
  source_amount: parseFloat(amount).toFixed(2),
  order_number: `${userId}_${Date.now()}`,
  currency: cryptoCurrency.toUpperCase(),
  email,
  order_name: orderName,
  callback_url: callbackUrl,
  success_url: "https://uhqsmm.com/payment/success",
  fail_url: "https://uhqsmm.com/payment/failed",
  api_key: apiKey,
  user_id: userId,
  };

  console.log('📦 Request Params:', params);

  try {
    const response = await axios.get(
      'https://api.plisio.net/api/v1/invoices/new',
      { params }
    );

    console.log('✅ Plisio response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('❌ Plisio error status:', error.response.status);
      console.error('❌ Plisio error data:', error.response.data);
    } else {
      console.error('❌ Request error:', error.message);
    }
    throw error;
  }
};

module.exports = { createPlisioInvoice };
