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
            cls: 'search-sources-toolbar',
            border: false,
            width: '100%',
            dock: 'top'
        }
    ],
    selectOrUnselectAllButtonClicked: function(button, evt) {
        var parentView = button.up('search_searchdals');
        var checked = true;
        var text = 'Select All';
        if (button.text == 'Select All') {
            text = 'Unselect All';
        } else {
            checked = false;
        }
        var dalsIncludeCheckBox = parentView.query('#includeDalCheckBox');
        this.settingAllDalCheckBoxes = true;
        for (dal in dalsIncludeCheckBox) {
            dalsIncludeCheckBox[dal].setValue(checked);
        }
        this.settingAllDalCheckBoxes = false;

        button.setText(text)
    },

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
                        tooltip: 'Select/Unselect all sources',
                        handler: this.selectOrUnselectAllButtonClicked
                    },
                    '->',
                    {
                        xtype: 'button',
                        ui: 'link',
                        text: 'Reset All Search Options'
                    }
                ]
            }
        ];
    }

});
