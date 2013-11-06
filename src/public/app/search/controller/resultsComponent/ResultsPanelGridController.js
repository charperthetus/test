/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPanelGridController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        view: {
            itemdblclick: 'onItemDoubleClick',
            itemclick: 'onItemClick',
            itemmouseenter: 'onMouseEnter',
            itemmouseleave: 'onMouseLeave'
        }
    },
    onItemDoubleClick: function (view, rec, node, index, e) {
        this.fireOpen(rec.data.uri, rec.data.contentType, rec.data.title);
    },
    onMouseEnter: function (view, rec, node) {    // other parameters: , index, e, options
        if (node) {
            node.querySelector('#hoverDiv').style.visibility = 'visible';
        }
    },
    onItemClick: function (view, rec, node, index, e) {  //other parameter options
        //TODO - the way of getting this button is wrong, refactor
        if (e && e.target && e.target.className.indexOf('openButtonClass') != -1) {
            this.fireOpen(rec.data.uri, rec.data.contentType, rec.data.title);
        }
    },
    onMouseLeave: function (view, rec, node) {  // other parameters: , index, e, options
        if (node) {
            node.querySelector('#hoverDiv').style.visibility = 'hidden';
        }
    },
    fireOpen: function(uri, type, label){
        EventHub.fireEvent('open', {uri: uri, type: type, label: label});
    }

});