/**
 * Created by bona on 2014/9/17.
 */

console.log(
    fromq([1, 2, 3, 2, 3, 3]).
        groupBy("o=>o").getCache());


//============================================================
require(["thirty/fromq", "thirty/lambda"], function (fromq, lambda) {

    var f = fromq().range(10).select("(o,i)=>{value:o,index:i}");
    var n = 5;

    //f.where("(o,i,n)=>o.value>n",n).each("(o,i,log)=>log(o)",console.log);

    var count = f.count("(o,i,n)=>o.value>n", n);

    //for(var i=1;i<=count;i++)
    //   console.log(f.sum("(o,n)=>o.value*n",i));

    //console.log("sum:",f.sum("value"));

    //console.log("avg:",fromq().range(1,3).each("o=>console.log(o)").avg("(o,n)=>o*n",4));


    // var sum =
    //     fromq("1,2,3,5,8,4,6,9,7").orderBy("o=>o").each("o=>console.log(o)").sum("o=>parseInt(o)");
    //console.log(sum);

    //fromq("1,3,4,2,3,4,1").concat(fromq([1,3,2,5,6])).distinct().orderBy().each("o=>console.log(o)");

    n = {value: 5};
    var lm = "(g,i,n)=>console.log(g.toArray().join(''));i.each('(o,i,n)=>console.log(o.value*n.value)',n)";

    f.groupBy("(o,i,n)=>o.value>n.value?'>'+n.value:'<='+n.value", n).
        each(lm, n);

    var fn = fromq.lambda(lm, true);

    console.log(fn.toString());


    n = 3;
    console.log("sum:", fromq("8,6,1,2,3,4").sum());

    console.log(fromq().range(10).sum("(o,i,n)=>o<n?o*n:o", 5));

    console.log(fromq.isNumber('2'));

    console.log(fromq.isFloat('1.7'));
});


//==============================================


require(['thirty/fromq'], function (fromq) {

    fromq(/ab*/g).match("abb switch,i like abb").each("o=>console.log('value:'+o,'\t index:'+o.index)");

});

//====================fromq.join=======================
require(['thirty/fromq'], function (fromq) {
    var a1 = [
        {id: 1, name: 'bona shen'},
        {id: 2, name: 'kerry'}
    ];
    var a2 = [
        {id: 1, age: 38},
        {id: 3, age: 5}
    ];

    fromq(a1).select("(o,i,a2)=>{a1:o,a2:a2.where('(o,i,n)=>o.id==n.id',o).first()}",
        fromq(a2)).each('o=>console.log(o)');

    fromq(a1).leftJoin(a2, "id").each('o=>console.log(o)');

    fromq(a1).innerJoin(a2, "id").each('o=>console.log(o)');

});


//===========lambda test==================================
require(['thirty/lambda', 'thirty/sbuilder'], function (lambda, sb) {
    var user = {
        name: 'bona shen', getName: function () {
            return this.name
        }
    };
    var fn = lambda(sb('o=>').
        append('(function(item){').
        append('\n\titem.name = this.getName();').
        append('\n}).call(this,o)').
        toString());
    console.log(fn.toString());
    var o = {};
    fn.call(user, o);
    console.log(o);
});
//==============================================
require(['thirty/fromq'], function (fromq) {
    fromq('test,123,1345').select('(o,i)=>{value:o,id:i}').orderBy('o=>o.value').each(function (item) {
        console.log(item);
    }).groupBy('o=>isNaN(parseInt(o.value))?\'not int\':\'int\'').each(function (g, i) {

        if (g=="int"){
            console.log(g, '\tcount: ', i.size(),
                '\tsum: ', i.sum('a=>parseInt(a.value)'), '\tavg:', i.avg('o=>parseInt(o.value)'));

            console.log("items:");
            i.each(
                function (item) {
                    console.log("\tid:", item.id, "\tvalue:", item.value);
                }
            );
        } else {
            console.log(g, '\tcount: ', i.size());
            console.log("items:");
            i.each(
                function (item) {
                    console.log("\tid:", item.id, "\tvalue:", item.value);
                }
            );
        }
    });
});


//===================================


require(["dijit/registry"], function (r) {

    console.dir(r.byId("mainui"));


});

