/**
 * @file        对jQuery开发库的扩展处理（支持1.9及以上版本）
 * @version     0.0.1（2013-11-01）
 */
(function(window, jQuery, undefined){

//声明相关变量（声明document、location等对象或特殊值的替代变量，一是为了减少使用他们时查找所需的时间，二是为了在进行压缩时减少字节。）
var document = window.document,
    location = window.location,
    navigator = window.navigator;



//====================================================================================================================
//实用工具的扩展（用于数据/内容的处理）
jQuery.extend({

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
        if(min > max)
        {
            var exchange = min;
            min = max;
            max = exchange;
        }
        return Math.round(Math.random()*(max - min) + min);
    },

    /**
     * 将目标字符串中一些特殊的HTML字符进行编码，使得在进行HTML文本输出时不被当做HTML标签处理
     * 该函数对目标字符串中的回车换行符进行了特殊处理，使得在进行HTML文本输出时能够被自动换行显示
     * @param  {String} str 需要进行编码的字符串
     * @return {String}
     */
    encodeHTML: function(str)
    {
        if(typeof(str) === "string")
        {
            return str.replace(/&/g, "&amp;")           //对于&字符的编码，必须放在第一位，否则跟后面的编码有冲突
                      .replace(/ /g, "&nbsp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/\r?\n/g, "<br />");
        }
        return "";
    },

    /**
     * 将通过encodeHTML方法进行编码的字符串进行解码
     * @param  {String} str 需要进行解码的字符串
     * @return {String}
     */
    decodeHTML: function(str)
    {
        if(typeof(str) === "string")
        {
            return str.replace(/&amp;/g, "&")
                      .replace(/&nbsp;/g, " ")
                      .replace(/<br\s?\/?>/g, "\n")    //对换行符的解码，必须放在<和>的前面，否则有冲突
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">");
        }
        return "";
    }
});



//====================================================================================================================
//类型判断的扩展
jQuery.extend({
    /**
     * 判断类型是否为：DOM元素（包括元素节点、文本节点、注释节点、文档节点、文档片段节点）
     * @param  {任意类型}  value 需要判断的值
     * @return {Boolean}       是/否
     */
    isDOM: function(value)
    {
        return !!value && value.nodeType !== undefined;
    },

    /**
     * 判断类型是否为：元素节点（即HTML标签元素）
     * @param  {任意类型}  value 需要判断的值
     * @return {Boolean}       是/否
     */
    isElement: function(value)
    {
        return !!value && value.nodeType === 1;
    },

    /**
     * 判断类型是否为：jQuery对象实例
     * @param  {任意类型}  value 需要判断的值
     * @return {Boolean}       是/否
     */
    isJQuery: function(value)
    {
        return value instanceof jQuery;
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
     * 判断类型是否为：“数组”（即包含length值，且该值为数字类型）
     * 注意：window对象的length属性为1，function对象的length属性为0，他们都不作为“数组”进行处理。
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isArrayLike: function(value)
    {
        return value != null && !jQuery.isWindow(value) && !jQuery.isFunction(value) && typeof(value.length) === "number";
    },

    /**
     * 判断类型是否为：日期
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isDate: function(value)
    {
        return jQuery.type(value) === "date";
    },

    /**
     * 判断类型是否为：日期字符串，如“2012-03-26”
     * @param  {任意类型} value 需要判断的值
     * @return {Boolean}        是/否
     */
    isDateStr: function(value)
    {
        return typeof(value) === "string" && !isNaN(Date.parse(value.replace(/-/g, "/")))
    }
});



//====================================================================================================================
//Cookie操作
jQuery.extend({

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

        if(value === undefined)
        {
            return; //name和value为必备参数
        }

        if(config !== undefined)
        {
            path = (path = config.path) === undefined ? "/" : path;
            domain = (domain = config.domain) === undefined ? "" : ";domain=" + domain;
            secure = (secure = config.secure) === true ? ";secure=" : "";
        }

        if((expires = expires || "") !== "")
        {
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
        if(config !== undefined)
        {
            path = (path = config.path) === undefined ? "/" : path;
            domain = (domain = config.domain) === undefined ? "" : ";domain=" + domain;
        }

        //如果name参数为undefined，则删除所有cookie
        if(name === undefined)
        {
            var reg = /\b([^=;]+)=[^;]*/g, cookie = document.cookie, item;
            while((item = reg.exec(cookie)) != null)
            {
                list += "," + item[1];  //因为可能存在名为空字符串的cookie名称，所以list的最终值的第一个字符应为逗号
            }
        }
        else
        {
            list = "" + name;
        }

        //执行批量删除
        list = list.split(/,\s*/);
        for(var i = 0, len = list.length; i < len; i++)
        {
            document.cookie = list[i] + "=;expires=" + new Date(1).toGMTString() + ";path=" + path + domain;   
        }
    }
});



//====================================================================================================================
//浏览器信息表示以及兼容处理
jQuery.browser = (function()
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
         * 是否为IE6~8浏览器（下面的语句在IE6~8浏览器中返回true，其他浏览器返回false）
         * @type {[type]}
         */
        isLessIE9: !+[1,],

        /**
         * 判断浏览器是否支持Flash插件
         * @return {Boolean}
         */
        canFlash: function()
        {
            var canFlash = false,
                plugins = navigator.plugins;

            if(window.ActiveXObject)
            {
                //For IE
                try
                {
                    //下一行语句如果没有Flash组件，则无法完成创建操作，将会抛出“Automation 服务器不能创建对象”异常
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); 
                    canFlash = true;
                }
                catch(e){}
            }
            else if(plugins)
            {
                //For Firefox、Chrome、Safari、Opera
                for(var i = 0, len = plugins.length; i < len; i++)
                {
                    if(plugins[i].name.toLowerCase().contains("shockwave flash"))
                    {
                        canFlash = true;
                        break;
                    }
                }
            }

            return canFlash;
        },

        /**
         * 设为首页
         * 通常我们都会在网站头部某个位置加上一个“设为首页”的功能，但是没有一个全部兼容的设为首页的方法，所以在此创建一个函数将兼容性处理方法包装起来。
         */
        setHome: function()
        {
            try
            {
                //针对IE浏览器(setHomePage的参数必须是一个完整的网站地址才能正常触发设为首页操作)
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(location.href);
            }
            catch(e)
            {
                //暂时没有找到兼容其他浏览器的方法，在此使用提供功能代替（ASCII码字符：您的浏览器需要手动设置首页。如需获取帮助，请参见“如何把百度设为您的上网主页”！）
                var ok = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01")
                if(ok)
                {
                    window.open("http://www.baidu.com/cache/sethelp/index.html", "_blank");
                }
            }
        },

        /**
         * 加入收藏
         * 基本上（只测试了常用的浏览器，少数浏览没有测试）浏览器将当前页面加入到收藏夹的快捷键是Ctrl+D，但为了吸引用户执行这项操作，通常在页面的某个位置放置了一个类似“加入收藏”的链接。在Firefox和Opera中让该链接的rel="sidebar"可以实现该操作，但是存在瑕疵，所以还是使用JS来执行该操作比较好！
         */
        addFavorite: function()
        {
            try
            {
                //针对IE进行添加操作
                //注：由于安全设置问题，本地文件中没有权限执这行代码。另外在IE中，无法直接执行addFavorite方法，需要通过dom节点的相关事件才能正常触发，
                //    而以IE为内核的360，搜狗等浏览器却可以正常被触发。
                window.external.addFavorite(location.href, document.title);
            }
            catch(e)
            {
                try
                {
                    //针对Firefox进行添加操作
                    //注意：addPanel方法要求网址信息必须是一个绝对且有效的网站地址，所以在本地文件进行测试将无法看到效果
                    window.sidebar.addPanel(document.title, location.href, "");
                }
                catch(e)
                {
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

    if(nameLower !== "chrome" && nameLower === "webkit")
    {
        name = "Safari";
    }
    else if(nameLower === "opr")
    {
        name = "Opera"; //Opera自14.0版本后就使用了Webkit内核，UA字符串中的Opera也因此变更为OPR
    }
    else if(nameLower === "trident" || nameLower === "msie")
    {
        name = "IE"; //IE浏览器从11.0版本开始，在UA中不再包含“MSIE 10.0”类似的信息，与之替代的是：Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
    }

    //针对国产浏览器，使用别名进行识别
    //不知出于什么目的，360浏览器在UA中隐藏了对自身的标识信息，所以无法通过UA对其进行判定。但是360浏览器对部分域名（www.cnzz.com、www.so.com）开放了权限，这些域名通过360浏览器发送请求时，其UA中将带有360SE的信息。
    match = /MetaSr|Maxthon|TheWorld|BIDUBrowser|LBBROWSER|RSEBROWSER|QQBrowser|TencentTraveler|SaaYaa|360SE/i.exec(ua) || [];
    alias = match[0] || "";
    if(alias === "MetaSr")
    {
        alias = "sogou";
    }

    //使IE浏览器兼容HTML5标签
    //并解决IE6中固定定位元素在滚动条滑动时的闪烁效果，即设置：* html{background-image:url(about:blank);}。
    /*----------------------------------
     *说明：截止2012-09-03，Firefox、Chrome、Safari、Opera、IE9等高级浏览器均已支持基本的HTML5标签，但是在IE8及更低版本的IE浏览器中无法使用它们。
     *解决办法：在IE中，只需要通过document.createElement()方法创建一个未被支持的HTML元素，之后就可以正常地使用这个标签了（创建后的标签默认为行内元素，所以还需要通过样式将块状元素的display属性设置为block才行）。
     *=================================================================================*/
    if(browser.isLessIE9)
    {
        tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
        for(i = 0, len = tags.length; i < len; i++)
        {
            document.createElement(tags[i]);
        }
        document.write('<style id="jQuery_selectorStyle">* html{background-image:url(about:blank);}header,footer,aside,article,section,hgroup,nav,menu,canvas,details,figure,figcaption,audio,video{display:block;}</style>')
    }

    //解决IE6浏览器不缓存背景图片的Bug
    /*----------------------------------
     *说明：我们通常需要使用CSS来进行背景图片的设置，但这样在IE6下有一个Bug，那就是IE6默认情况下不缓存背景图片，CSS里每次更改图片的位置时都会重新发起请求，所以当鼠标在有CSS背景的元素上移动时，图片会闪烁甚至鼠标会出现忙的状态。
     *      解决方案一：在CSS中加入如下样式：html { filter: expression(document.execCommand(”BackgroundImageCache”, false, true)); }
     *      使用上述方案可能会影响整个页面的加载速度，所以推荐使用JS来修正这个Bug。
     *=================================================================================*/
    if(browser.isIE6)
    {
        try
        {
            document.execCommand("BackgroundImageCache", false, true);
        }
        catch(e){}
    }

    browser.name = name;
    browser.alias = alias;
    browser.version = version;
    browser.isMobile = /iphone|ipad|android|windows phone|ucweb|fennec|blackberry|touchpad|symbian/i.test(ua);

    return browser;
}());



//====================================================================================================================
//Tween缓动算法的扩展（参考插件：http://gsgd.co.uk/sandbox/jquery/easing/）
//Tween缓动算法Javascript实现方案（参考地址：http://www.cnblogs.com/cloudgamer/archive/2009/01/06/tween.html）
/*---------------------------
 *一、Tween算法中共分为以下几种缓动效果：
 *  1. Linear: 无缓动效果
 *  2. Quad: 二次方的缓动(t^2)
 *  3. Cubic: 三次方的缓动(t^3)
 *  4. Quart: 四次方的缓动(t^4)
 *  5. Quint：五次方的缓动(t^5)
 *  6. Sine: 正弧曲线的缓动(sin(t))
 *  7. Expo: 指数曲线的缓动(2^t)
 *  8. Circ: 圆形曲线的缓动(sqrt(1-t^2)
 *  9. Elastic: 指数衰减的正弧曲线缓动
 *  10. Back: 超过范围的三次方缓动
 *  11. Bounce: 指数衰减的反弹缓动
 *二、以上每种效果都分三个缓动方式：
 *  1. easeIn: 从0开始加速的缓动
 *  2. easeOut: 减速到0的缓动
 *  3. easeInOut: 前半段从0开始加速，后半段减速到0的缓动
 *三、调用该对象时，需要传递4个参数值：
 *  1. t: currentTime —— 运动所在的当前时间（一般为0）
 *  2. b: beginingValue —— 位置的初始值（即left的初始值）
 *  3. c: changeValue —— 需要改变的位置大小（即目标left值 - left初始值）
 *  4. d: durationTime —— 运动所持续的总时间（一般理解为运动的总次数）
 *四、推荐使用：
 *  1. 缓冲-加速       Tween.Quart.easeIn
 *  2. 缓冲-加速-缓冲  Tween.Quart.easeInOut
 *五、特别声明：
 *  1. 在程序中使用上述缓动效果时，需要使用下面代码中所示的组合名称，如"easeOutQuad"——表示减速到0的二次方缓动效果。
 *  2. 下述代码中各缓动算法中的x参数为jQuery内部使用percent，表示的是动画完成的百分比。
 *  3. 下述代码中的"swing"，原本是jQuery中的默认缓动算法，但在这里表示的是自定义设置的"easeOutQuad"缓动方式。
 *  4. 如果需要使用jQuery中的默认缓动算法，请使用"jswing"代替。
 *  5. 如果不需要缓动效果，请使用jQuery默认提供的"linear"表示。
 *==========================================================*/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});



//====================================================================================================================
//URL操作的扩展处理
jQuery.extend({

    /**
     * 为url地址追加新的参数值，并返回最终的url字符串
     * 如果原url没有参数，则新的参数紧跟在?字符后面
     * 如果原url存在参数，则将新的参数添加在&字符后面
     * @param {String} strUrl   url地址
     * @param {String} name  需要追加的参数名称
     * @param {String} value 需要追加的参数值
     * @return {String}
     */
    addUrlQuery: function(strUrl, name, value)
    {
        return /\?/.test(strUrl) ? (strUrl + "&" + name + "=" + value) : (strUrl + "?" + name + "=" + value);
    },

    /**
     * 获取URL地址中的域名部分
     * 如果为非法url，则最终返回空字符串
     * @param  {String} strUrl url地址
     * @return {String}
     */
    getUrlHost: function(strUrl)
    {
        var reg = new RegExp("https?:\/\/([^\/]+)/", "i"),
            strHost = reg.exec(strUrl);

        strHost = strHost !== null ? strHost[1] : "";

        return strHost.split(":")[0];
    },

    /**
     * 获取URL中指定参数的值
     * 如果找不到目标参数，则返回null
     * 如果参数名称通过逗号传递多个，那么将只返回第一个匹配到的参数的值
     * @param  {String} strUrl  url地址
     * @param  {String} strName 参数名称
     * @return {String|Array}   
     */
    getUrlQuery: function(strUrl, strName, combo)
    {
        var strValue = null,
            strSplit = strUrl.split('?'),
            strQuery = strSplit.length > 1 ? strSplit[1].toLowerCase() : "",
            i, len, reg;

        if (strQuery !== "")
        {
            //步骤一：对参数进行组合，并生成一个正则表达式字符串
            strSplit = strName.split(',');
            strName = "";
            for (i = 0, len = strSplit.length; i < len; i++)
            {
                strName += "|(" + strSplit[i] + "=?[^&]*)";
            }
            strName = strName.substring(1);


            //步骤二：正则匹配
            strSplit = new RegExp(strName, "i").exec(strQuery);
            if (strSplit !== null)
            {
                strSplit = strSplit[0];
                strValue = strSplit.indexOf("=") >= 0 ? strSplit.split('=')[1] : "";
            }
        }

        try
        {
            return strValue === null ? null : decodeURIComponent(strValue);
        }
        catch(e)
        {
            return ""; //使用decodeURIComponent在解码URL中文字符碰到%AF等字符时会抛出URIError: URI malformed异常，虽然可以通过unescape方法解码但最后由于UTF-8编码问题会造成乱码，所以最终索性输出空字符串。
        }
    },

    /**
     * 获取网站来源关键词
     * @param  {String} strDefault 来源不是搜索引擎时返回的替代值，默认为空字符串
     * @return {String}
     */
    getKeywords: function(strDefault)
    {
        var strkey = "",
            strReferrer = document.referrer,
            strHost = jQuery.getUrlHost(strReferrer);

        strDefault = strDefault === undefined ? "" : strDefault;
        if(strReferrer === "")
        {
            return strDefault;
        }

        //获取来路内容
        switch(strHost)
        {
            //百度（参数：wd、word）
            //如：http://www.baidu.com/ssid=0/from=844b/bd_page_type=1/uid=EFFBCC57ACA9D737A0AF4A7DBFBD22E1/s?word=%E8%BF%87%E6%95%8F%E6%80%A7%E9%BC%BB%E7%82%8E&st=11104i&ftime=3080&tn=iphone&pu=sz%401320_2001&rawqs=&sug_edit=0&stime=1370341406739&loadtime=3990&mobile_se=1&dit=0&sa=ib
            //    http://m.baidu.com/s?word=%252b%25eb%25d5%252a%25ce%25c4&st=11104i&sa=tb&ts=8347087&ss=11&ix=83%25
            case "www.baidu.com":
            case "m.baidu.com":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "wd,word");
            }
            break;

            //搜狗（参数：query、keyword）
            //如：http://www.sogou.com/web?query=%E9%BC%BB%E7%82%8E&_asf=www.sogou.com&_ast=1397458453&w=01019900&p=40040100&ie=utf8&sut=983&sst0=1397458453491&lkt=0%2C0%2C0
            //    http://wap.sogou.com/web/searchList.jsp?uID=fM67Taja7iHJ5rFO&v=5&w=1274&t=1397458374939&s_t=1397458392267&keyword=%E9%BC%BB%E7%82%8E&pg=webSearchList&s=
            case "www.sogou.com":
            case "wap.sogou.com":
            {
                 strkey = jQuery.getUrlQuery(strReferrer, "query,keyword");
            }
            break;

            //搜搜（参数：w、key）
            //如：http://www.soso.com/q?pid=s.idx&cid=s.idx.se&w=%B9%FD%C3%F4%D0%D4%B1%C7%D1%D7
            //    http://wap.soso.com/sweb/search.jsp?g_f=2405&w=1732&key=%E9%BC%BB%E7%82%8E
            case "www.soso.com":
            case "wap.soso.com":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "w,key");
            }
            break;

            //360（参数：q）
            //如：http://www.so.com/s?ie=utf-8&src=360sou_home&q=%E8%BF%87%E6%95%8F%E6%80%A7%E9%BC%BB%E7%82%8E
            //    http://m.so.com/s?q=%E9%BC%BB%E7%82%8E&src=home
            case "www.so.com":
            case "so.360.cn":
            case "m.so.com":
            {
                 strkey = jQuery.getUrlQuery(strReferrer, "q");
            }
            break;

            //有道（参数：q）
            //如：http://www.youdao.com/search?q=%E9%BC%BB%E7%82%8E&ue=utf8&keyfrom=web.index
            //    http://m.youdao.com/search?q=%E9%BC%BB%E7%82%8E
            case "www.youdao.com":
            case "m.youdao.com":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "q");
            }
            break;

            //新浪搜索（参数：q、key）
            //如：http://search.sina.com.cn/?q=%B1%C7%D1%D7&c=news&from=index
            //    http://site.proc.sina.cn/search/query.php?kind=%E6%90%9C%E6%A0%87%E9%A2%98&key=%E9%BC%BB%E7%82%8E&vt=4
            case "search.sina.com.cn":
            case "site.proc.sina.cn":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "q,key");
            }
            break;

            //中国搜索网（参数：q）
            //如：http://www.chinaso.com/search/pagesearch.htm?q=%E9%BC%BB%E7%82%8E
            case "www.chinaso.com":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "q");
            }
            break;

            //必应搜索（参数：q）
            //如：http://cn.bing.com/search?q=%E9%BC%BB%E7%82%8E&qs=n&form=QBLH&pq=%E9%BC%BB%E7%82%8E&sc=8-2&sp=-1&sk=
            case "cn.bing.com":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "q");
            }
            break;

            //谷歌（参数：q）
            //如：https://www.google.com.hk/#newwindow=1&q=%E9%BC%BB%E7%82%8E&safe=strict
            //    http://www.google.com.hk/search?q=%E9%BC%BB%E7%82%8E&newwindow=1&safe=strict&oq=%E9%BC%BB%E7%82%8E&gs_l=mobile-heirloom-serp.3...2314.2876.0.3096.7.5.0.1.1.0.0.0..0.0....0...1c.1j4.34.mobile-heirloom-serp..7.0.0.6JsjAbGTf84
            case "www.google.com":
            case "www.google.com.hk":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "q");
            }
            break;

            //雅虎中国（参数：p）
            //如：https://sg.search.yahoo.com/search;_ylt=A0LEV2qFlUtTBgMAuXgi4gt.;_ylc=X1MDMjExNDcwODAwMgRfcgMyBGJjawNlcjM2anJwOWhkazNpJTI2YiUzRDMlMjZzJTNEajUEZnIDBGdwcmlkAwRtdGVzdGlkA251bGwEbl9yc2x0AzAEbl9zdWdnAzAEb3JpZ2luA3NnLnNlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDMgRxdWVyeQ7gR0X3N0bXADMTM5NzQ2MjQyNzQ1OQR2dGVzdGlkA251bGw-?pvid=YsT00jk4LjHtjNPeUxbQcgJtMTE4LlNLlYX_5.XY&p=%E9%BC%BB%E7%82%8E&fr=sfp&fr2=&iscqry=
            case "search.cn.yahoo.com":
            case "sg.search.yahoo.com":
            {
                strkey = jQuery.getUrlQuery(strReferrer, "p");
            }
            break;
        }

        return strkey === "" || strkey === null ? strDefault : strkey;
    }
});

