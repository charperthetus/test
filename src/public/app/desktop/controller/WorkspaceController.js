Ext.define('Savanna.desktop.controller.WorkspaceController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.desktop.view.SavannaTabPanel',
        'Savanna.process.view.ProcessEditorComponent',
        'Savanna.metadata.view.Details',
        'Savanna.itemView.view.createItem.CreateItem'
    ],

    control: {
        desktopTabPanel: {
            createprocess: 'createProcess',
            createitem: 'createItem',
            tabchange: 'onTabChange'
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

    onTabChange: function(tabpanel, newcard) {
        newcard.doLayout();
    },

    onOpen: function(event, otherParams){
        var component = ComponentManager.getComponentForType(event.type, event.uri, event.label, otherParams),
        tabPanel = this.getDesktopTabPanel();
        for (var i=0 ; i < tabPanel.items.getCount() ; i++  ){
            var classPanel = tabPanel.items.get(i);
            if (classPanel && classPanel.hasOwnProperty('itemUri') && (classPanel.getItemUri() === encodeURI(event.uri) || classPanel.getItemUri() === event.uri)){
                return;
            }
        }
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

    onClose: function(tab) {
        this.getDesktopTabPanel().remove(tab);
    },

    onCreateProcess: function(){
        this.createProcess(this.getDesktopTabPanel());
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
    destroy: function() {
        EventHub.un('open', this.onOpen, this);
        EventHub.un('close', this.onClose, this);

        EventHub.un('createitem', this.createItem, this);
        EventHub.un('createprocess', this.onCreateProcess, this);

    }
});
