/*
 * This is my first real node.js program.  It is a very simple program which implements a
 * Web-based OIDC client that allows the user to login with a Google id_token and then uses
 * the Google access_token to get the user's profile and finally (upon logon) displays the
 * user's human name, email address, avatar, and unique subject identifier.
 *
 * To implement this simple program, I used a number of useful node modules, including:
 * express, querystring, request, and ejs.  
 *
 * express --> makes things like routing, writing APIs, and working with HTTP easier
 * querystring -->
 * request -->
 * ejs --> 
 *
 */

var express = require('express');
var queryString = require('querystring');
var request = require('request');
var app = express();

var access_token = undefined;
var email = undefined;

app.listen(process.env.PORT || 3000);
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// begin on the 'home page'
app.get('/', function(req, res) {
    res.render('index');
});



app.get('/google', function(req, res) {
        
    var queryParams = queryString.stringify({ 
        response_type: 'code',
        scope: 'openid profile email https://www.google.com/m8/feeds', 
        response_type: 'code',
        client_id: '1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com',
        redirect_uri: 'http://fathomless-waters-41872.herokuapp.com/cb'
    });

    res.writeHead(301, {Location: 'https://accounts.google.com/o/oauth2/auth?' + queryParams});
    res.end(); 
});

app.get('/contacts', function(req, res) {
    
    request({
        uri: 'https://www.google.com/m8/feeds/contacts/' + email + '\/full',
        method: 'GET',
        headers: {
            "Authorization" : 'Bearer ' + access_token
        }
    }, function(error, response, body) {
        res.send(body);
    });    
});


// catch the authorization code
app.get('/cb', function(req, res) {
    
    // build the basic auth
    var client_id = "1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com";
    var password = "ioz503PlXXLr6tWb5Ij8AtLe";
    var auth = "Basic " + new Buffer(client_id + ":" + password).toString("base64");
        
    // swap the code for tokens
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
                
       // process the response
    }, function(error, response, body) {
        
        access_token = JSON.parse(body).access_token;
        
        // get some basic info about the user
        request({
            uri: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'GET',
            headers: {
                "Authorization" : 'Bearer ' + access_token
            }                
            
       // get the result of the userinfo request    
    }, function(error, response, body) {
            
            //res.send('okie dokie')
        
        res.send('access token 2 = ' + access_token);
            
            // do something with the JSON
            var obj = JSON.parse(body);
            
            name = obj.name;
            picture = obj.picture;
            email = obj.email;
            id = obj.id;
        });
            
        
        res.render('person', { 
            name: name, 
            picture: picture,
            email: email,
            id: id 
        });*/
    });
});