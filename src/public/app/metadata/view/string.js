/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.String', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_string',

    requires: [
        'Savanna.controller.Factory'
    ],

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');
        var config = this.initialConfig || {};
        this.initValues(config);
        var me = this;
        this.makeItems();

        this.on('beforerender', Ext.bind(function() {
                if(this.editMode) {
                    if(me.down('#displayValueEdit')) {
                        me.down('#displayValueEdit').setValue(me.value);
                        me.down('#displayValueEdit').fieldLabel = me.displayLabel;
                    }
                } else {
                    if(me.down('#displayLabelItem')) {
                        me.down('#displayLabelItem').html = me.displayLabel + ':&nbsp;&nbsp;';
                    }
                    if(me.down('#displayValue')) {
                        me.down('#displayValue').html = (null === me.value) ? '&nbsp;' : me.value;
                    }
                }

        }, this));
    }

});