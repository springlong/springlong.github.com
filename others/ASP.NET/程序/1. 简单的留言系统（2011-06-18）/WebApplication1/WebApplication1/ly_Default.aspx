<%@ Page Language="C#" MaintainScrollPositionOnPostback="true" AutoEventWireup="true" CodeBehind="ly_Default.aspx.cs" Inherits="WebApplication1._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>留言管理</title>
    <link rel="Stylesheet" type="text/css" href="/css/main.css" />
</head>
<body id="ly_Default">
    <form id="frmLy" runat="server">
        <h1>留言管理</h1>
        <p>【当前用户：<%
               if (Session["userName"] != null)
               {  
                   Response.Write(Session["userName"].ToString());
               }
               else
               {
                   Response.Write("游客");
               }
                %>】</p>
        <table class="wrapper">
            <tr>
                <td class="lyInfo" valign="top">
                    <table>
                        <col class="line1" />
                        <col class="line2" />
                        <col class="line3" />
                        <col />
                        <tr class="caption"><th id="xxx" width="60%">标题</th><th>发布人</th><th>发布时间</th><th>功能管理</th></tr>
                        <%
                            
                            int amountOfAPage=Convert.ToInt32(ConfigurationManager.AppSettings["amountOfAPage"]);   //每一页显示的记录行数
                            int currentPage=Convert.ToInt32(Session["currentPage"]);                                //当前纪录页
                            int start = 10*(currentPage-1);                                                         //当前页开始显示的索引号
                            int end = (amountOfAPage * currentPage > tab.Rows.Count) ? tab.Rows.Count - 1 : amountOfAPage * currentPage - 1;      //当前页结束显示的索引号
                            
                            for (int i = start; i <=end; i++)
                            {
                                if (i % 2 != 0)
                                {%>
                        <tr class="dan">
                                <%}
                                else
                                {%>
                        <tr>    
                                <%}%>
                            <td class="subject"><a href="/reply.aspx?ID=<%=tab.Rows[i]["ID"]%>"><%=tab.Rows[i]["subject"]%></a></td>
                            <td><%=tab.Rows[i]["userName"].ToString()%></td>
                            <td><%=tab.Rows[i]["addTime"].ToString()%></td>
                            <td>
                                <a href="/ly_Default.aspx?ID=<%=tab.Rows[i]["ID"] %>&ty=del" onclick="if(! confirm('此操作将无法恢复！\n确认删除？')){return false;}">删除</a>
                                </td>
                        </tr>
                        <%} %>
                    </table>
                </td>
                <td  class="lyManage" valign="top">
                    <table>
                        <tr><td><a href="/addLy.aspx">发表留言</a></td></tr>
                        <%if (Session["userName"] == null)
                          { %>
                        <tr><td><a href="/login.aspx">用户登陆</a></td></tr>
                        <tr><td><a href="/regist.aspx">用户注册</a></td></tr>
                        <%} %>
                        <%if (Session["userName"] != null)
                          { %>
                        <tr><td><a href="/ly_Default.aspx?ty=logout">注销用户</a></td></tr>
                        <%} %>
                    </table>
                </td>
            </tr>
        </table>
        <p class="control">
            <a href="ly_Default.aspx?ty=moveFirst">首页</a>
            <a href="ly_Default.aspx?ty=movePrivious">上一页</a>
            <input type="text" id="currentPage" name="currentPage" value="<%=currentPage %>" />
            /<%=amountPages %>
            (共<% =tab.Rows.Count%>条)           
            <a href="ly_Default.aspx?ty=moveNext">下一页</a>
            <a href="ly_Default.aspx?ty=moveLast">尾页</a>
            <a href="ly_Default.aspx?ty=moveDirect" onclick="this.href+='&directPos='+document.getElementById('currentPage').value;">Go</a>
        </p>
    </form>
    <%//释放资源
        obj_Adapter.Dispose();
        obj_CommandBuilder.Dispose();
        ds.Dispose();
        tab.Dispose();%>
</body>
</html>