//test linq
require(['thirty/fromq',
    'dijit/registry'], function (linq, reg) {
    var grid = reg.byId('symis_ui_view_lm_ContractList_0').contractListGrid;
    linq(grid.layout.cells).where(function (item) {
        return item["field"] === "paymentAmount";
    }).each(function (item) {
        item.formatter = function (datum) {
            return 'payment Amount:' + datum;
        };
    });
    grid.render();
});

//test linq
require(['thirty/fromq',
    'dijit/registry'], function (linq, reg) {
    var grid = reg.byId('symis_ui_view_lm_ContractList_0').contractListGrid;
    (function (cell) {
        if (cell) {
            cell.formatter = function (datum) {
                return 'payment Amount:' + datum;
            };
            cell.editable = true;
        }
    })(linq(grid.layout.cells).where(function (item) {
        return item["field"] === "paymentAmount";
    }).first());

    grid.render();
});


require(['thirty/fromq'], function (from) {
        var myList = [
            {
                FirstName: 'Chris',
                LastName: 'Pearson'
            },
            {
                FirstName: 'Kate',
                LastName: 'Johnson'
            },
            {
                FirstName: 'Josh',
                LastName: 'Sutherland'
            },
            {
                FirstName: 'John',
                LastName: 'Ronald'
            },
            {
                FirstName: 'Steve',
                LastName: 'Pinkerton'
            }
        ];
        from(myList).where(from("a=>a.FirstName==='Chris'")).each(function (item) {
            console.log(item);
        });
    }
);


//==========================
require(['thirty/fromq',
    'dijit/registry',
    'dojo/_base/lang'], function (from, reg, lang) {
    var store = reg.byId('symis_ui_view_lm_ContractList_0').contractListStore;
    store.fetch({
        query: {},
        onComplete: function (items, request) {
            console.log(request);
            var getValue = lang.hitch(request.store, request.store.getValue),
                setValue = lang.hitch(request.store, request.store.setValue);
            from(items).where(function (item) {
                return getValue(item, 'amount') > 1000;
            }).each(function (item) {
                console.log(getValue(item, 'id'));
            }).takeRange(1, 2).each(function (item) {
                setValue(item, 'amount', getValue(item, 'amount') + 1000
                );
            });
        },
        onError: function () {
        },
        queryOptions: {
            deep: true
        }
    });
});


//========================================
/*
 [{
 "groups": ["gmail.com", "man"],
 "maxAge": 38,
 "minAge": 5,
 "sumAge": 54,
 "avgAve": 18,
 "count": 3,
 "items": [{"name": "kerry", "age": 5, "sex": "man", "email": "kerry@gmail.com"}, {
 "name": "peter",
 "age": 11,
 "sex": "man",
 "email": "peter.sxt@gmail.com"
 }, {"name": "bona", "age": 38, "sex": "man", "email": "bona.shen@gmail.com"}],
 "group0": "gmail.com",
 "group1": "man"
 }, {
 "groups": ["163.com", "women"],
 "maxAge": 38,
 "minAge": 38,
 "sumAge": 38,
 "avgAve": 38,
 "count": 1,
 "items": [{"name": "ychunx", "age": 38, "sex": "women", "email": "ychunx@163.com"}],
 "group0": "163.com",
 "group1": "women"
 }]

 */
require(['thirty/fromq',
    'dojo/json'], function (fromq, json) {
    var data = [
        {
            name: 'bona',
            age: 38,
            sex: 'man',
            email: 'bona.shen@gmail.com'
        },
        {
            name: 'ychunx',
            age: 38,
            sex: 'women',
            email: 'ychunx@163.com'
        },
        {
            name: 'peter',
            age: 11,
            sex: 'man',
            email: 'peter.sxt@gmail.com'
        },
        {
            name: 'lala',
            age: 7,
            sex: 'women',
            email: 'lala-sxt@gmail.com'
        },
        {
            name: 'kerry',
            age: 5,
            sex: 'man',
            email: 'kerry.xue@gmail.com'
        }
    ];
    var remail = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
    var gret = fromq(data).orderBy('age').groupBy(function (item) {
        var a = remail.exec(item.email);
        //console.log(a);
        if (a.length > 2) return [a[2], item.age >= 18 ? "age>=18" : "age<18"];
        else return item.email;
    });
    //console.log(gret);

    gret = gret.select(function (g, i) {
        var ages = i.select('age');
        //console.log(ages.toArray());
        var ret = {
            group: g,
            maxAge: ages.max(),
            minAge: ages.min(),
            sumAge: ages.sum(),
            avgAge: ages.avg(),
            count: ages.count(),
            items: i.toArray()
        };

        //delete ret.groups;
        return ret;
    });
    gret.orderBy("minAge").each(function (item) {
        console.log(item);
    });

    console.log(json.stringify(gret.toArray()));
});

