const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../controllers/auth/auth-controller')
const {addFund, updateFundStatus, deleteFund, fund, getAllFunds} = require('../controllers/fundsAddHistory')

router.post('/addFund', authMiddleware,  addFund);
router.put('/updateFundStatus/:id', updateFundStatus);
router.delete('/deleteFund/:id', deleteFund);
router.get('/singleFund/:id', fund);
router.get('/getAllFunds',authMiddleware, getAllFunds);



module.exports = router;