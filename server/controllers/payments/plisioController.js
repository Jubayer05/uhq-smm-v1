const { createPlisioInvoice } = require('../../helpers/PlisioPayment/plisio');
const axios = require('axios')
const Order = require("../../models/Order"); // adjust path if needed
const Fund = require('../../models/Funds')

// controllers/payments/plisioController.js
exports.verifyPaymentHandler = async (req, res) => {
  try {
    const txn_id = req.params.txn_id;
    const apiKey = process.env.PLISIO_API_KEY;

    const response = await axios.get(
      `https://api.plisio.net/api/v1/operations/${txn_id}?api_key=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.createInvoice = async (req, res) => {
  try {
    const { amount, currency, userId } = req.body;
    const invoice = await createPlisioInvoice(
  amount,                       // amount in USD
  currency,                     // "USD" (source currency)
  'SMM Panel Order',            // order name
  'https://uhqsmm.com/payment/callback/plisio', // callback
  'customer@plisio.net',        // email
  'BTC',  
  userId                   // crypto currency to pay in
);

    res.status(200).json({ success: true, invoice: invoice.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment failed', error });
  }
};

// controllers/payments/plisioController.js
// controllers/payments/plisioController.js
exports.paymentCallback = async (req, res) => {
  try {
    const data = req.body;
    console.log("📩 Plisio Callback:", data);

    if (data.status === "completed") {
      // ✅ Extract userId from order_number
      const [userId] = data.order_number.split("_");

      if (userId) {
        await Fund.create({
          user: userId,
          amount: parseFloat(data.source_amount), // ✅ Use fiat (USD) amount
          method: "Plisio",
          status: "Approved",
        });
        console.log(`✅ Fund created for user ${userId}`);
      }

      // ✅ Update order if needed
      await Order.updateOne({ orderId: data.order_number }, { status: "paid" });
    }

    // ✅ Must send lowercase ok
    return res.send("ok");
  } catch (error) {
    console.error("❌ Payment Callback Error:", error);
    return res.status(500).send("error");
  }
};
