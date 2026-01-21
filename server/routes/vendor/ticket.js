// routes/order.js
const express = require('express');
const router = express.Router();
const { addTicket, getTickets } = require('../../controllers/vendor/ticket');
const {authMiddleware} = require('../../controllers/auth/auth-controller');
const { adminMiddleware } = require('../../middleware/admin');



// POST /api/order/new
router.post('/addTicket', authMiddleware, addTicket);
router.get('/getTickets', authMiddleware, getTickets);




module.exports = router;
