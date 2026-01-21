const express = require('express');
const router = express.Router();
const { createMassOrder, getAllMassOrders, updateMassOrderStatus, deleteMassOrder } = require('../../controllers/admin/MassOrder');
const {authMiddleware} = require('../../controllers/auth/auth-controller'); // Make sure this middleware sets `req.user`

router.post('/addMassOrder', authMiddleware, createMassOrder);
router.get('/getAllMassOrders', authMiddleware, getAllMassOrders);
router.put('/updateMassOrderStatus/:id', authMiddleware, updateMassOrderStatus);
router.delete('/deleteMassOrder/:id', authMiddleware, deleteMassOrder);


module.exports = router;
