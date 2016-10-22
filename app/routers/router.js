const indexRouter = require('./index.js');

module.exports = function(app) {
    app.use('/', indexRouter);
}



