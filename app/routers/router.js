const indexRouter = require('./index.js');
const authenticationRouter = require('./authentication.js');
const userRouter = require('./user.js');

module.exports = function(app) {
    app.use('/', indexRouter);
    app.use('/', authenticationRouter);
    app.use('/users', userRouter)
}



