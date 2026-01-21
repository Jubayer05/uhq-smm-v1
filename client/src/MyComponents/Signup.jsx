import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ import this
import '../styles/Signup.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Ellipse25 from '../assets/Ellipse25.png';
import Boxes from '../assets/Boxes1.png';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate(); // ✅ initialize navigate
  const location  = useLocation();


  useEffect(()=>{
      const params = new URLSearchParams(location.search);
  const code = params.get('code');
  if (code) {
    setCredentials(prev => ({ ...prev, referredBy: code }));
  }
  }, [location]);

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    referredBy: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmpassword, referredBy } = credentials;

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/createUser`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, referredBy}),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('username', data.user.name);
        localStorage.setItem("authToken", data.token);
        toast.success(`Signup Successful! Welcome, ${data.user.name}`);
        navigate('/vendor'); // ✅ redirect to /vendor
      } else {
        if (Array.isArray(data.errors)) {
          const errorMessage = data.errors.join(", ");
          toast.error(errorMessage);
        } else {
          toast.error(data.message || "Signup failed");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="input-group1">
          <span className="icon"><FaUser /></span>
          <input type="text" placeholder="Username" name="name" value={credentials.name} onChange={handleChange} required />
        </div>
        <div className="input-group1">
          <span className="icon"><FaEnvelope /></span>
          <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="input-group1">
          <span className="icon"><FaLock /></span>
          <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <div className="input-group1">
          <span className="icon"><FaLock /></span>
          <input type="password" placeholder="Confirm password" name="confirmpassword" value={credentials.confirmpassword} onChange={handleChange} required />
        </div>
        <div className="terms" >
          <input type="checkbox" required style={{appearance: "auto"}}/>
          <label>I have read and agreed with <a href="#">Terms of service</a></label>
        </div>
        <button type="submit" className="signup-button">Sign up</button>
        <p className="signin-link">
          Already have an account? <Link to='/login' className='signin-anchor'>Sign in</Link>
        </p>
      </form>
      <img src={Boxes} alt="boxes" className='boxes' style={{ position: 'absolute', top: 0, width: '190px', zIndex: 0 }} />
      <img src={Ellipse25} alt="ellipse24" className='ellipse24' />
    </div>
  );
};

export default Signup;
