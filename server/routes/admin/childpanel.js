const router = require('express').Router();
const {
  createChildPanel,
  getAllChildPanels,
  updateChildPanel,
  deleteChildPanel
} = require('../../controllers/admin/childpanel');
const {authMiddleware} = require('../../controllers/auth/auth-controller')

router.post('/addChildPanel', authMiddleware, createChildPanel);
router.get('/getAllChildPanels', authMiddleware, getAllChildPanels);
router.put('/updateChildPanel/:id', authMiddleware, updateChildPanel);
router.delete('/deleteChildPanel/:id', authMiddleware, deleteChildPanel);

module.exports = router;
