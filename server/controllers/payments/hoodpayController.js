const HoodpayClient = require('../../helpers/Hoodpay/hoodpay');

const hoodpay = new HoodpayClient({
  apiKey: process.env.HOODPAY_API_KEY,
  businessId: process.env.HOODPAY_BUSINESS_ID
});

// Create a new Hoodpay payment
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency, email } = req.body;

    const payment = await hoodpay.createPayment({
      amount,
      currency,
      name: "Order Payment",
      description: "Payment for order",
      customer_email: email,
      redirect_url: `${req.protocol}://${req.get('host')}/payment/success`,
      notify_url: `${req.protocol}://${req.get('host')}/payment/webhook`
    });

    // Usually Hoodpay returns { id, payment_url, ... }
    res.json({ success: true, checkout_url: payment.data.url  });
  } catch (err) {
    console.error("Hoodpay createPayment error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "Failed to create payment" });
  }
};

// Webhook handler
exports.handleWebhook = async (req, res) => {
  try {
    const event = req.body.type;
    const data = req.body.data;

    console.log("🔔 Hoodpay Webhook:", event, data);

    if (event === "payment:completed") {
      // ✅ Mark order as paid in your DB
    } else if (event === "payment:cancelled") {
      // ❌ Handle cancellation
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).send("Error");
  }
};
