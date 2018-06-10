const controller = require('./editor-controller');
const express = require('express');
const router = new express.Router();

router.get('/editor', controller.getMainPage);
router.get('/fieldTypes', controller.getFieldTypes);
router.get('/doorTypes', controller.getDoorTypes);

module.exports = router;
