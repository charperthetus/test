Ext.define('Savanna.classification.controller.BannerController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        label: true
    },

    init: function() {
        var uri = this.getView().ownerCt.getItemUri();
        var systemHigh = this.getView().ownerCt.getSystemHigh();
        if(uri) {
            Ext.Ajax.request({
                url: SavannaConfig.capcoUrl + 'formatted/uri/' + uri + ';jsessionid=' + Savanna.jsessionid,
                success: this.onSuccess,
                scope: this
            });
        }
        else if(systemHigh && SavannaConfig.showSystemHighClassification){
            Ext.Ajax.request({
                url: SavannaConfig.capcoUrl + 'string/high' + ';jsessionid=' + Savanna.jsessionid,
                success: this.onSuccess,
                scope: this
            });
        }
        else if(!systemHigh){
            this.setUnspecifiedClassification();
        }
        EventHub.on('classificationchanged', this.onClassificationChanged, this);
        this.callParent(arguments);
    },

    destroy: function() {
        // remove listener from event hub
        EventHub.un('classificationchanged', this.onClassificationChanged, this);

        // allow destruction
        return this.callParent(arguments);
    },


    onSuccess: function(response) {
        var responseData = Ext.JSON.decode(response.responseText);
        if(responseData.formattedStrings) {
            var title = responseData.formattedStrings[0].formattedString;
            this.getLabel().setText(title);

            var background, color;
            if(title.indexOf('TOP SECRET') >= 0) {
                background = "#FFFA53";
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
        else {
            this.setUnspecifiedClassification();
        }
    },

    setUnspecifiedClassification: function() {
        this.getLabel().setText('UNSPECIFIED');

        this.getView().setBodyStyle('background:#878787');
        this.getView().setBodyStyle('textAlign:center');
        this.getView().setBodyStyle('color:#FFFFFF');
    },

    onClassificationChanged: function(itemUri) {
        if(itemUri === this.getView().ownerCt.getItemUri()) {
            Ext.Ajax.request({
                url: SavannaConfig.capcoUrl + 'formatted/uri/' + itemUri + ';jsessionid=' + Savanna.jsessionid,
                success: this.onSuccess,
                scope: this
            });
        }
    }
});