//==============================================
require(['thirty/fromq'], function (fromq) {
    var data1 = [
            {
                name: 'bona',
                age: 38,
                sex: 'man',
                email: 'bona.shen@gmail.com'
            },
            {
                name: 'ychunx',
                age: 38,
                sex: 'women',
                email: 'ychunx@163.com'
            },
            {
                name: 'peter',
                age: 11,
                sex: 'man',
                email: 'peter.sxt@gmail.com'
            }
        ],
        data2 = [{
            name: 'bona',
            age: 38,
            sex: 'man',
            email: 'bona.shen@gmail.com'
        },
            {
                name: 'lala',
                age: 7,
                sex: 'women',
                email: 'lala-sxt@gmail.com'
            },
            {
                name: 'kerry',
                age: 5,
                sex: 'man',
                email: 'kerry.xue@gmail.com'
            }
        ];
    var println = function (item) {
        console.log(item);
    };
    console.log("========Linq.concat==========");

    fromq(data1).concat(data2).each(println);

    console.log("========Linq.union==========");

    fromq(data1).union(data2, "name").each(println);
    console.log("========Linq.except==========");

    fromq(data1).except(data2, "name").each(println);

    console.log("========Linq.intersect==========");

    fromq(data1).intersect(data2, "name").each(println);

});
//=================================

require(['thirty/fromq', 'thirty/perf', 'thirty/logger'], function (from, testTime, Logger) {

    var a1 = [0,1, 2, 3, 4, 5], a2 = [0,1, 2, 5, 6, 8];

    var len = 100000;
    for (var i = 0; i < len; i++) {
        a1[i]=Math.round(Math.random()*len,0);
        // a2[i] = Math.round(Math.random() * len);

    }

    var f = from(a1);

    var fn = function (i) {
        console.log(i);
    };

    var logger = Logger("Collect Operator Test");

    var unionq = testTime(function () {
        return f.union(a2, "a=>a")
    }, "union", logger);

    console.log("\t union count:", unionq.size());

    var intersectq = testTime(function () {
        return f.intersect(a2, "k=>k")
    }, "intersect", logger);

    console.log("\t intersect count:", intersectq.size());

    var exceptq = testTime(function () {
        return f.except(a2, "i=>i")
    }, "except", logger);

    console.log("\t except count:", exceptq.size());

    if(exceptq.size()+intersectq.size()!==unionq.size())
    {  console.log("error");
        intersectq.in(exceptq).each(fn);
    }
    logger.flush();
});

//================================================

require(["dijit/registry", "dojo/on", "thirty/fromq"], function (reg, on, fromq) {

    //console.log(reg.byId("mainui").myModel);
    var model = reg.byId("mainui").myModel, cmdCode = "S0255";
    var root;
    model.getRoot(function (item) {
        root = item;
    });

    var checkfn = fromq("(o,cmd,q)=>o['cmdCode']?q(o['cmdCode']).where('(o,i,cmd)=>o===cmd',cmd).count()>0:false");
    console.log(checkfn.toString());
    //fromq("1,2,3").each("o=>console.log(o)");
    var fetch = function (root) {
        var ret = null;
        model.getChildren(root, function (items) {
            // console.log(items);
            fromq(items).each(function (item) {
                console.log(item['cmdCode']);

                if (item['cmdCode']) {
                    if (fromq(item['cmdCode']).where("(o,i,cmd)=>o===cmd", cmdCode).count() > 0) {
                        ret = item;
                        return item;
                    }
                }
                //
                //if (checkfn(item,cmdCode , fromq)) {
                //    ret = item;
                //    return item;
                //}
                if (!ret)ret = fetch(item);
            });
        });
        return ret;
    };
    console.log(fetch(root));
});
//=========================================
var src = "(o,i)=>console.log(o)";
var afn = lambda(src), bfn = lambda(src);
console.log(afn === bfn); //true
var cache = lambda.getCache();
for (var i = 0; i < cache.length; i++) {
    console.log("lambda:", cache[i].lambda, "  useCount:", cache[i].num);
}


//================================

