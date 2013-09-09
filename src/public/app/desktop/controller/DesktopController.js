/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/28/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.controller.DesktopController', {
    extend: 'Ext.app.Controller',

    statics: {
        aboutwindow: null,
        searchwindow: null
    },
    requires: [
        'Savanna.desktop.view.AboutWindow',
        'Savanna.desktop.view.SearchWindow',
        'Savanna.desktop.view.UploadWindow'
    ],
    views: [
        'Savanna.desktop.view.SavannaToolbar'
    ],
    refs: [{
        ref: 'workspaceComponent',
        selector: 'desktop_savannadesktop > #savannaworkspace'
    }],
    currentWorkspaceItem: null,

    init: function () {
        this.control({
            'desktop_savannadesktop > #savannaworkspace': {
                render: this.onWorkspaceRendered
            },
            'desktop_savannatoolbar #logobutton': {
                click: this.displayAboutDialog
            },
            'desktop_savannatoolbar #dashboardbutton': {
                toggle: this.displayDashboard
            },
            'desktop_savannatoolbar #spacemanagerbutton': {
                toggle: this.displaySpaceManager
            },
            'desktop_savannatoolbar #searchbutton': {
                click: this.displaySearch
            },
            'desktop_savannatoolbar #uploadbutton': {
                click: this.displayUploadDialog
            },
            'desktop_savannatoolbar #errorbutton': {
                click: this.displayErrorDialog
            },
            'desktop_savannatoolbar #helpbutton': {
                click: this.launchHelp
            },
            'desktop_savannatoolbar #accountsettings': {
                click: this.displayAccountSettings
            },
            'desktop_savannatoolbar #savannalogout': {
                click: this.handleLogout
            }
        });
    },

    //CUSTOM METHODS
    onWorkspaceRendered: function() {
        console.log('Workspace was rendered');
        var workspaceComponent = this.getWorkspaceComponent();
        if (workspaceComponent) {
            currentWorkspaceItem = workspaceComponent.items.items[0];
        }
    },

    displayAboutDialog: function() {
        console.log('The user hit about');
        //todo: is this the best way to do this? Or is it okay to create/destroy the window each time?
        if (!this.statics().aboutwindow) {
            this.statics().aboutwindow = Ext.create('Savanna.desktop.view.AboutWindow');
            console.log('creating about window');
        }
        this.statics().aboutwindow.show();
    },

    displayDashboard: function(button) {
        if (button.pressed) {
            console.log('Show Dashboard');
            var dashboard = button.up('desktop_savannadesktop').down('#savannadashboard');
            this.swap(dashboard);
        }
    },

    displaySpaceManager: function(button) {
        if (button.pressed){
            console.log('Show Space Manager');
            var spacemanager = button.up('desktop_savannadesktop').down('#spacemanager');
            this.swap(spacemanager);
        }
    },

    swap: function(cmp) {
        var workspace = this.getWorkspaceComponent();
        if (workspace && cmp) {
            //todo: is this the best way to do this? I was swapping items 0 and 1 and then doing a doLayout().
            if (currentWorkspaceItem && currentWorkspaceItem !== cmp){
                cmp.show();
                currentWorkspaceItem.hide();
                currentWorkspaceItem = cmp;
            }
        }
    },

    displaySearch: function() {
        console.log('The user hit search');
        if (!this.statics().searchwindow) {
            this.statics().searchwindow = Ext.create('Savanna.desktop.view.SearchWindow', {closeAction: 'hide'});
            console.log('creating search window');
        }
        this.statics().searchwindow.show();
    },

    displayUploadDialog: function() {
        //todo: find out if dialog should retain state - in which case we don't destroy every time
        console.log('The user hit upload');
        var uploadWindow = Ext.create('Savanna.desktop.view.UploadWindow', {modal: true});
        console.log('creating upload window');
        uploadWindow.show();
    },

    displayErrorDialog: function(button) {
        //todo: make system messages window component
        console.log('The user hit errors');
        var errorWindow = Ext.create('Ext.window.Window', {
            title: 'System Messages',
            width: 200,
            height: 100
        });
        var pos = button.getPosition();
        errorWindow.setPosition([pos[0] - errorWindow.width, pos[1] + button.getHeight()]);
        errorWindow.show();
    },

    displayAccountSettings: function() {
        console.log('The user hit account settings');
    },

    launchHelp: function() {
        console.log('The user hit help');
        //todo: insert the help url here.
        //todo: do we need to get the savanna item in the active+focused tab and take them to a specific help section?
        window.open('http://www.google.com');
    },

    handleLogout: function() {
        console.log('The user is trying to logout');
    }
});
