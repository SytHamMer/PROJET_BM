const express = require('express');
const auth = require('../middleware/auth');
const categorySpendingsCtrl = require('../controllers/category_spendings');

const router = express.Router();

router.post('/create', categorySpendingsCtrl.createCategory);
router.post('/:id/spending-between-two-dates',categorySpendingsCtrl.getTotalSpendingsBetweenDates);
router.post('/:id/budget',categorySpendingsCtrl.getTotalBudget);
router.post('/EachCategorySpendings/:id',categorySpendingsCtrl.getEachCategorySpendingsTotal);
// router.post('/:id/limit-between-two-dates',categorySpendingsCtrl.getTotalLimitsBetweenDates);

router.delete('/delete/:id', categorySpendingsCtrl.deleteCategory);
router.delete('/deleteAll',categorySpendingsCtrl.deleteAllCategories);

router.get('/',categorySpendingsCtrl.getAllCategories);
router.get('/:id/limit',categorySpendingsCtrl.getMonthlyLimit);
router.get('/byIdUser/:id',categorySpendingsCtrl.getByIDUser);



module.exports = router;

