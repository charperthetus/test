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
    padding: '0 3 0 3',
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
            text: 'Supporting Resources (#)'
        },{
            xtype: 'container',
            itemId: 'supportingResourcesDrop',
            border: 5,
            style: {
                borderColor: 'gray',
                borderStyle: 'solid'
            },
            height: 100,
            width: '100%',
            items: [
                {
                    xtype: 'label',
                    text: 'Drop items here'
                }
            ]
        }
    ]
});
