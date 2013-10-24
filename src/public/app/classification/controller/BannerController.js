Ext.define('Savanna.classification.controller.BannerController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        label: true
    },

    init: function() {
        var me = this;
        var uri = me.getView().ownerCt.getItemURI();
        if(uri) {
            Ext.Ajax.request({
                url: 'http://thedevsav1:8080/SavannaX/rest/capco/' + encodeURI(uri),
                withCredentials: true,
                success: me.onSuccess,
                scope: me
            });
        }
        else {
            Ext.Ajax.request({
                url: 'http://thedevsav1:8080/SavannaX/rest/capco/string/default/high',
                withCredentials: true,
                success: me.onSuccess,
                scope: me
            });
        }
        this.callParent(arguments);
    },

    onSuccess: function(response) {
        var responseText = response.responseText.replace(/"/g, '');
        this.getLabel().setText(responseText);

        var background, color;
        var portionMarking = responseText.split('//').shift();
        switch(portionMarking) {
            case 'TS':
                background = "#FFFA53"
                color = "#000000";
                break;
            case 'S':
                background = "#ED1C24";
                color = "#FFFFFF";
                break;
            case 'C':
                background = "#235FAC";
                color = "#FFFFFF";
                break;
            case 'U':
                background = "#4CB748";
                color = "#FFFFFF";
                break;
                break;
            default:
                background = "#878787";
                color = "#FFFFFF";
                break;
        }
        this.getView().setBodyStyle('background:' + background);
        this.getView().setBodyStyle('textAlign:center');
        this.getView().setBodyStyle('color:' + color);
    }
});
