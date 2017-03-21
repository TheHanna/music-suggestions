var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// add routes
app.use('/', routes);

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message
  })
});

module.exports = app;
