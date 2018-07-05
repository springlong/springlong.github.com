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

namespace databaseManage
{
    public partial class _Default : System.Web.UI.Page
    {
        public SqlConnection m_objConnection;
        public SqlCommand m_objCommand;
        public SqlDataReader m_objReader;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["type"] != null && Request.QueryString["type"].ToString() == "del")
            {
                //进行“删除”操作！
                delete();
            }
            else if (Request.QueryString["type"] != null && Request.QueryString["type"].ToString() == "update")
            {
                //转向“修改”操作页面
                Response.Redirect("/manage.aspx?id=" + Request.QueryString["id"].ToString() + "&type=update");
            }

            //进行查询操作！
            search();
        }

        //进行删除操作
        private void delete()
        {
            m_objConnection = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
            m_objCommand = new SqlCommand("DELETE FROM studentInfo WHERE SNo=@SNo", m_objConnection);
            m_objCommand.Parameters.AddWithValue("@SNo", Request.QueryString["id"].ToString());
            m_objConnection.Open();
            m_objCommand.ExecuteNonQuery();

            m_objConnection.Close();
            m_objCommand.Dispose();
            m_objConnection.Dispose();
        }

        //进行“查询”操作
        private void search()
        {
            m_objConnection = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
            if (Request.Form["section"] != null && Request.Form["section"].ToString() == "查询")
            {
                m_objCommand = new SqlCommand("SELECT * FROM studentInfo WHERE SName LIKE @SName", m_objConnection);
                m_objCommand.Parameters.AddWithValue("@SName", "%" + Request.Form["keywords"].ToString() + "%");
            }
            else
            {
                m_objCommand = new SqlCommand("SELECT * FROM studentInfo", m_objConnection);
            }
            m_objConnection.Open();
            m_objReader = m_objCommand.ExecuteReader();
        }
        public void clearResource()
        {
            //关闭资源引用
            m_objReader.Close();
            m_objConnection.Close();
            m_objConnection.Dispose();
            m_objCommand.Dispose();
        }

    }
}
