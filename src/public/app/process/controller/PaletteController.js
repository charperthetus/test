/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/21/13
 * Time: 9:44 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.PaletteController', {
    extend: 'Deft.mvc.ViewController',


    inject: [ 'application' ],

    config: {
        application: null
    },

    control: {
        searchitems: {
            click: 'onItemSearchClick'
        },
        actionlist: {
        },
        actiontext: {
            change: 'onActionTextChange'
        }
    },

    init: function() {
        this.callParent(arguments);
    },

    onItemSearchClick: function() {
        this.getApplication().fireEvent('initModelSearch');
    },

    onActionTextChange: function(field, newValue) {
        this.getActionlist().store.clearFilter();
        this.getActionlist().store.filter([{
            property: 'label',
            anyMatch: true,
            value   : newValue
        } ]);
    }
});