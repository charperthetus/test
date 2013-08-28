/* global phantom: false, require: false, utils: false, jasmine: false, console: false */
/**
 * phantomjs_jasminexml_runner.js
 *
 * Test runner file to load given HTML page (typically phantomjsRunner.html) that is configured to run Jasmine specs
 *
 * This is adapted from https://github.com/detro/phantomjs-jasminexml-example
 */
var htmlrunner,
    resultdir,
    page,
    fs,
    TIMEOUT = 30000000; // give us a very long time to run tests...

phantom.injectJs("lib/utils/core.js");

if ( phantom.args.length !== 2 ) {
    console.log("Usage: phantom_test_runner.js HTML_RUNNER RESULT_DIR");
    phantom.exit();
} else {
    htmlrunner = phantom.args[0];
    resultdir = phantom.args[1];
    page = require("webpage").create();
    fs = require("fs");

    // Echo the output of the tests to the Standard Output
    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };

    page.open(htmlrunner, function(status) {
        if (status === "success") {
            utils.core.waitfor(function() { // wait for this to be true
                return page.evaluate(function() {
                    return typeof(jasmine.phantomjsXMLReporterPassed) !== "undefined";
                });
            }, function() { // once done...
                // Retrieve the result of the tests
                var f = null, i, len, filepath,
                    suitesResults = page.evaluate(function(){
                    return jasmine.phantomjsXMLReporterResults;
                });
                
                // Save the result of the tests in files
				if (!fs.exists(resultdir)) {
					fs.makeDirectory(resultdir);
				}

                for ( i = 0, len = suitesResults.length; i < len; ++i ) {
                    try {
						filepath = resultdir + "/" + suitesResults[i].xmlfilename;
                        f = fs.open(filepath, "w");
                        f.write(suitesResults[i].xmlbody);
                        f.close();
                    } catch (e) {
                        console.log(e);
                        console.log("phantomjs> Unable to save result of Suite '"+ suitesResults[i].xmlfilename +"'");
                    }
                }
                
                // Return the correct exit status. '0' only if all the tests passed
                phantom.exit(page.evaluate(function(){
                    return jasmine.phantomjsXMLReporterPassed ? 0 : 1; //< exit(0) is success, exit(1) is failure
                }));
            }, function() { // or, once it timesout...
                console.log("timeout running tests...");
                phantom.exit(1);
            }, TIMEOUT);
        } else {
            console.log("phantomjs> Could not load '" + htmlrunner + "'.");
            phantom.exit(1);
        }
    });
}
