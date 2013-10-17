Ext.define('Savanna.process.utils.NodeEventHandlers', {
    singleton: true,

    requires: [
        'Savanna.process.utils.ProcessUtils'
    ],

    onMouseEnter: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleButtons(obj, true);
    },

    onMouseLeave: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleButtons(obj, false);
    },

    onMouseDrop: function (e, obj) {
        //todo
    },

    onMouseDragEnter: function (e, grp, prev) {
        //todo
    },

    onMouseDragLeave: function (e, grp, next) {
        //todo
    }




});