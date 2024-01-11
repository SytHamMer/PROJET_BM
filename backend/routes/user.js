const express = require('express');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/create', userCtrl.createUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/updatePassword/:id', userCtrl.updatePassword);
router.post('/updateEmail/:id', userCtrl.updateEmail);
router.post('/updateUsername/:id', userCtrl.updateUsername);


router.delete('/delete/:id', userCtrl.deleteUser);
router.delete('/deleteAll', userCtrl.deleteAllUsers);

router.get('/:id', userCtrl.getUserByID);
router.get('/', userCtrl.getAllUser);


module.exports = router;
