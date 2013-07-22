Ext.define('Savanna.crumbnet.view.goGraph.Canvas', {
    extend: 'Ext.Component',
    alias: 'widget.go-graph_canvas',

    store: 'Savanna.crumbnet.store.Graph',

    diagram: null,

    initComponent: function() {
        Savanna.controller.Factory.getController('Savanna.crumbnet.controller.GoGraph');

        // NOTE: borrowed from Ext.panel.Table (abbreviated version of how it uses a store for it's data backend)
        this.store = Ext.data.StoreManager.lookup(this.store || 'ext-empty-store');

        this.mon(this.store, {
            load: this.onStoreLoad,
            scope: this
        });
    },

    onRender: function(parentNode, containerIdx) {
        var domElem, config, i = 0, eventName;

        this.callParent(parentNode, containerIdx);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph" style="width: 100%; height: 100%;"></div>');
        config = this.getInitialConfig();

        this.diagram = new go.Diagram(domElem);
        this.diagram.nodeTemplateMap = config.nodeTemplateMap;
        this.diagram.linkTemplate = config.linkTemplate;

        // have mouse wheel events zoom in and out instead of scroll up and down
        this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
        this.diagram.allowDrop = true;
        this.diagram.initialContentAlignment = go.Spot.Center;

        if (this.store.getCount() > 0) {
            this.onStoreLoad(this.store);
        }

        this.on('resize', Ext.bind(function() { this.diagram.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.diagram.requestUpdate(); }, this));

        this.diagram.layout = go.GraphObject.make(go.ForceDirectedLayout, { isOngoing: false });

        this.diagram.toolManager.linkingTool.direction = go.LinkingTool.ForwardsOnly;
        this.diagram.toolManager.linkingTool.portGravity = 10;

        this.diagram.model.undoManager.isEnabled = true;
    },

    // CUSTOM METHODS

    onStoreLoad: function(store) {
        if (this.diagram) {
            //TODO - this is just getting the first array in the store - we need to figure out how we really want to use the stores
            var graphRecord = store.getAt(0);

            this.diagram.model = go.GraphObject.make(go.GraphLinksModel, {
                nodeDataArray: graphRecord.get('nodeDataArray'),
                linkDataArray: graphRecord.get('linkDataArray')
            });
        }
    }
});