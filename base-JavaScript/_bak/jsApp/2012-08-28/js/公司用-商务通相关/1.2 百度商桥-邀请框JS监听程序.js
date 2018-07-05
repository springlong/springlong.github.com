
//显示漂浮框
function float_showCenter()
{
    var bdCenter = $$("BDBridgeInviteWrap"); //原百度邀请框ID
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    var zxAside = $$("zixunBoxAside");  //自定义漂浮框ID
    if(bdCenter)
    {        
        bdCenter.style.display = "none";
        if(zxCenter){ zxCenter.style.display = "block"; }
        if(zxAside){ zxAside.style.display = "none"; }
    }
}
//隐藏漂浮框
function float_hideCenter()
{
    var bdCenter = $$("BDBridgeInviteWrap"); //原百度邀请框ID
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    var zxAside = $$("zixunBoxAside");  //自定义漂浮框ID
    if(bdCenter)
    {
        bridgeInviteClose();

        bdCenter.style.display = "none";
        if(zxCenter){ zxCenter.style.display = "none"; }
        if(zxAside){ zxAside.style.display = "block"; }
    }
}
//邀请框的监测程序
function float_changeCenter()
{
    var bdCenter = $$("BDBridgeInviteWrap");  //原百度邀请框ID
    if(bdCenter)
    {
        if(!window.zixun){ window.zixun = $$("chatnow").onclick; }
        bdCenter.style.visibility = "hidden";  //将原百度邀请框隐藏，避免程序替换样式时出现短时间的闪烁效果
        if(bdCenter.style.display === "block")
        {
            float_showCenter();
        }
    }
    
    setTimeout(function()
    {
        float_changeCenter();
    }, 100);
}
//漂浮框的检测程序
function float_changeFloat()
{
    var bdFloat = $$("BDBridgeIconWrap");  //原百度漂浮框ID
    var zxFloat = $$("zixunBoxAside"); //自定义漂浮框ID
    var zxCenter = $$("zixunBox"); //自定义邀请框ID
    if(bdFloat)
    {
        bdFloat.style.visibility = "hidden";
        if(bdFloat.style.display === "block")
        {
            bdFloat.style.display = "none";
            if(zxFloat && zxCenter && zxCenter.style.display === "none"){ zxFloat.style.display = "block"; }
        }
    }
    
    setTimeout(function()
    {
        float_changeFloat();
    }, 100);
}
float_changeCenter();
float_changeFloat();