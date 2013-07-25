Ext.define('Savanna.search.view.searchDals.SearchOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchDals_searchoptions',

    requires: [
        'Ext.form.field.Checkbox'
    ],

    header: false,

    width: '100%',

    itemId: 'NO_ID',

    cls: 'search-dal',

    items: [{
        xtype: 'checkbox',
        boxLabel: 'NO LABEL',
        cls: 'dal-checkbox'
    }, {
        xtype: 'label',
        cls: 'dal-label',
        text: 'NO LABEL'
    },
    {
        xtype: 'button',
        itemId: 'searchOptionsToggle',
        cls: 'dal-toggle',
        text: 'Show Search Options'
    }],
    // check to see if all dal checkboxes are now checked or unchecked after the change.
    // if they are set the "select all" or "unselect all"  text accordingly.
    dalCheckBoxClicked: function(checkBox, evt) {
        console.log('checkbox', checkBox);
        var checkboxChecked;
        var allDalCheckBoxesHaveSameValue = true;
        if (!this.settingAllDalCheckBoxes) {
            var parentView = checkBox.up('search_searchdals');
            console.log('parentView', parentView);
            var dalIncludeCheckBoxes = parentView.query('#includeDalCheckBox');
            var button = parentView.queryById('selectAllDals');
            checkboxChecked = checkBox.getValue();
            for (dal in dalIncludeCheckBoxes) {
                if ( dalIncludeCheckBoxes[dal].getValue() != checkboxChecked){
                    allDalCheckBoxesHaveSameValue = false;
                }
            }
            if (allDalCheckBoxesHaveSameValue){
                var text;
                if (checkboxChecked){
                    text = 'Unselect All';
                } else {
                    text = 'Select All';
                }
            } else {
                text = 'Select All';
            }
            button.setText(text)
        }
    },

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};
            var checkboxLabel = config.checkboxLabel || 'NO LABEL';
            var label = config.label || 'NO LABEL';
            var showButton = config.showButton || null;

            this.down('checkbox').boxLabel = checkboxLabel;
            this.down('label').text = label;

            if (!showButton) {
                this.down('#searchOptionsToggle').hide();
                this.down('#resetSingleDal').hide();
            }
        }, this));
    },
    setupItems: function() {
        return [
            {
                xtype: 'checkbox',
                itemId: 'includeDalCheckBox',
                boxLabel: 'NO LABEL',
                cls: 'dal-checkbox',
                handler: this.dalCheckBoxClicked
            },
            {
                xtype: 'label',
                cls: 'dal-label',
                text: 'NO LABEL'
            },
            {
                xtype: 'button',
                itemId: 'searchOptionsToggle',
                cls: 'dal-toggle',
                text: 'Show Search Options'
            },
            {
                xtype: 'button',
                itemId: 'resetSingleDal',
                text: 'Reset',
                tooltip: 'Reset search options'
            }
        ]
    }
});