<%@ Page Language="C#" MaintainScrollPositionOnPostback="true" AutoEventWireup="true" CodeBehind="reply.aspx.cs" Inherits="WebApplication1.reply" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>回复留言页面</title>
    <link rel="Stylesheet" type="text/css" href="css/main.css" />
</head>
<body>
<form id="frmHF" runat="server">
    <h1>留言回复列表</h1>
    <p class="currentUser">【当前用户：<%
           if (Session["userName"] != null)
           {  
               Response.Write(Session["userName"].ToString());
           }
           else
           {
               Response.Write("游客");
           }
            %>】</p>
    <p class="return_ly"><a href="ly_Default.aspx">返回留言列表</a></p>
    <%  //获取留言相关信息：
        System.Data.SqlClient.SqlCommand lyCommand = new System.Data.SqlClient.SqlCommand("SELECT * FROM lyInfo WHERE ID='" + Request.QueryString["ID"].ToString() + "'", conn);
        conn.Open();
        System.Data.SqlClient.SqlDataReader lyReader = lyCommand.ExecuteReader();
        lyReader.Read();%>
    <div class="topCaption">
        <h2><a id="topCaption"></a><%=lyReader["subject"].ToString() %></h2>
        <a href="#anchorBottom" id="HFPos">回复</a>
    </div>
    <table>
        <tr>
            <td class="toux" rowspan="2"><img src="/images/tx.gif" alt="头像" /><%=lyReader["userName"].ToString() %></td>
            <td class="info">
                <div class="wrapper">
                    <p class="ch">楼主</p>
                    <p class="time">发表于：<%=lyReader["addTime"].ToString() %></p>
                </div>
                <div class="content">
                    <%=lyReader["content"].ToString() %>
                </div>
            </td>
        </tr>
        <tr class="control">
            <td>
                <div>
                    <%if (Session["userName"] != null && Session["role"].ToString().ToLower() == "true")
                      { //如果没有权限，则不显示删除链接！%>
                      <a href="/reply.aspx?ID=<%=Request.QueryString["ID"].ToString() %>&delID=<%=lyReader["ID"].ToString() %>&ty=delLY">删除</a>
                    <%} %>
                    <%  conn.Close();
                        lyCommand.Dispose();
                        lyReader.Close(); %>
                </div>
            </td>
        </tr>
    </table>
    <%
        for (int i = 0; i < tab.Rows.Count; i++)
        {
            %>
    <table>
        <tr>
            <td class="toux" rowspan="2"><img src="/images/tx.gif" alt="头像" /><%=tab.Rows[i]["replyUser"].ToString() %></td>
            <td class="info">
                <p class="time">回复于：<%=tab.Rows[i]["replyTime"].ToString() %></p>
                <div class="content">
                    <%=tab.Rows[i]["content"].ToString() %>
                </div>
            </td>
        </tr>
        <tr class="control">
            <td>
                <div>
                    <%if (Session["userName"] != null && Session["role"].ToString().ToLower() == "true")
                      { //如果没有权限，则不显示删除链接！%>
                      <a href="/reply.aspx?ID=<%=Request.QueryString["ID"].ToString() %>&delID=<%=tab.Rows[i]["ID"].ToString() %>&ty=delHF">删除</a>
                    <%} %>
                    <a href="#topCaption">Top</a>
                </div>
            </td>
        </tr>
    </table>
     <%}%>
    <div class="replyContent">
        <p>回复内容：</p>
        <p><textarea id="replyContent" name="replyContent"></textarea></p>
        <p><input type="submit" id="addHF" value="添加回复" /></p>
    </div><a id="anchorBottom"></a>
    <%  obj_Adapter.Dispose();
        obj_CommandBuilder.Dispose();
        ds.Dispose();
        tab.Dispose(); %>
</form>
<script type="text/javascript">
    function $(id){return document.getElementById(id);}
    
    $("HFPos").onclick=function(){
        $("replyContent").focus();
    }
    //点击登陆按钮时验证表单数据的正确性
    $("addHF").onclick=function(){
       var replyContent=$("replyContent");
       replyContent.value=trim(replyContent.value);
       
       if(replyContent.value=="")
       {
            alert("留言内容不能为空！");
            replyContent.focus();
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
    
    document.body.scrollTop=500;
</script>
</body>
</html>

