'use strict';

module.exports = function(error, request, response, next) {
    if(error) {
        return response.status(error.statusCode || 500).end(error.toString());  
    }
}