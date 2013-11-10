/* global Ext: false, Savanna: false */
/**
 * Central controller for the Savanna client application
 */
Ext.define('Savanna.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.util.TaskRunner',
        'Savanna.utils.EventHub',
        'Savanna.utils.ComponentManager'
    ],

    views: [
        'Savanna.view.Login',
        'Savanna.desktop.view.SavannaDesktop',
        'Savanna.view.PrintModal'
    ],

    controllers: [],

    init: function(app) {
        var me = this;

        this.captureBackspace();

        this.app = app;

            this.control({
            login: {
                render: function() {
                    Ext.EventManager.on(window, 'message', function(e) {
                        //TODO - This needs to either remove after the first time or case based on the message that is sent
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
        if (this.app && this.app.viewport) {
            var mainViewport = this.app.viewport;
            var login = this.app.viewport.queryById('login');
            if (mainViewport && login) {
                Savanna.jsessionid = sessionId;
                mainViewport.remove('login');

                var main = Ext.create('Savanna.desktop.view.SavannaDesktop', {
                    systemHigh: true,
                    itemId: 'main'
                });

                mainViewport.add(main);

                //Start KeepAlive
                this.keepAlive();
                //Prompt on leaving page
                if (!SavannaConfig.hasOwnProperty('debug') || SavannaConfig.debug != true){
                    window.onbeforeunload = function () {
                        return "You may lose unsaved data.";
                    }
                }
            }
        }
        else {
            Ext.Error.raise('no viewport defined');
        }
    },

    printContent: function() {
        window.print();
    },

    closePrintModal: function(button) {
        var modal = button.findParentByType('print-modal');

        // NOTE: we assume we will always get the modal window, since the button is it's child
        modal.close();
    },

    captureBackspace: function(){
        Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e){
            var type = e.getTarget().type;
            if(type != 'text' && type != 'textarea' && e.getKey() == '8' ){
                e.preventDefault();
            }
        });
    },

    keepAlive: function(){
        var task = {
            run: function(){
                Ext.Ajax.request({
                    url: SavannaConfig.pingUrl + ';jsessionid=' + Savanna.jsessionid,
                    method: 'GET',
                    success: function(response){
                        var message = Ext.decode(response.responseText);
                        if (message.isLoggedIn == false){
                            runner.stop(task);
                            //TODO - you were logged out of the server and didn't know it, what should I do
                        }
                    },
                    failure: function(response){
                        //TODO - What do we want to do on a failure here, it is likely a bad connection
                        runner.stop(task);
                        console.log('Server Side Failure' + response.status);
                    }
                })
            },
            interval: 30000 // every 30 seconds
        };
        var runner = new Ext.util.TaskRunner();
        runner.start(task);
    }

});