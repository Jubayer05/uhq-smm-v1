const express = require('express');
const { createUser, login, authMiddleware, logout, getMe } = require('../../controllers/auth/auth-controller');
const User = require('../../models/User');
const  {adminMiddleware}   = require('../../middleware/admin')
const router = express.Router();

router.post('/createUser', createUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

// ✅ Fixed /getUsers route
router.get('/getUsers', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'orders',          // 👈 collection name (check in MongoDB, should be lowercase plural)
          localField: '_id',
          foreignField: 'user',
          as: 'orders',
        },
      },
      {
        $addFields: {
          totalOrders: { $size: '$orders' },
          totalSpent: { $sum: '$orders.charge' }, // 👈 optional, remove if not needed
        },
      },
      {
        $project: {
          orders: 0, // 👈 don’t include full orders array, only totals
        },
      },
    ]);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});



module.exports = router;
