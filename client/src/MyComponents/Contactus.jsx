



import React from 'react'
import Logo from '../assets/UHQ SMM.png';
import HeroImage from '../assets/heroImage.png'
import Instagram2 from '../assets/ist.png'
import Snap2 from '../assets/Snap2.png'
import '../styles/Contact.css'
import Ball3 from '../assets/ball2.png'
import Ball4 from '../assets/ball3.png'
import Ellipse25 from '../assets/Ellipse25.png'
import Boxes from '../assets/Boxes1.png'
import Red from '../assets/Red.png'

const Contactus = () => {
  return (
    <div>
      <div className="contact-logo1">
        <img src={Logo} alt="logo" />
      </div>
      <div className='contact-container'>
        <div className="contact-left">
          <h1>Get in Touch With Our Support Team</h1>
          <p>Need help or have a question? Our team is online 24/7 via chat, email, or Telegram.</p>
        </div>
        <div className="contact-right">

          <img src={HeroImage} alt="heroImage" />
          <img src={Instagram2} alt="instagram" className='insta' />
        </div>
        <img src={Snap2} alt="snap2" />

      </div >
      <img src={Boxes} alt="boxes"  className='boxes' style={{"position": "absolute", "top": "0", "width": "190px", zIndex: 0}}/>
      <img src={Ellipse25} alt="ellipse23" className='ellipse23' />
      <div className="contact-section">
        <h1>Get in Touch With Our Support Team</h1>
        <p>
          Have a question or need help? Our team is available 24/7 to assist you via chat, email, or Telegram.
          Let’s connect and get you the answers you need — fast.
        </p>

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email address" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Enter your subject" />
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="Enter your message"></textarea>
          </div>
        </form>
        <div className="button">
          <div>
            <button className='submit'>Submit</button>    
          </div>
        </div>
      </div>
 {/* <img src={Ball3} alt="" className='contactballs1'/>
       <img src={Ball4} alt=""   className='contactballs2'/> */}
             <img src={Red} alt="red" className='red3'/>
       
    </div>
  )
}

export default Contactus
