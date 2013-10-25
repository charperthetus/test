/* global Ext: false */
/**
 * Savanna.desktop.util.OpenManager
 *
 * Singleton class to register and allow opening of desktop components
 *
 */
Ext.define('Savanna.utils.ComponentManager', {
    alternateClassName: ['ComponentManager'],
    singleton: true,
    componentClasses: [],
    /**
     *
     * @param componentClass - needs to contain method:
     * getComponentForUri(type:string) returning a new Ext Component or null if it doesn't handle the passed type
     */
    registerComponent: function(componentClass){
        this.componentClasses.push(componentClass);
    },
    /**
     *
     * @param type - String describing the type of component to return
     */
    getComponentForType: function(type, uri, label){
        var length = this.componentClasses.length,
            i = 0;
        for (i;i<length;i++){
            var component = this.componentClasses[i].getComponentForUri(type);
            if (component){
                return component;
            }
        }

        //TEMP for testing image
        var panel = Ext.create('Savanna.image.view.ImageComponent', {
            title: label,
            imageUri: uri.replace(/%2/g, '%252')
        });

        return panel;
        //Didn't find a component for this type
        return null;
    }
});