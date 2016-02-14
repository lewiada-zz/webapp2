// I did this!  :-)
// deploy
// https://developers.google.com/identity/protocols/OpenIDConnect

var express = require('express');
var queryString = require('querystring');
var request = require('request');
var app = express();

app.listen(process.env.PORT || 3000);
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// begin on the 'home page'
app.get('/', function(req, res) {
    res.render('index');
});

// OAuth Authorization Request
app.post('/oauth', function(req, res) {
    
    queryString.stringify({ response_type: 'code' });
    var queryParams = queryString.stringify({ 
        scope: 'openid profile email', 
        response_type: 'code',
        client_id: '1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com',
        redirect_uri: 'http://fathomless-waters-41872.herokuapp.com/cb'
    });

    res.writeHead(301, {Location: 'https://accounts.google.com/o/oauth2/auth?' + queryParams});
    res.end();
});


// OAuth Token Request
app.get('/cb', function(req, res) {
    
    var client_id = "1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com";
    var password = "ioz503PlXXLr6tWb5Ij8AtLe";
    var auth = "Basic " + new Buffer(client_id + ":" + password).toString("base64");
    
    request({
        uri: 'https://accounts.google.com/o/oauth2/token',
        method: 'POST',
        headers: {
            "Authorization" : auth
        },
        form: {
            code: req.query.code,
            grant_type: 'authorization_code',
            client_id: '1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com',
            redirect_uri: 'http://fathomless-waters-41872.herokuapp.com/cb'
        }        
    }, function(error, response, body) {        
        
        // access the profile API
        var obj = JSON.parse(body);
        request({
            uri: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'GET',
            headers: {
                "Authorization" : 'Bearer ' + obj.access_token
            }      
    }, function(error, response, body) {
            var obj = JSON.parse(body);
            //res.render('person', { name: obj.name, picture: obj.picture });
            res.send(body);
        });
        
    });
});