/**
 * Created by bona on 2014/9/17.
 */


require([
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!"
], function(BorderContainer, ContentPane){
    // create a BorderContainer as the top widget in the hierarchy
    var bc = new BorderContainer({
        style: "height: 768px; width: 1024px;"
    });

    // create a ContentPane as the left pane in the BorderContainer
    var cp1 = new ContentPane({
        region: "left",
        style: "width: 100px",
        content: "hello world"
    });
    bc.addChild(cp1);

    // create a ContentPane as the top pane in the BorderContainer
    cp1 = new ContentPane({
        region: "top",
        style: "height:20px",
        content: "Top Pane -1"
    });
    bc.addChild(cp1);

    // create a ContentPane as the top2 pane in the BorderContainer
    cp1 = new ContentPane({
        region: "top",
        style: "height:20px",
        content: "Top Pane -2"
    });
    bc.addChild(cp1);


    // create a ContentPane as the bottom pane in the BorderContainer
    cp1 = new ContentPane({
        region: "bottom",
        style: "height:20px",
        content: "Bottom Pane"
    });
    bc.addChild(cp1);


    // create a ContentPane as the center pane in the BorderContainer
    var cp2 = new ContentPane({
        region: "center",
        content: "how are you?"
    });
    bc.addChild(cp2);

    // put the top level widget into the document, and then call startup()
    bc.placeAt(document.body);
    bc.startup();
});