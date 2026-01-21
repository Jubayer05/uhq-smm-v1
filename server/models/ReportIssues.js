const mongoose = require('mongoose');

const OrderReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: { type: String, required: true },
  serviceStatus: { type: String, required: true },
  description: { type: String, required: true },
  service: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', OrderReportSchema);
