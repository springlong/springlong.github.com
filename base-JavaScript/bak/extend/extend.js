/**
 * @file        基本的浏览器兼容处理以及常用函数的扩展
 * @version     0.0.1（2014-11-10）
 * @author      龙泉<yangtuan2009@126.com>
 */
(function(window, undefined){





//====================================================================================================================
//=========================================内置对象原型方法的扩展与兼容===============================================
//====================================================================================================================

(function(){

    //=============================================Array对象的扩展====================================================
    //================================================================================================================
    var arrayPrototype = Array.prototype;
    arrayPrototype.indexOf === undefined && (arrayPrototype.indexOf = function(val, fromIndex)
    {
        //返回目标数组中参数val的值第一次出现所在的索引位置，不存在则返回-1。（返回类型：Number）
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //参数val：（类型：Object）需要检索的值
        //参数fromIndex：（类型：Number，可选）指定开始查找的索引位置（为负数时表示从倒数第几个开始检索）
        var result = -1,
            len = this.length,
            i = typeof fromIndex === "number" ? (fromIndex >= 0 ? fromIndex : len + fromIndex) : 0;

        for(i = (i < 0 ? 0 : i); i < len; i++)
        {
            if(this[i] === val)
            {
                result = i;
                break;
            }
        }
        return result;
    });
    arrayPrototype.filter === undefined && (arrayPrototype.filter = function(func)
    {
        //筛选出原数组中符合条件（即回调函数返回ture时）的所有元素，并以数组形式返回。
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //回调函数：function(item, i){}
        //回调函数-参数item：当前项的值；
        //回调函数-参数i：当前项的索引值；
        //回调函数-this：window对象；
        var result = [],
            len = this.length,
            i = 0,
            item;

        for(; i < len; i++)
        {
            if(func(item = this[i], i))
            {
                result.push(item);
            }
        }

        return result;
    });
    arrayPrototype.map === undefined && (arrayPrototype.map = function(func)
    {
        //遍历目标数组中的每一个元素，并执行回调函数，最终将回调函数返回的值组合成新的数组返回。
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //回调函数：function(item, i){}
        //回调函数-参数item：当前项的值；
        //回调函数-参数i：当前项的索引值；
        //回调函数-this：window对象；
        var i = 0, len = this.length, result = [];
        for(; i < len; )
        {
            result[i] = func(this[i], i++);
        }
        return result;
    });
    arrayPrototype.forEach === undefined && (arrayPrototype.forEach = function(func)
    {
        //遍历目标数组中的每一个元素，并执行回调函数。
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //回调函数：function(item, i){}
        //回调函数-参数item：当前项的值；
        //回调函数-参数i：当前项的索引值；
        //回调函数-this：window对象；
        var i = 0, len = this.length;
        for(; i < len; )
        {
            func(this[i], i++);
        }
    });


    //=============================================Array对象的扩展====================================================
    //================================================================================================================
    Array.unique = function(arr)
    {
        //返回目标数组去除重复值之后所组成的新数组（不排序，原数组的值不受影响）。
        //该方法在最新版的ECMAScript6中依旧不被支持。
        //参数arr：（类型：Array）需要操作的数组对象
        var output = [],  //最终输出结果
            result = {},  //用于结果判断
            i = 0,
            len = arr.length,
            num;

        for(; i < len; )
        {
            num = arr[i++];
            if(result[num] === undefined)
            {
                result[num] = 1;     //使用1来表示目标结果已加入新的数组中
                output.push(num);    //保存唯一值
            }
        }
        return output;
    };
    Array.remove = function(arr, val)
    {
        //删除原数组中与参数val的值相等的所有元素，并返回原数组（原数组中的值将会受到影响）。
        //该方法在最新版的ECMAScript6中依旧不被支持。
        //参数arr：（类型：Array）需要操作的数组对象
        //参数val：（类型：Object）需要删除的元素值；
        var idx;

        while((idx = arr.indexOf(val)) !== -1)
        {
            arr.splice(idx, 1);
        }
        return arr;
    };
    Array.toArray = function(value)
    {
        return Array.prototype.slice.call(value);  //IE6~8不支持该种方式转换NodeList，但可以转换JavaScript对象
    }
    Array.asc = function(a, b){ return a > b ? 1 : -1; }; //升序
    Array.desc = function(a, b){ return a < b ? 1: -1; }; //降序


    //=============================================String对象的兼容====================================================
    //================================================================================================================
    var stringPrototype = String.prototype;
    stringPrototype.trim === undefined && (stringPrototype.trim = function()
    {
        //去除目标字符串首尾两端的所有空格，并作为新字符串返回
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        return this.replace(/^\s*|\s*$/g, "");
    });
    stringPrototype.contains === undefined && (stringPrototype.contains = function(match, position)
    {
        //判断目标字符串中是否存在检索字符串
        //该方法在ECMAScript6中被提出，目前仅Firefox支持。
        //参数match：（类型：String）需要检索的字符串
        //参数position：（类型：Number，可选）指定开始查找的索引位置，默认为0（非负数时有效，负数时相当于0）
        return typeof(match) == "string" && this.indexOf(match, Number(position)) >= 0;
    });
    stringPrototype.startsWith === undefined && (stringPrototype.startsWith = function(match, position)
    {
        //判断目标字符串是否以检索字符串开头
        //该方法在ECMAScript6中被提出，目前仅Firefox支持。
        //参数match：（类型：String）需要检索的字符串
        //参数position：（类型：Number，可选）指定本次检索中“目标字符串”的起始位置，默认为0（非负数时有效，负数时相当于0）。
        //当position参数大于0时，实际上是将该索引位置及后续的所有字符作为新的“目标字符串”后再做判断
        return typeof(match) == "string" && this.substring(Number(position)).indexOf(match) == 0;
    });
    stringPrototype.endsWith === undefined && (stringPrototype.endsWith = function(match, position)
    {
        //判断目标字符串是否以检索字符串结束
        //该方法在ECMAScript6中被提出，目前仅Firefox支持。
        //参数match：（类型：String）需要检索的字符串
        //参数position：（类型：Number，可选）指定本次检索中“目标字符串”的结束位置，默认为原字符串的长度（当该值小于1时，将返回false）
        //当指定了position参数时，实际上是将该索引位置之前的所有字符作为新的“目标字符串”后再做检索判断
        return typeof(match) == "string" && new RegExp(match + "$").test(position === undefined ? this : this.substring(0, Number(position)));
    });
    stringPrototype.repeat === undefined && (stringPrototype.repeat = function(count)
    {
        //返回目标字符串重复连接的结果（原字符串不受影响）
        //该方法在ECMAScript6中被提出，目前仅Firefox支持。
        //参数count：（类型：Number）指明需要重复连接的次数
        //如果参数为空或者为0，则返回空字符串。
        //如果参数为数字字符串，则作为数字处理。
        return isNaN(count = Number(count)) ? "" : new Array(count + 1).join(this);
    });


    //=============================================Date对象的兼容=====================================================
    //================================================================================================================
    Date.now === undefined && (Date.now = function(){
        //兼容IE6~8：返回当前日期时间的毫秒级快照
        return new Date().getTime();
    });


    //=============================================DOM对象的兼容======================================================
    //================================================================================================================
    typeof HTMLElement !== "undefined" && HTMLElement.prototype.contains === undefined && (HTMLElement.prototype.contains = function(element)
    {
        //判断当前元素节点的子节点中是存在目标节点，如果是则返回true，否则返回false（同一元素进行比较时将返回true）
        //该方法在IE6+中均已支持，在较老版本的Firefox、Chrome、Opera浏览器中未被支持
        //注意：如果目标参数是一个非DOM对象，那么在IE6~8、Firefox、Presto版Opera浏览器中将导致错误异常
        while(element)
        {
            if(element === this) return true;
            element = element.parentNode;
        }
        return false;
    });
})();





//====================================================================================================================
//===================================为IE6~8添加元素获取、事件绑定的标准处理==========================================
//====================================================================================================================

(function(){

    //IE6~8不支持document.getSelection
    if(!!document.getSelection) return;

    var DOMExtends = {

            /**
             * 通过目标节点，使用querySelectorAll方法得到该节点下符合CSS选择符的所有元素（即一个NodeList对象），如果没有找到匹配的元素则返回一个空的NodeList（即length为0）
             * @param  {String} selector 选择器字符串
             * @return {NodeList}
             */
            querySelectorAll: function(selector)
            {
                return doDOMExtend(Sizzle(selector, this));
            },

            /**
             * 通过目标节点，使用querySelector方法得到该节点下符合CSS选择符的第一个元素，如果没有找到匹配的元素则返回null；
             * @param  {String} selector 选择器字符串
             * @return {DOMElement|null}
             */
            querySelector: function(selector)
            {
                return doDOMExtend(Sizzle(selector, this)[0] || null);
            },

            /**
             * 通过目标节点，使用getElementsByClassName方法得到该节点下符合指定类名的所有元素的集合，如果没有找到匹配的元素则返回一个空的NodeList（即length为0）。
             * @param  {String} classNames 一个或通过空格隔开的多个类名字符串
             * @return {NodeList}
             */
            getElementsByClassName: function(classNames)
            {
                return this.querySelectorAll("." + classNames.trim().replace(/\s+/g, "."));
            },

            /**
             * 添加事件绑定
             * @param  {String} name    事件名称
             * @param  {Function} handler 事件处理程序
             * @param  {Boolean} [capture=false] 是否进行事件捕捉
             */
            addEventListener: function(name, handler, capture)
            {
                var callback = function(e){
                    e = rewriteEvent(e);
                    handler.call(e.target, e);
                };
                this.attachEvent("on" + name, callback);
            },

            /**
             * 解除事件绑定
             * @param  {String} name    事件名称
             * @param  {Function} handler 事件处理程序
             * @param  {Boolean} [capture=false] 是否进行事件捕捉
             */
            removeEventListener: function(name, handler, capture)
            {
                this.detachEvent("on" + name, handler);
            }
        }, 
        doDOMExtend = function(eles){
            if(eles === null || eles.length === 0) return eles;
            var operand = eles.length === undefined ? [eles] : eles;
            [].forEach.call(operand, function(ele, i){

                if(ele.didDOMextend !== undefined) return;
                ele.didDOMextend = true;

                for(item in DOMExtends){
                    ele[item] = DOMExtends[item];
                }

                var _getElementsByTagName = ele.getElementsByTagName;
                ele.getElementsByTagName = function(tag){
                    return doDOMExtend(_getElementsByTagName(tag));
                };
            });
            return eles;
        },
        _getElementById = document.getElementById,
        _getElementsByName = document.getElementsByName,
        _getElementsByTagName = document.getElementsByTagName,
        item;

    document.getElementById = function(id){
        return doDOMExtend(_getElementById(id));
    };
    document.getElementsByName = function(name){
        return doDOMExtend(_getElementsByName(name));
    };
    document.getElementsByTagName = function(name){
        return doDOMExtend(_getElementsByTagName(name));
    };
    document.querySelectorAll = function(selector){
        return DOMExtends.querySelectorAll.call(document, selector);
    };
    document.querySelector = function(selector){
        return DOMExtends.querySelector.call(document, selector);
    };
    document.getElementsByClassName = function(classNames){
        return DOMExtends.getElementsByClassName.call(document, classNames);
    };
    [window, document].forEach(function(item){
        item.addEventListener = DOMExtends.addEventListener;
        item.removeEventListener = DOMExtends.removeEventListener;
    });

    /**
     * 对事件对象进行重写
     * @param  {Object} e 重写前的事件对象
     * @return {Object}   重写后的事件对象
     */
    function rewriteEvent(e)
    {
        var item, event = e || window.event;

        //由于事件对象不可写，所以转换为普通对象进行赋值
        e = {};
        for(item in event){
            e[item] = event[item];
        }

        //事件目标，即用户的操作是基于哪一个目标元素进行的
        e.target = event.srcElement;

        //防止事件冒泡
        e.stopPropagation = function(){
            event.cancelBubble = true;
        };
        //取消默认行为
        e.preventDefault = function(){
            event.returnValue = false;
        };

        //鼠标事件
        if(/mouse|click/gi.test(e.type)){

            //作用于鼠标事件, 对于mouseover而言表示从哪个DOM元素进来，而对于mouseout而言则表示鼠标着落在那个DOM元素
            e.relatedTarget = "mouseover,mouseenter".indexOf(event.type) >= 0 ? event.fromElement : event.toElement;   

            //鼠标相对于整个页面的坐标位置
            e.pageX = document.documentElement.scrollLeft + event.clientX;
            e.pageY = document.documentElement.scrollTop + event.clientY;

            //判断鼠标所按的是哪个键（0—左键；1—中间键；2—右键）
            //在非标准的IE6/7/8事件模型下，按键有7个值
            switch(event.button){

                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    e.button =  0;
                    break;
                case 2:
                case 6:
                    e.button =  2;
                    break;
                case 4:
                    e.button =  1;
                    break;
            }
        }
        //键盘按键事件的兼容性处理
        else if(/key/gi.test(event.type)){

            //键盘按键的键码值
            e.keyCode = event.keyCode === 0 ? event.charCode : event.keyCode;
        }

        return e;
    }
})();





//====================================================================================================================
//======================================================功能扩展======================================================
//====================================================================================================================

//基本的扩展对象
//所有在该脚本文件中扩展的属性或方法均通过该对象访问
//格式1：extend({})，将参数对象中的成员扩展到extend对象本身
//格式2：extend({}, {})，将除了第一个参数对象外的其他参数的值合并到第一个参数对象
//格式3：extend(true, {}, {})，在格式2的基础上增加的深度合并
function extend()
{
    //当第1个参数为布尔值时，该参数用来表示是否进行深度合并（深度合并表示在进行合并操作时也对嵌套的子对象进行合并）
    //当参数个数等于1，且不是布尔值时，则将该参数的各个成员合并至extend对象本身
    //当参数个数大于1，且第1个参数不是布尔值时，则将后续参数中的各成员合并至第1个参数中
    //合并处理时，相同名称的元素将被后面的值覆盖
    var name, item, src, collection, isPlainObject,
        argu = arguments,       //参数
        arguLen = argu.length,  //参数的长度
        target = argu[0] || {}, //需要扩展成员的目标对象
        i = 1,                  //扩展的成员从哪个索引参数开始
        deep = false;           //是否进行深度合并

    if(typeof target === "boolean"){
        deep = target;
        target = argu[1] || {};
        i = 2;
    }
    else if(arguLen === 1){
        target = extend; 
        i = 0;
    }

    //判断类型是否为：通过{}或者new Object()创建的对象（就是指除内置对象和HTML对象外的自定义对象）
    deep && (isPlainObject = function(value){
        return 
            new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(value).toLowerCase())[1] === "object"
            && value.toString().toLowerCase() === "[object object]";
    });

    //将需要扩展的成员加入到目标对象
    for(; i < arguLen; i++){

        collection = argu[i];
        for(name in collection){ //该语句对null、undefined、数字、布尔值不会执行遍历操作

            item = collection[name];
            if(deep && isPlainObject(item) && (src = target[name]) !== undefined){
                if(!isPlainObject(src)){ src = {}; }  //确保深度合并的结果为PlainObject类型
                target[name] = extend(deep, src, item);
            }
            else if(item !== undefined){
                //确保元素的值不被undefined覆盖
                target[name] = item;
            }
        }
    }

    //将被扩展后的目标对象返回
    return target;
}





//====================================================================================================================
//======================================================实用工具======================================================
//====================================================================================================================

extend({

    /**
     * 一个空函数
     * @return {undefined}
     */
    noop: function(){}, 

    /**
     * 在全局上下文中执行一些JavaScript代码
     * @param  {String} doSometing JavaScript代码字符串
     * @return {undefined}
     */
    globalEval: function(doSometing)
    {
        if(typeof(doSometing) === "string" && !/^\s*$/.test(doSometing)){
            try{
                //IE使用window.execScript将其全局化
                //其他浏览器使用window.eval将其全局化，单独使用eval则仅针对当前作用域有效
                //当JavaScript代码字符串含有语法错误时，因为使用了try-catch语句所以在非IE中将不会抛出异常，而IE使用了window.execScript所以将抛出异常
                (window.execScript || window.eval)(doSometing);
            }
            catch(e){}
        }
    },

    /**
     * 随机生成位于min~max之间的整数（包括min和max本身）
     * 如果有一方参数不是数字，则最终结果返回0。
     * 在执行操作之前，将对两个参数进行比较，较大的值作为max，较小的值作为min。
     * @param  {Number} min 最小值
     * @param  {Number} max 最大值
     * @return {Number}
     */
    random: function(min, max)
    {
        if(isNaN(min) || isNaN(max)) return 0;
        if(min > max){
            var exchange = min;
            min = max;
            max = exchange;
        }
        return Math.round(Math.random()*(max - min) + min);
    },

    /**
     * 判断目标元素的节点名称是否与指定值相符
     * @param  {DOMElement} ele  目标元素
     * @param  {String} name 指定名称（小写）
     * @return {Boolean}
     */
    nodeName: function(ele, name)
    {
        return ele.nodeName && ele.nodeName.toLowerCase() === name.toLowerCase();
    },

    /**
     * 将通过“-”链接的字符串转为换驼峰式，如“font-size”转换为“fontSize”。
     * @param  {String} str 需要转换的字符串
     * @return {String}     原字符串的驼峰形式
     */
    camelCase: function(str)
    {
        //IE的浏览器私有属性前缀没有驼峰化
        return str.replace(/^-ms-/, "ms-").replace(/-+(.)?/g, function(match, item){
            return item ? item.toUpperCase() : "";
        });
    },

    /**
     * 将驼峰式字符串转换为连字符式，如“fontSize”转换为“font-size”
     * @param  {String} str 需要转换的字符串
     * @return {String}     原字符串的连字符式
     */
    dashCase: function(str)
    {
        return /-/.test(str) ? str.toLowerCase() : str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
});





//====================================================================================================================
//======================================================类型判断======================================================
//====================================================================================================================

extend({

    /**
     * 判断类型是否为：DOM元素（包括元素节点、文本节点、注释节点、文档节点、文档片段节点）
     * @param  {任意类型}  value 需要判断的值
     * @return {Boolean}       是/否
     */
    isDOM: function(value)
    {
        return value && value.nodeType !== undefined;
    },

    /**
     * 判断类型是否为：元素节点（即HTML标签元素）
     * @param  {任意类型}  value 需要判断的值
     * @return {Boolean}       是/否
     */
    isElement: function(value)
    {
        return value && value.nodeType === 1;
    },

    /**
     * 判断类型是否为：字符串
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isStr: function(value)
    {
        return typeof(value) === "string";
    },

    /**
     * 判断类型是否为：一个有效的字符串（即非全空格成员）
     * @param  {String} value 需要检索的值
     * @return {Boolean}      是/否
     */
    isValidStr: function(value)
    {
        return typeof(value) === "string" && !/^\s*$/.test(value);
    },

    /**
     * 判断类型是否为：有效数字
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isNumeric: function(value)
    {
        return extend.type(value) === "number" && !isNaN(value);
    },

    /**
     * 判断类型是否为：函数
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isFunction: function(value)
    {
        return extend.type(value) === "function";
    },

    /**
     * 判断类型是否为：数组
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isArray: function(value)
    {
        return extend.type(value) === "array";
    },

    /**
     * 判断类型是否为：“数组”（即包含length值，且该值为数字类型）
     * <br />注意：window对象的length属性为1，function对象的length属性为0，他们都不作为“数组”进行处理。
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isArrayLike: function(value)
    {
        return value != null && !extend.isWindow(value) && !extend.isFunction(value) && typeof(value.length) === "number";
    },

    /**
     * 判断类型是否为：日期
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isDate: function(value)
    {
        return extend.type(value) === "date";
    },

    /**
     * 判断类型是否为：日期字符串，如“2012-03-26”
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isDateStr: function(value)
    {
        return typeof(value) === "string" && !isNaN(Date.parse(value.replace(/-/g, "/")))
    },

    /**
     * 判断类型是否为：通过{}或者new Object()创建的对象（就是指除内置对象和HTML对象外的自定义对象）
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isPlainObject: function(value)
    {
        return extend.type(value) === "object" && value.toString().toLowerCase() === "[object object]";
    },

    /**
     * 判断类型是否为：一个空对象（即不包含任何成员）
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isEmptyObject: function(value)
    {
        var name;
        if(extend.isArrayLike(value)) return value.length < 1;
        for(name in value){
            return false;
        }
        return true;
    },

    /**
     * 判断类型是否为：一个window对象（如当前窗口或者一个iframe）
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isWindow: function(value)
    {
        return value != null && value == value.window;
    },

    /**
     * 获取值的类型字符串
     * <br />各种类型返回的字符串结果如下：
     * <br />数字(含NaN)：   number
     * <br />字符串：        string
     * <br />ture/false：    boolean
     * <br />null：          null
     * <br />undefined：     undefined
     * <br />数组：          array
     * <br />函数：          function
     * <br />JSON：          object
     * <br />日期对象：      date
     * <br />数学对象：      math
     * <br />正则：          regexp
     * <br />window：
     * <br />    IE6/7/8:    object
     * <br />    chrome：    global
     * <br />    safari:     domwindow
     * <br />    其他：      window
     * <br />document.body:
     * <br />    IE6/7/8:    object
     * <br />    其他：      htmlbodyelement
     * @param  {任意类型} value 需要判断值
     * @return {String}         类型名称
     */
    type: function(value)
    {
        return value == null ? 
            String(value) :
            new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(value).toLowerCase())[1];
    }
});





//====================================================================================================================
//======================================================类名操作======================================================
//====================================================================================================================

extend({

    /**
     * 添加类名（一次仅能添加一个）
     * @param {DOMElement} ele  待操作的DOM
     * @param {String} name 类名字符串
     */
    addClass: function(ele, name)
    {
        var className = ele.className;
        if((" " + className + " ").indexOf(" " + name + " ") < 0){
            ele.className = (className + " " + name).trim();
        }
    },

    /**
     * 移除类名
     * @param {DOMElement} ele  待操作的DOM
     * @param {String} name 类名字符串
     */
    removeClass: function(ele, name)
    {
        var className = " " + ele.className + " ";
        name = " " + name + " ";
        while( className.indexOf(name) >= 0 ){
            className = className.replace(name, " ");
        }
        ele.className = className.trim();
    },

    /**
     * 在某一类名的有无之间进行切换（存在该类名则删除，不存在该类名则添加）
     * @param {DOMElement} ele  待操作的DOM
     * @param {String} name 类名字符串
     */
    toggleClass: function(ele, name)
    {
        extend.hasClass(ele, name) ? extend.addClass(ele, name) : extend.removeClass(ele, name);
    },

    /**
     * 是否包含指定类名
     * @param {DOMElement} ele  待操作的DOM
     * @param {String} name 类名字符串
     */
    hasClass: function(ele, name)
    {
        return (" " + ele.className + " ").indexOf(" " + name + " ") >= 0;
    }
});





//====================================================================================================================
//====================================================Cookie操作======================================================
//====================================================================================================================

extend({

    /**
     * 添加cookie或者重新给cookie赋值
     * @param  {String} name   cookie的名称
     * @param  {String} value  为cookie指定的值
     * @param  {Number} [expires] 指定当前cookie多长时间后失效（单位：分），默认为会话结束后失效（等同于设置该参数为0）。
     * @param  {Object} [config] 配置信息
     * @param  {String} config.path 指定可访问cookie的目录名称，默认值为根目录“/”。假使cookie创建时的页面地址为http://www.baidu.com/syc/ts.html，那么在默认情况下该cookie仅能供sys目录下及其子级目录下的页面进行访问，像http://www.baidu.com/why/jjs.html这样的页面将无法访问该cookie，如果需要使why目录下的页面也能正常访问，则需要将path属性设置为“path=/why”，而如果需要使该网站的所有页面都有权限访问该cookie，则需要将path属性设置为网站根目录，即“path=/”。一个页面可以根据path路径的不同而创建多个具有相同名称的cookie。
     * @param  {String} config.domain 指定可访问cookie的主机名，默认值为空。默认情况下，二级域名之间创建的cookie是不能相互被访问的。比如yes.baidu.com访问不了www.baidu.com域名下创建的cookie，如果需要实现二级域名之间能够互相被访问，则需要设置domain属性值为“domain=.baidu.com”，这样才能保证hyck.baidu.com、osp.baidu.com、yes.baidu.com等域名下的网页也能够正常访问www.baidu.com域名下的网页所创建的cookie。当在www.baidu.com下创建一个cookie时，如果将该cookie的domain值指定为其他二级域名，那么该cookie将创建失败。一个页面可以根据domain值的不同而创建多个具有相同名称的cookie。
     * @param  {Boolean} config.secure 是否启用安全性，默认为false。 默认情况下，使用http协议进行连接的页面即可访问该cookie；当设置该属性后（只要设置为任意字符即可生效，包括""），就只有通过https或者其它安全协议连接的页面才能访问该cookie。
     */
    setCookie: function(name, value, expires, config)
    {
        var path = "/", domain = "", secure = "", e_date;

        //name和value为必备参数
        if(value === undefined) return;

        if(config !== undefined){
            path = (path = config.path) === undefined ? "/" : path;
            domain = (domain = config.domain) === undefined ? "" : ";domain=" + domain;
            secure = (secure = config.secure) === true ? ";secure=" : "";
        }

        if((expires = expires || "") !== ""){
            (e_date = new Date()).setMinutes(e_date.getMinutes() + expires)
            expires = ";expires=" + e_date.toGMTString(); //过期时间值必须是GMT时间格式，通过toGMTString()方法即可将一个时间值转换为GMT格式;
        }
        document.cookie = name + "=" + escape(value) + expires + ";path=" + path + domain + secure; //对name和value进行escape编码处理，从而使空格、汉字、特殊字符呈如“%20”的形式进行保存。
    },

    /**
     * 获取指定cookie的值
     * 如果没有目标名称的cookie，则返回null
     * @param  {String} name cookie的名称
     * @return {String}      指定cookie的值
     */
    getCookie: function(name)
    {
        //IE、Firefox、Chrome支持空字符串的Cookie名称，Opera的Presto版本和Safari则不支持
        var reg = /^\s*$/.test(name + "") ? new RegExp("\\b([^=;]*)(;|$)") : new RegExp("\\b" + name + "=([^;]*)"), result;
        return (result = reg.exec(document.cookie)) !== null ? unescape(result[1]) : null;
    },

    /**
     * 删除指定名称的cookie
     * 通过将cookie的过期时间设置为一个过去的时间值即可将该cookie删除。
     * @param  {String} [name]   需要删除的cookie名称，如果省略该参数则表示删除可访问的所有cookie;
     * @param  {Object} [config]   配置信息
     * @param  {String} config.path   添加cookie时所设置的目录名称，默认值为根目录“/”。因为一个页面可以根据path路径的不同而创建多个具有相同名称的cookie，这种情况下进行删除的时候则需要指明path路径。（说明：将path参数值指定为“/”，将无法删除path值为“/xxx”创建的cookie，如果需要删除该cookie，则必需指定delCookie方法的path参数值也为“/xxx”。）
     * @param  {String} config.domain   添加cookie时所设置的主机名称，默认值为空。因为一个页面可以根据domain值的不同而创建多个具有相同名称的cookie，所以在删除的时候也必须指明domain值。
     */
    delCookie: function(name, config)
    {
        var path = "/", domain = "", list = "";

        //配置信息
        if(config !== undefined){
            path = (path = config.path) === undefined ? "/" : path;
            domain = (domain = config.domain) === undefined ? "" : ";domain=" + domain;
        }

        //如果name参数为undefined，则删除所有cookie
        if(name === undefined){
            var reg = /\b([^=;]+)=[^;]*/g, cookie = document.cookie, item;
            while((item = reg.exec(cookie)) != null){
                list += "," + item[1];  //因为可能存在名为空字符串的cookie名称，所以list的最终值的第一个字符应为逗号
            }
        }
        else{
            list = "" + name;
        }

        //执行批量删除
        list = list.split(/,\s*/);
        for(var i = 0, len = list.length; i < len; i++){
            document.cookie = list[i] + "=;expires=" + new Date(1).toGMTString() + ";path=" + path + domain;   
        }
    }
});





//====================================================================================================================
//====================================================浏览器扩展======================================================
//====================================================================================================================

extend.browser = (function()
{
    var browser = {

        /**
         * 浏览器名称（如：IE、Firefox、Safari、Chrome、Opera）
         * @type {String}
         */
        name: "",

        /**
         * 浏览器别名（即国产浏览器的标识，360SE——360浏览器；sogou——搜狗浏览器；Maxthon——傲游；TheWorld——世界之窗；THEWORLD——世界之窗极速版；BIDUBrowser——百度；LBBROWSER——猎豹浏览器；RSEBROWSER——瑞星安全浏览器；QQBrowser——QQ浏览器；TencentTraveler——腾讯TT浏览器；SaaYaa——闪游；）
         * @type {String}
         */
        alias: "",

        /**
         * 浏览器版本
         * @type {String}
         */
        version: "",

        /**
         * 是否为IE6浏览器（IE6不支持window.XMLHttpRequest属性）
         * @type {Boolean}
         */
        isIE6: !window.XMLHttpRequest,         

        /**
         * 是否为IE6~8浏览器（IE6~8不支持document.getSelection属性）
         * @type {[type]}
         */
        isLessIE9: !document.getSelection,

        /**
         * 是否为移动端访问
         * @type {Boolean}
         */
        isMobile: /(nokia|iphone|ipad|ipod|android|ucbrowser|fennec|touchpad|micromessenger|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i.test(navigator.userAgent),

        /**
         * 设为首页
         * 通常我们都会在网站头部某个位置加上一个“设为首页”的功能，但是没有一个全部兼容的设为首页的方法，所以在此创建一个函数将兼容性处理方法包装起来。
         */
        setHome: function()
        {
            try{
                //针对IE浏览器(setHomePage的参数必须是一个完整的网站地址才能正常触发设为首页操作)
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(location.href);
            }
            catch(e){
                //暂时没有找到兼容其他浏览器的方法，在此使用提供功能代替（ASCII码字符：您的浏览器需要手动设置首页。如需获取帮助，请参见“如何把百度设为您的上网主页”！）
                var ok = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01")
                ok && window.open("http://www.baidu.com/cache/sethelp/index.html", "_blank");
            }
        },

        /**
         * 加入收藏
         * 基本上（只测试了常用的浏览器，少数浏览没有测试）浏览器将当前页面加入到收藏夹的快捷键是Ctrl+D，但为了吸引用户执行这项操作，通常在页面的某个位置放置了一个类似“加入收藏”的链接。在Firefox和Opera中让该链接的rel="sidebar"可以实现该操作，但是存在瑕疵，所以还是使用JS来执行该操作比较好！
         */
        addFavorite: function()
        {
            try{
                //针对IE进行添加操作
                //注：由于安全设置问题，本地文件中没有权限执这行代码。另外在IE中，无法直接执行addFavorite方法，需要通过dom节点的相关事件才能正常触发，
                //    而以IE为内核的360，搜狗等浏览器却可以正常被触发。
                window.external.addFavorite(location.href, document.title);
            }
            catch(e){
                try{
                    //针对Firefox进行添加操作
                    //注意：addPanel方法要求网址信息必须是一个绝对且有效的网站地址，所以在本地文件进行测试将无法看到效果
                    window.sidebar.addPanel(document.title, location.href, "");
                }
                catch(e){
                    //如果是其他浏览器，则提示按Ctrl+D进行添加操作（ASCII码字符：添加收藏没有成功，可使用Ctrl+D继续完成操作！）
                    alert("\u6dfb\u52a0\u6536\u85cf\u6ca1\u6709\u6210\u529f\uff0c\u53ef\u4f7f\u7528Ctrl+D\u7ee7\u7eed\u5b8c\u6210\u64cd\u4f5c\uff01");
                }
            }
        }
    },
    ua = navigator.userAgent,
    match = /(Trident).*rv:([\d.]+)/i.exec(ua) ||
            /(MSIE) ([\d.]+)/i.exec(ua) || 
            /(Firefox)\/([\d.]+)/i.exec(ua) ||
            /(Opera).*version\/([\d.]+)/i.exec(ua) ||
            /(OPR)\/([\d.]+)/i.exec(ua) ||
            /(Chrome)\/([\d.]+) safari\/([\d.]+)/i.exec(ua) ||
            /apple(Webkit).*version\/([\d.]+) safari/i.exec(ua) ||
            [],
    name = match[1] || "",
    nameLower = name.toLowerCase(),
    version = match[2] || "",
    tags, i, len;

    if(nameLower !== "chrome" && nameLower === "webkit"){
        name = "Safari";
    }
    else if(nameLower === "opr"){
        name = "Opera"; //Opera自14.0版本后就使用了Webkit内核，UA字符串中的Opera也因此变更为OPR
    }
    else if(nameLower === "trident" || nameLower === "msie"){
        name = "IE"; //IE浏览器从11.0版本开始，在UA中不再包含“MSIE 10.0”类似的信息，与之替代的是：Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
    }

    //针对国产浏览器，使用别名进行识别
    //不知出于什么目的，360浏览器在UA中隐藏了对自身的标识信息，所以无法通过UA对其进行判定。但是360浏览器对部分域名（www.cnzz.com、www.so.com）开放了权限，这些域名通过360浏览器发送请求时，其UA中将带有360SE的信息。
    match = /MetaSr|Maxthon|TheWorld|BIDUBrowser|LBBROWSER|RSEBROWSER|QQBrowser|TencentTraveler|SaaYaa|360SE/i.exec(ua) || [];
    alias = match[0] || "";
    if(alias === "MetaSr"){
        alias = "sogou";
    }

    //使IE浏览器兼容HTML5标签
    //并解决IE6中固定定位元素在滚动条滑动时的闪烁效果，即设置：* html{background-image:url(about:blank);}。
    /*----------------------------------
     *说明：截止2012-09-03，Firefox、Chrome、Safari、Opera、IE9等高级浏览器均已支持基本的HTML5标签，但是在IE8及更低版本的IE浏览器中无法使用它们。
     *解决办法：在IE中，只需要通过document.createElement()方法创建一个未被支持的HTML元素，之后就可以正常地使用这个标签了（创建后的标签默认为行内元素，所以还需要通过样式将块状元素的display属性设置为block才行）。
     *=================================================================================*/
    if(browser.isLessIE9){
        tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
        for(i = 0, len = tags.length; i < len; i++)
        {
            document.createElement(tags[i]);
        }
        document.write('<style id="extend_selectorStyle">* html{background-image:url(about:blank);}header,footer,aside,article,section,hgroup,nav,menu,canvas,details,figure,figcaption,audio,video{display:block;}</style>')
    }

    //解决IE6浏览器不缓存背景图片的Bug
    /*----------------------------------
     *说明：我们通常需要使用CSS来进行背景图片的设置，但这样在IE6下有一个Bug，那就是IE6默认情况下不缓存背景图片，CSS里每次更改图片的位置时都会重新发起请求，所以当鼠标在有CSS背景的元素上移动时，图片会闪烁甚至鼠标会出现忙的状态。
     *      解决方案一：在CSS中加入如下样式：html { filter: expression(document.execCommand(”BackgroundImageCache”, false, true)); }
     *      使用上述方案可能会影响整个页面的加载速度，所以推荐使用JS来修正这个Bug。
     *=================================================================================*/
    if(browser.isIE6){
        try{
            document.execCommand("BackgroundImageCache", false, true);
        }
        catch(e){}
    }

    browser.name = name;
    browser.alias = alias;
    browser.version = version;

    return browser;
}());

window.extend = extend;

})(window, undefined);





