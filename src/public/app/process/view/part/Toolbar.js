/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 10:46 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.process_toolbar',

    ui:'thetus-toolbar',
    width: '100%',

    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                ui: 'basic',
                text: 'Menu',
                tooltip: 'Process Editor Menu',
                menu: [
                    {
                        text: 'New Process...',
                        itemId: 'newProcess'
                    },
                    '-',
                    {
                         text: 'Undo',
                         itemId: 'undo'
                    },
                    {
                         text: 'Redo',
                         itemId: 'redo'
                    },
                    '-',
                    {
                         text: 'Save',
                         itemId: 'saveprocess'
                    },
                    {
                         text: 'Delete',
                         itemId: 'cancelprocess'
                    },
                    '-',
                    {
                         text: 'Workflow...',
                         itemId: 'workflow'
                    },
                    '-',
                    {
                         text: 'Expand All Steps',
                         itemId: 'expandsteps'
                    },
                    {
                         text: 'Collapse All Steps',
                         itemId: 'collapsesteps'
                    },
                    '-',
                    {
                        text: 'Show Palette',
                        checked: true,
                        itemId: 'showPalette'
                    },
                    {
                        text: 'Show Overview',
                        checked: false,
                        itemId: 'showOverview'
                    }

                ]
            },
            {
                text: 'Join',
                tooltip: 'Join selected items together',
                itemId: 'merge'
            },
            {
                text: '+ Alternates',
                tooltip: 'Add alternates group',
                itemId: 'alts'
            },
            '->', 
            {
                glyph: 'zoomIn',
                tooltip: 'Zoom In',
                itemId: 'zoomin'
            },
            {
                glyph: 'zoomOut',
                tooltip: 'Zoom Out',
                itemId: 'zoomout'
            },
            {
                glyph: 'fit',
                tooltip: 'Fit to screen',
                itemId: 'zoomToFit'
            },
            ' ',
            {
                glyph: 'undo',
                tooltip: 'Undo',
                itemId: 'undo'
            },
            {
                glyph: 'redo',
                tooltip: 'Redo',
                itemId: 'redo'
            },
            ' ',
            {
                text: 'Delete',
                tooltip: 'Delete draft',
                itemId: 'cancelprocess'
            },
            {
                text: 'Save',
                tooltip: 'Save process',
                itemId: 'saveprocess'
            }
        ];
    }
});