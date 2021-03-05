var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../../config/keys')

var pool = require('../db')

passport.serializeUser((user, done) => {
    done(null, user.uid)
});

passport.deserializeUser((uid, done) => {
   pool.query(`SELECT * FROM users WHERE uid=$1 LIMIT 1)`, [uid], (q_err, q_res) => {
    done(null, q_res.rows[0])
   })
});

//passport OAuth
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done)=> {
        //using google id as a reference to see if user exists/storage
        // pool.query(`SELECT * FROM users WHERE googleid=$1 LIMIT 1)`, [(profile.id).toString()], 
        //     (q_err, q_res) => {
        //     if(q_err) return q_err
            
        //     //user doesn't exist
        //     if(q_res.rows.length == 0)
        //     {
        //         console.log("User Doesn't Exist Will Be Creating It!!")
        //             const value = [profile.displayName, 
        //             profile.name.givenName,
        //             profile.name.familyName, 
        //             profile.emails[0].value, 
        //             profile.emails[0].verified,
        //             (profile.id).toString(),
        //             profile.photos[0].value]
                    
        //             pool.query(`INSERT INTO users(username,first_name,last_name, email, 
        //                                           email_verified,googleId,profile_img_url,
        //                                           date_created)
        //                             VALUES($1, $2, $3, $4,$5,$6,$7, NOW())
        //                             ON CONFLICT DO NOTHING`,value)
        //            return done(null, false)                 
                   
                    
        //     }else{
        //          done(null, q_res.rows[0]);
        //     }
        //})

       
        pool.query(`SELECT * FROM users WHERE googleid=$1 LIMIT 1)`, [(profile.id).toString()]).then((res) => {
            console.log(res.rows[0])
            done(null, res.rows[0])
        }).catch((err) => {
            console.log(err)
        })

    })
)