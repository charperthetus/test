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

    onMouseDrop: function (e, obj) {
        //todo
    },

    onMouseDragEnter: function (e, grp, prev) {
        //todo
    },

    onMouseDragLeave: function (e, grp, next) {
        //todo
    },

    onSelectionChange: function(obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, false);
    }




});