// helpers/PayGate/paygate.js
const PAYGATE_BASE_URL = "https://paygate.to/instant-payment";

const createPayGatePayment = ({ amount, currency, orderId, successUrl, failUrl, statusUrl }) => {
  // PayGate requires query params in URL
  const paymentUrl = `${PAYGATE_BASE_URL}?amount=${amount}&currency=${currency}&order_id=${orderId}&success_url=${encodeURIComponent(successUrl)}&fail_url=${encodeURIComponent(failUrl)}&status_url=${encodeURIComponent(statusUrl)}`;

  return paymentUrl;
};

module.exports = {
  createPayGatePayment,
};
