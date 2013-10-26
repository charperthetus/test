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
        // When a tag is removed on a quality
        tagRemoved: {
            live: true,
            selector: '',
            listeners: {                
                'AutoComplete:TagRemoved': 'removeTag',
                'AutoComplete:ItemSelected': 'addTag'
            }
        },
        // Listens for the "choose" on the Click to add chooser
        predicateschooser: {
            click: 'launchPredicatesChooser'
        }
    },
    // This is for the main (static) auto-complete form.
    storeSet: function() {
        var me = this;
        // Generate a new form control for each predicate in the store
        Ext.each(me.getView().store.getAt(0).data, function(data) {
            var newProp = me.createNewAutoComplete(data, null);      
            Ext.each(data.values, function(value) {
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
                    propData: propData,
                    showTags: true,
                    preLabel: propName,
                    hasControls: true,
                    isClosable: true,
                    store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                        urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/property/' + predicateUri,
                        paramsObj: { excludeUri:'asdf', pageStart:0, pageLimit:10 }
                    })
                });

            // Insert after the input for autocomplete, but before the close button
            newProp.child('container').insert(1, picker);
            this.getView().add(newProp);
        }
    },
    // Convenience handler to generate a new auto-complete
    createNewAutoComplete: function(data) {
        var predicateUri = Ext.Object.fromQueryString(data.predicateUri);
        return Ext.create('Savanna.components.autoComplete.AutoComplete', {
            itemId: 'prop_' + data.label.replace(/[\s']/g, '_'),
            propData: data.label,
            showTags: true,
            preLabel: data.label,
            hasControls: true,
            isClosable: true,
            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/property/' + predicateUri,
                paramsObj: { excludeUri:'asdf', pageStart:0, pageLimit:10 }
            })
        });
    },
    // When a new tag is added on a child auto-complete
    addTag: function(tagName, tagData, aView) {
        this.addingTag(tagName, tagData, this.getView().store.getAt(0).data.values);
    },
    // When a tag is removed on a child auto-complete
    removeTag: function(tagName, aView) {
        this.removingTag(tagName, this.getView().store.getAt(0).data.values);
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
    // Launching the chooser for child auto-completes
    launchChooser: function(button, event, eOpts) {
        Ext.create('Savanna.itemView.view.header.AddIntendedUses', {
            width: 400,
            height: 300,
            title: button.id
        });
    },
    // TODO: Hook-up the predicates chooser
    launchPredicatesChooser: function() {
        console.debug('Fired');
    }
});