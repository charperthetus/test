Ext.define('Savanna.process.view.part.TypeAhead', {
    extend: 'Ext.form.ComboBox',

    requires: [
        'Ext.form.ComboBox'
    ],

    config: {
        diagram: null
    },

    queryMode: 'remote',
    queryParam: 'q',
    minChars: 1,
    typeAhead: true,
    displayField: 'label',
    enableKeyEvents: true,
    hideTrigger: true,


    listeners: {
        afterrender: { fn: 'setup'}
    },

    constructor: function(configs) {
        this.callParent(arguments);
        this.initConfig(configs);  //initializes configs passed in constructor
    },

    setup: function (c) {
        var me = this;
        var domEl = c.getEl().dom;
        var diagram = this.diagram;
        domEl.style.visibility = 'hidden';
        domEl.onActivate = function () {
            domEl.style.visibility = '';
            c.setValue(diagram.toolManager.textEditingTool.textBlock.text);
            var loc = diagram.toolManager.textEditingTool.textBlock.getDocumentPoint(go.Spot.TopLeft);
            var pos = diagram.transformDocToView(loc);
            domEl.style.left = (pos.x - 5).toString() + "px";
            domEl.style.top = (pos.y - 5).toString() + "px";
        };
        domEl.onDeactivate = function () {
            domEl.style.visibility = 'hidden';
            // clear out the store when we are done with it,
            // so that it will always start fresh the next time
            me.store.loadData([],false);
        };
        domEl.value = function() {
            return c.getValue();
        }
    }
});
