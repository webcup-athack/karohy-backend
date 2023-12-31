import app from './server';

import debug from 'debug';
debug.debug('karohy-backend:server');
// const debug = require('debug')('karohy-backend:server');
import http from 'http';
const port = process.env.PORT || '3000';

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
