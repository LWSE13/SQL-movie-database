const db = require('pg-promise')();
const { username, password } = require('../UP.js');
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'movies_db',
    user: username,
    password: password,
};

const database = db(connection);

module.exports = database;