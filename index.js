const http = require('http');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const router = require('./app/router.js');

const app = express();

app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json({ type: '*/*' }));

router(app);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on port: ', port);