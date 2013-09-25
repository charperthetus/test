Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Ext.app.Controller',

    // TODO: define stores for itemview subcomponents

    views: [
        'Savanna.itemView.view.ItemViewer',
        'Savanna.itemView.view.itemView.DisplayLabel',
        'Savanna.itemView.view.itemView.Boilerplate',
        'Savanna.itemView.view.itemView.RelatedContent',
        'Savanna.itemView.view.itemView.Annotations',
        'Savanna.itemView.view.itemView.ImagesGrid',
        'Savanna.itemView.view.itemView.Confusers'

    ],

    constructor: function (options) {
        this.opts = options || {};

        this.callParent(arguments);
    },

    init: function (app) {

        app.on('search:itemselected', this.showItemView, this);

        var me = this;

        // TODO: add listeners for life-cycle events on itemview components/subcomponents
        this.control({
            itemview: {
                render: function (view) {
                    //console.log('itemview render', arguments);
                }
            }
        });
        this.on("itemview:created", function (tab) {
            var tabpanel = Ext.ComponentQuery.query('desktop_modelsearchwindow #maintabs')[0];
            var main=tabpanel.getActiveTab();
            tabpanel.add(tab);
        });

    },

    showItemView: function (grid, record, item) {


        var bustCache = typeof this.opts.disableCaching === 'undefined' ? true : this.opts.disableCaching;

        Ext.Ajax.request({
            url: this.buildItemDataFetchUrl(record.data.id),
            method: 'GET',
            withCredentials: true,
            disableCaching: bustCache,
            headers: {
                'Accept': 'application/json'
            },

            //success: Ext.bind(this.handleRecordDataRequestSuccess, this, [record]),

            success: Ext.bind(this.handleRecordDataRequestSuccess, this, [record], true),
            failure: function ( response) {

                // TODO: abstract out
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    handleRecordDataRequestSuccess: function(response, options, record) {
        var itemData = Ext.decode(response.responseText),
            itemView = Ext.create('Savanna.itemView.view.ItemViewer',{
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

        createdBy = this.getEntryForKey('createdBy', data.metadata.metadataEntries);
        modifiedBy = this.getEntryForKey('modifiedBy', data.metadata.metadataEntries);

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
        var imagesGrid = view.queryById('imagesGrid'),
            i;

        for (i = 0; i < data.relatedCharacteristics.length; i++) {
            imagesGrid.store.add({
                url: SavannaConfig.savannaUrlRoot + '/preview2/?filestoreUri=' + data.relatedCharacteristics[i] + '&width=80&height=80'
            });
        }
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
    buildItemDataFetchUrl: function (itemId) {
        return SavannaConfig.itemViewUrl + itemId + ';jsessionid=' + Savanna.jsessionid;
    }
});
