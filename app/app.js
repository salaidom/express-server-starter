/**
 * APPLICATION BOOTSTRAP FILE
 */
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import important files like config and router
const config = require('./config/config-local.js');
const router = require('./routers/router.js');

// Create expressjs app
const app = express();

// Connect to database
mongoose.connect(config.db.prefix + '://' + config.db.host + ':' + config.db.port + '/' + config.db.name);

// Setup application level middleware
app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json({ type: '*/*' }));

// Register application routes
router(app);

// Setup and start the server
const port = process.env.PORT || config.env.port || 3000;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on port: ', port);

// Exporting server for testing purposes
module.exports = server