//对搜索来源以及搜索关键词进行赋值
var referrer_url = document.referrer,
    referrer_host = jQuery.getUrlHost(referrer_url),                                //来源域名
    referrer_true = referrer_host !== "" && referrer_host !== location.hostname,    //是否为真实有效的搜索引擎或者引荐来源的地址
    search_keywords = jQuery.getCookie("search_keywords"),
    search_source = jQuery.getCookie("search_source");

if(search_keywords === null || referrer_true)
{
    search_keywords = jQuery.getKeywords(); //获取来源关键字
    jQuery.setCookie("search_keywords", search_keywords);
}
if(search_source === null || referrer_true)
{
    search_source = referrer_true ? referrer_url : ""; //获取来源地址
    jQuery.setCookie("search_source", search_source);
}

jQuery.search_source = search_source;       //搜索来源，如果不是搜索引擎来源则返回空字符串
jQuery.search_keywords = search_keywords;   //搜索关键词，如果不是搜索引擎来源则返回空字符串



//====================================================================================================================
//核心特效组件
//============
/**
 * <<侧栏跟随>><<不支持IE6、7浏览器>>
 * 针对侧栏高度与主体内容高度之间的高度差，为了保证侧栏始终都有内容显示，
 * 特此设定为——侧栏中末尾的某个模块的位置将随着浏览器滚动条的滚动而进行相应的调整，从而使其始终可见。
 * 如果需要实现侧栏中末尾的多个模块进行侧栏跟随，则需要为这些模块添加一个外围容器。
 * @param  {Object} [params]  参数配置
 * @param  {Number} params.distanceToTop 侧栏跟随时，模块需要距离文档可视区顶部的位置偏移量（目标元素的高度小于等于文档可视区高度时有效），默认为0
 * @param  {Number} params.distanceToBottom 侧栏跟随时，模块需要距离文档底部的最小高度（目标元素的高度小于等于文档可视区高度时有效），默认为0，表示无规定
 */
