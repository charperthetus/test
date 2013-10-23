/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/22/13
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.components.AutoCompleteBox', {
    extend: 'Savanna.itemView.view.components.boxSelect.BoxSelect',

    alias: 'widget.itemview_auto_complete_box',

    applyMultiselectItemMarkup: function() {
        var me = this,
            itemList = me.itemList,
            item;

        if (itemList) {
            while ((item = me.inputElCt.next()) != null) {
                item.remove();
            }
            me.inputElCt.insertHtml('afterEnd', me.getMultiSelectItemMarkup());
        }

        Ext.Function.defer(function() {
            if (me.picker && me.isExpanded) {
                me.alignPicker();
            }
            if (me.hasFocus) {
                me.inputElCt.scrollIntoView(me.listWrapper);
            }
        }, 15);
    }
});