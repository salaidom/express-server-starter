/**
 * APPLICATION CONFIG FILE
 * 
 * This file might also serve as a template for other config files for different environemnts.
 * If you create new config files out of this one, don't forget to change the config route in '/app/config/config.js' file.
 */
module.exports = {
    environment: {
        host: 'localhost',
        port: '3000'
    },
    database: {
        prefix: 'mongodb',
        host: 'localhost',
        port: '27017',
        name: 'express-server-starter'
    },
    hash: {
        password: 'a70142b4de11b68c24d294850fe2cc7864d67122'
    },
}
