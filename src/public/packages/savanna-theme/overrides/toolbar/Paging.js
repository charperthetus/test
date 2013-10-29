Ext.define('Savanna-Theme.toolbar.Paging', {
    override: 'Ext.toolbar.Paging',
    

    //<locale>
    /**
     * @cfg {String} displayMsg
     * The paging status message to display. Note that this string is
     * formatted using the braced numbers {0}-{2} as tokens that are replaced by the values for start, end and total
     * respectively. These tokens should be preserved when overriding this string if showing those values is desired.
     */
    displayMsg : '',
    //</locale>

    //<locale>
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found.
     */
    emptyMsg : '',
    //</locale>

    //<locale>
    /**
     * @cfg {String} beforePageText
     * The text displayed before the input item.
     */
    beforePageText : 'Page',
    //</locale>

    //<locale>
    /**
     * @cfg {String} afterPageText
     * Customizable piece of the default paging text. Note that this string is formatted using
     * {0} as a token that is replaced by the number of total pages. This token should be preserved when overriding this
     * string if showing the total page count is desired.
     */
    afterPageText : 'of {0}',
    //</locale>

    //<locale>
    /**
     * @cfg {String} firstText
     * The quicktip text displayed for the first page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    firstText : 'First Page',
    //</locale>

    //<locale>
    /**
     * @cfg {String} prevText
     * The quicktip text displayed for the previous page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    prevText : 'Previous Page',
    //</locale>

    //<locale>
    /**
     * @cfg {String} nextText
     * The quicktip text displayed for the next page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    nextText : 'Next Page',
    //</locale>

    //<locale>
    /**
     * @cfg {String} lastText
     * The quicktip text displayed for the last page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    lastText : 'Last Page',
    //</locale>

    //<locale>
    /**
     * @cfg {String} refreshText
     * The quicktip text displayed for the Refresh button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    refreshText : 'Refresh',
    //</locale>

    /**
     * @cfg {Number} inputItemWidth
     * The width in pixels of the input field used to display and change the current page number.
     */
    inputItemWidth : 20,

    /**
     * Gets the standard paging items in the toolbar
     * @private
     */
    getPagingItems: function() {
        var me = this;

        return [{
            itemId: 'first',
            tooltip: me.firstText,
            overflowText: me.firstText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
            disabled: true,
            handler: me.moveFirst,
            scope: me
        },{
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        },
        me.beforePageText,
        {
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            // mark it as not a field so the form will not catch it when getting fields
            isFormField: false,
            width: me.inputItemWidth,
            margins: '-1 2 3 2',
            listeners: {
                scope: me,
                keydown: me.onPagingKeyDown,
                blur: me.onPagingBlur
            }
        },{
            xtype: 'tbtext',
            itemId: 'afterTextItem',
            text: Ext.String.format(me.afterPageText, 1)
        }, {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        }, {
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: true,
            handler: me.moveLast,
            scope: me
        }, {
            itemId: 'refresh',
            tooltip: me.refreshText,
            overflowText: me.refreshText,
            iconCls: Ext.baseCSSPrefix + 'tbar-loading',
            handler: me.doRefresh,
            scope: me,
            hidden: true
        }];
    }
});
