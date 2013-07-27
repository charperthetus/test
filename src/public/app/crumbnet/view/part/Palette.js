Ext.define('Savanna.crumbnet.view.part.Palette', {
    extend: 'Ext.Component',
    alias: 'widget.go-graph_palette',

    palette: null,

    onRender: function() {
        var domElem, config, palette;

        this.callParent(arguments);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph-palette" style="width: 100%; height: 100%;"></div>');
        config = this.getInitialConfig();

        this.palette = new go.Palette(domElem);
        this.palette.initialAutoScale = go.Diagram.None;

        this.palette.nodeTemplate = Savanna.crumbnet.utils.ViewTemplates.generateNodeTemplate();

        this.palette.model.nodeDataArray = [
            { category: 'Concept', text: 'Concept' },
            { category: 'Question', text: 'Question' },
            { category: 'Problem', text: 'Problem' },
            { category: 'Fact', text: 'Fact' },
            { category: 'Hypothesis', text: 'Hypothesis' },
            { category: 'Conclusion', text: 'Conclusion' },
            { category: 'Assumption', text: 'Assumption' }
        ];

        this.on('resize', Ext.bind(function() { this.palette.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.palette.requestUpdate(); }, this));
    }
});