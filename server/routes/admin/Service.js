// routes/vendorRoutes.js
const express = require('express');
const router = express.Router();
const {
  addService,
  getAllServices,
  updateService,
  deleteService,
  getServicesByCategory,
  getPopularServices
} = require('../../controllers/admin/service');
const { adminMiddleware } = require('../../middleware/admin');
const { authMiddleware } = require('../../controllers/auth/auth-controller');

router.post('/addService', adminMiddleware, addService);
router.get('/getAllServices', authMiddleware, getAllServices);
router.put('/updateService/:id', adminMiddleware, updateService);
router.delete('/deleteService/:id', adminMiddleware, deleteService);
router.get('/getPopularService', authMiddleware, getPopularServices)
router.get('/getServicesByCategory', authMiddleware, getServicesByCategory);


module.exports = router;
