/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false, go: false, Savanna: false, go: false */
Ext.define('Savanna.crumbnet.view.part.PaletteGroup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.crumbnet_part_palette-group',

    model: null,

    requires: [
        'Savanna.crumbnet.utils.ViewTemplates'
    ],

    palette: null,

    initComponent: function() {
        this.title = this.model.get('title');

        this.callParent(arguments);

        this.mon(this, 'expand', function() { this.requestPaletteUpdate(); }, this);
        this.mon(this, 'expand', function() { this.requestPaletteUpdate(); }, this);
    },

    onRender: function() {
        this.callParent(arguments);

        var domElem = Ext.DomHelper.insertHtml('afterBegin', this.body.dom, '<div class="go-graph-palette" id="palette-' + Ext.id() + '" style="width: 100%; height: 100%;"></div>');

        this.palette = new go.Palette(domElem);
        this.palette.initialAutoScale = go.Diagram.None;

        this.palette.nodeTemplate = Savanna.crumbnet.utils.ViewTemplates.generateNodeTemplate({selectionAdorned: false});

        this.palette.model.nodeDataArray = this.model.templatesAsJson();
    },

    requestPaletteUpdate: function() {
        this.palette.requestUpdate();
    }
});