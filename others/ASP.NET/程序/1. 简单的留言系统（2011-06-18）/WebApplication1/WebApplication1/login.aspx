<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="WebApplication1.login1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>用户登录页面</title>
    <link rel="Stylesheet" type="text/css" href="/css/main.css" />
</head>
<body>
<div id="login">
    <form id="frmLogin" method="post" action="/login.aspx">
        <h1>用户登录</h1>
        <%  //错误信息提示
            if (Request.QueryString["info"]!=null && Request.QueryString["info"].ToString() == "error")
            {
                Response.Write("<p class='error'>用户名或密码有误！<p>");
            }
        %>
        <p>
            <label for="userName">用户名称：</label>
            <input type="text" id="userName" name="userName" maxlength="12" tabindex="1" />
        </p>
        <%//登陆错误时，用户名输入框保持不变
            if (Request.QueryString["userName"]!=null)
            {
                Response.Write("<script>document.getElementById('userName').value='" + Request.QueryString["userName"].ToString() + "';</script>");
            }
        %>
        <p>
            <label for="password">用户密码：</label>
            <input type="password" id="password" name="password"  maxlength="12" tabindex="2" />
        </p>
        <p class="button">
            <input type="submit" id="userLogin" value="登陆" tabindex="3" />
            <a href="/regist.aspx">点击注册</a>
        </p>
    </form>
</div>
    
<script type="text/javascript">
    function $(id){return document.getElementById(id);}
    
    //默认焦点
    $('userName').focus();
    
    //点击登陆按钮时验证表单数据的正确性
    $("userLogin").onclick=function(){
       var userName=$("userName");
       var password=$("password");
       userName.value=trim(userName.value);
       password.value=trim(password.value);
       
       if(userName.value=="" || password.value=="")
       {
            alert("用户名或密码不能为空！");
            return false;
       }
       else if(/\s+/.test(userName.value) || /\s+/.test(password.value))
       {
            alert("用户名或密码不能包含空格！");
            return false;
       }
    }
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
