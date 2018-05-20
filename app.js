var createError = require('http-errors');
var express = require('express');

const cors = require('cors');
cors({credentials: true, origin: true})

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

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
