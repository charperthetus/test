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

    listeners: {
        afterrender: { fn: 'setup'}
    },

    setup: function (c) {
        var domEl = c.getEl().dom;
        var diagram = this.diagram;
        var toolManager = diagram.toolManager;
        toolManager.textEditingTool.defaultTextEditor = domEl;
        domEl.style.visibility = 'hidden';
        domEl.onActivate = function () {
            domEl.style.visibility = '';
            domEl.value = diagram.toolManager.textEditingTool.textBlock.text;
            var loc = diagram.toolManager.textEditingTool.textBlock.getDocumentPoint(go.Spot.TopLeft);
            var pos = diagram.transformDocToView(loc);
            domEl.style.left = (pos.x - 5).toString() + "px";
            domEl.style.top = (pos.y - 5).toString() + "px";
        }
    },

    setSelectionRange: function() {

    }
});
