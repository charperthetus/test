Ext.define('Savanna.image2.view.part.ImageViewer', {
    extend: 'Ext.Component',
    alias: 'widget.image2_part_imageviewer',

    viewer:null,

    onRender: function(){

        var domElem;

        this.callParent(arguments);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="imageViewer" style="width: 100%; height: 100%; position: absolute;"></div>');

        this.viewer = new viewer({
            parent: domElem,
            imageSource: 'White-458.jpg',
            frame: ['100%','100%']
        });

    }


});