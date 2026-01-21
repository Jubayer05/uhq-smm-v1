




import React, {useEffect, useState, useRef} from 'react'
import Logo from '../assets/UHQ SMM.png';
import HeroImage from '../assets/heroImage.png'
import Instagram2 from '../assets/ist.png'
import Snap2 from '../assets/Snap2.png'
import '../styles/Pricing.css'


const Pricing = () => {
  const [value, setValue] = useState(100);
  const sliderRef = useRef(null);
  const tooltipRef = useRef(null);
  const progressRef = useRef(null);

  const handleInput = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const tooltip = tooltipRef.current;
    const progress = progressRef.current;

    const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;

    progress.style.width = `${percent}%`;
    tooltip.textContent = `${value} users`;
    const tooltipX = (percent / 100) * slider.offsetWidth;
    tooltip.style.left = `${tooltipX}px`;
  }, [value]);


  return (
    <div>
      <div className="pricing-logo1">
        <img src={Logo} alt="logo" />
      </div>
      <div className='pricing-container'>
        <div className="pricing-left">
          <h1>Choose a Plan That Fits Your Needs</h1>
          <p>Simple, transparent pricing for every level — whether you're testing or scaling big.</p>
        </div>
        <div className="pricing-right">

          <img src={HeroImage} alt="heroImage" />
          <img src={Instagram2} alt="instagram" className='insta' />
        </div>
        <img src={Snap2} alt="snap2" />

      </div >
      <div className="pricing-section">
        <h1>Flexible Plans for Every Digital  Mission</h1>
        <p>
          Whether you're just starting out or scaling a full campaign, choose a plan tailored to your needs — no hidden fees, no subscriptions, just premium verified accounts delivered instantly.
        </p>

        <div className="slider-container">
      <div className="slider-progress" ref={progressRef}></div>
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="500"
        value={value}
        className="slider"
        onInput={handleInput}
      />
      <div className="tooltip" ref={tooltipRef}></div>
    </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h2>Starter</h2>
            <div className="price">$19<span>/ month</span></div>
            <p>For individuals or beginners testing digital campaigns.</p>
            <hr />
            <ul>
              <li>✔ 1 Verified Social Media Account</li>
              <li>✔ Clean History + Email Access</li>
              <li>✔ Manual or Same-Day Delivery</li>
              <li>✔ Basic Support Access</li>
            </ul>
            <button className="outline-btn">Get 14 Days Free Trial</button>
          </div>

          <div className="pricing-card active">
            <h2>Professional</h2>
            <div className="price">$49<span>/ month</span></div>
            <p>Perfect for marketers, small teams, and creators.</p>
            <hr />
            <ul>
              <li>✔ 3 Verified Accounts (any platform)</li>
              <li>✔ Instant Dashboard Delivery</li>
              <li>✔ Niche Selection Available</li>
              <li>✔ 10 Priority Support</li>
            </ul>
            <button className="primary-btn">Buy Now</button>
          </div>

          <div className="pricing-card">
            <h2>Business</h2>
            <div className="price">$99<span>/ month</span></div>
            <p>For agencies, resellers, and serious growth.</p>
            <hr />
            <ul>
              <li>✔ 5–10 High-Quality Aged Accounts</li>
              <li>✔ Private Batches / Custom Mix</li>
              <li>✔ Premium Support & Perks</li>
              <li>✔ Bulk Discounts on Future Orders</li>
            </ul>
            <button className="outline-btn">Buy Now</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Pricing
