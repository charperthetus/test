Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.ItemViewer'
    ],

    requires: [
        'Savanna.itemView.store.MainItemStore'
    ],

    store: 'Savanna.itemView.store.MainItemStore',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    control: {
        addPropAutoChooser: {
            keyup: 'handleAddChosenProperty'
        },

        nav_left: {
            click:'onNavLeft'
        },

        nav_right: {
            click: 'onNavRight'
        }
    },

    constructor: function (options) {
        this.opts = options || {};
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    init: function (app) {
        this.getItemViewData();
        return this.callParent(arguments);
    },

    getItemViewData: function () {
        var tmpStore = Ext.data.StoreManager.lookup(this.store);
        tmpStore.getProxy().url = this.buildItemDataFetchUrl(this.getView().itemUri);
        tmpStore.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    onItemViewCreated: function (tab) {
        var tabpanel = Ext.ComponentQuery.query('desktop_tabpanel')[0];
        var main = tabpanel.getActiveTab();
        tabpanel.add(tab);
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {
        var headerComponent = this.getView().queryById('itemViewHeader');
        headerComponent.setTitle(record[0].data.label);
        headerComponent.reconfigure(record[0].propertyGroupsStore.getAt(0).valuesStore);

        var processComponent = this.getView().queryById('relatedProcesses');
        processComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
        processComponent.reconfigure(record[0].kvPairGroupsStore.getAt(0).pairsStore);
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
        var gallery = Ext.ComponentQuery.query('#thumbnail_list')[0];
        gallery.scrollBy(-450, 0, true);
    },

    // Scroll Right Button
    onNavRight: function() {
        var gallery = Ext.ComponentQuery.query('#thumbnail_list')[0];
        gallery.scrollBy(450, 0, true);
    },

    // Selecting an image to expand
    onChangeImage: function(btn, image) {
        var selectedImage = image.src,
            title = (image.title) ? image.title : 'No title',
            description = (image.alt) ? image.alt : 'No description',
            jumboImage = Ext.ComponentQuery.query('#image_primary')[0],
            jumboMeta = Ext.ComponentQuery.query('#image_text')[0],
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

    handleAddChosenProperty: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                var valArray = new Array();
                valArray[0] = "Red";
                valArray[1] = "Blue";
                field.up('item_edit_qualities').addProp({propName: field.getValue(), propValue: valArray});
                field.reset();
            }
        }
    }
});
