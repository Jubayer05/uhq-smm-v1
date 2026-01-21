


import React from 'react'
import Logo from '../assets/UHQ SMM.png';
import HeroImage from '../assets/heroImage.png'
import Linkedin2 from '../assets/linkedin2.png'
import Snap2 from '../assets/Snap2.png'
import Instagram2 from '../assets/ist.png'
import AboutImage2 from '../assets/AboutImage2.png'
import '../styles/AboutUs.css'
import Boxes from '../assets/Boxes1.png'
import Ball2 from '../assets/ball2.png'
import Ball3 from '../assets/ball3.png'
import Ellipse25 from '../assets/Ellipse25.png'
import Red from '../assets/Red.png'

const Aboutus = () => {
  return (
    <div>
      <div className="logo1">
        <img src={Logo} alt="logo" />
      </div>
      <div className='about-container'>
        <div className="about-left">
          <h1>Who We Are & <br /> Why It Matters</h1>
          <p>
            We specialize in delivering high-quality, clean social media accounts that help you grow with confidence and speed.
          </p>
        </div>
        <div className="about-right">
          <img src={HeroImage} alt="heroImage" />
          <img src={Instagram2} alt="instagram" className='insta' />
        </div>
        <img src={Snap2} alt="snap2" />
      </div >
      <img src={Boxes} alt="boxes" className='boxes' style={{"position": "absolute", "top": "0", "width": "190px", zIndex: 0}} />
      <img src={Ellipse25} alt="ellipse23" className='ellipse23' />
      <div className="sectionabout">
        <div className="about-content">
          <h1>Inside UHQ Accounts</h1>
          <p>
            At UHQ Accounts, we empower digital creators, marketers, and entrepreneurs
            with premium, aged social media accounts. Our platform is built on trust,
            speed, and authenticity—ensuring every user gets exactly what they need to
            grow online without compromise. We’re more than just a marketplace; we’re
            your digital growth partner.
          </p>
          <div className="button">
                    <div>
                        <button className='our-mission'>Our Mission</button>    
                    </div>
                        <div className="gradient-button-wrapper1">
                            <button className="our-vision">Our Vision</button>
                        </div>
                    </div>

          <p>To deliver verified, aged, and clean social media accounts with unmatched speed and reliability. We aim to simplify account access for businesses and creators, while providing world-class support, transparency, and ongoing innovation.</p>
        </div>
        
        <img src={AboutImage2} alt="About UHQ" />
        
      </div>
      

      <div className="aboutsection2-container">
        <div className="about-section2">
          <div className="heading2">
            <p className="number1">89,2K+</p>
            <p className="label1">In Revenue</p>
          </div>
          <div className="heading2">
            <p className="number1">7001+</p>
            <p className="label1">Qualified Leads</p>
          </div>
          <div className="heading2">
            <p className="number1">30,124+</p>
            <p className="label1">Trusted Customers</p>
          </div>
      <img src={Red} alt="red" className='red1'/>
        </div>

      </div>
       {/* <img src={Ball2} alt="" className='aboutballs1'/>
       <img src={Ball3} alt=""   className='aboutballs2'/> */}
    </div>
  )
}

export default Aboutus
