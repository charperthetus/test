/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.EditQualitiesController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.itemQualities.EditItemQualities'
    ],

    control: {
        view: {
            'EditQualities:StoreSet': 'storeSet'
        },
        addPropAutoChooser: {
            'AutoComplete:ItemSelected': 'addNewQualityForm'
        },
        qualitieschooser: {
            live: true,
            selector: 'auto_complete #qualitieschooser',
            listeners: {
                click: 'launchChooser'
            }
        },
        tagRemoved: {
            live: true,
            selector: '',
            listeners: {                
                'AutoComplete:TagRemoved': 'removeTag',
                'AutoComplete:ItemSelected': 'addTag'
            }
        }
    },

    storeSet: function() {
        var me = this;
        Ext.each(me.getView().store.getAt(0).data, function(data) {
            var newProp = me.createNewAutoComplete(data, null);      
            Ext.each(data.values, function(value) {
                newProp.addTag(value.label);
            });
            me.getView().add(newProp);
        });
    },

    // NOTE: Properties have certain form elements based on what "type" they are.
    addNewQualityForm: function (propName, propData, aView) {
        var me = this;
        if (!this.getView().queryById('prop_' + propName.replace(/[\s']/g, '_'))) {

            var qualityType = propData.type,
                formControls = [],

                // TODO Refactor this to use Deft events?
                picker = Ext.create('Ext.button.Button', {
                    text: 'Chooser',
                    itemId: 'qualitieschooser',
                    listeners: {
                        click: me.launchChooser
                    }
                }),

                // The new form control
                newProp = Ext.create('Savanna.components.autoComplete.AutoComplete', {
                    itemId: 'prop_' + propName.replace(/[\s']/g, '_'),
                    propData: propData,
                    showTags: true,
                    preLabel: propName,
                    hasControls: true,
                    isClosable: true,
                });

            // Build the control based on the type of quality
            if(qualityType === 'list'){
                formControls = [picker];
            }
            // Insert after the input for autocomplete, but before the close button
            newProp.child('container').insert(1, formControls);
            this.getView().add(newProp);
        }
    },

    // TODO: Refactor to eat live data
    createNewAutoComplete: function(data, store) {
        return Ext.create('Savanna.components.autoComplete.AutoComplete', {
            itemId: 'prop_' + data.label.replace(/[\s']/g, '_'),
            propData: data.label,
            showTags: true,
            preLabel: data.label,
            hasControls: true,
            isClosable: true,
        });
    },

    addTag: function(tagName, tagData, aView) {
        this.addingTag(tagName, tagData, this.getView().store.getAt(0).data.values);
    },

    removeTag: function(tagName, aView) {
        this.removingTag(tagName, this.getView().store.getAt(0).data.values);
    },

    addingTag: function(tagName, tagData, tagArray) {
        var tagUri = tagData ? tagData.uri : null;
        var newTag = {editable: true, inheritedFrom: null, label: tagName, uri: tagUri, value: tagName, version: 0};
        tagArray.push(newTag);
    },

    removingTag: function(tagName, store) {
        for (var i = 0; i < store.length; i++) {
            if (store[i].label === tagName) {
                Ext.Array.remove(store, store[i]);
                break;
            }
        }
    },

    // TODO: Launch the qualities chooser¡
    launchChooser: function(button, event, eOpts) {
        Ext.create('Savanna.itemView.view.header.AddIntendedUses', {
            width: 400,
            height: 300,
            title: button.id
        });
    }
});