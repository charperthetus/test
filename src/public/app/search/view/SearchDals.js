/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 7/3/13
 * Time: 10:48 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.view.SearchDals', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchdals',

    requires: [
        'Ext.form.Label',
        'Ext.toolbar.Spacer'
    ],

    layout: 'vbox',

    border: false,

    dockedItems: [
        {
            xtype: 'toolbar',
            border: false,
            width: '100%',
            docked: 'top',
            items: [
                {
                    xtype: 'label',
                    text: 'Select sources to include in your search.'
                },
                {
                    xtype: 'button',
                    ui: 'link',
                    text: 'Select All'
                },
                {
                    xtype: 'button',
                    ui: 'link',
                    text: 'Deselect All'
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'link',
                    text: 'Reset All Search Options'
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.search.controller.SearchDals');
    }


});
