const { createTransaction, getTransactionStatus } = require("../../helpers/ChangeNowPayment/changenow");

const createChangeNowPayment = async (req, res) => {
  try {
    const { from, to, amount, address, extraId = "" } = req.body;

    if (!from || !to || !amount || !address) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: from, to, amount, address",
      });
    }

    const data = await createTransaction({ from, to, amount, address, extraId });

    // Map response for frontend
    const responsePayload = {
      exchangeUrl: `https://changenow.io/exchange/?id=${data.id}`, // pseudo checkout URL
      payinAddress: data.payinAddress,
      fromCurrency: data.fromCurrency,
      amount: data.directedAmount || data.amount,
    };

    res.status(200).json({ success: true, ...responsePayload });
  } catch (error) {
    console.error("ChangeNOW Error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

const handleChangeNowStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({ success: false, error: "transactionId is required" });
    }

    const data = await getTransactionStatus(transactionId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("ChangeNOW Status Error:", error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = { createChangeNowPayment, handleChangeNowStatus };
