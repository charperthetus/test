Ext.define('Savanna.classification.controller.BannerController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        label: true
    },

    init: function() {
        var me = this;
        var uri = me.getView().ownerCt.getItemUri();
        if(uri) {
            Ext.Ajax.request({
                url: SavannaConfig.capcoUrl + 'formatted/uri/' + uri + ';jsessionid=' + Savanna.jsessionid,
                success: me.onSuccess,
                scope: me
            });
        }
        else {
            Ext.Ajax.request({
                url: SavannaConfig.capcoDefaultHighUrl + ';jsessionid=' + Savanna.jsessionid,
                success: me.onSuccess,
                scope: me
            });
        }
        this.callParent(arguments);
    },

    onSuccess: function(response) {
        var responseData = Ext.JSON.decode(response.responseText);
        if(responseData.formattedStrings) {
            var title = responseData.formattedStrings[0].formattedString;
            this.getLabel().setText(title);

            var background, color;
            if(title.indexOf('TOP SECRET') >= 0) {
                background = "#FFFA53"
                color = "#000000";
            } else if(title.indexOf('SECRET') >= 0) {
                background = "#ED1C24";
                color = "#FFFFFF";
            } else if(title.indexOf('CONFIDENTIAL') >= 0) {
                background = "#235FAC";
                color = "#FFFFFF";
            } else if(title.indexOf('UNCLASSIFIED') >= 0) {
                background = "#4CB748";
                color = "#FFFFFF";
            } else {
                background = "#878787";
                color = "#FFFFFF";
            }

            this.getView().setBodyStyle('background:' + background);
            this.getView().setBodyStyle('textAlign:center');
            this.getView().setBodyStyle('color:' + color);
        }
    }
});
