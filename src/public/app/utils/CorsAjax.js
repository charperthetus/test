/* global Ext: false */
/**
 * Savanna.utils.CorsAjax
 *
 * Singleton wrapper around Ext.Ajax.request to ensure appropriate CORS parameters are added to an Ext.Ajax.request call
 *
 * @see http://docs.sencha.com/extjs/4.2.1/#!/api/Ext.Ajax-method-request for documentation on acceptable parameters
 */
Ext.define('Savanna.utils.CorsAjax', {
    extend: 'Ext.Base',
    singleton: true,

    requires: [
        'Ext.Ajax'
    ],

    request: function(options) {

        Ext.apply(options, {
            cors: true
        });

        return Ext.Ajax.request(options);
    }
});