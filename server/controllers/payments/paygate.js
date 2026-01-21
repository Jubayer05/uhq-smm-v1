// controllers/paygateController.js
const { createPayGatePayment } = require("../../helpers/PayGate/paygate");

const createPayGatePaymentController = async (req, res) => {
  try {
    const { amount, currency, orderId } = req.body;

    if (!amount || !currency || !orderId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: amount, currency, orderId",
      });
    }

    // ✅ Replace with your client’s URLs (or make dynamic)
    const successUrl = "https://uhqsmm.com/payment/success";
    const failUrl = "https://uhqsmm.com/payment/fail";
    const statusUrl = "https://uhqsmm.com/payment/status"; // optional callback

    const paymentUrl = createPayGatePayment({
      amount,
      currency,
      orderId,
      successUrl,
      failUrl,
      statusUrl,
    });

    return res.status(200).json({
      success: true,
      redirectUrl: paymentUrl,
    });
  } catch (error) {
    console.error("PayGate Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPayGatePaymentController,
};
