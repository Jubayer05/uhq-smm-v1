// RefundPolicy.jsx
import React from 'react';
import './refundpolicy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-container">
      <h1>Refund Policy</h1>
      <p>We do not offer refunds once the order is placed and started processing, except under rare cases where the service fails to deliver entirely.</p>
      <ul>
        <li>All purchases are final and non-refundable.</li>
        <li>If a service fails completely and the issue is on our end, you may be eligible for a partial or full refund, or a balance credit.</li>
        <li>Refunds are not issued for delays or partial drops after completion.</li>
        <li>Chargebacks without contacting us first may result in account suspension.</li>
      </ul>
      <p>For any refund issues, contact support at: <strong>support@uhqsmm.com</strong></p>
    </div>
  );
};

export default RefundPolicy;
