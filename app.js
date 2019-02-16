require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const passport = require('passport');
const mongoose = require('mongoose');

require('./configs/db.config');
require('./configs/hbs.config');
require('./configs/passport.config');

const indexRouter = require('./routes/index.routes');
const shitsRouter = require('./routes/shits.routes');
const userRouter = require('./routes/user.routes');
const videoRouter = require('./routes/video.routes');
const webRouter = require('./routes/web.routes');
const favoriteRouter = require('./routes/favorite.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'SuperSecret - (Change it)',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/shits', shitsRouter);
app.use('/user', userRouter);
app.use('/videos', videoRouter);
app.use('/urls', webRouter);
app.use('/favorites', favoriteRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;