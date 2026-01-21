const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../../controllers/auth/auth-controller');
const { getSystemErrors, addSystemErrors } = require('../../controllers/admin/systemerrors');

router.get('/getSystemErrors', authMiddleware, getSystemErrors)
router.post('/log-frontend-error', authMiddleware, addSystemErrors);

module.exports = router;