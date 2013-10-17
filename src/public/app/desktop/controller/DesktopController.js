/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/28/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.controller.DesktopController', {
    extend: 'Deft.mvc.ViewController',

    statics: {
        aboutwindow: null,
        searchwindow: null,
        uploadwindow: null
    },
    requires: [
        'Savanna.desktop.view.AboutWindow',
        'Savanna.desktop.view.SearchWindow',
        'Savanna.desktop.view.UploadWindow',
        'Savanna.modelSearch.view.ModelSearch'
    ],
    statics: {
        aboutwindow: null,
        searchwindow: null,
        uploadwindow: null
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
        },
        modelsearchbutton: {
            click: 'displayModelSearch'
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
        var aboutWindow =  this.statics().aboutwindow.show();
        aboutWindow.show();
        if(aboutWindow.height > Ext.getBody().getViewSize().height) {
            aboutWindow.alignTo(Ext.getBody(), 't-t');
        }
        else {
            aboutWindow.center();
        }
    },

    displaySearch: function() {
        if (!this.statics().searchwindow) {
            this.statics().searchwindow = Ext.create('Savanna.desktop.view.SearchWindow', {closeAction: 'hide'});
        }
        var searchWindow = this.statics().searchwindow;
        searchWindow.show();
        if(searchWindow.height > Ext.getBody().getViewSize().height) {
            searchWindow.alignTo(Ext.getBody(), 't-t');
        }
        else {
            searchWindow.center();
        }
    },

    displayUploadDialog: function(button) {
        if (!this.statics().uploadwindow) {
            this.statics().uploadwindow = Ext.create('Savanna.desktop.view.UploadWindow', { closeAction: 'hide'});
        }
        var uploadWindow = this.statics().uploadwindow;
        var appHeight = document.height;
        if (appHeight < uploadWindow.height + 50){
            uploadWindow.height = appHeight - 50;
        }
        uploadWindow.show();
        uploadWindow.center();
    },

    displayAccountSettings: function() {
        console.log('The user hit account settings');
    },

    launchHelp: function() {
        window.open(SavannaConfig.helpUrl);
    },

    handleLogout: function() {
        console.log('The user is trying to logout');
    },

    displayModelSearch: function() {
        var modelSearch = Ext.create('Savanna.modelSearch.view.ModelSearch'),
            savTabPanel = Ext.ComponentQuery.query('#maintabpanel')[0];
        savTabPanel.add(modelSearch);
    }
});
