Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Ext.app.Controller',

    // TODO: define stores for itemview subcomponents

    views: [
        'Savanna.itemView.view.ItemViewer',
        'Savanna.itemView.view.itemView.Header',
        'Savanna.itemView.view.itemView.header.DisplayLabel',
        'Savanna.itemView.view.itemView.ImagesGrid',
        'Savanna.itemView.view.itemView.components.AutoCompleteWithTags',
        'Savanna.itemView.view.itemView.ImageThumbnail',
        'Savanna.itemView.view.itemView.ItemProperties',
        'Savanna.itemView.view.itemView.components.LabeledFieldWithTags'
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
            'itemview_itemviewer #auto_complete_box': {
                keyup: this.handleAutoCompleteTextKeyUp
            },

            'itemview_itemviewer #removeTerm': {
                click: this.handleRemoveTagClick
            },

            'itemview_itemviewer #addPropBtn': {
                click: this.handleAddPropertyBtnClick
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

        //Related Processes
        this.setupRelatedProcesses(data, view);

        //Right Side

        //Images
        this.setupImages(data, view);

        //Properties
        this.setupProperties(data, view);
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

    setupRelatedProcesses: function (data, view) {
        console.log('TODO: figure out how to source "relatedProcesses" data and render it');
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
        var selectedImage = image.src,
            title = (image.title) ? image.title : 'No title',
            description = (image.alt) ? image.alt : 'No description',
            jumboImage = this.getItemview().queryById('image_primary'),
            jumboMeta = this.getItemview().queryById('image_text'),
            imageWidth = image.naturalWidth,
            imageHeight = image.naturalHeight;

        var backgroundSize = (imageWidth < jumboImage.width && imageHeight < jumboImage.height) ? 'inherit' : 'contain';
        
        // In order to display text over an image, the image is used as a background image on a panel
        jumboImage.setBodyStyle({
            backgroundImage: 'url(' + selectedImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: backgroundSize,
            backgroundColor: 'transparent'
        });
        jumboMeta.update(description);
    },

    setupProperties: function (data, view) {
        //ToDo: set up to load current incoming properties
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
                field.reset();
            }
        }
    },

    handleRemoveTagClick: function (btn) {
        btn.up('auto_complete_with_tags').removeTerm(btn);
    },

    handleAddPropertyBtnClick: function (btn) {
        var valArray = new Array();
        valArray[0] = "Red";
        valArray[1] = "Blue";
        btn.up('itemview_itemviewer').down('item_properties').addProp({propName: "Color" + Math.random(), propValue: valArray});
    }
});
