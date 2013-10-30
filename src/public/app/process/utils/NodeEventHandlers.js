Ext.define('Savanna.process.utils.NodeEventHandlers', {
    singleton: true,

    requires: [
        'Savanna.process.utils.ProcessUtils'
    ],

    onMouseEnter: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, true);
    },

    onMouseLeave: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, false);
    },

    onMouseDrop: function (e, src, data, diagram, part) {
        data.records.forEach(function(rec) {
            var obj = rec.data,
                newNode = {
                    part: part,
                    diagram: diagram
                };
            //todo: this really should happen when the drag is initiated
            if (obj.type === "Item") {
                obj.type = "ProcessItem";
            } else if (obj.type === "Action") {
                obj.type = "ProcessAction";
            }
            Savanna.process.utils.ProcessUtils.addNode(newNode, obj.type, obj.label, true, obj.uri);
        });
    },

    onMouseDragEnter: function (e, grp, prev) {
        //todo
    },

    onMouseDragLeave: function (e, grp, next) {
        //todo
    },

    onSelectionChange: function(obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, false);
        Savanna.process.utils.ProcessUtils.toggleBackground(obj);
    }




});