/*
 * Sizzle基本API：
 * 选择器查询：（返回类型：Array）
 * 
 *     全局查询：Sizzle(Selector)
 *         查询出页面中满足选择器的所有元素所组成的数组
 *         
 *     局部查询：Sizzle(Selector, DOMElement|DOMDocument)
 *         查询出指定HTML元素下所有满足选择器的子节点所组成的数组
 *         
 * 元素匹配：（返回类型：Boolean）
 * 
 *     Sizzle.matchesSelector(DOMElement, Selector)
 *         判断指定的HTML元素是否与选择器匹配
 *         
 * 元素筛选：（返回类型：Array）
 * 
 *     Sizzle.matches(Selector, DOMElement Array)
 *         筛选出HTML元素数组中满足选择器的所有元素所组成的数组
 *         
 * 排序去重：（返回类型：Array）
 *
 *      Sizzle.uniqueSort(DOMElement Array)
 *          将元素数组进行排序并去除重复内容后将新的结果返回
 */
/*
 * Sizzle CSS Selector Engine v2.1.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-09-19
 */
(function( window ) {

var i,
    support,
    Expr,
    getText,
    isXML,
    tokenize,
    compile,
    select,
    outermostContext,
    sortInput,
    hasDuplicate,

    // Local document vars
    setDocument,
    document,
    docElem,
    documentIsHTML,
    rbuggyQSA,
    rbuggyMatches,
    matches,
    contains,

    // Instance-specific data
    expando = "sizzle" + 1 * new Date(),
    preferredDoc = window.document,
    dirruns = 0,
    done = 0,
    classCache = createCache(),
    tokenCache = createCache(),
    compilerCache = createCache(),
    sortOrder = function( a, b ) {
        if ( a === b ) {
            hasDuplicate = true;
        }
        return 0;
    },

    // General-purpose constants
    MAX_NEGATIVE = 1 << 31,

    // Instance methods
    hasOwn = ({}).hasOwnProperty,
    arr = [],
    pop = arr.pop,
    push_native = arr.push,
    push = arr.push,
    slice = arr.slice,
    // Use a stripped-down indexOf as it's faster than native
    // http://jsperf.com/thor-indexof-vs-for/5
    indexOf = function( list, elem ) {
        var i = 0,
            len = list.length;
        for ( ; i < len; i++ ) {
            if ( list[i] === elem ) {
                return i;
            }
        }
        return -1;
    },

    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

    // Regular expressions

    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",

    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

    // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
        // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace +
        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
        "*\\]",

    pseudos = ":(" + identifier + ")(?:\\((" +
        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
        // 2. simple (capture 6)
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
        // 3. anything else (capture 2)
        ".*" +
        ")\\)|)",

    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp( whitespace + "+", "g" ),
    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

    rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

    rpseudo = new RegExp( pseudos ),
    ridentifier = new RegExp( "^" + identifier + "$" ),

    matchExpr = {
        "ID": new RegExp( "^#(" + identifier + ")" ),
        "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
        "TAG": new RegExp( "^(" + identifier + "|[*])" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
    },

    rinputs = /^(?:input|select|textarea|button)$/i,
    rheader = /^h\d$/i,

    rnative = /^[^{]+\{\s*\[native \w/,

    // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

    rsibling = /[+~]/,
    rescape = /'|\\/g,

    // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
    funescape = function( _, escaped, escapedWhitespace ) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ?
            escaped :
            high < 0 ?
                // BMP codepoint
                String.fromCharCode( high + 0x10000 ) :
                // Supplemental Plane codepoint (surrogate pair)
                String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
    };

// Optimize for push.apply( _, NodeList )
try {
    push.apply(
        (arr = slice.call( preferredDoc.childNodes )),
        preferredDoc.childNodes
    );
    // Support: Android<4.0
    // Detect silently failing push.apply
    arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
    push = { apply: arr.length ?

        // Leverage slice if possible
        function( target, els ) {
            push_native.apply( target, slice.call(els) );
        } :

        // Support: IE<9
        // Otherwise append directly
        function( target, els ) {
            var j = target.length,
                i = 0;
            // Can't trust NodeList.length
            while ( (target[j++] = els[i++]) ) {}
            target.length = j - 1;
        }
    };
}

function Sizzle( selector, context, results, seed ) {
    var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector;

    if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
        setDocument( context );
    }

    context = context || document;
    results = results || [];
    nodeType = context.nodeType;

    if ( typeof selector !== "string" || !selector ||
        nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

        return results;
    }

    if ( !seed && documentIsHTML ) {

        // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
        if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
            // Speed-up: Sizzle("#ID")
            if ( (m = match[1]) ) {
                if ( nodeType === 9 ) {
                    elem = context.getElementById( m );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document (jQuery #6963)
                    if ( elem && elem.parentNode ) {
                        // Handle the case where IE, Opera, and Webkit return items
                        // by name instead of ID
                        if ( elem.id === m ) {
                            results.push( elem );
                            return results;
                        }
                    } else {
                        return results;
                    }
                } else {
                    // Context is not a document
                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                        contains( context, elem ) && elem.id === m ) {
                        results.push( elem );
                        return results;
                    }
                }

            // Speed-up: Sizzle("TAG")
            } else if ( match[2] ) {
                push.apply( results, context.getElementsByTagName( selector ) );
                return results;

            // Speed-up: Sizzle(".CLASS")
            } else if ( (m = match[3]) && support.getElementsByClassName ) {
                push.apply( results, context.getElementsByClassName( m ) );
                return results;
            }
        }

        // QSA path
        if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
            nid = old = expando;
            newContext = context;
            newSelector = nodeType !== 1 && selector;

            // qSA works strangely on Element-rooted queries
            // We can work around this by specifying an extra ID on the root
            // and working up from there (Thanks to Andrew Dupont for the technique)
            // IE 8 doesn't work on object elements
            if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                groups = tokenize( selector );

                if ( (old = context.getAttribute("id")) ) {
                    nid = old.replace( rescape, "\\$&" );
                } else {
                    context.setAttribute( "id", nid );
                }
                nid = "[id='" + nid + "'] ";

                i = groups.length;
                while ( i-- ) {
                    groups[i] = nid + toSelector( groups[i] );
                }
                newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                newSelector = groups.join(",");
            }

            if ( newSelector ) {
                try {
                    push.apply( results,
                        newContext.querySelectorAll( newSelector )
                    );
                    return results;
                } catch(qsaError) {
                } finally {
                    if ( !old ) {
                        context.removeAttribute("id");
                    }
                }
            }
        }
    }

    // All others
    return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
    var keys = [];

    function cache( key, value ) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if ( keys.push( key + " " ) > Expr.cacheLength ) {
            // Only keep the most recent entries
            delete cache[ keys.shift() ];
        }
        return (cache[ key + " " ] = value);
    }
    return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
    fn[ expando ] = true;
    return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
    var div = document.createElement("div");

    try {
        return !!fn( div );
    } catch (e) {
        return false;
    } finally {
        // Remove from its parent by default
        if ( div.parentNode ) {
            div.parentNode.removeChild( div );
        }
        // release memory in IE
        div = null;
    }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
    var arr = attrs.split("|"),
        i = attrs.length;

    while ( i-- ) {
        Expr.attrHandle[ arr[i] ] = handler;
    }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
    var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
            ( ~b.sourceIndex || MAX_NEGATIVE ) -
            ( ~a.sourceIndex || MAX_NEGATIVE );

    // Use IE sourceIndex if available on both nodes
    if ( diff ) {
        return diff;
    }

    // Check if b follows a
    if ( cur ) {
        while ( (cur = cur.nextSibling) ) {
            if ( cur === b ) {
                return -1;
            }
        }
    }

    return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
    };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
    };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
    return markFunction(function( argument ) {
        argument = +argument;
        return markFunction(function( seed, matches ) {
            var j,
                matchIndexes = fn( [], seed.length, argument ),
                i = matchIndexes.length;

            // Match elements found at the specified indexes
            while ( i-- ) {
                if ( seed[ (j = matchIndexes[i]) ] ) {
                    seed[j] = !(matches[j] = seed[j]);
                }
            }
        });
    });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
    return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
    var hasCompare,
        doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;

    // If no document and documentElement is available, return
    if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
        return document;
    }

    // Set our document
    document = doc;
    docElem = doc.documentElement;

    // Support tests
    documentIsHTML = !isXML( doc );

    // Support: IE>8
    // If iframe document is assigned to "document" variable and if iframe has been reloaded,
    // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
    // IE6-8 do not support the defaultView property so parent will be undefined
    if ( parent && parent !== parent.top ) {
        // IE11 does not have attachEvent, so all must suffer
        if ( parent.addEventListener ) {
            parent.addEventListener( "unload", function() {
                setDocument();
            }, false );
        } else if ( parent.attachEvent ) {
            parent.attachEvent( "onunload", function() {
                setDocument();
            });
        }
    }

    /* Attributes
    ---------------------------------------------------------------------- */

    // Support: IE<8
    // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
    support.attributes = assert(function( div ) {
        div.className = "i";
        return !div.getAttribute("className");
    });

    /* getElement(s)By*
    ---------------------------------------------------------------------- */

    // Check if getElementsByTagName("*") returns only elements
    support.getElementsByTagName = assert(function( div ) {
        div.appendChild( doc.createComment("") );
        return !div.getElementsByTagName("*").length;
    });

    // Support: IE<9
    support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

    // Support: IE<10
    // Check if getElementById returns elements by name
    // The broken getElementById methods don't pick up programatically-set names,
    // so use a roundabout getElementsByName test
    support.getById = assert(function( div ) {
        docElem.appendChild( div ).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
    });

    // ID find and filter
    if ( support.getById ) {
        Expr.find["ID"] = function( id, context ) {
            if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                var m = context.getElementById( id );
                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                return m && m.parentNode ? [ m ] : [];
            }
        };
        Expr.filter["ID"] = function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                return elem.getAttribute("id") === attrId;
            };
        };
    } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];

        Expr.filter["ID"] =  function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                return node && node.value === attrId;
            };
        };
    }

    // Tag
    Expr.find["TAG"] = support.getElementsByTagName ?
        function( tag, context ) {
            if ( typeof context.getElementsByTagName !== "undefined" ) {
                return context.getElementsByTagName( tag );

            // DocumentFragment nodes don't have gEBTN
            } else if ( support.qsa ) {
                return context.querySelectorAll( tag );
            }
        } :

        function( tag, context ) {
            var elem,
                tmp = [],
                i = 0,
                // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                results = context.getElementsByTagName( tag );

            // Filter out possible comments
            if ( tag === "*" ) {
                while ( (elem = results[i++]) ) {
                    if ( elem.nodeType === 1 ) {
                        tmp.push( elem );
                    }
                }

                return tmp;
            }
            return results;
        };

    // Class
    Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
        if ( documentIsHTML ) {
            return context.getElementsByClassName( className );
        }
    };

    /* QSA/matchesSelector
    ---------------------------------------------------------------------- */

    // QSA and matchesSelector support

    // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    rbuggyMatches = [];

    // qSa(:focus) reports false when true (Chrome 21)
    // We allow this because of a bug in IE8/9 that throws an error
    // whenever `document.activeElement` is accessed on an iframe
    // So, we allow :focus to pass through QSA all the time to avoid the IE error
    // See http://bugs.jquery.com/ticket/13378
    rbuggyQSA = [];

    if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function( div ) {
            // Select is set to empty string on purpose
            // This is to test IE's treatment of not explicitly
            // setting a boolean content attribute,
            // since its presence should be enough
            // http://bugs.jquery.com/ticket/12359
            div.innerHTML = "<select msallowcapture=''>" +
                "<option id='d\f]' selected=''></option></select>";

            // Support: IE8, Opera 11-12.16
            // Nothing should be selected when empty strings follow ^= or $= or *=
            // The test attribute must be unknown in Opera but "safe" for WinRT
            // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
            if ( div.querySelectorAll("[msallowcapture^='']").length ) {
                rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
            }

            // Support: IE8
            // Boolean attributes and "value" are not treated correctly
            if ( !div.querySelectorAll("[selected]").length ) {
                rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
            }

            // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
            if ( !div.querySelectorAll("[id~=d]").length ) {
                rbuggyQSA.push("~=");
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":checked").length ) {
                rbuggyQSA.push(":checked");
            }
        });

        assert(function( div ) {
            // Support: Windows 8 Native Apps
            // The type and name attributes are restricted during .innerHTML assignment
            var input = doc.createElement("input");
            input.setAttribute( "type", "hidden" );
            div.appendChild( input ).setAttribute( "name", "D" );

            // Support: IE8
            // Enforce case-sensitivity of name attribute
            if ( div.querySelectorAll("[name=d]").length ) {
                rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":enabled").length ) {
                rbuggyQSA.push( ":enabled", ":disabled" );
            }

            // Opera 10-11 does not throw on post-comma invalid pseudos
            div.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
        });
    }

    if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
        docElem.webkitMatchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector) )) ) {

        assert(function( div ) {
            // Check to see if it's possible to do matchesSelector
            // on a disconnected node (IE 9)
            support.disconnectedMatch = matches.call( div, "div" );

            // This should fail with an exception
            // Gecko does not error, returns false instead
            matches.call( div, "[s!='']:x" );
            rbuggyMatches.push( "!=", pseudos );
        });
    }

    rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
    rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

    /* Contains
    ---------------------------------------------------------------------- */
    hasCompare = rnative.test( docElem.compareDocumentPosition );

    // Element contains another
    // Purposefully does not implement inclusive descendent
    // As in, an element does not contain itself
    contains = hasCompare || rnative.test( docElem.contains ) ?
        function( a, b ) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return a === bup || !!( bup && bup.nodeType === 1 && (
                adown.contains ?
                    adown.contains( bup ) :
                    a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
            ));
        } :
        function( a, b ) {
            if ( b ) {
                while ( (b = b.parentNode) ) {
                    if ( b === a ) {
                        return true;
                    }
                }
            }
            return false;
        };

    /* Sorting
    ---------------------------------------------------------------------- */

    // Document order sorting
    sortOrder = hasCompare ?
    function( a, b ) {

        // Flag for duplicate removal
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if ( compare ) {
            return compare;
        }

        // Calculate position if both inputs belong to the same document
        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
            a.compareDocumentPosition( b ) :

            // Otherwise we know they are disconnected
            1;

        // Disconnected nodes
        if ( compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

            // Choose the first element that is related to our preferred document
            if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                return -1;
            }
            if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                return 1;
            }

            // Maintain original order
            return sortInput ?
                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                0;
        }

        return compare & 4 ? -1 : 1;
    } :
    function( a, b ) {
        // Exit early if the nodes are identical
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [ a ],
            bp = [ b ];

        // Parentless nodes are either documents or disconnected
        if ( !aup || !bup ) {
            return a === doc ? -1 :
                b === doc ? 1 :
                aup ? -1 :
                bup ? 1 :
                sortInput ?
                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                0;

        // If the nodes are siblings, we can do a quick check
        } else if ( aup === bup ) {
            return siblingCheck( a, b );
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while ( (cur = cur.parentNode) ) {
            ap.unshift( cur );
        }
        cur = b;
        while ( (cur = cur.parentNode) ) {
            bp.unshift( cur );
        }

        // Walk down the tree looking for a discrepancy
        while ( ap[i] === bp[i] ) {
            i++;
        }

        return i ?
            // Do a sibling check if the nodes have a common ancestor
            siblingCheck( ap[i], bp[i] ) :

            // Otherwise nodes in our document sort first
            ap[i] === preferredDoc ? -1 :
            bp[i] === preferredDoc ? 1 :
            0;
    };

    return doc;
};

