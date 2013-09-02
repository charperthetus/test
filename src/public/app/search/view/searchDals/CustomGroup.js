Ext.define('Savanna.search.view.searchDals.CustomGroup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchDals_custom-group',
    cls: 'search-dal-group',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Radio',
        'Ext.form.field.Date',
        'Ext.form.FieldContainer'
    ],

    // NOTE: Been trying to figure out how to configure the collapse to be left-aligned and this appears to be the best candidate (though it is all CSS)
    //       http://www.sencha.com/forum/showthread.php?91512-moving-toggle-button-to-the-left
    collapsible: true,
    collapsed: true,

    items: [],
    model: null,

    constructor: function(config) {
        config = config || {};

        this.callParent(arguments);

        var me = this;

        this.model = config.model;
        if (this.model) {
            this.title = this.model.get('displayLabel');
            this.model.customSearchParameters().each(function(record) {
                var customInputField = me.add({
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   items: me.buildFormXtype(record)
                });
                var controlTooltip = record.get('tooltip');
                // used for testing
                // controlTooltip = 'this is a tooltip';
                if (controlTooltip){
                    customInputField.add({
                        // Decided to use a button because using a xtype of tooltip or icon
                        // created a ton of unneeded code to make it work the way we want it too.
                        xtype: 'button',
                        icon: 'resources/images/searchicon.png',
                        tooltip: controlTooltip,
                        handleMouseEvents: false,
                        ui: 'link',
                        width: 15
                    });
                }
            });
        }
    },

    // CUSTOM METHODS

    buildFormXtype: function(record) {
        var config = {
            xtype: 'textfield',
            fieldLabel: record.get('displayLabel'),
            labelAlign: 'left',
            labelWidth: 200,
            labelPad: 5,
            name: record.get('id')

        };
        switch (record.get('parameterType')) {
            case 'text':
                break;
            case 'drop-down':
                var list = record.get('list');
                var dalFilterStore = Ext.create('Ext.data.Store', { fields: ['name','value'], data: list.map(function(choice){ return {name:choice,value:choice};})});
                config.xtype = 'combobox';
                config.store = dalFilterStore;
                config.value = dalFilterStore.first().get('value');
                config.valueField = 'value';
                config.displayField = 'value';
                config.forceSelection = true;
                config.queryMode = 'local';
                config.editable = false;
                break;
            case 'checkbox':
                config.xtype = 'checkbox';
                config.checked = record.get('defaultValue');
                break;
            case 'radio':
                config.xtype = 'fieldcontainer';
                config.defaultType = 'radiofield';
                config.layout = 'hbox';
                config.items = this.getRadioOptions(record.get('radioOptions'));
                break;
            case 'date':
                config.xtype = 'datefield';
                var myDate = new Date(0);
                myDate.setUTCMilliseconds(record.get('date'));
                config.value = myDate;
                break;
            case 'key-value':
                var keyList = record.get('list');
                config.xtype = 'panel';
                config.width = 400;
                config.itemId = 'keyValuePanel';
                config.layout = 'vbox';
                config.keyList = keyList;
                config.items = [];
                config.bbar = {
                    xtype: 'button',
                    text: 'Add Key Value Pair Option',
                    handler: Ext.bind(this.addKeyValueInput, this),
                    ui: 'link'
                };
                break;
        }
        return config;
    },
    getRadioOptions: function(radioOptions) {
        var myItems = [];
        for (var cnt = 0, total = radioOptions.length; cnt < total; cnt++){
            myItems.push({boxLabel: radioOptions[cnt].displayLabel, inputValue: radioOptions[cnt].id, name: 'options' });
        }
        return myItems;
    },
    createKeyValueInput: function(list) {
        var dalFilterStore = Ext.create('Ext.data.Store', { fields: ['name','value'], data: list.map(function(choice){ return {name:choice,value:choice};})});
        var myFields = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    store: dalFilterStore,
                    value: dalFilterStore.first().get('value'),
                    valueField: 'value',
                    displayField: 'value',
                    forceSelection: true,
                    queryMode: 'local',
                    editable: false
                },{
                    xtype: 'textfield'
                },{
                    xtype: 'button',
                    text: 'X',
                    itemId: 'keyValueToggleInput',
                    handler: Ext.bind(this.deleteKeyValueInput, this)
                }
            ]
        };
        return myFields;
    },
    addKeyValueInput: function(button) {
        var myPanel = button.up('#keyValuePanel');
        var myItem = this.createKeyValueInput(myPanel.keyList);
        myPanel.add(myItem);

    },

    deleteKeyValueInput: function(button){
        var entryToDelete = button.up('fieldcontainer');
        var myPanel = button.up('#keyValuePanel');
        myPanel.remove(entryToDelete);

    }
});