var pool = require('../db')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy


module.exports = function(passport)
{
    passport.use('local',
        new localStrategy({passReqToCallback : true},(req, email, password, done) => {
            pool.query(`SELECT * FROM users WHERE email=$1 LIMIT 1)`, [email], 
                (q_err, q_res) => {
                  if(q_err) throw q_err
                  if(q_res.rows.length == 0)  return done(null, false) 
                  bcrypt.compare(password, q_res.rows[0].password, (err, result) => {
                      if(err) throw err;
                      if(result === true)
                      {
                          return done(null, q_res.rows[0])
                      }else{
                          return done(null, false)
                      }
                  })
            })
        })
    )


    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    }); 
}
