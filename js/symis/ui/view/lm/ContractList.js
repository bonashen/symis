/**
 * Created by bona on 2015/3/18.
 * module:
 *      symis/ui/view/lm/ContractList
 * Description:
 *      合同目录模块，执行合同目录的查询、创建、关闭等功能
 */


define(
    //"symis/ui/view/lm/ContractList",
    [
        "thirty/fromq", //fromq
        "symis/ui/view/utils/MessageBox",
        'dojo/_base/event',//event.stop
        "dojo/on", //on
        "dojo/_base/lang",// lang.mixin
        "dojo/_base/declare", //declare
        "symis/ui/view/_base/BusinessViewBase",
        "dojo/text!./templates/ContractList.html",
        "dojo/data/ItemFileWriteStore",
        "dojox/grid/DataGrid",
        "dojo/date/stamp",
        'dojo/date/locale',
        "dijit/form/Button",

        //以下引用为ContractList.html模板中所涉及的widget
        "dijit/layout/ContentPane",
        //'dijit/layout/BorderContainer',
        "dijit/TitlePane",
        "dijit/form/ComboBox",
        "dijit/Toolbar",
        "dijit/form/CheckBox",

        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox",
        "dojox/grid/cells/dijit"


    ], function (fromq,
                 msgbox,
                 event,
                 on,
                 lang,
                 declare,
                 _businessViewBase,
                 template, Store, Grid, stamp, locale, Button) {

// module:
// symis/ui/view/lm/ContractList
//        "use strict";

        //产生唯一ID
        var id_gen = (function (initId) {
            "use strict";
            return new function () {
                this.id = initId;
                this.getValue = function () {
                    return "CICJS64-01-" + (this.id++);
                }
            };
        })(3);


        return declare("symis.ui.view.lm.ContractList",
            [_businessViewBase], {

                //	get our template
                templateString: template,

                //	some properties
                //baseClass: "ContractListBase",//样式表类

                //如果没有设定，将由symis.ui.cmd.CommandBus根据菜单项的名称自动赋值
                //title: "合同目录",  //页面标签命名

                contractListStore: new Store({url: "js/symis/ui/view/lm/templates/myContractListData.json"}),

                operatorStore: new Store({url: "js/symis/ui/view/lm/templates/myContractOperatorData.json"}),

                //contractListGrid: null,

                initView: function () {

                    this.inherited(arguments);

                    "use strict";

                    this.initContractListGrid();

                    this.initContractToolbar();
                    //关联operatorComboBox与operatorStore
                    this.operatorComboBox
                        .set("store", this.operatorStore)
                        .set("searchAttr", "name");

                    this.initDeliveryMaterialGrid();

                    this.initTicketInfoGrid();

                    this.initTargetCostInfoGrid();

                },
                initContractListGrid: function () {

                    //"use strict";
                    //var layout = [
                    //    {
                    //        noscroll: true,
                    //        defaultCell: {width: "84px"},
                    //        cells: [{field: 'id', name: '合同号'},
                    //            {field: "suppiler", name: "供应商"},
                    //            {field: 'amount', name: '金额'},
                    //            {field: 'deliveryMaterial', name: '交付物'}]
                    //    },
                    //    {
                    //        defaultCell: {width: "84px"},
                    //        cells: [
                    //            {field: 'operator', name: '经办人'},
                    //            {field: 'arrviedId', name: '档案号'},
                    //            {
                    //                field: 'registerDate', name: '登记日期', editable: true,
                    //                formatter: function (datum) {
                    //                    /*Format the value in store, so as to be displayed.*/
                    //                    var d = stamp.fromISOString(datum);
                    //                    return locale.format(d, {selector: 'date', formatLength: 'long'});
                    //                },
                    //                getValue: function () {
                    //                    /* Overide the default getValue function for dojox.grid.cells.DateTextBox*/
                    //                    return stamp.toISOString(this.widget.get("value"));
                    //                }, type: dojox.grid.cells.DateTextBox
                    //            },
                    //
                    //            {field: 'ticketAmount', name: '开票金额'},
                    //            {field: 'financeAmount', name: '签报金额'},
                    //            {field: 'paymentAmount', name: '已付金额'},
                    //            {
                    //                field: 'status', name: '执行状态', editable: true,
                    //                /*field values,rowIndex,cell*/
                    //                formatter: function (datum, rowIndex, cell) {
                    //                    var w = new Button({
                    //                        label: datum,
                    //                        onClick: function () {
                    //                            var grid = cell.grid, store = grid.store;
                    //                            //console.log("rowIndex",rowIndex,"cell:",cell);
                    //                            console.log("cell:", cell);
                    //                            console.log("id:", store.getValue(grid.getItem(rowIndex), "id"));
                    //                        }
                    //                    });
                    //                    w._destroyOnRemove = true;
                    //                    //console.log(arguments);
                    //                    return w;
                    //                }
                    //            }
                    //
                    //        ]
                    //    }
                    //];
                    //
                    ////console.log(lang.mixin({}, this.contractListGridNode));
                    //
                    //this.contractListGrid = new Grid({
                    //    //id: 'grid',
                    //    store: this.contractListStore,
                    //    //autoWidth: true,
                    //    //width: "100%",
                    //    autoHeight: true,
                    //    // height:"20 em",
                    //    structure: layout
                    //}, this.contractListGridNode);

                    var grid = this.contractListGrid;

                    fromq(grid.layout.cells)
                        .let("registerDate")
                        .where("o=>o.field===this")
                        .each(function (cell) {
                            lang.mixin(cell, {
                                editable: true,
                                formatter: function (datum) {
                                    /*Format the value in store, so as to be displayed.*/
                                    var d = stamp.fromISOString(datum);
                                    return locale.format(d, {selector: 'date', formatLength: 'long'});
                                },
                                //type: dojox.grid.cells.DateTextBox,
                                getValue: function () {
                                    /* Overide the default getValue function for dojox.grid.cells.DateTextBox*/
                                    if (this.widget)
                                        return stamp.toISOString(this.widget.get("value"));
                                }

                            });

                        });

                    //console.log(dojox.grid.cells.DateTextBox);

                    fromq(grid.layout.cells)
                        .let('status')
                        .where("o=>o.field===this")
                        .each(function (cell) {

                            lang.mixin(cell, {
                                editable: true,
                                /*field values,rowIndex,cell*/
                                formatter: function (datum, rowIndex, cell) {
                                    var w = new Button({
                                        label: datum,
                                        onClick: function () {
                                            var grid = cell.grid, store = grid.store;
                                            //console.log("rowIndex",rowIndex,"cell:",cell);
                                            console.log("cell:", cell);
                                            console.log("id:", store.getValue(grid.getItem(rowIndex), "id"));
                                        }
                                    });
                                    w._destroyOnRemove = true;
                                    return w;
                                }
                            });
                        });

                }
                ,
                initContractToolbar: function () {
                    var _view = this;

                    //set attach pint closeContractButton "onClick" event
                    this.own(on(_view.closeContractButton, "click", function (e) {
                        var items = _view.contractListGrid.selection.getSelected();
                        if (items !== null && items.length) {
                            //console.log(items);
                            fromq(items).each(function (selectedItem) {
                                if (selectedItem !== null)
                                    _view.contractListStore.deleteItem(selectedItem);
                            });
                        }
                        event.stop(e);
                    }));

                }
                ,
                _createContract: function (e) {

                    console.log("createContract", this, e);
                    var myNewItem = {
                        id: id_gen.getValue(),
                        suppiler: "江西宜昌",
                        amount: 3000,
                        deliveryMaterial: "[主机],[主机附件]",
                        operator: "bona shen",
                        registerDate: "2015-03-24",
                        ticketAmount: 3000,
                        financeAmount: 2000,
                        paymentAmount: 1000,
                        status: "执行中"
                    };
                    /* Insert the new item into the store:*/
                    this.contractListStore.newItem(myNewItem);

                },
                initDeliveryMaterialGrid: function () {
                    "use strict";
                    fromq(this.deliveryMaterialInfoGrid.layout.cells)
                        .let("_item")
                        .where("o=>o.field===this" )
                        .each(function (cell) {
                            cell.field = '';
                            cell.get = function (rowIndex, item) {
                                if (!item) return;
                                var store = this.grid.store,
                                    c_q = store.getValue(item, "contractQuantity"),
                                    d_q = store.getValue(item, 'deliveryQuantity');
                                return d_q - c_q;
                            }
                        });

                },
                initTicketInfoGrid: function () {
                    var cellType = 'dojox.grid.cells.Bool';
                    fromq(this.ticketInfoGrid.layout.cells)
                        .let(cellType)
                        .where("o=>o.declaredClass==this").each(function (item) {
                            item.formatter = function () {
                                return '<a href="http://www.bonashen.com">ok</a>';
                            };
                        });
                },
                initTargetCostInfoGrid: function () {
                    fromq(this.targetCostInfoGrid.layout.cells)
                        .let( "_item")
                        .where("o=>o.field===this")
                        .each(function (cell) {
                            //console.log(cell);
                            cell.field = '';
                            cell.get = function (rowIndex, item) {
                                if (!item) return;
                                var store = this.grid.store,
                                    c_a = store.getValue(item, "aShipAmount"),
                                    d_a = store.getValue(item, 'costAmount');
                                return d_a - c_a;
                            }
                        });
                }


            });

    })
;
