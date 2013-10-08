/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 8:16 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.Palette', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.process_palette',

    model: null,
    palette: null,

    titleAlign: 'center',

    initComponent: function() {
        this.title = this.model.get('title');

        this.callParent(arguments);

        this.mon(this, 'expand', function() { this.requestPaletteUpdate(); }, this);
    },

    onRender: function() {
        this.callParent(arguments);

        // NOTE: UiKit people, I assume we do not want hard-coded style attributes, but I put them in for the time being
        var domElem = Ext.DomHelper.insertHtml('afterBegin', this.body.dom, '<div class="process_palette" id="palette-' + Ext.id() + '" style="width: 100%; height: 100%;"></div>');

        this.palette = new go.Palette(domElem);
        this.palette.initialAutoScale = go.Diagram.None;

        this.palette.nodeTemplate =
            go.GraphObject.make(go.Node, "Vertical",
                go.GraphObject.make(go.Shape,
                    { width: 25, height: 25, fill: "white" }, new go.Binding("figure", "figure")),
                go.GraphObject.make(go.TextBlock, {alignment: go.Spot.Center, margin: 7 },
                    new go.Binding("text", "title"))
            );
        this.palette.model.nodeDataArray = this.model.templatesAsJson();

        //palette extends diagram so it has many of the same tools enabled by default.
        //We don't want users to be able to pan or select multiple nodes in the palette.
        this.palette.toolManager.dragSelectingTool.isEnabled = false;
        this.palette.toolManager.panningTool.isEnabled = false;
        this.palette.maxSelectionCount = 1;

    },

    selectionChanged: function(e) {
        this.fireEvent('nodePaletteSelectionChanged', e, this);
    },

    requestPaletteUpdate: function() {
        this.palette.requestUpdate();
    }
});