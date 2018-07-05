<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="GlobalTest.Index" %>
<!DOCTYPE html>
<html>
<head>
	<title>Global Test!</title>
</head>
<body>
    <p><strong>系统语言：<%=System.Globalization.CultureInfo.InstalledUICulture.Name %></strong></p>
    <p><strong>当前选择：<%=System.Globalization.CultureInfo.CurrentUICulture.Name %></strong></p>
    <p>
        <a href="?lang=zh-cn">简体中文</a>
        <a href="?lang=zh-tw">繁体中文</a>
        <a href="?lang=en-us">英文</a>
    </p>
    <%--本地资源文件--%>
    <%--<asp:Label runat="server" Text="<%$ Resources:LocalizeContent.Text %>"></asp:Label>--%>
    <asp:Localize runat="server" meta:ResourceKey="LocalizeContent"></asp:Localize>
    
    <%--全局资源文件--%>
    <%--<asp:Label runat="server" Text="<%$ Resources:Resource, hosName %>"></asp:Label>（服务器控件，不推荐）--%>
    <%=Resources.Resource.hosName %>
</body>
</html>