jQuery.fn.scrollWith = function(params)
{
    /* 实现说明：
     * =========================================================================================
     * 一、 当浏览器滚动条的scrollTop值小于等于目标元素位于文档Y轴的坐标位置时，则默认为静态定位
     * 
     * 二、 当目标元素的高度小于等于文档可视区高度时
     *   1. 当（浏览器滚动条的scrollTop值+目标元素的高度值）大于内容容器底部距离文档最顶部的距离时，将其定位在侧栏容器的底部
     *   2. 否则，将目标元素固定定位至文档可视区的顶部！
     *
     * 三、 当目标元素的高度大于文档可视区高度时
     *   1. 当（浏览器滚动条的scrollTop值+文档可视区高度）大于内容容器底部距离文档最顶部的距离时，将其定位在侧栏容器的底部
     *   2. 当（浏览器滚动条的scrollTop值+文档可视区高度）大于目标元素底部距离文档最顶部的距离时，将定位在文档可视区的底部
     */
    
    //不提供对IE6、7的支持（截止2013-12-30，大陆IE6、7的用户比例占有14%左右）
    if(!document.querySelectorAll) return this;

    //参数匹配
    params = jQuery.extend({
        distanceToTop: 0,
        distanceToBottom: 0
    }, params);

    //公共对象
    var $win = jQuery(window),
        $doc = jQuery(document);

    return this.each(function(index, ele)
    {
        //为了保证容器高度能够获取正常，需放在文档加载完毕后执行侧栏跟随
        $win.bind("load", function()
        {
            var 
                $ele = jQuery(ele),                         //目标元素
                $aside = $ele.parent(),                     //侧栏容器
                $content = $aside.parent(),                 //内容容器
                conH = $content.outerHeight(),              //内容容器的整体高度（包括padding、border）
                conTop = $content.offset().top,             //内容容器距离文档最顶部的距离
                conB2Top = conTop + conH,                   //内容容器底部距离文档最顶部的距离（变量名可读为：content bottom to top）
                eleH = $ele.outerHeight(),                  //目标元素的整体高度（包括padding、border）
                eleHT = eleH + params.distanceToTop,        //目标元素高度+侧栏跟随时顶部偏移距离
                eleTop = $ele.offset().top,                 //目标元素距离文档最顶部的距离
                isLast = ("nextElementSibling" in ele ? ele.nextElementSibling : ele.nextSibling) === null, //目标元素是否位于侧栏的最末尾
                stateNum = 0,                               //定位状态，0表示静态定位，1表示非静态定位
                bodyH = $win.height();

            $aside.css("position") === "static" && ($aside.css("position", "relative"));

            //如果目标元素不是位于侧栏的末尾，则需要做相关兼容处理
            if(!isLast)
            {
                eleTop = $aside.offset().top + $aside.height();
            }

            $win.bind(
            {
                "scroll": doFollow,
                "resize": function()
                {
                    var height = $win.height();
                    if(bodyH !== height)
                    {
                        bodyH = height;
                        doFollow();
                    }
                }
            });
            doFollow();

            function doFollow()
            {
                var
                    bodyST = $doc.scrollTop(),              //文档滚动条的距离  
                    conB2Bottom,                            //内容容器底部距离文档最底部的距离（变量名可读为：content bottom to Bottom）
                    eleB2Bottom;                            //目标元素底部需要与侧栏容器底部保持的距离（变量名可读为：ele bottom to bottom）

                //恢复静态定位
                if(bodyST <= eleTop)
                {
                    if(!isLast && stateNum === 1)
                    {
                        stateNum = 0;
                    }
                    $ele.css({position: "static"});
                    return;
                }

                $aside.height($content.height()); //将侧栏的高度设置为内容容器的内容高度
                conB2Bottom = $doc.height() - conB2Top;
                eleB2Bottom = (eleB2Bottom = params.distanceToBottom - conB2Bottom) > 0 ? eleB2Bottom : 0;

                //当目标元素的高度小于等于文档可视区高度时
                if(eleHT <= bodyH)
                {
                    (bodyST + eleHT > conB2Top - eleB2Bottom) ?
                        $ele.css({position: "absolute", top: "auto", bottom: eleB2Bottom + "px"}) :
                        $ele.css({position: "fixed", top: (params.distanceToTop - parseInt($ele.css("marginTop"))) + "px", bottom: "auto"});
                }
                //当目标元素的高度大于文档可视区高度时
                else
                {
                    if(bodyST + bodyH > conB2Top - eleB2Bottom)
                    {
                        $ele.css({position: "absolute", top: "auto", bottom: eleB2Bottom + "px"});
                    }
                    else if(bodyST + bodyH > eleTop + eleH)
                    {
                        $ele.css({position: "fixed", top: "auto", bottom: "0"});
                    }
                }

                //如果不是最后一个侧栏模块进行跟随，则在定位的时候实现淡入效果
                if(!isLast && stateNum === 0)
                {
                    $ele.hide().stop().fadeIn();
                    stateNum = 1;
                }
            }
        });
    });
};

