const { createPaymentIntent, verifyWebhook } = require("../../helpers/StripePayment/paymentController");

const createStripePayment = async (req, res) => {
  try {
    const { amount, currency = "usd", userId } = req.body;
    if (!amount || !userId) {
      return res.status(400).json({ success: false, error: "Amount and userId required" });
    }

    const intent = await createPaymentIntent(amount, currency, userId);
    res.status(200).json({ success: true, clientSecret: intent.client_secret });
  } catch (error) {
    console.error("Stripe Proxy Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Stripe Webhook
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    const event = verifyWebhook(req.rawBody, sig, process.env.STRIPE_PROXY_WEBHOOK_SECRET);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("✅ Payment Success:", paymentIntent.id);

      // Fulfillment Logic (mark user as paid, add credits, etc.)
    }

    res.status(200).send({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = { createStripePayment, handleStripeWebhook };
