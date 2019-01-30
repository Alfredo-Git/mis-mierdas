const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressSession = require('express-session');
const mongoSession = require('mongo-session');
const passport = require('passport');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users.routes');

const pruebaUtils = require('./utils/prueba');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', usersRouter);

pruebaUtils.addNumbers(2,3);

module.exports = app;


