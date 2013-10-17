/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/4/13
 * Time: 11:04 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.components.AutoCompleteWithTags', {
    extend: 'Ext.container.Container',

    alias: 'widget.auto_complete_with_tags',

    width: '100%',

    layout: 'vbox',

    config: {
        labelType: '',
        tagValues: null
    },

    attachedStore: null,

    controller: 'Savanna.itemView.controller.AutoCompleteController',

    listeners: {
        afterrender: function() {
            if (this.getTagValues()) {
                var autoBox = this.queryById('autoCompleteBox');

                attachedStore = Ext.create('Ext.data.Store', {
                    fields: ['photo', 'title', 'description', 'isFeatured'],

                    data: [
                    {
                        photo: 'http://2.bp.blogspot.com/-SwRvvHer_wQ/T6GhgnQoS0I/AAAAAAAHhkY/iyxaoyoC-2g/s800/Kia-K9-01.jpg',
                        title: 'Car',
                        description: 'Vroom vroom!',
                        isFeatured: false
                    }, {
                        photo: 'http://4.bp.blogspot.com/-8iGyCfFuLuU/T5QA-1t4QTI/AAAAAAAAAXg/izbeFI2PvC0/s1600/korea.jpg',
                        title: 'City',
                        description: 'It\'s a beautiful night, such a beautful night.',
                        isFeatured: false
                    }, {
                        photo: 'http://www.dynamicdrive.com/cssexamples/media/ocean.jpg',
                        title: 'Ocean',
                        description: 'Look at me! I\'m an ocean!',
                        isFeatured: false
                    }, {
                        photo: 'http://media.lonelyplanet.com/lpi/24744/24744-14/469x264.jpg',
                        title: 'Lake',
                        description: 'I\'d rather not be rowing.',
                        isFeatured: false
                    }, {
                        photo: 'http://3.bp.blogspot.com/-kyrXb2orUgA/Te9KO0AxR5I/AAAAAAAAErY/X_XkbgU107Q/s1600/Blue_Ocean_17723522_std.jpg',
                        title: 'Tropics',
                        description: 'Boy, what a sick dock.',
                        isFeatured: true
                    }, {
                        photo: 'http://1.bp.blogspot.com/-iOPb28o8svc/TpvN-dWORKI/AAAAAAAAAuw/8pPLujrCSQ0/s1600/toronto.jpg',
                        title: 'Dark city',
                        description: 'Kind of reminds me of Seattle.',
                        isFeatured: false
                    }, {
                        photo: 'http://www.ebaytemplate.info/wp-content/gallery/germany/elbe-river-dresden-germany.jpg',
                        title: 'Old City',
                        description: 'This is an older city.',
                        isFeatured: false
                    }, {
                        photo: 'http://blog.educationusa.or.kr/wp-content/uploads/2008/07/dokdo-islets.jpg',
                        title: 'Boating',
                        description: 'Sure beats rowing',
                        isFeatured: false
                    }, {
                        photo: 'http://villaluxe.com/wp-content/gallery/pamillaretreat/maxico-palmilla-04.jpg',
                        title: 'Patio',
                        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
                        isFeatured: false
                    }
                ]
                });

                autoBox.bindStore(attachedStore);
                autoBox.pageSize = 10;

                for (var i = 0; i < this.getTagValues().length; i++) {
                    this.addTerm(this.getTagValues()[i]);
                }
            }
        }
    },

    constructor: function(configs) {
        this.callParent(arguments);
        this.initConfig(configs);  //initializes configs passed in constructor
    },

    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    },

    buildItems: function() {
        return [
            {
                xtype: 'combo',
                itemId: 'autoCompleteBox',
                displayField: 'title',
                typeAhead: false,
                hideLabel: true,
                hideTrigger: true,
                anchor: '100%',
                width: '100%',
                minChars: 1,
                enableKeyEvents: true,
                emptyText: this.getLabelType(),
                queryMode: 'local'
            },
            {
                xtype: 'container',
                layout: 'column',
                itemId: 'tagsList',
                width: '100%',
                items: []
            }
        ];
    },

    addTerm: function (tag) {
        if (this.queryById('term_' + tag.replace(/[\s'"]/g, "_")) === null) {
            var newTag = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm', {
                itemId: 'term_' + tag.replace(/[\s'"]/g, "_")
            });

            newTag.setTerm(tag);
            this.queryById('tagsList').add(newTag);
        }
    },

    removeTerm: function (view) {
        var myTag = view.itemId;
        this.queryById('tagsList').remove(myTag);
    }
});
