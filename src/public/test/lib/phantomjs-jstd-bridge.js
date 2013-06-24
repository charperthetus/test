/**
 * Taken from https://github.com/halvards/jstd-phantomjs to allow phantomJs to run with JsTestDriver
 */
var page = require('webpage').create();
var system = require('system');
var url = system.args[1];
console.log('Loading ' + url);
page.open(url, function(status) {
  console.log('Loaded ' + url + ' with status ' + status);
});

