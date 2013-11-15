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
                         itemId: 'saveProcess'
                    },
                    {
                         text: 'Delete',
                         itemId: 'deleteProcess'
                    },
                    //Removing for release as it doesn't quite work
//                    '-',
//                    {
//                         text: 'Workflow...',
//                         itemId: 'workflow'
//                    },
                    '-',
                    {
                         text: 'Expand All Steps',
                         itemId: 'expandSteps'
                    },
                    {
                         text: 'Collapse All Steps',
                         itemId: 'collapseSteps'
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
                text: 'Link',
                tooltip: 'Click to link selected Items',
                itemId: 'merge'
            },
            '->',
            {
                cls: 'toolbarButtonFramework',
                glyph: 'zoomIn',
                width:25,
                height:25,
                tooltip: 'Zoom in',
                itemId: 'zoomIn'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'zoomOut',
                width:25,
                height:25,
                tooltip: 'Zoom out',
                itemId: 'zoomOut'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'showAll',
                width:25,
                height:25,
                tooltip: 'Fit to screen',
                itemId: 'zoomToFit'
            },
            ' ',
            {
                cls: 'toolbarButtonFramework',
                glyph: 'undo',
                width:25,
                height:25,
                tooltip: 'Undo',
                itemId: 'undo'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'redo',
                width:25,
                height:25,
                tooltip: 'Redo',
                itemId: 'redo'
            },
            ' ',
            {
                cls: 'toolbarButtonFramework',
                glyph: 'trash',
                width:25,
                height:25,
                tooltip: 'Delete process',
                itemId: 'deleteProcess'
            },
            {
                cls: 'toolbarButtonFramework',
                glyph: 'save',
                width:25,
                height:25,
                tooltip: 'Save',
                itemId: 'saveProcess'
            }
        ];
    }
});