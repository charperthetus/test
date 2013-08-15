/* global Ext: false, Savanna: false */
/**
 * Central controller for the Savanna client application
 */
Ext.define('Savanna.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'Login',
        'PrintModal'
    ],

    controllers: [
        'Savanna.flexpaper.controller.FlexpaperComponent'
    ],

    init: function(app) {
        var me = this;

        this.app = app;

        this.control({
            login: {
                render: function() {
                    Ext.EventManager.on(window, 'message', function(e) {
                        me.swapLogin(e.browserEvent.data);
                    });
                }
            },
            'print-modal button[type="print"]': {
                click: this.printContent
            },
            'print-modal button[type="cancel"]': {
                click: this.closePrintModal
            }
        });
    },

    swapLogin: function(sessionId) {
        Savanna.jsessionid = sessionId;

        if (this.app && this.app.viewport && this.app.viewport.queryById) {
            var mainViewport = this.app.viewport.queryById('viewport_main');

            if (mainViewport) {
                mainViewport.remove('login');

                var main = Ext.create('Savanna.view.SavannaDesktop', { itemId: 'main' });

                mainViewport.add(main);
            }
        }
        else {
            Ext.Error.raise('no viewport defined');
        }
    },

    printContent: function(button) {
        var modal = button.findParentByType('print-modal');

        if (modal) {

        }
        else {
            Ext.Error.raise('Unable to find print-modal');
        }
    },

    closePrintModal: function(button) {
        var modal = button.findParentByType('print-modal');

        if (modal) {
            modal.close();
        }
        else {
            Ext.Error.raise('Unable to find print-modal');
        }
    }
});