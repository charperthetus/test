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

    /*
     *  On tag click
     *
     *  Fires an event when the tag itself is clicked. Allows other controllers to capture that event
     *
     *  @param {button} The tag being cliked.
     *  @retrun {Event} 'Tag:TagClicked' event with the text and the view passed as arguments. 
     */
    onTagClick: function() {
        this.getView().fireEvent('Tag:TagClicked', this.getView().text, this.getView());
    },

    /*
     *  On Close Button
     *
     *  Checks first to see if the button is disabled (not closable), then fires the close event.
     *
     *  @param {none}
     *  @return {Event} The close event 'Tag:RemoveSearchTerm' with the text and view as parameters.
     */
    onCloseButton: function () {
        if (!this.getView().disabled) {
            this.getView().fireEvent('Tag:RemoveSearchTerm', this.getView().text, this.getView());            
        }
    }
});