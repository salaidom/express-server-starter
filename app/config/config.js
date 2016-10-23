'use strict';

/**
 * APPLICATION CONFIGURATION ENTRY POINT
 */
let path;

switch(process.env.NODE_ENV) {
    case 'development':     path = './config-development.js'; break;
    case 'test':            path = './config-test.js'; break;
    case 'staging':         path = './config-staging.js'; break;
    case 'production':      path = './config-production.js'; break;
    default:                path = './config-local.js'; break;
}

console.log('Application uses config at relative path: ', path); 

const config = require(path);

module.exports = config;