/**
 * <<选项卡切换>>
 * @param  {Object} [params] 参数配置
 * @param  {String} params.trigger 触发方式，默认为"mouseover"（鼠标悬浮切换），也可设置为“click”（点击切换）
 * @param  {Boolean} params.auto 是否自动切换，默认为false
 * @param  {Number} params.delay 自动切换时的时间间隔，默认为3000（单位：毫秒）
 * @param  {Number} params.duration 具有切换效果时的效果持续时间，默认为400（单位：毫秒）
 * @param  {Number} params.easing 进行动画效果时的缓动算法，默认为swing
 * @param  {String} params.effect 切换方式，默认无效果，"fade"-淡入，"scrollx"-水平滚动，"scrolly"-垂直滚动。
 * @param  {Function} callback 切换之前所需执行的回调函数——function(old, cur){}，old参数表示前一个显示的选项卡的索引，cur参数表示当前需要显示的选项卡的索引
 * @return {jQuery}        原jQuery对象
 */
jQuery.fn.tabChange = function(params, callback)
{
    //回调函数的正确赋值
    if(typeof params === "function")
    {
        callback = params;
        params = {};
    }

    //默认参数与传递参数合并
    params = jQuery.extend({
        trigger: "mouseenter",
        auto: false,
        delay: 3000,
        duration: params && params.effect === "fade" ? 200 : 400,
        easing: "swing",
        effect: ""
    }, params);
    params.trigger !== "click" && (params.trigger = "mouseenter");  //切换方式仅支持点击和悬浮，悬浮事件选用mouseenter代替mouseover是为了避免事件冒泡导致意外的发生

    //针对每个元素集合进行处理
    return this.each(function(index, ele)
    {
        var $ele = $(ele),
            $children = $ele.children(),//选项卡容器下的子节点
            length = $children.length,  //选项卡容器下的子节点的数量
            oldIndex = 0,               //原有显示的标题所在的索引位置
            isPaused = false,           //是否处于暂停切换状态
            stopAuto = 0,               //setTimeout的id
            scrollValue = 0,            //滚动效果时容器的宽度或者高度
            $sportWrap,                 //需要滚动的容器
            $titles,                    //标题集合
            $contents,                  //内容集合
            links = [];                 //与标题对应的链接集合

        //处理：选项卡结构的分析
        if(length < 2)
        {
            return;
        }
        //结构：section{标题1, 内容1}, section{标题2, 内容2}, section{标题3, 内容3}
        else if($children[0].tagName.toLowerCase() === "section")
        {
            $titles = $children.children().filter(":even");
            $contents = $titles.next();
        }
        //结构：div{标题1,标题2,标题3}，div{内容1,内容2,内容3}
        else if(length === 2)
        {
            $titles = $children.eq(0).children();
            $contents = $children.eq(1).children();

            //为滚动效果构建结构
            if(params.effect === "scrollx")
            {
                scrollValue = $children.eq(1).width();
                $contents.css({float: "left", display: "block"}).wrapAll("<div style='position:relative;width:" + scrollValue * $contents.length + "px;'></div>");
                $sportWrap = $contents.eq(0).parent();
            }
            else if(params.effect === "scrolly")
            {
                scrollValue = $children.eq(1).height();
                $contents.css({display: "block"}).wrapAll("<div style='position:relative;height:" + scrollValue * $contents.length + "px;'></div>");
                $sportWrap = $contents.eq(0).parent();
            }
        }
        //结构：div{标题1,内容1,标题2,内容2,标题3,内容3}
        else
        {
            $titles = $children.filter(":even");
            $contents = $titles.next();
        }
        length = $titles.length;  //选项卡切换项的个数

        //处理：为标题元素添加事件
        $titles.each(function(index, ele)
        {
            var $ele = $(ele), isCurrent = $ele.hasClass("sele");

            //更新当前显示项的索引值
            if(isCurrent){ oldIndex = index; } 

            //添加事件触发
            $ele.on(params.trigger, function()
            {
                doShow(index);
            });

            //在标题链接获得焦点时进行切换
            var link, linkTitle, $linkItem;
            if(ele.tagName.toLowerCase() === "a")
            {
                link = ele;
            }
            else if((linkTitle = ele.getElementsByTagName("a")).length > 0)
            {
                link = linkTitle[0];
            }
            if(link)
            {
                $linkItem = $(link);
                $linkItem.focus(function()
                {
                    doShow(index);
                    doPause(); 
                })
                params.auto && $linkItem.blur(doPlay);
                
                //如果为点击切换，则标题链接仅在选中状态、或者有功能按键的情况下有效
                if(params.trigger === "click")
                {
                    isCurrent && (link.on = true);
                    $linkItem.click(function(e)
                    {
                        !(this.on || e.ctrlKey || e.shiftKey || e.altkey) && e.preventDefault();
                        this.on = true;
                    });
                }

                links[index] = link;
            }
        });

        //自动切换时，鼠标悬浮在标题或者内容的上方时将暂停切换操作
        //当鼠标移出后，恢复自动切换
        params.auto && $ele.on({
            "mouseenter": doPause,
            "mouseleave": doPlay
        });

        //默认执行一次(可以处理IE6中标题浮动导致内容定位被隐藏的bug问题）
        doShow(oldIndex, true);

        //检测是否自动
        doAuto();

        //动作：显示
        function doShow(current, doMust)
        {
            if(oldIndex !== current || doMust)
            {
                callback !== undefined && !doMust && callback.call(ele, oldIndex, current);
                $titles.eq(oldIndex).removeClass("sele").end().eq(current).addClass("sele");
                switch(params.effect)
                {
                    //淡出
                    case "fade":
                        $contents.eq(oldIndex).hide().end().eq(current).fadeIn(params.duration, params.easing);
                        break;

                    //水平滚动
                    case "scrollx":
                        scrollValue !== 0 && $sportWrap.stop().animate({left: -scrollValue * (current)}, doMust ? 0 : params.duration, params.easing);
                        break;

                    //垂直滚动
                    case "scrolly":
                        scrollValue !== 0 && $sportWrap.stop().animate({top: -scrollValue * (current)}, doMust ? 0 : params.duration, params.easing);
                        break;
                }
                $contents.eq(oldIndex).removeClass("show").end().eq(current).addClass("show");   
                links[oldIndex] !== undefined && (links[oldIndex].on = false);
                oldIndex = current;
                doAuto();
            }
        }
        
        //动作：自动切换
        function doAuto()
        {
            if(params.auto && !isPaused)
            {
                clearTimeout(stopAuto);
                stopAuto = setTimeout(function()
                {
                    var current = oldIndex + 1;
                    doShow(current === length ? 0 : current);
                }, params.delay);
            }
        }
        
        //动作：暂停
        function doPause()
        {
            isPaused = true;
            clearTimeout(stopAuto);
        }
        
        //动作：播放
        function doPlay()
        {
            isPaused = false;
            doAuto();
        }
        
    });
};

