const express = require('express');
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../../controllers/admin/category');
const { adminMiddleware } = require('../../middleware/admin');
const {authMiddleware} = require('../../controllers/auth/auth-controller')


router.post('/addCategory', adminMiddleware, addCategory);
router.get('/getAllCategories', authMiddleware, getAllCategories);
router.put('/updateCategory/:id', adminMiddleware, updateCategory);
router.delete('/deleteCategory/:id', adminMiddleware, deleteCategory);

module.exports = router;