Sizzle.matches = function( expr, elements ) {
    return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    // Make sure that attribute selectors are quoted
    expr = expr.replace( rattributeQuotes, "='$1']" );

    if ( support.matchesSelector && documentIsHTML &&
        ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
        ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

        try {
            var ret = matches.call( elem, expr );

            // IE 9's matchesSelector returns false on disconnected nodes
            if ( ret || support.disconnectedMatch ||
                    // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && elem.document.nodeType !== 11 ) {
                return ret;
            }
        } catch(e) {}
    }

    return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
    // Set document vars if needed
    if ( ( context.ownerDocument || context ) !== document ) {
        setDocument( context );
    }
    return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    var fn = Expr.attrHandle[ name.toLowerCase() ],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
            fn( elem, name, !documentIsHTML ) :
            undefined;

    return val !== undefined ?
        val :
        support.attributes || !documentIsHTML ?
            elem.getAttribute( name ) :
            (val = elem.getAttributeNode(name)) && val.specified ?
                val.value :
                null;
};

Sizzle.error = function( msg ) {
    throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
    var elem,
        duplicates = [],
        j = 0,
        i = 0;

    // Unless we *know* we can detect duplicates, assume their presence
    hasDuplicate = !support.detectDuplicates;
    sortInput = !support.sortStable && results.slice( 0 );
    results.sort( sortOrder );

    if ( hasDuplicate ) {
        while ( (elem = results[i++]) ) {
            if ( elem === results[ i ] ) {
                j = duplicates.push( i );
            }
        }
        while ( j-- ) {
            results.splice( duplicates[ j ], 1 );
        }
    }

    // Clear input after sorting to release objects
    // See https://github.com/jquery/sizzle/pull/225
    sortInput = null;

    return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
    var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

    if ( !nodeType ) {
        // If no nodeType, this is expected to be an array
        while ( (node = elem[i++]) ) {
            // Do not traverse comment nodes
            ret += getText( node );
        }
    } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if ( typeof elem.textContent === "string" ) {
            return elem.textContent;
        } else {
            // Traverse its children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                ret += getText( elem );
            }
        }
    } else if ( nodeType === 3 || nodeType === 4 ) {
        return elem.nodeValue;
    }
    // Do not include comment or processing instruction nodes

    return ret;
};

