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
        searchwindow: null,
        mystuffflyout: null
    },
    requires: [
        'Savanna.desktop.view.AboutWindow',
        'Savanna.desktop.view.SearchWindow',
        'Savanna.desktop.view.UploadWindow',
        'Savanna.desktop.view.MyStuffWindow'
    ],
    views: [
        'Savanna.desktop.view.SavannaToolbar',
        'Savanna.desktop.view.SavannaDesktop',
        'Savanna.desktop.view.SavannaWorkspace'
    ],
    refs: [{
        ref: 'desktopContainer',
        selector: 'desktop_savannadesktop > #desktopcontainer'
    }],
    currentDesktopItem: null,

    init: function () {
        this.control({
            'desktop_savannadesktop > #desktopcontainer': {
                render: this.onDesktopRendered
            },
            'desktop_savannatoolbar #logobutton': {
                click: this.displayAboutDialog
            },
            'desktop_savannatoolbar #dashboardbutton': {
                click: this.displayDashboard
            },
            'desktop_savannatoolbar #spacemanagerbutton': {
                click: this.displaySpaceManager
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
            },
            'desktop_savannaworkspace #flyoutbutton': {
                click: this.showMyStuffFlyout
            },
            'desktop_savannaworkspace #singleviewbutton': {
                toggle: function(button) {
                    if (button.pressed) {
                        this.setWorkspaceViewMode('single');
                    }
                }
            },
            'desktop_savannaworkspace #splitviewbutton': {
                toggle: function(button) {
                    if (button.pressed) {
                        this.setWorkspaceViewMode('split');
                    }
                }
            }
        });

        this.application.on({
            openspace: this.openSpace,
            scope: this
        });
    },

    //CUSTOM METHODS
    openSpace: function() { //todo: pass space as parameter
        var spaceWorkArea = Ext.ComponentQuery.query('panel #savannaworkspace')[0];
        if (spaceWorkArea) {
            this.showDesktopComponent(spaceWorkArea);
        }
    },

    onDesktopRendered: function() {
        var desktopContainer = Ext.ComponentQuery.query('desktop_savannadesktop > #desktopcontainer')[0];
        if (desktopContainer) {
            currentDesktopItem = desktopContainer.items.items[0];
        }
    },

    displayAboutDialog: function() {
        if (!this.statics().aboutwindow) {
            this.statics().aboutwindow = Ext.create('Savanna.desktop.view.AboutWindow');
            console.log('creating about window');
        }
        this.statics().aboutwindow.show();
    },

    displayDashboard: function(button) {
        var dashboard = button.up('desktop_savannadesktop').down('#savannadashboard');
        this.showDesktopComponent(dashboard);
    },

    displaySpaceManager: function(button) {
        var spacemanager = button.up('desktop_savannadesktop').down('#spacemanager');
        this.showDesktopComponent(spacemanager);
    },

    showDesktopComponent: function(cmp) {
        if (cmp) {
            if (currentDesktopItem && currentDesktopItem !== cmp){
                cmp.show();
                cmp.hidden = false;
                currentDesktopItem.hide();
                currentDesktopItem = cmp;
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
    },

    showMyStuffFlyout: function() {
        if (!this.statics().mystuffflyout) {
            this.statics().mystuffflyout = Ext.create('Savanna.desktop.view.MyStuffWindow');
        }
        var spaceTabPanel = Ext.ComponentQuery.query('panel #savannaworkspace #lefttabpanel')[0];
        if (spaceTabPanel) {
            this.statics().mystuffflyout.setPosition(spaceTabPanel.getPosition());
        }
        this.statics().mystuffflyout.show();
    },

    setWorkspaceViewMode: function(mode) {
        var savannaWorkspace = Ext.ComponentQuery.query('panel #savannaworkspace')[0];
        if (savannaWorkspace) {
            var mainTabPanel = savannaWorkspace.down('#maintabpanel');
            if (mainTabPanel){
                if (mode === 'split') {
                    var newTabPanel = Ext.create('Savanna.desktop.view.SavannaTabPanel', {
                        flex: 2,
                        height: '100%',
                        itemId: 'secondarytabpanel'
                    });
                    savannaWorkspace.add(newTabPanel);

                    var activeIndex = mainTabPanel.items.indexOf(mainTabPanel.getActiveTab());
                    var len = mainTabPanel.items.length-1;
                    while(len > activeIndex) {
                        newTabPanel.insert(0,mainTabPanel.items.getAt(len));
                        len--;
                    }
                    newTabPanel.setActiveTab(newTabPanel.items.getAt(0));
                } else if (mode === 'single') {
                    var secondaryTabPanel = savannaWorkspace.down('#secondarytabpanel');
                    if (secondaryTabPanel) {
                        while (secondaryTabPanel.items.length > 0) {
                            mainTabPanel.add(secondaryTabPanel.items.getAt(0));
                        }
                        savannaWorkspace.remove(secondaryTabPanel, true);
                    }
                } else {
                    console.log('unknown mode passed to DesktopController.setWorkspaceViewMode(): ' + mode)
                }
            }
            savannaWorkspace.currentView = mode;
        }
    }
});
