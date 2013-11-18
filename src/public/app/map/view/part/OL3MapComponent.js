Ext.define('Savanna.map.view.part.OL3MapComponent', {
    extend: 'Ext.Component',
    alias: 'widget.ol3mapcomponent',

    config: {
        map: null,
        userLayer: null
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
                })],
            renderer: ol.RendererHint.CANVAS
        });

        /*
        Map Events
         */

        this.map.on('dragstart', function(evt) {
            this.fireEvent('dragStart', evt);
        }, this);

        this.map.on('dragend', function (evt){
            this.fireEvent('dragEnd', evt);
        }, this);

        var task = new Ext.util.DelayedTask(function(){
            this.fireEvent('clickEvent', this.event);
        }, this);

        this.map.on('singleclick', function(evt) {
            this.event = evt;
            task.delay(50, null, this);
        }, this);

        /*
        Add selectInteraction to map so that it can be removed on demand
         */

        this.map.selectInteraction = new ol.interaction.Select({
            layers: function(layer) {
                return layer.get('id') == 'vector';
            }
        });

        this.map.addInteraction(this.map.selectInteraction);

        /*
        Set View
         */

        this.map.setView(new ol.View2D({
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        }));

        this.map.setTarget(element);
    }
});