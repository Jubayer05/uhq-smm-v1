const express = require('express');
const router = express.Router();
const { getActivityLogs } = require('../../controllers/admin/activitylogs');
const { authMiddleware } = require('../../controllers/auth/auth-controller'); // Make sure path is correct

// @route   GET /api/activity-logs
// @desc    Get activity logs (all if admin, only own if vendor)
// @access  Protected
router.get('/getActivityLogs', authMiddleware, getActivityLogs);

module.exports = router;
