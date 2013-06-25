/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.view.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainview',
    id: 'mainview',

    items: [
        {
            xtype: 'tabpanel',
            itemId: 'maintabs',
            region: 'center',
            deferredRender: false,
            activeTab: 0,
/*            items: [
                {
                    xtype: 'modelsearch',
                    title: 'Model Search',
                    closable: false,
                    flex: 4
                }
            ]*/
        }
    ]
});