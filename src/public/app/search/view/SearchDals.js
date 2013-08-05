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

    settingAllDalCheckBoxes: false,     // currently setting all Dal checkboxes to checked or unchecked

    dockedItems: [
        {
            xtype: 'toolbar',
            cls: 'search-sources-toolbar',
            border: false,
            width: '100%',
            dock: 'top'
        }
    ],

    initComponent: function () {
        this.dockedItems = this.setupDockedItems();
        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.search.controller.SearchDals');
    },

    setupDockedItems: function() {
        return [
            {
                xtype: 'toolbar',
                cls: 'search-sources-toolbar',
                border: false,
                width: '100%',
                dock: 'top',
                itemId: 'searchDalDockedItems',
                items: [
                    {
                        xtype: 'label',
                        text: 'Select sources to include in your search.'
                    },
                    {
                        xtype: 'button',
                        itemId: 'selectAllDals',
                        ui: 'link',
                        text: 'Select All',
                        tooltip: 'Select/Unselect all sources'
                    },
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'resetAllSearchOptions',
                        ui: 'link',
                        text: 'Reset All Search Options'
                    }
                ]
            }
        ];
    }

});
