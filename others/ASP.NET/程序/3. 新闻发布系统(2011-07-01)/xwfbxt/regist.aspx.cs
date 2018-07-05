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
    public partial class regist : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //用户注册
            if (Request.Form["userName"] != null)
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
                SqlCommand cmd = new SqlCommand("SELECT * FROM userInfo", conn);

                conn.Open();
                SqlDataReader dtReader = cmd.ExecuteReader();

                bool success = true;    //默认为注册成功
                while (dtReader.Read())
                {
                    if (dtReader["userName"].ToString().Trim().ToLower() == Request.Form["userName"].ToString().Trim().ToLower())
                    {
                        success = false;
                        break;
                    }
                }
                dtReader.Close();

                if (success)
                {
                    cmd = new SqlCommand("INSERT INTO userInfo VALUES(@userName,@password,0)", conn);

                    cmd.Parameters.AddWithValue("@userName", Request.Form["userName"].ToString().Trim());
                    cmd.Parameters.AddWithValue("@password", Request.Form["password1"].ToString().Trim());

                    cmd.ExecuteNonQuery();
                    Response.Write("<script>alert('恭喜您,注册成功！');location='/regist.aspx';</script>");
                }
                else
                {
                    Response.Redirect("/regist.aspx?info=error_01&errUserName=" + Request.Form["userName"].ToString());
                }
                conn.Close();
                cmd.Dispose();
            }
        }
    }
}
