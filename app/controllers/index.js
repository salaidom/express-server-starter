'use strict';

module.exports.index = function(request, response, next) {
    return response.status(200).end('OK');
}