Expr = Sizzle.selectors = {

    // Can be adjusted by the user
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    attrHandle: {},

    find: {},

    relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
    },

    preFilter: {
        "ATTR": function( match ) {
            match[1] = match[1].replace( runescape, funescape );

            // Move the given value to match[3] whether quoted or unquoted
            match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

            if ( match[2] === "~=" ) {
                match[3] = " " + match[3] + " ";
            }

            return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
            /* matches from matchExpr["CHILD"]
                1 type (only|nth|...)
                2 what (child|of-type)
                3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                4 xn-component of xn+y argument ([+-]?\d*n|)
                5 sign of xn-component
                6 x of xn-component
                7 sign of y-component
                8 y of y-component
            */
            match[1] = match[1].toLowerCase();

            if ( match[1].slice( 0, 3 ) === "nth" ) {
                // nth-* requires argument
                if ( !match[3] ) {
                    Sizzle.error( match[0] );
                }

                // numeric x and y parameters for Expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

            // other types prohibit arguments
            } else if ( match[3] ) {
                Sizzle.error( match[0] );
            }

            return match;
        },

        "PSEUDO": function( match ) {
            var excess,
                unquoted = !match[6] && match[2];

            if ( matchExpr["CHILD"].test( match[0] ) ) {
                return null;
            }

            // Accept quoted arguments as-is
            if ( match[3] ) {
                match[2] = match[4] || match[5] || "";

            // Strip excess characters from unquoted arguments
            } else if ( unquoted && rpseudo.test( unquoted ) &&
                // Get excess from tokenize (recursively)
                (excess = tokenize( unquoted, true )) &&
                // advance to the next closing parenthesis
                (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                // excess is a negative index
                match[0] = match[0].slice( 0, excess );
                match[2] = unquoted.slice( 0, excess );
            }

            // Return only captures needed by the pseudo filter method (type and argument)
            return match.slice( 0, 3 );
        }
    },

    filter: {

        "TAG": function( nodeNameSelector ) {
            var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
            return nodeNameSelector === "*" ?
                function() { return true; } :
                function( elem ) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
        },

        "CLASS": function( className ) {
            var pattern = classCache[ className + " " ];

            return pattern ||
                (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                classCache( className, function( elem ) {
                    return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
                });
        },

        "ATTR": function( name, operator, check ) {
            return function( elem ) {
                var result = Sizzle.attr( elem, name );

                if ( result == null ) {
                    return operator === "!=";
                }
                if ( !operator ) {
                    return true;
                }

                result += "";

                return operator === "=" ? result === check :
                    operator === "!=" ? result !== check :
                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                    operator === "*=" ? check && result.indexOf( check ) > -1 :
                    operator === "$=" ? check && result.slice( -check.length ) === check :
                    operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                    false;
            };
        },

        "CHILD": function( type, what, argument, first, last ) {
            var simple = type.slice( 0, 3 ) !== "nth",
                forward = type.slice( -4 ) !== "last",
                ofType = what === "of-type";

            return first === 1 && last === 0 ?

                // Shortcut for :nth-*(n)
                function( elem ) {
                    return !!elem.parentNode;
                } :

                function( elem, context, xml ) {
                    var cache, outerCache, node, diff, nodeIndex, start,
                        dir = simple !== forward ? "nextSibling" : "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType;

                    if ( parent ) {

                        // :(first|last|only)-(child|of-type)
                        if ( simple ) {
                            while ( dir ) {
                                node = elem;
                                while ( (node = node[ dir ]) ) {
                                    if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                        return false;
                                    }
                                }
                                // Reverse direction for :only-* (if we haven't yet done so)
                                start = dir = type === "only" && !start && "nextSibling";
                            }
                            return true;
                        }

                        start = [ forward ? parent.firstChild : parent.lastChild ];

                        // non-xml :nth-child(...) stores cache data on `parent`
                        if ( forward && useCache ) {
                            // Seek `elem` from a previously-cached index
                            outerCache = parent[ expando ] || (parent[ expando ] = {});
                            cache = outerCache[ type ] || [];
                            nodeIndex = cache[0] === dirruns && cache[1];
                            diff = cache[0] === dirruns && cache[2];
                            node = nodeIndex && parent.childNodes[ nodeIndex ];

                            while ( (node = ++nodeIndex && node && node[ dir ] ||

                                // Fallback to seeking `elem` from the start
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                // When found, cache indexes on `parent` and break
                                if ( node.nodeType === 1 && ++diff && node === elem ) {
                                    outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            }

                        // Use previously-cached element index if available
                        } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                            diff = cache[1];

                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                        } else {
                            // Use the same loop as above to seek `elem` from the start
                            while ( (node = ++nodeIndex && node && node[ dir ] ||
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                    // Cache the index of each encountered element
                                    if ( useCache ) {
                                        (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                    }

                                    if ( node === elem ) {
                                        break;
                                    }
                                }
                            }
                        }

                        // Incorporate the offset, then check against cycle size
                        diff -= last;
                        return diff === first || ( diff % first === 0 && diff / first >= 0 );
                    }
                };
        },

        "PSEUDO": function( pseudo, argument ) {
            // pseudo-class names are case-insensitive
            // http://www.w3.org/TR/selectors/#pseudo-classes
            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
            // Remember that setFilters inherits from pseudos
            var args,
                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                    Sizzle.error( "unsupported pseudo: " + pseudo );

            // The user may use createPseudo to indicate that
            // arguments are needed to create the filter function
            // just as Sizzle does
            if ( fn[ expando ] ) {
                return fn( argument );
            }

            // But maintain support for old signatures
            if ( fn.length > 1 ) {
                args = [ pseudo, pseudo, "", argument ];
                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                    markFunction(function( seed, matches ) {
                        var idx,
                            matched = fn( seed, argument ),
                            i = matched.length;
                        while ( i-- ) {
                            idx = indexOf( seed, matched[i] );
                            seed[ idx ] = !( matches[ idx ] = matched[i] );
                        }
                    }) :
                    function( elem ) {
                        return fn( elem, 0, args );
                    };
            }

            return fn;
        }
    },

    pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function( selector ) {
            // Trim the selector passed to compile
            // to avoid treating leading and trailing
            // spaces as combinators
            var input = [],
                results = [],
                matcher = compile( selector.replace( rtrim, "$1" ) );

            return matcher[ expando ] ?
                markFunction(function( seed, matches, context, xml ) {
                    var elem,
                        unmatched = matcher( seed, null, xml, [] ),
                        i = seed.length;

                    // Match elements unmatched by `matcher`
                    while ( i-- ) {
                        if ( (elem = unmatched[i]) ) {
                            seed[i] = !(matches[i] = elem);
                        }
                    }
                }) :
                function( elem, context, xml ) {
                    input[0] = elem;
                    matcher( input, null, xml, results );
                    return !results.pop();
                };
        }),

        "has": markFunction(function( selector ) {
            return function( elem ) {
                return Sizzle( selector, elem ).length > 0;
            };
        }),

        "contains": markFunction(function( text ) {
            text = text.replace( runescape, funescape );
            return function( elem ) {
                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
            };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction( function( lang ) {
            // lang value must be a valid identifier
            if ( !ridentifier.test(lang || "") ) {
                Sizzle.error( "unsupported lang: " + lang );
            }
            lang = lang.replace( runescape, funescape ).toLowerCase();
            return function( elem ) {
                var elemLang;
                do {
                    if ( (elemLang = documentIsHTML ?
                        elem.lang :
                        elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                        elemLang = elemLang.toLowerCase();
                        return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                    }
                } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                return false;
            };
        }),

        // Miscellaneous
        "target": function( elem ) {
            var hash = window.location && window.location.hash;
            return hash && hash.slice( 1 ) === elem.id;
        },

        "root": function( elem ) {
            return elem === docElem;
        },

        "focus": function( elem ) {
            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function( elem ) {
            return elem.disabled === false;
        },

        "disabled": function( elem ) {
            return elem.disabled === true;
        },

        "checked": function( elem ) {
            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            var nodeName = elem.nodeName.toLowerCase();
            return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
            // Accessing this property makes selected-by-default
            // options in Safari work properly
            if ( elem.parentNode ) {
                elem.parentNode.selectedIndex;
            }

            return elem.selected === true;
        },

        // Contents
        "empty": function( elem ) {
            // http://www.w3.org/TR/selectors/#empty-pseudo
            // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
            //   but not by others (comment: 8; processing instruction: 7; etc.)
            // nodeType < 6 works because attributes (2) do not appear as children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                if ( elem.nodeType < 6 ) {
                    return false;
                }
            }
            return true;
        },

        "parent": function( elem ) {
            return !Expr.pseudos["empty"]( elem );
        },

        // Element/input types
        "header": function( elem ) {
            return rheader.test( elem.nodeName );
        },

        "input": function( elem ) {
            return rinputs.test( elem.nodeName );
        },

        "button": function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === "button" || name === "button";
        },

        "text": function( elem ) {
            var attr;
            return elem.nodeName.toLowerCase() === "input" &&
                elem.type === "text" &&

                // Support: IE<8
                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
        },

        // Position-in-collection
        "first": createPositionalPseudo(function() {
            return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length ) {
            return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
            return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 0;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 1;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; --i >= 0; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; ++i < length; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        })
    }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
    Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
    Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
    var matched, match, tokens, type,
        soFar, groups, preFilters,
        cached = tokenCache[ selector + " " ];

    if ( cached ) {
        return parseOnly ? 0 : cached.slice( 0 );
    }

    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;

    while ( soFar ) {

        // Comma and first run
        if ( !matched || (match = rcomma.exec( soFar )) ) {
            if ( match ) {
                // Don't consume trailing commas as valid
                soFar = soFar.slice( match[0].length ) || soFar;
            }
            groups.push( (tokens = []) );
        }

        matched = false;

        // Combinators
        if ( (match = rcombinators.exec( soFar )) ) {
            matched = match.shift();
            tokens.push({
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace( rtrim, " " )
            });
            soFar = soFar.slice( matched.length );
        }

        // Filters
        for ( type in Expr.filter ) {
            if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                (match = preFilters[ type ]( match ))) ) {
                matched = match.shift();
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                });
                soFar = soFar.slice( matched.length );
            }
        }

        if ( !matched ) {
            break;
        }
    }

    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    return parseOnly ?
        soFar.length :
        soFar ?
            Sizzle.error( selector ) :
            // Cache the tokens
            tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
    var i = 0,
        len = tokens.length,
        selector = "";
    for ( ; i < len; i++ ) {
        selector += tokens[i].value;
    }
    return selector;
}

