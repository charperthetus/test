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
    store: [],

    currentIndex: null,

    data: {},

    scroll: 'vertical',

    //floating: true,

    toFrontOnShow: false,

    hidden: true,

    header: false,

    defaults: {
        // applied to each contained panel
        border: false
    },

    tpl: ['<div style="position: relative" >',
        '<div id="hoverDivTop" style=" right: 0;  top: 5; position: absolute;" ><button id="popupTestDiv" class="button popUpThumb">TN</button><button class="button popUpAddUnsorted">AU</button><button class="button popUpOpen">OF</button></div>',
        '<table>',
        '<tr><td colspan="2" class="map-popup-title"><strong>{[this.parseTitle(values.title)]}</strong></td></tr>',
        '<tr><td colspan="2" class="map-popup-text">Location: {name}</td></tr>',
        '<tr><td colspan="2" class="map-popup-text">Mentions: {count}</td></tr>',
        '<td class="map-popup-text">({composite}) - {[this.parseDate(new Date(values.publishedDate))]} - {fileType} - {previewString}</td>',
        '</table>',
        '</div>',
        '<div id="hoverDivBottom" style=" right: 0;  bottom: 5; position: absolute;" ><button class="buttonpopUpPreview">Preview</button></div>',
        {
            parseDate: function (v) {
                return Ext.Date.format(new Date(v), 'F d, Y');
            }
        },
        {
            parseTitle: function (v) {
                var title =  (v.length > 40) ? v.substring(0,40) + "..." : v;
                return title;
            }
        }
    ],


    bbar: {
        itemId:'popuptoolbar',
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

    refresh:function(){
        var renderSelector = Ext.query('button.popUpPreview');
        for(var i in renderSelector){
            Ext.create('Ext.button.Button',{
                renderTo:renderSelector[i]
            });
        }

    },

    onRender: function() {
        this.callParent(arguments);
        Ext.DomHelper.append(this.getEl().dom, '<div class="popUpAnchor"></div>');


    }
});


