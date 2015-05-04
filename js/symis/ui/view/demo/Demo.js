/**
 * Created by bona on 2015/3/18.
 */


define(
    //"symis/ui/view/demo/Demo",
    [
        "symis/ui/view/utils/MessageBox",
        "dojo/on",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "symis/ui/view/_base/BusinessViewBase",
        "dojo/text!./templates/DemoTemplate.html",

        //以下引用为DemoTemplate.html模板中所涉及的widget
        "dijit/layout/ContentPane",
        "dijit/form/Button",
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox"

    ], function (msgbox,
                 on,
                 lang,
                 declare,
                 _businessViewBase,
                 template) {

// module:
// symis/ui/view/demo/Demo

        return declare("symis.ui.view.demo.Demo",
            [_businessViewBase], {
                //	get our template
                templateString: template,

                //	some properties
                baseClass: "DemoBase",//样式表类

                //如果没有设定，将由symis.ui.cmd.CommandBus根据菜单项的名称自动赋值
                //title: "Demo",  //页面标签命名

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
