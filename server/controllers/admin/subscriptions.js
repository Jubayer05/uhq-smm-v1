const SubscriptionPlan = require('../../models/subscriptions');

// ✅ Create a new subscription plan
const createPlan = async (req, res) => {

    const userId = req.user.id;

    try {
        const plan = new SubscriptionPlan({
            ...req.body,
            user: userId
        });
        await plan.save();
        res.status(201).json({ success: true, plan });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create plan', error: error.message });
    }
};

// ✅ Get all subscription plans with admin name
const getPlans = async (req, res) => {
  try {
    let plans;

    if (req.user.isAdmin) {
      plans = await SubscriptionPlan.find()
        .populate('user', 'name')
        .sort({ createdAt: -1 });
    } else {
      plans = await SubscriptionPlan.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscription plans', error: err.message });
  }
};


// ✅ Get a single plan by ID
const getPlanById = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findById(req.params.id)
            .populate('createdBy', 'name email');
        if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

        res.status(200).json({ success: true, plan });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving plan', error: error.message });
    }
};

// ✅ Delete a plan
const deletePlan = async (req, res) => {
    try {
        const deleted = await SubscriptionPlan.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Plan not found' });

        res.status(200).json({ success: true, message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete plan', error: error.message });
    }
};

module.exports = {
    createPlan,
    getPlans,
    getPlanById,
    deletePlan,
};
