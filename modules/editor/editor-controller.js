const service = require('./editor-service');
const path = require('path');

const getMainPage = (req, res) => {
    res.sendFile(path.resolve('static/editor.html'));
};

const getFieldTypes = (req, res) => {
    res.json(service.getFieldTypes());
};

const getDoorTypes = (req, res) => {
    res.json(service.getDoorTypes());
};

module.exports = {
    getMainPage: getMainPage,
    getFieldTypes: getFieldTypes,
    getDoorTypes: getDoorTypes,
};

