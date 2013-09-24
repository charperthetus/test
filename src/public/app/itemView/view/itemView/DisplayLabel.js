Ext.define('Savanna.itemView.view.itemView.DisplayLabel', {
    extend: 'Ext.Component',

    alias: 'widget.itemview_displaylabel',

    tpl: [
        '<h2>{displayLabel}</h2>'
    ],

    margin: 10,

    data: { displayLabel: '' } // default data
});
