/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/16/13
 * Time: 2:44 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.AutoCompleteController', {
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
        this.getView().removeTerm(view);
    },

    handleAutoCompleteTextKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                if (field.store.data.items.length > 0 || this.getView().attachedStore == null) {
                    field.findParentByType('auto_complete_with_tags').addTerm(field.getValue());
                    field.reset();
                }
            }
        }
    }
});