"use strict";

/**
 * APPLICATION BOOTSTRAP FILE
 */
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import applciation configuration, routes and middleware
const config = require("./config/config.js");
const router = require("./routers/router.js");
const errorMiddleware = require("./middlewares/error.js");

// Create expressjs app
const app = express();

// Connect and configure database
mongoose.connect(
  config.database.prefix +
    "://" +
    config.database.host +
    ":" +
    config.database.port +
    "/" +
    config.database.name
);
mongoose.Promise = Promise;

// Setup application middleware
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
app.use(helmet());
app.use(bodyParser.json({ type: "*/*" }));

// Register application routes
router(app);

// Error handling middleware
app.use(errorMiddleware);

// Setup and start the server
const port = process.env.PORT || config.environment.port || 3000;
const server = http.createServer(app);

server.listen(port);

// Exporting server for testing purposes
module.exports = server;
