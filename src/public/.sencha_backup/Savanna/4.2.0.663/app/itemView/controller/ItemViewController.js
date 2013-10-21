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
            click: 'onNavLeft'
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

            var processComponent = this.getView().queryById('relatedItemProcesses');
            processComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
            processComponent.reconfigure(record[0].kvPairGroupsStore.getAt(0).pairsStore);

            var relatedItemView = this.getView().queryById('relatedItems'),
                me = this;

            Ext.each(record[0].propertyGroupsStore.getAt(2).valuesStore.data.items, function (relatedItemsGroup) {

                var grid = Ext.create('Ext.grid.Panel', {
                    store: relatedItemsGroup.valuesStore,
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            tpl: Ext.create('Ext.XTemplate',
                                '<div id="relatedItem">{label}</div>'
                            ),
                            text: relatedItemsGroup.get('label'),
                            flex: 1,
                            sortable: false
                        }
                    ],
                    listeners: {
                        itemclick: me.onRelatedItemClick
                    }
                });

                relatedItemView.add(grid);

            });
    },

    onRelatedItemClick: function (grid, record, item, index, e, eOpts) {

        if (e.target.id == "relatedItem") {

            var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: record.get('label'),
                itemUri: record.get('uri'),
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });

            Savanna.app.fireEvent('search:itemSelected', itemView);

        }
    },


    setupImages: function (data, view) {
        var me = this,
            thumbnail_list = view.queryById('thumbnail_list');

        Ext.Array.each(data.observables, function (image, index) {
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
    onNavLeft: function () {
        var gallery = Ext.ComponentQuery.query('#thumbnail_list')[0];
        gallery.scrollBy(-450, 0, true);
    },

    // Scroll Right Button
    onNavRight: function () {
        var gallery = Ext.ComponentQuery.query('#thumbnail_list')[0];
        gallery.scrollBy(450, 0, true);
    },

    // Selecting an image to expand
    onChangeImage: function (btn, image) {
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
