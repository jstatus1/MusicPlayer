var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var keys = require('../config/keys')
const passport = require("passport");
var AWS  = require('aws-sdk')
require('./services/passportConfig');

//Routes Files
const indexRouter = require('./routes')
var app = express();

AWS.config.update({region: 'us-east-2'});


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


/*---------------------S3--------------------------------*/
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});


/*--------------------- Routes --------------------------------*/
app.use('/', indexRouter)
require('./routes/authRoutes')(app);
/*--------------------- Routes --------------------------------*/


module.exports = app;
