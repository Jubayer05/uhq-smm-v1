const express = require('express');
const router = express.Router();
const {
  createRefund,
  getAllRefunds,
  updateRefundStatus,
  deleteRefund
} = require('../../controllers/admin/refund');

const { authMiddleware} = require('../../controllers/auth/auth-controller');


router.post('/addRefund', authMiddleware, createRefund);


router.get('/getAllRefunds', authMiddleware, getAllRefunds);


router.put('/updateRefundStatus/:id', authMiddleware, updateRefundStatus);


router.delete('/deleteRefund/:id', authMiddleware, deleteRefund);

module.exports = router;
