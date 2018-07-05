(function(){
    var stat = function(){
        this.id = "1";                      //站点区别ID
        this.server = "tj.120zixun.com";      //域名服务器
        this.isReload = "";                 //是否为刷新页面，默认值为""
        this.nowTime = new Date().getTime();//当前时间的毫秒级快照
    };
    stat.prototype = {
        init: function(){
            var _this = this;
            _this.getInfo();
            _this.getCookieData();
            _this.setCookieData();
            _this.sendData();
        },

        //获取浏览器基础信息
        getInfo: function(){
            var _this = this;
            _this.refer = encodeURI(document.referrer).replace(/&/ig,"$^$");
            _this.url = encodeURI(document.location).replace(/&/ig,"$^$");
            _this.screenWidth = screen.width;
            _this.screenHeight = screen.height;
            _this.cookieEnabled = navigator.cookieEnabled;
        },

        //获取Cookie保存的用户数据
        getCookieData: function(){
            this.getLastCPage();
        },

        //获取上次关闭页面时的相关信息
        getLastCPage: function(){
            var _this = this,
                s_lastCPage = _this.getCookie("s_lastCPage"),
                s_lastCRefer = _this.getCookie("s_lastCRefer"),
                s_lastCTime = _this.getCookie("s_lastCTime"),
                url = location.href,
                refer = document.referrer,
                now = new Date().getTime();

            if(s_lastCPage === url && s_lastCRefer === refer && (now - s_lastCTime < 20000)){
                //如果上一次关闭时的页面地址和来路地址与当前访问页面的页面地址和来路地址相同，且上一次关闭页面的时间到当前访问页面执行本段JS的时间相隔在20秒以内则被认为是一次刷新操作。
                //但是以下两种情况无法统计正确：
                //(一) 1:直接输入URL访问页面A; 2:然后刷新或关闭页面A；3:再输入页面A的URL到地址栏重新访问。如果步骤2开始到步骤3完成的总时间小于20秒则将步骤三的访问也认为是一次刷新操作。
                //(二) 1:从页面A点击链接访问页面B；2:然后刷新或关闭页面B；3:再从页面A点击链接访问页面B。如果步骤2开始到步骤3完成的总时间小于20秒则将步骤三的访问也认为是一次刷新操作。
                _this.isReload = "true";
            }else{
                _this.isReload = "false";
            }
        },        

        //使用Cookie保存记录用户数据
        setCookieData: function(){
            var _this = this;

            _this.setVCounts();
            _this.setVPages();
            _this.setFirstVTime();
            _this.setLastVTime();
            _this.setLastSTime();
            _this.setLastCPage();
            _this.setSession();
        },

        //设置访问总次数，有效期5年
        setVCounts: function(){
            var vCounts = this.getCookie("s_vCounts") || 0;
            this.vCounts = this.getCookie("s_inOneSession") === null ? parseInt(vCounts) + 1 : vCounts;
            this.setCookie("s_vCounts", this.vCounts, 2628000);
        },

        //设置首次访问时间，有效期5年
        setFirstVTime: function(){
            if(this.getCookie("s_firstVTime") === null){
                this.setCookie("s_firstVTime", this.nowTime, 2628000);
            }
        },

        //设置最近一次访问时间，有效期5年
        setLastVTime: function(){
            if(this.getCookie("s_inOneSession") === null){
                this.setCookie("s_lastVTime", this.nowTime, 2628000);
            }
        },

        //设置最近一次页面展现时间，有效期5年
        setLastSTime: function(){
            this.setCookie("s_lastSTime", this.nowTime, 2628000);
        },

        //监听页面关闭时的当前地址，浏览器关闭后失效
        setLastCPage: function(){
            var _this = this;
            _this.bind(window, "beforeunload", function(){
                _this.setCookie("s_lastCPage", location.href);
                _this.setCookie("s_lastCRefer", document.referrer);
                _this.setCookie("s_lastCTime", new Date().getTime());
            });
        },

        //设置本次访问中访问的页面数量，浏览器关闭后失效
        setVPages: function(){
            var _this = this,
                s_vPages = _this.getCookie("s_vPages") || 0;

            _this.vPages = _this.isReload === "true" ? s_vPages : parseInt(s_vPages) + 1;
            _this.setCookie("s_vPages", _this.vPages);
        },

        //标识当前会话，浏览器关闭后失效
        setSession: function(){
            var s_inOneSession = this.getCookie("s_inOneSession");
            if(s_inOneSession === null){
                this.setCookie("s_inOneSession", "valid");
            }
        },
        
        //传递数据，经测试且兼容的浏览器有：IE、Firefox、Chrome、Safari、Opera、360安全浏览器、360极速浏览器、世界之窗、搜狗、傲游
        /*-------------------------
         *传递的数据有：
         *id：站点标识，目前只有1；
         *urlreferrer：来路地址；
         *locationurl：当前页面地址；
         *screenwidth：分辨率宽度；
         *screenheight：分辨率高度；
         *cookieEnabled：是否支持Cookie，值为true/false；
         *isrelod：是否为刷新，值为true/fasle，当浏览器不支持cookie时永远返回false；
         *visitCounts：网站访问的总次数，当浏览器不支持cookie时永远返回1；
         *visitPages：本次访问的浏览量，当浏览器不支持cookie时永远返回1；
         *================================*/
        sendData: function(){
            var _this = this;
            var src = "http://" + _this.server + "/StatisticsHandler.ashx?id=" + _this.id + "&urlreferrer=" + _this.refer + "&locationurl=" + _this.url + "&screenwidth=" + _this.screenWidth + "&screenheight=" + _this.screenHeight + "&cookieEnabled=" + _this.cookieEnabled + "&isrelod=" + _this.isReload + "&visitCounts=" + _this.vCounts + "&visitPages=" + _this.vPages;
            document.write("\x3cscript src='" + src + "' type='text/javascript'\x3e\x3c/script\x3e");
        },

        //事件绑定
        bind: function(obj, eventName, func, isCapture){
            "addEventListener" in document ? obj.addEventListener(eventName, func, isCapture) : obj.attachEvent("on" + eventName, func);
        },

        //添加cookie或者重新给cookie赋值
        setCookie: function(name, value, expires, path, domain, secure){
            var str = name + "=" + escape(value) + ";path=" + (path === undefined ? "/" : path) + (domain === undefined ? "" : ";domain=" + domain) + (secure === undefined ? "" : ";secure=")  //说明：必须对cookie值进行escape编码处理，从而使空格、汉字、特殊字符呈如“%20”的形式进行保存。
            if(expires > 0){
                var e_date = new Date();
                e_date.setMinutes(e_date.getMinutes() + parseInt(expires));
                str += ";expires=" + e_date.toGMTString();
            }
            document.cookie = str;
        },

        //获取指定cookie值
        getCookie: function(name){
            var reg = new RegExp(name + "=([^;]*)");
            var result = reg.exec(document.cookie);
            return result ? unescape(result[1]) : null;
        },

        //删除指定cookie
        delCookie: function(name, path, domain){
            var e_date = new Date();
            e_date.setTime(e_date.getTime() - 100);
            document.cookie = name + "=;expires=" + e_date.toGMTString() + ";path=" + (path === undefined ? "/" : path) + (domain === undefined ? "" : ";domain=" + domain);
        }
    };

    try{
        var s = new stat();
        s.init();
    }catch(e){}
})();