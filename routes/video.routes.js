const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const shitsController = require('../controllers/video.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, shitsController.list);

module.exports = router;
