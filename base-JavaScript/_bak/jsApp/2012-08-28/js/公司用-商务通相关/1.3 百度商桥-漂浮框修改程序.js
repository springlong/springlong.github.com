
//========================================================================================================================================================
//百度商桥邀请框、百度商桥监测函数
//============================
//所需变量
window.sq_hideCenterTime = 0;       //关闭邀请框的次数
window.sq_hideAsideTime = 0;        //关闭漂浮框的次数
window.sq_stopChangeCenter = 0;     //邀请框监测程序的定时器ID
window.sq_stopChangeFloat = 0;      //漂浮框监测程序的定时器ID
window.sq_hideMode = "";            //邀请框隐藏模式（空表示不隐藏；1表示永久隐藏，不可邀请；2表示首次隐藏，可以邀请）
//显示邀请框
function sq_showCenter()
{
    var oldCenter = $("BDBridgeInviteWrap"); //原邀请框ID
    var oldCenter2 = $("InviteContainer");  //原邀请框内容容器ID
    var zxCenter = $("zixunBox"); //自定义邀请框ID
    var zxAside = $("zixunBoxAside");  //自定义漂浮框ID
    var isHideMode1 = window.sq_hideMode === "1";
    var isHideMode2 = window.sq_hideMode === "2";

    if(oldCenter){ oldCenter.style.display = "none"; }
    if(zxCenter && !isHideMode1 && (!isHideMode2 || sq_hideCenterTime >= 1)){ zxCenter.style.display = "block"; }
    // if(zxCenter && zxCenter.style.display === "block" && zxAside){ zxAside.style.display = "none"; }
    if(!zxCenter || isHideMode1){ sq_hideCenter(); } //如果不存在自定义邀请框或者邀请框状态为永久隐藏，则执行一次隐藏邀请框操作
    if(isHideMode2 && sq_hideCenterTime === 0){ sq_hideCenterTime = 1; return false; } //如果邀请框隐藏模式为2，则在首次显示邀请框时将关闭状态值设置为1

    if(window.sq_doOnShowCenter){ window.sq_doOnShowCenter.call(); }
}
//隐藏邀请框
function sq_hideCenter()
{
    var zxCenter = $("zixunBox"); //自定义邀请框ID
    var zxAside = $("zixunBoxAside");  //自定义漂浮框ID
    
    try{ bridgeInviteClose(); } catch(e) {}  //执行百度商桥的“稍后再说”方法
    if(zxCenter){ zxCenter.style.display = "none"; }
    if(zxAside && sq_hideAsideTime === 0){ zxAside.style.display = "block"; }

    sq_hideCenterTime++;
    if(window.sq_doOnHideCenter){ window.sq_doOnHideCenter.call(); }
}
//隐藏漂浮框
function sq_hideFloat()
{
    var zxAside = $("zixunBoxAside");  //自定义漂浮框ID
    if(zxAside){ zxAside.style.display = "none"; }
    sq_hideAsideTime++;
}
//邀请框的监测程序
function sq_changeCenter()
{
    var oldCenter = $("BDBridgeInviteWrap");  //原邀请框ID
    var oldCenter2 = $("InviteContainer");   //原邀请框内容容器ID
    if(oldCenter)
    {
        oldCenter.style.visibility = "hidden";  //将原邀请框隐藏，避免程序替换样式时出现短时间的闪烁效果
        oldCenter2.innerHTML = "";

        if(oldCenter.style.display === "block")
        {
            sq_showCenter();
        }
    }
    
    sq_stopChangeCenter = setTimeout(function()
    {
        sq_changeCenter();
    }, 100);
}
//漂浮框的监测程序
function sq_changeFloat()
{
    var oldFloat = $("BDBridgeIconWrap");  //原漂浮框ID
    var zxCenter = $("zixunBox"); //自定义邀请框ID
    var zxAside = $("zixunBoxAside"); //自定义漂浮框ID
    
    if(oldFloat)
    {
        oldFloat.style.visibility = "hidden";
        if(oldFloat.style.display === "block")
        {
            oldFloat.style.display = "none";
            if(zxAside && zxCenter && zxCenter.style.display === "none" && sq_hideAsideTime === 0){ zxAside.style.display = "block"; }
        }
    }
    
    sq_stopChangeFloat = setTimeout(function()
    {
        sq_changeFloat();
    }, 100);
}
//隐藏相关容器
function hideDIV(id){
    if(id){
        id = id.split(",");
        for(var i = 0, len = id.length; i < len; i++){
            if($(id[i])){$(id[i]).style.display = "none";}
        }
    }
}
//显示相关容器
function showDIV(id){
        id = id.split(",");
        var ele = null;
        for(var i = 0, len = id.length; i < len; i++){
            ele = $(id[i]);
    if(id){
            if(ele && !ele.isClosed){ele.style.display = "block";}
        }
    }
}
//文档加载完毕之后，如果还没有商务通的默认容器，则直接显示邀请框和漂浮框
Extend.addEvent(window, "onload", function()
{    
    var oldCenter = $("BDBridgeInviteWrap");  //原邀请框ID
    var zxCenter = $("zixunBox"); //自定义邀请框ID
    var zxAside = $("zixunBoxAside"); //自定义漂浮框ID
    
    if(!oldCenter)
    {
        if(zxCenter){ zxCenter.style.display = "block"; }
        if(zxAside){ zxAside.style.display = "block"; }
    }
});

//重写咨询方法
function rewriteZixun(param, swt)
{
    var width = 800,
        height = 600,
        left = (screen.availWidth - width) / 2,
        hostname = location.hostname; 
    
    if(swt)
    {
        //zixun(0, 'floatRight-1');
        //上一行所示的咨询方法表示为商务通邀请框或漂浮框的点击
        window.open("/zixun.aspx?page=" + location.href + "&label=" + swt, "_blank", "width=" + width + ",height=" + height + ",top=200,left=" + left + ",status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=no,location=no,titlebar=no");
        ggAnalytics("Shangwutong", "\u6f02\u6d6e\u6846\u54a8\u8be2", swt); //ASCII码字符：漂浮框咨询   
    }
    else
    {
        //zixun('header-btn1');
        //上一行所示的咨询方法表示为站内咨询按钮或链接的点击
        param = param == undefined ? "zixun" : param;
        window.open("/zixun.aspx?page=" + location.href + "&label=" + param, "_blank", "width=" + width + ",height=" + height + ",top=200,left=" + left + ",status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=no,location=no,titlebar=no");
        ggAnalytics("Shangwutong", "\u7ad9\u5185\u54a8\u8be2", param);  //ASCII码字符：站内咨询
    }
}
window.zixun = $$.zixun = rewriteZixun;