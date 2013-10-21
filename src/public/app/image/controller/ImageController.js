/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.image.controller.ImageController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.image.view.ImageComponent'
    ],
    control: {
//        view: {
////            boxready: "onBoxReady"
//        }
//        ,
//        zoomInButton: {
////            click: "onZoomInClick"
//        },
//        zoomOutButton: {
////            click: "onZoomOutClick"
//        },
//        fitToFillButton: {
////            click: "onFitToFillClick"
//        },
//        rotateClockwise: {
////            click: "onRotateClockwise"
//        }
    },

    init: function() {
        return this.callParent(arguments);
    },

    statics: {

    }



});
