const MassOrder = require('../../models/MassOrder');

const createMassOrder = async (req, res) => {
  try {
    const { serviceId, quantity, link } = req.body;

    if (!serviceId || !quantity || !link) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const order = await MassOrder.create({
      user: req.user.id, // Make sure you have auth middleware
      serviceId,
      quantity,
      link,
    });

    res.status(201).json({ success: true, message: 'Mass order placed successfully.', order });
  } catch (error) {
    console.error('Error creating mass order:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
// PUT /api/vendor/updateMassOrder/:id
const updateMassOrderStatus = async (req, res) => {
    
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedOrder = await MassOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Mass order not found' });
    }

    res.status(200).json({ success: true, message: 'Status updated successfully', order: updatedOrder });
  } catch (err) {
    console.error('Failed to update mass order status:', err);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};


// DELETE /api/vendor/deleteMassOrder/:id
const deleteMassOrder = async (req, res) => {
  try {
    const deletedOrder = await MassOrder.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Mass order not found' });
    }

    res.status(200).json({ success: true, message: 'Mass order deleted successfully' });
  } catch (err) {
    console.error('Failed to delete mass order:', err);
    res.status(500).json({ success: false, message: 'Failed to delete mass order' });
  }
};




const getAllMassOrders = async (req, res) => {
  try {
    let orders;

    if (req.user?.isAdmin) {
      // Admin can see all mass orders
      orders = await MassOrder.find().populate('user', 'name email').populate('serviceId', 'name');
    } else {
      // Normal user sees only their own orders
      orders = await MassOrder.find({ user: req.user._id }).populate('user', 'name email');
    }

    res.status(200).json({ success: true, massOrders: orders });
  } catch (err) {
    console.error('Failed to fetch mass orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch mass orders' });
  }
};


module.exports = { createMassOrder, getAllMassOrders, deleteMassOrder, updateMassOrderStatus}