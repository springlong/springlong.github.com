<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="regist.aspx.cs" Inherits="WebApplication1.regist" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>用户注册页面</title>
    <link rel="Stylesheet" type="text/css" href="/css/main.css" />
</head>
<body id="regist">
<div>
    <form id="frmRegist" method="post" action="/regist.aspx">
        <h1>用户注册</h1>
        <% //错误提示
            if (Request.QueryString["info"]!=null && Request.QueryString["info"].ToString() == "error_01")
            {
                Response.Write("<p class='error'>用户名已被注册！</p>");
            }
        %>
        <p>
            <label for="userName">用户名称：</label>
            <input type="text" id="userName" name="userName" maxlength="12" />
        </p>
        <%//用户名被注册时，不不清楚文本输入框的值
            if (Request.QueryString["errUserName"] != null)
            {
                Response.Write("<script>document.getElementById('userName').value='" + Request.QueryString["errUserName"].ToString() + "';</script>");
            }
        %>
        <p>
            <label for="password1">用户密码：</label>
            <input type="password" id="password1" name="password1" maxlength="12" />
        </p>
        <p>
            <label for="password2">密码确认：</label>
            <input type="password" id="password2" name="password2" maxlength="12" />
        </p>
        <p class="button">
            <input type="submit" id="userRegist" value="注册" />
            <a href="/login.aspx">返回登录页面</a>
        </p>
    </form>
</div>
<script type="text/javascript">
    function $(id){return document.getElementById(id);}
    
    //默认焦点
    $('userName').focus();
    
    //点击登陆按钮时验证表单数据的正确性
    $("userRegist").onclick=function(){
       var userName=$("userName");
       var password1=$("password1");
       var password2=$("password2");
       userName.value=trim(userName.value)
       password1.value=trim(password1.value)
       password2.value=trim(password2.value)
       
       if(userName.value=="" || password1.value=="" || password2.value=="")
       {
            alert("用户名或密码不能为空！");
            $('userName').focus();
            return false;
       }
       else if(/\s+/.test(userName.value) || /\s+/.test(password1.value) || /\s+/.test(password2.value))
       {
            alert("用户名或密码不能包含空格！");
            $('userName').focus();
            return false;
       }
       else if(password1.value!=password2.value)
       {
            alert("两次密码输入不一致！");
            $("password1").value="";
            $("password2").value="";
            $("password1").focus();
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
