const express = require('express');
const auth = require('../middleware/auth');
const spendingCtrl = require('../controllers/spending');

const router = express.Router();

router.post('/create', spendingCtrl.createSpending);

router.delete('/delete/:id', spendingCtrl.deleteSpending);
router.delete('/deleteAll', spendingCtrl.deleteAllSpendings)

router.get('/',spendingCtrl.getAllSpendings);
router.get('/byIdUser/:id',spendingCtrl.getByIDUser);
router.get('/TwoDates/:id', spendingCtrl.getSpendingstwoDates);


module.exports = router;