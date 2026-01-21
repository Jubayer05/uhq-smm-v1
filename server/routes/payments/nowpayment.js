const express = require('express');
const router = express.Router();
const { createNowPayment, getNowPaymentStatus, nowPaymentsCallback } = require('../../controllers/payments/nowPaymentController');

router.post('/create', createNowPayment);
router.get('/:paymentId', getNowPaymentStatus);
router.post('/callback', nowPaymentsCallback);

module.exports = router;
