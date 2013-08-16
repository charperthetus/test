Ext.define('Savanna.search.view.searchDals.ResultsOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchDals_resultsoptions',

    requires: [
        'Ext.form.field.Checkbox'
    ],

    header: false,

    width: '100%',

    itemId: 'dalSearchOptions',

    cls: 'search-dal',

    items: [],


    // temporary styles, to be replaced by design team
    dalLoadNone: {
        backgroundColor:"white",
        width:"20px",
        height:"20px",
        'float':'right',
        'margin-right':"10px",
        'margin-top':"-45px"
    },
    dalLoadPending: {
        backgroundColor:"yellow",
        width:"20px",
        height:"20px",
        'float':'right',
        'margin-right':"10px",
        'margin-top':"-45px"
    },
    dalLoadFail: {
        backgroundColor:"red",
        width:"20px",
        height:"20px",
        'float':'right',
        'margin-right':"10px",
        'margin-top':"-45px"
    },
    dalLoadSuccess: {
        backgroundColor:"green",
        width:"20px",
        height:"20px",
        'float':'right',
        'margin-right':"10px",
        'margin-top':"-45px"
    },

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);

        this.on('beforerender', Ext.bind(function () {
            var config = this.initialConfig || {};
            this.down('checkbox').boxLabel = config.checkboxLabel || 'NO LABEL';
        }, this));
    },
    setupItems: function () {
        return [
            {
                xtype: 'checkbox',
                itemId: 'includeDalCheckBox',
                boxLabel: 'NO LABEL',
                cls: 'dal-checkbox'
            },
            {
                xtype: "box",
                itemId: "dalStatusIcon",
                style:  this.dalLoadNone
            }
        ]
    }
})
;