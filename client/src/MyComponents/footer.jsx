


import React from 'react'
import Logo from '../assets/UHQ SMM.svg'
import linkedin from '../assets/Linkedin.png'
import facebook from '../assets/Facebook.png'
import twitter from '../assets/Twitter.png'
import { Link } from 'react-router-dom'

import './footer.css'

const footer = () => {
  return (
    <div className="footer-image">
    <div className='footer-container'>
  <div className="footer-content">
    <div className="logo">
      <img src={Logo} alt="logo" />
      <p>Build for Digital Growth</p> 
    </div>     

    <div className="links">
      <div>Quick Links</div>
      <li><Link to='/'>Home</Link></li>
      <li><Link to="browse-account">Browse Account</Link></li>
      <li><Link to="/aboutus">AboutUs</Link></li>
      <li><Link to="/contactus">Contact</Link></li>
      <li><Link to="/reviews">Reviews</Link></li>
      <li><Link to="/faqs">FAQ</Link></li>
    </div>

    <div className="links">
      <div>Important Policies</div>
      <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
      <li><Link to="/privacy-policy">Privacy Policy</Link></li>
      <li><Link to="refund-policy">Refund Policy</Link></li>
      <li><Link to="/security-tips">Security Tips</Link></li>
    </div>

    <div className="links">
      <div>Connect With Us</div>
      <p>Phone: +123 456 789</p>
      <p>Email: @example.com</p>
      <div className="soical-links">
        <img src={linkedin} alt="linkedin" />
        <img src={facebook} alt="facebook" />
        <img src={twitter} alt="twitter" />
      </div>
    </div>
  </div>

  {/* <img src={Ball2} alt="" className='ball3'/> */}
  <div className="copyright">
    <p className='copy-para'>Copyright&copy;2025 SMM Account. All right reserved.</p>
  {/* <img src={Ball3} alt=""   className='ball4'/> */}
  </div> 
 
</div>
</div>

  )
}

export default footer
