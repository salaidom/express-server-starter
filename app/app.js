/**
 * APPLICATION BOOTSTRAP FILE
 */
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config-local.js');
const router = require('./routers/router.js');

const app = express();

mongoose.connect(config.db.prefix + '://' + config.db.host + ':' + config.db.port + '/' + config.db.name);

app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json({ type: '*/*' }));

router(app);

const port = process.env.PORT || config.env.port || 3000;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on port: ', port);