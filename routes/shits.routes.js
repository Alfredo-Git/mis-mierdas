const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const shitsController = require('../controllers/shits.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, shitsController.list);
router.post('/', authMiddleware.isAuthenticated, shitsController.doCreate);

module.exports = router;
