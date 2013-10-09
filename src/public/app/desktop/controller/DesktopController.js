/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/28/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.controller.DesktopController', {
    extend: 'Deft.mvc.ViewController',
    requires: [
        'Savanna.desktop.view.AboutWindow',
        'Savanna.desktop.view.SearchWindow',
        'Savanna.desktop.view.UploadWindow'
    ],
    statics: {
        aboutwindow: null,
        searchwindow: null
    },

    control: {
        logobutton: {
            click: 'displayAboutDialog'
        },
        searchbutton: {
            click: 'displaySearch'
        },
        uploadbutton: {
            click: 'displayUploadDialog'
        },
        helpbutton: {
            click: 'launchHelp'
        },
        accountsettings: {
            click: 'displayAccountSettings'
        },
        savannalogout: {
            click: 'handleLogout'
        }
    },

    init: function() {
        return this.callParent(arguments);
    },

    displayAboutDialog: function() {
        if (!this.statics().aboutwindow) {
            this.statics().aboutwindow = Ext.create('Savanna.desktop.view.AboutWindow', {
                modal: 'true',
                closeAction: 'hide'
            });
        }
        this.statics().aboutwindow.show();
    },

    displaySearch: function() {
        if (!this.statics().searchwindow) {
            this.statics().searchwindow = Ext.create('Savanna.desktop.view.SearchWindow', {closeAction: 'hide'});
        }
        this.statics().searchwindow.show();
    },

    displayUploadDialog: function(button) {
        if (!this.statics().uploadwindow) {
            this.statics().uploadwindow = Ext.create('Savanna.desktop.view.UploadWindow', { closeAction: 'hide'});
        }
        var uploadWindow = this.statics().uploadwindow;
        var desktop = button.up('desktop_savannadesktop');
        var appHeight = document.height;
        if (appHeight < uploadWindow.height + 50){
            uploadWindow.height = appHeight - 50;
        }
        uploadWindow.show();
    },

    displayAccountSettings: function() {
        console.log('The user hit account settings');
    },

    launchHelp: function() {
        window.open(SavannaConfig.helpUrl);
    },

    handleLogout: function() {
        console.log('The user is trying to logout');
    }
});
