const { createPayeerPayment, verifyPayeerPayment } = require("../../helpers/PayeerPayment/payeerpayment");

const createPayment = async (req, res) => {
  try {
    const { amount, currency = "USD", orderId, description = "Payment" } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({ success: false, error: "Amount and OrderId required" });
    }

    const { url, data } = await createPayeerPayment(amount, currency, orderId, description);

    return res.json({
      success: true,
      payment: {
        url,
        data,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const payeerCallback = async (req, res) => {
  try {
    const isValid = verifyPayeerPayment(req.body);

    if (!isValid) {
      return res.status(400).send("ERROR");
    }

    // ✅ Save order as paid in DB here

    return res.send("OK" + req.body.m_orderid);
  } catch (error) {
    return res.status(500).send("ERROR");
  }
};

module.exports = { createPayment, payeerCallback };
