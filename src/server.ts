var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index.routes');
import indexRouter from './routes/index.routes';
var usersRouter = require('./routes/user.routes');
var adminRouter = require('./routes/admin.routes');
import { readFile } from 'fs';
import cors from 'cors';

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const version = process.env.VERSION || 'v1';
const apiBaseUrl = `/api/${version}`;
const port = process.env.PORT || '3000';

app.use('/', indexRouter);

// Swagger
const ENVIRONMENT_NAMES = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};
function modifySwaggerHost(content: any, host: any, scheme: any) {
  const newContent = JSON.parse(content);
  newContent.host = host;
  newContent.schemes = scheme;
  return JSON.stringify(newContent); // Convert back to string
}

app.get('/docs', (req: any, res: any) => {
  let host = process.env.HOST || req.headers.host;
  let scheme =
    process.env.SCHEME === 'http' || process.env.SCHEME === 'https'
      ? [process.env.SCHEME]
      : ['https'];
  if (
    process.env.ENVIRONMENT === ENVIRONMENT_NAMES.LOCAL ||
    host === `localhost:${port}`
  ) {
    (host = `localhost:${port}`), (scheme = ['http']);
  }

  readFile('src/views/swagger.json', 'utf8', (err: any, data: any) => {
    if (err) {
      console.error('Error reading swagger.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Modify content based on environment
    const modifiedSwaggerContent = modifySwaggerHost(data, host, scheme);

    // Serve the Swagger UI HTML page with modified JSON URL
    const swaggerUIHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui-bundle.js"></script>
        <script>
          const ui = SwaggerUIBundle({
            spec: ${modifiedSwaggerContent}, // URL to modified swagger.json
            dom_id: '#swagger-ui',
          });
        </script>
      </body>
      </html>
    `;
    res.send(swaggerUIHtml);
  });
});

app.get(`/swagger.json`, (req: any, res: any) => {
  res.sendFile(__dirname + `/views/swagger.json`);
});

app.use(`${apiBaseUrl}/users`, usersRouter);
app.use(`${apiBaseUrl}/admin`, adminRouter);

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// // error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;