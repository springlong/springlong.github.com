<%@LANGUAGE="JAVASCRIPT"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>表单实例——ASP的使用</title>
    <meta name="keywords" content="表单实例,ASP的应用" />
    <meta name="description" content="表单实例,ASP的应用" />
    <meta name="author" content="Jerry_Sun" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body text="#FFFF00" bgcolor="#996633">

<form name="form1" method="post" action="manage.asp"  target="_self">
	<table width="500" border="0" align="center" bgcolor="#999933">
    	<!--用户注册信息-->
   	  <tr><td align="center" bgcolor="#CCCC00"><b>用户注册</b></td>
   	  </tr>
  		<tr>
    		<td>
                <p>
	  				<label for="userName">用户名称：</label>
  					<input type="text" name="userName" id="userName" size="24" maxlength="12" />
    			</p>
 				<p>
   					<label for="passWord1">注册密码：</label>
    				<input type="password" name="passWord1" id="passWord1" size="24" maxlength="12" />
  				</p>
  				<p>
  					<label for="passWord2">密码确认：</label>
   	  				<input type="password" name="passWord2" id="passWord2" size="24" maxlength="12" />
  				</p>
        	</td>
 		</tr>
        <!--用户个人信息-->
        <tr><td align="center" bgcolor="#CCCC00"><b>用户个人信息</b></td>
        </tr>
  		<tr>
    		<td>
            	<p>
  	  				<label for="name">姓名：</label>
  	  				<input type="text" name="name" id="name" size="24" />
				</p>
  				<p>
  	  				<label for="age">年龄：</label>
  	  				<input type="text"name="age"  id="age" size="5" maxlength="2" />
  				</p>
  				<p>
  	  				性别：
  	  				<input type="radio" name="sex"  id="sex1" value="male" checked="checked" />
  	  				<label for="sex1">男</label>
      				<input type="radio" name="sex" id="sex2" value="female" />
     				 <label for="sex2">女</label>
  				</p>
  				<p>
  	  				<label for="xueLi">学历：</label>
  	  				<select name="xueLi" id="xueLi">
  	    				<option value="0">硕士</option>
  	   			 		<option value="1" selected>本科</option>
  	    				<option value="2">大专</option>
  	    				<option value="3">高中</option>
  	    				<option value="4">初中</option>
  	    				<option value="5">小学</option>
    				</select>
  				</p>
  				<p>
                	爱好：
  	  				<input type="checkbox" name="aiHao1" id="aiHao1" />
  	  				<label for="aiHao1">文学</label>
  	  				<input type="checkbox" name="aiHao2" id="aiHao2" />
  	  				<label for="aiHao2">体育</label>
  	  				<input type="checkbox" name="aiHao3" id="aiHao3" />
  	  				<label for="aiHao3">音乐</label>
  	  				<input type="checkbox" name="aiHao4" id="aiHao4" />
  	  				<label for="aiHao4">舞蹈</label>
  	  				<input type="checkbox"  name="aiHao5" id="aiHao5" />
  	  				<label for="aiHao5">科技</label>
  				</p>
  				<p>
  	  				<label for="introduce">个人简介：</label>
      				<br />
  	  				<textarea name="introduce" id="introduce" cols="50" rows="6"></textarea>
  				</p>
            </td>
  		</tr>
  		<tr>
    		<td align="center">
       	  	<p>
    				<input type="submit" name="button" value="提交" />
    				&nbsp;
    				<input type="reset" name="button2"  value="重置" />
		</p>
          </td>
	  </tr>
	</table>
 
  
</form>
</body>
</html>
