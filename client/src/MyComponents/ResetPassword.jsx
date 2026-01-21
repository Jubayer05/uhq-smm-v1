import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/ResetPassword.css'
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/reset-password`, {
        email,
        newPassword: password,
      });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
  <div className="reset-wrapper">
    <div className="reset-container">
     
      <p>Please enter your new password below.</p>
      <form onSubmit={handleSubmit}>
        <div className="reset-inputs">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
  </div>
  );
};

export default ResetPassword;
