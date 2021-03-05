const {Pool} = require('pg')
const keys = require('../config/keys')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: keys.postgresqlPassword,
    post: 5432
})

module.exports = pool

