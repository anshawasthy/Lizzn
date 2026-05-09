const express = require('express');
const User = require('../models/user.model');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware.authUser, authController.me);

module.exports = router;