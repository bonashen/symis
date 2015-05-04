/**
 * Created by bona on 14-8-25.
 */

define(
   // "symis/ui/view/UserInfoPanel",
    [
        "dojo/_base/declare"
        ,"dojo/dom-attr"
        , "symis/ui/view/_base/_WidgetsInTemplate"
        , "dojo/text!./templates/UserInfoPanel.html"

    ],
    function (declare, domAttr,widgetInTemplate, template) {

        // Declare our widget
        return declare("symis.ui.view.UserInfoPanel", [widgetInTemplate], {
            //	get our template
            templateString: template,

            //container other Widget
            //widgetsInTemplate:true,

            //	some properties
            baseClass: "UserInfoPanelBase",

            userInfoText:"bona shen",//this text display in userInfoNode.innerHTML.

            //userInfoNode point to dom "userInfoNode" node.

            //	define an panel's onClick handler
            onClick: function(){

            },

            postCreate: function(){

                console.debug(this.declaredClass," has been created.");

            }
            ,
            setUserInfoText:function(txt){
                this.userInfoText =txt;
                if(this.userInfoNode){
                    domAttr.set(this.userInfoNode,"innerHTML",this.userInfoText);
                    //this.userInfoNode.innerHTML= this.userInfoText;
                }
            },

            getUserInfoText:function(){
                return this.userInfoText;
            }


        });

    }
);
