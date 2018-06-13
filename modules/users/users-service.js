const Datastore = require('nedb');
const path = require('path');
const h = require('./../helpers/helpers');

let users = new Datastore({
    filename: 'db/users.db',
    autoload: true,
});

let levels = new Datastore({
    filename: 'db/levels.db',
    autoload: true,
});

const getUsers = (query) => {
    return new Promise((resolve, reject) => {
        h.db.select(users, query).then(resolve, reject);
    });
};

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        h.db.insert(users, user).then(resolve, reject);
    });
};

const getLevels = (query) => {
    return new Promise((resolve, reject) => {
        h.db.select(levels, query).then(resolve, reject);
    });
};

const createLevel = (login, password, levelData) => {
    return new Promise((resolve, reject) => {
        h.db.select(users, {login: login}).then((user) => {
            if (user[0].password == password) {
                h.db.insert(levels, {jsonData: levelData, author: user[0].login}).then(resolve, reject);
            }
        }, reject);
    });
};

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    getLevels: getLevels,
    createLevel: createLevel,
};
