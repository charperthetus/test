/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/30/13
 * Time: 8:06 AM
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Savanna.metadata.view.MetadataItemView', {
    extend: 'Ext.container.Container',
    alias: 'widget.metadata_itemview',

    layout: 'vbox',
    width: "100%",
    border: false,

    key: '',
    value: null,
    displayLabel: '',
    visible: true,
    editable: true,

    initValues: function(config) {
        this.key = config.key;
        this.value = config.value;
        this.displayLabel = config.displayLabel;
        this.visible = config.visible;
        this.editable = config.editable;
    }

});