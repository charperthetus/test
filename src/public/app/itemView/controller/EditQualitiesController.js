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

    storeHelper: null,

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
        qualitiesChooser: {
            live: true,
            selector: 'auto_complete #qualitiesChooser',
            listeners: {
                click: 'launchChooser'
            }
        },
        // When a tag is added, removed, or the predicate is destroyed
        autocompleteEvents: {
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

    init: function() {
        this.callParent(arguments);
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
    },

    // This is for the main (static) auto-complete form.
    storeSet: function() {
        var me = this;
        this.storeHelper.init();

        // Generate a new form control for each predicate in the store
        Ext.each(me.getView().store.data.items, function(item) {
            var newProp = me.createNewAutoComplete(item.data);
            Ext.each(item.data.values, function(value) {
                newProp.addTag(value.label);
            });
            me.getView().add(newProp);
        });
        this.updateTitle();
    },
    // Control responsible for adding a new auto-complete form (dynamic)
    addNewQualityForm: function (propName, propData, aView) {
        var me = this,
            predicateUri = Ext.Object.fromQueryString(propData.uri);
        
        if (!this.getView().queryById('prop_' + propName.replace(/[\s']/g, '_'))) {
            // The "Chooser" button in the new auto-complete
            var picker = Ext.create('Ext.button.Button', {
                    text: 'Chooser',
                    itemId: 'qualitiesChooser',

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
            this.propNameArray.push(propName);

            // Create a new model for the store, mapping the data to fit the model
            var newQualitiesModel = {
                id: propName,
                label: propName,
                predicateUri: propData.uri,
                values: []
            };

            // Add a new model into the store
            this.getView().store.add(newQualitiesModel);
            this.storeHelper.addToMainStore("Properties", newQualitiesModel);
            this.updateTitle();
        }
    },
    // Convenience handler to generate a new auto-complete
    createNewAutoComplete: function(data) {
        var me = this,
            predicateUri = Ext.Object.fromQueryString(data.predicateUri),
            picker = Ext.create('Ext.button.Button', {
                text: 'Chooser',
                itemId: 'qualitieschooser',

                listeners: {
                    click: me.launchChooser
                }
            }),
            newProp =  Ext.create('Savanna.components.autoComplete.AutoComplete', {
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
        this.propNameArray.push(data.label);
        newProp.child('container').insert(1, picker);
        return newProp;
    },

    // When a new tag is added on a child auto-complete
    // add the tag to the store
    addTag: function(tagName, tagData, aView) {
        var tagUri = tagData ? tagData.uri : null;
        var newTag = {editable: true, inheritedFrom: null, label: tagName, uri: tagUri, value: tagName, version: 0};
        this.getView().store.getById(aView.preLabel).data.values.push(newTag);
    },

    // When a tag is removed on a child auto-complete
    // remove the tag from the store
    removeTag: function(tagName, aView) {
        var tagArray = this.getView().store.getById(aView.preLabel).data.values;

        for (var i = 0; i < tagArray.length; i++) {
            if (tagArray[i].label === tagName) {
                Ext.Array.remove(tagArray, tagArray[i]);
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
            this.storeHelper.updateMainStore(this.getView().store.data.items, "Properties");
            this.storeSet();
            this.updateTitle();
        }
    },

    removePredicate: function(view) {
        this.storeHelper.removeFromMainStore("Properties", view.preLabel);
        this.getView().store.remove(this.getView().store.getById(view.preLabel));
        this.updateTitle();
    },

    updateTitle: function() {
        this.getView().setTitle('Qualities (' + this.getView().store.data.items.length + ')');
    }
});