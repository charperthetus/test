Ext.define('Savanna.map.view.part.OL3MapComponent', {
    extend: 'Ext.Component',
    alias: 'widget.ol3mapcomponent',

    config: {
        map: null
    },

    event: null,

    drawInteraction: {},

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
            ],
            renderer: ol.RendererHint.CANVAS,
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.Select({
                layers: function(layer) {
                    EventHub.fireEvent('selectEvent', this);
                    return layer.get('id') == 'vector';
                }
            })])
        });

        var task = new Ext.util.DelayedTask(function(){
            EventHub.fireEvent('clickEvent', this.event);
        });

        this.map.on('dragstart', function(evt) {
            EventHub.fireEvent('dragStart', evt);
        });

        this.map.on('dragend', function (evt){
            EventHub.fireEvent('dragEnd', evt);
        });

        this.map.on('singleclick', function(evt) {
            this.event = evt;
            task.delay(50, null, this);
        });

        this.map.on('dblclick', function (arguments) {
            EventHub.fireEvent('doubleclick', arguments);
        });

        this.map.setView(new ol.View2D({
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        }));
        this.map.setTarget(element);
    }
});