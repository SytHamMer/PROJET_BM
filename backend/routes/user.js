const express = require('express');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/create', userCtrl.createUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.post('/updatePassword', userCtrl.updatePassword);
router.delete('/delete/:id', userCtrl.deleteUser);

// router.get('/:id', userCtrl.getByIdUser);
router.get('/', userCtrl.getAllUser);


module.exports = router;