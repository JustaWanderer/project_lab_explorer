const controller = require('./users-controller');
const express = require('express');
let router = new express.Router();

router.get('/', controller.getMenuPage);
router.get('/getUsers', controller.getUsers);
router.post('/addUser', controller.addUser);

module.exports = router;
