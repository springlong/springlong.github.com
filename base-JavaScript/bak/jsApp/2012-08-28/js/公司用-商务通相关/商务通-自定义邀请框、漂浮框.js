
//用于zixun跳转
//对商务通zixun方法进行重写
//用以统一跳转至zixun.aspx页面
Extend.stopRewriteZixun = 0;
addEvent(window, "onload", function()
{
    //如果页面加载完毕0.1秒后，商务通没有加载，则停止RewriteZixun方法的继续监测~！主要针对那些不需要商务通的页面。
    setTimeout(function()
    {
        var stopID = Extend.stopRewriteZixun;
        clearInterval(stopID);
        clearTimeout(stopID);
    }, 100);
});
function rewriteZixun(param, swt)
{    
    if(swt)
    {
        //zixun(0, 'floatRight-1');
        //上一行所示的咨询方法表示为商务通邀请框或漂浮框的点击
        window.open("/zixun.aspx?page=" + location.href + "&label=" + swt, "_blank");
        ggAnalytics("Shangwutong", "\u6f02\u6d6e\u6846\u54a8\u8be2", swt); //ASCII码字符：漂浮框咨询
    }
    else
    {
        //zixun('header-btn1');
        //上一行所示的咨询方法表示为站内咨询按钮或链接的点击
        param = param == undefined ? "zixun" : param;
        window.open("/zixun.aspx?page=" + location.href + "&label=" + param, "_blank");
        ggAnalytics("Shangwutong", "\u7ad9\u5185\u54a8\u8be2", param);  //ASCII码字符：站内咨询
    }
}
function doRewriteZixun()
{
    try
    {
        _copyZixun = zixun;
        zixun = rewriteZixun;
    }
    catch(e)
    {
        Extend.stopRewriteZixun = setTimeout(function()
        {
            doRewriteZixun();
        }, 100);
    }
}
doRewriteZixun();

//所需变量
var float_stopChangeCenter = 0;
var float_stopChangeFloat = 0;
//显示邀请框
function float_showCenter()
{
    var oldCenter = $$("LRdiv1"); //原邀请框ID
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    var zxAside = $$("zixunBoxAside");  //自定义漂浮框ID
    
    if(oldCenter){ oldCenter.style.display = "none"; }
    if(zxCenter){ zxCenter.style.display = "block"; }
    if(zxCenter && zxAside){ zxAside.style.display = "none"; }
    if(!zxCenter){ float_hideCenter(); } //如果不存在自定义邀请框，则执行一次隐藏邀请框操作
}
//隐藏邀请框
function float_hideCenter()
{
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    var zxAside = $$("zixunBoxAside");  //自定义漂浮框ID
    
    try{ LR_HideInvite();LR_RefuseChat(); } catch(e) {}
    if(zxCenter){ zxCenter.style.display = "none"; }
    if(zxAside){ zxAside.style.display = "block"; }
}
//隐藏漂浮框
function float_hideFloat()
{
    var zxAside = $$("zixunBoxAside");  //自定义漂浮框ID
    
    try{ onlinerIcon0.hidden(); } catch(e) {}
    if(zxAside){ zxAside.style.display = "none"; }
}
//邀请框的监测程序
function float_changeCenter()
{
    var oldCenter = $$("LRdiv1");  //原邀请框ID
    if(oldCenter)
    {
        oldCenter.style.visibility = "hidden";  //将原邀请框隐藏，避免程序替换样式时出现短时间的闪烁效果
        if(oldCenter.style.display === "block")
        {
            float_showCenter();
        }
    }
    
    float_stopChangeCenter = setTimeout(function()
    {
        float_changeCenter();
    }, 100);
}
//漂浮框的监测程序
function float_changeFloat()
{
    var oldFloat = $$("LRdiv0");  //原漂浮框ID
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    var zxAside = $$("zixunBoxAside"); //自定义漂浮框ID
    
    if(oldFloat)
    {
        oldFloat.style.visibility = "hidden";
        if(oldFloat.style.display === "block")
        {
            oldFloat.style.display = "none";
            if(zxAside && zxCenter && zxCenter.style.display === "none"){ zxAside.style.display = "block"; }
        }
    }
    
    float_stopChangeFloat = setTimeout(function()
    {
        float_changeFloat();
    }, 100);
}
//文档加载完毕之后，如果还没有商务通的默认容器，则直接显示邀请框和漂浮框
addEvent(window, "onload", function()
{    
    var oldCenter = $$("LRdiv1");  //原邀请框ID
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    var zxAside = $$("zixunBoxAside"); //自定义漂浮框ID
    
    if(!oldCenter)
    {
        if(zxCenter){ zxCenter.style.display = "block"; }
        if(zxAside){ zxAside.style.display = "block"; }
        clearTimeout(float_stopChangeCenter);
        clearTimeout(float_stopChangeFloat);
    }
});
float_changeCenter();
float_changeFloat();
document.write("\x3cscript src='http://zixun.ent158.com/WebZiXun.asp' type='text/javascript'\x3e\x3c/script\x3e");