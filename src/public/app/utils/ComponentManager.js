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
     * getComponentForType(type:string, uri:string, label:string, otherParams:Object[optional]) returning a new Ext Component or null if it doesn't handle the passed type
     */
    registerComponent: function(componentClass){
        this.componentClasses.push(componentClass);
    },
    /**
     *
     * @param type - String describing the type of component to return
     * @param uri - String identifier
     * @param label - The label to go on the component
     * @param otherParams - Additional parameters
     */
    getComponentForType: function(type, uri, label, otherParams){
        var length = this.componentClasses.length,
            i = 0;
        for (i;i<length;i++){
            var component = this.componentClasses[i].getComponentForType(type, uri, label, otherParams);
            if (component){
                return component;
            }
        }
        //Didn't find a component for this type
        return null;
    }
});