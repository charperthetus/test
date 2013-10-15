/* global Ext: false, Savanna: false */
/**
 * Central controller for the Savanna client application
 */
Ext.define('Savanna.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.view.Login',
        'Savanna.desktop.view.SavannaDesktop',
        'Savanna.view.PrintModal'
    ],

    controllers: [],

    init: function(app) {
        var me = this;

        this.setupUrls();

        this.app = app;

            this.control({
            login: {
                render: function() {
                    Ext.EventManager.on(window, 'message', function(e) {
                        //TODO - This needs to either remove after the first time or case based on the message that is sent
                        me.swapLogin(e.browserEvent.data);
                    });
                }
            },
            'print-modal button[type="print"]': {
                click: this.printContent
            },
            'print-modal button[type="cancel"]': {
                click: this.closePrintModal
            }
        });
    },

    swapLogin: function(sessionId) {
        if (this.app && this.app.viewport) {
            var mainViewport = this.app.viewport;
            var login = this.app.viewport.queryById('login');
            if (mainViewport && login) {
                Savanna.jsessionid = sessionId;
                mainViewport.remove('login');

                var main = Ext.create('Savanna.desktop.view.SavannaDesktop', { itemId: 'main' });

                mainViewport.add(main);
            }
        }
        else {
            Ext.Error.raise('no viewport defined');
        }
    },

    printContent: function() {
        window.print();
    },

    closePrintModal: function(button) {
        var modal = button.findParentByType('print-modal');

        // NOTE: we assume we will always get the modal window, since the button is it's child
        modal.close();
    },

    setupUrls: function() {
        // Urls for all the rest endpoints
        SavannaConfig.loginUrl = SavannaConfig.savannaUrlRoot + 'authcheck/loggedIn.html';
        SavannaConfig.searchUrl = SavannaConfig.savannaUrlRoot + 'rest/search'; // local dev version: 'app/assets/data/testSearchResults.json',
        SavannaConfig.searchMetadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata/get';
        SavannaConfig.itemViewUrl = SavannaConfig.savannaUrlRoot + 'rest/c2is2/model/item/';
        SavannaConfig.dalSourcesUrl = SavannaConfig.savannaUrlRoot + 'rest/search/sources'; // local dev version: 'resources/data/testSearchDalsWithFormData.json',
        SavannaConfig.locationSearch = SavannaConfig.savannaUrlRoot + '/rest/map/search';   // local dev version: 'resources/data/testSearchLocationSearch.json',
        SavannaConfig.uploadUrl = SavannaConfig.savannaUrlRoot + 'rest/document/upload';
        SavannaConfig.metadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata';
        SavannaConfig.resultsMetadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata';
        // TODO: replace this test URL with real endpoint once we have one....
        SavannaConfig.crumbnetTemplatesUrl = 'resources/data/Crumbnet.json';
        SavannaConfig.processTemplatesUrl = 'resources/data/Process.json';
        SavannaConfig.metadataTestDataUrl = 'resources/data/Metadata.json';
    }
});