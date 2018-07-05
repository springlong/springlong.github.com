/**
 * @file 针对浏览器的相关处理
 * @version 1.0.0
 * @update 2014-11-02
 */
define("static/system/detail/1.0.0/browser" ,[], function(require , exports , module){

return {

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
     * 是否为移动端访问
     * @type {Boolean}
     */
    isMobile: /(nokia|iphone|ipad|ipod|android|ucbrowser|fennec|touchpad|micromessenger|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i.test(navigator.userAgent),

    /**
     * 判断浏览器是否支持Flash插件
     * @return {Boolean}
     */
    canFlash: function()
    {
        var canFlash = false,
            plugins = navigator.plugins;

        if(window.ActiveXObject){
            //For IE
            try{
                //下一行语句如果没有Flash组件，则无法完成创建操作，将会抛出“Automation 服务器不能创建对象”异常
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                canFlash = true;
            }
            catch(e){}
        }
        else if(plugins){
            //For Firefox、Chrome、Safari、Opera
            for(var i = 0, len = plugins.length; i < len; i++){
                if(plugins[i].name.toLowerCase().contains("shockwave flash")){
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
};

});
