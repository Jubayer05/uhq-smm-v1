const Affiliate = require('../../models/Affiliates');

// Create a new affiliate
const createAffiliate = async (req, res) => {
  const {
    referralLink,
    referralCode,
    referrals,
    totalEarned,
    commission,
    currency,
    address,
    totalAmount,
    description,
    status
  } = req.body;

  const userId = req.user._id; // ✅ use _id not id

  try {
    const affiliate = new Affiliate({
      user: userId,
      referralLink,
      referralCode,
      referrals,
      totalEarned,
      commission,
      currency,
      address,
      totalAmount,
      description,
      status: status || 'Processing',
    });

    const saved = await affiliate.save();
    res.status(201).json({ success: true, message: 'Affiliate created', data: saved });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create affiliate',
      error: error.message,
    });
  }
};


// Get all affiliates (Admin only)
const getAllAffiliates = async (req, res) => {
  try {
    let affiliates;

    if (req.user?.isAdmin) {
      // ✅ Admin can see all affiliates
      affiliates = await Affiliate.find().populate('user', 'name');
    } else {
      // ✅ Vendor can only see their own affiliate record
      affiliates = await Affiliate.find({ user: req.user._id }).populate('user', 'name');
    }

    res.status(200).json({ success: true, affiliates });
  } catch (err) {
    console.error('Error fetching affiliates:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch affiliates' });
  }
};


// Update affiliate by ID (Admin only)
const updateAffiliate = async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }

  try {
    const updatedAffiliate = await Affiliate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Affiliate updated', data: updatedAffiliate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update affiliate', error: error.message });
  }
};

// Delete affiliate by ID (Admin only)
const deleteAffiliate = async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }

  try {
    await Affiliate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Affiliate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete affiliate', error: error.message });
  }
};

const updateAffiliateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  try {
    const affiliate = await Affiliate.findById(id);
    if (!affiliate) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    affiliate.status = status;
    await affiliate.save();

    res.status(200).json({ success: true, message: 'Order status updated', affiliate });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status', error: err.message });
  }
};



const getSingleAffiliate = async (req, res) => {
  try {
    const userId = req.user._id;

    const affiliate = await Affiliate.findOne({ user: userId });

    if (!affiliate) {
      return res.status(404).json({ success: false, message: 'Affiliate not found for this user.' });
    }

    res.status(200).json({ success: true, affiliate });
  } catch (error) {
    console.error('Error fetching single affiliate:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


// Export all
module.exports = {
  createAffiliate,
  getAllAffiliates,
  updateAffiliate,
  deleteAffiliate,
  updateAffiliateStatus,
  getSingleAffiliate
};
