'use strict';

module.exports = function(error, request, response, next) {
    if(error) {
        response.status(error.statusCode || 500).end(error);  
    }
}