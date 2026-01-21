import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/UHQ SMM.svg';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import Ball3 from '../assets/ball2.png';
import Ball4 from '../assets/ball3.png';
import Ellipse25 from '../assets/Ellipse25.png';
import Boxes from '../assets/Boxes1.png';
import { toast } from 'react-toastify';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', data.user.name);
        toast.success(`Login Successful! Welcome, ${data.user.name}`);
        navigate('/vendor');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-container">
          {/* <div className="logo2">
            <img src={Logo} alt="Logo" />
          </div> */}
          <h1>Login</h1>
          <p>Welcome back! Please log in to access your account.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/recovery">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>

          <div className="or-section">
            <hr /><span>Or Continue with</span><hr />
          </div>

          <div className="social-icons">
            <FaGoogle />
            <FaFacebookF />
            <FaApple />
          </div>
        </div>
      </div>

      <img src={Boxes} alt="boxes" className="boxes" style={{ position: 'absolute', top: 0, width: '190px', zIndex: 0 }} />
      <img src={Ellipse25} alt="ellipse24" className="ellipse24" />
      {/* <img src={Ball3} alt="" className="loginballs1" />
      <img src={Ball4} alt="" className="loginballs2" /> */}
    </>
  );
};

export default Login;
