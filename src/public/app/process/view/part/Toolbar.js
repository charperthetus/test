/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 10:46 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.process_toolbar',

    width: '100%',

    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return []; //todo - SAV-5308
    }
});