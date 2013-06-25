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
console.log('app', app);
        this.control({
            login: {
                render: function(view) {
                    Ext.EventManager.on(window, 'message', function(e, t) {
                        console.log('listening...', me.app);
                        Savanna.jsessionid = e.browserEvent.data;

                        //TODO - Check the event to see a valid loggedin message
                        console.log('going to call remove...');
                        me.app.viewport.remove('login');
                        me.app.viewport.add({
                            xtype:  Savanna.Config.desktopType,
                            itemId: 'main',
                            region: 'center'
                        });
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
    }
});