const express = require('express');
const auth = require('../middleware/auth');
const spendingCtrl = require('../controllers/spending');

const router = express.Router();

router.post('/create', spendingCtrl.createSpending);

router.delete('/delete/:id', spendingCtrl.deleteSpending);

router.get('/',spendingCtrl.getAllSpendings);


module.exports = router;