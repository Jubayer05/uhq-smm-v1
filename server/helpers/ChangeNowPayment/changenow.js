const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.CHANGENOW_API_KEY;
if (!API_KEY) console.warn("⚠️ ChangeNOW API Key is not set in .env");

/**
 * Create a new ChangeNOW transaction
 * Returns transaction data including payinAddress and ID
 */
const createTransaction = async ({ from, to, amount, address, extraId = "" }) => {
  if (!from || !to || !amount || !address) {
    throw new Error("Missing required fields: from, to, amount, or address");
  }

  try {
    const response = await axios.post(
      `https://api.changenow.io/v1/transactions/${API_KEY}`,
      { from, to, amount, address, extraId },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;

    // Optional: create a pseudo checkout URL for frontend redirect
    const exchangeUrl = `https://changenow.io/exchange/${data.id}`;

    return { ...data, exchangeUrl };
  } catch (error) {
    console.error("ChangeNOW createTransaction error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/**
 * Get transaction status by ID
 */
const getTransactionStatus = async (transactionId) => {
  if (!transactionId) throw new Error("transactionId is required");

  try {
    const response = await axios.get(
      `https://api.changenow.io/v1/transactions/${transactionId}/${API_KEY}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("ChangeNOW getTransactionStatus error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

module.exports = {
  createTransaction,
  getTransactionStatus,
};
