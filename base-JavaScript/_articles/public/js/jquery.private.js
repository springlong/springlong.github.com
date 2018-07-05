/**
 * @file        针对公司业务进行的脚本封装
 * @version     0.0.1（2014-07-17）
 * @attention   该脚本文件可先使用Uglify压缩，然后再使用JSPacker加密压缩，以进一步压缩文件大小
 */


//=====================================================================================================================================
//=============================================基本对象的声明==========================================================================
//=============================================基本对象的声明==========================================================================
//=====================================================================================================================================
//根据ID属性获取DOM元素
function getID(id){return (typeof(id) == "string") ? document.getElementById(id) : id;}

//项目程序扩展的基础对象对象
window.jq = window.jQuery;
window.$$ = {};
window.Extend === undefined && (window.Extend = {});

//常用变量的使用
Extend.isMobile = /iphone|ipad|android|windows phone|ucweb|fennec|blackberry|touchpad|symbian/i.test(navigator.userAgent);
Extend.isPad = /ipad|xoom|touchpad|rk30sdk|v811|adr|gt-n8000/i.test(navigator.userAgent);
Extend.isLowerScreen = document.documentElement.clientWidth <= 1024;




//=====================================================================================================================================
//=============================================特殊处理-特殊处理=======================================================================
//=============================================特殊处理-特殊处理=======================================================================
//=====================================================================================================================================


//=============================================
//根据用户所在地进行跳转
//最后调整时间：2014-07-17 15:57
// Extend.jumpUrlByAddr = function(addr, url)
// {
//     jQuery.post("/inc/ajax.ashx?act=ipAddr", function()
//     {
//         var value = arguments[0];
//         if(value.indexOf("\u672a\u80fd\u6210\u529f") < 0 && value.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") < 0) jQuery.setCookie("ipsafe", value, 60*24*365);
//         (new RegExp(addr).test(value)) && (location.replace(url));
//     });
// };
// (function()
// {
//     switch (location.hostname)
//     {
//         case "zhongda.kou021.net":
//         case "er.kou021.net":
//         case "zey.kou021.net":
//         case "b.kou021.net":
//         case "yanhou.kou021.net":
//         case "hz.kou021.net":

//             Extend.jumpUrlByAddr("北京|深圳", "http://www.kou021.net/");
//     }
// })();


//=============================================
//跳转百度URL地址（如果来源地址是百度，则将搜索结果始终保持当前域名下源关键字的搜索）
//最后调整时间：2014-06-18 15:34
Extend.jumpBaiduUrl = function()
{
    if(document.referrer.indexOf("www.baidu.com") > 0)
    {
        var keywords = jQuery.getKeywords("");
        var host = /[^\.]+\.(net|com|cn|org)$/.exec(location.host)[0];
        
        if(document.referrer.indexOf("&si=") < 0)
        {
            window.opener.location.href = "http://www.baidu.com/s?ct=2097152&si=" + host + "&wd=" + keywords;
        }
    }
};
/\.ent029\.net/.test(location.host) && (Extend.jumpBaiduUrl());
//周一~周五的8:00~18:00不跳，其他时间段一律跳转
// (function()
// {
//     var now = new Date(),
//         hour = now.getHours(),
//         weekDay = now.getDay(),
//         allow = !(weekDay != 6 && weekDay != 7 && hour >= 8 && hour < 18);

//     if(allow/* && /\.ebh029\.com/.test(location.host)*/)
//     {
//         Extend.jumpBaiduUrl();
//     }
// })();


//=============================================
//每次百度用户的访问都将URL、关键词入库，作为恶意点击判断的重要依据
//最后调整时间：2014-07-17 15:58
var referrer_url = document.referrer;
if(referrer_url.indexOf("www.baidu.com") >= 0 || referrer_url.indexOf("m.baidu.com") >= 0)
{
    jQuery.post("/inc/ajax.ashx?act=checkSpiteHits&host=" + location.hostname + "&keywords=" + escape(jQuery.search_keywords), function(){});
}


