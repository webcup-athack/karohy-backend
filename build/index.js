"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var debug_1 = __importDefault(require("debug"));
debug_1.default.debug('karohy-backend:server');
// const debug = require('debug')('karohy-backend:server');
var http_1 = __importDefault(require("http"));
var port = process.env.PORT || '3000';
server_1.default.set('port', port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(server_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            // process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            // process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    // const addr = server.address();
    // const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    // debug('Listening on ' + bind);
    console.log('Listening on port', port);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
