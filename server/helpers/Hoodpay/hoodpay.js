const axios = require('axios');

const HOODPAY_API_BASE = 'https://api.hoodpay.io/v1';

class HoodpayClient {
  constructor({ apiKey, businessId }) {
    this.apiKey = apiKey;
    this.businessId = businessId;

    this.http = axios.create({
      baseURL: `${HOODPAY_API_BASE}/businesses/${this.businessId}`,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Create a new payment
  async createPayment({ currency, amount, name, description, customer_email, redirect_url, notify_url }) {
    const body = {
      amount,
      currency,
      name,
      description,
      customer_email,
      redirect_url,
      notify_url
    };

    const res = await this.http.post('/payments', body);
    return res.data;
  }

  // Get a payment by ID
  async getPayment(paymentId) {
    const res = await this.http.get(`/payments/${paymentId}`);
    return res.data;
  }

  // Cancel a payment
  async cancelPayment(paymentId) {
    const res = await this.http.post(`/payments/${paymentId}/cancel`);
    return res.data;
  }
}

module.exports = HoodpayClient;
