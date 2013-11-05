/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/31/13
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.sources.controller.Sources', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.sources.view.Sources'
    ],

    init: function() {
        this.callParent(arguments);
    },

    control: {
        view: {
            itemclick: 'openSourceDocument'
        }
    },

    openSourceDocument: function( grid, record, item, index, e, eOpts) {
        if (e.target.id == "openSourceDoc") {
            EventHub.fireEvent('open', {uri: e.target.name, type: e.target.data-doctype, label: e.target.label});
        }
    }

});
