const controller = require('./users-controller');
const express = require('express');
let router = new express.Router();

router.get('/', controller.getMenuPage);
router.get('/getUsers', controller.getUsers);
router.post('/addUser', controller.addUser);
router.get('/getLevels', controller.getLevels);
router.post('/createLevel', controller.createLevel);

module.exports = router;
