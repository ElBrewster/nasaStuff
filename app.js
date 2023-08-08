var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var indexRouter = require('./routes/index');

var app = express();
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8000;
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const helmet = require("helmet");
app.use(helmet({
  contentSecurityPolicy:({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
}));

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