require(['thirty/fromq', "thirty/lambda"], function (fq, _l) {
    var src = 'o=>console.log(o)';
    var log = _l(src, true);

    fq.utils.range(5).select(_l.convert("$*$$+#1+@+@+@"), 2, 4).each(log);
    fq(_l.getCache()).each(log);

});


//==============================================


//==============================================
require(['thirty/fromq', 'thirty/perf', 'thirty/logger'], function (fromq, testTime, Logger) {
    var logger = Logger("fromq Operator Test");
    var loopNum = 100000;
    var loop = function (callback) {
        for (var i = 0, l = loopNum; i < l; ++i) {
            callback(i);
        }
    };
    var a1 =
        testTime(function () {
            return fromq.utils.random(0, 100, loopNum).toArray();
        }, "fromq.utils.random", logger);

    var a2 = testTime(function () {
        return fromq.utils.range(100).toArray();
    }, "fromq.utils.range", logger);

    a2 = testTime(function () {
        return fromq(a2).random(50).toArray();
    }, "fromq.random", logger);

    a2 = fromq(a2).distinct().toArray();
    testTime(function () {
        var maxValue = a1[0];
        loop(function (i) {
            maxValue = a1[i] - maxValue > 0 ? a1[i] : maxValue;
        });

        console.log(maxValue);
    }, "loop", logger);

    var fq = fromq(a1);
    testTime(function () {
        fq.each(function (item, index) {
            a1[index] = item;
        });
    }, "fromq.each", logger);

    testTime(function () {
        var m = {value: 0};
        fq.let(m).each("o=>this.value=this.value-o<0?o:this.value");
        console.log(m.value);
    }, "fromq.each==>lambda", logger);

    a1 =
        testTime(function () {
            return fq.select(function (item) {
                return item
            }).toArray();
        }, "fromq.select", logger);

    a1 =
        testTime(function () {
            return fq.select().toArray();
        }, "fromq.select=>lambda", logger);

    testTime(function () {
        fq.orderBy();
    }, "fromq.orderBy", logger);

    testTime(function () {
        a1.sort(function (left, right) {
            return left > right ? 1 : (left < right ? -1 : 0);
        });
    }, "array.sort", logger);

    testTime(function () {
        loop(function () {
            fromq(a1)
        });
    }, "fromq.create", logger);

    testTime(function () {
        loop(function () {
            fromq.lambda("o=>o*o")
        });

    }, "fromq.lambda", logger);

    testTime(function () {
        loop(function () {
            fromq("1,2,3,4,5");
        });
    }, "fromq.String.split", logger);

    testTime(function () {
        console.log(fq.max());
    }, "fromq.max", logger);

    testTime(function () {
        a1.concat();
    }, "array.concat", logger);

    testTime(function () {
        console.log(Math.max.apply(null, a1));
    }, "Math.max", logger);

    testTime(function () {
        fq.groupBy("o=>o>50");
    }, "fromq.groupBy", logger);

    testTime(function () {
        loop(function () {
            fromq.lambda.isLambda("o=>o*o");
        })
    }, "fromq.lambda.isLambda", logger);

    testTime(function () {
        var callee = arguments.callee;
        loop(function () {
            fromq.utils.invoking(callee, function () {
            }, []);
        });
    }, "fromq.utils.invoking", logger);

    testTime(function () {
        fq.let({value:10}).each("(o,i,v)=>this.value=(v*o*this.value)",false,4);
    }, "fromq.utils.invokeProxy", logger);

    testTime(function () {
        fq.equal(a1);
    }, "fromq.equal", logger);

    testTime(function () {
        fq.where("o=>o>50");
    }, "fromq.where", logger);

    testTime(function () {
        fq.countBy("o=>o>50");
    }, "fromq.countBy", logger);

    testTime(function () {
        fq.distinct();
    }, "fromq.distinct", logger);

    testTime(function () {
        console.log(fq.lastIndexOf(10));
    }, "fromq.lastIndexOf", logger);

    testTime(function () {
        fq.notIn(a2);
    }, "fromq.notIn", logger);

    testTime(function () {
        var m = {value: 0};
        loop(function () {
            with (m) {
                value = value + 1;
            }
        });
    }, "with.test", logger);

    testTime(function () {
        var m = {value: 0};
        loop(function () {
            m.value = m.value + 1;
        });
    }, "nowith.test", logger);

    logger.flush();
});


//====================
