const passport = require('passport');
var pool = require('../db')
const bcrypt = require('bcryptjs')
const LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../../config/keys')


    const authenticateUser = (email, password, done) => {
      console.log(email, password);
      pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            const user = results.rows[0];
  
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.log(err);
              }
              if (isMatch) {
                return done(null, user);
              } else {
                //password is incorrect
                return done(null, false, { message: "Password is incorrect" });
              }
            });
          } else {
            // No user
            return done(null, false, {
              message: "No user with that email address"
            });
          }
        }
      );
    };


  
    passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        authenticateUser
      )
    );

    passport.use(
      new GoogleStrategy({
          clientID: keys.googleClientID,
          clientSecret: keys.googleClientSecret,
          callbackURL: '/auth/google/callback'
      }, 
      (accessToken, refreshToken, profile, done)=> {
          pool.query(`SELECT * FROM users WHERE googleid=$1 LIMIT 1`, [(profile.id).toString()],
              (q_err, q_res)=> {
                  if(q_err)
                  {
                      return done(q_err);
                  }
  
                  if(q_res.rows.length > 0)
                  {
                      const user = q_res.rows[0];
                      return done(null, user);
                  }
              }
          )
  
      })
  )


    // Stores user details inside session. serializeUser determines which data of the user
    // object should be stored in the session. The result of the serializeUser method is attached
    // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
    //   the user id as the key) req.session.passport.user = {id: 'xyz'}
    passport.serializeUser((user, done) => done(null, user.uid));
  
    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    // The fetched object is attached to the request object as req.user
  
    passport.deserializeUser((uid, done) => {
      pool.query(`SELECT * FROM users WHERE uid = $1`, [uid], (err, results) => {
        if (err) {
          return done(err);
        }
        console.log(`ID is ${results.rows[0].uid}`);
        return done(null, results.rows[0]);
      });
    });
 