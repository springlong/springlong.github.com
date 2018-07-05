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
    public partial class reply : System.Web.UI.Page
    {
        public SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
        public SqlDataAdapter obj_Adapter;
        public SqlCommandBuilder obj_CommandBuilder;
        public DataSet ds = new DataSet();
        public DataTable tab = new DataTable();

        protected void Page_Load(object sender, EventArgs e)
        {
            //判断是否需要删除留言
            if (!String.IsNullOrEmpty(Request.QueryString["delID"]) && Request.QueryString["ty"] != null && Request.QueryString["ty"].ToString() == "delLY")
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("DELETE FROM lyInfo WHERE ID=" + Request.QueryString["delID"].ToString(), conn);
                if (cmd.ExecuteNonQuery() >= 1)
                {
                    conn.Close();
                    cmd.Dispose();
                    Response.Redirect("/ly_Default.aspx");
                }
                conn.Close();
                cmd.Dispose();
            }

            //判断是否需要删除回复
            if (!String.IsNullOrEmpty(Request.QueryString["delID"]) && Request.QueryString["ty"]!=null && Request.QueryString["ty"].ToString() == "delHF")
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("DELETE FROM replyInfo WHERE ID=" + Request.QueryString["delID"].ToString(), conn);
                if (cmd.ExecuteNonQuery() >= 1)
                {
                    conn.Close();
                    Response.Write("<script>alert('删除成功！');location='/reply.aspx?ID=" + Request.QueryString["ID"].ToString()+"';</script>");
                }
                conn.Close();
                cmd.Dispose();
            }

            //判断是否进行留言
            if(Request.Form["replyContent"]!=null)
            {
                conn = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
                SqlCommand cmd = new SqlCommand("INSERT INTO replyInfo(lyID,replyUser,replyTime,content) values(@lyID,@replyUser,@replyTime,@content)", conn);

                cmd.Parameters.AddWithValue("@lyID", Request.QueryString["ID"].ToString());
                cmd.Parameters.AddWithValue("@replyUser", Session["userName"] == null ? "游客" : Convert.ToString(Session["userName"]));
                cmd.Parameters.AddWithValue("@replyTime", DateTime.Now);
                cmd.Parameters.AddWithValue("@content", Request.Form["replyContent"].ToString());

                conn.Open();
                cmd.ExecuteNonQuery();

                conn.Close();
                cmd.Dispose();
                Response.Redirect("/reply.aspx?ID=" + Request.QueryString["ID"].ToString());
            }

            //回复内容的读取
            obj_Adapter = new SqlDataAdapter("SELECT * FROM replyInfo WHERE lyID='" + Request.QueryString["ID"].ToString() + "'", conn);
            obj_CommandBuilder = new SqlCommandBuilder(obj_Adapter);
            obj_Adapter.Fill(ds, "replyInfo");
            tab = ds.Tables["replyInfo"];
        }
    }
}
