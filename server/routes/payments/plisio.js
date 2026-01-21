const express = require('express');
const router = express.Router();
const plisioController = require('../../controllers/payments/plisioController');

router.post('/create', plisioController.createInvoice);
router.post('/callback', plisioController.paymentCallback);
router.get("/verify/:txn_id", plisioController.verifyPaymentHandler)
module.exports = router;
