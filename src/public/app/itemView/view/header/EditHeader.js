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

    cls: 'itemview',

    title: '',

    layout: 'vbox',

    margin: 10,

    tools:[
        {
            xtype: 'textfield',
            itemId: 'itemNameField'
        },
        {
            xtype: 'tbfill'
        }
    ],

    items: [
        {
            xtype: 'label',
            text: 'Alias'
        },
        {
            xtype: 'auto_complete',
            labelType: 'Click to add an Alias',
            itemId: 'addAliasBox',
            showTags: true,
            hasNoStore: true
        },
        {
            xtype: 'label',
            margin: "15 0 0 0",
            text: 'Intended Use'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype: 'auto_complete',
                    labelType: 'Click to add an Intended Use',
                    showTags: true,
                    itemId: 'addIntendedUseBox',
                    store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                        urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/',
                        paramsObj: { pageStart:0, pageSize:20, alphabetical: true }
                    }),
                    flex: 1

                },
                {
                    xtype: 'button',
                    text: 'Chooser',
                    itemId: 'intendedUseChooserBtn'
                }
            ]
        },
        {
            xtype: 'label',
            margin: "20 0 0 0",
            text: 'Type'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: "0 0 0 -11",
            items: [
                {
                    xtype: 'button',
                    itemId: 'parentBtn',
                    text: 'Parent Class'
                },
                {
                    xtype: 'button',
                    itemId: 'parentChooser',
                    text: "Chooser"
                }
            ]
        },
        {
            xtype: 'textarea',
            margin: "20 0 0 0",
            itemId: 'itemDescription',
            name: 'description',
            width: '100%',
            value: '',
            grow: true
        }
    ]
});
