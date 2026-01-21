const Refund = require('../../models/Refund');
const Order = require('../../models/Order');

// Create Refund Request
const createRefund = async (req, res) => {
  const { orderId, amount, reason } = req.body;
  const userId = req.user._id;

  try {
    // Validate order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (amount > order.charge) {
      return res.status(400).json({ message: 'Refund amount cannot exceed order amount' });
    }

    // Prevent duplicate refund
    const existing = await Refund.findOne({ orderId });
    if (existing) {
      return res.status(400).json({ message: 'Refund already requested for this order' });
    }

    const refund = new Refund({
      orderId,
      user: userId,
      amount,
      reason
    });

    await refund.save();
    res.status(201).json({ success: true, message: 'Refund requested successfully', refund });

  } catch (err) {
    res.status(500).json({ message: 'Failed to request refund', error: err.message });
  }
};

// Get All Refunds (Admin or User)
const getAllRefunds = async (req, res) => {
  try {
    let refunds;

    if (req.user.isAdmin) {
      // Admin gets all refunds
      refunds = await Refund.find()
        .populate('user', 'name')
        .sort({ createdAt: -1 });
    } else {
      // User gets only their refunds
      refunds = await Refund.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({ success: true, refunds });

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch refunds', error: err.message });
  }
};

// Update Refund Status (Admin)
const updateRefundStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const refund = await Refund.findById(id);
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    refund.status = status;
    await refund.save();

    res.status(200).json({ success: true, message: 'Refund status updated', refund });

  } catch (err) {
    res.status(500).json({ message: 'Failed to update refund status', error: err.message });
  }
};

// Delete Refund (Admin)
const deleteRefund = async (req, res) => {
  const { id } = req.params;

  try {
    const refund = await Refund.findById(id);
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    await refund.deleteOne();

    res.status(200).json({ success: true, message: 'Refund deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to delete refund', error: err.message });
  }
};

// Get Single Refund
const getSingleRefund = async (req, res) => {
  const { id } = req.params;

  try {
    const refund = await Refund.findById(id)
      .populate('user', 'name email');

    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    res.status(200).json({ success: true, refund });

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch refund', error: err.message });
  }
};

module.exports = {
  createRefund,
  getAllRefunds,
  updateRefundStatus,
  deleteRefund,
  getSingleRefund
};
