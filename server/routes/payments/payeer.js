const express = require("express");
const { createPayment, payeerCallback } = require("../../controllers/payments/payeerController");

const router = express.Router();

router.post("/create", createPayment);
router.post("/callback", payeerCallback);

module.exports = router;
