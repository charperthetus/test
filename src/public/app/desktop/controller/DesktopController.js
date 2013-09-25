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
        'Savanna.desktop.view.SavannaToolbar',
        'Savanna.desktop.view.SavannaDesktop',
        'Savanna.desktop.view.SearchWindow',
        'Savanna.desktop.view.SavannaWorkspace'
    ],
    init: function () {
        var me = this;
        this.control({
            'desktop_savannatoolbar #logobutton': {
                click: this.displayAboutDialog
            },
            'desktop_savannatoolbar #searchbutton': {
                click: this.displaySearch
            },
            'desktop_savannatoolbar #uploadbutton': {
                click: this.displayUploadDialog
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

    showDesktopComponent: function(cmp) {
        if (cmp) {
            var desktopContainer = Ext.ComponentQuery.query('desktop_savannadesktop > #desktopcontainer')[0];
            if (desktopContainer) {
                desktopContainer.items.each(function(item){
                    if (item === cmp) {
                        if (item.hidden) {
                            item.show();
                            item.hidden = false;
                        }
                    } else {
                        item.hide();
                        item.hidden = true;
                    }
                });
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
