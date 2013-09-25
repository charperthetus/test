/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 9/19/13
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.searchComponent.searchBody.searchMap.SearchForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchform',

    requires: [
        'Savanna.search.store.SearchLocation'
    ],

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store: 'Savanna.search.store.SearchLocation',


    overflowY: 'scroll',
    draggable: true,
    resizable: true,
    floating: true,
    closable:true,
    layout: 'vbox',
    height: 400,
    width: 300,


    tbar: [
        {
            xtype: 'label',
            itemId: 'numResults',
            text: ''
        }
    ],

    searchParam: null,

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    onStoreLoad: function() {
        this.store.each(function (record) {
            var label = Ext.create('Ext.panel.Panel', {

                viewBox: record.get('viewBox'),

                layout: 'vbox',

                items: [
                    {
                        xtype: 'label',
                        width: '100%',
                        text: record.get('name')
                    },
                    {
                        xtype: 'label',
                        width: '100%',
                        text: 'Loc: ' + record.get('administrativeNames').toString().replace(/,/g, ', ')
                    },
                    {
                        xtype: 'label',
                        width: '100%',
                        text: 'Type: ' + record.get('locType')
                    },
                    {
                        xtype: 'label',
                        width: '100%',
                        text: 'Pop: ' + record.get('population')
                    }
                ],

                lbar: [
                    {
                        xtype: 'button',
                        itemId: 'zoomToLocationButton',
                        glyph: 61806

                    }
                ],
                width: '100%',
                height: 70
            });
            this.add(label);
        }, this);
        this.query('#numResults')[0].setText(this.store.totalCount + ' Results');
    },

    close: function() {
        this.hide();
    }


});