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
        autocomplete_tags: {
            live: true,
            selector: 'container autocomplete_tags',
            listeners: {
                'Tag:RemoveSearchTerm': {
                    fn: 'handleRemoveTagClick'
                }
            }
        },
        autoCompleteBox: {
                keyup: 'handleAutoCompleteTextKeyUp',
                select: 'handleAutoCompleteSelect'
        },
        closebutton: {
            live: true,
            selector: 'container #closeautocomplete',
            listeners: {
                click: 'closeForm'
            }
        }
    },

    filterSpecialCharacters: function(value) {
        return value.replace(/[^a-z0-9\s]/gi, '_');
    },

    handleRemoveTagClick: function (value, view) {
        this.getView().removeTag(view);
        this.getView().fireEvent('AutoComplete:TagRemoved', value, this.getView());
    },

    handleAutoCompleteTextKeyUp: function (field, evt) {
        // Check enter key and field value
        if ( evt.keyCode !== Ext.EventObject.ENTER || !field.getValue().trim().length || this.getView().hasNoStore ) {
            return false;
        }
        console.log(this.getView().queryById('tagslist').items);
        field.reset();
    },

    setupNewTag: function (field) {
        field.findParentByType('auto_complete').addTag(field.getValue());
        this.getView().fireEvent('AutoComplete:ItemSelected', field.getValue(), null, this.getView());        
    },

    handleAutoCompleteSelect: function (combo, records, eOpts) {
        if (this.getView().queryById('tag_' + records[0].data.label.replace(/[\s'"]/g, "_")) === null) {
            if (this.getView().showTags) {
                combo.findParentByType('auto_complete').addTag(records[0].data.label);
            }

            this.getView().fireEvent('AutoComplete:ItemSelected', records[0].data.label, records[0].data, this.getView());
        }

        combo.setValue("");
    },
    closeForm: function() {
        this.getView().fireEvent('AutoComplete:Destroyed', this.getView());
        this.getView().destroy();
    }
});