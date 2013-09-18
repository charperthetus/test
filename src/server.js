
/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , modRewrite = require('connect-modrewrite')
    , fs = require('fs');

var app = express();

// Templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(addCorsHeaders);
app.use(app.router);
app.use(modRewrite([
    '(.*);jsessionid=(.*)$ $1 [L]'
]));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Test Chooser Page (builds dynamically)
app.get('/tests', function(req, res) {
    var testPath = './public/test/specs';
    res.render('test-picker', { tests: fs.readdirSync(testPath) });
});

// Spec Runner Generator
app.post('/test-runner', function(req, res) {
    if( !req.body ) {
        // If no params are passed, run all tests
        res.render('spec-runner', { tests: 'all' });
    } else {
        // Else run the specified test(s)
        res.render('spec-runner', req.body);        
    }
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


function addCorsHeaders(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
    res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
}
