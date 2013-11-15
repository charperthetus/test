Ext.define('Savanna.desktop.view.StartPage', {
    extend: 'Ext.container.Container',
    alias: 'widget.desktop_startpage',
    controller: 'Savanna.desktop.controller.StartPageController',
    cls:'startpage',
    requires: [
        'Savanna.desktop.controller.StartPageController',
        'Savanna.desktop.view.StartPageItem'
    ],
    layout: {
        type:'hbox',
        pack: 'center',
        defaultMargins: {top: 30, right: 10, bottom: 30, left: 10}
    },
    items: [
        {
            layout: 'vbox',
            items: [
                {
                    xtype: 'image',
                    src: '/resources/images/discover.jpg',
                    height: 254 //These heights and widths are needed to be set explicitly otherwise it doesn't show
                },
                {
                    xtype: 'container',
                    html: '<div class="title"><p>Discover Content and Knowledge</p></div>'
                },
                {
                    xtype: 'startpageitem',
                    cls:'startpageitem first',
                    width: 270,
                    height: 109,
                    itemId: 'openSearch',
                    text: 'Search for Content',
                    subtext: 'Search for content inside Savanna or in external data sources.',
                    glyph: 'search'
                },
                {
                    xtype: 'startpageitem',
                    text: 'Search for Knowledge',
                    width: 270,
                    height: 109,
                    itemId: 'openModelSearch',
                    subtext: 'Discover items and processes in the knowledge reference model.',
                    glyph: 'searchBinoculars'
                }
            ]
        },
        {
            layout: 'vbox',
            items: [
                {
                    xtype: 'image',
                    src: '/resources/images/create.jpg',
                    height: 254
                },
                {
                    xtype: 'container',
                    html: '<div class="title"><p class="short">Create Knowledge</p></div>'
                },
                {
                    xtype: 'startpageitem',
                    cls:'startpageitem first',
                    width: 270,
                    height: 109,
                    text: 'Create an Item',
                    itemId: 'createitem',
                    subtext: 'Extend the knowledge reference model by creating new reference items.',
                    glyph: 'rnmItem'
                },
                {
                    xtype: 'startpageitem',
                    text: 'Create a Process',
                    width: 270,
                    height: 109,
                    itemId: 'createprocess',
                    subtext: 'Create processes using items in the knowledge reference model.',
                    glyph: 'topDown'
                }
            ]
        }
    ]
});