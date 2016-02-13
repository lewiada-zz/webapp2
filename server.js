// I did this!  :-)
// deploy

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.listen(process.env.PORT || 3000);

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// return a default index.htm
app.get('/', function(req, res) {
    res.render('index');
});

// process the callback!
app.get('/cb', function(req, res) {
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head><body>Emma Frost baby!</body></html>');
});

// return some html with css
app.get('/emma', function(req, res) {
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head><body>Emma Frost</body></html>');
});


// return some json data
app.get('/api', function(req, res) {
    res.json({firstname: 'adam', lastname: 'lewis'});
});


// handle a 'get' with query params
app.get('/person/:codename', function(req, res) {
    res.render('person', { codename: req.params.codename, 
                          firstname: req.query.firstname,
                          lastname: req.query.lastname                           
                         });
});









// handle a 'post' with from data
    //?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=openid&approval_prompt=force&access_type=offline

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/oauth', urlencodedParser, function(req, res) {
    
    //res.send('thank you, ' + req.body.firstname + ' ' + req.body.lastname + '.');;    
    var propertiesObject = { field1:'test1', field2:'test2' };
    
    
    request({
        uri: "https://accounts.google.com/o/oauth2/auth",
        qs: {
            scope: 'openid',
            response_type: 'code',
            redirect_uri: 'http://fathomless-waters-41872.herokuapp.com/cb',
            client_id: '1057843692494-0830gbb8q4r9metu3t30h2ms8nljago8.apps.googleusercontent.com'
        }
    }, function(error, response, body) {
        res.send(body);
    })
});











// handle a 'post' with json data
var jsonParser = bodyParser.json();
app.post('/personjson', jsonParser, function(req, res) {
       
    res.send('Thank you for the JSON data');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});






/*
 * some API function ...
 *
 *//*
app.get('/api/person/:id', function (req, res) {
    // get that data from database
    res.json({firstname: 'john', lastname: 'doe'});
});

app.post('/api/person', jsonPaser, function (req, res) {
    // save to the database
});

app.delete('/api/person/:id', function (req, res) {
    // delete from the database
});*/





/*
app.get('/person/:id', function(req, res) {
    res.send(req.params.id)
});*/

/*
app.post('/', function(req, res) {
    
});*/

/*
app.get('/', function(req, res) {
    res.render('index');
});*/











/*
 * create a new server object with a callback (Event Listener)
 * 
http.createServer(function(req, res) {
    
    if (req.url === '/api') {
        console.log('1');
        res.writeHead(200, { 'Content-Type':'application/json'});

        var obj = {
            firstname: 'betsy',
            lastname: 'bradock'
        };

        res.end(JSON.stringify(obj));    
    } else if (req.url === '/') {
        console.log('2');
        fs.createReadStream(__dirname + '/index.htm').pipe(res);
    } else {
        console.log('3');
    }
    
    
}).listen(1137, '127.0.0.1');
*/
