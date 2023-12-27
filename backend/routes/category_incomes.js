const express = require('express');
const auth = require('../middleware/auth');
const categoryIncomesCtrl = require('../controllers/category_incomes');

const router = express.Router();

router.post('/create', categoryIncomesCtrl.createCategory);
router.post('/:id/income-between-two-dates',categoryIncomesCtrl.getTotalSpendingsBetweenDates);

router.delete('/delete/:id', categoryIncomesCtrl.deleteCategory);
router.delete('/deleteAll',categoryIncomesCtrl.deleteAllCategories)

router.get('/',categoryIncomesCtrl.getAllCategories);


module.exports = router;