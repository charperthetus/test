Ext.define('Savanna.components.tags.TagsController',{
    extend: 'Deft.mvc.ViewController',

    view: 'Savanna.components.tags.Tag',

    control: {
        view: {
            click: {
                element: 'closeEl',
                fn: 'onCloseButton'
            }
        }
    },
    init: function () {
        return this.callParent(arguments);
    },
    onTagClick: function(button) {
        this.getView().fireEvent('Tag:TagClicked', this.getView().text, this.getView());
    },
    onCloseButton: function (closeButton) {
        if (!this.getView().disabled) {
            this.getView().fireEvent('Tag:RemoveSearchTerm', this.getView().text, this.getView());            
        }
    }
});