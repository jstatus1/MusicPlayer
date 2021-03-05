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

    const InsertUser = async (profile, done)  => {
      const value = [profile.displayName, 
        profile.name.givenName,
        profile.name.familyName, 
        profile.emails[0].value, 
        profile.emails[0].verified,
        (profile.id).toString(),
        profile.photos[0].value]

        await pool.query(`INSERT INTO users(username,first_name,last_name, email, 
                                                    email_verified,googleId,profile_img_url,
                                                    date_created)
                                      VALUES($1, $2, $3, $4,$5,$6,$7, NOW())
                                      ON CONFLICT DO NOTHING`,value, async (error, result)=> {
                                        if (error) {
                                          console.log(error);
                                        }
                                      })
        

                                      await pool.query(`SELECT * FROM users WHERE googleid=$1 LIMIT 1`, [(profile.id).toString()],
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
                                      })
  }


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
          callbackURL: '/auth/google/callback',
          proxy: true
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
                  }else{
                    InsertUser(profile, done)   
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
        if(results.rows.length < 1)
        {
          return done(null, false)
        }else{
          console.log(`UID is ${results.rows[0].uid}`);
          return done(null, results.rows[0]);
        }
      });
    });
 