const express = require("express");
const router = express.Router();
const { createStripePayment, handleStripeWebhook } = require("../../controllers/payments/StripeController");

router.post("/create", createStripePayment);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

module.exports = router;
