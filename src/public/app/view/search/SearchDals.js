/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 7/3/13
 * Time: 10:48 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.view.search.SearchDals', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchdals',

    requires: [
        'Ext.form.Label'
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
                    xtype: 'tbspacer',
                    width: 10
                },
                {
                    xtype: 'button',
                    text: 'Select All',
                    style: {
                        background: 'transparent',
                        border: 'none'
                    }
                },
                {
                    xtype: 'tbspacer',
                    width: 100
                },
                {
                    xtype: 'button',
                    text: 'Reset All Search Options',
                    style: {
                        background: 'transparent',
                        border: 'none'
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('search.SearchDals');
    }


});