function addCombinator( matcher, combinator, base ) {
    var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;

    return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
            while ( (elem = elem[ dir ]) ) {
                if ( elem.nodeType === 1 || checkNonElements ) {
                    return matcher( elem, context, xml );
                }
            }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
            var oldCache, outerCache,
                newCache = [ dirruns, doneName ];

            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
            if ( xml ) {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        if ( matcher( elem, context, xml ) ) {
                            return true;
                        }
                    }
                }
            } else {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        outerCache = elem[ expando ] || (elem[ expando ] = {});
                        if ( (oldCache = outerCache[ dir ]) &&
                            oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                            // Assign to newCache so results back-propagate to previous elements
                            return (newCache[ 2 ] = oldCache[ 2 ]);
                        } else {
                            // Reuse newcache so results back-propagate to previous elements
                            outerCache[ dir ] = newCache;

                            // A match means we're done; a fail means we have to keep checking
                            if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                return true;
                            }
                        }
                    }
                }
            }
        };
}

function elementMatcher( matchers ) {
    return matchers.length > 1 ?
        function( elem, context, xml ) {
            var i = matchers.length;
            while ( i-- ) {
                if ( !matchers[i]( elem, context, xml ) ) {
                    return false;
                }
            }
            return true;
        } :
        matchers[0];
}

