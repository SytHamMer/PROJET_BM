const express = require('express');
const auth = require('../middleware/auth');
const categoryIncomesCtrl = require('../controllers/category_incomes');

const router = express.Router();

router.post('/create', categoryIncomesCtrl.createCategory);
router.post('/:id/income-between-two-dates',categoryIncomesCtrl.getTotalIncomesBetweenDates);
router.post('/EachCategoryIncomes/:id',categoryIncomesCtrl.getEachCategoryIncomesTotal);

router.delete('/delete/:id', categoryIncomesCtrl.deleteCategory);
router.delete('/deleteAll',categoryIncomesCtrl.deleteAllCategories)

router.get('/',categoryIncomesCtrl.getAllCategories);
router.get('/byIdUser/:id',categoryIncomesCtrl.getByIDUser);


module.exports = router;