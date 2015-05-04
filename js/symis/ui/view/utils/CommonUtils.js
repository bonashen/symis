/**
 * Created by bona on 2015/3/20.
 */

define([
    "dijit/registry"
], function (registry) {

    var mainui = null,
        getMainUI =
            (function (uiname) {
                //指向主页面Widget
                return function () {
                    if (mainui === null)
                        mainui = registry.byId(uiname);
                    return mainui;
                }
            })("mainui"),

        getWorkspace = function () {
            return getMainUI().workspacePanel;
        };

    return {
        getMainUI: getMainUI,
        getWorkspace: getWorkspace,

        //for Stateful.get() attribute
        _getWorkspaceAttr: function () {
            return getWorkspace();
        },
        _getMainUIAttr: function () {
            return getMainUI();
        }

    };
});