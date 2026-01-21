import React from 'react';
import '../styles/TermsConditions.css';

const TermsConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <ul>
        <li>By placing an order with our panel, you automatically accept all the below-listed terms of service whether you read them or not.</li>
        <li>We reserve the right to change these Terms of Service without notice. You are expected to read all terms of service before placing every order to ensure you are up to date with any changes or any future changes.</li>
        <li>You will only use our website in a manner which follows all agreements made with all the social media websites on their individual Terms of Service pages.</li>
        <li>Our rates are subject to change at any time without notice. The terms stay in effect in the case of rate changes.</li>
        <li>We do not guarantee a delivery time for any services. We offer our best estimation for when the order will be delivered. This is only an estimation, and we will not refund orders that are processing if you feel they are taking too long.</li>
        <li>We are trying hard to deliver exactly what is expected from us by our re-sellers. In this case, we reserve the right to change a service type if we believe it necessary to complete an order.</li>
      </ul>
    </div>
  );
};

export default TermsConditions;