/**
 * <<幻灯片（同样适用于图层滚动）>>
 * @param  {Object} [config] 参数配置
 * @param  {String} config.contents 用来表示内容列表的查询字符串，默认为：>.content>ul>li
 * @param  {String} config.tags 用来表示标签列表的查询字符串，默认为：>.tag>ul>li
 * @param  {String} config.trigger 触发方式，默认为"mouseover"（鼠标悬浮切换），也可设置为“click”（点击切换）
 * @param  {Boolean} config.auto 是否自动切换，默认为false
 * @param  {Number} config.delay 自动切换时的时间间隔，默认为3000（单位：毫秒）
 * @param  {Number} config.duration 具有切换效果时的效果持续时间，默认为400（单位：毫秒）
 * @param  {Number} config.easing 进行动画效果时的缓动算法，默认为swing
 * @param  {String} config.effect 切换方式，默认无效果，"none"-无效果，"fade"-淡入淡出，"fadeIn"-仅淡入效果，scrollx"-垂直滚动，"scrolly"-水平滚动。
 * @param  {Number} config.scrollNums 每次切换将滚动几张图片，默认为1
 * @param  {Number} config.scrollLen 每次切换将滚动的单位长度（按单张图片的宽度或高度计算），默认为1
 * @param  {Number} config.cansee 可视图片的张数，默认为1
 * @param  {Number} config.cur 默认显示的幻灯片的索引，默认为0
 * @param  {Number} config.appends 特殊无缝结构的附加量，默认为0，仅针对无缝结构有效
 * @param  {Boolean} config.keepTags 是否保留标签项的内容，默认为false
 * @param  {Boolean} config.seamless 是否实现无缝结构，默认为false
 * @param  {Boolean} config.slideText 是否将幻灯片对应的文本内容动画滑出，默认为false
 * @param  {Boolean} config.doMarquee 是否执行无缝滚动效果，默认为false
 * @param  {Boolean} config.speed 用来设置无缝滚动执行时的速度，“fase”-快速、“normal”-正常、“slow”-缓慢
 * @param  {Function} callback 切换之前所需执行的回调函数——function(old, cur, config){}，old参数表示前一个显示的索引项，cur参数表示当前需要显示的索引项，config表示本次效果的参数配置，this指向内容列表的jQuery对象
 * @return {jQuery}        原jQuery对象
 */
