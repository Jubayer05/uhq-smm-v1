import React, { useState } from 'react';
import Logo from '../assets/UHQ SMM.png';
import Ellipse from '../assets/Ellipse.png';
import Ellipse1 from '../assets/Ellipse1.png';
import { FiMenu, FiX } from 'react-icons/fi';
import './navbar.css';
import { Link,  useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='container'>
      {/* <div className="logo1">
        <img src={Logo} alt="logo" className='logo' />
      </div> */}

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      <div className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          {/* <li><Link to="/pricing">Pricing</Link></li>x */}
          <li><Link to="/contactus">Contact Us</Link></li>
        </ul>
        {/* Mobile-only extras (visible only below 480px) */}
        <div className="mobile-extras">
          <div className="ellipses">
            <div className='ellipse'>
              <img src={Ellipse} alt="ellipse" />
            </div>
            <div className='ellipse1'>
              <img src={Ellipse1} alt="ellipse1" />
            </div>
          </div>
          <div className="register">
            <button onClick={()=> navigate('/login')}>Register</button>
          </div>
        </div>
      </div>

      {/* Original elements (hidden below 480px) */}
      <div className="desktop-ellipses">
        <div className='ellipse'>
          <img src={Ellipse} alt="ellipse" />
        </div>
        <div className='ellipse1'>
          <img src={Ellipse1} alt="ellipse1" />
        </div>
      </div>

      <div className="desktop-register">
        <button onClick={()=> navigate('/login')}>Register</button>
      </div>

    </div>
  );
};

export default Navbar;