//=============================================
//手机访问跳转（地址带有from=mobile、/yynav.html、专题页、平板电脑、本地预览中不进行跳转）
if(!Extend.isPad && Extend.isMobile && !/localhost|from=mobile|\/yynav\.html|\/zt\//i.test(location.href))
{
    location.replace("http://video.120zixun.com/jumpMobile.aspx?pathname=" + location.pathname);
}





//========================================================================================================================================
//=============================================功能函数定义-功能函数定义==================================================================
//=============================================功能函数定义-功能函数定义==================================================================
//========================================================================================================================================

//单图片预加载操作
/*=================
 *目标：实现单个图片的预加载操作
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-01-15
 *修改时间：2012-01-15
 *-----------------------------------
 *参数说明：
 *1. url: 需要预加载图片的地址；
 *2. callback: 图片加载完毕之后所需执行的回调函数；
 *3. num: （可取舍）在一些循环操作中，用于对目标图片进行标识；
 *==================================================*/
Extend.loadImg = function(url, callback, num)
{
    /*创建一个Image对象，实现图片的预下载*/
    var img = new Image();

    /*当图片下载完毕时异步调用callback函数*/
    img.onload = function()
    {
        img.onload = null;
        callback.call(img); //将回调函数中的this指向img对象
    }

    /*对Image对象进行赋值(其中num值用于对该对象进行标识！)*/
    img.num = num;
    img.src = url;
};


//实现整个页面图片的预加载操作
/*=================
 *目标：实现整个页面图片的预加载操作
 *说明：使用该函数时，必须将图片img的init_src自定义属性值设置为目标图片路径，这样才能实现后续的一些操作！
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-01-15
 *修改时间：2012-01-15
 *==================================================*/
Extend.reloadImg = function()
{
    //创建urls数组，保存页面中所有图片的链接地址(urls)和索引地址(nums)
    var stopRead = setInterval(function(){
        if(!window.RDImg)
        {
            window.RDImg = {};
            window.RDImg.images = [];
            window.RDImg.nums = [];
            window.RDImg.delEle = [0];
            for(var i = 0; i < document.images.length; i++)
            {
                window.RDImg.images[i] = document.images[i];    //将图片引用转移到指定的集合
                window.RDImg.nums[i] = i;   //保存图片集合的序号
            }
        }

        for(var i = 1; i < window.RDImg.delEle.length; i++)
        {
            window.RDImg.nums.remove(window.RDImg.delEle[i]);
        }
        if(window.RDImg.nums.length <= 0)
        {
            clearInterval(stopRead);
            return false;
        }

        //实现图片随文档显示区域的变化而显示，文档显示在哪里，就仅只加载当前区域所在的图片
        window.RDImg.delEle = [0];
        for(var i = 0; i < window.RDImg.nums.length; i++)
        {
            if((window.RDImg.images[window.RDImg.nums[i]].getBoundingClientRect().top < document.documentElement.clientHeight + 100))
            {
                Extend.loadImg(window.RDImg.images[window.RDImg.nums[i]].getAttribute("init_src"), function(){
                    window.RDImg.images[this.num].src = this.src;
                }, window.RDImg.nums[i]);
                window.RDImg.delEle[window.RDImg.delEle.length] = window.RDImg.nums[i];
            }
        }
    },200);
};


//jQuery版表情操作
//参数-articleID：文章ID
//参数-boxID：容器ID
Extend.bqOperate = function(articleID, boxID)
{       
    jQuery(function($)
    {                   
        var $infoCommList = $("#infoComm li"),
            baseNums = [{"4":135, "3":29, "2":77, "6":10, "5":558, "1":76}, {"4":40, "3":20, "2":41, "6":59, "5":251, "1":111}, {"4":114, "3":44, "2":32, "6":81, "5":863, "1":102}, {"4":270, "3":54, "2":172, "6":397, "5":1547, "1":162}]
            cookieName = "bqOperate_" + articleID + "_base_index",
            baseIndex = $.getCookie(cookieName);

        //表情系统基数获取
        if(baseIndex === null){
            baseIndex = $.random(0, baseNums.length - 1);
            $.setCookie(cookieName, baseIndex, 43200); //cookie保存时间30天
        }
        baseNums = baseNums[baseIndex];
                 
        //读取表情点击数据
        var params = {
            act: "sel",
            aid: articleID,
            bqid: $infoCommList.map(function()
            {
                return $(this).data("bqid");
            }).toArray().join(",")
        }
        $.getJSON("http://dingyue.120zixun.com/api/biaoqing.ashx?callback=?", params, function(data){
            if(data && data.state === 1){
                var hits = data.hits, bqid = params.bqid.split(",");
                $infoCommList.children(".num").each(function(index)
                {
                    $(this).html(hits[index] + baseNums[bqid[index]] + "人");
                });
            }
        });
        
        //为表情的点击添加数据
        $infoCommList.click(function(){
            var $ele = $(this), bqid = $ele.data("bqid");
            if($ele.data("hited") === "1") return;
            
            //处理+1操作
            var $addDiv = $ele.append("<div class='add'>+1</div>").children(".add");
            $addDiv.css("left", $ele.position().left + 60);
            $addDiv.animate({top: "-20px"}, 500, function(){
                $addDiv.animate({opacity: "0"}, 1500, function(){
                    $addDiv.remove();
                });
            });
            
            //远程添加数据
            $.getJSON("http://dingyue.120zixun.com/api/biaoqing.ashx?callback=?",{
                act: "add",
                aid: articleID,
                bqid: bqid
            },function(data){
                $ele.data("hited", "1");
                if(data && data.state === 1)
                {
                    $ele.children(".num").html(data.hits + baseNums[bqid] + "人");
                }
            });
            
            //如果是不解，则弹出商务通
            bqid == "1" && (zixun('biaoqing_bujie'));
        });
    });
};


/**
 * 通过弹出容器播放视频
 * @param  {String}  id 视频ID
 * @param  {Number}  width 视频宽度
 * @param  {Number}  height 视频高度
 */
Extend.showVideoBox = function(id, width, height)
{
    //参数校验
    id = id || 1;
    width = width || 640;
    height = height || 480;
    
    //变量声明
    var videoBox = getID("videoBox"),
        videoPlay = getID("videoBoxPlay"),
        src = "http://video.120zixun.com/videoplay.aspx?id=" + id + "&width=" + width + "&height=" + height + "&autoPlay=1&allowFullScreen=1&hideControler=1",
        box, html;
        
    //显示容器
    if(videoBox && videoPlay)
    {
        videoPlay.src = src;
        videoBox.style.display = "block";
    }
    else
    {
        html =  '<div id="videoBoxAlpha" style="position:fixed;left:0;top:0;z-index:2147483647;width:100%;height:100%;background:#000;opacity:0.8;filter:alpha(opacity=80);_position:absolute;_top:expression(documentElement.scrollTop);"></div>';
        html += '<div id="videoBoxContent" style="position:fixed;left:50%;top:45%;z-index:2147483647;width:' + width + 'px;height:' + height + 'px;margin:-' + Math.round(height/2 + 20) + 'px 0 0 -' + Math.round(width/2 + 10) + 'px;padding:20px 10px;background:#000;_position:absolute;_margin-top:0;_top:expression(eval(document.documentElement.scrollTop+parseInt(document.documentElement.clientHeight*0.9-this.offsetHeight)/2));">';
        html += '   <iframe id="videoBoxPlay" src="' + src + '" frameborder="0" width="' + width + '" scrolling="no" height="' + height + '"></iframe>';
        html += '   <span id="videoBoxClose" style="position:absolute;right:5px;top:3px;font-size:12px;line-height:20px;color:#999;cursor:pointer;">\u5173\u95ed</span>';
        html += '</div>';
        
        box = document.createElement("div");
        box.id = "videoBox";
        box.innerHTML = html;
        document.body.appendChild(box);
        
        getID("videoBoxClose").onclick = function()
        {
            getID("videoBox").style.display = "none";
            getID("videoBoxPlay").src = "about:blank";
        };

        //针对IE6设置body的高度为100%，修复蒙版图层高度不100%的问题
        if(!window.XMLHttpRequest)
        {
            document.body.style.height = "100%";
        }
    }
};


/**
 * 针对活动专题到期时的提示内容设置
 * @param  {String}  timeStr 过期时间字符串，格式如："2014-03-08 0:00"
 * @param  {String}  tips 提示文本，默认值为：本活动已过期，如有疑问请<span onclick=zixun('expires') style=text-decoration:underline;color:orange;cursor:pointer;>咨询</span>在线专家！
 */
Extend.expires = function(timeStr, tips)
{
    //变量默认值
    tips = tips || "\u672c\u6d3b\u52a8\u5df2\u8fc7\u671f\uff0c\u5982\u6709\u7591\u95ee\u8bf7<span onclick=zixun('expires') style=text-decoration:underline;color:orange;cursor:pointer;>\u54a8\u8be2</span>\u5728\u7ebf\u4e13\u5bb6\uff01";

    //确保容器存在
    var tipsBox = getID("expiresTipsBox");
    if(!window.XMLHttpRequest)
    {
        document.body.style.height = "100%";  //针对IE6设置body的高度为100%，修复蒙版图层高度不100%的问题
    }
    if(tipsBox == null)
    {
        tipsBox = document.createElement("div");
        tipsBox.id = "expiresTipsBox";
        tipsBox.style.cssText = "position:fixed;left:0;top:0;z-index:2147483647;display:none;width:100%;height:100%;_position:absolute;_top:expression(documentElement.scrollTop);";
        tipsBox.innerHTML = "<div style='position:absolute;left:0;top:0;width:100%;height:100%;background-color:#000;opacity:0.6;filter:alpha(opacity=60);'></div><div style='position:absolute;left:50%;top:20px;width:400px;height:50px;margin-left:-200px;background:green;color:#fff;font-size:18px;line-height:50px;text-align:center;'>" + tips + "</div>";
        document.body.appendChild(tipsBox);
    }
    
    //从服务器端获取标准时间与过期时间进行判断
    jQuery.post("/inc/ajax.ashx?act=timeNow", function()
    {
        var expires = new Date(timeStr.replace(/-/g, "/")).valueOf();   //过期时间，"2014-03-08"格式的时间字符串在IE中不支持
        var timeNow = new Date(arguments[0]).valueOf();                 //系统当前时间
        if(isNaN(timeNow)){ timeNow = new Date().valueOf(); }           //纠正系统当前时间
        
        if(expires < timeNow)
        {
            tipsBox.style.display = "block";
    
            //点击隐藏
            jQuery(tipsBox.children[0]).click(function(e)
            {
                var tipsBox = getID("expiresTipsBox");
                tipsBox && (tipsBox.style.display = "none");
            });
            //按“ESC”键取消
            jQuery(document.body).on("keyup", function(e)
            {
                var tipsBox = getID("expiresTipsBox");
                if(e.keyCode == 27 && tipsBox)
                {
                    tipsBox.style.display = "none";
                }
            });
        }
    });
};


//对象的抖动
/*=================
 *目标：仿QQ抖动，实现目标定位元素的窗口抖动效果
 *说明：由于我数学不好，所以使用了很死的方法来实现该效果
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-03-28
 *修改时间：2012-03-28
 *-----------------------------------
 *参数说明：
 *1. id: 目标对象的引用或ID属性值
 *2. duration: 抖动所持续的时间（单位：毫秒），默认值800毫秒；
 *3. interval: 每次抖动之间的间隔（单位：毫秒），默认值50毫秒；
 *==================================================*/
Extend.shake = function(id, duration, interval)
{
    var obj = getID(id);
    if(obj)
    {
        if(!duration){ duration = 800; }            //默认持续0.8秒钟
        if(!interval){ interval = 50; }             //默认间隔50毫秒抖动一次
        var times = parseInt(duration / interval);  //需要抖动的总次数

        var clear = function(){
            clearInterval(obj.stopShake);
            obj.style.left = obj.dLeft + "px";
            obj.style.top = obj.dTop + "px";
        }
        if(obj.dLeft){
            clear();
        }

        var count = 0;      //记录次数
        var base = 3;       //基数
        obj.dLeft = parseInt(jQuery(obj).css("left"));
        obj.dTop =  parseInt(jQuery(obj).css("top"));
        obj.stopShake = setInterval(function()
        {
            if(times <= 0){
                clear();
                return false;
            }
            var posL = obj.dLeft;
            var posT = obj.dTop;
            switch(count % 4)
            {
                case 0:
                    posL -= base;
                    posT += base;
                    break;
                case 1:
                    posL -= base*2;
                    break;
                case 2:
                    posL -= base;
                    posT -= base;
                    break;
            }
            obj.style.left = posL + "px";
            obj.style.top = posT + "px";
            count++;
            times--;
        }, interval);
    }
};


//搜索跳转
/*=========================================
 *目标：传递相关文本框的ID，点击按钮后跳转到搜索页并传递搜索关键字;
 *说明：1.  在将关键字文本作为链接字符串的一部分上传到服务器上去时，应将其进行加密编码;
 *          针对Firefox、Opera、Safari、Chrome等浏览器使用escape()进行URL的编码，解码函数对应为unescape()；
 *          而IE6、7、8不支持使用escape方法对URL进行编码，所以使用encodeURL()来进行编码，解码函数对应为decodeURI()！
 *          注：Firefox、Opera、Safari、Chrome等浏览器使用encodeURL()方法对URL进行编码访问后地址栏中显示的地址结果是编码之前的地址，故才使用escape对URL进行编码。
 *      2.  IE6浏览器的onkeydown不支持文本框的“回车”事件，而onkeypress则支持；另外在其他所有浏览器中，onkeydown和onkeypress均支持“回车”事件！
 *作者：Jerry_小猪;
 *创建时间：2011-09-11;
 *修改日期：2011-09-11;
 *------------------------
 *1. text：文本框的ID值，默认值：“textKey”;
 *2. button: 按钮的ID值，默认值：“btnSearch”;
 *3. defaultText：文本框默认文本，默认值为：“请输入您所需了解的内容...”;
 *4. isKey：文本框默认的文本是否为有效的搜索关键字，默认值：false——表示为提示文本;
 *5. prefix：链接文本字符串的前缀，默认值：“/search/”;
 *6. suffix：链接文本字符串的后缀，默认值：“.html”;
 *7. openWithNewPage: 是否在新的页面中进行打开，默认值为true;
 *默认的搜索页链接字符串："/search/关键字文本.html";
 *=====================================================*/
Extend.search = function(text, button, defaultText, isKey, prefix, suffix, openWithNewPage)
{
    if(!text){text = "txtKey";}
    if(!button){button = "btnSearch";}
    if(getID(text) && getID(button))
    {
        if(defaultText == undefined || defaultText == null){defaultText = "\u8bf7\u8f93\u5165\u60a8\u6240\u9700\u67e5\u8be2\u7684\u5185\u5bb9...";} //ASCII码字符：请输入您所需查询的内容
        if(prefix == undefined || suffix == null){prefix = "/search/";}
        if(suffix == undefined || suffix == null){suffix = ".html";}
        if(openWithNewPage == null || openWithNewPage == undefined){openWithNewPage = true;}

        var objText = getID(text);
        var objButton = getID(button);

        Extend.placeHolder(text,defaultText);   //设置文本框默认文本！
        objButton.onclick = function(){gotoSearch(false);}//点击按钮将进行跳转！
        objText.onkeypress = function(e)
        {
            //输入文本框按回车键将进行跳转！
            e = (e) ? e : event;
            if(e.keyCode == 13){gotoSearch(true); return false;}
        }
    }

    function gotoSearch(isByEnter)
    {
        objText.value = objText.value.replace(/^\s*/,"");
        objText.value = objText.value.replace(/\s*$/,"");//去掉关键字输入框中的前尾空格！
        if(objText.typing === 1)
        {
            objText.value = objText.tText;
        }

        if(objText.typing !== 1 && ((!isKey && objText.value == defaultText) || objText.value == ""))
        {
            alert("\u8bf7\u8f93\u5165\u60a8\u6240\u9700\u67e5\u8be2\u7684\u5185\u5bb9..."); //ASCII码字符：请输入您所需查询的内容
            objText.focus();
        }
        else
        {
            if(openWithNewPage)
            {
                window.open(prefix + encodeURI(objText.value) + suffix, "_blank");
            }
            else
            {
                location.href = prefix + encodeURI(objText.value) + suffix;
            }
            ggAnalytics("Search", "\u641c\u7d22\u8ddf\u8e2a", objText.value); //ASCII码字符：搜索跟踪
        }
    }
};
Extend.placeHolder = function(id,holderText,holderColor)
{
    if(getID(id))    //如果存在目标对象
    {
        var txtBox = getID(id); //获取目标对象的引用
        var oldColor = txtBox.style.color;                          //保存目标对象原有的颜色，oc表示“oldColor”的缩写。
        var holderColor = holderColor ? holderColor : "#AEAEAE";    //保存目标对象占位文本颜色，默认值为灰色，hc表示“holderColor”的缩写。

        txtBox.style.color = holderColor;                           //设置占位文本的颜色
        txtBox.value = holderText;                                  //设置占位文本为当前输入框的值
        txtBox.holderText = holderText;                             //扩展一个属性，保存占位文本
        
        jQuery(txtBox).on("focus", function(e)
        {
            //当输入框接受焦点时，如果值与占位文本一致则设置为空，并恢复字体颜色
            var target = e.target || e.srcElement;
            if(target.value == holderText)
            {
                target.value = "";
                target.style.color = oldColor;
            }
        });
        jQuery(txtBox).on("blur", function(e)
        {
            //当输入框失去焦点时，如果值为空，则显示占位文本，并设置占位文本颜色
            var target = e.target || e.srcElement;
            target.value = target.value.replace(/^\s*/,"");     //去掉前导空格
            target.value = target.value.replace(/\s*$/,"");     //去掉后导空格
            if(target.value == "")
            {
                target.value = holderText;
                target.style.color = holderColor;
            }
        });
    }
};
Extend.typing = function(id, text, duration, delay)
{
    var obj = getID(id);
    if(obj)
    {
        text = text || "";
        duration = duration || 200;
        delay = delay || 2000;
        obj.stopID = obj.stopID || 0;//用于计时器ID
        obj.typing = 1;             //标识该文本处于打字状态
        obj.tText = text;           //用于保存文本内容

        var idx = 0,                //显示文字的当前序号
            len = text.length;      //文本的长度

        if(len > 1)
        {
            jQuery(obj).on("focus", function(e)
            {
                var target = e.target || e.srcElement;
                clearInterval(target.stopID);
                target.typing = 0;
                target.tText.indexOf(target.value) != -1 && (target.value = "");
            });
            jQuery(obj).on("blur", function(e)
            {
                var target = e.target || e.srcElement;
                if(/^\s*$/.test(target.value))
                {
                    target.typing = 1;
                    doInterval();
                }
            });
            doInterval();
        }
    }

    function doType()
    {
        obj.value = text.substring(0, idx + 1);
        if(++idx === len)
        {
            clearInterval(obj.stopID);
            idx = 0;
            setTimeout(function(){
                if(obj.typing === 1){
                    obj.value = "";
                    doInterval();
                }
            }, delay);
        }
    }

    function doInterval()
    {
        clearInterval(obj.stopID);
        obj.stopID = setInterval(function(){
            doType();
        }, duration);
    }
};


//鼠标点击文章页内容，在鼠标点击处显示咨询按钮，再次点击则隐藏，又点击则再次显示：
//作者：郑东伟
//时间：未知
function mouseCoords(ev) 
{
    if (ev.pageX || ev.pageY)
    {
        return{
            x: ev.pageX,
            y: ev.pageY
        };
    }
    if (window.ActiveXObject)
    {
        return{
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
        };
    }
    else
    {
        return{
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
}
var ImgBox = false;
function showImgBox(pos)
{
    if (document.getElementById("showInfoImg") == null)
    {
        var Cdiv = document.createElement("div");
        Cdiv.id = "showInfoImg";
        Cdiv.innerHTML = "<div style=\"float:left;\"><a href=\"javascript:void(0)\" target=\"_self\" onclick=\"zixun(\'newsclick\')\"\><img src=\"/images/showszixun.gif\" alt=\"\u5728\u7ebf\u54a8\u8be2\" /></a></div>";
        styleStr = "left:" + (((pos.x + 2) > 0) ? (pos.x + 2) : pos.x) + "px;top:" + (pos.y) + "px;position:absolute;width:" + 102 + "px;";
        Cdiv.style.cssText = styleStr;
        document.body.appendChild(Cdiv);
        ImgBox = true;
    }
    else
    {
        if (ImgBox)
        {
            document.getElementById("showInfoImg").style.display = "none";
            ImgBox = false;
        }
        else
        {
            styleStr = "left:" + (((pos.x + 2) > 0) ? (pos.x + 2) : pos.x) + "px;top:" + (pos.y) + "px;position:absolute;width:" + 102 + "px;display:block;";
            document.getElementById("showInfoImg").style.cssText = styleStr;
            document.getElementById("showInfoImg").style.display = "block";
            ImgBox = true;
        }
    }
}
function showImg(ev)
{
    var objPos = mouseCoords(ev);
    showImgBox(objPos);
}
function show_newsbtn()
{
    if (getID("_#newsInfo") != null)
    {
        if (document.all)
        {
            getID("_#newsInfo").onmouseup = function()
            {
                showImg(event);
            }
        }
        else
        {
            getID("_#newsInfo").setAttribute("onmouseup", "showImg(event);");
        }
    }
}




//=====================================================================================================================================
//=============================================数据提交的处理-咨询预约的处理===========================================================
//=============================================数据提交的处理-咨询预约的处理===========================================================
//=====================================================================================================================================
//表单检索的标准验证流程
/*=================
 *目标：当存在目标元素且为必填项时，如果值为非有效值，则提示用户重新输入并返回null；
         当存在目标元素且为选填项时，则返回元素的值；
         当没有目标元素时则返回undefined。
 *--------------------------------
 *参数说明：
 *1. id: 表单元素的ID
 *2. holder: 占位文本
 *3. tips：提示文本
 *4. func：有效值的验证
 *==================================================*/
Extend.checkValue = function(id, holder, tips, func)
{
    var obj = getID(id),            //目标元素
        result = undefined,     //返回结果
        notValid;               //是否为非有效的值
        
    if(obj !== null)
    {
        var value = obj.value;
        notValid = func(value, holder);

        if(value !== "" && notValid || jQuery(obj).hasClass("required") && value === "" && notValid)
        {
            alert(tips);
            obj.focus();
            obj.select();
            result = null;
        }
        else
        {
            result = value;
        }
    }
    return result;
};
Extend.checkForm = {

    //普通文本
    text: function(id, holder, tips, func)
    {
        return Extend.checkValue(id, holder, tips, function(value, holder)
        {
            return value === holder;
        });  
    },

    //电话号码
    phone: function(id, holder, tips, func)
    {
        return Extend.checkValue(id, holder, tips, function(value, holder)
        {
            return value === holder || isNaN(value) || (value.length !== 11 && value.length !== 12);
        });  
    },

    //表单检索：年龄
    age: function(id, holder, tips, func)
    {
        return Extend.checkValue(id, holder, tips, function(value, holder)
        {
            return value === holder || isNaN(value) || parseInt(value) < 5 || parseInt(value) > 120;
        });  
    },

    //表单检索：身份证号码
    idcard: function(id, holder, tips, func)
    {
        return Extend.checkValue(id, holder, tips, function(value, holder)
        {
            return value === holder || !/\d{17}[\d|x]|\d{15}/i.test(value);
        });  
    },

    //表单检索：日期
    time: function(id, holder, tips, func)
    {
        return Extend.checkValue(id, holder, tips, function(value, holder)
        {
            var data = value.replace(/-/g, "/"),
                yyDate  = Date.parse(data),
                time = new Date(),
                now = new Date(time.getFullYear(), time.getMonth(), time.getDate());

            return value === holder || isNaN(yyDate) || (yyDate < now);
        });
    }
};


//确认是否存在openURL框架
function checkOpenURL()
{
    var id = "openURL", iframe = document.getElementById(id);
    if(iframe == null)
    {
        iframe = document.createElement("iframe");
        iframe.id = id;
        iframe.name = id;
        iframe.style.cssText = "position:absolute;left:-9999px;overflow:hidden;width:0px;height:0px;";
        document.body.appendChild(iframe);
    }
}


//QQ咨询
//备忘录：QQ加好友——tencent://QQInterLive/?Cmd=2&Uin=800010082
function qq(num, param)
{
    //匹配参数
    num = num || $$.qqNum;
    param = param || "qq";

    //匹配咨询URL
    var url = "";
    switch(num)
    {
        //西安中大营销QQ
        case "800010082":

            url = "tencent://message/?Menu=yes&uin=800010082&Site=www.qq.com&Service=58&SigT=7AB57DB763C66536C47E291A4C2F2BB089D441098FBF494F7F09F52EFD2C89DD1D7F00E3218AF83F7CC2F3B1DB81AC9A&SigU=95B0FFEE5F3A0F9C83C3D842C18ACC29F98AAE4F7B2D7B170C5C0C4CC66E941E8F687581BBBF7800";
            break;

        //上海沪申企业QQ
        case "800077475":

            url = "tencent://message/?Menu=yes&uin=800077475&Site=www.qq.com&Service=58&SigT=7AB57DB763C66536E63306B5B460FC9D10E71A699DCB024C6709B983A046C7573A5F1A9C4160C91CDD6ADDE348A1F638&SigU=95B0FFEE5F3A0F9C707E32B55E745ED3660AA6B41FE478CE9F3983E22EFCA6CDB84C105EE8FAECBF";
            break;

        default:

            url = /^(400|800)/.test(num) ? 
                    "http://b.qq.com/webc.htm?new=0&sid=" + num + "&o=&q=7&from=qqwpa" :    //企业QQ咨询：会提醒用户是否打开企业QQ进行咨询
                    "tencent://message/?uin=" + num + "&Site=&Menu=yes";            //个人QQ咨询：本地协议，在某些浏览器中无需提醒即可对话
    }

    //确认是否存在openURL框架
    checkOpenURL();

    //执行咨询操作
    window.open(url, "openURL");
    ggAnalytics("QQ", "QQ\u54a8\u8be2", param); //ASCII码字符为：咨询
}


//网络电话页面
function tel(param)
{
    window.open("/tel.html", "_blank");
    param = param || "tel-boxClick";
    ggAnalytics("Telephone", "\u9875\u9762\u5165\u53e3\u70b9\u51fb", param); //ASCII码字符为：页面入口点击
}


//在线挂号页面
function register(param)
{
    param = param || "guahao";
    
    var width = 649,
        height = 515,
        left = (screen.availWidth - width) / 2;        
    window.open("/register.html", "_blank", "width=" + width + ",height=" + height + ",top=200,left=" + left + ",status=yes,toolbar=no,menubar=no,resizable=no,scrollbars=no,location=no,titlebar=no");
    ggAnalytics("Register", "\u5165\u53e3\u70b9\u51fb", param);    //ASCII码字符为：入口点击
}


//呼叫电话（可供电话号码和手机号码进行选择）
/*=================
 *参数说明：
 *1. selector：拨打电话的按钮ID
 *2. prefix：相关表单控件的ID前缀
 *==================================================*/
function callTel(selector, prefix)
{
    var button = getID(selector);
        changePhone = getID(prefix + "Phone"),  //“电话号码”单选按钮
        changeMobile = getID(prefix + "Mobile"), //“手机号码”单选按钮
        phoneArea = getID(prefix + "Area"), //“区号”文本输入框
        phoneValue = getID(prefix + "Value"); //“电话号码”输入框
        
    //切换为“电话号码”拨打
    changePhone.onclick = function()
    {
        phoneArea.disabled = false;
        phoneArea.className = phoneArea.className.replace(/\s*disabled/g,"");
        Extend.placeHolder(phoneArea, "\u533a\u53f7"); /*ASCII码字符：区号*/
        Extend.placeHolder(phoneValue, "\u7535\u8bdd\u53f7\u7801");/*ASCII码字符：电话号码*/
    }
    //切换为“手机号码”拨打
    changeMobile.onclick = function()
    {
        phoneArea.disabled = true;
        phoneArea.className += " disabled";
        phoneArea.value = "";
        Extend.placeHolder(phoneValue, "\u624b\u673a\u53f7\u7801");/*ASCII码字符：手机号码*/
    }
    //执行拨打操作
    button.onclick = function()
    {
        var number;
        if(changePhone.checked)
        {
            if(!/^[0]{1}\d{2,3}$/.test(phoneArea.value))
            {
                alert("\u60a8\u7684\u533a\u53f7\u8f93\u5165\u6709\u8bef\uff01");/*ASCII码字符：您的区号输入有误！*/
                phoneArea.focus();
                return false;
            }
            number = phoneArea.value + phoneValue.value;
            if(!/^[0]{1}\d{10,11}$/.test(number))
            {
                alert("\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01");/*ASCII码字符：您的电话号码输入有误！*/
                phoneValue.focus();
                return false;
            }
            doTel.call(this, number, selector, true);
        }
        else
        {
            doTel.call(this, phoneValue, selector);
        }
    }
    //默认为“手机号码”拨打
    changeMobile.click();
}


//拨打电话（百度离线宝）
/*=================
 *参数说明：
 *1. phone: 当isNum为true时，表示具体的电话号码，否则表示用于输入电话号码的文本框
 *2. label: GA跟踪用的事件标签，默认为电话号码文本框的ID
 *3. isNum: 用于确定phone参数所代表的含义，默认为false
 *==================================================*/
function doTel(phone, label, isNum)
{
    var button = this,              //拨打按钮
        label = label || phone,                     //GA跟踪用的事件标签
        phone = isNum ? phone : getID(phone),           //电话输入文本框
        tel = "",                                   //电话号码
        len = 0,
        errorTips = "\u670d\u52a1\u5668\u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01";  //ASCII码字符：服务器正忙，请稍后再试！
    
    //禁用cookie视为非法请求！
    if(!navigator.cookieEnabled)
    {
        return;
    }

    if(phone)
    {
        tel = isNum ? phone : phone.value;
        if(("," + $$.telNum + ",").indexOf("," + tel + ",") !== -1)
        {
            alert("\u4e0d\u53ef\u620f\u5f04\u672c\u9662\u7535\u8bdd\u54e6\uff0c\u4eb2\uff01");   //ASCII码字符：不可戏弄本院电话哦，亲！
            return false;
        }
        if(!/^[1]{1}[3,4,5,8]{1}\d{9}$/.test(tel) && !/^[0]{1}\d{10,11}$/.test(tel))
        {
            alert("\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01");  //ASCII码字符为：您的电话号码输入有误！
            if(!isNum)
            {
                phone.focus();
                phone.select();   
            }
            return false;
        }
        
        button.disabled = true;
        
        //调用百度离线宝回呼接口获取token，返回结果如：{"status":0,"data":{"cnum":"","tk":"0C235DB26A057402291B2C9EE2866CB31216FB00A3E254A0927E7E22626154925B01B5C3BC4EB744C074275B3AE05C2F8DE2B95340BA1A7C","ext":""}}
        jQuery.getJSON("http://lxbjs.baidu.com/cb/user/check?f=4&uid=" + $$.telUID + "&r=" + escape(location.href) + "&t=" + new Date().valueOf() + "&callback=?", function(token)
        {
            if(token.status === 0)
            {
                token = token.data.tk;
                
                //调用百度离线宝回呼接口进行电话呼叫，返回结果如：{"status":0,"msg":"稍后您将接到我们的电话，该通话对您完全免费，请放心接听！"}
                jQuery.getJSON("http://lxbjs.baidu.com/cb/call?vtel=" + tel + "&uid=" + $$.telUID + "&tk=" + token + "&t=" + new Date().valueOf() + "&callback=?", function(result)
                {
                    alert(result.msg || errorTips);
                    button.disabled = false;
                    if(!isNum){ phone.value = ""; }
                    if(result.status === 0)
                    {
                        jQuery.post("/inc/ajax.ashx?act=doTel&txtclassid=&txttype=" + escape("\u514d\u8d39\u7535\u8bdd"/*ASCII字符：免费电话*/) + "&txtphone=" + escape(tel) + "&txtdetails=&txtpage=" + escape(location.href + (location.search == "" ? "?label=" : "&label=") + label) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer), function(){});
                    }
                });
            }
            else
            {
                alert(errorTips);
                button.disabled = false;
            }
        });
    }
}


// //拨打电话（快商通）（针对特殊站点使用-北京）
// /*=================
//  *参数说明：
//  *1. phone: 当isNum为true时，表示具体的电话号码，否则表示用于输入电话号码的文本框
//  *2. label: GA跟踪用的事件标签，默认为电话号码文本框的ID
//  *3. isNum: 用于确定phone参数所代表的含义，默认为false
//  *==================================================*/
// if(/ebh010|ent010/i.test(location.hostname))
// {
//     doTel = function(phone, label, isNum)
//     {
//         var button = this,              //拨打按钮
//             label = label || phone,                     //GA跟踪用的事件标签
//             phone = isNum ? phone : getID(phone),           //电话输入文本框
//             tel = "",                                   //电话号码
//             len = 0;
        
//         //禁用cookie视为非法请求！
//         if(!navigator.cookieEnabled)
//         {
//             return;
//         }

//         if(phone)
//         {
//             tel = isNum ? phone : phone.value;
//             if(("," + $$.telNum + ",").indexOf("," + tel + ",") !== -1)
//             {
//                 alert("\u4e0d\u53ef\u620f\u5f04\u672c\u9662\u7535\u8bdd\u54e6\uff0c\u4eb2\uff01");   //ASCII码字符：不可戏弄本院电话哦，亲！
//                 return false;
//             }
//             if(!/^[1]{1}[3,4,5,8]{1}\d{9}$/.test(tel) && !/^[0]{1}\d{10,11}$/.test(tel))
//             {
//                 alert("\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01");  //ASCII码字符为：您的电话号码输入有误！
//                 if(!isNum)
//                 {
//                     phone.focus();
//                     phone.select();   
//                 }
//                 return false;
//             }
            
//             button.disabled = true;
            
//             //进行快商通电话拨打
//             jQuery.post("/inc/ajax.ashx?act=kuaishangtong&txtclassid=&txttype=" + escape("\u514d\u8d39\u7535\u8bdd"/*ASCII字符：免费电话*/) + "&txtphone=" + escape(tel) + "&txtdetails=&txtpage=" + escape(location.href + "?label=" + label), function()
//             {
//                 //给用户进行反馈
//                 var result = arguments[0];
//                 button.disabled = false;
//                 alert(result);
//                 if(!isNum){ phone.value = ""; }
                
//                 //向数据库插入记录
//                 if(result.indexOf("\u7535\u8bdd\u6b63\u5728\u8fde\u63a5\u4e2d") >= 0) /*ASCII码字符：电话正在连接中*/
//                 {
//                     jQuery.post("/inc/ajax.ashx?act=doTel&txtclassid=&txttype=" + escape("\u514d\u8d39\u7535\u8bdd"/*ASCII字符：免费电话*/) + "&txtphone=" + escape(tel) + "&txtdetails=&txtpage=" + escape(location.href + "?label=" + label) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer), function(){});            
//                 }
//             });
//         }
//     }
// }


// //拨打电话（短信双向发送通知）（针对特殊站点使用-西安）
// /*=================
//  *参数说明：
//  *1. phone: 当isNum为true时，表示具体的电话号码，否则表示用于输入电话号码的文本框
//  *2. label: GA跟踪用的事件标签，默认为“doTel”
//  *3. isNum: 用于确定phone参数所代表的含义，默认为false
//  *==================================================*/
// if(/ent029|029ebh|ebh029|029ear|87401000|029ebhw|ent0431|er029|ear029|satiled|qiu-yi/i.test(location.hostname))
// {
//     doTel = function(phone, label, isNum)
//     {
//         var button = this,              //拨打按钮
//             label = label || phone,                     //GA跟踪用的事件标签
//             phone = isNum ? phone : getID(phone),           //电话输入文本框
//             tel = "",                                   //电话号码
//             len = 0;

//         if(phone)
//         {
//             tel = isNum ? phone : phone.value;
//             if(("," + $$.telNum + ",").indexOf("," + tel + ",") !== -1)
//             {
//                 alert("\u4e0d\u53ef\u620f\u5f04\u672c\u9662\u7535\u8bdd\u54e6\uff0c\u4eb2\uff01");   //ASCII码字符：不可戏弄本院电话哦，亲！
//                 return false;
//             }
//             if(!/^[1]{1}[3,4,5,8]{1}\d{9}$/.test(tel) && !/^[0]{1}\d{10,11}$/.test(tel))
//             {
//                 alert("\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01");  //ASCII码字符为：您的电话号码输入有误！
//                 if(!isNum)
//                 {
//                     phone.focus();
//                     phone.select();   
//                 }
//                 return false;
//             }

//             button.disabled = true;
//             jQuery.post("/inc/ajax.ashx?act=doTel&txtclassid=3&txttype=" + escape("\u7f51\u7edc\u7535\u8bdd"/*ASCII字符：网络电话*/) + "&txtphone=" + escape(tel) + "&txtdetails=&txtpage=" + escape(location.href + "?label=" + label) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer), function()
//             {
//                 button.disabled = false;
//                 alert(arguments[0]);
//                 if(!isNum){ phone.value = ""; }
//             });
//         }
//     }
// }


//添加预约（公用）
/*=================
 *参数说明：
 *1. button: 表单提交按钮的引用
 *2. isPage: 是不是register.html页面提交过来的请求
 *3. type: 添加预约的类型（yuyue：来自register.html的预约；messageRegister；其他：即除yuyue、messageRegister之外的类似预约的数据提交）
 *4. desc：当type为“其他”时需要指定文本说明
 *5. prefix：用于兼容同页面中存在多处预约模块时，所指定的表单控件id的命名前缀，如默认的ID前缀为“yy”。
 *==================================================*/
function addYuyue(button, isPage, type, desc, prefix, callback)
{
    var frm = getID(prefix ? prefix + "Yuyue" : "frmYuyue"),           //表单
        prefix = prefix || "yy",              //表单控件的ID前缀
        frmName = getID(prefix + "Name"),         //姓名
        frmSex = getID(prefix + "Male") || getID(prefix + "Sex"),           //性别（yyMale为单选按钮，yySex为下拉框）
        frmAge = getID(prefix + "Age"),           //年龄
        frmIDCard = getID(prefix + "IDCard"),     //身份证号码
        frmPhone = getID(prefix + "Phone"),       //电话号码
        frmQQ = getID(prefix + "QQ"),             //QQ
        frmMail = getID(prefix + "Mail"),         //Mail
        frmDoctor = getID(prefix + "Doctor"),     //预约专家
        frmDiscate = getID(prefix + "Discate"),   //疾病类型
        frmYibao = getID(prefix + "Insurance"), //有无医保
        frmTime = getID(prefix + "Date"),         //预约时间
        frmAddr = getID(prefix + "Addr"),         //地址
        frmDetail = getID(prefix + "Content"),    //描述
        strType = desc || "\u6302\u53f7\u9884\u7ea6",  //类别（ASCII字符：挂号预约）
        strContent = "",                      //附加内容汇总
        strUrl = "",                          //页面地址
        strGA = isPage ? "Register" : "Appointment",     //GA的类型代码
        type = type || (isPage ? "yuyue" : "messageRegister"),   //预约类型
        yyTimes = 3,                         //最大预约次数
        checkForm = Extend.checkForm;        //表单验证
    
    //禁用cookie视为非法请求！
    if(!navigator.cookieEnabled)
    {
        return;
    }

    //必须控制提交的次数
    var submitTimes = jQuery.getCookie("addYuyue");
    if(submitTimes === null)
    {
        submitTimes = 0;
        jQuery.setCookie("addYuyue", submitTimes, 60);
    }
    else if(parseInt(submitTimes) >= yyTimes && location.href.indexOf("localhost") === -1)
    {
        alert("\u64cd\u4f5c\u5931\u8d25\uff01\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u54a8\u8be2\u5728\u7ebf\u4e13\u5bb6\uff01");    //ASCII码字符：操作失败！请勿重复提交，如有疑问请咨询在线专家！
        frm.reset();
        return false;
    }
    
    //姓名
    var strName = checkForm.text(frmName, frmName && frmName.holderText || "", "\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d\uff01");     //ASCII字符：请输入您的姓名！
    if(strName === null)
    {
        return false; 
    }

    //性别
    var strSex = "";  
    if(frmSex !== null)
    {
        if(frmSex.type === "radio")
        {
            //单选按钮
            strSex = frmSex.checked ? "\u7537" : "\u5973";  //ASCII码字符：男|女
        }
        else
        {
            //下拉框
            strSex = frmSex.value;
        }
    }
    
    //年龄
    var strAge = checkForm.age(frmAge, frmAge && frmAge.holderText || "", "\u60a8\u7684\u5e74\u9f84\u8f93\u5165\u6709\u8bef\uff01"); //ASCII字符：您的年龄输入有误！
    if(strAge === null)
    {
        return false;
    }
    strAge = strAge === undefined ? "" : strAge;
    
    //身份证号码
    var strIDCard = checkForm.idcard(frmIDCard, frmIDCard && frmIDCard.holderText || "", "\u60a8\u7684\u201c\u8eab\u4efd\u8bc1\u53f7\u7801\u201d\u8f93\u5165\u6709\u8bef\uff01");  //ASCII码字符：您的“身份证号码”输入有误！
    if(strIDCard === null)
    {
        return false;
    }
    else if(strIDCard !== undefined)
    {
        strContent += "[br]\u3010\u8eab\u4efd\u8bc1\u53f7\u7801\uff1a\u3011" + strIDCard; //ASCII字符：【身份证号码：】
    }
    
    //QQ
    var strQQ = checkForm.text(frmQQ, frmQQ && frmQQ.holderText || "", "\u201cQQ\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“QQ”不能为空！
    if(strQQ === null)
    {
        return false;
    }
    else if(strQQ !== undefined)
    {
        strContent += "[br]\u3010QQ\uff1a\u3011" + strQQ; //ASCII字符：【QQ：】
    }

    //电话号码
    var strPhone = checkForm.phone(frmPhone, frmPhone && frmPhone.holderText || "", "\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01"); //ASCII字符：您的电话号码输入有误！
    if(strPhone === null)
    {
        return false;
    }
    
    //邮箱
    var strMail = checkForm.text(frmMail, frmMail && frmMail.holderText || "", "\u201c\u90ae\u7bb1\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");    //ASCII码字符：“邮箱”不能为空！
    if(strMail === null)
    {
        return false;
    }
    else if(strMail !== undefined)
    {
        strContent += "[br]\u3010\u90ae\u7bb1\uff1a\u3011" + strMail; //ASCII字符：【邮箱：】
    }

    //当三种联系方式均为空时，提示用户进行输入
    if(!strQQ && !strPhone && !strMail)
    {
        alert("\u8bf7\u8f93\u5165\u60a8\u7684\u8054\u7cfb\u65b9\u5f0f\uff01");   //ASCII码字符：请输入您的联系方式！
        if(frmPhone !== null)
        {
            frmPhone.focus();
        }
        return false;
    }
    
    //预约专家（下拉框）
    var strDoctor = "";
    if(frmDoctor !== null)
    {
        strDoctor = frmDoctor.value;
        strContent += "[br]\u3010\u9884\u7ea6\u4e13\u5bb6\uff1a\u3011" + strDoctor; //ASCII字符：【预约专家：】
    }

    //有无医保（下拉框）
    var strYibao = "";
    if(frmYibao !== null)
    {
        strYibao = frmYibao.value;
        strContent += "[br]\u3010\u6709\u65e0\u533b\u4fdd\uff1a\u3011" + strYibao; //ASCII字符：【有无医保：】
    }
    
    //疾病类型（下拉框）
    var strDiscate = "";
    if(frmDiscate !== null)
    {
        strDiscate = frmDiscate.value;
    }
    
    //预约时间
    var strTime = checkForm.time(frmTime, frmTime && frmTime.holderText || "", "\u4e0d\u80fd\u9009\u62e9\u4ee5\u5f80\u65e5\u671f\uff01"); //ASCII字符：不能选择以往日期！
    if(strTime === null)
    {
        return false;
    }
    strTime = strTime === undefined ? "" : strTime;
    
    //地址
    var strAddr = checkForm.text(frmAddr, frmAddr && frmAddr.holderText || "", "\u201c\u5730\u5740\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“地址”不能为空！
    if(strAddr === null)
    {
        return false;
    }
    else if(strAddr !== undefined)
    {
        strContent += "[br]\u3010\u5730\u5740\uff1a\u3011" + strAddr; //ASCII字符：【地址：】
    }
    
    //主要内容（描述）
    var strDetail = checkForm.text(frmDetail, frmDetail && frmDetail.holderText || "", "\u201c\u63cf\u8ff0\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“描述”不能为空！
    if(strDetail === null)
    {
        return false;
    }
    else if(strDetail !== undefined)
    {
        strContent += "[br]\u3010\u63cf\u8ff0\uff1a\u3011" + strDetail; //ASCII字符：【描述：】
    }

    //页面地址
    strUrl = jQuery.addUrlQuery(location.href, "label", prefix);
    strContent += "[br]\u3010\u7f51\u9875\u5730\u5740\uff1a\u3011" + location.hostname + location.pathname; //ASCII码字符：【网页地址：】
    
    //提交数据
    function doAjax()
    {
        //（由于是预约，所以需将参数txtclassid指定为0）
        button.disabled = true;
        var params = "act=" + type + "&yyh=1&txttype=" + escape(strType) + "&txtrealname=" + escape(strName) + "&txtsex=" + escape(strSex) + "&txtage=" + escape(strAge) + "&txtphone=" + escape(strPhone) + "&txtdetails=" + escape(strContent) + "&txtclassid=0&txtdiscate=" + escape(strDiscate) + "&txtordertime=" + escape(strTime) + "&txtpage=" + escape(strUrl) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer);
        jQuery.post("/inc/ajax.ashx?" + params, function()
        {
            button.disabled = false;
            var tips = arguments[0];
            if(isPage)
            {
                var reg = /xxx(.*)xxx(.*)xxx(.*)/,
                    yyInfo = reg.exec(tips),
                    yyh = "",
                    yydate = "";
                    
                if(yyInfo !== null)
                {
                    yyh = yyInfo[1];
                    yydate = yyInfo[2];
                    tips = yyInfo[3];
                }
                
                if(tips.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") === -1)
                {
                    getID("resDoctor").innerHTML = strDoctor;
                    getID("resDiscate").innerHTML = frmDiscate.options[frmDiscate.selectedIndex].text;
                    getID("resYYH").innerHTML = yyh;
                    getID("resName").innerHTML = strName;
                    getID("resSex").innerHTML = strSex;
                    getID("resAge").innerHTML = strAge;
                    getID("resAddr").innerHTML = strAddr;
                    getID("resContent").innerHTML = strDetail;
                    getID("resTime").innerHTML = strTime;
                    getID("resYYDate").innerHTML = yydate;
                    getID("resPhone").innerHTML = strPhone;
                    frmSex.style.visibility = "hidden";
                    frmDoctor.style.visibility = "hidden";
                    frmDiscate.style.visibility = "hidden";
                    if(getID("closeData").onclick === null)
                    {
                        getID("closeData").onclick = function()
                        {
                            this.parentNode.style.display = "none";
                            getID("yySex").style.visibility = "visible";
                            getID("yyDoctor").style.visibility = "visible";
                            getID("yyDiscate").style.visibility = "visible";
                        }   
                    }
                    getID("returnResult").style.display = "block";
                    jQuery.setCookie("addYuyue", parseInt(submitTimes) + 1, 60);
                    frm.reset();
                }
                else
                {
                    alert(tips);
                }
            }
            else
            {
                alert(tips);
                
                //ASCII字符：服务器正忙
                if(tips.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") === -1)
                {
                    jQuery.setCookie("addYuyue", parseInt(submitTimes) + 1, 60);
                    typeof callback === "function" && callback();
                    frm.reset();
                }
            }
        });
    }
    doAjax();
}


//添加除yuyue、messageRegister之外的类似预约的数据提交（例如：报名）
/*=================
 *参数说明：
 *1. button: 表单提交按钮的引用
 *2. type: 添加数据的类型（如：baoming——报名）
 *3. desc：对本次数据的说明
 *4. prefix：表单描述前缀
 *==================================================*/
function addData(button, type, desc, prefix, callback)
{
    addYuyue(button, false, type, desc, prefix, callback);
}


//添加费用查询(仅用于费用查询页面)
function addInquires(button)
{
    var frm = getID("frmInquires"),        //表单
        frmName = getID("cxName"),         //姓名
        frmPhone = getID("cxPhone"),       //电话号码
        frmQQ = getID("cxQQ"),             //QQ
        frmMail = getID("cxMail"),         //Mail
        frmDiscate = getID("cxDiscate"),   //疾病类型
        frmDetail = getID("cxContent"),    //内容
        strType = "\u8d39\u7528\u67e5\u8be2",    //分类（ASCII码字符：费用查询）
        strContent = "",                 
        strUrl = "",                    //页面地址
        yyTimes = 3,                    //最大预约次数
        checkForm = Extend.checkForm;   //表单验证

    //禁用cookie视为非法请求！
    if(!navigator.cookieEnabled)
    {
        return;
    }

    var submitTimes = jQuery.getCookie("addInquires");
    if(submitTimes === null)
    {
        submitTimes = 0;
        jQuery.setCookie("addInquires", submitTimes, 60);
    }
    else if(parseInt(submitTimes) >= yyTimes)
    {
        alert("\u64cd\u4f5c\u5931\u8d25\uff01\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4\u67e5\u8be2\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u54a8\u8be2\u5728\u7ebf\u4e13\u5bb6\uff01");  //ASCII码字符：操作失败！请勿重复提交查询，如有疑问请咨询在线专家！
        frm.reset();
        return false;
    }
    
    //姓名
    var strName = checkForm.text(frmName, frmName && frmName.holderText || "", "\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d\uff01");    //ASCII码字符：请输入您的姓名！
    if(strName === null)
    {
        return false; 
    }
    
    //电话号码
    var strPhone = checkForm.phone(frmPhone, frmPhone && frmPhone.holderText || "", "\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01");  //ASCII码字符：您的电话号码输入有误！
    if(strPhone === null)
    {
        return false;
    }
    
    //QQ
    var strQQ = checkForm.text(frmQQ, frmQQ && frmQQ.holderText || "", "\u201cQQ\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“QQ”不能为空！
    if(strQQ === null)
    {
        return false;
    }
    else if(strQQ !== undefined)
    {
        strContent += "[br]\u3010QQ\uff1a\u3011" + strQQ; //ASCII码字符：【QQ：】
    }
    
    //邮箱
    var strMail = checkForm.text(frmMail, frmMail && frmMail.holderText || "", "\u201c\u90ae\u7bb1\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“邮箱”不能为空！
    if(strMail === null)
    {
        return false;
    }
    else if(strMail !== undefined)
    {
        strContent += "[br]\u3010\u90ae\u7bb1\uff1a\u3011" + strMail;    //ASCII码字符：【邮箱：】
    }
    
    //疾病类型（下拉框）
    if(frmDiscate !== null)
    {
        strContent += "[br]\u3010\u75be\u75c5\u7c7b\u578b\uff1a\u3011" + frmDiscate.value;    //ASCII码字符：【疾病类型：】
    }
    
    //疾病描述
    var strDesc = checkForm.text(frmDetail, frmDetail && frmDetail.holderText || "", "\u201c\u75be\u75c5\u63cf\u8ff0\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");    //ASCIi码字符：“疾病描述”不能为空！
    if(strDesc === null)
    {
        return false;
    }
    else if(strDesc !== undefined)
    {
        strContent += "[br]\u3010\u63cf\u8ff0\uff1a\u3011" + strDesc;   //ASCII码字符：【描述：】
    }

    //页面地址
    strUrl = location.href;
    strContent += "[br]\u3010\u7f51\u9875\u5730\u5740\uff1a\u3011" + location.hostname + location.pathname; //ASCII码字符：【网页地址：】
    
    //如果有验证码
    var frmCode = getID("cxCaptcha");
    if(frmCode)
    {
        if(frmCode.value === "")
        {
            alert("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\uff01");  //ASCII码字符：请输入验证码！
            frmCode.focus();
            frmCode.select();
            return false;
        }
        
        jQuery.get("/inc/ajax_code.aspx?act=CheckCode&txtCaptcha=" + frmCode.value, function()
        {
            if(arguments[0]=="ok")
            {
                doAjax();
            }
            else
            {
                alert(arguments[0]);
                frmCode.focus();
                frmCode.select();
            }
        });
    }
    else
    {
        doAjax();
    }
    
    //提交数据
    function doAjax()
    {
        //（由于不是预约，所以需将参数txtclassid指定为1）
        var params = "act=addInquires&txttype=" + escape(strType) + "&txtrealname=" + escape(strName) + "&txtsex=&txtage=&txtphone=" + escape(strPhone) + "&txtdetails=" + escape(strContent) + "&txtclassid=1&txtdiscate=&txtordertime=&txtpage=" + escape(strUrl) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer);
        button.disabled = true;
        jQuery.post("/inc/ajax.ashx?" + params, function()
        {
            button.disabled = false;
            var tips = arguments[0];
            alert(tips);
            
            if(tips.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") === -1) //ASCII码字符：
            {
                jQuery.setCookie("addInquires", parseInt(submitTimes) + 1, 60);
                frm.reset();
            }
        });
    }
}


//百姓评议
function addComments(button)
{
    var frm = getID("frmComments"),         //表单
        frmName = getID("pyName"),          //姓名
        frmAge = getID("pyAge"),            //年龄
        frmSex = getID("pyMale") || getID("pySex"),            //性别（pyMale为单选按钮，pySex为下拉框）
        frmTime = getID("pyTime"),          //时间
        frmPhone = getID("pyPhone"),        //电话
        frmHave = getID("pyHave"),          //是否有就诊经历
        frmMail = getID("pyMail"),          //邮箱
        frmDisease = getID("pyDisease"),    //疾病描述
        frmEffect = getID("pyEffect"),      //治疗效果
        frmAttitude = getID("pyAttitude"),  //态度
        frmDetail = getID("pyContent");     //附加说明
        strType = "\u6211\u8981\u8bc4\u8bae",//分类（ASCII字符：我要评议）
        strContent = "",                 
        strUrl = "",                          //页面地址
        yyTimes = 3,                    //最大预约次数
        checkForm = Extend.checkForm;   //表单验证
    
    //禁用cookie视为非法请求！
    if(!navigator.cookieEnabled)
    {
        return;
    }

    //必须控制提交的次数
    var submitTimes = jQuery.getCookie("doComments");
    if(submitTimes === null)
    {
        submitTimes = 0;
        jQuery.setCookie("doComments", submitTimes, 60);
    }
    else if(parseInt(submitTimes) >= yyTimes)
    {
        alert("\u64cd\u4f5c\u5931\u8d25\uff01\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4\u8bc4\u8bae\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u54a8\u8be2\u5728\u7ebf\u4e13\u5bb6\uff01");    //ASCII码字符：操作失败！请勿重复提交评议，如有疑问请咨询在线专家！
        reset();
        return false;
    }
    
    //姓名
    var strName = checkForm.text(frmName, frmName && frmName.holderText || "", "\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d\uff01");     //ASCII字符：请输入您的姓名！
    if(strName === null)
    {
        return false; 
    }
    
    //性别
    var strSex = "";  
    if(frmSex !== null)
    {
        if(frmSex.type === "radio")
        {
            //单选按钮
            strSex = frmSex.checked ? "\u7537" : "\u5973";  //ASCII码字符：男|女
        }
        else
        {
            //下拉框
            strSex = frmSex.value;
        }
    }
    
    //电话号码
    var strPhone = checkForm.phone(frmPhone, frmPhone && frmPhone.holderText || "", "\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01"); //ASCII字符：您的电话号码输入有误！
    if(strPhone === null)
    {
        return false;
    }
    
    //邮箱
    var strMail = checkForm.text(frmMail, frmMail && frmMail.holderText || "", "\u201c\u90ae\u7bb1\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01"); //ASCII码字符：“邮箱”不能为空！
    if(strMail === null)
    {
        return false;
    }
    else if(strMail !== undefined)
    {
        strContent += "[br]\u3010\u90ae\u7bb1\uff1a\u3011" + strMail; //ASCII字符：【邮箱：】
    }
    
    //是否有就诊经历
    if(frmHave.checked)
    {
        //疾病描述
        var strDisease = checkForm.text(frmDisease, frmDisease && frmDisease.holderText || "", "\u201c\u8bca\u65ad\u75be\u75c5\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01"); //ASCII码字符：“诊断疾病”不能为空！
        if(strDisease === null)
        {
            return false;
        }
        else if(strDisease !== undefined)
        {
            strContent += "[br]\u3010\u75be\u75c5\u63cf\u8ff0\uff1a\u3011" + strDisease; //ASCII字符：【疾病描述：】
        }

        //治疗效果
        var strEffect = checkForm.text(frmEffect, frmEffect && frmEffect.holderText || "", "\u201c\u6cbb\u7597\u6548\u679c\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01"); //ASCII码字符：“治疗效果”不能为空！
        if(strEffect === null)
        {
            return false;
        }
        else if(strEffect !== undefined)
        {
            strContent += "[br]\u3010\u6cbb\u7597\u6548\u679c\uff1a\u3011" + strEffect; //ASCII字符：【治疗效果：】
        }

        //医护态度
        var strAttitude = checkForm.text(frmAttitude, frmAttitude && frmAttitude.holderText || "", "\u201c\u533b\u62a4\u6001\u5ea6\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01"); //ASCII码字符：“医护态度”不能为空！
        if(strAttitude === null)
        {
            return false;
        }
        else if(strAttitude !== undefined)
        {
            strContent += "[br]\u3010\u533b\u62a4\u6001\u5ea6\uff1a\u3011" + strAttitude; //ASCII字符：【医护态度：】
        }
    }
    
    //主要内容（补充说明）
    var strDetail = checkForm.text(frmDetail, frmDetail && frmDetail.holderText || "", "\u201c\u8865\u5145\u8bf4\u660e\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“补充说明”不能为空！
    if(strDetail === null)
    {
        return false;
    }
    else if(strDetail !== undefined)
    {
        if(strDetail.length < 30)
        {
            alert("\u201c\u8865\u5145\u8bf4\u660e\u201d\u7684\u5185\u5bb9\u5b57\u6570\u4e0d\u80fd\u5c11\u4e8e30\u5b57\uff01");          //ASCII码字符：“补充说明”的内容字数不能少于30字！
            frmDetail.focus();
            frmDetail.select();
            return false;
        }
        strContent += "[br]\u3010\u63cf\u8ff0\uff1a\u3011" + strDetail; //ASCII字符：【描述：】
    }

    //页面地址
    strUrl = location.href;
    strContent += "[br]\u3010\u7f51\u9875\u5730\u5740\uff1a\u3011" + location.hostname + location.pathname; //ASCII码字符：【网页地址：】
    
    //提交数据
    function doAjax()
    {
        //（由于不是预约，所以需将参数txtclassid指定为1）
        button.disabled = true;
        var params = "act=doComments&txttype=" + escape(strType) + "&txtrealname=" + escape(strName) + "&txtsex=" + escape(strSex) + "&txtage=&txtphone=" + escape(strPhone) + "&txtdetails=" + escape(strContent) + "&txtclassid=1&txtdiscate=&txtordertime=&txtpage=" + escape(strUrl) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer);
        jQuery.post("/inc/ajax.ashx?" + params, function()
        {
            button.disabled = false;
                        
            var tips = arguments[0];
            alert(tips);
            
            //ASCII字符：服务器正忙
            if(tips.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") === -1)
            {
                jQuery.setCookie("doComments", parseInt(submitTimes) + 1, 60);
                reset();
            }
        });
    }
    doAjax();
    
    //表单重置
    function reset()
    {
        frm.reset();
        frmDisease.parentNode.style.display = "block";
        frmEffect.parentNode.style.display = "block";
        frmAttitude.parentNode.style.display = "block";
    }
}


//添加问答（仅用于在线问答页面）
function addAnswer(button)
{
    var frm = getID("frmAsk"),              //表单
        frmName = getID("askName"),         //姓名
        frmAge = getID("askAge"),           //年龄
        frmPhone = getID("askPhone"),       //电话号码
        frmProblems = getID("askProblems"), //问题
        frmDetail = getID("askContent"),    //内容
        strType = "\u5728\u7ebf\u95ee\u7b54",  //分类（ASCII码字符：在线问答）
        strContent = "",                 
        strUrl = "",                          //页面地址
        yyTimes = 3,                    //最大预约次数
        checkForm = Extend.checkForm;   //表单验证
    
    //禁用cookie视为非法请求！
    if(!navigator.cookieEnabled)
    {
        return;
    }

    var submitTimes = jQuery.getCookie("addAnswer");
    if(submitTimes === null)
    {
        submitTimes = 0;
        jQuery.setCookie("addAnswer", submitTimes, 24*60);
    }
    else if(parseInt(submitTimes) >= yyTimes)
    {
        alert("\u64cd\u4f5c\u5931\u8d25\uff01\u60a8\u4eca\u65e5\u7684\u63d0\u95ee\u6b21\u6570\u8fc7\u591a\uff0c\u8bf7\u660e\u5929\u518d\u8bd5\uff01\u5982\u6709\u7591\u95ee\u8bf7\u54a8\u8be2\u5728\u7ebf\u4e13\u5bb6\uff01");  //ASCII码字符：操作失败！您今日的提问次数过多，请明天再试！如有疑问请咨询在线专家！
        frm.reset();
        return false;
    }
    
    //姓名
    var strName = checkForm.text(frmName, frmName && frmName.holderText || "", "\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d\uff01");    //ASCII码字符：请输入您的姓名！
    if(strName === null)
    {
        return false; 
    }
    strName = strName === undefined ? "" : strName;

    //年龄
    var strAge = checkForm.age(frmAge, frmAge && frmAge.holderText || "", "\u60a8\u7684\u5e74\u9f84\u8f93\u5165\u6709\u8bef\uff01"); //ASCII字符：您的年龄输入有误！
    if(strAge === null)
    {
        return false;
    }
    strAge = strAge === undefined ? "" : strAge;

    //电话号码
    var strPhone = checkForm.phone(frmPhone, frmPhone && frmPhone.holderText || "", "\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01");  //ASCII码字符：您的电话号码输入有误！
    if(strPhone === null)
    {
        return false;
    }
   
    //问题
    var strProblems = checkForm.text(frmProblems, frmProblems && frmProblems.holderText || "", "\u60a8\u7684\u95ee\u9898\u63cf\u8ff0\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：您的问题描述不能为空！
    if(strProblems === null)
    {
        return false;
    }
    else if(strProblems !== undefined)
    {
        strContent += "[br]\u3010\u95ee\u9898\uff1a\u3011" + strProblems; //ASCII码字符：【问题：】
    }
    
    //说明
    var strDesc = checkForm.text(frmDetail, frmDetail && frmDetail.holderText || "", "\u201c\u8bf4\u660e\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");   //ASCII码字符：“说明”不能为空！
    if(strDesc === null)
    {
        return false;
    }
    else if(strDesc !== undefined)
    {
        strContent += "[br]\u3010\u63cf\u8ff0\uff1a\u3011" + strDesc; //ASCII码字符：【描述：】
    }

    //页面地址
    strUrl = location.href;
    strContent += "[br]\u3010\u7f51\u9875\u5730\u5740\uff1a\u3011" + location.hostname + location.pathname; //ASCII码字符：【网页地址：】
    
    //提交数据
    function doAjax()
    { 
        //（由于是问答，所以需将参数txtclassid指定为2）
        var params = "act=addAnswer&txttype=" + escape(strType) + "&txtrealname=" + escape(strName) + "&txtsex=&txtage=" + escape(strAge) + "&txtphone=" + escape(strPhone) + "&txtdetails=" + escape(strContent) + "&txtclassid=2&txtdiscate=&txtordertime=&txtpage=" + escape(strUrl) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer);
        button.disabled = true;
        jQuery.post("/inc/ajax.ashx?" + params, function()
        {
            button.disabled = false;
            var tips = arguments[0];
            alert(tips);
            
            if(tips.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") === -1) //ASCII码字符：服务器正忙
            {
                jQuery.setCookie("addAnswer", parseInt(submitTimes) + 1, 24*60);
                frm.reset();
            }
        });
    }
    doAjax();
}


//添加意见反馈
function addComplaint()
{
    var button = getID("doComplaint"), //提交按钮
        tsQuestionsOhter = getID("tsQuestionsOhter"), //其他投诉事项复选框
        tsQuestionsOhterInput = getID("tsQuestionsOhterInput"), //其他投诉事项文本输入框
        tsInfo = getID("tsInfo"),   //访客信息外围容器
        tsIsAnonymity = getID("tsIsAnonymity"), //填写访客信息单选按钮
        tsNoAnonymity = getID("tsNoAnonymity"); //不填写访客信息单选按钮
    
    //是否需要填写其他“投诉事项”
    if(tsQuestionsOhter) tsQuestionsOhter.onclick = function()
    {
        tsQuestionsOhterInput.parentNode.style.display = this.checked ? "block" : "none";
    }
    
    //是否填写访客信息
    if(tsIsAnonymity) tsIsAnonymity.onclick = function()
    {
        tsInfo.style.display = "block";
    }
    if(tsNoAnonymity) tsNoAnonymity.onclick = function()
    {
        tsInfo.style.display = "none";
    }
    
    //提交数据
    button.onclick = function()
    {
        var frm = getID("fryComplaint"),            //表单
            frmName = getID("tsName"),              //姓名
            frmSex = getID("tsMale") || getID("tsSex"), //性别（tsMale为单选按钮，tsSex为下拉框）
            frmAge = getID("tsAge"),                //年龄
            frmPhone = getID("tsPhone"),            //电话号码
            frmMail = getID("tsMail"),              //Mail
            frmAddr = getID("tsAddr"),              //地址
            questions = getID("tsQuestions"),       //意见反馈列表的父级容器
            strType = "\u6295\u8bc9\u5efa\u8bae",  //类别（ASCII字符：投诉建议）
            strContent = "",                        //附加内容汇总
            strUrl = "",                            //页面地址
            yyTimes = 3,                            //最大提交次数
            checkForm = Extend.checkForm,           //表单验证
            i, len;
            
        //禁用cookie视为非法请求！
        if(!navigator.cookieEnabled)
        {
            return;
        }

        //必须控制提交的次数
        var submitTimes = jQuery.getCookie("addComplaint");
        if(submitTimes === null)
        {
            submitTimes = 0;
            jQuery.setCookie("addComplaint", submitTimes, 1);
        }
        else if(parseInt(submitTimes) >= yyTimes && location.href.indexOf("localhost") === -1)
        {
            alert("\u64cd\u4f5c\u5931\u8d25\uff01\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u54a8\u8be2\u5728\u7ebf\u4e13\u5bb6\uff01");    //ASCII码字符：操作失败！请勿重复提交，如有疑问请咨询在线专家！
            frm.reset();
            return false;
        }
        
        //获取意见反馈事项
        if(!questions)
        {
            alert("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u9879\u57fa\u672c\u6295\u8bc9\u4e3e\u62a5\u60c5\u51b5\uff01");  //ASCII码字符：请至少选择一项基本投诉举报情况！
            return false;
        }
        var questionsList = questions.getElementsByTagName("input");
        var strQuestions = "[br]\u3010\u610f\u89c1\u53cd\u9988\uff1a\u3011";  //ASCII码字符：【意见反馈：】
        for(i = 0, len = questionsList.length; i < len; i++)
        {
            if(questionsList[i].checked) strQuestions += questionsList[i].value + " || ";
        }
        if(strQuestions === "[br]\u3010\u610f\u89c1\u53cd\u9988\uff1a\u3011")
        {
            alert("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u9879\u57fa\u672c\u6295\u8bc9\u4e3e\u62a5\u60c5\u51b5\uff01");  //ASCII码字符：请至少选择一项基本投诉举报情况！
            return false;
        }
        if(tsQuestionsOhter && tsQuestionsOhter.checked)
        {
            strQuestions += tsQuestionsOhterInput.value;
        }
        
        //获取访客信息
        var strName = "", strSex = "", strAge = "", strPhone = "", strMail = "", strAddr = "";                
        if(tsIsAnonymity && tsIsAnonymity.checked)
        {
            //姓名
            strName = checkForm.text(frmName, frmName && frmName.holderText || "", "\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d\uff01");     //ASCII字符：请输入您的姓名！
            if(strName === null)
            {
                return false; 
            }

            //性别
            if(frmSex !== null)
            {
                if(frmSex.type === "radio")
                {
                    //单选按钮
                    strSex = frmSex.checked ? "\u7537" : "\u5973";  //ASCII码字符：男|女
                }
                else
                {
                    //下拉框
                    strSex = frmSex.value;
                }
            }
            
            //年龄
            strAge = checkForm.age(frmAge, frmAge && frmAge.holderText || "", "\u60a8\u7684\u5e74\u9f84\u8f93\u5165\u6709\u8bef\uff01"); //ASCII字符：您的年龄输入有误！
            if(strAge === null)
            {
                return false;
            }
            strAge = strAge === undefined ? "" : strAge;
            
            //电话号码
            strPhone = checkForm.phone(frmPhone, frmPhone && frmPhone.holderText || "", "\u60a8\u7684\u7535\u8bdd\u53f7\u7801\u8f93\u5165\u6709\u8bef\uff01"); //ASCII字符：您的电话号码输入有误！
            if(strPhone === null)
            {
                return false;
            }
            
            //邮箱
            strMail = checkForm.text(frmMail, frmMail && frmMail.holderText || "", "\u201c\u90ae\u7bb1\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");    //ASCII码字符：“邮箱”不能为空！
            if(strMail === null)
            {
                return false;
            }
            else if(strMail !== undefined)
            {
                strContent += "\u3010\u90ae\u7bb1\uff1a\u3011" + strMail; //ASCII字符：【邮箱：】
            }
            
            //地址
            strAddr = checkForm.text(frmAddr, frmAddr && frmAddr.holderText || "", "\u201c\u5730\u5740\u201d\u4e0d\u80fd\u4e3a\u7a7a\uff01");  //ASCII码字符：“地址”不能为空！
            if(strAddr === null)
            {
                return false;
            }
            else if(strAddr !== undefined)
            {
                strContent += "[br]\u3010\u5730\u5740\uff1a\u3011" + strAddr; //ASCII字符：【地址：】
            }
        }
        strContent += strQuestions;
        
        //页面地址
        strUrl = location.href;
        strContent += "[br]\u3010\u7f51\u9875\u5730\u5740\uff1a\u3011" + location.hostname + location.pathname; //ASCII码字符：【网页地址：】
                    
        //提交数据
        function doAjax()
        {
            //（投诉建议属于“咨询”系列，所以需将参数txtclassid指定为1）
            button.disabled = true;
            var params = "act=addComplaint&txttype=" + escape(strType) + "&txtrealname=" + escape(strName) + "&txtsex=" + escape(strSex) + "&txtage=" + escape(strAge) + "&txtphone=" + escape(strPhone) + "&txtdetails=" + escape(strContent) + "&txtclassid=1&txtdiscate=&txtordertime=&txtpage=" + escape(strUrl) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer);
            jQuery.post("/inc/ajax.ashx?" + params, function()
            {
                var tips = arguments[0];
                button.disabled = false;
                alert(tips);
                                    
                //ASCII字符：服务器正忙
                if(tips.indexOf("\u670d\u52a1\u5668\u6b63\u5fd9") === -1)
                {
                    jQuery.setCookie("addComplaint", parseInt(submitTimes) + 1, 1);
                    frm.reset()
                    tsInfo.style.display = "block";
                }
            });
        }
        doAjax();
    }
}


//谷歌分析数据补充
//统计患者点击商务通咨询的操作记录，操作方式分为漂浮框的点击和内页中咨询链接的点击。
function ggAnalytics(type, operate, label)
{
    type = (type == undefined || type == 0) ? "Shangwutong" : type;
    operate = (operate == undefined || operate == 0) ? "\u6f02\u6d6e\u6846\u54a8\u8be2" : operate; //ASCII码字符：漂浮框咨询
    label = (label == undefined || label == 0) ? "zixun" : label;
    
    try
    {
        _gaq.push(['_trackEvent', type, type + "-" + operate, label]);
    }
    catch(e){}
    jQuery.post("/inc/ajax.ashx?act=addEventData&type=" + escape(type) + "&operate=" + escape(operate) + "&label=" + escape(label) + "&page=" + escape(location.href) + "&keywords=" + escape(jQuery.search_keywords) + "&source=" + escape(jQuery.search_source) + "&page_referrer=" + escape(document.referrer), function(){});
}





//=====================================================================================================================================
//=======================================对商务通咨询方法以及邀请框、漂浮框进行重写处理================================================
//=======================================对商务通咨询方法以及邀请框、漂浮框进行重写处理================================================
//=====================================================================================================================================
//==================================
//重写openZoosUrl方法，即商务通直接对话
//首先使用window.open直接弹出，如果弹出失败则直接更改当前页面的URL
function rewriteZoosUrl()
{
    var width = 720,
        height = 610,
        left = (screen.availWidth - width) / 2,
        top = (screen.availHeight - width) / 2,
        label = "?label=",
        url = "/zixun.aspx?" + "&cid=" + LR_cid + "&lng=" + LR_lng + "&sid=" + LR_sid + "&page=" + location.href + label + "openZoosUrl",
        oWindow;

    window.doOpenZixun = true;  //用来标识页面即将执行咨询对话操作，可供其他功能需求做兼容处理
    setTimeout(function()
    {
        window.doOpenZixun = undefined;
    }, 3000);

    oWindow = window.open(url, "_blank", "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ",status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=no,location=no,titlebar=no");
    try
    {
        //在IE、Firefox、Chrome、Safari、傲游浏览器、世界之窗浏览器、搜狗浏览器中，oWindow的值为undefined
        //而在360安全浏览器、360极速浏览器、世界之窗浏览器中，oWindow则为有效的window对象
        if(oWindow.document.body.innerHTML === "")
        {
            location.assign(url);
        }
    }
    catch(e)
    {
        location.assign(url);
    }
    ggAnalytics("Shangwutong", "\u6f02\u6d6e\u6846\u54a8\u8be2", "openZoosUrl"); //ASCII码字符：漂浮框咨询
}
//==================================
//重写zixun方法，用以统一跳转至zixun.aspx页面
function rewriteZixun(param, swt, isSpecial)
{
    var width = 720,
        height = 610,
        left = (screen.availWidth - width) / 2,
        top = (screen.availHeight - width) / 2,
        hostname = location.hostname,
        label = "?label=",
        url = "/zixun.aspx?" + "&cid=" + LR_cid + "&lng=" + LR_lng + "&sid=" + LR_sid + "&page=" + location.href;

    window.doOpenZixun = true;  //用来标识页面即将执行咨询对话操作，可供其他功能需求做兼容处理
    setTimeout(function()
    {
        window.doOpenZixun = undefined;
    }, 3000);
    
    if(swt)
    {
        //例：zixun(0, 'floatRight-1');
        //表示为商务通邀请框或漂浮框的点击
        window.open(url+ label + swt, "_blank", "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ",status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=no,location=no,titlebar=no");
        ggAnalytics("Shangwutong", "\u6f02\u6d6e\u6846\u54a8\u8be2", swt); //ASCII码字符：漂浮框咨询   
    }
    else
    {
        //例：zixun('header-btn1');
        //表示为站内咨询按钮或链接的点击
        param = param == undefined ? "zixun" : param;
        window.open(url+ label + param, "_blank", "width=" + width + ",height=" + height + ",top=200,left=" + left + ",status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=no,location=no,titlebar=no");
        ggAnalytics("Shangwutong", "\u7ad9\u5185\u54a8\u8be2", param);  //ASCII码字符：站内咨询
    }
}
//==================================
//默认的咨询方法
window.zixun = $$.zixun = rewriteZixun;
window.openZoosUrl = rewriteZoosUrl;
//==================================
//下面的代码用于对商务通行为进行监测
function float_changeCenter(){};
function float_changeFloat(){};
function rewriteSWT()
{
    //如果zixun方法没有被重新赋值，则继续监测
    if(zixun === rewriteZixun)
    {
        setTimeout(rewriteSWT, 100);
        return;
    }

    //所需变量
    window.float_showCenterOnFirst = false; //首次是否显示邀请框
    window.float_closeCenterTime = 0;      //关闭邀请框的次数
    window.float_hideCenterTime = 0;       //隐藏邀请框的次数
    window.float_hideAsideTime = 0;        //隐藏漂浮框的次数
    window.float_stopChangeCenter = 0;     //邀请框监测程序的定时器ID
    window.float_stopChangeFloat = 0;      //漂浮框监测程序的定时器ID

    //通用对象
    var id_oldCenter,  //原邀请框
        id_oldCenter2, //原邀请框内容容器
        id_oldFloat,   //原漂浮框
        id_zxCenter,   //自定义邀请框
        id_zxAside,    //自定义漂浮框
        oldDoCloseCenter,   //原关闭邀请框的方法
        oldDoHideCenter,    //原隐藏邀请框的方法
        oldDoCloseFloat;    //原关闭漂浮框的方法

    //百度商桥重写配置
    if(window.qiaoStr === "qiao.baidu.com")
    {
        //参数赋值
        id_oldCenter = "BDBridgeInviteWrap";
        id_oldCenter2 = "InviteContainer";
        id_oldFloat = "BDBridgeIconWrap";
        id_zxCenter = "zixunBox";
        id_zxAside = "zixunBoxAside";
        oldDoCloseCenter = function()
        {
            try{ bridgeInviteClose(); } catch(e) {}  //反馈给百度商桥：关闭邀请框 + 拒绝邀请
            // try{ BDBridge.invite.__ignore(); } catch(e) {}  //该语句中的代码是用来实现上面的bridgeInviteClose函数的功能用的
        };
        oldDoHideCenter = function()
        {
            try{ BDBridge.invite.__hide();BDBridge.invite.__doClear() } catch(e) {}  //反馈给百度商桥：隐藏邀请框 + 取消自动弹出（但是并没有取消邀请，隔6秒还会继续弹出邀请框）
        };
        oldDoCloseFloat = function()
        {
            //百度商桥无关闭漂浮框行为
        };

        //重置zixun方法
        window.zixun = function()
        {
            getID("chatnow").onclick();
        };
    }
    //商务通重写配置
    else
    {
        //参数赋值
        id_oldCenter = "LRdiv1";
        id_oldFloat = "LRdiv0";
        id_zxCenter = "zixunBox";
        id_zxAside = "zixunBoxAside";
        oldDoCloseCenter = function()
        {
            try{ LR_HideInvite();LR_RefuseChat(); } catch(e) {}  //反馈给商务通：关闭邀请框 + 拒绝邀请
        };
        oldDoHideCenter = function()
        {
            try{ LR_HideInvite(); } catch(e) {}  //反馈给商务通：隐藏邀请框（如果处于邀请状态，则隔6秒还会继续弹出邀请框）
        };
        oldDoCloseFloat = function()
        {
            try{ onlinerIcon0.hidden(); } catch(e) {}  //反馈给商务通：关闭漂浮框
        };

        //监测百度商桥漂浮框，将其永久隐藏
        function checkBDBridge()
        {
            /*var BDBridgeOuter = document.getElementById("BDBridgeWrap");
            if(BDBridgeOuter)
            {
                BDBridgeOuter.style.cssText += ";display:none !important;visibility:hidden !important;";
            }
            else
            {
                setTimeout(checkBDBridge, 100);
            }*/
            var BDBridgeIconWrap = document.getElementById("BDBridgeIconWrap"), styleText = ";display:none !important;visibility:hidden !important;";
            if(BDBridgeIconWrap)
            {
                BDBridgeIconWrap.style.cssText += styleText;
                try{
                    document.getElementById("BDBridgeMess").style.cssText += styleText;
                    document.getElementById("BDBridgeInviteWrap").style.cssText += styleText;   
                }catch(e){ }
            }
            else
            {
                setTimeout(checkBDBridge, 100);
            }
        }
        checkBDBridge();

        //重置咨询方法
        window.zixun = rewriteZixun;
        setTimeout(function()
        {
            //商务通中的openZoosUrl方法在zixun方法被重置时还没有被创建，这里通过延时执行来避免这个问题
            window.openZoosUrl = rewriteZoosUrl;
        }, 5000);

        //对23:30~08:00这段时间内没有咨询人员在线的情况进行兼容性处理
        var now = new Date();
        if((now.getHours() >= 23 && now.getMinutes() >= 30) || now.getHours() < 8)
        {
            zixun = rewriteZixun = rewriteZoosUrl = $$.zixun; //如果网站项目的脚本配置中具备$$.zixun的重新赋值，则采用该网站自定义的zixun需求；否则，则依旧为正常时间段的rewriteZixun方法。
        }
    }
    window.doneRewriteZixun = true;  //标识重写咨询方法已完成！

    //显示邀请框的监测操作
    window.float_showCenterCheck = function()
    {
        var oldCenter = getID(id_oldCenter); //原邀请框
        var zxCenter = getID(id_zxCenter); //自定义邀请框
        var zxAside = getID(id_zxAside);  //自定义漂浮框
        var isHideMode1 = window.float_hideMode !== undefined && window.float_hideMode === "1"; //永久隐藏，不可邀请
        var isHideMode2 = window.float_hideMode !== undefined && window.float_hideMode === "2"; //首次隐藏，可以邀请

        if(oldCenter){ oldCenter.style.display = "none"; }  //隐藏原邀请框
        if(zxCenter && !isHideMode1 && (!isHideMode2 || float_hideCenterTime >= 1)){ float_showCenter(zxCenter) } //常规判断邀请框是否显示
        if(zxCenter && float_showCenterOnFirst && float_hideCenterTime === 0){ float_showCenter(zxCenter) } //首次显示邀请框
        if(zxCenter && zxCenter.style.display === "block" && zxAside){ zxAside.style.display = "none"; }  //邀请框显示时，暂时隐藏漂浮框
        if(isHideMode2 && float_hideCenterTime === 0){ float_hideCenterTime = 1; return false; } //如果邀请框隐藏模式为2，则在首次显示邀请框时将关闭状态值设置为1

        if(!zxCenter || isHideMode1)
        {
            oldDoCloseCenter();     //如果没有自定义邀请框或者永久隐藏邀请框，则执行一次关闭邀请框动作
        }
    }

    //显示邀请框
    window.float_showCenter = function(zxCenter)
    {
        zxCenter.style.display = "block";
        if(window.float_doOnShowCenter){ window.float_doOnShowCenter.call(); }
    }

    //关闭邀请框
    window.float_closeCenter = function()
    {
        float_closeCenterTime++;
        oldDoCloseCenter(); float_hideCenter(true);
        if(window.float_doOnCloseCenter){ window.float_doOnCloseCenter.call(); }
    }

    //隐藏邀请框
    window.float_hideCenter = function(isClose)
    {
        var zxCenter = getID(id_zxCenter); //自定义邀请框
        var zxAside = getID(id_zxAside);  //自定义漂浮框

        isClose === undefined && oldDoHideCenter();
        if(zxCenter){ zxCenter.style.display = "none"; }
        if(zxAside && float_hideAsideTime === 0){ zxAside.style.display = "block"; }

        float_hideCenterTime++;
        if(window.float_doOnHideCenter){ window.float_doOnHideCenter.call(); }
    }

    //隐藏漂浮框
    window.float_hideFloat = function()
    {
        var zxAside = getID(id_zxAside);  //自定义漂浮框

        oldDoCloseFloat();
        if(zxAside){ zxAside.style.display = "none"; }
        float_hideAsideTime++;
    }

    //邀请框的监测程序
    window.float_changeCenter = function()
    {
        var oldCenter = getID(id_oldCenter);  //原邀请框
        var oldCenter2 = getID(id_oldCenter2); //原邀请框内容容器
        if(oldCenter)
        {
            oldCenter.style.visibility = "hidden";  //将原邀请框隐藏，避免程序替换样式时出现短时间的闪烁效果
            oldCenter2 && (oldCenter2.style.cssText += ";display:none !important;visibility:hidden !important;");  //将原邀请框内容隐藏，避免内容重复闪现
            if(oldCenter.style.display === "block")
            {
                float_showCenterCheck();
            }
        }
        
        float_stopChangeCenter = setTimeout(function()
        {
            float_changeCenter();
        }, 100);
    }

    //漂浮框的监测程序
    window.float_changeFloat = function()
    {
        var oldFloat = getID(id_oldFloat);  //原漂浮框
        var zxCenter = getID(id_zxCenter); //自定义邀请框
        var zxAside = getID(id_zxAside); //自定义漂浮框

        if(oldFloat)
        {
            oldFloat.style.visibility = "hidden";
            if(oldFloat.style.display === "block")
            {
                oldFloat.style.display = "none";
                if(zxAside && zxCenter && zxCenter.style.display === "none" && float_hideAsideTime === 0){ zxAside.style.display = "block"; }
            }
        }
        
        float_stopChangeFloat = setTimeout(function()
        {
            float_changeFloat();
        }, 100);
    }

    //文档加载完毕之后，执行相关检测
    jQuery(window).on("load", function()
    {
        var oldCenter = getID(id_oldCenter);    //原邀请框
        var zxCenter = getID(id_zxCenter);      //自定义邀请框
        var zxAside = getID(id_zxAside);        //自定义漂浮框

        //如果还没有商务通的默认容器，则直接显示邀请框
        if(!oldCenter)
        {
            if(zxCenter){ zxCenter.style.display = "block"; }
            if(zxAside){ zxAside.style.display = "none"; }
        }
        //如果邀请框没被关闭一次，且邀请框处于隐藏状态，则执行显示邀请框操作
        else if(float_hideCenterTime == 0 && zxCenter && zxCenter.style.display != "block")
        {
            float_showCenterCheck();
        }
    });

    // ==========================
    // 关于商务通邀请框的特殊设置：
    // 1. 咨询人员依旧禁止邀请患者，即使邀请也将属于无效操作；
    // 2. 网站打开3~5秒后立马显示邀请框；
    // 3. 当患者首次关闭邀请框后，隔45秒将再次自动弹出；
    // 4. 当患者再次关闭邀请框后，隔120秒将再次自动弹出；
    // ======================================================================
    // window.float_hideMode = "1"; //邀请框永久隐藏，不允许咨询进行邀请操作
    // window.float_showCenterOnFirst = true; //首次显示邀请框
    // window.float_doOnCloseCenter = function()
    // {
    //     setTimeout(function()
    //     {
    //         var zxCenter = getID(id_zxCenter); //自定义邀请框ID
    //         if(zxCenter)
    //         {
    //             zxCenter.style.display = "block";
    //         }
    //     }, float_closeCenterTime > 1 ? 120000 : 45000);
    // }
    window.float_hideMode = "1"; //邀请框永久隐藏，不允许咨询进行邀请操作
    window.float_showCenterOnFirst = true; //首次显示邀请框
    if(/ebh029|ent029|87401000|er029|029ebhw|ptywjx|ent0431|ear029|029ebh|029ear/.test(location.href))
    {
        // ==========================
        // 关于商务通邀请框的特殊设置：
        // 1. 咨询人员在前35秒之前禁止邀请患者，即使邀请也将属于无效操作；
        // 2. 网站打开3~5秒后立马显示邀请框；
        // 3. 当患者首次关闭邀请框后，隔30秒将再次自动弹出；
        // 4. 当患者再次关闭邀请框后，将自动每隔20秒再次弹出，咨询人员将恢复邀请患者的权限；
        // ======================================================================
        // window.float_doOnCloseCenter = function()
        // {
        //     //邀请框自动弹出
        //     setTimeout(function()
        //     {
        //         var zxCenter = getID(id_zxCenter); //自定义邀请框ID
        //         if(zxCenter)
        //         {
        //             zxCenter.style.display = "block";
        //         }
        //     }, float_closeCenterTime > 1 ? 20000 : 30000);
        // }
        window.float_hideMode = undefined;  //不隐藏邀请框，咨询人员可邀请
    }
    else
    {
        // ==========================
        // 关于商务通邀请框的特殊设置：
        // 1. 咨询人员在前35秒之前禁止邀请患者，即使邀请也将属于无效操作；
        // 2. 网站打开3~5秒后立马显示邀请框；
        // 3. 当患者首次关闭邀请框后，隔30秒将再次自动弹出；
        // 4. 当患者再次关闭邀请框后，将不再自动弹出，咨询人员将恢复邀请患者的权限；
        // ======================================================================
        window.float_doOnCloseCenter = function()
        {
            //邀请框关闭两次之后，恢复为普通模式
            if(float_closeCenterTime > 1)
            {
                float_hideMode = undefined;
                float_doOnCloseCenter = undefined;
                return;
            }

            //邀请框自动弹出
            setTimeout(function()
            {
                var zxCenter = getID(id_zxCenter); //自定义邀请框ID
                if(zxCenter)
                {
                    zxCenter.style.display = "block";
                }
            }, 30000);
        }
    }

    //执行监测行为
    float_changeCenter();
    float_changeFloat();
}
rewriteSWT();