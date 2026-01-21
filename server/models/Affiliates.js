const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // customer
  referralLink: { type: String, required: true },
  referralCode: { type: String, required: true },
  referrals: { type: Number, required: true }, // assuming this is a count
  totalEarned: { type: Number, required: true },
  commission: { type: Number, required: true },
  currency: { type: String, enum: ['USD', 'LTD'], required: true },
  address: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['Processing', 'Completed'],
    default: 'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Affiliate', affiliateSchema);
