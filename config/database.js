const mysql = require('mysql2/promise');
const {logger} = require('./winston');

const pool = mysql.createPool({
    host: '',
    user: 'admin',
    port: '3306',
    password: '',
    database: ''
});

module.exports = {
    pool: pool
};