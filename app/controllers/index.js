'use strict';

module.exports.index = function(request, response, next) {
    response.status(200).end('Ok');
}