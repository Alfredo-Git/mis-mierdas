const constants = require('../constants');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, videoController.getMierdaVideo);
router.post('/', authMiddleware.isAuthenticated, videoController.createMierdaVideo);
router.post('/:id/delete', authMiddleware.isAuthenticated, videoController.deleteMierdaVideo);

module.exports = router;
