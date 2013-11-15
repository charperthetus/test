/**
 * Created with IntelliJ IDEA.
 * Date: 10/25/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.controller.ProcessCategoryWindowController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.process.view.metadata.ProcessCategoryWindow'
    ],

    control: {
        view: true,
        commitBtn: {
            click: 'onProcessCategoryCommit'
        },
        cancelBtn: {
            click: 'onProcessCategoryCancel'
        }
    },

    onProcessCategoryCommit: function () {
        this.getView().viewer.fireEvent('processCategorySelected', {uri: this.getView().selectedCategoryUri, label: this.getView().selectedCategoryLabel});
        this.getView().close();
    },

    onProcessCategoryCancel: function () {
        this.getView().close();
    }


});