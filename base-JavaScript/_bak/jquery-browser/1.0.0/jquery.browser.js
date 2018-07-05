/**
 * @file        集成于jQuery中，用于提供与浏览器相关的操作和判断
 * @version     1.0.0
 * @author      龙泉 <yangtuan2009@126.com>
 */

(function(jQuery){

    jQuery.extend({

        /**
         * 是否为IE6浏览器（IE6不支持window.XMLHttpRequest属性）
         * @type {Boolean}
         */
        isIE6: !window.XMLHttpRequest,

        /**
         * 是否为IE6~8浏览器（IE6~8不支持document.getSelection属性）
         * @type {Boolean}
         */
        isLessIE9: !document.getSelection,

        /**
         * 是否为移动设备
         * @type {Boolean}
         */
        isMobile: /iphone|ipad|itouch|android|windows phone|mobile|ucweb|fennec|blackberry|touchpad|symbianos/i.test(navigator.userAgent),

        /**
         * 判断浏览器是否支持Flash
         * @return {Boolean}
         */
        canFlash: function()
        {
            var canFlash = false,
                plugins = navigator.plugins;

            if(window.ActiveXObject){

                try{
                    //For IE：下面的语句如果没有Flash组件，则无法完成创建操作，将会抛出“Automation 服务器不能创建对象”异常
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    canFlash = true;
                }
                catch(e){}
            }
            else if(plugins){

                //For Firefox、Chrome、Safari、Opera
                for(var i = 0, len = plugins.length; i < len; i++){
                    if(plugins[i].name.toLowerCase().indexOf("shockwave flash") >= 0){
                        canFlash = true;
                        break;
                    }
                }
            }

            return canFlash;
        },

        /**
         * 设为首页
         */
        setHome: function()
        {
            try{
                //针对IE浏览器(setHomePage的参数必须是一个完整的网页URL才能正常触发设为首页操作)
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(location.href);
            }
            catch(e){
                //暂时没有找到兼容其他浏览器的方法，在此使用提示来代替（ASCII码字符：您的浏览器需要手动设置首页。如需获取帮助，请参见“如何把百度设为您的上网主页”！）
                var ok = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01")
                ok && window.open("http://www.baidu.com/cache/sethelp/index.html", "_blank");
            }
        },

        /**
         * 加入收藏
         */
        addFavorite: function()
        {
            try{
                //针对IE进行添加操作
                //注：由于安全设置问题，本地文件中没有权限执这行代码。
                //另外在IE中，无法直接执行addFavorite方法，需要通过dom节点的相关事件才能正常触发，而以IE为内核的360、搜狗等浏览器却可以正常被触发。
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
    });

    //使低版本IE浏览器兼容常用的HTML5语义标签
    //并解决IE6中固定定位元素在滚动条滑动时的闪烁效果，即设置：* html{background-image:url(about:blank);}。
    /*----------------------------------
     *说明：截止2012-09-03，Firefox、Chrome、Safari、Opera、IE9等高级浏览器均已支持基本的HTML5标签，但是在IE8及更低版本的IE浏览器中无法使用它们。
     *解决办法：在IE中，只需要通过document.createElement()方法创建一个未被支持的HTML元素，之后就可以正常使用这个标签了。
     *          创建后的标签默认为行内元素，所以还需要通过样式将块状元素的display属性设置为block才行。
     *=================================================================================*/
    if(jQuery.isLessIE9){
        var tags = "header,footer,aside,article,section,hgroup,main,nav,menu,canvas,details,summary,figure,figcaption,audio,canvas,progress,video,output,dialog,datalist,mark,time".split(",");
        for(var i = 0, len = tags.length; i < len; i++){
            document.createElement(tags[i]);
        }
        $("head").append('<style id="jQuery_selectorStyle">* html{background-image:url(about:blank);}header,footer,aside,article,section,hgroup,main,nav,menu,canvas,details,summary,figure,figcaption{display:block;}audio,canvas,progress,video{display:inline-block;vertical-align:baseline;}</style>');
    }

    //解决IE6浏览器不缓存背景图片的Bug
    /*----------------------------------
     *说明：我们通常需要使用CSS来进行背景图片的设置，但这样在IE6下有一个Bug，那就是IE6默认情况下不缓存背景图片，CSS里每次更改图片的位置时都会重新发起请求，所以当鼠标在有CSS背景的元素上移动时，图片会闪烁甚至鼠标会出现忙的状态。
     *      解决方案一：在CSS中加入如下样式：html { filter: expression(document.execCommand(”BackgroundImageCache”, false, true)); }
     *      使用上述方案可能会影响整个页面的加载速度，所以推荐使用JS来修正这个Bug。
     *=================================================================================*/
    if(jQuery.isIE6){
        try{
            document.execCommand("BackgroundImageCache", false, true);
        }
        catch(e){}
    }

})(jQuery);