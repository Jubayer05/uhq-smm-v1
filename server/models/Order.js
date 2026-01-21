const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // customer
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminCategory', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminService', required: true },
  link: { type: String, required: true },
  quantity: { type: Number, required: true },
  charge: { type: Number, required: true },
  status: {
  type: String,
  enum: ['Pending', 'Approved', 'Cancel'],
  default: 'Pending',

},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
  type: Date,
},

});

module.exports = mongoose.model('Order', OrderSchema);
