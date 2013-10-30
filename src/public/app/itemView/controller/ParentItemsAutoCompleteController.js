/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/16/13
 * Time: 2:44 PM
 * To change this template use File | Settings | File Templates.
 */

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
            console.log(records[0].data);
            var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: 'Model Item',
                itemUri: records[0].data.uri,
                editMode: true,
                createMode:true,
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });
            Savanna.app.fireEvent('search:itemSelected', itemView);
        }   else    {
            console.log('no uri for parent item');
        }
    }
});