function multipleContexts( selector, contexts, results ) {
    var i = 0,
        len = contexts.length;
    for ( ; i < len; i++ ) {
        Sizzle( selector, contexts[i], results );
    }
    return results;
}

function condense( unmatched, map, filter, context, xml ) {
    var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

    for ( ; i < len; i++ ) {
        if ( (elem = unmatched[i]) ) {
            if ( !filter || filter( elem, context, xml ) ) {
                newUnmatched.push( elem );
                if ( mapped ) {
                    map.push( i );
                }
            }
        }
    }

    return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
    if ( postFilter && !postFilter[ expando ] ) {
        postFilter = setMatcher( postFilter );
    }
    if ( postFinder && !postFinder[ expando ] ) {
        postFinder = setMatcher( postFinder, postSelector );
    }
    return markFunction(function( seed, results, context, xml ) {
        var temp, i, elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,

            // Get initial elements from seed or context
            elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

            // Prefilter to get matcher input, preserving a map for seed-results synchronization
            matcherIn = preFilter && ( seed || !selector ) ?
                condense( elems, preMap, preFilter, context, xml ) :
                elems,

            matcherOut = matcher ?
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                    // ...intermediate processing is necessary
                    [] :

                    // ...otherwise use results directly
                    results :
                matcherIn;

        // Find primary matches
        if ( matcher ) {
            matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        if ( postFilter ) {
            temp = condense( matcherOut, postMap );
            postFilter( temp, [], context, xml );

            // Un-match failing elements by moving them back to matcherIn
            i = temp.length;
            while ( i-- ) {
                if ( (elem = temp[i]) ) {
                    matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                }
            }
        }

        if ( seed ) {
            if ( postFinder || preFilter ) {
                if ( postFinder ) {
                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
                    temp = [];
                    i = matcherOut.length;
                    while ( i-- ) {
                        if ( (elem = matcherOut[i]) ) {
                            // Restore matcherIn since elem is not yet a final match
                            temp.push( (matcherIn[i] = elem) );
                        }
                    }
                    postFinder( null, (matcherOut = []), temp, xml );
                }

                // Move matched elements from seed to results to keep them synchronized
                i = matcherOut.length;
                while ( i-- ) {
                    if ( (elem = matcherOut[i]) &&
                        (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

                        seed[temp] = !(results[temp] = elem);
                    }
                }
            }

        // Add elements to results, through postFinder if defined
        } else {
            matcherOut = condense(
                matcherOut === results ?
                    matcherOut.splice( preexisting, matcherOut.length ) :
                    matcherOut
            );
            if ( postFinder ) {
                postFinder( null, results, matcherOut, xml );
            } else {
                push.apply( results, matcherOut );
            }
        }
    });
}

function matcherFromTokens( tokens ) {
    var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
            return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
            return indexOf( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
            return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                (checkContext = context).nodeType ?
                    matchContext( elem, context, xml ) :
                    matchAnyContext( elem, context, xml ) );
        } ];

    for ( ; i < len; i++ ) {
        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
            matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
        } else {
            matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

            // Return special upon seeing a positional matcher
            if ( matcher[ expando ] ) {
                // Find the next relative operator (if any) for proper handling
                j = ++i;
                for ( ; j < len; j++ ) {
                    if ( Expr.relative[ tokens[j].type ] ) {
                        break;
                    }
                }
                return setMatcher(
                    i > 1 && elementMatcher( matchers ),
                    i > 1 && toSelector(
                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                    ).replace( rtrim, "$1" ),
                    matcher,
                    i < j && matcherFromTokens( tokens.slice( i, j ) ),
                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                    j < len && toSelector( tokens )
                );
            }
            matchers.push( matcher );
        }
    }

    return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
    var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, outermost ) {
            var elem, j, matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                // We must always have either seed elements or outermost context
                elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                // Use integer dirruns iff this is the outermost matcher
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;

            if ( outermost ) {
                outermostContext = context !== document && context;
            }

            // Add elements passing elementMatchers directly to results
            // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
            // Support: IE<9, Safari
            // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
            for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                if ( byElement && elem ) {
                    j = 0;
                    while ( (matcher = elementMatchers[j++]) ) {
                        if ( matcher( elem, context, xml ) ) {
                            results.push( elem );
                            break;
                        }
                    }
                    if ( outermost ) {
                        dirruns = dirrunsUnique;
                    }
                }

                // Track unmatched elements for set filters
                if ( bySet ) {
                    // They will have gone through all possible matchers
                    if ( (elem = !matcher && elem) ) {
                        matchedCount--;
                    }

                    // Lengthen the array for every element, matched or not
                    if ( seed ) {
                        unmatched.push( elem );
                    }
                }
            }

            // Apply set filters to unmatched elements
            matchedCount += i;
            if ( bySet && i !== matchedCount ) {
                j = 0;
                while ( (matcher = setMatchers[j++]) ) {
                    matcher( unmatched, setMatched, context, xml );
                }

                if ( seed ) {
                    // Reintegrate element matches to eliminate the need for sorting
                    if ( matchedCount > 0 ) {
                        while ( i-- ) {
                            if ( !(unmatched[i] || setMatched[i]) ) {
                                setMatched[i] = pop.call( results );
                            }
                        }
                    }

                    // Discard index placeholder values to get only actual matches
                    setMatched = condense( setMatched );
                }

                // Add matches to results
                push.apply( results, setMatched );

                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                if ( outermost && !seed && setMatched.length > 0 &&
                    ( matchedCount + setMatchers.length ) > 1 ) {

                    Sizzle.uniqueSort( results );
                }
            }

            // Override manipulation of globals by nested matchers
            if ( outermost ) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
            }

            return unmatched;
        };

    return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
    var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ selector + " " ];

    if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        if ( !match ) {
            match = tokenize( selector );
        }
        i = match.length;
        while ( i-- ) {
            cached = matcherFromTokens( match[i] );
            if ( cached[ expando ] ) {
                setMatchers.push( cached );
            } else {
                elementMatchers.push( cached );
            }
        }

        // Cache the compiled function
        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

        // Save selector and tokenization
        cached.selector = selector;
    }
    return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
    var i, tokens, token, type, find,
        compiled = typeof selector === "function" && selector,
        match = !seed && tokenize( (selector = compiled.selector || selector) );

    results = results || [];

    // Try to minimize operations if there is no seed and only one group
    if ( match.length === 1 ) {

        // Take a shortcut and set the context if the root selector is an ID
        tokens = match[0] = match[0].slice( 0 );
        if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                support.getById && context.nodeType === 9 && documentIsHTML &&
                Expr.relative[ tokens[1].type ] ) {

            context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
            if ( !context ) {
                return results;

            // Precompiled matchers will still verify ancestry, so step up a level
            } else if ( compiled ) {
                context = context.parentNode;
            }

            selector = selector.slice( tokens.shift().value.length );
        }

        // Fetch a seed set for right-to-left matching
        i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
        while ( i-- ) {
            token = tokens[i];

            // Abort if we hit a combinator
            if ( Expr.relative[ (type = token.type) ] ) {
                break;
            }
            if ( (find = Expr.find[ type ]) ) {
                // Search, expanding context for leading sibling combinators
                if ( (seed = find(
                    token.matches[0].replace( runescape, funescape ),
                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                )) ) {

                    // If seed is empty or no tokens remain, we can return early
                    tokens.splice( i, 1 );
                    selector = seed.length && toSelector( tokens );
                    if ( !selector ) {
                        push.apply( results, seed );
                        return results;
                    }

                    break;
                }
            }
        }
    }

    // Compile and execute a filtering function if one is not provided
    // Provide `match` to avoid retokenization if we modified the selector above
    ( compiled || compile( selector, match ) )(
        seed,
        context,
        !documentIsHTML,
        results,
        rsibling.test( selector ) && testContext( context.parentNode ) || context
    );
    return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
    // Should return 1, but returns 4 (following)
    return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
    div.innerHTML = "<a href='#'></a>";
    return div.firstChild.getAttribute("href") === "#" ;
}) ) {
    addHandle( "type|href|height|width", function( elem, name, isXML ) {
        if ( !isXML ) {
            return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
        }
    });
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
    div.innerHTML = "<input/>";
    div.firstChild.setAttribute( "value", "" );
    return div.firstChild.getAttribute( "value" ) === "";
}) ) {
    addHandle( "value", function( elem, name, isXML ) {
        if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
            return elem.defaultValue;
        }
    });
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
    return div.getAttribute("disabled") == null;
}) ) {
    addHandle( booleans, function( elem, name, isXML ) {
        var val;
        if ( !isXML ) {
            return elem[ name ] === true ? name.toLowerCase() :
                    (val = elem.getAttributeNode( name )) && val.specified ?
                    val.value :
                null;
        }
    });
}

// EXPOSE
if ( typeof define === "function" && define.amd ) {
    define(function() { return Sizzle; });
// Sizzle requires that there be a global window in Common-JS like environments
} else if ( typeof module !== "undefined" && module.exports ) {
    module.exports = Sizzle;
} else {
    window.Sizzle = Sizzle;
}
// EXPOSE

})( window );