/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var _ = require('lodash');
var path = require('path');
var expressValidator = require('express-validator');
var sass = require('node-sass-middleware');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');

/**
 * Create Express server.
 */
var app = express();
var instagram = require('./controllers/api.js');

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'expanded'
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


app.get('/', instagram.getImages);
app.get('/user/:id', instagram.getUser);

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
