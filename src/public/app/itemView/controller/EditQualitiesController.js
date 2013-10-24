/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.EditHeaderController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.header.EditHeader'
    ],

    control: {
        addPropAutoChooser: {
            'AutoComplete:ItemSelected': 'addProp'
        }
    },

    addProp: function (propName, construct) {
        if (this.getView().queryById('prop_' + propName.replace(/[\s']/g, "_")) === null) {
            var newProp = Ext.create('Savanna.components.autoComplete.AutoComplete', {
                itemId: 'prop_' + propName.replace(/[\s']/g, "_"),
                propData: construct.config.store.getAt(0).data,
                showTags: true,
                preLabel: propName,
                store: Ext.create('Ext.data.Store', {
                    fields: ['photo', 'title', 'description', 'isFeatured', 'value', 'abbr'],

                    data: [
                        {
                            photo: 'http://2.bp.blogspot.com/-SwRvvHer_wQ/T6GhgnQoS0I/AAAAAAAHhkY/iyxaoyoC-2g/s800/Kia-K9-01.jpg',
                            title: 'Car',
                            description: 'Vroom vroom!',
                            isFeatured: false,
                            value: 'Car',
                            abbr: 'Ca'
                        }, {
                            photo: 'http://4.bp.blogspot.com/-8iGyCfFuLuU/T5QA-1t4QTI/AAAAAAAAAXg/izbeFI2PvC0/s1600/korea.jpg',
                            title: 'City',
                            description: 'It\'s a beautiful night, such a beautful night.',
                            isFeatured: false,
                            value: 'City',
                            abbr: 'Ci'
                        }, {
                            photo: 'http://www.dynamicdrive.com/cssexamples/media/ocean.jpg',
                            title: 'Ocean',
                            description: 'Look at me! I\'m an ocean!',
                            isFeatured: false,
                            value: 'Ocean',
                            abbr: 'Oc'
                        }, {
                            photo: 'http://media.lonelyplanet.com/lpi/24744/24744-14/469x264.jpg',
                            title: 'Lake',
                            description: 'I\'d rather not be rowing.',
                            isFeatured: false,
                            value: 'Lake',
                            abbr: 'La'
                        }, {
                            photo: 'http://3.bp.blogspot.com/-kyrXb2orUgA/Te9KO0AxR5I/AAAAAAAAErY/X_XkbgU107Q/s1600/Blue_Ocean_17723522_std.jpg',
                            title: 'Tropics',
                            description: 'Boy, what a sick dock.',
                            isFeatured: true,
                            value: 'Tropics',
                            abbr: 'Tr'
                        }, {
                            photo: 'http://1.bp.blogspot.com/-iOPb28o8svc/TpvN-dWORKI/AAAAAAAAAuw/8pPLujrCSQ0/s1600/toronto.jpg',
                            title: 'Dark city',
                            description: 'Kind of reminds me of Seattle.',
                            isFeatured: false,
                            value: 'Dark City',
                            abbr: 'DC'
                        }, {
                            photo: 'http://www.ebaytemplate.info/wp-content/gallery/germany/elbe-river-dresden-germany.jpg',
                            title: 'Old City',
                            description: 'This is an older city.',
                            isFeatured: false,
                            value: 'Old City',
                            abbr: 'Oc'
                        }, {
                            photo: 'http://blog.educationusa.or.kr/wp-content/uploads/2008/07/dokdo-islets.jpg',
                            title: 'Boating',
                            description: 'Sure beats rowing',
                            isFeatured: false,
                            value: 'Boating',
                            abbr: 'Bo'
                        }, {
                            photo: 'http://villaluxe.com/wp-content/gallery/pamillaretreat/maxico-palmilla-04.jpg',
                            title: 'Patio',
                            description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
                            isFeatured: false,
                            value: 'Patio',
                            abbr: 'Pa'
                        }
                    ]
                })
            });

            this.getView().add(newProp);
        }
    },

    removeProp: function (closeButton) {
        var myProp = this.getView().queryById(closeButton.up('auto_complete').itemId);
        this.getView().queryById('item_properties').remove(myProp);
    }
});