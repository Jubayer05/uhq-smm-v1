// models/OrderReport.js
const mongoose = require('mongoose');

const orderReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: { type: String, required: true },       // e.g. "Payment Issue", "Delivery Delay"
  service: {type: String, required: true },
  serviceStatus: { type: String, enum: ['Approved', 'Pending', 'Blocked'], default: 'Pending' },   // e.g. "Pending", "Resolved"
  description: {type: String },
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderReport', orderReportSchema);
