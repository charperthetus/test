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
    height: 33,

    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
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
                text: 'Add Alternates',
                tooltip: 'Add alternates group',
                itemId: 'alts'
            },
            '->', 
            {
                cls: 'toolbarButtonFramework',
                glyph: 'zoomIn',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Zoom In',
                itemId: 'zoomin'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'zoomOut',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Zoom Out',
                itemId: 'zoomout'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'showAll',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Fit to screen',
                itemId: 'zoomToFit'
            },
            ' ',
            {
                cls: 'toolbarButtonFramework',
                glyph: 'undo',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Undo',
                itemId: 'undo'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'redo',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Redo',
                itemId: 'redo'
            },
            ' ',
            {
                cls: 'toolbarButtonFramework',
                glyph: 'trash',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Delete draft',
                itemId: 'cancelprocess'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'save',
                width:25,
                height:25,
                ui: 'icon-dark',
                tooltip: 'Save process',
                itemId: 'saveprocess'
            }
        ];
    }
});