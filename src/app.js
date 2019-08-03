// jshint esversion: 8
require('dotenv').config({path: './config/dev.env'});
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');
const generalRouter = require('./routers/general');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(generalRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
hbs.registerPartials(path.join(__dirname, '../views/partials'));


module.exports = app;
