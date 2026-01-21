const ActivityLog = require('../../models/Activitylogs');

const getActivityLogs = async (req, res) => {
  try {
    let logs;

    if (req.user.isAdmin) {
      // Admin: get all activity logs
      logs = await ActivityLog.find()
        .sort({ dateTime: -1 })
        .populate('user', 'name');  // Show user name
    } else {
      // Vendor/User: get only their own activity logs
      logs = await ActivityLog.find({ user: req.user._id })
        .sort({ dateTime: -1 });
    }

    res.status(200).json({ success: true, logs });
  } catch (err) {
    console.error('Error fetching activity logs:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs' });
  }
};

module.exports = { getActivityLogs };
