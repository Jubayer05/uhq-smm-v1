const ChildPanel = require('../../models/ChildPanel');

// Create a new Child Panel
const createChildPanel = async (req, res) => {
  const {
    domain,
    currency,
    username,
    password,
    confirmPassword,
    price
  } = req.body;

const userId = req.user._id;

  if (!domain || !currency || !username || !password || !confirmPassword || !price) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    const newPanel = new ChildPanel({
       user: userId,
      domain,
      currency,
      username,
      password,
      confirmPassword,
      price
    });

    const saved = await newPanel.save();
    res.status(201).json({ success: true, message: 'Child Panel created', data: saved });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create Child Panel',
      error: error.message
    });
  }
};

// Get all Child Panels (Admin only)
const getAllChildPanels = async (req, res) => {
  try {
    let panels;

    if (req.user?.isAdmin) {
      panels = await ChildPanel.find().populate('user', 'name');
    } else {
      panels = await ChildPanel.find({ user: req.user._id }).populate('user', 'name email');
    }

    res.status(200).json({ success: true, childPanels: panels });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch child panels' });
  }
};

// Update Child Panel (Admin only)
const updateChildPanel = async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }

  try {
    const updated = await ChildPanel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Child Panel updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update child panel', error: err.message });
  }
};

// Delete Child Panel (Admin only)
const deleteChildPanel = async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }

  try {
    await ChildPanel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Child Panel deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete child panel', error: err.message });
  }
};

module.exports = {
  createChildPanel,
  getAllChildPanels,
  updateChildPanel,
  deleteChildPanel
};