jQuery.fn.doSlide = function(config, callback)
{
    //回调函数的正确赋值
    if(typeof config === "function")
    {
        callback = config;
        config = {};
    }

    //默认参数与传递参数合并
    config = jQuery.extend({
        contents: ">.content>ul>li",
        tags: ">.tag>ul>li",
        trigger: "mouseenter",
        auto: false,
        delay: 3000,
        duration: 400,
        easing: "jswing",
        effect: "none",
        scrollLen: 1,
        scrollNums: 0,
        cansee: 1,
        cur: 0,
        appends: 0,
        keepTags: false,
        seamless: false,
        slideText: false,
        doMarquee: false,
        speed: "normal"
    }, config);
    config.trigger !== "click" && (config.trigger = "mouseenter");      //切换方式仅支持点击和悬浮，悬浮事件选用mouseenter代替mouseover是为了避免事件冒泡导致意外的发生
    config.scrollNums === 0 && (config.scrollNums = config.scrollLen);   //默认情况下scrollNums与scrollLen的值一致
    config.effect.indexOf("s") !== 0 && config.effect.indexOf("m") !== 0 && (config.seamless = false);  //无缝结构仅针对滚动效果有效
    config.doMarquee && (config.seamless = true);            //无缝滚动效果必须是无缝结构

    //针对每个元素集合进行处理
    return this.each(function(index, ele)
    {
        //如果已经对该元素进行了操作，则直接从缓存中取出
        if(typeof jQuery.data(ele, "slide_doPlay") === "function")
        {
            jQuery.data(ele, "slide_doPlay")();
            return;
        }

        //常用对象、变量
        var $ele = jQuery(ele),
            $wrap = $ele.find(".content"),              //内容容器
            $contents = $ele.find(config.contents),    //内容列表
            $contentsParent = $contents.parent(),       //内容列表的父节点
            $tags = $ele.find(config.tags),             //标签列表
            $links = $tags.children("a"),               //标签项的链接集合
            $posCur = $ele.find("span.pos-cur"),        //显示当前页的容器
            $posTotal = $ele.find("span.pos-total"),    //显示总页数的容器
            $btnPrev = $ele.find(".btnPrev"),           //向前按钮
            $btnNext = $ele.find(".btnNext"),           //向后按钮
            effect = config.effect,                     //参数变量简写
            scrollNums = config.scrollNums,             //参数变量简写
            cansee = config.cansee,                     //参数变量简写
            seamless = config.seamless,                 //参数变量简写
            appends = config.appends,                   //参数变量简写
            duration = config.duration,                 //参数变量简写
            amount = $contents.length,                  //内容列表的总数
            pages = Math.floor(amount / scrollNums) + (amount % scrollNums === 0 ? 0 : 1),     //所拥有的总页数
            scrollBase = effect === "scrollx" ? $contents.outerWidth(true) : $contents.outerHeight(true),   //滚动效果时每单位的距离
            scrollValue = scrollBase * config.scrollLen,//实际滚动效果时应该移动的距离
            oldIndex = config.cur,                      //现有显示内容所在的页数
            minIndex = 0,                               //内容项的最小索引
            isMouseente = config.trigger === "mouseenter", //是否是鼠标悬浮触发
            isPaused = false,                           //自动切换时是否处于暂停状态
            stopDelay = 0, stopAuto = 0,                //setInterval和setTime的id
            lastNums, scrollMax,                        //“scrollx”效果所需的处理变量
            marqueeNext = true,                         //无缝滚动的方向是否为：显示下一张图片
            speed,                                      //保存无缝滚动的速度值
            direct, doStyle,                            //scrollx和scrolly效果所需变量
            i = 0, str = "";

        //如果内容列表的数量没有超过可视的图片张数，则不执行后续操作
        if(amount <= cansee) return;

        //针对无缝滚动的执行做不同处理
        if(config.doMarquee)
        {
            //对滚动速度进行赋值
            speed = typeof(speed = config.speed) === "number" ? speed : {slow: 50, normal: 25, fast: 10, faster: 5}[config.speed];

            //移除非必要的组件
            $ele.children(".tag, .pos").remove();

            //按钮处理
            $btnPrev.click(function()
            {
                marqueeNext = false;
                doMarquee();
            });
            $btnNext.click(function()
            {
                marqueeNext = true;
                doMarquee();
            });
        }
        else
        {
            //针对“scrollx”和“scrolly”效果的变量处理
            if(effect.indexOf("s") === 0)
            {
                if(!seamless)
                {   
                    pages = pages - Math.floor((cansee - scrollNums) / scrollNums);
                    lastNums = cansee % scrollNums === 0 && amount % scrollNums === 0 ? scrollNums : amount - ((pages - 2) * scrollNums + cansee);     //最后一页需要滚动的图片张数
                    scrollMax = scrollValue * (pages - 2) + lastNums * scrollBase; //最大允许移动的距离   
                }
                if($contentsParent.is($wrap))
                {
                    $contentsParent = $contents.wrapAll("<div></div>").parent();
                }
            }

            //针对tag标签项的处理
            if($tags.length)
            {
                //重写tag标签项
                if(!config.keepTags)
                {
                    for(; i < pages; )
                    {
                        str += "<li>" + (++i) + "</li>";
                    }
                    $tags = $tags.parent().html(str).children();
                }

                //对每个标签项添加索引说明
                $tags.each(function(index, ele)
                {
                    jQuery.data(ele, "index", index);
                });

                //添加事件处理
                $tags.bind(config.trigger, function()
                {
                    var index = jQuery.data(this, "index");

                    clearTimeout(stopDelay);
                    stopDelay = setTimeout(function()
                    {
                        doShow(index + minIndex);
                    }, isMouseente ? 100 : 0); //鼠标悬浮延时处理
                });
                isMouseente && $tags.bind("mouseleave", function()
                {
                    clearTimeout(stopDelay);
                });

                //标签项获得焦点时也触发切换操作
                $links.focus(function()
                {
                    var index = jQuery.data(this.parentNode, "index");
                    doShow(index + minIndex);
                    doPause();
                });
                config.auto && $links.blur(doPlay);

                //如果为点击切换，则标签项的链接仅在选中状态、或者有功能按键的情况下有效
                if($links.length > 0 && config.trigger === "click")
                {
                    $links[oldIndex] !== undefined && ($links[oldIndex].on = true);
                    $links.click(function(e)
                    {
                        !(this.on || e.ctrlKey || e.shiftKey || e.altkey) && e.preventDefault();
                        this.on = true;
                    });
                }
            }

            //页数显示情况
            $posCur.html(oldIndex + 1);
            $posTotal.html(pages);

            //按钮点击
            $btnPrev.click(function()
            {
                doShow(oldIndex - 1);
            });
            $btnNext.click(function()
            {
                doShow(oldIndex + 1);
            });
        }

        //针对无缝滚动进行额外处理
        if(seamless)
        {
            var $clonePrefix = $contents.slice(-scrollNums*(1 + appends)).clone(true).addClass("clone"),
                $cloneAfter = $contents.slice(0, cansee + appends).clone(true).addClass("clone");

            $contents = $contentsParent.prepend($clonePrefix).append($cloneAfter).children();
            pages += 1 + appends;
            minIndex += 1 + appends;
            oldIndex += 1 + appends;
        }

        //对滚动效果进行样式处理
        switch(effect)
        {
            case "fade":
                $contents.css("position") !== "absolute" && $contents.css({position: "absolute", left: "0", top: "0" });
                $contents.hide().eq(oldIndex).show();
                break;

            case "scrollx":
                if($contents.width() == $(window).width())
                {
                    //这里针对100%宽度的幻灯片切换做对应处理
                    $contents.css("width", scrollBase);    
                    $(window).resize(function()
                    {
                        scrollValue = scrollBase = $(window).width();
                        scrollMax = scrollValue * (pages - 2) + lastNums * scrollBase;
                        $contents.css("width", scrollBase);
                        doShow(oldIndex, true);
                    });
                }
                $contentsParent.css({width: (pages + (seamless ? 4 : 1)) * 100 + "%"});
                doStyle = $wrap.css("overflow") === "visible";  //是否通过style对象的left属性来实现滚动效果，默认通过scrollLeft实现，该值的判断主要用来实现100%宽度（多图片展示）切换效果的实现
                direct = doStyle ? "left" : "scrollLeft";
                break;

            case "scrolly":
                $contentsParent.css({width: "110%"});
                direct = "scrollTop";
                break;
        }

        //自动切换时，鼠标悬浮在标题或者内容的上方时将暂停切换操作
        //当鼠标移出后，恢复自动切换
        config.auto && $ele.on({
            "mouseenter": doPause,
            "mouseleave": doPlay
        });

        //事先执行一次
        doShow(oldIndex, true);

        //动作：显示
        function doShow(index, doMust)
        {
            //是否能够继续执行
            if(oldIndex === index && !doMust) return;

            //确定是往前走，还是往后走
            var type = index > oldIndex || (index === minIndex && oldIndex === pages) ? "next" : "prev";

            //用于回调函数使用，确保在回调函数中的oldIndex参数指向滚动前显示内容项所在的索引位置
            var _oldIndex = oldIndex;

            //纠正正确的显示页数
            if(seamless && effect.indexOf("scroll") >= 0)
            {
                if(type === "prev" && index === appends)
                {
                    index = pages - 1;
                    _oldIndex = pages;
                    doStyle ? $contentsParent.css(direct, -scrollValue * pages) : $wrap[direct](scrollValue * pages);
                }
                else if(type === "next" && index === pages)
                {
                    index = minIndex;
                    _oldIndex = 0;
                    doStyle ? $contentsParent.css(direct, -scrollValue*appends) : $wrap[direct](scrollValue*appends);
                }
            }
            else
            {
                if(type === "prev")
                {
                    index = index < minIndex ? pages - 1 : index;
                }
                else if(type === "next")
                {
                    index = index >= pages ? minIndex : index;
                }
            }

            //更新状态
            callback !== undefined && !doMust && callback.call($contents, _oldIndex, index, config);   //回调函数
            $tags.removeClass("sele").eq(seamless ? index - 1 - appends : index).addClass("sele");     //更新标签项的选中状态
            $posCur.html(seamless ? index : index + 1);    //更新当前页数的显示
            if($links.length)
            {
                //更新标签项的链接的状态
                $links[seamless ? oldIndex - 1 : oldIndex].on = false;
                $links[seamless ? index - 1 : index].on = true;
            }

            //将幻灯片对应的文本内容动画滑出
            if(config.slideText)
            {
                var $oldText = $contents.eq(_oldIndex).find(".text"),
                    $curText = $contents.eq(index).find(".text");

                $oldText.show().slideUp(200);
                $curText.hide();
                setTimeout(function()
                {
                    $curText.slideDown(200);  
                }, effect === "none" ? 0 : duration - 100);   
            }

            //执行效果动画
            switch(effect)
            {
                //无效果
                case "none":
                    $contents.hide().slice(scrollNums * index, scrollNums * (index + 1)).show();
                    break;

                //淡入淡出
                case "fade":
                    $contents.eq(oldIndex).fadeOut();
                    $contents.eq(index).fadeIn();
                    break;

                //仅淡入效果
                case "fadeIn":
                    $contents.hide().slice(scrollNums * index, scrollNums * (index + 1)).fadeIn();
                    break;

                //水平滚动
                case "scrollx":
                    doStyle ? $contentsParent.stop().animate({left: !seamless && index === pages - 1 ? -scrollMax : -scrollValue * (index)}, doMust ? 0 : duration, config.easing) : 
                              $wrap.stop().animate({scrollLeft: !seamless && index === pages - 1 ? scrollMax : scrollValue * (index)}, doMust ? 0 : duration, config.easing);
                    break;

                //垂直滚动
                case "scrolly":
                    $wrap.stop().animate({scrollTop: !seamless && index === pages - 1 ? scrollMax : scrollValue * (index)}, doMust ? 0 : duration, config.easing);
                    break;
            }  

            oldIndex = index;  //更新现有显示内容所在的页数
            doAuto();          //检测是否自动
        }
        
        //动作：自动切换
        function doAuto()
        {
            if(config.doMarquee)
            {
                doMarquee();
            }
            else if(config.auto && !isPaused)
            {
                clearTimeout(stopAuto);
                stopAuto = setTimeout(function()
                {
                    doShow(oldIndex + 1);
                }, config.delay);
            }
        }
        
        //动作：暂停
        function doPause()
        {
            isPaused = true;
            clearTimeout(stopAuto);
            clearInterval(stopAuto);
        }
        
        //动作：播放
        function doPlay()
        {
            isPaused = false;
            doAuto();
        }

        //动作：无缝滚动
        function doMarquee()
        {
            var 
                ele = $wrap[0],
                value = ele[direct],
                num = marqueeNext ? 1 : -1,
                maxValue = scrollBase * pages;

            clearInterval(stopAuto);
            stopAuto = setInterval(function()
            {
                value += num;
                if(marqueeNext && value >= maxValue)
                {
                    value = scrollValue*minIndex;
                }
                else if(!marqueeNext && value <= scrollBase * minIndex)
                {
                    value = scrollValue * pages;
                }
                ele[direct] = value;
            }, speed);
        }

        //将暂停和播放两个方法供外部调用
        jQuery.data(ele, "slide_doPause", doPause);
        jQuery.data(ele, "slide_doPlay", doPlay);
        
    });
};
//暂停幻灯片播放
jQuery.fn.stopSlide = function()
{
    return this.each(function(index, ele)
    {
        typeof jQuery.data(ele, "slide_doPause") === "function" && (jQuery.data(ele, "slide_doPause")());
    });
};


