const router = require('express').Router();
const {
  createAffiliate,
  getAllAffiliates,
  updateAffiliate,
  deleteAffiliate,
  updateAffiliateStatus,
  getSingleAffiliate
} = require('../../controllers/admin/affiliates');
const {authMiddleware} = require('../../controllers/auth/auth-controller')

router.post('/addAffiliate', authMiddleware, createAffiliate);
router.get('/getAllAffiliates', authMiddleware, getAllAffiliates);
router.get('/getSingleAffiliate', authMiddleware, getSingleAffiliate);
router.put('/updateAffiliate/:id', authMiddleware, updateAffiliate);
router.delete('/deleteAffiliate/:id', authMiddleware, deleteAffiliate);
router.put('/updateAffiliateStatus/:id', authMiddleware, updateAffiliateStatus);
module.exports = router;
