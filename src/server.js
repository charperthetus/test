/* jshint node: true */
/* global ThetusTestHelpers: false */

/**
 * server.js
 *
 * Simple Node server for developing HTML clients
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    modRewrite = require('connect-modrewrite'),
    fs = require('fs'),
    app = express(),
    httpProxy = require('http-proxy'),
    routingProxy = new httpProxy.RoutingProxy();

var geoserverProxy = function (pattern, host, port) {
    return function (req, res, next) {
        if (req.url.match(pattern)) {
            routingProxy.proxyRequest(req, res, {host: host, port: port})
        } else {
            next();
        }
    }
};

// Templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(geoserverProxy(/\/geoserver\/.*/, 'arcgisrs', 8080));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(modRewrite([
    '(.*);jsessionid=(.*)$ $1 [L]' // strip jsessionid from any requests (that is used in requests to Spring services)
]));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Interrupt the SpecRunner.html request and insert tests requested
app.get('/test/SpecRunner.html', function(req,res) {
    fs.readFile('./public/test/SpecRunner.html', function(err, data){
        var html = data.toString();

        // If there is a "test" query in the query string and it's not 'all'
        if( req.query && req.query.savanna_test_chooser && req.query.savanna_test_chooser !== 'all' ){

            var scriptRequested = '<script type="text/javascript" src="specs/' + req.query.savanna_test_chooser + '"></script>',
                scriptStartLocation = html.indexOf('<!--[#parserstart]-->'),
                scriptEndLocation = html.indexOf('<!--[#parserend]-->');
            html = html.replace(html.substring(scriptStartLocation, scriptEndLocation), scriptRequested);
            res.send(html);

        // Else just send the document
        } else {
            res.send(html);
        }
    });
});

app.get('/tests', function(req, res) {
    var testsLocation = './public/test/specs';
    res.render('test-picker', { tests: fs.readdirSync(testsLocation) });
});

/**
 * Enable the sending of JSON data from the test/fixtures directory
 *
 * Expects a name of a json file and converts that to the name of the fixture file and serves the "json" data (if any)
 */
app.all('/fixture/*', function(req, res) {
    var fixtureName = req.params[0].replace(/\.json.*$/, ''),
        fixturePath = __dirname + '/public/test/fixtures/';

    fixturePath += fixtureName + '.js';

    fs.exists(fixturePath, function(exists) {
        if (exists) {
            fs.readFile(fixturePath, { encoding: 'utf8' }, function(err, data) {
                if (err) {
                    console.error('Error trying to read "' + fixturePath + '", ' + err);
                    res.status(404);
                }
                else {
                    try {
                        // NOTE: yes, we are doing an eval here...it's our own code, so we better not be malicious...
                        /* jshint evil: true */
                        eval(data);
                        /* jshint evil: false */

                        if (ThetusTestHelpers && ThetusTestHelpers.Fixtures && ThetusTestHelpers.Fixtures[fixtureName] && ThetusTestHelpers.Fixtures[fixtureName].json) {
                            res.json(ThetusTestHelpers.Fixtures[fixtureName].json);
                        }
                        else {
                            console.error('Unable to find ThetusTestHelpers.Fixtures.' + fixtureName + ' data');
                            res.status(404);
                        }
                    }
                    catch(e) {
                        console.error('Error parsing fixture file "' + fixturePath + '", ' + e);
                        res.status(404);
                    }
                }
            });
        }
        else {
            console.error(fixturePath + ' does not exist');
            res.status(404);
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
