/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/16/13
 * Time: 2:44 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.components.autoComplete.AutoCompleteController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        search_resultsDals_resultsterm: {
            live: true,
            selector: 'container search_resultsDals_resultsterm',
            listeners: {
                'Search:RemoveSearchTerm': {
                    fn: 'handleRemoveTagClick'
                }
            }
        },

        autoCompleteBox: {
                keyup: 'handleAutoCompleteTextKeyUp'
        }
    },

    handleRemoveTagClick: function (value, view) {
        this.getView().removeTag(view);
        this.getView().fireEvent('AutoComplete:TagRemoved', value, this.getView());
    },

    handleAutoCompleteTextKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                if (field.store.data.items.length > 0 || this.getView().hasNoStore) {
                    if (this.getView().showTags) {
                        field.findParentByType('auto_complete').addTag(field.getValue());
                    }
                    if(this.getView().store)   {
                        this.getView().fireEvent('AutoComplete:ItemSelected', field.getValue(), this.getView().store.getAt(0).data, this.getView());
                    }
                    else {
                        this.getView().fireEvent('AutoComplete:ItemSelected', field.getValue(), null, this.getView());
                    }

                    field.reset();
                }
            }
        }
    }
});