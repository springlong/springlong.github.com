//所有的对象、方法的声明都放到一个匿名函数中进行，是为了防止过多垃圾变量污染Window对象。
//另外在该匿名函数中传递window对象作为参数，是为了在进行压缩时减少window关键字所占用的字节。
(function(window){

    //声明相关变量
    var 

        //声明document、location、undefined等对象或特殊值的替代变量，一是为了减少使用他们时从window对象中查找所需的时间，二是为了在进行压缩时减少字节。
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        undefined = undefined,

        /**
         * 构建基类jsApp
         * @class
         * @global
         * @param  {String|Function|Window|HTMLElement} selector 选择器（用来构建实例对象的基础组件）
         * @example
         * var ele = jsApp("#element_ID");  //初始化jsApp对象实例，并返回目标ID元素的封装集合
         */
        jsApp = function(selector)
        {
            return new jsApp.init(selector);
        };

    //初始化jsApp对象实例
    jsApp.init = function(selector)
    {
        var _this = this, ele;

        //如果不存在selector参数，或者为""、undefined、null、false、0等值时，不再执行后续操作
        if(!selector)
        {
            return;
        }

        //如果是HTML对象或者window对象
        if(selector.nodeType || selector === window)
        {
            //说明：JSON对象允许通过数组赋值的形式进行元素扩展，但使用该方式后并不会让JSON对象具备数组的性质（即拥有length属性）。
            _this[0] = selector;
            _this.length = 1;
            return;
        }

        //如果为字符串
        if(typeof(selector) === "string")
        {
            //如果为ID获取
            if(/^#[\w-]+/i.test(selector))
            {
                ele = document.getElementById(selector.substring(1, selector.length));
                if(ele !== null)
                {
                    _this[0] = ele;
                    _this.length = 1;
                }
            }
        }
    }

    //扩展jsApp对象的实例成员
    jsApp.fn = jsApp.prototype = /** @lends jsApp.prototype */{
        
        /**
         * 添加事件绑定
         * @param  {String} name    事件名称
         * @param  {Function} handler 事件处理程序
         * @param  {Boolean} [capture=false] 是否进行事件捕捉
         * @return {Function}         事件处理程序
         * @example
         * var testID_click = $$("#testID").bind("click", function()
         * {
         *     alert("点击事件！");
         * });
         */
        bind: function(name, handler, capture)
        {
            return jsApp.map(this, function(index, ele)
            {
                //兼容事件对象、this关键字
                var callback = function(e)
                {
                    e = jsApp.rewriteEvent(e);
                    handler.call(e.target, e);
                }

                //事件绑定的兼容性操作
                "addEventListener" in ele ? 
                    ele.addEventListener(name, callback, capture) : 
                    ele.attachEvent("on" + name, callback);

                //返回“事件处理程序”，在添加事件绑定时可使用相关变量进行收集，以便进行取消事件绑定操作！
                return callback;

            });
        },

        /**
         * 解除事件绑定
         * @param  {String} name    事件名称
         * @param  {Function} handler 事件处理程序
         * @param  {Boolean} [capture=false] 是否进行事件捕捉
         * @example
         * $$("#testID").unbind("click", testID_click);
         */
        unbind: function(name, handler, capture)
        {
            return jsApp.map(this, function(index, ele)
            {
                //解除绑定的兼容性操作
                "removeEventListener" in ele ? 
                    ele.removeEventListener(name, handler, capture) : 
                    ele.detachEvent("on" + name, handler);
            });
        }
    };
    jsApp.init.prototype = jsApp.fn;

    /**
     * 扩展jsApp对象的静态成员（使用jsApp.xx访问）
     * @method
     * @name extend
     * @memberof jsApp
     * @param  {Object} members 需要扩展的成员集合
     * @example
     * jsApp.extend({
     *     e1: function(){},
     *     e2: function(){}
     * });
     */
     /**
     * 扩展jsApp对象的实例成员（使用new jsApp().xx访问）
     * @method
     * @name extend
     * @memberof jsApp.prototype
     * @param  {Object} members 需要扩展的成员集合
     * @example
     * jsApp.fn.extend({
     *     e1: function(){},
     *     e2: function(){}
     * });
     */
    jsApp.extend = jsApp.fn.extend = function(members)
    {
        for(var item in members)
        {
            this[item] = members[item];
        }
    };

    //扩展jsApp对象的静态成员
    jsApp.extend(/** @lends jsApp */{

        /**
         * 为jsApp中的原型方法执行检索操作
         * <br />原型方法通常需要针对检索对象的元素集合都执行同一操作，通过该函数可进行统一调配。
         * <br />原型方法通常需要涉及DOM元素的操作，通过该函数可在回调函数执行前判断目标元素的有无，从而确保回调函数中代码执行正确。
         * <br />在回调函数中，this指向检索对象本身，第一个参数代表目标元素在元素集合中的索引值，第二个参数则代表目标元素。
         * @param  {Object}   match    需要进行检索的对象（即jsApp的某个对象实例）
         * @param  {Function} callback 回调函数
         * @return {Object|Others}     如果检索对象中的元素集合为空，则返回检索对象本身；如果不为空，则返回元素集合中第一个元素执行回调函数后所返回的结果。
         */
        map: function(match, callback)
        {
            var len = match.length, i;

            if(len)
            {
                for(i = 1; i < len; i++)
                {
                    callback.call(match, i, match[i]);
                }
                return callback.call(match, 0, match[0]);
            }
            return match;
        },

        /**
         * 对事件对象进行重写
         * @param  {Object} e 重写前的事件对象
         * @return {Object}   重写后的事件对象
         * @example
         * e = jsApp.rewriteEvent(e);
         */
        rewriteEvent: function(e)
        {
            e = e || window.event;
            var type = e.type, 
            target = e.target || e.srcElement,
            compatible = {

                //事件类型，即事件的名称，如：click、dblclick、mouseover
                type: type,

                //事件目标，即用户的操作是基于哪一个目标元素进行的
                target : target,

                //Ctrl键是否按下
                ctrlKey: e.ctrlKey,

                //Shift键是否按下
                shiftKey: e.shiftKey,

                //Alt键是否按下
                altKey: e.altKey,

                //防止事件冒泡
                stopPropagation: function()
                {
                    "stopPropagation" in e ? e.stopPropagation() : (e.cancelBubble  = true);
                },

                //取消默认行为
                preventDefault: function()
                {
                    "preventDefault" in e ? e.preventDefault() : (e.returnValue = false);
                }
            };

            //鼠标事件
            if(/mouse|click/gi.test(type))
            {
                //作用于鼠标事件, 对于mouseover而言表示从哪个DOM元素进来，而对于mouseout而言则表示鼠标着落在那个DOM元素
                compatible.relatedTarget = e.relatedTarget === undefined ? (type === "mouseover" ? e.fromElement : e.toElement) : e.relatedTarget;

                //鼠标相对于目标元素的X轴坐标位置（由于offsetX和offsetY并没有被加入标准，所以Firefox浏览器并不支持这两个属性）
                compatible.offsetX = e.offsetX === undefined ? (e.clientX - target.getBoundingClientRect().left) : e.offsetX;

                //鼠标相对于目标元素的Y轴坐标位置
                compatible.offsetY = e.offsetY === undefined ? (e.clientY - target.getBoundingClientRect().top) : e.offsetY;

                //鼠标相对于文档显示区的X轴坐标位置
                compatible.clientX = e.clientX;

                //鼠标相对于文档显示区的Y轴坐标位置
                compatible.clientY = e.clientY;

                //鼠标相对于整个页面的X轴坐标位置（pageX和pageY在IE6/7/8中没有得到支持）
                compatible.pageX = e.pageX === undefined ? (document.documentElement.scrollLeft + event.clientX) : e.pageX;

                //鼠标相对于整个页面的Y轴坐标位置
                compatible.pageY = e.pageY === undefined ? (document.documentElement.scrollTop + event.clientY) : e.pageY;

                //鼠标相对于屏幕的X坐标位置
                compatible.screenX = e.screenX;

                //鼠标相对于屏幕的Y坐标位置
                compatible.screenY = e.screenY;

                //判断鼠标所按的是哪个键（0—左键；1—中间键；2—右键）
                if(document.implementation.hasFeature("MouseEvents", "2.0"))
                {
                    compatible.button = e.button;
                }
                else
                {
                    //在非标准的IE6/7/8事件模型下，按键有7个值
                    switch(e.button)
                    {
                        case 0:
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                            compatible.button =  0;
                            break;
                        case 2:
                        case 6:
                            compatible.button =  2;
                            break;
                        case 4:
                            compatible.button =  1;
                            break;
                    }
                }
            }
            //键盘按键事件的兼容性处理
            else if(/key/gi.test(type))
            {
                //键盘按键的键码值
                compatible.keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
            }

            return compatible;
        }
    });

    window.$ = window.jsApp = jsApp;   //将jsApp转换为全局对象

})(window);