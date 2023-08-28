var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/user.routes');
var adminRouter = require('./routes/admin.routes');
const YAML = require('yamljs');
const cors = require('cors');

var app = express();

// Configuration des variables d'environnement
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// Configuration de la base de donnée
const dbMongoose = require('./configuration/mongodb.databaseconnector');
dbMongoose.connectDB();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuration CORS, à modifier à la mise en production
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// ROUTES
const version = process.env.VERSION || 'v1'
const apiBaseUrl = `/api/${version}`

app.use("/", indexRouter);

app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'swagger.html'));
});

app.get('/docs', (req, res) => {
  res.render('swagger', { swaggerURL: '/swagger.json' });
});

app.get('/swagger.json', (req, res) => {
  res.sendFile(__dirname + '/views/swagger.json');
});


app.use(`${apiBaseUrl}/users`, usersRouter);
app.use(`${apiBaseUrl}/admin`, adminRouter);

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

module.exports = app;
