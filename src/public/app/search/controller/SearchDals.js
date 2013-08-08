/* global Ext: false */
Ext.define('Savanna.search.controller.SearchDals', {
    extend: 'Ext.app.Controller',

    models: [
        'Savanna.search.model.DalSource'
    ],

    stores: [
        'Savanna.search.store.DalSources'
    ],

    views: [
        'Savanna.search.view.SearchDals',
        'Savanna.search.view.searchDals.SearchOptions',
        'Savanna.search.view.searchDals.CustomSearchGroupForm'
    ],

    layout: 'hbox',
    addDalDetailText: 'Show Search Options',
    removeDalDetailText: 'Hide Search Options',

    createPanel: function(myRecord) {
        return Ext.create('Savanna.search.view.searchDals.SearchOptions', {
            itemId: myRecord.data.id,
            checkboxLabel: myRecord.data.displayName,
            label: myRecord.data.textDescription,
            showButton: myRecord.customSearchGroups().data.length
        });
    },

    createCustomSearchGroupPanel: function(store) {
        return Ext.create('Savanna.search.view.searchDals.CustomSearchGroupForm', {
            store: store
        });
    },

    createDalPanels: function (body) {
        var me = this;

        console.log('creating dal panel with store', this.getStore('Savanna.search.store.DalSources').getCount());
        body.removeAll();

        this.getStore('Savanna.search.store.DalSources').each(function (record) {
            var myPanel = me.createPanel(record);
            console.log('adding panel...', record);
            body.add(myPanel);
        });
    },

    resetAllSearchOptions: function(button) {
        var parentView = button.up('search_searchdals');
        parentView.removeAll();
        this.createDalPanels(parentView);
        parentView.down('#selectAllDals').setText('Select All');
    },

    selectOrUnselectAllButtonClicked: function(button) {
        var parentView = button.up('search_searchdals');
        var checked = true;
        var text = 'Select All';
        var i = 0;

        if ('Select All' === button.text) {
            text = 'Unselect All';
        } else {
            checked = false;
        }

        var dalsIncludeCheckBox = parentView.query('#includeDalCheckBox');
        parentView.settingAllDalCheckBoxes = true;

        for (i = 0; i < dalsIncludeCheckBox.length; ++i) {
            dalsIncludeCheckBox[i].setValue(checked);
        }

        parentView.settingAllDalCheckBoxes = false;

        button.setText(text);
    },

    // check to see if all dal checkboxes are now checked or unchecked after the change.
    // if they are set the "select all" or "unselect all"  text accordingly.
    dalCheckBoxClicked: function(checkBox) {
        var checkboxChecked;
        var allDalCheckBoxesHaveSameValue = true;
        var parentView = checkBox.up('search_searchdals');
        var i = 0;
        var text = 'Select All';

        if (!parentView.settingAllDalCheckBoxes) {
            var dalIncludeCheckBoxes = parentView.query('#includeDalCheckBox');
            var button = parentView.queryById('selectAllDals');

            checkboxChecked = checkBox.getValue();

            for (i = 0; i < dalIncludeCheckBoxes.length; ++i) {
                if (dalIncludeCheckBoxes[i].getValue() !== checkboxChecked) {
                    allDalCheckBoxesHaveSameValue = false;
                }
            }

            if (allDalCheckBoxesHaveSameValue) {
                text = checkboxChecked ? 'Unselect All' : 'Select All';
            }

            button.setText(text);
        }
    },

    resetSingleDal: function (button) {
        var parentView = button.up('search_searchDals_searchoptions');
        var dalSearchOptionPanel = parentView.down('search_searchDals_custom-search-group-form');

        parentView.down('#includeDalCheckBox').setValue(0);

        if (dalSearchOptionPanel) {
            parentView.remove(dalSearchOptionPanel, true);
        }

        parentView.down('#searchOptionsToggle').setText(this.addDalDetailText);
    },

    init: function () {
        var dalStore = this.getStore('Savanna.search.store.DalSources');

        this.mon(dalStore, 'load', this.createDalPanels, this);
        dalStore.load();

        this.control({
            'search_searchdals': {
                render: this.createDalPanels
            },
            'search_searchdals > #searchDalDockedItems #resetAllSearchOptions': {
                click: this.resetAllSearchOptions
            },
            'search_searchdals > #searchDalDockedItems #selectAllDals': {
                click: this.selectOrUnselectAllButtonClicked
            },
            'search_searchDals_searchoptions > #searchOptionsToggle': {
                click: this.renderCustomOptions
            },
            'search_searchDals_searchoptions > #includeDalCheckBox': {
                click: this.dalCheckBoxClicked
            },
            'search_searchDals_searchoptions > #resetSingleDal': {
                click: this.resetSingleDal
            }

        });
    },

    renderCustomOptions: function(button) {
        var parentView = button.up('search_searchDals_searchoptions');
        var childSearchDalsPanel = parentView.down('search_searchDals_custom-search-group-form');

        if (!childSearchDalsPanel) {
            var parentViewId = parentView.itemId;
            var store = this.getStore('Savanna.search.store.DalSources');
            var record = store.getById(parentViewId);

            childSearchDalsPanel = this.createCustomSearchGroupPanel(record.customSearchGroups());

            parentView.add(childSearchDalsPanel);
        }

        if (button.text === this.addDalDetailText) {
            button.setText(this.removeDalDetailText);
            childSearchDalsPanel.show();
        }
        else {
            button.setText(this.addDalDetailText);
            childSearchDalsPanel.hide();
        }

        parentView.doLayout();
    }
});