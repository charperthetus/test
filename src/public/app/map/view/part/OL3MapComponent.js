Ext.define('Savanna.map.view.part.OL3MapComponent', {
    extend: 'Ext.Component',
    alias: 'widget.ol3mapcomponent',

    config: {
        map: null
    },

    onRender: function() {
        var element;

        this.callParent(arguments);

        element = Ext.DomHelper.insertHtml(
            'afterBegin',
            this.getEl().dom,
            '<div class="map" style="width: 100%; height: 100%; position: absolute;"></div>'
        );

        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.MapQuestOpenAerial()
                })
            ]
        });
        this.map.setView(new ol.View2D({
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        }));
        this.map.setTarget(element);
    }
});