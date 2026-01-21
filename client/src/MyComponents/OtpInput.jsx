import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/OtpInput.css'

const OtpInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, OTP } = location.state;
  const [inputOtp, setInputOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setDisabled(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    if (disabled) return;

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/email/send_recovery_email`, {
        recipient_email: email,
        OTP,
      });
      toast.success("New OTP sent to your email!");
      setDisabled(true);
      setTimer(60);
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleVerify = () => {
    if (parseInt(inputOtp.join("")) === OTP) {
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error("Incorrect OTP");
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-container">
        <h2>Enter OTP sent to {email} Please Check Your Email</h2>
        <div className="otp-inputs">
          {inputOtp.map((val, idx) => (
            <input
              key={idx}
              maxLength={1}
              value={val}
              onChange={(e) => {
                const newOtp = [...inputOtp];
                newOtp[idx] = e.target.value.replace(/[^0-9]/g, "");
                setInputOtp(newOtp);

                if (e.target.value && idx < inputOtp.length - 1) {
                  document.getElementById(`otp-${idx + 1}`).focus();
                }
              }}
              id={`otp-${idx}`}
            />
          ))}
        </div>
        <button className="otp-btn" onClick={handleVerify}>Verify</button>
        <div className="resend-section">
          {disabled ? `Resend OTP in ${timer}s` : <button onClick={handleResend}>Resend OTP</button>}
        </div>
      </div>
    </div>
  );
};

export default OtpInput;

