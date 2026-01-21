const mongoose = require('mongoose');

const massOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Optional: If you’re using user accounts
    required: true,
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminService',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    enum: ['Pending', 'Approved'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MassOrder', massOrderSchema);
