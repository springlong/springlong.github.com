<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="addLy.aspx.cs" Inherits="WebApplication1.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <link rel="Stylesheet" type="text/css" href="/css/main.css" />
</head>
<body id="addLyPage">
    <form id="addLy" runat="server">
        <h1>留言发布</h1>
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
        <p>
            <label for="subject">留言主题</label>
            <input type="text" id="subject" name="subject" maxlength="50" />
        </p>
        <p>
            <label for="content">留言内容</label>
            <textarea id="content" name="content"></textarea>
        </p>
        <p class="button">
            <input type="submit" id="Add" value="添加" />
            <a href="/ly_Default.aspx">查看留言</a>
        </p>
    </form>
    
<script type="text/javascript">
    function $(id){return document.getElementById(id);}
    
    //默认焦点
    $('subject').focus();
    
    //点击登陆按钮时验证表单数据的正确性
    $("Add").onclick=function(){
       var subject=$("subject");
       var content=$("content");
       subject.value=trim(subject.value);
       content.value=trim(content.value);
       
       if(subject.value=="" || content.value=="")
       {
            alert("主题和内容不允许为空！");
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
