const express = require('express');
const router = express.Router();
const { addProvider, getAllProviders, updateProviderStatus } = require('../../controllers/admin/provider');
const {adminMiddleware} = require('../../middleware/admin')
// POST /api/providers
router.post('/addProvider', adminMiddleware, addProvider);
router.get('/getAllProviders', adminMiddleware, getAllProviders);
router.put('/updateProviderStatus/:id', adminMiddleware, updateProviderStatus);


module.exports = router;
