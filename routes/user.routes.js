const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));
router.get('/:provider/cb', userController.createWithIDPCallback);
router.post('/logout', authMiddleware.isAuthenticated, userController.logout);

module.exports = router;
