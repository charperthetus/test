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

    config: {
        store: null
    },

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
            ],
            listeners: {
                boxready: 'onDropItemReady'
            }
        },
        {
            xtype: 'grid',
            itemId: 'listOfSources',

            store: null,

            title: 'Supporting Resources (#)',

            hideHeaders: true,

            columns: [
                {
                    xtype: 'templatecolumn',
                    dataIndex: 'values',
                    sortable: false,
                    tpl: Ext.create('Ext.XTemplate',
                        '<tpl for="values" between=",&nbsp;&nbsp;">',
                            '<input type="button" data-doctype="{type}" name="{value}" value="{label}" id="openResourceDoc" />',
                        '</tpl>'
                    )
                }
            ]
        }

    ],

    onDropItemReady: function(container){
        var myDropBox = container.getEl();
        if (myDropBox){
            container.dropTarget = Ext.create('Ext.dd.DropTarget', myDropBox.dom, {
                ddGroup: 'SEARCH-ITEMS',
                notifyOver: Ext.bind(this.notifyItemOverTarget, this),
                notifyDrop: Ext.bind(this.notifyItemDropTarget, this, container, true)
            });
        }
    },

    notifyItemOverTarget: function(ddSource, e, data) {
        //don't allow anything other than an Item to be dropped into the item palette
        if (this.dragDataIsItem(data)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    notifyItemDropTarget: function(ddSource, e, data, container) {

        data.records.forEach(function(rec) {
            storeHelper.addBotLevItemInStore(rec.data.label, rec.data, this.store);
            this.store.getAt(0).setDirty();
            this.store.sync({
                callback: Ext.bind(this.onEditDoneCallback, this, [], true)
            });
        }, this);
    },

    onEditDoneCallback: function (records, operation, success) {
        if (!success) {
            Ext.Error.raise({
                msg: 'Updating record failed.'
            })
        } else {
            //this.getById('listOfSources').reconfigure(this.store);
        }
    },

    dragDataIsItem: function(data) {
        var returnVal = true;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (obj.contentType !== 'Rich' && obj.contentType !== 'Text') {
                returnVal = false
            }
        });
        return returnVal;
    }

});
