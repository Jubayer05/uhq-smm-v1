const express = require('express')
const router= express.Router();

const {addPricing, updatePricing, deletePricing, price, displayAllPricing} = require('../controllers/specialPricing');

router.post('/addPricing', addPricing);
router.put('/updatePricing/:id', updatePricing);
router.delete('/deletePricing/:id', deletePricing);
router.get('/singlePrice/:id', price);
router.get('/displayAllPricings', displayAllPricing);

module.exports = router;