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

    /*
     *  Handle Remove Tag Click
     *
     *  Handles the removal of a tag. Fires closed event, and executes the
     *  removeTag method on the view (which destorys the view)
     *
     *  @param Value {string} The text of the tag
     *  @param View {object} The Extjs View object being clicked
     */
    handleRemoveTagClick: function (value, view) {
        console.log(arguments);
        this.getView().removeTag(view);
        this.getView().fireEvent('AutoComplete:TagRemoved', value, this.getView());
    },

    /*
     *  Handle Auto Complete Text Key Up
     *
     *  Listener for the keyup event on the Auto-complete textual input.
     *  Checks if 'enter' key is pressed, if the field has text, and that the
     *  view has no store (not sure about that one...). If these conditions are met
     *  It calls tagIsPresent to iterate over the tags and see if it's already present.
     *  
     *  @param field {object} The Extjs input object
     *  @param evt {object} The Event object
     */
    handleAutoCompleteTextKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length && this.getView().hasNoStore) {
                if (!this.tagIsPresent(field.getValue())){
                    this.setupNewTag(field);                    
                }
            }
            field.reset();
        }
    },

    /*
     *  Tag is Present
     *
     *  Iterates over child tags and check if the tag is already present
     *
     *  @param tagValue {string} The tag text
     *  @return result {boolean} True if there is a duplicative tag, null if not
     */
    tagIsPresent: function(tagValue) {
        var result;
        Ext.Array.each(this.getView().queryById('tagsList').items.items, function(item) {
            if (item.text === tagValue) {
                result = true;
            }
        });        
        return result;
    },
    setupNewTag: function (field) {
        if(this.getView().showTags){
            field.findParentByType('auto_complete').addTag(field.getValue());            
        }
        this.getView().fireEvent('AutoComplete:ItemSelected', field, null, this.getView());        
    },
    handleAutoCompleteSelect: function (combo, records) {
        if (!this.tagIsPresent(records[0].data.label)) {
            if (this.getView().showTags) {
                combo.findParentByType('auto_complete').addTag(records[0].data.label);
            }

            this.getView().fireEvent('AutoComplete:ItemSelected', records[0].data.label, records[0].data, this.getView());
        }

        combo.setValue('');
    },
    closeForm: function() {
        this.getView().fireEvent('AutoComplete:Destroyed', this.getView());
        this.getView().destroy();
    }
});