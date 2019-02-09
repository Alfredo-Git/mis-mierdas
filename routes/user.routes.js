const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));
router.get('/:provider/cb', userController.createWithIDPCallback);
router.get('/mis-mierdas', authMiddleware.isAuthenticated, userController.profile);
router.post('/mis-mierdas/', authMiddleware.isAuthenticated, userController.createMierda);
router.post('/mis-mierdas/:id/delete', authMiddleware.isAuthenticated, userController.deleteMierda);
router.post('/logout', authMiddleware.isAuthenticated, userController.logout);

module.exports = router;
