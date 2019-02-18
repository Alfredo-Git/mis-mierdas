const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const shitsController = require('../controllers/video.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, shitsController.list);
router.post('/:id/delete', authMiddleware.isAuthenticated, shitsController.doDelete);
router.post('/:id/update', authMiddleware.isAuthenticated, shitsController.update);
router.post('/:id/favorite', authMiddleware.isAuthenticated, shitsController.favorite);

module.exports = router;
