Ext.define('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.itemview_imagethumbnail',
    height: 100,
    width: 100,
    header: false,

    config: {
        src: null,
        alt: null,
        title: null
    }
});