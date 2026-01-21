const mongoose = require('mongoose');

const childPanelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  domain: { type: String, required: true },
  currency: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('ChildPanel', childPanelSchema);
