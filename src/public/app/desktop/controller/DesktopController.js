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
    currentDesktopItem: null,

    init: function () {
        var me = this;
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
                        me.setWorkspaceViewMode('single');
                    }
                }
            },
            'desktop_savannaworkspace #splitviewbutton': {
                toggle: function(button) {
                    if (button.pressed) {
                        me.setWorkspaceViewMode('split');
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
            //todo, if space is different than currentspace, reinit the workspace component
            this.showDesktopComponent(currentDesktopItem, spaceWorkArea);
        }
    },

    onDesktopRendered: function() {
        var desktopContainer = Ext.ComponentQuery.query('desktop_savannadesktop > #desktopcontainer')[0];
        if (desktopContainer) {
            //note - this should return the space manager component
            currentDesktopItem = desktopContainer.items.items[0]; //todo: is there a better way?
        }
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

    displayDashboard: function(button) {
        var dashboard = button.up('desktop_savannadesktop').down('#savannadashboard');
        this.showDesktopComponent(currentDesktopItem, dashboard);
    },

    displaySpaceManager: function(button) {
        var spacemanager = button.up('desktop_savannadesktop').down('#spacemanager');
        this.showDesktopComponent(currentDesktopItem, spacemanager);
    },

    showDesktopComponent: function(currCmp, cmp) {
        if (cmp) {
            if (currCmp && currCmp !== cmp){
                cmp.show();
                cmp.hidden = false; //todo: why doesn't this value change automatically when we call show()?
                currCmp.hide();
                currentDesktopItem = cmp;
            }
        } else {
            Ext.Error.raise('Null component sent to DesktopController.showDesktopComponent()');
        }
    },

    displaySearch: function() {
        if (!this.statics().searchwindow) {
            this.statics().searchwindow = Ext.create('Savanna.desktop.view.SearchWindow', {closeAction: 'hide'});
        }
        this.statics().searchwindow.show();
    },

    displayUploadDialog: function() {
        //todo: find out if dialog should retain state - in which case we don't destroy every time (which is the default closeAction value)
        var uploadWindow = Ext.create('Savanna.desktop.view.UploadWindow', {modal: true});
        uploadWindow.show();
    },

    displayErrorDialog: function(button) {
        //todo: make system messages window component
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
        //todo: insert the help url here - get from config?
        //todo: do we need to get the savanna item in the active+focused tab and take them to a specific help section?
        window.open('http://www.google.com');
    },

    handleLogout: function() {
        console.log('The user is trying to logout');
    },

    showMyStuffFlyout: function() {
        if (!this.statics().mystuffflyout) {
            this.statics().mystuffflyout = Ext.create('Savanna.desktop.view.MyStuffWindow', {closeAction: 'hide', modal: 'true'});
        }
        //todo: the spec has the flyout show at the same x,y as the tab panel...is this really necessary?
        var spaceTabPanel = Ext.ComponentQuery.query('panel #savannaworkspace #maintabpanel')[0];
        if (spaceTabPanel) {
            this.statics().mystuffflyout.setPosition(spaceTabPanel.getPosition());
        }
        this.statics().mystuffflyout.show();
    },

    //todo: this logic may change...this is the initial implementation for design interaction
    setWorkspaceViewMode: function(mode) {
        var savannaWorkspace = Ext.ComponentQuery.query('panel #savannaworkspace')[0];
        if (savannaWorkspace) {
            var mainTabPanel = savannaWorkspace.down('#maintabpanel');
            if (mainTabPanel){
                if ('split' === mode) {
                    //create and add a second tab panel in the workspace (hbox)
                    var newTabPanel = Ext.create('Savanna.desktop.view.SavannaTabPanel', {
                        flex: 2,
                        height: '100%',
                        itemId: 'secondarytabpanel'
                    });
                    savannaWorkspace.add(newTabPanel);

                    //loop through the tabs in the main panel from the end and add them to the new tab panel
                    var activeIndex = mainTabPanel.items.indexOf(mainTabPanel.getActiveTab());
                    var len = mainTabPanel.items.length-1;
                    while(len > activeIndex) {
                        newTabPanel.insert(0,mainTabPanel.items.getAt(len));
                        len--;
                    }
                    newTabPanel.setActiveTab(newTabPanel.items.getAt(0)); //just set the first tab in the new panel as active
                    newTabPanel.doLayout();
                } else if ('single' === mode) {
                    var secondaryTabPanel = savannaWorkspace.down('#secondarytabpanel');
                    if (secondaryTabPanel) {
                        //move all tabs from the second tabpanel into the main tabpanel - they get tacked on to the end
                        while (0 < secondaryTabPanel.items.length) {
                            mainTabPanel.add(secondaryTabPanel.items.getAt(0));
                        }
                        savannaWorkspace.remove(secondaryTabPanel, true); //remove the secondary tab panel and destroy it
                        mainTabPanel.doLayout();
                    }
                } else {
                    Ext.Error.raise({ msg: 'Unknown mode passed to DesktopController.setWorkspaceViewMode(): ' + mode });
                }
            }
            savannaWorkspace.currentView = mode;
        }
    }
});
