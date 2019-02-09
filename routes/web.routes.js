const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const webController = require('../controllers/web.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, webController.getMierdaWeb);
router.post('/', authMiddleware.isAuthenticated, webController.createMierdaWeb);
router.post('/:id/delete', authMiddleware.isAuthenticated, webController.deleteMierdaWeb);

module.exports = router;
