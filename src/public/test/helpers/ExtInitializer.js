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
function cleanTestDom() {
	var testDom = Ext.get('test-html');

	testDom.dom.innerHTML = '';
}
