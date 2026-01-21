const express = require('express');
const router = express.Router();
const {  deleteUser, updateUserStatus, SingleUser } = require('../../controllers/admin/userdetails-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller'); // or move to middlewares
const {adminMiddleware} = require('../../middleware/admin');

// Admin-protected routes 
router.delete('/delete/:id', adminMiddleware, deleteUser);
router.put('/update/:id/status',  adminMiddleware, updateUserStatus);
router.get('/getsingleuser/:id', authMiddleware, adminMiddleware, SingleUser)
module.exports = router;
