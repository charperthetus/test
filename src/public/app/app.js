/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'Savanna',

    views: [
        'Login',
        //TODO - This is loading both desktops right now, and we will need to decide which one to use going forward.  If we need both as a configuration option we will need to make a new app.js file.
        'SimpleTabbedDesktop',
        'SavannaDesktop',
        'Viewport'
    ],

    controllers: [
        'Main'
    ],

    requires: [
        'Savanna.Config'
    ],

    autoCreateViewport: true,

    launch: function() {
        this.viewport = Ext.ComponentQuery.query('viewport')[0];
    },

    // CUSTOM CONFIGURATION
    jsessionid: '' // keep track of the user's session id
});
