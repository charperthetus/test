Ext.define('Savanna.search.view.resultsDals.ResultsOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsDals_resultsoptions',

    requires: [
        'Ext.form.field.Checkbox'
    ],

    header: false,

    width: '100%',

    itemId: 'dalResultOptions',

    cls:'results-dal',
    bodyPadding:5,

    items: [],


    /*
    temporary styles, to be replaced by design team
     */
    dalLoadNone: {
        backgroundColor:'white',
        width:'20px',
        height:'20px',
        'float':'right',
        'margin-right':'10px',
        'margin-top':'-20px'
    },
    dalLoadPending: {
        backgroundColor:'yellow',
        width:'20px',
        height:'20px',
        'float':'right',
        'margin-right':'10px',
        'margin-top':'-20px'
    },
    dalLoadFail: {
        backgroundColor:'red',
        width:'20px',
        height:'20px',
        'float':'right',
        'margin-right':'10px',
        'margin-top':'-20px'
    },
    dalLoadSuccess: {
        backgroundColor:'green',
        width:'20px',
        height:'20px',
        'float':'right',
        'margin-right':'10px',
        'margin-top':'-20px'
    },

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
        this.on('beforerender', Ext.bind(function () {
            var config = this.initialConfig || {};
            this.down('#dalName').html = config.dalName || 'NO LABEL';
        }, this));
    },

    updateDalNameCount:function(id)    {
        var me = this;
        Ext.each(this.up('#searchresults').allResultSets, function(set)  {
            if(set.id == id)    {
                me.down('#dalName').update(me.dalName + ' ' + '(' + set.store.totalCount + ')');
            }
        })

    },
    setupItems: function () {
        return [
            {
                itemId: 'dalName',
                border:false,
                height:20,
                width:'65%'
            },
            {
                xtype: 'box',
                itemId: 'dalStatusIcon',
                style:  this.dalLoadNone
            }
        ]
    }
});