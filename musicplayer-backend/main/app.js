var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var keys = require('../config/keys')


require('./services/passport')
var passport = require('passport');
var passportLocal = require('passport-local').Strategy
var session = require('express-session')

//Routes Files
const indexRouter = require('./routes')
var bodyParser = require('body-parser')

var app = express();




//Middle Ware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter)
require('./routes/authRoutes')(app);


module.exports = app;
