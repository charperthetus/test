Ext.define('Savanna.itemView.view.header.DisplayLabel', {
    extend: 'Ext.Component',

    alias: 'widget.itemview_displaylabel',

    tpl: [
        '<h1>{displayLabel}</h1>'
    ],

    data: { displayLabel: '' } // default data
});
