const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apiurl: {
    type: String,
    required: true
  },
  apikey: {
    type: String,
    required: true
  },
  balance: { // changed from 'Balance'
    type: Number,
    required: true
  },
  syncservices: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Provider', ProviderSchema);
