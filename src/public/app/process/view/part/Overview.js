/* global Ext: false */
Ext.define('Savanna.process.view.part.Overview', {
    extend: 'Ext.Component',
    alias: 'widget.processOverview',

    overview: null,
    diagram: null,

    setDiagram: function(val) {
        this.diagram = val;

        if (this.overview) {


            this.overview.observed = val;

        }
    },

    onRender: function() {
        this.callParent(arguments);

        if (this.diagram) {
            var domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="processOverview" ' +
                'style="background-color: ' +
                'white; border-style:solid; ' +
                'border-width:1px; ' +
                'width: 200px; ' +
                'height: 200px; ' +
                'position: absolute; ' +
                'bottom: 0; left: 0; opacity: 1.0;' +
                'z-index: 10"></div>');

            this.overview = new go.Overview(domElem);

            var gmake = go.GraphObject.make;
            this.overview.box =
                gmake(go.Part,
                    { layerName: "Tool" },
                    gmake(go.Shape,
                        { name: "SHAPE", fill: null, stroke: "#3ca8c8", strokeWidth: 2, stretch: go.GraphObject.Fill }));



            this.overview.observed = this.diagram;



        }
    }
}); 