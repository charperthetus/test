Ext.define('Savanna.process.utils.ProcessUtils', {
    singleton: true,

    requires: [
        'Ext.data.IdGenerator',
        'Ext.data.UuidGenerator'
    ],

    knownUriTypes: ['Start', 'DecisionPoint', 'ProcessModel', 'ProcessAction', 'ProcessItem', 'InternalGroup', 'MergePoint', 'ProcessLink', 'AltsGroup'],

    getCanvas:function(diagram) {
        var div = diagram.div;
        var parent = div.parentNode;
        return Ext.getCmp(parent.id);
    },

    getStore: function(diagram) {
        var canvas = this.getCanvas(diagram);
        var store = canvas.up('process_component').getController().store;
        store.getAt(0).nodeDataArrayStore.filterOnLoad = false;
        return store.getAt(0).nodeDataArrayStore;
    },

    getUUID: function() {
        var uuid = Ext.data.IdGenerator.get('uuid').generate();
        return 'x' + uuid;
    },

    getURI: function(category) {
        // by convention, category names are the same as the URI type
        if (this.knownUriTypes.indexOf(category) < 0) {
            console.log('Unknown uriType in getURI: ', category);
        }
        var uuid = this.getUUID();
        return uuid + '/' + category;
     },

    setRepresentsUri: function(data, classUri, diagram) {
        if (data && (data.category === 'ProcessAction' || data.category === 'ProcessItem'))
        {
            if (!classUri) {
                if (data.category === 'ProcessAction') {
                    classUri = 'lib%2EEventOntology%3AAct%2FModelItemXML';
                } else {
                    classUri = 'lib%2Esnap%3AObject%2FModelItemXML';
                }
            }

            data.representsClassUri = classUri;

            var me = this;
//
//            // make a real instance
//            Ext.Ajax.request({
//                url: SavannaConfig.itemViewUrl + encodeURI(classUri) + '/instance;jsessionid=' + Savanna.jsessionid,
//                method: 'GET',
//                success: function(response){
//                    var message = Ext.decode(response.responseText);
//                    data.representsItemUri = message.uri;
//                    me.getCanvas(diagram).fireEvent('itemInstanceCreated');
//                },
//                failure: function(response){
//                    console.log('Server Side Failure: ' + response.status);
//                }
//            });

            Ext.Ajax.request({
                url: SavannaConfig.itemViewUrl + encodeURI(classUri) + ';jsessionid=' + Savanna.jsessionid,
                method: 'GET',
                success: function(response){
                    var message = Ext.decode(response.responseText);
                    data.className = message.label;
                    data.classUri = message.uri;
                    data.classDescription = message.propertyGroups[0].values[4].values[0].value;
                    data.classPrimaryImage = message.propertyGroups[1].values[0].values.length > 0 ? message.propertyGroups[1].values[0].values[0].value : null;

                    var store = me.getStore(diagram);
                    var len = store.data.length;

                    for (var i= 0; i<len; i++) {
                        var storeData = store.getAt(i);
                        if (storeData.data.uri === data.uri) {
                            storeData.data.className = data.className;
                            storeData.data.classUri = data.classUri;
                            storeData.data.classDescription = data.classDescription;
                            storeData.data.classPrimaryImage = data.classPrimaryImage;

                            if (message.propertyGroups[3].values) {
                                storeData.propertyGroupsStore.getById('Properties').valuesStore.filterOnLoad = false;
                                storeData.propertyGroupsStore.getById('Properties').valuesStore.loadRawData(message.propertyGroups[3].values);

                                Ext.each(storeData.propertyGroupsStore.getById('Properties').valuesStore.data.items, function(prop) {
                                    Ext.each(prop.data.values, function(val) {
                                        val.editable = false;
                                    });

                                    storeData.propertyGroupsStore.getById('Properties').data.values.push(prop.data);
                                });
                            }

                            break;
                        }
                    }

                    me.getCanvas(diagram).fireEvent('itemLoaded');
                },
                failure: function(response){
                    console.log('Server Side Failure: ' + response.status);
                }
            });
        }

    },

    changeRepresentsUri: function(data, classUri, diagram) {
        if (data && classUri && (data.category === 'ProcessAction' || data.category === 'ProcessItem')) {
            data.representsClassUri = classUri;

//            var me = this;
//            // make a real instance
//            Ext.Ajax.request({
//                url: SavannaConfig.itemViewUrl + encodeURI(classUri) + '/instance/type;jsessionid=' + Savanna.jsessionid,
//                jsonData: classUri,
//                method: 'POST',
//                success: function(){
//                    // nothing to do
//                    me.getCanvas(diagram).fireEvent('itemInstanceCreated');
//                },
//                failure: function(response){
//                    console.log('changeRepresentsUri: Server Side Failure: ' + response.status);
//                }
//            });
            this.getCanvas(diagram).fireEvent('itemInstanceCreated');
        }
    },

    startTextEdit: function(diagram, nodeData) {
// Turn off auto starting text edit for now,
// since it occasionally leads to whole diagram lock ups.
// Some sort of timing issue perhaps?
//        diagram.clearSelection();
//        var node = diagram.findNodeForData(nodeData);
//        node.isSelected = true;
//        diagram.commandHandler.editTextBlock(node.findObject('TEXT'));
    },

    toggleGadgets: function(obj, show) {

        //always show for selected objects
        if (obj.isSelected) {
            show = true;
        }

        // never show for descendants of an Action Node
        var parent = obj.findTreeParentNode();
        if (parent && parent.category == 'InternalGroup') {
            show = false;
        }

        //never show for nodes contained in an AltsGroup
        var group = obj.containingGroup;
        if (group && group.category == 'AltsGroup') {
            show = false;
        }

        var names = ['LinkGadget','StepGadget','DecisionGadget'];
        for (var i = 0; i < names.length; i++) {
            var gadget = obj.findObject(names[i]);
            if (gadget) {
                gadget.opacity = show ? 1.0 : 0.0;
            }
        }
    },

    addNode: function(obj, category, description, classUri, linkType) {
        var diagram = obj.diagram;
        diagram.startTransaction('addNode');
        var clickedNode = obj.part;
        var nodeData = this.populateDefaultNodeJson();
        nodeData.category = category;
        nodeData.label = description;
        nodeData.uri = this.getURI(category);
        this.setRepresentsUri(nodeData, classUri, diagram);

        if (clickedNode.data.group) {
            nodeData.group = clickedNode.data.group;
        }

        diagram.model.addNodeData(nodeData);
        this.getStore(diagram).loadRawData(nodeData, true);

        var linkData = { category: linkType, from: clickedNode.data.uri, to: nodeData.uri };
        if (clickedNode.category == 'DecisionPoint') {
            linkData.visible = true;
        }
        linkData.uri = this.getURI('ProcessLink');
        diagram.model.addLinkData(linkData);

        diagram.commitTransaction('addNode');
        this.startTextEdit(diagram, nodeData);
    },

    addAlternate: function(obj, label, classUri) {
        var diagram = obj.diagram;
        diagram.startTransaction('addAlternate');
        var altsGroup = obj.part;
        var nodeData = this.populateDefaultNodeJson();
        nodeData.category = 'ProcessItem';
        nodeData.label = label;
        nodeData.group = altsGroup.data.uri;
        nodeData.uri = this.getURI(nodeData.category);
        this.setRepresentsUri(nodeData, classUri, diagram);
        diagram.model.addNodeData(nodeData);
        this.getStore(diagram).loadRawData(nodeData, true);
        diagram.commitTransaction('addAlternate');
        this.startTextEdit(diagram, nodeData);
    },

    addDecision: function(e, obj) {
        this.addNode(obj, 'DecisionPoint', 'Decision', null, 'ProcessLink');
    },

    addStepPart: function(obj, category, label, linkType) {
        var diagram = obj.diagram;
        diagram.startTransaction('addStepPart');
        var actionGroup = obj.part;
        var stepGroup = actionGroup.containingGroup;
        var nodeData = this.populateDefaultNodeJson();
        nodeData.category = category;
        nodeData.label = label;
        nodeData.group = stepGroup.data.uri;
        nodeData.isOptional = false;
        nodeData.uri = this.getURI(nodeData.category);
        this.setRepresentsUri(nodeData, null, diagram);

        diagram.model.addNodeData(nodeData);
        this.getStore(diagram).loadRawData(nodeData, true);

        var linkData = {  category: linkType, from: actionGroup.data.uri, to: nodeData.uri };
        linkData.uri = this.getURI('ProcessLink');
        diagram.model.addLinkData(linkData);
        diagram.commitTransaction('addStepPart');
        this.startTextEdit(diagram, nodeData);
    },

    addInput: function(e, obj) {
        this.addStepPart(obj, 'ProcessItem', 'Input', 'InputLink');
    },

    addParticipant: function(e, obj) {
        this.addStepPart(obj, 'ProcessItem', 'Participant', 'ToolLink');
    },

    addByproduct: function(e, obj) {
        this.addStepPart(obj, 'ProcessItem', 'Byproduct', 'ByproductLink');
    },

    addResult: function(e, obj) {
        var category = 'ProcessItem';
        var label = 'Result';
        var linkType = 'OutputLink';
        var diagram = obj.diagram;
        diagram.startTransaction('addResult');
        var actionGroup = obj.part;
        var stepGroup = actionGroup.containingGroup;
        var nodeData = this.populateDefaultNodeJson();
        nodeData.category = category;
        nodeData.label = label;
        nodeData.uri = this.getURI(nodeData.category);
        this.setRepresentsUri(nodeData, null, diagram);

        diagram.model.addNodeData(nodeData);
        this.getStore(diagram).loadRawData(nodeData, true);

        var linkData = {  category: linkType, from: stepGroup.data.uri, to: nodeData.uri };
        linkData.uri = this.getURI('ProcessLink');
        diagram.model.addLinkData(linkData);
        diagram.commitTransaction('addResult');
        this.startTextEdit(diagram, nodeData);
    },

    addAction: function(obj, label, classUri) {
        var diagram = obj.diagram;
        diagram.startTransaction('addAction');

        var actionsGroup = obj.part;
        var nodeData = this.populateDefaultNodeJson();
        nodeData.category = 'ProcessAction';
        nodeData.label = label;
        nodeData.group = actionsGroup.data.uri;
        nodeData.uri = this.getURI(nodeData.category);
        this.setRepresentsUri(nodeData, classUri, diagram);
        diagram.model.addNodeData(nodeData);
        this.getStore(diagram).loadRawData(nodeData, true);

        diagram.commitTransaction('addAction');
        this.startTextEdit(diagram, nodeData);

    },

    addStep: function(e, obj) {
        var diagram = obj.diagram;
        diagram.startTransaction('addStep');

        var step = this.populateDefaultNodeJson();
        step.category = 'ProcessModel';
        step.label = 'Untitled Step';
        step.isGroup = true;
        step.isSubGraphExpanded = true;
        step.isOptional = false;
        step.uri = this.getURI(step.category);
        diagram.model.addNodeData(step);
        this.getStore(diagram).loadRawData(step, true);

        var actionsGroup = this.populateDefaultNodeJson();
        actionsGroup.category = 'InternalGroup';
        actionsGroup.isGroup = true;
        actionsGroup.group = step.uri;
        actionsGroup.uri = this.getURI(actionsGroup.category);
        diagram.model.addNodeData(actionsGroup);
        this.getStore(diagram).loadRawData(actionsGroup, true);

        var action = this.populateDefaultNodeJson();
        action.category = 'ProcessAction';
        action.label = 'Action';
        action.group = actionsGroup.uri;
        action.uri = this.getURI(action.category);
        this.setRepresentsUri(action, null, diagram);
        diagram.model.addNodeData(action);
        this.getStore(diagram).loadRawData(action, true);

        var clickedNode = obj.part;
        var newLink = {from: clickedNode.data.uri, to: step.uri };
        if (clickedNode.category == 'DecisionPoint') {
            newLink.visible = true;
            newLink.category = 'ProcessLink';
        } else {
            newLink.category = 'InputLink';
        }
        newLink.uri = this.getURI('ProcessLink');
        diagram.model.addLinkData(newLink);
        diagram.commitTransaction('addStep');
        this.startTextEdit(diagram, step);
    },

    addMerge: function(diagram) {
        if (diagram.selection.count < 2){
            Ext.Msg.show({
                title: 'Join Error',
                msg: 'You can only link items that have no children.',
                buttons: Ext.Msg.OK
            });
            return;
        }

        var category = null,
            iterator = diagram.selection.iterator,
            node = null;

        while (iterator.next()) {
            node = iterator.value;

            if (!category) {
                category = node.data.category;
            }

            if (node.data.category != category) {
                Ext.Msg.show({
                    title: 'Join Error',
                    msg: 'You can only merge items of the same type.',
                    buttons: Ext.Msg.OK
                });
                return;

            }

            if (node.containingGroup) {
                Ext.Msg.show({
                    title: 'Join Error',
                    msg: 'You can only merge items that are not inside a step.',
                    buttons: Ext.Msg.OK
                });
                return;
            }

            if (node.data.category == 'ProcessItem' && node.findLinksOutOf().count > 0) {
                Ext.Msg.show({
                    title: 'Join Error',
                    msg: 'You can only link items that have no children.',
                    buttons: Ext.Msg.OK
                });
                return;
            }
        }

        diagram.startTransaction('addMerge');

        var mergeNode = this.populateDefaultNodeJson();
        mergeNode.category = 'MergePoint';
        mergeNode.label = '';
        mergeNode.uri = this.getURI(mergeNode.category);
        diagram.model.addNodeData(mergeNode);
        this.getStore(diagram).loadRawData(mergeNode, true);

        var prevNodeNames = [];
        var outputNode;
        iterator = diagram.selection.iterator;
        while (iterator.next()) {
            node = iterator.value;
            var nodeText = node.data.label;
            var newLink = { category: 'ProcessLink', from: node.data.uri, to: mergeNode.uri };
            newLink.uri = this.getURI('ProcessLink');
            diagram.model.addLinkData(newLink);

            if (!(node instanceof go.Group)){
                if (!Ext.Array.contains(prevNodeNames, nodeText)) {
                    Ext.Array.include(prevNodeNames, nodeText);

                    outputNode = this.populateDefaultNodeJson();
                    outputNode.category = 'ProcessItem';
                    outputNode.label = nodeText;
                    outputNode.uri = this.getURI(outputNode.category);
                    diagram.model.addNodeData(outputNode);
                    this.getStore(diagram).loadRawData(outputNode, true);

                    var otherLink = { category: 'ProcessLink', from: mergeNode.uri, to: outputNode.uri };
                    otherLink.uri = this.getURI('ProcessLink');
                    diagram.model.addLinkData(otherLink);
                }
            }
        }

        diagram.commitTransaction('addMerge');

        diagram.clearSelection();
        var selNode;
        if (outputNode) {
            selNode = diagram.findNodeForData(outputNode);
        } else {
            selNode = diagram.findNodeForData(mergeNode);
        }
        selNode.isSelected = true;
    },

    toggleBackground: function(obj) {
        var bodyElt = obj.findObject('BODY');
        if (bodyElt) {
            if (obj.isSelected) {
                bodyElt.background = null;
            } else {
                bodyElt.background = 'transparent';
            }
        }
    },

    addAlts: function(diagram) {
        if (diagram.selection.count != 1){
            Ext.Msg.show({
                title: 'Alternates Error',
                msg: 'You can only add alternates to one item at a time.',
                buttons: Ext.Msg.OK
            });
            return;
        }

        var selItem = diagram.selection.first();
        if (selItem.category != 'ProcessItem') {
            Ext.Msg.show({
                title: 'Alternates Error',
                msg: 'You can only add alternates to a selected process.', //todo: Still get final wording for error, best guess by Larry 11/8
                buttons: Ext.Msg.OK
            });
            return;
        }

        diagram.startTransaction('addAlts');

        var altsGroupData = this.populateDefaultNodeJson();
        altsGroupData.category = 'AltsGroup';
        altsGroupData.label = 'Alternates';
        altsGroupData.isGroup = true;
        if (selItem.containingGroup) {
            altsGroupData.group = selItem.containingGroup.data.uri;
        }
        altsGroupData.uri = this.getURI(altsGroupData.category);
        diagram.model.addNodeData(altsGroupData);
        this.getStore(diagram).loadRawData(altsGroupData, true);

        var altsGroup = diagram.findNodeForData(altsGroupData);

        selItem.containingGroup = altsGroup;

        // fix up the links.  do in two passes to avoid breaking the iterator
        var linkIter = selItem.findLinksInto();
        var link;
        var links = [];
        while (linkIter.next()) {
            link = linkIter.value;
            links.push(link);
        }

        while (link = links.pop()) {
            link.toNode = altsGroup;
        }

        linkIter = selItem.findLinksOutOf();
        while (linkIter.next()) {
            link = linkIter.value;
            links.push(link);
        }

        while (link = links.pop()) {
            link.fromNode = altsGroup;
        }

        diagram.commitTransaction('addAlts');

        this.startTextEdit(diagram, altsGroupData);
    },

    onNodeMouseDrop: function(obj, data, linkType) {
        var me = this;
        if (data) {
            data.records.forEach(function(rec) {
                var dropObj = rec.data;
                if (dropObj.type === 'Item') {
                    me.addNode(obj, 'ProcessItem', dropObj.label, dropObj.uri, linkType);
                }
            });
        }
    },

    onActionMouseDrop: function (obj, data) {
        var me = this;
        if (data) {
            data.records.forEach(function(rec) {
                var dropObj = rec.data;
                if (dropObj.type === 'Action') {
                    me.addAction(obj, dropObj.label, dropObj.uri);
                }
            });
        }
    },

    onAltsMouseDrop: function(obj, data) {
        var me = this;
        if (data) {
            data.records.forEach(function(rec) {
                var dropObj = rec.data;
                if (dropObj.type === 'Item') {
                    me.addAlternate(obj, dropObj.label, dropObj.uri);
                }
            });
        }

    },

    optionalCategories: ['ProcessModel', 'ProcessAction', 'ProcessItem'],
    toggleOptional: function(diagram) {
        var firstObj = diagram.selection.first();
        var optional = !firstObj.data.isOptional;

        diagram.startTransaction('toggleOptional');
        var iterator = diagram.selection.iterator;
        while (iterator.next()) {
            var obj = iterator.value;
            if (this.optionalCategories.indexOf(obj.category) >= 0) {
                obj.data.isOptional = optional;
                obj.updateTargetBindings('isOptional');
            }
        }
        diagram.commitTransaction('toggleOptional');
    },

    toggleExpanded: function(diagram, expand) {
        diagram.startTransaction('toggleExpanded');
        var iterator = diagram.nodes;
        while ( iterator.next() ){
            var node = iterator.value;
            if (node instanceof go.Group) {
                node.isSubGraphExpanded = expand;
            }
        }
        diagram.commitTransaction('toggleExpanded');
    },

    populateDefaultNodeJson: function() {
        return {
            label: '',
            propertyGroups: [
                {
                    label: 'Header',
                    values: [
                        {
                            label: 'Description',
                            values: []
                        }
                    ]
                },
                {
                    label: 'Images',
                    values: [
                        {
                            label: 'Images',
                            values: []
                        }
                    ]
                },
                {
                    label: 'Related Items',
                    values: [
                        {
                            label: 'has role',
                            values: []
                        }
                    ]
                },
                {
                    label: 'Properties',
                    values: []
                },
                {
                     label: 'Annotations',
                     values: [
                         {
                             label: 'Quantity',
                             values: []
                         }
                     ]
                 },
                 {
                      label: 'Sources',
                      values: [
                          {
                              label: 'Source Document',
                              values: []
                          }
                      ]
                  }
             ]

        };

    }

});
