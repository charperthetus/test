Ext.define('Savanna.process.view.part.TypeAhead', {
    extend: 'Ext.form.ComboBox',

    requires: [
        'Ext.form.ComboBox',
        'Savanna.process.utils.ProcessUtils'
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
        domEl.onCommit = function(textBlock) {
            var selArray = c.lastSelection;
            var selItem = selArray[0]; //multi-select is not allowed on this combo box.
            if (selItem.data.label === c.getValue()) {
                var node = textBlock.part;
                //todo: change this to call changeRepresentsUri when the new endpoint for that is finished
                Savanna.process.utils.ProcessUtils.setRepresentsUri(node.data, selItem.data.uri, diagram);
            }
        };
        domEl.value = function() {
            return c.getValue();
        }
    }
});
