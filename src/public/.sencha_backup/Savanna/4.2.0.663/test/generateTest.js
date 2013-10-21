/*jshint node: true */

/**
 * generateTest.js
 *
 * A simple Node CLI tool for generating boilplate spec/fixture files based upon the answers to a few, simple questions
 *
 * Usage:
 *
 * > cd /path/to/test/directory
 * > node generateTest.js
 * > What module would you like to test? Savanna.foo.Bar
 * > Will this test a view (yes|no)? yes
 * > Will this test a store (yes|no)? yes
 * > What fixture would you like to use? (leave it blank if you do not need a fixture) MyFixtureData
 * > Add any additional libraries to require (separated by commas): Ext.window.Window, Savanna.utils.Utils
 * > Successfully generated test file: /path/to/test/directory/specs/SavannaFooBarSpec.js
 * > Successfully generated fixture file: /path/to/test/directory/fixtures/MyFixtureData.js (you should be able to access the "JSON" fixture via the URL: "/fixture/MyFixtureData.json")
 *
 * CAVEATS:
 *
 *  - you must be in the test directory and have /specs and /fixtures directories underneath it
 */
var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    async = require('async'),
    ejs = require('ejs'),
    fs = require('fs'),
    fixtureOutputPath = __dirname + '/fixtures/',
    fixturePath = __dirname + '/fixtureTemplate.ejs',
    fixtureStr = fs.readFileSync(fixturePath, 'utf8'),
    testOutputPath = __dirname + '/specs/',
    templatePath = __dirname + '/specTemplate.ejs',
    templateStr = fs.readFileSync(templatePath, 'utf8'),
    templateData = {
        moduleBeingTested: '',
        isViewTest: false,
        isStoreTest: false,
        fixture: '',
        requires: []
    };

function camelCaseModuleName(moduleName) {
    var moduleParts = moduleName.split(/\./),
        upperCaseFirstLetter = function(word) {
            return word.replace(/^./, function(letter) { return letter.toUpperCase(); });
        };

    return moduleParts.map(upperCaseFirstLetter).join('');
}

async.series([
    function(callback) {
        rl.question('What module do you want to test? ', function(answer) {
            var fileName, testName;

            if (answer) {
                templateData.moduleBeingTested = fileName = answer.trim();

                testName = camelCaseModuleName(fileName) + 'Spec.js';

                testOutputPath += testName;

                fs.exists(testOutputPath, function(exists) {
                    callback(exists ? '"' + testName + '" already exists!' : null);
                });
            }
            else {
                callback('you must at least specify the module you want to test...');
            }
        });
    },
    function(callback) {
        rl.question('Will this test a view (yes|no)? ', function(answer) {
            templateData.isViewTest = answer && answer.trim().match(/^y(es)$/i);
            callback();
        });
    },
    function(callback) {
        rl.question('Will this a store (yes|no)? ', function(answer) {
            templateData.isStoreTest = answer && answer.trim().match(/^y(es)$/i);
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
        var renderedTemplateStr = ejs.render(templateStr, templateData),
            renderedFixtureStr;

        fs.writeFile(testOutputPath, renderedTemplateStr, function(err) {
            if (err) {
                console.error('Unable to write test to: ' + testOutputPath + ', "' + err + '"');
            }
            else {
                console.log('Successfully generated test file: ' + testOutputPath);
            }
        });

        if (templateData.fixture) {
            fixtureOutputPath += templateData.fixture + '.js';

            fs.exists(fixtureOutputPath, function(exists) {
                if (exists) {
                    console.log('Fixture file "' + fixtureOutputPath + '" already exists');
                }
                else {
                    renderedFixtureStr = ejs.render(fixtureStr, { fixtureName: templateData.fixture });

                    fs.writeFile(fixtureOutputPath, renderedFixtureStr, function(err) {
                        if (err) {
                            console.error('Unable to write fixture to: ' + fixtureOutputPath + ', "' + err + '"');
                        }
                        else {
                            console.log('Successfully generated fixture file: ' + fixtureOutputPath + ' ((you should be able to access the "JSON" fixture via the URL: "/fixture/' + templateData.fixture + '.json")');
                        }
                    });
                }
            });
        }
    }

    rl.close();
});