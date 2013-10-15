/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.MetadataTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.process_metadata',

    requires: [
        'Ext.tab.Panel'
    ],

    enableTabScroll: true,
    items: [
        { title: 'Details' }, //todo: fill in details
        { title: 'Comments' },
        { title: 'Selection' },
        { title: 'JSON',
            xtype:'panel',
            layout:'vbox',
            items: [
                {
                    xtype:'panel',
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Load',
                            itemId: 'loadJSON'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            itemId: 'saveJSON'
                        },
                        {
                            xtype: 'button',
                            text: 'Clear',
                            itemId: 'clearJSON'
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    itemId: 'JSONtextarea',
                    grow: true,
                    width: '100%',
                    maxHeight: '100%'
                }
            ]
        }
    ]
});