const mysql = require('mysql2')
const env = require('../helpers/env')

const connection = mysql.createConnection({
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.db,
    dateStrings: 'date'
})

module.exports = connection