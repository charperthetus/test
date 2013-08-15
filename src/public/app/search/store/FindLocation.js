/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 8/15/13
 * Time: 8:20 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.store.FindLocation', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.Config',
        'Savanna.search.model.FindLocation',
        'Savanna.proxy.Cors'
    ],

    storeId: 'findLocation',

    model: 'Savanna.search.model.FindLocation',

    autoLoad: false,

    restAction: 'GET',

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            //url: Savanna.Config.savannaUrlRoot + '/rest/map/search',
            // Use this if you don't have Savanna 3.4 running
            // NOTE: two tests in SpecRunner fail in this circumstance, but will work once the dev server is up and running
            url: 'app/assets/data/testFileLocationSearch.json',
            reader: {
                type: 'json'
            }
        });
    }
});