const mongoose = require('mongoose');

const AdminServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
   categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminCategory', // 👈 refers to your category model
    required: true,
  },
   soldCount: {
    type: Number,
    default: 0, // ✅ start from zero
  }
});

module.exports = mongoose.model('AdminService', AdminServiceSchema);
