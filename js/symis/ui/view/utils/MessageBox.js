/**
 * Created by bona on 2015/3/20.
 */

define([
    "dijit/Dialog",
    "dojo/_base/window",
    "dojo/on",    //on
    "dijit/registry",  //reg.byId
    "dojo/_base/lang",  //lang.isFunction
    "dijit/form/Button"


], function (Dialog, win, on, reg, lang) {


    var showModel, okClick = "okClick", cancelClick = "cancelClick";

    showModel = function (message) {
        var dlg = new Dialog(message);
        on(dlg, "hide", function () {
            dlg.destroy();
            delete dlg;
        });

        var okButtonId = dlg.get("id") + "_okButton",
            cancelButtonId = dlg.get("id") + "_cancelButton";

        function getButtonHTML(dlg) {
            function gethtml(id, label) {
                return "<button data-dojo-type='dijit/form/Button' type='button' id='" + id +
                    "'>" + label +
                    "</button>";
            }

            var html = gethtml(okButtonId, "Ok");

            if (lang.isFunction(dlg[cancelClick])) {
                html = html.concat(gethtml(cancelButtonId, "Cancel"));
            }
            return html;
        }


        var content =
            "<div class='dijitDialogPaneContextArea'>" +
            dlg.get("content") +
            "</div>" +
            "<div class='dijitDialogPaneActionBar'>" +
            getButtonHTML(dlg) +
            "</div>";


        dlg.set("content", content);


        on(reg.byId(okButtonId), "Click", function () {
            if (lang.isFunction(dlg[okClick]))
                dlg[okClick].apply(this, arguments);
            dlg.hide();
        });
        if (lang.isFunction(dlg[cancelClick]))
            on(reg.byId(cancelButtonId), "Click", function () {
                if (lang.isFunction(dlg[cancelClick]))
                    dlg[cancelClick].apply(this, arguments);
                dlg.hide();
            });
        //console.log(dlg);

        dlg.placeAt(win.body());
        //dlg.startup();
        dlg.show();
    };

    var tooltip = function (id, msg) {
        require([
            "dijit/TooltipDialog", //TooltipDialog
            "dijit/popup",  //popup.open,popup.close
            "dojo/on", //on
            "dojo/dom",  //dom.byId
            "dojo/_base/lang",//lang.isString
            "symis/utils/Timer",  //Timer.once
            "dojo/domReady!"
        ], function (TooltipDialog, popup, on, dom, lang, timer) {
            var node;
            if (lang.isString(id)) {
                node = dom.byId(id);
            }
            else {
                node = id.domNode ? id.domNode : null;
            }

            var myTooltipDialog = new TooltipDialog({
                style: "width: 300px;",
                content: "<p>" + msg,

                onMouseLeave: function(){
                    popup.close(myTooltipDialog);
                },
                onHide:function(){
                    this.destroy();
                }
            });

            //myTooltipDialog.own(myTooltipDialog.on("hide",function(){
            //    this.destroy();
            //}));

            timer.once({
                timeout: 2000, run: function () {
                    popup.close(myTooltipDialog);
                }
            });

            popup.open({
                popup: myTooltipDialog,
                around: node,

                onCancel: function () {
                    // User pressed escape, so close myself
                    popup.close(myTooltipDialog);
                }
            });
        });
    };

    return {

        show: showModel,
        tooltip: tooltip

    };

});