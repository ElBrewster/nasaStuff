var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var indexRouter = require('./routes/index');

var app = express();
let PORT = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// -----------moved bin/www into app.js--------------------
// const { onListening, onError, normalizePort } = require("utils/onListening");
// var debug = require('debug')('marsRoversApp:server');
// const http = require("http");

// const server = http.createServer(app);

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// --------------------------------------------------------
const helmet = require("helmet");
app.use(helmet({
  contentSecurityPolicy:({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