//====================================================================================================================
//实用小部件（用于简单的页面交互）
jQuery.extend({

    /**
     * 将页面滚动条定位至目标位置
     * @param  {Number|jQuery}   pos      需要滚动至的具体位置，也可以传递一个jQuery对象或者jQuery函数调用所支持的选择器字符串来表示目标元素所在的位置
     * @param  {Function} callback 操作完成后的回调函数
     * @return {undefined}         
     */
    scrollTo: function(pos, callback)
    {
        //确定目标位置
        if(pos == undefined || pos === "") return;
        var position = typeof pos == "number" ? pos : jQuery(pos).offset().top;

        //获得有效的目标对象（文档scrollTop的设置和获取在不同浏览器中存在差异）
        var oBody = document.body, value = oBody.scrollTop;
        oBody.scrollTop = value + 1;
        oBody.scrollTop === 0 && (oBody = document.documentElement);

        //执行动画（虽然可以使用jQuery("html,body")来绑定事件，但是这样回调函数会被调用两次）
        jQuery(oBody).animate({scrollTop: position}, 600, callback);
    }
});



//====================================================================================================================
//原型扩展与兼容处理
var arrayPrototype = Array.prototype, stringPrototype = String.prototype;
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
arrayPrototype.unique === undefined && (arrayPrototype.unique = function()
{
    //返回目标数组去除重复值之后所组成的新数组（不排序，原数组的值不受影响）。
    //该方法在最新版的ECMAScript6中依旧不被支持。
    var output = [],  //最终输出结果
        result = {},  //用于结果判断
        i = 0,
        len = this.length,
        num;

    for(; i < len; )
    {
        num = this[i++];
        if(result[num] === undefined)
        {
            result[num] = 1;     //使用1来表示目标结果已加入新的数组中
            output.push(num);    //保存唯一值
        }
    }
    return output;
});
arrayPrototype.remove = function(val)
{
    //删除原数组中与参数val的值相等的所有元素，并返回原数组（原数组中的值将会受到影响）。
    //该方法在最新版的ECMAScript6中依旧不被支持。
    //参数val：（类型：Object）需要删除的元素值；
    var idx;

    while((idx = this.indexOf(val)) !== -1)
    {
        this.splice(idx, 1);
    }
    return this;
};
window.asc = function(a, b){ return a > b ? 1 : -1; }; //升序
window.desc = function(a, b){ return a < b ? 1: -1; }; //降序
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



//====================================================================================================================
//兼容老版本的JSFrame.js中的部分函数
window.Extend = {};
Extend.tabChange = function(id, eventName, autoChange, delay)
{
    jQuery("#" + id).tabChange({trigger: eventName, auto: autoChange, delay: delay});
}
Extend.scrollWith = function(id)
{
    var $ele = jQuery(id);
    $ele.children().wrapAll("<div id='" + (id += "Inner") + "'></div>");
    jQuery(id).scrollWith();
}

})(window, jQuery);