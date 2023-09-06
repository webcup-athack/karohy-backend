"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importStar(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var index_routes_1 = __importDefault(require("./routes/index.routes"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var admin_routes_1 = __importDefault(require("./routes/admin.routes"));
var fs_1 = require("fs");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
// Configuration des variables d'environnement
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
// Configuration de la base de donnée
var mongodb_databaseconnector_1 = require("./configuration/mongodb.databaseconnector");
(0, mongodb_databaseconnector_1.connectDB)();
app.use((0, cors_1.default)());
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, cookie_parser_1.default)());
// app.use(static(path.join(__dirname, 'public')));
var version = process.env.VERSION || 'v1';
var apiBaseUrl = "/api/".concat(version);
var port = process.env.PORT || '3000';
app.use('/', index_routes_1.default);
// Swagger
var ENVIRONMENT_NAMES = {
    LOCAL: 'local',
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
};
function modifySwaggerHost(content, host, scheme) {
    var newContent = JSON.parse(content);
    newContent.host = host;
    newContent.schemes = scheme;
    return JSON.stringify(newContent); // Convert back to string
}
app.get('/docs', function (req, res) {
    var host = process.env.HOST || req.headers.host;
    var scheme = process.env.SCHEME === 'http' || process.env.SCHEME === 'https'
        ? [process.env.SCHEME]
        : ['https'];
    if (process.env.ENVIRONMENT === ENVIRONMENT_NAMES.LOCAL ||
        host === "localhost:".concat(port)) {
        (host = "localhost:".concat(port)), (scheme = ['http']);
    }
    var swaggerFilePath = path_1.default.resolve(__dirname, 'swagger.json');
    (0, fs_1.readFile)(swaggerFilePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading swagger.json:', err);
            return res.status(500).send('Error reading swagger');
        }
        // Modify content based on environment
        var modifiedSwaggerContent = modifySwaggerHost(data, host, scheme);
        // Serve the Swagger UI HTML page with modified JSON URL
        var swaggerUIHtml = "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <title>Swagger UI</title>\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui.css\">\n      </head>\n      <body>\n        <div id=\"swagger-ui\"></div>\n        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui-bundle.js\"></script>\n        <script>\n          const ui = SwaggerUIBundle({\n            spec: ".concat(modifiedSwaggerContent, ", // URL to modified swagger.json\n            dom_id: '#swagger-ui',\n          });\n        </script>\n      </body>\n      </html>\n    ");
        res.send(swaggerUIHtml);
    });
});
app.get('/swagger.json', function (req, res) {
    res.sendFile(__dirname + '/views/swagger.json');
});
app.use("".concat(apiBaseUrl, "/users"), user_routes_1.default);
app.use("".concat(apiBaseUrl, "/admin"), admin_routes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// // error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
