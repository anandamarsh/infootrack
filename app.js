var createError = require('http-errors');
var express = require('express');
var path = require('path');

const cors = require('cors');
cors({credentials: true, origin: true})

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

/* GET home page. */
app.use(express.static(__dirname + '/app/build'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.sendStatus(500);
});

module.exports = app;
