// controllers/nowPaymentsController.js
const crypto = require("crypto");
const Fund = require('../../models/Funds');
const Order = require('../../models/Order');
const { createPayment, getPayment } = require('../../helpers/NowPayment/nowpayment');

// ✅ Create NowPayments Invoice
async function createNowPayment(req, res) {
  const { amount, priceCurrency, payCurrency, orderId, successUrl, failUrl } = req.body;

  // Validate required fields
  if (!amount || !priceCurrency || !payCurrency || !orderId || !successUrl || !failUrl) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields (amount, priceCurrency, payCurrency, orderId, successUrl, failUrl)',
    });
  }

  try {
 
    const invoice = await createPayment(amount, priceCurrency, orderId, payCurrency, successUrl, failUrl);

    res.status(200).json({
      success: true,
      invoice_url: invoice.invoice_url, // frontend should redirect here
      invoice,
    });
  } catch (error) {
    console.error("NowPayments Create Invoice Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create NowPayments invoice',
      error: error.response?.data || error.message,
    });
  }
}

// ✅ Check Payment Status
async function getNowPaymentStatus(req, res) {
  const { paymentId } = req.params;

  if (!paymentId) {
    return res.status(400).json({
      success: false,
      message: 'Payment ID is required',
    });
  }

  try {
    const payment = await getPayment(paymentId);
    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("NowPayments Get Payment Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch NowPayments payment status',
      error: error.response?.data || error.message,
    });
  }
}



async function nowPaymentsCallback(req, res) {
  try {
    const data = req.body;
    console.log("📩 NowPayments Callback:", data);

    // ✅ Only mark if completed/finished
    if (data.payment_status === "finished") {
      const userId = data.order_id.split("_")[0]; // assuming order_id is like "USERID_TIMESTAMP"

      await Fund.create({
        user: userId,
        amount: parseFloat(data.price_amount),
        method: "NowPayments",
        status: "Approved",
      });

      await Order.updateOne({ orderId: data.order_id }, { status: "paid" });
      console.log(`✅ Funds credited to user ${userId}`);
    }

    return res.send("OK");
  } catch (err) {
    console.error("❌ NowPayments Callback Error:", err.message);
    return res.status(500).send("ERROR");
  }
}




module.exports = { createNowPayment, getNowPaymentStatus, nowPaymentsCallback };



