/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/5/13
 * Time: 10:59 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.spacemanager.controller.SpaceManagerController', {
    extend: 'Ext.app.Controller',
    views: [
        'Savanna.spacemanager.view.SpaceManagerComponent'
    ],
    stores: [
        'Savanna.spacemanager.store.Spaces'
    ],

    init: function() {

        //todo: create a new empty space and put it in edit mode
        //todo: the empty space is not added to the store until the user saves it
        //todo: anytime the "create space" button is pressed we go into this state again


        var myStore = this.getStore('Savanna.spacemanager.store.Spaces');
        console.log(myStore);
    }
});
