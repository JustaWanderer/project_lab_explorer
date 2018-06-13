const Datastore = require('nedb');
const path = require('path');
const h = require('./../helpers/helpers');

let users = new Datastore({
    filename: 'db/users.db',
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

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
};
