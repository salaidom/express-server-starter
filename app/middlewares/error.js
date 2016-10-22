module.exports = function(error, request, response, next) {
    if(error) {
        switch(error.statusCode) {
            case 400: return response.status(error.statusCode).json({ error: 'Bad Request!' });  
            default: return response.status(500).json({ error: 'Internal Server Error!', detail: error });
        } 
    }
}