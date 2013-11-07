Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        ol3Map: {
            resize: 'updateMapSize'
        }
    },

    updateMapSize: function() {
        this.getOl3Map().getMap().updateSize();
    }
});