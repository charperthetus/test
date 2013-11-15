Ext.define('Savanna.metadata.view.Date', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_date',
    requires: [
        'Savanna.component.DatePicker'
    ],

    beforeRender: function() {
        this.setTitle(this.getDisplayLabel() + ':&nbsp;&nbsp;');
        if(this.getValue()) {
            var date = new Date(this.getValue());
            if(this.getEditable() && this.getEditMode()) {
                this.down('#displayValueEdit').setDefaultDate(date);
            } else {
                this.down('#displayValue').setValue(Ext.Date.format(date, 'Y-m-d\\TH:i:s.m\\Z'));
            }
        }
    },

    makeEditViewItems: function() {
        var datePicker = Ext.create('Savanna.component.DatePicker', {
            itemId: 'displayValueEdit',
            jsDate: this.getValue() ? new Date(this.getValue()) : null
        });
        datePicker.on('focusLost', this.onFocusLost, this);
        this.add(datePicker);
    },

    onFocusLost: function(datePicker) {
        if(datePicker.isDateValid()) {
            this.setValue(datePicker.getJsDate().getTime());
        }
    },

    updateValue: function(newValue) {
        var newDate = new Date(newValue);
        if(this.getEditMode() && this.getEditable()) {
            this.down('#displayValueEdit').setDefaultDate(newDate);
        } else {
            this.down('#displayValue').setValue(Ext.Date.format(newDate, 'Y-m-d\\TH:i:s.m\\Z'));
        }
    }
});