const SecurityLog = require('../../models/SecurityLogs');

const getSecurityLogs = async (req, res) => {
  try {
    let logs;


    if (req.user.isAdmin) {
      // Admin: get all logs
      logs = await SecurityLog.find()
      .sort({ createdAt: -1 })
        .populate('user', 'name');
    } else {
      // Vendor: get only their own logs
      logs = await SecurityLog.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({ success: true, logs });
  } catch (err) {
    console.error('Error fetching logs:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch logs' });
  }
};

module.exports = { getSecurityLogs };
