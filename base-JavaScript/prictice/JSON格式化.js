//将JSON格式字符串转换为JSON对象，如：{"status":0,"msg":"稍后您将接到我们的电话，该通话对您完全免费，请放心接听！"}
Extend.parseJSON = function(str)
{
    try
    {
        if(!str || typeof(str) !== "string")
        {
            return null;
        }
        
        if(window.JSON === undefined)
        {
            return eval("(" + str + ")");
        }
        return window.JSON.parse(str);
    }
    catch(e)
    {
        return null;
    }
}