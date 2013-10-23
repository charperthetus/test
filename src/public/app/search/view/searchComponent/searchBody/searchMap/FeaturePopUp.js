/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 10/14/13
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.searchComponent.searchBody.searchMap.FeaturePopUp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_featurepopup',

    height: 175,

    width: 375,

    style: {
        'overflow': "visible"
    },

    scroll: 'vertical',

    floating: true,

    toFrontOnShow: false,

    hidden: true,

    header: false,

    layout: 'card',

    defaults: {
        // applied to each contained panel
        border: false
    },

    bbar: {
        height: 35,
        items: [

        {
            id: 'mapResultPrev',
            text: 'Back',
            direction: 'prev',
            disabled: true
        },
        '->',
        {
            id: 'mapResultNext',
            direction: 'next',
            text: 'Next',
            disabled: true
        }
    ]},

    onRender: function() {
        this.callParent(arguments);
        Ext.DomHelper.append(this.getEl().dom, '<div class="popUpAnchor"></div>');
    }
});


