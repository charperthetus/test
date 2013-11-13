/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.header.EditHeader', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_edit_header',

    controller: 'Savanna.itemView.controller.EditHeaderController',

    requires: [
        'Savanna.itemView.controller.EditHeaderController'
    ],

    storeHelper: null,

    layout: 'vbox',

    header: false,

    margin: '15 15 0 15' ,

    items: [
        {
            xtype: 'textfield',
            itemId: 'itemNameField',
            enableKeyEvents: true,
            width: '100%'
        },
        {
            xtype: 'label',
            text: 'Alias',
            cls: ['bold', 'align_bottom', 'itemView_lineHeight']
        },
        {
            xtype: 'auto_complete',
            labelType: 'Click to add an alias',
            itemId: 'addAliasBox',
            showTags: true,
            hasNoStore: true
        },
        {
            xtype: 'label',
            text: 'Intended Use',
            cls: ['bold', 'align_bottom', 'itemView_lineHeight']
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'start'
            },
            width: '100%',
            items: [
                {
                    xtype: 'auto_complete',
                    labelType: 'Click to add an intended use',
                    showTags: true,
                    itemId: 'addIntendedUseBox',
                    store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                        paramsObj: { pageStart:0, pageSize:20, alphabetical: false }
                    }),
                    flex: 1

                },
                {
                    xtype: 'button',
                    itemId: 'intendedUseChooserBtn',
                    glyph: 'searchBinoculars',
                    cls: 'itemViewButtonFramework',
                    margin: '0 0 3 3',
                    width:25,
                    height:25,
                    tooltip: "Click to browse intended uses"
                }
            ]
        },
        {
            xtype: 'label',
            text: 'Type',
            cls: ['bold', 'align_bottom', 'itemView_lineHeight']
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width:'100%',
            items: [

                {
                    xtype: 'panel',
                    itemId: 'parentsList',
                    html:'',
                    width:'96%'
                }
            ]
        },
        {
            xtype: 'label',
            margin: '20 0 0 0',
            text: 'Description',
            cls: ['bold', 'align_bottom', 'itemView_lineHeight']
        },
        {
            xtype: 'textarea',
            itemId: 'itemDescription',
            name: 'description',
            width: '100%',
            emptyText: 'Click to add a description',
            value: '',
            grow: true
        }
    ]
});
