const express = require("express");
const router = express.Router();
const {
  createChangeNowPayment,
  handleChangeNowStatus,
} = require("../../controllers/payments/changeNowController");

router.post("/create", createChangeNowPayment);
router.get("/status/:transactionId", handleChangeNowStatus); // <- use correct function


module.exports = router;
