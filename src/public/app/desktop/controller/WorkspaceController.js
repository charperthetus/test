Ext.define('Savanna.desktop.controller.WorkspaceController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.desktop.view.SavannaTabPanel',
        'Savanna.process.view.ProcessEditorComponent',
        'Savanna.metadata.view.Details',
        'Savanna.itemView.view.createItem.CreateItem'
    ],

    control: {
        singleviewbutton: {
            toggle: 'onSingleViewToggle'
        },
        splitviewbutton: {
            toggle: 'onSplitViewToggle'
        },
        maintabpanel: {
            beforetabclosemenu: 'onBeforeTabCloseMenu',
            createdetails: 'createDetails',
            createprocess: 'createProcess',
            createitem: 'createItem',
            singleview: 'onSingleView',
            splitview: 'onSplitView',
            tabchange: 'onTabChange'
        },
        secondarytabpanel: {
            // The secondary tab panel is dynamically added and removed from the view.
            // Setting the live property to true allows deft to add and remove listeners from this object
            // when it is added or removed from the view.
            live: true,
            listeners: {
                beforetabclosemenu: 'onBeforeTabCloseMenu',
                createdetails: 'createDetails',
                createprocess: 'createProcess',
                createitem: 'createItem',
                singleview: 'onSingleView',
                splitview: 'onSplitView',
                remove: 'onRemove'
            }
        }
    },

    init: function() {
        //TODO - this is temporary until open is fully working
        Savanna.app.on('search:itemselected', this.showItemView, this);

        EventHub.on('open', this.onOpen, this);
        Savanna.app.on('itemview:createitem', this.createItem, this);
        return this.callParent(arguments);
    },

    //TODO - this is temporary until open is fully working
    showItemView: function (itemView) {
        this.getMaintabpanel().add(itemView);
        this.getMaintabpanel().setActiveTab(itemView)
    },

    setupSecondaryTabPanel: function() {
        return Ext.create('Savanna.desktop.view.SavannaTabPanel', {
            cls:'secondPanel',
            itemId: 'secondarytabpanel',
            config: {
                view: 'split'
            },
            height: '100%',
            flex: 2
        });
    },

    setSingleViewMode: function() {
        this.getMaintabpanel().config.view = 'single';

        var items = this.getSecondarytabpanel().items;
        while(items.length) {
            this.getMaintabpanel().add(items.getAt(0));
        }
        this.getView().remove(this.getSecondarytabpanel(), true);
        this.getMaintabpanel().doLayout();
    },

    setSplitViewMode: function() {
        var maintabpanel = this.getMaintabpanel();
        maintabpanel.config.view = 'split';

        var secondaryTabPanel = this.setupSecondaryTabPanel();
        this.getView().add(secondaryTabPanel);

        var items = maintabpanel.items;
        var idx = items.indexOf(maintabpanel.getActiveTab()) + 1;

        while(items.getAt(idx)) {
            secondaryTabPanel.add(items.getAt(idx));
        }

        if(secondaryTabPanel.items.getCount() > 0) {
            var activeTab = secondaryTabPanel.setActiveTab(0);
            activeTab.getEl().show();
            activeTab.doLayout();
        }
    },

    onSingleViewToggle: function(button) {
        if(button.pressed) {
            this.setSingleViewMode();
        }
    },

    onSplitViewToggle: function(button) {
        if(button.pressed) {
            this.setSplitViewMode();
        }
    },

    onSingleView: function() {
        this.getSingleviewbutton().toggle();
    },

    onSplitView: function() {
        this.getSplitviewbutton().toggle();
    },

    onTabChange: function(tabpanel, newcard) {
        newcard.doLayout();
    },

    onRemove: function(tabpanel, component) {
        if(tabpanel.items.getCount() < 1) {
            this.getSingleviewbutton().toggle();
        }
    },

    onOpen: function(event){
        var component = ComponentManager.getComponentForType(event.type, event.uri, event.label),
            tabPanel = this.getMaintabpanel();
        if (component){
            component.closable = true;
            component.tabConfig = {
                ui: 'dark'
            }
            var tab = tabPanel.add(component);
            tabPanel.doLayout();
            tabPanel.setActiveTab(tab);
        }else{
            //TODO - What should I do here?
        }
    },

    createItem: function() {

        Ext.create('Savanna.itemView.view.createItem.CreateItem', {
            width: 850,
            height: 500
        });
    },

    createProcess: function(tabpanel) {
        var process = Ext.create('Savanna.process.view.ProcessEditorComponent', {
            title: 'Untitled Process',
            closable: true,
            tabConfig: {
                ui: 'dark'
            }
        });

        var tab = tabpanel.add(process);
        tabpanel.doLayout();
        tabpanel.setActiveTab(tab);
    },

    createDetails: function(tabpanel) {
        var details = Ext.create('Savanna.metadata.view.Details', {
            title: 'Untitled Details',
            //itemURI: 'SolrJdbc%252FRich%252F061aedc6-d88c-497e-81dc-77d809b3262c',
            //itemURI: 'SolrJdbc%252FRich%252Fca1035f5-8ede-4415-ab75-e58956121819',
            //itemURI: 'SolrJdbc%252FRich%252F2fa25cdf-9aab-471f-85b6-5359c0cd0dfd',
            itemURI: 'SolrJdbc%252FText%252F9d62ad60-f453-4215-b8bc-c4c1398b84a4',
            closable: true,
            tabConfig: {
                ui: 'dark'
            }
        });
        var tab = tabpanel.add(details);
        tabpanel.doLayout();
        tabpanel.setActiveTab(tab);
    },

    onBeforeTabCloseMenu: function(tabpanel, menu) {
        var view = tabpanel.config.view;
        if(view == 'single') {
            menu.child('*[text="single view"]').hide();
            menu.child('*[text="split view"]').show();
        }
        else {
            menu.child('*[text="single view"]').show();
            menu.child('*[text="split view"]').hide();
        }
    }
});
