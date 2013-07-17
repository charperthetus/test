Ext.define('Savanna.crumbnet.view.goGraph.Palette', {
    extend: 'Ext.Component',
    alias: 'widget.go-graph_palette',

    palette: null,

    onRender: function(parentNode, containerIdx) {
        var domElem, config, palette;

        this.callParent(parentNode, containerIdx);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph-palette" style="width: 100%; height: 100%;"></div>');
        config = this.getInitialConfig();

        this.palette = new go.Palette(domElem);
        this.palette.initialAutoScale = go.Diagram.None;

        this.palette.nodeTemplateMap = config.paletteNodeTemplateMap;

        this.palette.model.nodeDataArray = [
            { category: '' }, // default node
            { category: 'Source' },
            { category: 'DesiredEvent' },
            { category: 'UndesiredEvent' },
            { category: 'Comment' }
        ];

        this.on('resize', Ext.bind(function() { this.palette.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.palette.requestUpdate(); }, this));
    }
});