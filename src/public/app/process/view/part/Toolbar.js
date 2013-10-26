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
                text: 'View',
                menu: [{
                    text: 'Expand All Steps',
                    itemId: 'expandsteps'
                }, {
                    text: 'Collapse All Steps',
                    itemId: 'collapsesteps'
                }]
            },
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
            {
                text: 'Merge',
                tooltip: 'Select two nodes and create a merge point',
                itemId: 'merge'
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
            '->',
            {
                text: 'Cancel',
                itemId: 'cancelprocess'
            },
            {
                text: 'Save',
                itemId: 'saveprocess'
            }
        ];
    }
});