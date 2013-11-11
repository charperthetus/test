Ext.define('Savanna.classification.controller.ButtonController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        view: {
            updatelabeltext: 'onUpdateLabelText'
        },
        label: true
    },

    init: function() {

        this.callParent(arguments);

        this.getLabel().setText(this.getView().getText());
        this.styleView();

        // the following events allow the view (a panel) to act like a button
        this.getView().getEl().on('mouseover', this.onMouseOver, this);
        this.getView().getEl().on('mouseout', this.onMouseOut, this);
        this.getView().getEl().on('click', this.onClick, this);
    },

    destroy: function() {
        // clean up the events
        this.getView().getEl().un('mouseover', this.onMouseOver, this);
        this.getView().getEl().un('mouseout', this.onMouseOut, this);
        this.getView().getEl().un('click', this.onClick, this);
    },

    onUpdateLabelText: function(newText) {
        this.getLabel().setText(newText);
    },

    onMouseOver: function() {
        // increase the opacity of the view to simulate responsiveness
        this.getView().setBodyStyle('opacity:0.7');
    },

    onMouseOut: function() {
        // reset the opacity
        this.getView().setBodyStyle('opacity:1');
    },

    onClick: function() {

    },

    styleView: function() {
        var background, color;
        switch(this.getView().getText()) {
            case 'TOP SECRET':
                background = "#FFFA53";
                color = "#000000";
                break;
            case 'SECRET':
                background = "#ED1C24";
                color = "#FFFFFF";
                break;
            case 'CONFIDENTIAL':
                background = "#235FAC";
                color = "#FFFFFF";
                break;
            case 'UNCLASSIFIED':
                background = "#4CB748";
                color = "#FFFFFF";
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