import React, { useState } from 'react';
import '../styles/Faqs.css';

const faqs = [
  {
    question: 'What is SMM PANEL?',
    answer: 'Smm panel is a panel where you can buy social media ( Facebook, Twitter, Instagram, YouTube, Spotify, Tiktok, and other social media ) likes, followers, views, Comments, Subscribers, and as well as Website traffic...',
  },
  {
    question: 'Is SMM Panel Safe?',
    answer: 'The SMM panels on our platform are extremely safe, protected against DDoS assaults...',
  },
  {
    question: 'How does SMM VIP Work?',
    answer: 'SMM VIP assist you in connecting and interacting with a bigger base of current and potential customers...',
  },
  {
    question: 'Which is the best SMM Panel?',
    answer: 'SMM VIP is the best SMM panel as they provide smm services in cheap...',
  },
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Faqs</h1>
      {faqs.map((faq, index) => (
        <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
          <div className="faq-question" onClick={() => toggleFaq(index)}>
            <span>{faq.question}</span>
            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>
              {activeIndex === index ? '▲' : '▼'}
            </span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faqs;
