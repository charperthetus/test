Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions', {
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
    temporary, to be replaced by design team.  This approach was requested by Joel
    as the easiest path for them to update with final styles.  Values are just utility,
    to line up text and icons, and leave room for the facets panel below the DALs.
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

    updateDalNameCount:function(id, status)    {
        var me = this,
            count = 0;

        Ext.each(this.findParentByType('search_resultscomponent').allResultSets, function(set)  {
            if(set.id === id)    {
                if(status !== 'fail')   {
                    count = set.store.totalCount;
                }
                me.down('#dalName').update(me.dalName + ' ' + '(' + count + ')');
                return false;
            }
        });

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
        ];
    }
});