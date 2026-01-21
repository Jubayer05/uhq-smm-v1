// models/SubscriptionPlan.js
const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Basic', 'Pro', 'Elite'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'annually'],
    default: 'annually',
  },
  features: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  depositBonus: {
    type: Number,
    default: 0,
  },
  isMostPopular: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
