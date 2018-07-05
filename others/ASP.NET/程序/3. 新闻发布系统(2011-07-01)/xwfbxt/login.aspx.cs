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
    public partial class login1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //进行登陆
            if (Session["userName"] != null)
            {
                Response.Write("<script>alert('已有账户登陆！不能同时登陆多个账户！');location='/ly_Default.aspx';</script>");
            }
            if(Request.Form["userName"]!=null && Request.Form["password"]!=null)
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
                SqlCommand cmd = new SqlCommand("SELECT * FROM userInfo WHERE userName='" + Request.Form["userName"].ToString() + "' and password='" + Request.Form["password"].ToString() + "'", conn);

                conn.Open();
                SqlDataReader dtReader = cmd.ExecuteReader();

                if (!dtReader.HasRows)
                {
                    dtReader.Close();
                    conn.Close();
                    Response.Redirect("/login.aspx?info=error&userName="+Request.Form["userName"].ToString());
                }
                else
                {
                    dtReader.Read();
                    var userID = dtReader["userName"].ToString();
                    var role = dtReader["Role"].ToString();
                    dtReader.Close();
                    conn.Close();

                    Session["userName"] = userID;
                    Session["role"] = role;
                    Response.Redirect("/ly_Default.aspx");
                }
            }
        }
    }
}
