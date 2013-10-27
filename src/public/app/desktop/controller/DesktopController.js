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
        'Savanna.desktop.view.UploadWindow',
        'Savanna.modelSearch.view.ModelSearch',
        'Savanna.desktop.view.ModelSearchWindow',
        'Savanna.itemView.view.ItemViewer'
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
        },
        itemviewbutton: {
            click: 'displayDummyItem'
        }
    },

    init: function() {
        Savanna.app.on('initModelSearch', this.displayModelSearch);

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

    displayUploadDialog: function() {
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
        //POST to the logout url, and refresh the page on a response to trigger the login page
        Ext.Ajax.request({
            url: SavannaConfig.logoutUrl + ';jsessionid=' + Savanna.jsessionid,
            cors: true,
            method: 'POST',
            success: function(response){
                //Refresh the page
                location.href = location.href;
            },
            failure: function(response){
                location.href = location.href;
            }
        });

    },

    displayModelSearch: function() {
        if (!this.statics().modelSearchWindow) {
            this.statics().modelSearchWindow = Ext.create('Savanna.desktop.view.ModelSearchWindow', {closeAction: 'hide'});
        }
        var searchWindow = this.statics().modelSearchWindow;
        searchWindow.show();
        if(searchWindow.height > Ext.getBody().getViewSize().height) {
            searchWindow.alignTo(Ext.getBody(), 't-t');
        }
        else {
            searchWindow.center();
        }
    },
    // TODO: Remove this once Model search can find and select actual items
    displayDummyItem: function() {
        var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
            title: 'Model Item',
            itemUri: 'x012f931fec769ca941e8de4f7a674bec2a290937%2FItem',
            closable: true,
            autoScroll: true,
            tabConfig: {
                ui: 'dark'
            }
        });
        Savanna.app.fireEvent('search:itemSelected', itemView);
    }
});
