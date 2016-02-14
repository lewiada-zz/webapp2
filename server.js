// I did this!  :-)
// deploy

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var queryString = require('querystring');
var request = require('request');
var app = express();

app.listen(process.env.PORT || 3000);
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// return a default index.htm
app.get('/', function(req, res) {
    res.render('index');
});

// OAuth authorization request
app.post('/oauth', function(req, res) {
    
    queryString.stringify({ response_type: 'code' });
    var queryParams = queryString.stringify({ 
        scope: 'openid', 
        response_type: 'code',
        client_id: '1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com',
        redirect_uri: 'http://fathomless-waters-41872.herokuapp.com/cb'
    });

    res.writeHead(301, {Location: 'https://accounts.google.com/o/oauth2/auth?' + queryParams});
    res.end();
});


// swap code for tokens
var jsonParser = bodyParser.json();
app.get('/cb', jsonParser, function(req, res) {
    
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
        
        var obj = JSON.parse(body);
        //res.send(response.body); // works
        res.send('5' + obj.access_token);
        //res.send('4. ' + response.body.access_token); // doesn't work
        //res.render('tokens', { id_token: res.body.id_token, access_token: res.body.access_token });
    });
    
});










