const service = require('./users-service');
const path = require('path');

const getMenuPage = (req, res) => {
    res.sendFile(path.resolve('static/menu.html'));
};

const getUsers = (req, res) => {
    const query = req.query.query ? req.query.query : {};
    service.getUsers(query)
        .then((result) => {
            res.json(result);
        }, console.error);
};

const addUser = (req, res) => {
    const user = req.body;
    service.addUser(user)
        .then(() => {
            res.send('ok');
        }, console.error);
};

const getLevels = (req, res) => {
    const query = req.query.query ? req.query.query : {};
    service.getLevels(query)
        .then((result) => {
            res.json(result);
        }, console.error);
};

const createLevel = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const levelData = req.body.levelData;
    service.createLevel(login, password, levelData)
        .then(() => {
            res.send('ok');
        }, console.error);
};

module.exports = {
    getMenuPage: getMenuPage,
    getUsers: getUsers,
    addUser: addUser,
    getLevels: getLevels,
    createLevel: createLevel,
};
