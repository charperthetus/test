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

    swapLogin: function(sessionId) {
        Savanna.jsessionid = sessionId;
        //TODO - Check the event to see a valid loggedin message
        this.app.viewport.queryById("viewport_main").remove('login');
    }
});