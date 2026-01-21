const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
const createPaymentIntent = async (amount, currency, userId) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // convert to cents
    currency,
    payment_method_types: ["card"],
    description: "Premium Digital Services",
    metadata: { user_id: userId },
  });
};

// Verify Webhook Signature
const verifyWebhook = (payload, sig, endpointSecret) => {
  return stripe.webhooks.constructEvent(payload, sig, endpointSecret);
};

module.exports = { createPaymentIntent, verifyWebhook };
