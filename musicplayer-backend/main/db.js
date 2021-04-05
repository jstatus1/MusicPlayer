const {Pool} = require('pg')
const keys = require('../config/keys')

let pool; 

if(process.env.NODE_ENV === 'production')
{
     pool = new Pool({
        user: 'postgres',
        host: 'uhmusicdb.cbe4xc31zdbo.us-east-2.rds.amazonaws.com',
        database: 'UHMusicDB',
        password: keys.postgresqlPassword,
        post: 5432
    })
}else{
     pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'mydb',
        password: keys.postgresqlPassword,
        post: 5432
    })
}
module.exports = pool

