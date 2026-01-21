const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/payments/hoodpayController');

router.post('/create', paymentController.createPayment);
router.post('/webhook', express.json(), paymentController.handleWebhook);

module.exports = router;
