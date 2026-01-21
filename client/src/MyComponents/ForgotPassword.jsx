import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const OTP = Math.floor(1000 + Math.random() * 9000); // generate 4-digit OTP

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/email/send_recovery_email`, {
        recipient_email: email,
        OTP,
      });

      toast.success("OTP sent to your email!");
      navigate("/otp", { state: { email, OTP } }); // pass email & OTP to next page
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  return (
<div className="forgot-wrapper">
  <div className="forgot-container">
    <h2>Forgot Password</h2>
    <form onSubmit={handleSubmit} className="forgot-inputs">
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="forgot-btn">Send OTP</button>
    </form>
  </div>
</div>


  );
};

export default ForgotPassword;
