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
mongoose.connect(config.database.prefix + '://' + config.database.host + ':' + config.database.port + '/' + config.database.name);

// Configure mongoose to use native promises
mongoose.Promise = Promise; 

// Setup application level middleware
app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json({ type: '*/*' }));

// Register application routes
router(app);

// Error handling middleware
app.use(function(err, req, res, next) {
    if(err) {
        res.json(err);
    } else {
        res.json({ error: 'Something went wrong!' });
    }
});

// Setup and start the server
const port = process.env.PORT || config.environment.port || 3000;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on port: ', port);

// Exporting server for testing purposes
module.exports = server