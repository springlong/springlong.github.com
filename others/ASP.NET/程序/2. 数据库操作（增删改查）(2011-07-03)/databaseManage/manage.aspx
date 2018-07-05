<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="manage.aspx.cs" Inherits="databaseManage.manage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>数据管理(添加+修改)</title>
</head>
<body>
<h1>数据<%if (Request.QueryString["type"] != null && Request.QueryString["type"] == "update")
        { %>修改<%}
        else
        { %>添加<%} %>操作</h1>
<form id="manage" method="post" action="/manage.aspx">
    <%
    if (Request.QueryString["type"] != null && Request.QueryString["type"] == "update")
    {
    %>
    <p>
        <label for="SNo">学号：</label>
        <input type="text" name="SNo" id="SNo" maxlength="12" readonly="readonly" value="<%=m_objReader["SNo"].ToString() %>" />
    </p>
    <p>
        <label for="SName">姓名：</label>
        <input type="text" name="SName" id="SName" maxlength="10" value="<%=m_objReader["SName"].ToString() %>" />
    </p>
    <p>
        <label for="male">性别：</label>
        <%if (m_objReader["SSex"].ToString().ToLower() == "true")
          {
        %>
        <input type="radio" name="SSex" id="male" value="male" checked /><label for="male">男</label>
        <input type="radio" name="SSex" id="female" value="female" /><label for="female">女</label>
        <% }
          else
          {
        %>
        <input type="radio" name="SSex" id="male" value="male" /><label for="male">男</label>
        <input type="radio" name="SSex" id="female" value="female" checked /><label for="female">女</label>
        <%
          }
        %>
    </p>
    <p>
        <label for="SAge">年龄：</label>
        <input type="text" name="SAge" id="SAge" maxlength="3" value="<%=m_objReader["SAge"].ToString() %>" />
    </p>
    <input type="submit" value="修改" id="btn" name="btn" />
    <%
    }
    else
    {
    %>
    <p>
        <label for="SNo">学号：</label>
        <input type="text" name="SNo" id="SNo" maxlength="12" readonly="readonly" value="<%=Convert.ToInt32(m_objReader["SNo"].ToString())+1 %>" />
    </p>
    <p>
        <label for="SName">姓名：</label>
        <input type="text" name="SName" id="SName" maxlength="10" />
    </p>
    <p>
        <label for="male">性别：</label>
        <input type="radio" name="SSex" id="male" value="male" checked /><label for="male">男</label>
        <input type="radio" name="SSex" id="female" value="female" /><label for="female">女</label>
    </p>
    <p>
        <label for="SAge">年龄：</label>
        <input type="text" name="SAge" id="SAge" maxlength="3" />
    </p>
    <input type="submit" value="添加" id="btn" name="btn" />
    <%}
    clearResource();  %>
</form>
<script type="text/javascript">
    
    function $(id){return document.getElementById(id);}
        
    $("btn").onclick=function(){
        var txtName=$("SName");
        var txtAge=$("SAge");
        txtName.value=trim(txtName.value);
        txtAge.value=trim(txtAge.value);
        
        if(txtName.value=="")
        {
            alert("姓名不能为空！");
            txtName.focus();
            return false;
        }
        else if(txtAge.value=="")
        {
            alert("年龄不能为空！");
            txtAge.focus();
            return false;
        }
        else if(txtAge.value.search(/[^0-9]/)!=-1)
        {
            alert("年龄必须是一个整数值！");
            txtAge.focus();
            return false;
        }
    }
   
    $("SName").focus();
    
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
