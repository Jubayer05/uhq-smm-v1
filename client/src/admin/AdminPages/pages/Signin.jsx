import React from "react";
import "../css/additional-styles/Signin.css";
import { FaUser, FaKey, FaLock, FaShieldAlt, FaBolt } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-circle">
          <FaBolt />
        </div>
        <form className="login-form">
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input type="text" placeholder="Enter Username..." />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaKey /></span>
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input type="text" placeholder="Enter 2fa Code (If Setup)" />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className="login-btn">
            <FaShieldAlt /> Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
