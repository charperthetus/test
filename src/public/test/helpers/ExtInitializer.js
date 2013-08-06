/* global Ext: false, console: false */
Ext.Loader.setPath('Savanna', '../app');
Ext.Loader.setConfig({
    enabled: true,
    syncModeEnabled: true,
    disableCaching: false // NOTE: A great example of a confusing option "disableCaching is false when we do not want to prevent caching...":)
});
Ext.application({
    name: 'Savanna',
    autoCreateViewport: false,
    paths: { Savanna: '../app' }
});

// HELPER METHOD TO keep the DOM node for our test HTML empty...
/* jshint unused: false */
function cleanTestDom() {
	var testDom = Ext.get('test-html'),
        extJsTooltips = Ext.get('ext-quicktips-tip');

	if (testDom && testDom.dom && testDom.dom.children ) {
        testDom.dom.innerHTML = '';
    }

    if (extJsTooltips) {
        extJsTooltips.remove();
    }
}

function createTestDom() {
    if (!document.querySelector('#test-html')) {
        var body = document.querySelector('body');
        if (body) {
            var div = document.createElement('div');
            div.id = 'test-html';
            body.appendChild(div);
        }
        else {
            console.error('no body tag to append our test container to');
        }
    }
}
/* jshint unused: true */