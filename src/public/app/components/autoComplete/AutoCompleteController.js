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

    handleRemoveTagClick: function (value, view) {
        this.getView().removeTag(view);
        this.getView().fireEvent('AutoComplete:TagRemoved', value, this.getView());
    },

    handleAutoCompleteTextKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                if (this.getView().hasNoStore) {
                    if (this.getView().queryById('tag_' + field.getValue().replace(/[\s'"]/g, "_")) === null) {
                        field.findParentByType('auto_complete').addTag(field.getValue());
                        this.getView().fireEvent('AutoComplete:ItemSelected', field.getValue(), null, this.getView());
                    }

                    field.reset();
                }
            }
        }
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