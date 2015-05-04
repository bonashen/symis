/**
 * Created by bona on 2015/3/18.
 */


define(
    //"symis/ui/view/sys/UserManager",
    [
        "symis/ui/view/utils/MessageBox",
        "dojo/on",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "symis/ui/view/_base/BusinessViewBase",
        "dojo/text!./templates/UserManager.html",

        //以下引用为UserManager.html模板中所涉及的widget
        "dijit/layout/ContentPane",
        "dijit/form/Button",
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox",
        "dijit/layout/TabContainer"

    ], function (msgbox,
                 on,
                 lang,
                 declare,
                 _businessViewBase,
                 template) {

// module:
// symis/ui/view/sys/UserManager

        return declare("symis.ui.view.sys.UserManager",
            [_businessViewBase], {
                //	get our template
                templateString: template,

                //	some properties
                //baseClass: "UserManagerBase",//样式表类

                title: "User Manager",  //页面标签命名

                initView: function () {

                    this.inherited(arguments);
                    //this.addUserBtn define in templateString
                    on(this.addUserBtn, "click", function () {
                        msgbox.show({
                            title: "User Manager", content: "Will add new user to system.", okClick: function () {
                                //console.log(this);
                            },
                            cancelClick: function () {
                                //console.log(arguments);
                            }
                        });
                    });

                    //this.myStartDate define in templateString
                    on(this.myStartDate, "change", lang.hitch(this, function () {
                        this.myEndDate.constraints.min = arguments[0];
                    }));

                    //this.myEndDate define in templateString
                    on(this.myEndDate, "change", lang.hitch(this, function () {
                        this.myStartDate.constraints.max = arguments[0];
                    }));
                }

            });

    });
