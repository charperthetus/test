/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/28/13
 * Time: 7:58 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.AboutWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.desktop_aboutwindow',

    title: 'About Savanna',
    height: 200,
    width: 400,
    ghost: false,
    resizable: false,
    constrain: true,
    layout: 'vbox',
    items: [{
        //todo: determine where the about dialog detailed information will originate from. different per impl?
        xtype: 'label',
        text: SavannaConfig.version
    },{
        xtype: 'label',
        width: '100%',
        text: 'Savanna is dedicated to analysts everywhere and their mission of knowledge. Savanna is designed, developed and delivered through the perspiration and passion of the Thetus team.'
    }
    ]
});
