const express = require('express');
const auth = require('../middleware/auth');
const categoryCtrl = require('../controllers/category');

const router = express.Router();

router.post('/create', categoryCtrl.createCategory);

router.delete('/delete/:id', categoryCtrl.deleteCategory);

router.get('/',categoryCtrl.getAllCategories);


module.exports = router;