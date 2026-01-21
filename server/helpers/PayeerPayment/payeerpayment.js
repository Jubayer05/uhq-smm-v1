const crypto = require("crypto");
const axios = require("axios");

const PAYEER_SHOP_ID = process.env.PAYEER_SHOP_ID;
const PAYEER_SECRET_KEY = process.env.PAYEER_SECRET_KEY;

const createPayeerPayment = async (amount, currency, orderId, description) => {
  try {
    const m_shop = PAYEER_SHOP_ID;
    const m_orderid = orderId;
    const m_amount = parseFloat(amount).toFixed(2);
    const m_curr = currency;
    const m_desc = Buffer.from(description).toString("base64");

    // 🔹 Signature generation
    const signString = [
      m_shop,
      m_orderid,
      m_amount,
      m_curr,
      m_desc,
      PAYEER_SECRET_KEY,
    ].join(":");

    const m_sign = crypto.createHash("sha256").update(signString).digest("hex").toUpperCase();

    // 🔹 Payment form data
    const paymentData = {
      m_shop,
      m_orderid,
      m_amount,
      m_curr,
      m_desc,
      m_sign,
    };

    // 🔹 Payeer checkout URL
    const payeerUrl = "https://payeer.com/merchant/?";

    return { url: payeerUrl, data: paymentData };
  } catch (error) {
    console.error("❌ Payeer create payment error:", error);
    throw new Error("Failed to create Payeer payment");
  }
};

const verifyPayeerPayment = (params) => {
  try {
    const { m_operation_id, m_operation_ps, m_operation_date, m_operation_pay_date, m_shop, m_orderid, m_amount, m_curr, m_desc, m_status, m_sign } = params;

    const signString = [
      m_operation_id,
      m_operation_ps,
      m_operation_date,
      m_operation_pay_date,
      m_shop,
      m_orderid,
      m_amount,
      m_curr,
      m_desc,
      m_status,
      PAYEER_SECRET_KEY,
    ].join(":");

    const hash = crypto.createHash("sha256").update(signString).digest("hex").toUpperCase();

    return hash === m_sign && m_status === "success";
  } catch (error) {
    console.error("❌ Payeer verify error:", error);
    return false;
  }
};

module.exports = { createPayeerPayment, verifyPayeerPayment };
