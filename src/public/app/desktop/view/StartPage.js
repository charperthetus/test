Ext.define('Savanna.desktop.view.StartPage', {
    extend: 'Ext.container.Container',
    alias: 'widget.startpage',
    controller: 'Savanna.desktop.controller.StartPageController',
    requires: [
        'Savanna.desktop.view.StartPageItem'
    ],
    layout: {
        type:'hbox',
        pack: 'center',
        defaultMargins: 10
    },
    items: [
        {
            layout: 'vbox',
            items: [
                {
                    xtype: 'image',
                    src: '/resources/images/discover.jpg'
                },
                {
                    xtype: 'label',
                    text: 'Discover Content and Knowledge'
                },
                {
                    xtype: 'startpageitem',
                    width: 270,
                    itemId: 'openSearch',
                    text: 'Search for Content',
                    subtext: 'Discover content...??',
                    image: '/resources/images/dashboardicon.png'
                },
                {
                    xtype: 'startpageitem',
                    text: 'Search for Knowledge',
                    width: 270,
                    itemId: 'openModelSearch',
                    subtext: 'Discover items and processes in your knowledge reference model',
                    image: '/resources/images/dashboardicon.png'
                }
            ]
        },
        {
            layout: 'vbox',
            items: [
                {
                    xtype: 'image',
                    src: '/resources/images/create.jpg'
                },
                {
                    xtype: 'label',
                    text: 'Create Knowledge'
                },
                {
                    xtype: 'startpageitem',
                    width: 270,
                    text: 'Create an Item',
                    itemId: 'createitem',
                    subtext: 'Create new reference items to extend your knowledge reference model',
                    image: '/resources/images/dashboardicon.png'
                },
                {
                    xtype: 'startpageitem',
                    text: 'Create a Process',
                    width: 270,
                    itemId: 'createprocess',
                    subtext: 'Create processes using items',
                    image: '/resources/images/dashboardicon.png'
                }
            ]
        }
    ]
});