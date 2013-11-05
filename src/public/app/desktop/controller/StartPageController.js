Ext.define('Savanna.desktop.controller.StartPageController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        openButton: {
            click: 'onOpen'
        }
    },
    onOpen: function(button){
        var id = button.up('startpageitem').itemId;
        EventHub.fireEvent(id);
    }
});