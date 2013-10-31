/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/25/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.CreateItemController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.createItem.CreateItem'
    ],

    control:    {
        commitBtn:  {
            click: 'onParentItemCommit'
        },
        cancelBtn:  {
            click: 'onParentItemCancel'
        }
    },

    onParentItemCommit:function()   {

        if(this.getView().selectedParentUri)  {
            var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: 'Model Item',
                itemUri: this.getView().selectedParentUri,
                editMode: true,
                createMode:true,
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });
            Savanna.app.fireEvent('search:itemSelected', itemView);
        }   else    {
            console.log('no uri for parent item');
        }


        this.getView().close();
    },

    onParentItemCancel:function()   {
        this.getView().close();
    }
});

