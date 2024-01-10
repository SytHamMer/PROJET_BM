const express = require('express');
const auth = require('../middleware/auth');
const incomeCtrl = require('../controllers/income');

const router = express.Router();

router.post('/create', incomeCtrl.createIncome);

router.delete('/delete/:id', incomeCtrl.deleteIncome);
router.delete('/deleteAll',incomeCtrl.deleteAllIncomes);

router.get('/',incomeCtrl.getAllIncomes);
router.get('/sum',incomeCtrl.getSumAllIncomes)
router.get('/byIdUser/:id',incomeCtrl.getByIDUser);
router.get('/IncomesTwoDates/:id', incomeCtrl.getIncomestwoDates);


module.exports = router;