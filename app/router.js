const indexRouter = require('../modules/index/router.js');

module.exports = function(app) {
    app.use('/', indexRouter);
}



