Ext.define('Savanna.process.utils.ProcessUtils', {
    singleton: true,

    requires: [
        'Ext.data.IdGenerator'
    ],

    getURI: function(category) {
        var uriType;
        switch(category) {
            case 'Decision':
                uriType = 'DecisionPoint';
                break;
            case 'Step':
                uriType = 'Process';
                break;
            case 'Action':
                uriType = 'ProcessAction';
                break;
            case 'Item':
            case 'FinalResult':
                uriType = 'ProcessItem';
                break;
            default:
                console.log('Unknown category for getURI: ', category);
        }
        var uuid = Ext.data.IdGenerator.get('uuid').generate();
        var uri = 'pub://' + uriType + '/' + uuid;
        return uri;
    },

    startTextEdit: function(diagram, nodeData) {
        diagram.clearSelection();
        var node = diagram.findNodeForData(nodeData);
        node.isSelected = true;
        diagram.commandHandler.editTextBlock(node.findObject('TEXT'));
    },

    toggleButtons: function(obj, show) {
        var panel = obj.findObject('BUTTONS');
        if (panel) {
            panel.opacity = show ? 1.0 : 0.0;
        }
    },

    addNode: function(obj, category, description, fromObj) {
        obj.diagram.startTransaction('addNode');
        var tobj = obj.panel.panel.part;
        var nodeData = {'category': category, 'text': description};
        nodeData.key = Savanna.process.utils.ProcessUtils.getURI(category);
        if (tobj.data.group) {
            nodeData.group = tobj.data.group;
        }

        obj.diagram.model.addNodeData(nodeData);

        var linkData;
        if (fromObj) {
            linkData = { from: tobj.data.key, to: nodeData.key };
        } else {
            linkData = { from: nodeData.key, to: tobj.data.key };
        }
        if (tobj.category == 'Decision') {
            linkData.visible = true;
        }
        obj.diagram.model.addLinkData(linkData);
        obj.diagram.commitTransaction('addNode');
        Savanna.process.utils.ProcessUtils.startTextEdit(obj.diagram, nodeData);
    },

    addDecision: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'Decision', 'Decision', true);
    },

    addInput: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'Item', 'Input', false);
    },

    addOutput: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'Item', 'Output', true);
    },

    addFinalResult: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'FinalResult', 'Result', true);
    },

    addEnd: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'End', 'End', true);
    },

    addStep: function(e, obj) {
        obj.diagram.startTransaction('addStep');
        var step = {'category': 'Step', 'text': 'Description', 'isGroup': true, 'isSubGraphExpanded': true};
        step.key = Savanna.process.utils.ProcessUtils.getURI(step.category);
        obj.diagram.model.addNodeData(step);
        var tobj = obj.panel.panel.part;
        var action = {'category': 'Action', 'text': 'Action', 'group': step.key};
        action.key = Savanna.process.utils.ProcessUtils.getURI(action.category);
        obj.diagram.model.addNodeData(action);

        newlink = { from: tobj.data.key, to: step.key };
        if (tobj.category == 'Decision') {
            newlink.visible = true;
        }
        obj.diagram.model.addLinkData(newlink);
        obj.diagram.commitTransaction('addStep');
        Savanna.process.utils.ProcessUtils.startTextEdit(obj.diagram, step);
    }




});
