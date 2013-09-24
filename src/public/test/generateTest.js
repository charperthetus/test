/*jshint node: true */
var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    async = require('async'),
    ejs = require('ejs'),
    fs = require('fs'),
    templatePath = __dirname + '/specTemplate.ejs',
    templateStr = fs.readFileSync(templatePath, 'utf8'),
    templateData = {
        moduleBeingTested: '',
        isViewTest: false,
        isControllerTest: false,
        isStoreTest: false,
        fixture: '',
        requires: []
    };

async.series([
    function(callback) {
        rl.question('What module do you want to test? ', function(answer) {
            if (answer) {
                templateData.moduleBeingTested = answer.trim();
                callback();
            }
            else {
                callback('you must at least specify the module you want to test...');
            }
        });
    },
    function(callback) {
        rl.question('Will this test a view? ', function(answer) {
            templateData.isViewTest = answer && answer.match(/^y(es)$/i);
            callback();
        });
    },
    function(callback) {
        rl.question('Will this a store? ', function(answer) {
            templateData.isStoreTest = answer && answer.match(/^y(es)$/i);
            callback();
        });
    },
    function(callback) {
        rl.question('What fixture would you like to use? (leave it blank if you do not need a fixture) ', function(answer) {
            if (answer) {
                templateData.fixture = answer.trim();
            }
            callback();
        });
    },
    function(callback) {
        rl.question('Add any additional libraries to require (separated by commas): ', function(answer) {
           templateData.requires = answer.trim().split(/\s*,\s*/).filter(function(require) { return require; });
            callback();
        });
    }
], function(err) {
    if (err) {
        console.error('Error: ', err);
    }
    else {
        var renderedTemplateStr = ejs.render(templateStr, templateData);
        console.log(renderedTemplateStr);
    }

    rl.close();
});