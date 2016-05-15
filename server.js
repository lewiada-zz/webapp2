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

app.listen(process.env.PORT || 3000);
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// begin on the 'home page'
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/linkedin', function(req, res) {
    res.send('linkedin, duh');
});

app.get('/pinterest', function(req, res) {
    res.send('pinterest, duh');
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

app.get('/twitter', function(req, res) {
    res.send('twitter, duh');
});


// catch the authorization code
app.get('/cb', function(req, res) {
    
    // build the basic auth
    var client_id = "1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com";
    var password = "ioz503PlXXLr6tWb5Ij8AtLe";
    var auth = "Basic " + new Buffer(client_id + ":" + password).toString("base64");
    
    console.log('got the callback!');
    
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
                        
        // use the acces token to access the user profile
        /*
        request({
            uri: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'GET',
            headers: {
                "Authorization" : 'Bearer ' + JSON.parse(body).access_token
            }*/
            
        
        /* UNCOMMENT THIS
        request({
            uri: 'https://www.google.com/m8/feeds/contacts/lewiada@gmail.com/full',
            method: 'GET',
            headers: {
                "Authorization" : 'Bearer ' + JSON.parse(body).access_token
            }*/
            
       // get the result of the userinfo request    
    }, function(error, response, body) {
            
            // do something with the JSON
            res.send('whatever, baby!!');
            
            
            //var obj = JSON.parse(body);
            //res.render('person', { 
            //    name: obj.name, 
            //    picture: obj.picture,
            //    email: obj.email,
            //    sub: obj.id });
        });    
    });
    
    res.send(access_token); 
});


/*
 * This is what comes back from the userInfo endpoint (deprecated)

{ 
    "id": "114691386565712585775", 
    "email": "alewis17@hawk.iit.edu", 
    "verified_email": true, 
    "name": "Adam Lewis", 
    "given_name": "Adam", 
    "family_name": "Lewis", 
    "picture": "https://lh5.googleusercontent.com/a07Gs6WgKG4/AAAAAAAAAAI/AAAAAAAAACI/eKZ0otMbCEI/photo.jpg",
    "locale": "en", 
    "hd": "hawk.iit.edu" 
}

*/