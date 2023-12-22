const express = require('express');
const auth = require('../middleware/auth');
const incomeCtrl = require('../controllers/income');

const router = express.Router();

router.post('/create', incomeCtrl.createIncome);

router.delete('/delete/:id', incomeCtrl.deleteIncome);

router.get('/',incomeCtrl.getAllIncomes);
router.get('/sum',incomeCtrl.getSumAllIncomes)


module.exports = router;