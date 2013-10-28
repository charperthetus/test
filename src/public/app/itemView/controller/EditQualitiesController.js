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

    propNameArray: [],

    // NOTE: There are multiple auto-complete forms on this controller, 
    //       so be careful when listening for events, you might capture
    //       more than you bargained for.
    control: {
        // On load, set the main store
        view: {
            'EditQualities:StoreSet': 'storeSet'
        },
        // This is the auto-complete that is static
        addPropAutoChooser: {
            'AutoComplete:ItemSelected': 'addNewQualityForm'
        },
        // Launching the chooser
        qualitieschooser: {
            live: true,
            selector: 'auto_complete #qualitieschooser',
            listeners: {
                click: 'launchChooser'
            }
        },
        // When a tag is added, removed, or the predicate is destroyed
        autocompleteevents: {
            live: true,
            selector: '',
            listeners: {                
                'AutoComplete:TagRemoved': 'removeTag',
                'AutoComplete:ItemSelected': 'addTag',
                'AutoComplete:Destroyed': 'removePredicate'
            }
        },
        // Listens for the "choose" on the Click to add chooser
        qualitiesChooser: {
            click: 'launchPredicatesChooser'
        }
    },
    // This is for the main (static) auto-complete form.
    storeSet: function() {
        var me = this;
        // Generate a new form control for each predicate in the store
        Ext.each(me.getView().store.data.items, function(item) {
            var newProp = me.createNewAutoComplete(item.data);
            Ext.each(item.data.values, function(value) {
                newProp.addTag(value.label);
            });
            me.getView().add(newProp);
        });
    },
    // Control responsible for adding a new auto-complete form (dynamic)
    addNewQualityForm: function (propName, propData, aView) {
        var me = this,
            predicateUri = Ext.Object.fromQueryString(propData.uri);
        
        if (!this.getView().queryById('prop_' + propName.replace(/[\s']/g, '_'))) {
            // The "Chooser" button in the new auto-complete
            var picker = Ext.create('Ext.button.Button', {
                    text: 'Chooser',
                    itemId: 'qualitieschooser',

                    listeners: {
                        click: me.launchChooser
                    }
                }),

                // The new auto-complete control
                newProp = Ext.create('Savanna.components.autoComplete.AutoComplete', {
                    itemId: 'prop_' + propName.replace(/[\s']/g, '_'),
                    showTags: true,
                    preLabel: propName,
                    hasControls: true,
                    isClosable: true,
                    store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                        urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/property/' + predicateUri,
                        paramsObj: { excludeUri:'', pageStart:0, pageLimit:10 }
                    })
                });

            // Insert after the input for autocomplete, but before the close button
            newProp.child('container').insert(1, picker);
            this.getView().add(newProp);

            // Create a new model for the store, mapping the data to fit the model
            var newQualitiesModel = {
                id: propName,
                label: propName,
                predicateUri: propData.uri,
                values: []
            };

            // Add a new model into the store
            this.getView().store.add(newQualitiesModel);
        }
    },
    // Convenience handler to generate a new auto-complete
    createNewAutoComplete: function(data) {
        var predicateUri = Ext.Object.fromQueryString(data.predicateUri);
        this.propNameArray.push(data.label);
        return Ext.create('Savanna.components.autoComplete.AutoComplete', {
            itemId: 'prop_' + data.label.replace(/[\s']/g, '_'),
            showTags: true,
            preLabel: data.label,
            hasControls: true,
            isClosable: true,
            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/property/' + predicateUri,
                paramsObj: { excludeUri:'', pageStart:0, pageLimit:10 }
            })
        });
    },
    // When a new tag is added on a child auto-complete
    addTag: function(tagName, tagData, aView) {
        this.addingTag(tagName, tagData, this.getView().store.getById(aView.preLabel).data.values);
    },
    // When a tag is removed on a child auto-complete
    removeTag: function(tagName, aView) {
        this.removingTag(tagName, this.getView().store.getById(aView.preLabel).data.values);
    },
    // Adding tag to the store on a child auto-complete
    addingTag: function(tagName, tagData, tagArray) {
        var tagUri = tagData ? tagData.uri : null;
        var newTag = {editable: true, inheritedFrom: null, label: tagName, uri: tagUri, value: tagName, version: 0};
        tagArray.push(newTag);
    },
    // Removing the tag from the store on a child auto-complete
    removingTag: function(tagName, store) {
        for (var i = 0; i < store.length; i++) {
            if (store[i].label === tagName) {
                Ext.Array.remove(store, store[i]);
                break;
            }
        }
    },
    
    launchChooser: function(button, event, eOpts) {
        console.debug('TODO: Launch the assertions chooser', arguments);
        Ext.create('Savanna.itemView.view.header.AddIntendedUses', {
            width: 400,
            height: 300,
            title: button.id
        });
    },

    launchPredicatesChooser: function() {
        var qChooser = Ext.create('Savanna.itemView.view.itemQualities.QualitiesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store,
            propNameArray: this.propNameArray
        });

        qChooser.on('close', this.closedQPicker, this);
    },

    closedQPicker: function(view) {
        if (view.updatedStore) {
            this.getView().removeAll();
            this.propNameArray = [];
            this.storeSet();
        }
    },

    removePredicate: function(view) {
        var store = this.getView().store;
        store.remove(store.getById(view.preLabel));
    }
});


