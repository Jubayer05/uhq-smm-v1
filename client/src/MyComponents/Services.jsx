



import React from 'react'
import Logo from '../assets/UHQ SMM.png';
import HeroImage from '../assets/heroImage.png'
import Instagram2 from '../assets/ist.png'
import Snap2 from '../assets/Snap2.png'
import '../styles/Services.css'
import Message from '../assets/MessageService.png'
import Tick from '../assets/Tick.png'
import Youtube from '../assets/YouTubeService.png'
import Export from '../assets/ExportService.png'
import Instagram from '../assets/InstagramService.png'
import Facebook from '../assets/FacebookService.png'
import Inst2 from '../assets/Instagram.png'
import Snap3 from '../assets/Snap.png'
import Facebook2 from '../assets/facebook1.png'
import Youtube2 from '../assets/youtube.png'
import Linkedin2 from '../assets/linkedin1.png'
import X2 from '../assets/x.png'
import Ball from '../assets/Ball.png'
import Ball2 from '../assets/Ball.png'
import Boxes from '../assets/Boxes1.png'
// import Ball2 from '../assets/Section5Ball.png'
import Ball3 from '../assets/ball2.png'
import Ball4 from '../assets/ball3.png'
import Youtube3 from '../assets/youtube2.svg'
import Ellipse25 from '../assets/Ellipse25.png'
import Red from '../assets/Red.png'




const Services = () => {
  return (
    <div>
      <div className="services-logo1">
        <img src={Logo} alt="logo" />
      </div>
      <img src={Boxes} alt="" className='boxes' style={{"position": "absolute", "top": "0", "width": "190px", zIndex: 0}}/>
      <img src={Ellipse25} alt="ellipse23" className='ellipse23' />
      <div className='services-container'>
        <div className="services-left">
          <h1>Full Suite of Digital Account Services</h1>
          <p>
            From social media to email marketing accounts, we offer everything you need to boost visibility and results.</p>
        </div>
        <div className="services-right">

          <img src={HeroImage} alt="heroImage" />
          <img src={Instagram2} alt="instagram" className='insta' />
        </div>
        <img src={Snap2} alt="snap2" />

      </div >
      <div className="services-section3">
        <div className="services-content">
        <h1>Premium Social Media Accounts for Every Need</h1>
        <p>Explore a curated selection of high-quality, aged, and verified social media accounts tailored for businesses, agencies, and individual creators. Whether you're scaling ad campaigns, automating growth, or building brand presence, UHQ Accounts delivers secure, ready-to-use profiles for every platform. Enjoy instant delivery, safe transactions, and accounts optimized for performance and authenticity.</p>
      </div>
        <div className="servicescards-container">
        <div className="services-cards">
          <div className="image">
            <img src={Message} alt="" />
          </div>
          <h1>Secure your digital identity</h1>
          <p>Verified Gmail accounts with clean history, great for business registrations, outreach, and backups.</p>
        </div>
         <div className="services-cards">
          <div className="image">
            <img src={Tick} alt="" />
          </div>
          <h1>TikTok Creator Accounts</h1>
          <p>Launch your next viral ad with active, high-reach TikTok accounts built for performance.</p>
        </div>
         <div className="services-cards">
          <div className="image">
            <img src={Youtube} alt="" />
          </div>
          <h1>  YouTube Monetized Channels</h1>
          <p>Access channels eligible for monetization — perfect for content creators and ad revenue.</p>
        </div>
         <div className="services-cards">
          <div className="image">
            <img src={Export} alt="" />
          </div>
          <h1> Grow your influence instantly</h1>
          <p>Aged and verified Twitter accounts, perfect for marketing, automation, and digital networking</p>
        </div>
         <div className="services-cards">
          <div className="image">
            <img src={Instagram} alt="" />
          </div>
          <h1> Growth-Ready</h1>
          <p>Clean and aged IG accounts ideal for influencers, eCommerce brands, and marketer</p>
        </div>
         <div className="services-cards">
          <div className="image">
            <img src={Facebook} alt="" />
          </div>
          <h1>Pages with Fans</h1>
          <p>Buy Facebook pages with real audiences for marketing, memes, or business branding.</p>
        </div>
      </div>
      </div> 
      <div className="section7">
                      <h2 className='head'>Our Platforms</h2>
                      <div className="section7-content">
                          <div className="social-grid">
                              <img className='section7-img' src={Inst2} alt="Instagram" />
                              <img className='section7-img' src={Snap3} alt="Snapchat" />
                              <img className='section7-img' src={Facebook2} alt="Facebook" />
                              <img className='section7-img' src={Youtube2} alt="YouTube" />
                              <img className='section7-img' src={Linkedin2} alt="LinkedIn" />
                              <img className='section7-img' src={X2} alt="X" />
                              <img src={Ball2} alt="" className='ball' />
                          </div>
                          <div className="text-content">
                              <button className="services-button">OUR Services</button>
                              <img src={Youtube3} alt="youtube2" className='service-youtube2' />
                              <h1 className='head'>Explore Our Most Popular SMM Tools</h1>
                              <p className='para'>
                                  At SMM VIP, we pride ourselves on delivering top-tier Social Media Marketing (SMM)
                                  services designed to elevate your online presence and drive unparalleled engagement.
                                  With our comprehensive suite of solutions, we empower businesses of all sizes to
                                  harness the full potential of social media platforms.
                              </p>
                              <img src={Ball} alt="" className='ball1' />
                              <div className="gradient-button-wrapper2">
                                  <button className="seeallourservices">See All Our Services</button>
                              </div>
                          </div>
                      </div>
                  </div>
                         {/* <img src={Ball3} alt="" className='ball3'/>
       <img src={Ball4} alt=""   className='ball4'/> */}
             <img src={Red} alt="red" className='red2'/>
       
    </div>
  )
}

export default Services
