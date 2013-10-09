Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Ext.app.Controller',

    // TODO: define stores for itemview subcomponents

    views: [
        'Savanna.itemView.view.ItemViewer',
        'Savanna.itemView.view.itemView.Header',
        'Savanna.itemView.view.itemView.header.DisplayLabel',
        'Savanna.itemView.view.itemView.Boilerplate',
        'Savanna.itemView.view.itemView.RelatedContent',
        'Savanna.itemView.view.itemView.Annotations',
        'Savanna.itemView.view.itemView.ImagesGrid',
        'Savanna.itemView.view.itemView.Confusers',
        'Savanna.itemView.view.itemView.components.AutoCompleteWithTags',
        'Savanna.itemView.view.itemView.ImageThumbnail'
    ],

    refs: [
        {
            ref: 'itemview',
            selector: 'itemview_itemviewer'
        }
    ],

    constructor: function (options) {
        this.opts = options || {};

        this.callParent(arguments);
    },

    init: function (app) {
        this.control({
            'itemview_header #auto_complete_text_box': {
                keyup: this.handleAutoCompleteTextKeyUp
            },

            'itemview_header #removeTerm': {
                click: this.handleRemoveTagClick
            },

            // Slideshow events
            '#nav_left' : {
                click: this.onNavLeft
            },
            '#nav_right' : {
                click: this.onNavRight
            }
        });

        app.on('search:itemselected', this.showItemView, this);


        this.on("itemview:created", this.onItemViewCreated);
    },

    onItemViewCreated: function (tab) {

        var tabpanel = Ext.ComponentQuery.query('desktop_tabpanel')[0];
        var main = tabpanel.getActiveTab();
        tabpanel.add(tab);

    },

    showItemView: function (grid, record, item) {


        var bustCache = typeof this.opts.disableCaching === 'undefined' ? true : this.opts.disableCaching;

        Ext.Ajax.request({
            url: this.buildItemDataFetchUrl(record.data.uri),
            method: 'GET',
            disableCaching: bustCache,
            headers: {
                'Accept': 'application/json'
            },


            success: Ext.bind(this.handleRecordDataRequestSuccess, this, [record], true),
            failure: function (response) {

                // TODO: abstract out
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    handleRecordDataRequestSuccess: function (response, options, record) {
        var itemData = Ext.decode(response.responseText),
            itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: record.data.referenceName,
                closable: true,
                autoScroll: true
            });
        this.itemView = itemView;
        this.setData(itemData, itemView);

        this.fireEvent('itemview:created', itemView);
    },

    setData: function (data, view) {

        //Left Side

        //Display Label
        this.setupDisplayLabel(data.displayLabel, view);

        //Aliases
        this.setupAliases(data.aliases, view);

        //Boilerplate
        this.setupBoilerplate(data, view);

        //Related Processes
        this.setupRelatedProcesses(data, view);

        //Related Content
        this.setupRelatedContent(data, view);

        //Annotations
        this.setupAnnotations(data, view);

        //Right Side

        //Images
        this.setupImages(data, view);

        //Properties
        this.setupProperties(data, view);

        //Confusers
        this.setupConfusers(data, view);
    },

    setupDisplayLabel: function (displayLabel, view) {
        var displayLabelComponent = view.queryById('itemDisplayLabel');
        displayLabelComponent.update({displayLabel: displayLabel});
    },

    setupAliases: function (aliasList, view) {
        if (aliasList != null && aliasList.length > 0) {
            var aliasTags = view.down('#itemAlias > auto_complete_with_tags');

            for (var i = 0; i < aliasList.length; i++) {
                aliasTags.addTerm(aliasList[i]);
            }
        }
    },

    setupBoilerplate: function (data, view) {
        var bpGrid = view.down('panel > propertygrid:first'),
            taxParentText = '',
            i,
            createdBy,
            modifiedBy,
            bpData;

        if (data.taxoParents.length > 0) {
            taxParentText = data.taxoParents[0].referenceName;
        }

        for (i = 1; i < data.taxoParents.length; i++) {
            taxParentText += ', ' + data.taxoParents[i].referenceName;
        }

        createdBy = "benji"; // this.getEntryForKey('createdBy', data.metadata.metadataEntries);
        modifiedBy = "benji"; // this.getEntryForKey('modifiedBy', data.metadata.metadataEntries);

        bpData = {
            'Aliases': data.aliases.join(', '),
            //'Parent Classes': data.classParents.join(', '), // BUG: this is an object, not an array of strings...
            'Taxonomic Categories': taxParentText,
            'Created': new Date(data.createdDate) + ' - ' + createdBy,
            'Modified': new Date(data.lastModifiedDate) + ' - ' + modifiedBy,
            //'Workflow Status': data.workflowInfo.workflowState + ' - ' + new Date(data.workflowInfo.lastWorkflowActionDate) + ' - ' + data.workflowInfo.lastWorkflowActionPerformedBy,
            'Workflow Notes': data.functionalDescription
        };

        bpGrid.setSource(bpData);
    },

    setupRelatedProcesses: function (data, view) {
        console.log('TODO: figure out how to source "relatedProcesses" data and render it');
    },

    setupRelatedContent: function (data, view) {
        var relatedItems = data.relatedItems,
            relatedContentBox = view.queryById('relatedContent'),
            relatedContentStore = relatedContentBox.getStore();

        relatedContentStore.loadData(relatedItems);
        relatedContentBox.refresh();
    },

    setupAnnotations: function (data, view) {
        var annotationGrid = view.queryById('annotationGrid');

        Ext.Ajax.request({
            url: SavannaConfig.savannaUrlRoot + '/rest/crud/query;jsessionid=' + Savanna.jsessionid,
            method: 'POST',
            cors: true,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            },
            jsonData: {
                _type: 'com.thetus.platforms.savanna.services.annotation.AnnotationDataQuery',
                uris: [data.uri],
                numResultsOnly: false
            },
            success: function (response, opts) {
                var annotations = Ext.decode(response.responseText);

                annotationGrid.store.add(annotations);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    setupImages: function (data, view) {
        var me = this,
            thumbnail_list = view.queryById('thumbnail_list');

        Ext.Array.each(data.observables, function(image, index) {
            var imageSource = SavannaConfig.savannaUrlRoot + '/preview2/?filestoreUri=' + image.uri;
            var thumbnail = Ext.create('Savanna.itemView.view.itemView.ImageThumbnail', {
                title: image.displayLabel,
                src: imageSource,
                alt: image.comment,
                listeners: {
                    click: {
                        element: 'el',
                        fn: me.onChangeImage.bind(me)
                    }
                }
            });
            thumbnail_list.add(thumbnail);
        });
    },

    // Scroll Left Button
    onNavLeft: function() {
        var gallery = this.getItemview().queryById('thumbnail_list');
        gallery.scrollBy(-450, 0, true);
    },

    // Scroll Right Button
    onNavRight: function() {
        var gallery = this.getItemview().queryById('thumbnail_list');
        gallery.scrollBy(450, 0, true);
    },

    // Selecting an image to expand
    onChangeImage: function(btn, image) {
        console.log(arguments);
        var selectedImage = image.src,
            title = (image.title) ? image.title : 'No title',
            description = (image.alt) ? image.alt : 'No description',
            jumboImage = this.getItemview().queryById('image_primary'),
            jumboMeta = this.getItemview().queryById('image_text');
        
        jumboImage.setBodyStyle({
            backgroundImage: 'url(' + selectedImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundColor: 'transparent'
        });

        jumboMeta.update(description);
    },

    setupProperties: function (data, view) {
        var propData = {},
            propGrid,
            prop,
            i = 0;

        for (; i < data.itemProperties.length; i++) {
            prop = data.itemProperties[i];
            propData[prop.propertyName] = prop.propertyValue;
        }

        propGrid = Ext.ComponentQuery.query('#propGrid', view)[0];

        propGrid.setSource(propData);
    },

    setupConfusers: function (data, view) {
        var confusers = data.confusers,
            confusersBox = view.queryById('confusers'),
            confusersStore = confusersBox.getStore();

        confusersStore.loadData(confusers);
        confusersBox.refresh();
    },

    getEntryForKey: function (key, entries) {
        var entry,
            i;

        for (i = 0; i < entries.length; i++) {
            if (entries[i].key.key == key) {
                entry = entries[i].value;
                break;
            }
        }

        return entry;
    },

    buildItemDataFetchUrl: function (uri) {
        //uri = Ext.JSON.decode(uri);
       uri = encodeURI(uri);
        return SavannaConfig.itemViewUrl + uri + ';jsessionid=' + Savanna.jsessionid;
    },

    handleAutoCompleteTextKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                field.findParentByType('auto_complete_with_tags').addTerm(field.getValue());
                field.setValue('');
            }
        }
    },

    handleRemoveTagClick: function (btn) {
        btn.up('auto_complete_with_tags').removeTerm(btn);
    }
});
