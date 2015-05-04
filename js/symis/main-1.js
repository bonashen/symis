/**
 * Created by bona on 2014/9/16.
 */
/*

 console.log("load symis");


 require([ 'dojo/_base/kernel', 'dojo/ready', 'dojo/_base/loader' ], function(
 dojo, ready) {

 // Paths default to dojo.baseUrl ("scripts/dojotoolkit/dojo/"),
 // so we point any module beginning with "symis" to the path "/js/symis"
 dojo.registerModulePath('symis', 'symis');

 // Now that the path is set, load symis.ui.ApplicationFacade class
 require([ 'symis/ui/ApplicationFacade' ], function(facade) {
 // initialization facade instance.
 ready(function() {
 facade.getInstance(facade.NAME).startup();
 });
 });
 });
 */

define("symis/main", [
    "dojo/_base/kernel"
], function(dojo){
    // module:
    //		symis
    // summary:
    //		The symis package main module
    dojo.global.symis = {_scopeName:"symis"};
    //return {_scopeName:"symis"};
    console.debug("load symis module");
});