const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., Login, Register
  actor: { type: String, required: true }, // name of the actor
  action: { type: String, required: true }, // what was done
  affectedItem: { type: String, required: true }, // what was affected
  ipAddress: { type: String, required: true },
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
