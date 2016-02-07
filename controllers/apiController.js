module.exports = function(app) {
    
    app.get('/api/person/:id', function (req, res) {
        // get that data from database
        res.json({firstname: 'john', lastname: 'doe'});
    });

    app.post('/api/person', jsonPaser, function (req, res) {
        // save to the database
    });

    app.delete('/api/person/:id', function (req, res) {
        // delete from the database
    });
}