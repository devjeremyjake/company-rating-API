const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/UserCtrl');

router.get('/home/:email', userCtrl.homePage);

router.post('/signup/user', userCtrl.createUser);
router.post('/login/user', userCtrl.loginUser);

module.exports = router;