//公用配置参数
try{
    var test = $$.qqNum;          //测试$$对象是否存在
}catch(e){
    var $$ = {};
}finally{
    $$.siteName = "xian";           //站点名称
    $$.qqNum = "800010082";         //QQ号码
    $$.telNum = "02987401000,4000291000";      //院内电话号码
    $$.telUID = "5417765";          //百度离线宝UID
    $$.addCommentsTime = 1;         //百姓评议单天允许次数
    $$.addInquiresTime = 1;         //费用查询单天允许次数
    $$.addYuyueTime = 1;            //在线挂号单天允许次数
    $$.addAnswerTime = 3;           //在线问答单天允许次数
    $$.zixun = function(){          //该函数用于在晚上没有客服人员的情况下，用户点击咨询所执行的替代操作
        window.open("/guahao.html", "_blank");
    }
}

//常规处理
jQuery(function($)
{
    //以下代码针对/register.html和/tel.html页面不可用
    var url = document.URL, htmlStr;
    if(url.indexOf("/register.html") < 0 && url.indexOf("/tel.html") < 0)
    {        
        //移动端不显示邀请框
        if(!Extend.isMobile)
        {
            htmlStr = "";
            htmlStr += "<div id=\"zixunBox\">";
            htmlStr += "   <h2 class=\"none\">\u53cc\u4f11\u65e5\u4e13\u5bb6\u7167\u5e38\u5750\u8bca</h2>";
            htmlStr += "   <a href=\"javascript:void(0);\" target=\"_self\" onclick=\"zixun(0, \'floatCenter-1\');float_hideCenter();\" class=\"zixun\" title=\"\u5728\u7ebf\u54a8\u8be2\">\u5728\u7ebf\u54a8\u8be2</a>";
            htmlStr += "   <a href=\"javascript:void(0);\" target=\"_self\" onclick=\"zixun(0, \'floatCenter-2\');float_hideCenter();\" class=\"yuyue\" title=\"\u7f51\u4e0a\u9884\u7ea6\">\u7f51\u4e0a\u9884\u7ea6</a>";
            htmlStr += "   <a href=\"javascript:void(0);\" target=\"_self\" onclick=\"qq(0, \'floatCenter-3\');float_hideCenter();\" class=\"qq\" title=\"qq\u5ba2\u670d\">qq\u5ba2\u670d</a>";
            htmlStr += "   <input type=\"text\" class=\"freecall\" maxlength=\"11\" id=\"zixunBoxPhone\" />";
            htmlStr += "   <button onclick=\"doTel.call(this,\'zixunBoxPhone\', \'pageTel\')\" class=\"telphone\" title=\"\u514d\u8d39\u62e8\u6253\" >\u514d\u8d39\u62e8\u6253</button>";
            htmlStr += "   <span class=\"close\" onclick=\"float_closeCenter();ggAnalytics(\'Shangwutong-Close\', \'邀请框关闭\', \'close\');\">\u5173\u95ed</span>";
            htmlStr += "</div>";
            $(document.body).append(htmlStr);
            Extend.placeHolder("zixunBoxPhone", "\u8bf7\u8f93\u5165\u7535\u8bdd\u53f7\u7801");
        }

        //移动端或者低分辨率下不显示漂浮框
        // if(!Extend.isLowerScreen && !Extend.isMobile)
        // {
            
        // }
    }
});

//其他处理函数的定义（跟漂浮框相关）
//...

//其他差异化函数的定义（例如JSFrame.js中免费电话使用的是百度离线宝，而该站点则需要使用快商通，那么需要将免费电话的快商通版本的代码书写在这里）
//...