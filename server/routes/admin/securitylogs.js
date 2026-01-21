
const express = require('express');
const router = express.Router();
const { getSecurityLogs } = require('../../controllers/admin/securitylogs');
const { authMiddleware } = require('../../controllers/auth/auth-controller');

// Route: GET /api/security-logs
router.get('/getSecurityLogs', authMiddleware, getSecurityLogs);

module.exports = router;
