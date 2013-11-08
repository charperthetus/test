/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/31/13
 * Time: 10:59 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.sources.view.Sources', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.document_sources',

    requires: ['Savanna.sources.controller.Sources'],

    controller: 'Savanna.sources.controller.Sources',

    title: 'Sources',

    layout: 'vbox',

    width: "100%",

    border: false,

    itemId: '',

    collapsible: true,

    storeHelper: null,

    store: null,

    items: [
        {
            xtype: 'panel',
            itemId: 'supportingResourcesDrop',
            cls:'supporting-resources-drop-zone',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center',
                width:'75%'
            },
            width:'100%',
            margin:'0 0 10 0',
            padding:'0 10 0 10',
            height:79,
            bodyCls: 'inner-edit-zone',
            items: [
                {
                    xtype: 'label',
                    text: 'Drop items here',
                    cls:'drag-and-drop'
                }
            ]
        }


    ],

    addSourcesGrid: function(store){
        if (this.queryById('listOfSources') === null ){
            this.add({
                xtype: 'grid',
                itemId: 'listOfSources',
                width: '100%',
                autoHeight: true,
                renderTo: Ext.getBody(),
                store: store,

                title: 'Supporting Resources (' + store.count() + ')',

                hideHeaders: true,

                columns: [
                    {
                        xtype: 'templatecolumn',
                        dataIndex: 'values',
                        flex: 10,
                        sortable: false,
                        tpl: Ext.create('Ext.XTemplate',
                            '<input type="button" name="{uri}" value="{label}" id="openResourceDoc" />'
                        )
                    },
                    {
                        xtype: 'templatecolumn',
                        dataIndex: 'values',
                        flex: 1,
                        sortable: false,
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl if="editable">',
                                '<input type="button" name="{value}" data-editable="{editable}" value="X" id="delResourceDoc" />',
                            '<tpl else>',
                                '<input type="button" name="{value}" data-editable="{editable}" disabled="disabled" value="X" id="delResourceDoc" />',
                            '</tpl>'
                        )
                    }
                ]
            })
        } else {
            this.queryById('listOfSources').reconfigure(store);
        }
        this.queryById('listOfSources').setTitle('Supporting Resources (' + store.count() + ')');
    }
});
