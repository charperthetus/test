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

    onMouseDrop: function (e, part, data) {
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (obj.type === 'Item') {
                obj.type = 'ProcessItem';
                Savanna.process.utils.ProcessUtils.addNode(part, 'ProcessItem', obj.label, true, obj.uri);
            }
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