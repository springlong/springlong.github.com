<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="newsManage.aspx.cs" Inherits="xwfbxt.newsManage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>新闻管理页面</title>
    <link rel="Stylesheet" href="/css/main.css" />
</head>
<body id="newsManage">
<div id="header">
    <h1>新闻发布系统</h1>
    <ul>
        <li><a href="/index.aspx">首页</a></li>
        <li><a href="/newsManage.aspx">新闻管理</a></li>
    </ul>
    <div class="currentUser">
        <h2>当前用户：</h2>
        <!--<p><strong>yangtuan2010</strong><span>(普通用户) | <a href="" target="_self">退出</a></span></p>-->
        <p class="youke">
            <strong>你还未登录!</strong>
            |
            <a href="/login.aspx">登录</a>
            |
            <a href="/regist.aspx">注册</a>
        </p>
    </div>
    <div class="currentPos">
        <p>当前位置：
            <a href="/index.aspx">首页</a>
            &gt;&gt;
            新闻管理
        </p>
        <div>
            关键字查询：
            <input type="text" name="keywords" id="keywords" />
            <input type="submit" value="查询" />
        </div>
    </div>
</div>
<div class="tableOuter">
    <table>
        <colgroup cols="3" />
        <tr class="header">
            <th class="col1">新闻标题</th>
            <th class="col2">发布日期</th>
            <th class="col3">作者</th>
            <th class="col4">管理</th>
        </tr>
        <tr>
            <td class="col1"><a href="">南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟</a></td>
            <td>2011-07-04 18:23:45</td>
            <td>青海晚报</td>
            <td>
                <a href="">删除</a>
                |
                <a href="">修改</a>
            </td>
        </tr>
        <tr class="even">
            <td class="col1"><a href="">南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟</a></td>
            <td>2011-07-04 18:23:45</td>
            <td>青海晚报</td>
            <td>
                <a href="">删除</a>
                |
                <a href="">修改</a>
            </td>
        </tr>
        <tr>
            <td class="col1"><a href="">南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟</a></td>
            <td>2011-07-04 18:23:45</td>
            <td>青海晚报</td>
            <td>
                <a href="">删除</a>
                |
                <a href="">修改</a>
            </td>
        </tr>
        <tr class="even">
            <td class="col1"><a href="">南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟南京至北京比飞机用时短25分钟</a></td>
            <td>2011-07-04 18:23:45</td>
            <td>青海晚报</td>
            <td>
                <a href="">删除</a>
                |
                <a href="">修改</a>
            </td>
        </tr>
    </table>
</div>
<p class="control">
    <a href="newsManage.aspx?ty=moveFirst">首页</a>
    <a href="newsManage.aspx?ty=movePrivious">上一页</a>
    <input type="text" id="currentPage" name="currentPage" value="" /><!--<a%=currentPage %>-->
    /<!--<a%=amountPages %>-->
    (共<!--<a% =tab.Rows.Count%>-->条)
    <a href="newsManage.aspx?ty=moveNext">下一页</a>
    <a href="newsManage.aspx?ty=moveLast">尾页</a>
    <a href="newsManage.aspx?ty=moveDirect" onclick="this.href+='&directPos='+document.getElementById('currentPage').value;">Go</a>
</p>
</body>
</html>
