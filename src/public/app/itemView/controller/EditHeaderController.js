/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 8:25 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.EditHeaderController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.header.EditHeader',
        'Savanna.itemView.view.header.AddIntendedUses'
    ],

    control: {
        intendedUseChooserBtn: {
            click: 'onIntendedUsesSelect'
        }
    },

    constructor: function (options) {

    },

    init: function (app) {
        return this.callParent(arguments);
    },

    onIntendedUsesSelect:function() {
        Ext.create('Savanna.itemView.view.header.AddIntendedUses', {
            width: 400,
            height: 300
        });
    }
});