import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker";
import axios from "axios";
import { toast } from "react-toastify";

const AddFunds = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [method, setMethod] = useState("Plisio Crypto Payments, BTC, ETH, LTC, TRX, USDT More. Bonus %5 from 99$");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      let res;

      if (method.startsWith("Plisio")) {
        // 🔹 Plisio
        res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/plisio/create`,
          {
            amount,
            currency: "USD",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          window.location.href = res.data.invoice.invoice_url;
        } else {
          toast.error("Failed to create Plisio invoice");
        }

      } else if (method.includes("ChangeNOW")) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/changenow/create`,
            {
              from: "btc",
              to: "eth",
              amount: "0.01",
              address: "0x57f31ad4b64095347F87eDB1675566DAfF5EC886",
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (res.data?.success) {
            if (res.data.exchangeUrl) {
              window.location.href = res.data.exchangeUrl; // Redirect to pseudo checkout
            } else {
              toast.info(
                `Send ${res.data.amount} ${res.data.fromCurrency.toUpperCase()} to: ${res.data.payinAddress}`
              );
              console.log("ChangeNOW Payment Details:", res.data);
            }
          } else {
            toast.error("Failed to create ChangeNOW transaction");
            console.error("ChangeNOW Error:", res.data);
          }
        } catch (error) {
          toast.error("An error occurred while creating ChangeNOW transaction");
          console.error("ChangeNOW Request Error:", error);
        }
      }
      else if (method.includes("HoodPay")) {
        // 🔹 HoodPay
        res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/hoodpay/create`,
          {
            amount,
            currency: "USD",
            email: "customer@example.com",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          window.location.href = res.data.checkout_url;
        } else {
          toast.error("Failed to create HoodPay invoice");
        }

      } else if (method.toLowerCase().includes("nowpayments")) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/nowpayments/create`,
            {
              amount,
              priceCurrency: "USD",
              orderId: "order123",
              payCurrency: "BTC",
              successUrl: "https://uhqsmm.com/payment/success",
              failUrl: "https://uhqsmm.com/payment/fail",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.data.success) {
            const { invoice_url } = res.data;


            window.location.href = invoice_url;


          } else {
            toast.error("Failed to create NowPayments invoice");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error creating NowPayments invoice");
        }
      }
      else if (method.includes("PayGate")) {
        // 🔹 PayGate
        res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/paygate/create`,
          {
            amount,
            currency: "USD",
            orderId: "ORD12345",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          window.location.href = res.data.redirectUrl;
        } else {
          toast.error("Failed to create PayGate payment");
        }

      }
      else if (method.includes("Payeer")) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/payeer/create`,
            {
              amount,
              currency: "USD",
              orderId: "ORD" + Date.now(), // 🔹 generate unique orderId
              description: "Payment for Order " + Date.now(),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.data.success) {
            const { url, data } = res.data.payment;

            // 🔹 Build a form to redirect to Payeer
            const form = document.createElement("form");
            form.method = "POST";
            form.action = url;

            Object.keys(data).forEach((key) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit(); // 🔹 Redirects user to Payeer checkout
          } else {
            toast.error("Failed to create Payeer payment");
          }
        } catch (error) {
          toast.error("Error creating Payeer payment");
        }
      }

      else if (method.includes("Stripe")) {
        // 🔹 Stripe
        res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/stripe/create`,
          {
            amount,
            currency: "usd",
            userId: "user_12345",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          window.location.href = res.data.url; // Stripe Checkout session
        } else {
          toast.error("Stripe payment failed to initialize");
        }

      } else {
        toast.error("Unsupported payment method selected");
      }

    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };




  return (
    <div className="flex h-screen bg-gray-100 border-gray-200 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Add Funds</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Add Funds
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="flex flex-col md:flex-row gap-6 p-6 font-sans">
          <div className="dark:bg-[rgba(37,33,57,1)] h-[700px] border border-gray-300 dark:border-[#FFFFFF] p-6 w-full shadow-md">
            <h1 className="text-gray-600 py-2 dark:text-white font-medium text-2xl mb-6">Add Funds</h1>
            <form>
              <label htmlFor="method" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-sm bg-white dark:bg-gray-900 px-4 py-3 mb-6 text-sm border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option>Plisio Crypto Payments, BTC, ETH, LTC, TRX, USDT More. Bonus %5 from 99$</option>
                <option>NowPayments.io</option>
                <option>Stripe (Credit/Debit Cards, Apple Pay, Google Pay)</option>
                <option>Cryptomus (Crypto Payments)</option>
                <option>Payeer</option>
                <option>ChangeNOW (Crypto Exchange Payments)</option>
                <option>HoodPay (Crypto & Fiat Payments)</option>
                <option>PayGate</option>


              </select>

              <label htmlFor="amount" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Amount
              </label>
              <input
                required
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color: "gray" }}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg dark:bg-gray-700 px-4 py-2 mb-6 text-gray-900 text-sm border dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />

              <button
                type="button"

                onClick={() => {
                  if (!amount || amount <= 0) {
                    toast.error("Please enter a valid amount before initiating payment");
                    return;
                  }
                  setShowModal(true);
                }}
                className="lg:w-md w-full py-2 border border-violet-600 text-violet-600 rounded-3xl dark:gradient-border dark:hover:text-white dark:bg-violet-600 dark:text-white  cursor-pointer transition"
              >
                Initiate Payment
              </button>
            </form>
          </div>
        </div>
      </div>


   {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white dark:bg-[rgba(37,33,57,1)] p-6 border dark:border-gray-100 w-full max-w-md sm:max-w-lg lg:max-w-4xl max-h-[90vh] rounded-lg overflow-y-auto text-gray-800 dark:text-gray-100 relative">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Complete Payment - {method}
      </h2>

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Amount</label>
        <input
          type="number"
          value={amount}
          disabled
          className="w-full rounded-lg bg-gray-200 dark:bg-gray-700 px-4 py-2 mb-4 text-gray-800 dark:text-gray-200"
          style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color: "gray" }}
        />

        {/* Plisio */}
        {method.startsWith("Plisio") && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You’ll be redirected to Plisio checkout to complete your payment.
          </p>
        )}

        {/* Stripe */}
        {method.includes("Stripe") && (
          <>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Card Number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg dark:bg-gray-700 px-4 py-2 mb-4"
              style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color: "gray" }}
            />
          </>
        )}

        {/* Payeer */}
        {method.includes("Payeer") && (
          <>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Payeer Account</label>
            <input
              type="text"
              placeholder="Enter Payeer Wallet"
              className="w-full rounded-lg dark:bg-gray-700 px-4 py-2 mb-4"
            />
          </>
        )}

        {/* Crypto */}
        {method.includes("Crypto") && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            A wallet address will be generated after confirming.
          </p>
        )}

        {/* NowPayments */}
        {method.includes("NowPayments") && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You’ll be redirected to NowPayments secure checkout.
          </p>
        )}

        {/* ChangeNOW */}
        {method.includes("ChangeNOW") && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You’ll be redirected to ChangeNOW to exchange and pay in crypto.
          </p>
        )}

        {/* GataPay */}
        {method.includes("GataPay") && (
          <>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone linked to GataPay"
              className="w-full rounded-lg dark:bg-gray-700 px-4 py-2 mb-4"
            />
          </>
        )}

        {/* HoodPay */}
        {method.includes("HoodPay") && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You’ll be redirected to HoodPay (crypto & fiat payments) checkout.
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Confirm Payment
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default AddFunds;
