Ext.define('Savanna.desktop.controller.WorkspaceController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.desktop.view.SavannaTabPanel',
        'Savanna.map.view.MapComponent',
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
            createprocess: 'createProcess',
            createitem: 'createItem',
            createmap: 'createMap',
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
                createprocess: 'createProcess',
                createitem: 'createItem',
                createmap: 'createMap',
                singleview: 'onSingleView',
                splitview: 'onSplitView',
                remove: 'onRemove'
            }
        }
    },

    init: function() {
        EventHub.on('open', this.onOpen, this);
        EventHub.on('close', this.onClose, this);

        //TODO - This needs to be changed to handle generic new items instead of listening for each type
        EventHub.on('createitem', this.createItem, this);
        EventHub.on('createprocess', this.onCreateProcess, this);

        return this.callParent(arguments);
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

    onOpen: function(event, otherParams){
        var component = ComponentManager.getComponentForType(event.type, event.uri, event.label, otherParams),
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

    createMap: function(tabpanel) {
        var map = Ext.create('Savanna.map.view.MapComponent', {
            title: 'Untitled Map',
            closable: true,
            tabConfig: {
                ui: 'dark'
            }
        });

        var tab = tabpanel.add(map);
        tabpanel.doLayout();
        tabpanel.setActiveTab(tab);
    },

    createItem: function() {
        Ext.create('Savanna.itemView.view.createItem.CreateItem', {
            width: 850,
            height: 500
        });
    },

    onClose: function(tab) {
        var mtp = this.getMaintabpanel();
        if (tab.isDescendantOf(mtp)){
            mtp.remove(tab);
        }else{
            this.getSecondarytabpanel().remove(tab);
        }
    },

    onCreateProcess: function(){
        this.createProcess(this.getMaintabpanel());
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
    },
    destroy: function() {
        EventHub.un('open', this.onOpen, this);
        EventHub.un('close', this.onClose, this);

        EventHub.un('createitem', this.createItem, this);
        EventHub.un('createprocess', this.onCreateProcess, this);

    }
});
