var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var keys = require('../config/keys')
const passport = require("passport");
//Routes Files
const indexRouter = require('./routes')

var app = express();

require('./services/passportConfig');


/*---------------------Middle Ware--------------------------------*/
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*---------------------Middle Ware--------------------------------*/



/*--------------------- Routes --------------------------------*/
app.use('/', indexRouter)
require('./routes/authRoutes')(app);
/*--------------------- Routes --------------------------------*/


module.exports = app;
