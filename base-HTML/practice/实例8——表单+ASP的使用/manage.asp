<%@LANGUAGE="JAVASCRIPT"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>表单处理程序</title>
</head>

<body bgcolor="silver">
<% 
	var userName;
	userName=Request.form("userName");	//用户名称
	
	//判断用户名是否已输入！
	if(userName=="")
	{
%>
	
	<h1>对不起，您的用户名称为空！</h1>
	<h3><a href="login.html">点击返回原注册页面...</a></h3>
		
<%
	}	
	else{	
		var passWord1,passWord2;
		passWord1=Request.form("passWord1");	//注册密码
		passWord2=Request.form("passWord2");	//密码确认
	
		//判断两次所输入的密码是否一致！
		if(String(passWord1) == String(passWord2))
		{		
			var name,age,sex,xueLi,introduce;
			var aiHao,aiHao1,aiHao2,aiHao3,aiHao4,aiHao5;

			name=Request.form("name");		//姓名
			age=Request.form("age");		//年龄

			//判断性别（单选按钮值的判定）
			sex=Request.form("sex");
			if(sex=="male")
			{
				sex="男";
			}
			else
			{
				sex="女";
			}

			//判断学历（下拉列表框值的选定）
			xueLi=Request.form("xueLi");
			switch(Number(xueLi))			//switch语句的值必须是整型！
			{
				case 0:xueLi="硕士";break;
				case 1:xueLi="本科";break;
				case 2:xueLi="大专";break;
				case 3:xueLi="高中";break;
				case 4:xueLi="初中";break;
				case 5:xueLi="小学";break;
			}

			introduce=Request.form("introduce");	//自我简介

			//判断爱好（复选框值的选定）
			aiHao="";
			aiHao1=Request.form("aiHao1");
			aiHao2=Request.form("aiHao2");
			aiHao3=Request.form("aiHao3");
			aiHao4=Request.form("aiHao4");
			aiHao5=Request.form("aiHao5");
			if(aiHao1=="on") aiHao=aiHao+"文学"+"  ";
			if(aiHao2=="on") aiHao=aiHao+"体育"+"  ";
			if(aiHao3=="on") aiHao=aiHao+"音乐"+"  ";
			if(aiHao4=="on") aiHao=aiHao+"舞蹈"+"  ";
			if(aiHao5=="on") aiHao=aiHao+"科技"+"  ";
%>

			<h2><font color="purple">亲爱的读者朋友，欢迎进入...孤狼谷底考验测试平台！</font></h2>
			<h1>你的注册信息如下：</h1>
			<h3><blockquote>
				用户名称：<font color="blue"><% Response.write(userName) %></font>
	        		<br />注册密码：<font color="blue"><% Response.write(passWord1) %></font>
				<br />密码确认：<font color="blue"><% Response.write(passWord2) %></font>
				<br />
				<br />姓名：<font color="blue"><% Response.write(name) %></font>
				<br />年龄：<font color="blue"><% Response.write(age) %></font>
				<br />性别：<font color="blue"><% Response.write(sex) %></font>
				<br />学历：<font color="blue"><% Response.write(xueLi) %></font>
				<br />爱好：<font color="blue"><% Response.write(aiHao) %></font>
				<br />个人简介：<font color="blue"><% Response.write(introduce) %></font>
			</blockquote></h3>

<%
		}
		else
		{
%>
			<h1>两次密码不一致...禁止进入！</h1>
			<h3><a href="login.asp">点击返回原注册页面...</a></h3>
<%	
		}//结束密码一致判断语句
	}//结束用户名称判断语句
%>

</body>

</html>
