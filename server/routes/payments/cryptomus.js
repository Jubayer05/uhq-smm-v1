const express = require('express');
const router = express.Router();
const { createCryptomusPayment, handleCryptomusCallback } = require('../../controllers/payments/cryptomusController');

// Create invoice
router.post('/pay', createCryptomusPayment);

router.post('/callback', handleCryptomusCallback);


module.exports = router;
