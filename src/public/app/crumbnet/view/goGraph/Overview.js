Ext.define('Savanna.crumbnet.view.goGraph.Overview', {
    extend: 'Ext.Component',
    alias: 'widget.go-graph_overview',

    overview: null,
    diagram: null,

    setDiagram: function(val) {
        this.diagram = val;
        if(this.overview){
            this.overview.observed = val;
        }
    },

    onRender: function(parentNode, containerIdx) {
        this.callParent(parentNode, containerIdx);

//        <span style="display: inline-block; vertical-align: top; padding: 5px; width:200px">
//            <div id="palette" style="background-color: Snow; border: solid 1px gray; height: 200px"></div>
//        </span>

        var domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph-overview" ' +
            'style="background-color: ' +
            'white; border-style:solid; ' +
            'border-width:1px; ' +
            'width: 200px; ' +
            'height: 200px; ' +
            'position: absolute; ' +
            'top: 0; left: 0; opacity: 1.0;' +
            'z-index: 10"></div>');

        this.overview = new go.Overview(domElem);
        if (this.diagram){
            this.overview.observed = this.diagram;
        }
    }
});