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
        requires: []
    };

async.series([
    function(callback) {
        rl.question('What module do you want to test?', function(answer) {
            templateData.moduleBeingTested = answer;
            callback();
        });
    }
], function(err, results) {
    var renderedTemplateStr = ejs.render(templateStr, templateData);
    console.log(renderedTemplateStr);
    rl.close();
});