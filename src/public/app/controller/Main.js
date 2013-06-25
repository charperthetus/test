/**
 * Central controller for the Savanna client application
 */
Ext.define('Savanna.controller.Main', {
    extend: 'Ext.app.Controller',
    views: [
        'Login'
    ],

    init: function(app) {
        var me = this;

        this.app = app;

        this.control({
            login: {
                render: function(view) {
                    Ext.EventManager.on(window, 'message', function(e, t) {
                        me.swapLogin(e.browserEvent.data);
                    });
                }
            }
        });
    },

    onLaunch: function() {
        this.checkIfLoggedIn(function(data) {
            if (!data.isLoggedIn) {
                // TODO: need to develop Thetus.utils.Logger for error logging...
                console.log('User not logged in')
            }
            else {
                Savanna.jsessionid = data.sessionId;
            }
        });
    },

    // CUSTOM METHODS
    checkIfLoggedIn: function(callback) {
        Ext.Ajax.request({
            withCredentials: true,
            cors: true,
            disableCaching: false,
            url: Savanna.Config.savannaUrlRoot + Savanna.Config.pingUrl,
            failure: function(){
                callback(false);
            },
            success: function(response){
                var data = Ext.decode(response.responseText);
                callback(data);
            }
        });
    },

    swapLogin: function(sessionId) {
        Savanna.jsessionid = sessionId;

        //TODO - Check the event to see a valid loggedin message
        this.app.viewport.remove('login');
        this.app.viewport.add({
            xtype:  'mainview',
            itemId: 'main',
            region: 'center'
        });
    }
});