const express = require('express');
const router = express.Router();
const {
  createPlan,
  getPlans,
  getPlanById,
  deletePlan
} = require('../../controllers/admin/subscriptions');
const {authMiddleware} = require('../../controllers/auth/auth-controller');

router.post('/addSubscription', authMiddleware, createPlan);
router.get('/getAllSubscriptions', authMiddleware, getPlans);
router.get('/getSubscriptions/:id', authMiddleware, getPlanById);
router.delete('/deleteSubscription/:id', authMiddleware, deletePlan);

module.exports = router;
