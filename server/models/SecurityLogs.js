const mongoose = require('mongoose');

const securityLogSchema = new mongoose.Schema({
      event: { type: String, required: true },
  ipAddress: { type: String, required: true },
  device: { type: String, required: true },
  dateTime: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('SecurityLog', securityLogSchema);
