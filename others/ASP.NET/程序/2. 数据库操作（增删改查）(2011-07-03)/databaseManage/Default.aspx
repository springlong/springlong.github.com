<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="databaseManage._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>数据操纵实例</title>
    <link rel="Stylesheet" href="/css/main.css" />
</head>
<body>
<form name="stuInfo" id="stuInfo" method="post" action="/Default.aspx" runat="server">
    <h1>数据库操纵练习——增删改查</h1>
    <p>
        <label for="keywords">姓名查询：</label>
        <%
            if (Request.Form["section"] != null && Request.Form["section"].ToString() == "查询")
            {    
        %>
        <input type="text" name="keywords" id="keywords" maxlength="12" value="<%=Request.Form["keywords"].ToString() %>" /> 
        <%
            }else{
        %>
        <input type="text" name="keywords" id="keywords" maxlength="12" /> 
        <%} %>
        <input type="submit" value="查询" id="search" name="section"  /> 
        <input type="submit" value="显示全部" name="section" />
    </p>
    <table>
        <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>操纵</th>
        </tr>
        <%
            int rows = 1;
            while (m_objReader.Read())
            {
                if (rows % 2 == 0)
                {
        %>
        <tr class="even">
        <%
                }else{
        %>
        <tr>
        <%
                }
                rows++;                 
        %>
            <td><%=m_objReader["SNo"]%></td>
            <td><%=m_objReader["SName"]%></td>
            <%if (m_objReader["SSex"].ToString().ToLower() == "true")
              {
            %>
            <td>男</td>
            <%
              }else{
            %>
            <td>女</td>
            <%}%>
            <td><%=m_objReader["SAge"]%></td>
            <td>
                <a href="Default.aspx?id=<%=m_objReader["SNo"] %>&type=del" onclick="if(! confirm('此操作将无法恢复！\n确认删除？')){return false;}">删除</a>
                |
                <a href="Default.aspx?id=<%=m_objReader["SNo"] %>&type=update">修改</a>
                |
                <a href="/manage.aspx">添加</a>
            </td>
        </tr>
        <%  
            }
            clearResource();         
        %>
    </table>
</form>
<script type="text/javascript">

    function $(id){return document.getElementById(id);}
        
    $("search").onclick=function(){
        var txtKey=$("keywords");
        txtKey.value=trim(txtKey.value);
        
        if(txtKey.value=="")
        {
            alert("关键字不能为空！");
            txtKey.focus();
            
            return false;
        }
    }
   
    $("keywords").focus();
    
    //去掉某一字符串的前导空格和后导空格
    function trim(str)
    {
        str=str.replace(/^\s*/,"");
        str=str.replace(/\s*$/,"");
        return str;
    }
</script>
</body>
</html>
