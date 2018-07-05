<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="xwfbxt._Default" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>简易新闻发布系统</title>
    <base target="_blank" />
    <link rel="Stylesheet" href="/css/main.css" />
	<!--使用HTML5中新的语义元素在IE8及以下版本中的解决方案-->
	<!--[if lte IE 8]>
	<script>
		var tags="header,footer,nav,section,article,aside,hgroup,time".split(",");
		for(var i=0;i<tags.length;i++)
		{
			document.createElement(tags[i]);
		}
	</script>
	<style>
		header,footer,nav,section,article,aside,hgroup{display:block;}
	</style>
	<![endif]-->
</head>
<body>
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
            首页
        </p>
        <div>
            关键字查询：
            <input type="text" name="keywords" id="keywords" />
            <input type="submit" value="查询" />
        </div>
    </div>
</div>
<div id="content">
    <section>
        <h2>国内新闻</h2>
        <ul>
            <li><a href="">微印象：高铁下的小城</a></li>
            <li><a href="">铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%</a></li>
            <li><a href="">南京至北京比飞机用时短25分钟</a></li>
            <li><a href="">性侵指控或被撤销</a></li>
            <li><a href="">反腐关系生死存亡</a></li>
        </ul>
    </section>
    <section class="right">
        <h2>国际新闻</h2>
        <ul>
            <li><a href="">微印象：高铁下的小城</a></li>
            <li><a href="">铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%</a></li>
            <li><a href="">南京至北京比飞机用时短25分钟</a></li>
            <li><a href="">性侵指控或被撤销</a></li>
            <li><a href="">反腐关系生死存亡</a></li>
        </ul>
    </section>
    <section>
        <h2>科技新闻</h2>
        <ul>
            <li><a href="">微印象：高铁下的小城</a></li>
            <li><a href="">铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%</a></li>
            <li><a href="">南京至北京比飞机用时短25分钟</a></li>
            <li><a href="">性侵指控或被撤销</a></li>
            <li><a href="">反腐关系生死存亡</a></li>
        </ul>
    </section>
    <section class="right">
        <h2>财经新闻</h2>
        <ul>
            <li><a href="">微印象：高铁下的小城</a></li>
            <li><a href="">铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%铁道部：京沪高铁首日上座率98%</a></li>
            <li><a href="">南京至北京比飞机用时短25分钟</a></li>
            <li><a href="">性侵指控或被撤销</a></li>
            <li><a href="">反腐关系生死存亡</a></li>
        </ul>
    </section>
</div>
</body>
</html>
