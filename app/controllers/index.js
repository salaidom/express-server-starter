module.exports.index = function(req, res) {
    res.status(200).json({ 
        message: 'Hello World!' 
    });
}