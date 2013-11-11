/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/11/13
 * Time: 9:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.SavannaTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.desktop_tabpanel',
    requires: [
        'Ext.ux.TabReorderer',
        'Ext.ux.TabCloseMenu'
    ],
    config: {
        view: 'single'
    },

    ui: 'dark',
    enableTabScroll: true,

    tabBar: {
        ui: 'dark'
    },

    initComponent: function() {
        this.tabBar.items = this.setupTabBarItems();
        this.plugins = this.setupPlugins();
        this.callParent(arguments);
    },

    setupTabBarItems: function() {
        return [{
            xtype: 'button',
            ui: 'dark',
            glyph:'plus',
            width:25,
            height:25,
            cls:'new-savanna-tab',
            closable: false,
            menu: {
                plain: true,
                items: [
                    {
                        text: 'Create an Item',
                        handler: this.itemHandler,
                        scope: this
                    },
                    {
                        text: 'Create a Process',
                        handler: this.processHandler,
                        scope: this
                    }
                ]
            }
        }]
    },

    setupPlugins: function() {
        return [
            Ext.create('Ext.ux.TabReorderer'),
            Ext.create('Ext.ux.TabCloseMenu')
        ]
    },

    /*
     *  The deft control configuration will not work because the menu items are not children of this view.
     *  Dispatch events off of this view so they can be caught by the deft controller.
     */
    itemHandler: function() {
        this.fireEvent('createitem', this);
    },

    processHandler: function() {
        this.fireEvent('createprocess', this);
    },

    splitViewHandler: function() {
        this.fireEvent('splitview');
    },

    singleViewHandler: function() {
        this.fireEvent('singleview');
    },

    moveTabHandler: function() {
        this.fireEvent('movetab');
    },

    onBeforeMenu: function(menu, tab) {
        this.fireEvent('beforetabclosemenu', this, menu, tab);
    }
});