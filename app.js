var express = require('express');
var path = require('path');
var logger = require('morgan');
var home = require('./routes/index');
var api = require('./routes/api');
var app = express();
var loginRouter = require('./routes/login');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
global.IOTCookie = 'iot_cookie';
app.use(cookieParser(IOTCookie));
global.clientIP = '1';



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', home);

app.use('/home', home);

app.use('/api', api);

app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', {status:err.status, message:err.message});
});



module.exports = app;
