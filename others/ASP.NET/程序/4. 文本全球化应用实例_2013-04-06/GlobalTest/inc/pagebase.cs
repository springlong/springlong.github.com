using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
//国际化所需类
using System.Threading;
using System.Globalization;

namespace GlobalTest.inc
{
    public class pagebase : System.Web.UI.Page
    {
        public string strLang; //保存语言

        protected override void InitializeCulture()
        {
            strLang = Request.QueryString["lang"];

            if (!String.IsNullOrEmpty(strLang))
            {
                //UICulture，决定了采用哪一种本地化资源，也就是使用哪种语言
                //Culture，决定各种数据类型是如何组织，如数字与日期
                Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(strLang);
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(strLang);

                //说明：该种方式实现的是自动选择语言版本进行输出显示。另外还有以下两种方式可以指定语言：
                //1. 各页面头部的声明： <@ Page  Culture="zh-cn" UICulture="zh-cn" @> 
                //2. Web.config中<system.web>下的设置：<globalization culture="auto" uiCulture="auto" />
            }
        }
    }
}