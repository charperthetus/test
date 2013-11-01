
Ext.define('Savanna.component.layout.VBoxSlide', {
    extend: 'Ext.layout.container.VBox',
    alias: ['layout.vboxSlide'],
    alternateClassName: 'Savanna.component.layout.VBoxSlide',
    align: 'stretch',

    /**
     * @cfg {Boolean} fill
     * True to adjust the active item's height to fill the available space in the container, false to use the
     * item's current height, or auto height if not explicitly set.
     */
    fill : true,

    /**
     * @cfg {Boolean} autoWidth
     * Child Panels have their width actively managed to fit within the accordion's width.
     * @removed This config is ignored in ExtJS 4
     */

    /**
     * @cfg {Boolean} titleCollapse
     * True to allow expand/collapse of each contained panel by clicking anywhere on the title bar, false to allow
     * expand/collapse only when the toggle tool button is clicked.  When set to false,
     * {@link #hideCollapseTool} should be false also. An explicit {@link Ext.panel.Panel#titleCollapse} declared
     * on the panel will override this setting.
     */
    titleCollapse : true,

    /**
     * @cfg {Boolean} hideCollapseTool
     * True to hide the contained Panels' collapse/expand toggle buttons, false to display them.
     * When set to true, {@link #titleCollapse} is automatically set to true.
     */
    hideCollapseTool : false,

    /**
     * @cfg {Boolean} animate
     * True to slide the contained panels open and closed during expand/collapse using animation, false to open and
     * close directly with no animation. Note: The layout performs animated collapsing
     * and expanding, *not* the child Panels.
     */
    animate : true,

    /**
     * @cfg {Boolean} multi
     * Set to true to enable multiple accordion items to be open at once.
     */
    multi: false,

    defaultAnimatePolicy: {
        y: true,
        height: true
    },

    constructor: function() {
        var me = this;

        me.callParent(arguments);

        if (!me.multi && me.animate) {
            me.animatePolicy = Ext.apply({}, me.defaultAnimatePolicy);
        } else {
            me.animatePolicy = null;
        }
    }

});