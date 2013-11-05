
Ext.define('Savanna.itemView.controller.ParentItemsAutoCompleteController', {
    extend: 'Savanna.components.autoComplete.AutoCompleteController',


    handleAutoCompleteTextKeyUp: function (field, evt) {
        if(this.getView().queryById('autoCompleteBox').getPicker())    {
            this.getView().queryById('autoCompleteBox').getPicker().maxHeight = 365;
        }
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                if (this.getView().hasNoStore) {
                    field.findParentByType('auto_complete').addTag(field.getValue());
                    this.getView().fireEvent('AutoComplete:ItemSelected', field.getValue(), null, this.getView());
                    field.reset();
                }
            }
        }
    },
    handleAutoCompleteSelect: function (combo, records, eOpts) {
        this.getView().fireEvent('AutoComplete:ItemSelected', records[0].data.label, records[0].data, this.getView());
        combo.setValue("");

        this.getView().up('itemview_create_item').close();

        if(records[0].data.uri)  {
            EventHub.fireEvent('open', {uri: records[0].data.uri, label: records[0].data.label, type: 'item'}, {editMode: true});
        }   else    {
            console.log('no uri for parent item');
        }
    }
});