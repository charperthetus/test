/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.crumbnet.store.Templates', {
    extend: 'Ext.data.JsonStore',

    storeId: 'templateStore',

    model: 'Savanna.crumbnet.model.TemplateGroup',

    autoLoad: false,

    constructor: function(config) {
        this.callParent(arguments);

        var restUrl = Savanna.Config.savannaUrlRoot + Savanna.Config.crumbnetPaletteTemplatesUrl;

        this.setProxy({
            type: 'rest',// TODO: change back to "rest" when we have a service endpoint...
            url: restUrl,
            buildUrl: function(request) {
                // TODO: WE REALLY NEED A Savanna.utils.UrlBuilder lib...
                return this.getUrl(request) + ';jsessionid=' + Savanna.jsessionid;
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            reader: {
                type: 'json',
                root: 'templates'
            },
            writer: {
                type: 'json'
            }
        });
        this.buildData();
        this.loadRawData(this.fixtureData, true);
    },

    buildData: function() {
        this.fixtureData = {
            templates: [
                {
                    title: 'TEST PALETTE GROUP ONE',
                    templates: [
                        { label: 'Concept label', category: 'Concept' },
                        { label: 'Hypothesis label', category: 'Hypothesis' },
                        { label: 'Question label', category: 'Question' }
                    ]
                },
                {
                    title: 'TEST PALETTE GROUP TWO',
                    templates: [
                        { label: 'Problem label', category: 'Problem' },
                        { label: 'Conclusion label', category: 'Conclusion' },
                        { label: 'Assumption label', category: 'Assumption' },
                        { label: 'Fact label', category: 'Fact' }
                    ]
                }
            ]
        };
    }
});