const passport = require('passport');
var pool = require('../db')
const bcrypt = require('bcryptjs')


module.exports = app => {
  app.get(

    //Google OAuth
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/discovery');
    }
  );

  app.post('/auth/login', (req, res, next ) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json({message: {validPassword:true}})
    
      })(req, res, next);   
  });

  app.post('/auth/login/callback', (req, res, next) => {
    passport.authenticate('local')(req, res, next);
  });



  app.post('/auth/register', async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    

    
    //check to see if the user already exist
      await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          return res.send({status: true, message: {
            userExist: true
          }})
        }else {
          const hashedPassword = await bcrypt.hash(password, 10);
          
          const value = [username, email,hashedPassword]

          await pool.query(`INSERT INTO users(username, email, password)
                            VALUES($1, $2, $3)
                            ON CONFLICT DO NOTHING`,value, async (error, result)=> {
                              if(error)
                              {
                                res.send({status: false, message: 'Failed To Create User'})
                              }else
                              {
                                res.send({status: true, message: {
                                  userExist: true
                                }})
                              }
                            })
        }
      })
    }
  )

  

  //Others
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });


  //check if user exist with email
  app.get('/api/checkEmail', async (req, res) => {
      let email = req.query.email
      await  pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, results) => {
        if (err) {
          throw err;
        }
        
        if (results.rows.length > 0) {
          return res.send({status: true, message: {
            userExist: true
          }})
        }else {
          return res.send({status: true, message: {
            userExist: false
          }})
        }
      });
  })

  function ProfileEditLogic(varname, variable, $number) {
    if (variable === 'nodata') { return ' ' }
    else {
      return ` ` + varname + ` = $` + $number 
    }

  }
  app.post('/api/updateProfile', async (req, res, next) => {
      let old_username = req.body.old_username
      let new_username = req.body.new_username
      let old_password = req.body.old_password
      let new_password = req.body.new_password
      let first_name = req.body.first_name
      let last_name = req.body.last_name
      let email = req.body.email
      let about_me = req.body.about_me

      const hashedOldPassword =  await bcrypt.hash(old_password, 10);
      const hashedNewPassword =  await bcrypt.hash(new_password, 10);

      value = [old_username, new_username, hashedOldPassword, hashedNewPassword, first_name, last_name, email, about_me ]
      query = `UPDATE users 
      SET ${ProfileEditLogic('username', new_username, 2)}, ${ProfileEditLogic('password', new_password, 4)},
          ${ProfileEditLogic('first_name',first_name,5)}, ${ProfileEditLogic('last_name',last_name,6)},
          ${ProfileEditLogic('email',email,7)}, ${ProfileEditLogic('about_me',about_me,8)}
          WHERE username = $1 AND password = $3`

      console.log(query)

      await pool.query(query,value, (q_err, q_res)=> {
                              if(error) {
                                q_res.send({status: false})
                              }
                              else {
                                res.send({status: true}) 
                                }})
                              }
                            )

  }




