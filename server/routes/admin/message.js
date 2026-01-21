// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  deleteMessage,
  updateMessage,
} = require('../../controllers/admin/message');
const {authMiddleware} = require('../../controllers/auth/auth-controller')


router.post('/addMessage', authMiddleware, createMessage);
router.get('/getAllMessages', authMiddleware, getAllMessages);
router.put('/updateMessage/:id', authMiddleware, updateMessage);
router.delete('/deleteMessage/:id', authMiddleware, deleteMessage);

module.exports = router;
