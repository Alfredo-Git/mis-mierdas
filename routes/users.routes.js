const express = require('express');
const router = express.router();
const usersController = require('../controller/users.controller');

router.get('/', usersController.create);
router.post('/', usersController.doCreate);

module.exports = router;
