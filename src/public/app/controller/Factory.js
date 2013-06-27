/**
 * Factory to instantiate controllers as needed
 *
 * This was created to get around the fact that ExtJS apparently requires you to declare all of your controllers in the
 * app.js file and that seems a bit odd...
 *
 * Usage:
 *
 * Ext.require('Savanna.controller.Factory'); // it's a singleton, so this should instantiate it
 *
 * Savanna.controller.Factory.getController('Savanna.controller.Foo');
 *
 * // now the controller should be available for use
 *
 * Savanna.controller.Foo.doSomething();
 */
Ext.define('Savanna.controller.Factory', {
    singleton: true,

    // CUSTOM METHODS

    /**
     * Retrieves the given controller (via Ext.app.Application.getController) based upon given controller name
     *
     * @param {String} controllerName either the fully-qualified or relative package name
     * @return {Ext.app.Application}
     */
    getController: function(controllerName) {

        // NOTE: Ext.app.Applicaiton.getController will return different instances based upon whether you return a
        //       fully-qualified controller name or a relative one, so we normalize it to always be relative
        if (controllerName.match(/[^.]+\.controller\./)) {
            controllerName = controllerName.substr(controllerName.indexOf('.controller.') + '.controller.'.length);
        }

        return Savanna.getApplication().getController(controllerName);
    }
});