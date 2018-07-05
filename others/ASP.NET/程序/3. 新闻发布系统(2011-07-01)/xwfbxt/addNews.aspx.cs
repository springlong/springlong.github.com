using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace WebApplication1
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //向数据库添加留言记录
            /*if (Session["userName"] == null)
            {
                Response.Write("<script>alert('请先登录！');location='/login.aspx';</script>");
            }
            else if (Request.Form["subject"] != null)
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
                SqlCommand cmd = new SqlCommand("INSERT INTO lyInfo(userName,addTime,subject,content) values(@userName,@addTime,@subject,@content)", conn);

                cmd.Parameters.AddWithValue("@userName", Session["userName"].ToString());
                cmd.Parameters.AddWithValue("@addTime", DateTime.Now);
                cmd.Parameters.AddWithValue("@subject", Request.Form["subject"].ToString());
                cmd.Parameters.AddWithValue("@content", Request.Form["content"].ToString());

                conn.Open();
                cmd.ExecuteNonQuery();

                conn.Close();
                cmd.Dispose();

                Response.Redirect("/ly_Default.aspx?info=addSucess"); //留言添加完成之后，直接跳往留言列表最末页
            }*/
        }
    }
}
