const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'vendor'],
    default: 'user',
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/40',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // 👇 Affiliate & Referral Fields
  referralCode: {
    type: String,
    unique: true,
  },
  referredBy: {
    type: String, // store referral code of the referrer
    default: null,
  },
  referrals: {
    type: Number,
    default: 0,
  },
  totalEarned: {
    type: Number,
    default: 0,
  },
  commission: {
    type: Number,
    default: 10, // 10%
  },
});
module.exports = mongoose.model('User', UserSchema);