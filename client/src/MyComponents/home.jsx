
import React from 'react'
import HeroImage from '../assets/heroImage.png'
import HeroImage1 from '../assets/heroImage1.png'
import Instagram2 from '../assets/ist.png'
import Snap2 from '../assets/Snap2.png'
import Linkedin2 from '../assets/linkedin2.png'
import facebook2 from '../assets/facebook2.png'
import Section4 from '../assets/Section4.png'
import Section4Img2 from '../assets/Section4Img2.png'
import Section4Img3 from '../assets/Section4Img3.png'
import Section5 from '../assets/section5.png'
import Section5Img1 from '../assets/section5img1.png'
import Section5Img2 from '../assets/section5img2.png'
import Section5Img3 from '../assets/section5img3.png'
import Arrow from '../assets/arrow.png'
import Rectangle from '../assets/Rectangle.png'
import Inst from '../assets/Flip Hor.svg'
import Snap from '../assets/Snap.svg'
import Facebook from '../assets/facebook.svg'
import Youtube from '../assets/Youtube.svg'
import Linkedin from '../assets/Rotate Anti.svg'
import X from '../assets/X.svg'
import Question from '../assets/question.png'
import Question2 from '../assets/question2.png'
import Question3 from '../assets/question3.png'
import Question4 from '../assets/question4.png'
import X2 from '../assets/X2.svg'
import Youtube2 from '../assets/youtube2.svg'
import Ball from '../assets/Ball.png'
import Ball2 from '../assets/Section5Ball.png'
import Dots from '../assets/dots.png'
// import Snap from '../assets/snap.png'
import Logo from '../assets/UHQ SMM.png';
// import Layer from '../assets/Layer_1.png'
import './HeroSection.css'
import Boxes from '../assets/Boxes1.png'
import Ball3 from '../assets/ball2.png'
import Ball4 from '../assets/ball3.png'
import Ellipse25 from '../assets/Ellipse25.png'
import Red from '../assets/Red.png'
import BlueHexa from '../assets/BlueHexa.png'
import RedCorner from '../assets/RedCorner.png'
import { Link } from 'react-router-dom'
const home = () => {
    return (
        <>
            <div className="logo1">
                <img src={Logo} alt="logo" />
            </div>
            <div className='home-container'>
                <div className="left">
                    <h1>Boost Your Social Media Presence</h1>
                    <p>
                        Take your social media to the next level with proven growth tools, authentic and powerful engagement, and an online presence that sets you apart from the competition and drives results.
                    </p>
                    <img src={Linkedin2} alt="linkedin2" />
                    <div className="button">
                        <Link to='/login'>
                        <div>
                            <button className='create-account1'>Get Started</button>
                        </div>
                        </Link>
                        <Link to='/services'>  
                        <div className="gradient-button-wrapper1">
                                                      
                            <button className="get-discount1">View Services</button>
                                                   
                            </div>
                            </Link> 
                    </div>


                </div>
                <div className="right">

                    <img src={HeroImage} alt="heroImage" />
                    <img src={Instagram2} alt="instagram" className='insta' />
                </div>
                <img src={Snap2} alt="snap2" />
            </div >
            <img src={Boxes} alt="boxes" className='boxes' style={{ position: 'absolute', zIndex: 0 }} />
            <img src={Ellipse25} alt="ellipse23" className='ellipse23' style={{ "display": "block" }} />
            <div className="section2-container">
                <div className="section2">
                    <div className="heading1">
                        <p className="number">89,2K+</p>
                        <p className="label">In Revenue</p>
                    </div>
                    <div className="heading1">
                        <p className="number">7001+</p>
                        <p className="label">Qualified Leads</p>
                    </div>
                    <div className="heading1">
                        <p className="number">30,124+</p>
                        <p className="label">Trusted Customers</p>
                    </div>
                </div>
                <img src={facebook2} alt="facebook" className="facebook-img" />
            </div>

            <div className="section3">
                <div className="section3-left">
                    <img src={HeroImage1} alt="" />
                </div>
                <div className="section3-right">
                    <h1>Advance SMM Panel for All Your Needs</h1>
                    <p>Our SMM panel is a powerful tool designed to help you increase your social media presence and reach. With features such as automatic post scheduling, real-time analytics, and targeted audience engagement, you can easily manage and grow your social media accounts. Whether you're a small business looking to expand your reach or an influencer looking to grow your following, our panel has the tools you need to succeed.</p>

                    <img src={X2} alt="" className='X2' />
                    <img src={Youtube2} className='youtube2' alt="youtube2" />
                </div>
            </div>

            <div className="section4">
                <img src={Red} alt="red" className='red' />
                <button className="section4">How its Work</button>
                <h1 className="section4 heading-container">
                    Understanding How Our Powerful SMM System Works for You
                </h1>

                <div className="card-container">
                    <div className="cards">
                        <img src={Section4} alt="section4" />
                        <h2>Create An Account <br /> & Add Balance</h2>
                        <p>
                            Begin your journey with us by signing up and creating your account.
                            Once registered, access your account by logging in. To get started,
                            deposit funds.
                        </p>
                    </div>
                    <div className="cards">
                        <img src={Section4Img2} alt="sectionimg2" />
                        <h2>Select Your <br />Targeted Service</h2>
                        <p>
                            Select the services you need from either the Services page or the New
                            Order section. Easily find and choose the desired services to fulfill
                            your requirements.
                        </p>
                    </div>
                    <div className="cards">
                        <img src={Section4Img3} alt="sectionimg4" />
                        <h2>Provide Link, Quantity <br /> & Watch Results</h2>
                        <p>
                            Providing the correct links and quantities. Instantly view the total
                            cost of your order before finalizing. After placing an order, just wait
                            a few hours and watch the magic of SMM VIP.
                        </p>
                    </div>
                </div>

            </div>
            <div className="section5">
                <button className="section5">Why Choose Us</button>
                <h1 className="section5">
                    The Benefits of Choosing Our  Advanced SMM Panel Services
                    <img src={Ball2} alt="ball2" className='ball2' />
                    <img src={Dots} alt="dots" className='dots' />
                </h1>

                <div className="card-container2">
                    <div className="cards2">
                        <img src={Section5} alt="section5" />
                        <h2>Quality</h2>
                        <p>
                            Experience excellence with our high-quality SMM services. At SMM VIP, we're committed to delivering top-tier solutions that elevate your online presence and engagement, ensuring exceptional results for your brand.
                        </p>
                    </div>
                    <div className="cards2">
                        <img src={Section5Img1} alt="sectionimg1" />
                        <h2>Affortability</h2>
                        <p>
                            Experience excellence with our high-quality SMM services. At SMM VIP, we're committed to delivering top-tier solutions that elevate your online presence and engagement, ensuring exceptional results for your brand.
                        </p>
                    </div>
                    <div className="cards2">
                        <img src={Section5Img2} alt="sectionimg2" />
                        <h2>Speed</h2>
                        <p>
                            Experience excellence with our high-quality SMM services. At SMM VIP, we're committed to delivering top-tier solutions that elevate your online presence and engagement, ensuring exceptional results for your brand.
                        </p>
                    </div>
                    <div className="cards2">
                        <img src={Section5Img3} alt="sectionimg3" />
                        <h2>Usability</h2>
                        <p>
                            Experience excellence with our high-quality SMM services. At SMM VIP, we're committed to delivering top-tier solutions that elevate your online presence and engagement, ensuring exceptional results for your brand.
                        </p>
                    </div>
                </div>
            </div>
            <div className="section6">
                <div className="section6-left">
                    <h1>Empowering Resellers with the Fastest and Most Reliable SMM Panel</h1>
                    <p>
                        Discover unparalleled convenience and excellence in social media marketing with SMM <br /> VIP, the industry's foremost SMM panel for resellers. Our platform offers resellers a <br /> seamless experience, providing access to premium services and tools tailored to <br />  elevate your SMM ventures.
                    </p>
                    <div className="button">
                        <Link to='/signup'>
                        <div>
                            <button className='create-account' style={{zIndex: 1, cursor: 'pointer'}}>Create Account</button>
                        </div>
                        </Link>
                        <div className="gradient-button-wrapper">
                            <button className="get-discount">Get Discounts</button>
                        </div>
                    </div>
                </div>

                <div className="section6-right">
                    <div className="feature-item">
                        <div className="feature-text">
                            <img className="rectangle" src={Rectangle} alt="rectangle" />
                            <h4>Premium <br /> Services</h4>
                        </div>
                        <img src={Arrow} alt="arrow" />
                    </div>

                    <div className="feature-item">
                        <div className="feature-text">
                            <img className="rectangle" src={Rectangle} alt="rectangle" />
                            <h4>Seamless <br /> Integration</h4>
                        </div>
                        <img src={Arrow} alt="arrow" />
                    </div>
                    <div className="feature-item">
                        <div className="feature-text">
                            <img className="rectangle" src={Rectangle} alt="rectangle" />
                            <h4>Real-Time <br /> Analytics</h4>
                        </div>
                        <img src={Arrow} alt="arrow" />
                    </div>
                    <div className="feature-item">
                        <div className="feature-text">
                            <img className="rectangle" src={Rectangle} alt="rectangle" />
                            <h4>24/7 <br /> Support</h4>
                        </div>
                        <img src={Arrow} alt="arrow" />
                    </div>

                </div>
                <img src={BlueHexa} alt="" className='layer' />
            </div>
            <div className="section7">
                <h2 className='head'>Our Platforms</h2>
                <div className="section7-content">
                    <div className="social-grid">
                        <img className='section7-img' src={Inst} alt="Instagram" />
                        <img className='section7-img' src={Snap} alt="Snapchat" />
                        <img className='section7-img' src={Facebook} alt="Facebook" />
                        <img className='section7-img' src={Youtube} alt="YouTube" />
                        <img className='section7-img' src={Linkedin} alt="LinkedIn" />
                        <img className='section7-img' src={X} alt="X" />
                        <img src={Ball} alt="" className='ball' />
                    </div>
                    <div className="text-content">
                        <button className="services-button">OUR Services</button>
                        <img src={Youtube2} alt="youtube2" className='service-youtube2' />
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

            <div className="section8">
                <button className="faq">FAQS</button>
                <h1>Answers to the Most Common Questions from Our Users</h1>

                <div className="qa-grid">
                    <div className="qa-item">
                        <div className="qa-item-header">
                            <img src={Question} alt="question icon" />
                            <h2>How fast will I receive my  account after  purchase?</h2>
                        </div>
                        <p>
                            Instantly! Once payment is confirmed, account details are automatically delivered to your dashboard and email.
                        </p>
                    </div>

                    <div className="qa-item">
                        <div className="qa-item-header">
                            <img src={Question2} alt="question icon" />
                            <h2>Are all accounts <br /> verified and clean?</h2>
                        </div>
                        <p>
                            Smm panel is a panel where you can buy social media ( Facebook, Twitter, Instagram, YouTube, Spotify, Tiktok, and other social media ) likes, followers, views, Comments, Subscribers, and as well as Website traffic. Customers choose the cheapest smm panel because of its cheap price, faster delivery, and all social media services available on 1 website
                        </p>
                    </div>

                    <div className="qa-item">
                        <div className="qa-item-header">
                            <img src={Question3} alt="question icon" />
                            <h2>What payment methods are accepted?</h2>
                        </div>
                        <p>
                            We accept secure payments via Crypto, Debit/Credit Cards, and supported wallets. All transactions are encrypted.
                        </p>
                    </div>

                    <div className="qa-item">
                        <div className="qa-item-header">
                            <img src={Question4} alt="question icon" />
                            <h2>What happens if an <br /> account has an issue <br /> after delivery?</h2>
                        </div>
                        <p>
                            We offer a 48-hour replacement guarantee for any issues found with delivered accounts. Just contact our support team quickly.
                        </p>
                    </div>
                </div>
                {/* <img src={Ball3} alt="" className='homeballs1'/>
                       <img src={Ball4} alt=""   className='homeballs2'/> */}
                {/* <img src={RedCorner} alt=""  className='redCorner'/> */}
                {/* <img src={Ellipse25} alt="ellipse23" className='ellipse28' style={{"display": "block"}}/> */}


            </div>

        </>

    )
}

export default home
