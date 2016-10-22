const indexRouter = require('./index.js');
const authenticationRouter = require('./authentication.js');

module.exports = function(app) {
    app.use('/', indexRouter);
    app.use('/', authenticationRouter);
}



