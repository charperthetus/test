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

        this.palette.nodeTemplateMap = config.paletteNodeTemplateMap;

        this.palette.model.nodeDataArray = [
            { category: 'Concept' },
            { category: 'Question' },
            { category: 'Problem' },
            { category: 'Fact' },
            { category: 'Hypothesis' },
            { category: 'Conclusion' },
            { category: 'Assumption' }
        ];

        this.on('resize', Ext.bind(function() { this.palette.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.palette.requestUpdate(); }, this));
    }
});