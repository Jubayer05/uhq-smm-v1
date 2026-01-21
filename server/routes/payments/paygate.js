// routes/paymentRoutes.js
const express = require("express");
const { createPayGatePaymentController } = require("../../controllers/payments/paygate");

const router = express.Router();

router.post("/create", createPayGatePaymentController);

module.exports = router;
