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

    config: {
        editMode: false,
        itemUri: null,
        // metadata values
        key: '',
        value: null,
        displayLabel: '',
        visible: true,
        editable: true,
        type: ''
    },
    items: [
        {
            xtype: 'label',
            text: 'Supporting Resources (#)',
            cls:'h2',
            padding:'0 10 0 10',
        },{
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
    ]
});
