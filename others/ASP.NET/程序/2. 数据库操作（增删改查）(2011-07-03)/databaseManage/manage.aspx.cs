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
    public partial class manage : System.Web.UI.Page
    {
        public SqlConnection m_objConnection;
        public SqlCommand m_objCommand;
        public SqlDataReader m_objReader;

        protected void Page_Load(object sender, EventArgs e)
        {
            m_objConnection = new SqlConnection(ConfigurationManager.AppSettings["connStr"].ToString());

            if (Request.QueryString["type"] != null && Request.QueryString["type"].ToString() == "update")
            {
                //进行“更新”操作的前奏
                m_objCommand = new SqlCommand("SELECT * FROM studentInfo WHERE SNo=@SNo",m_objConnection);
                m_objCommand.Parameters.AddWithValue("@SNo", Request.QueryString["id"].ToString());
                m_objConnection.Open();
                m_objReader = m_objCommand.ExecuteReader();
                m_objReader.Read();
            }
            else if (Request.Form["btn"] != null && Request.Form["btn"].ToString() == "修改")
            {
                //进行“更新”操作
                update();
            }
            else if (Request.Form["btn"] != null && Request.Form["btn"].ToString() == "添加")
            {
                //进行“添加”操作
                addNew();
            }
            else
            {
                //进行“添加”操作的前奏
                m_objCommand = new SqlCommand("SELECT TOP 1 SNo FROM studentInfo ORDER BY SNo DESC", m_objConnection);
                m_objConnection.Open();
                m_objReader = m_objCommand.ExecuteReader();
                m_objReader.Read();
            }
        }

        //执行“更新”操作
        private void update()
        {
            m_objCommand = new SqlCommand("UPDATE studentInfo SET SName=@SName,SSex=@SSex,SAge=@SAge WHERE SNo=@SNo",m_objConnection);
            m_objCommand.Parameters.AddWithValue("@SName", Request.Form["SName"].ToString());
            m_objCommand.Parameters.AddWithValue("@SAge", Request.Form["SAge"].ToString());
            if (Request.Form["SSex"].ToString()=="male")
            {
                m_objCommand.Parameters.AddWithValue("@SSex", true);
            }
            else
            {
                m_objCommand.Parameters.AddWithValue("@SSex", false);
            }
            m_objCommand.Parameters.AddWithValue("@SNo", Request.Form["SNo"].ToString());
            m_objConnection.Open();
            m_objCommand.ExecuteNonQuery();

            m_objConnection.Close();
            m_objCommand.Dispose();
            m_objConnection.Dispose();
            
            Response.Redirect("/Default.aspx");
        }

        //执行“添加”操作
        private void addNew()
        {
            m_objCommand = new SqlCommand("INSERT INTO studentInfo VALUES(@SNo,@SName,@SSex,@SAge)",m_objConnection);
            m_objCommand.Parameters.AddWithValue("@SName", Request.Form["SName"].ToString());
            m_objCommand.Parameters.AddWithValue("@SAge", Request.Form["SAge"].ToString());
            if (Request.Form["SSex"].ToString()=="female")
            {
                m_objCommand.Parameters.AddWithValue("@SSex", true);
            }
            else
            {
                m_objCommand.Parameters.AddWithValue("@SSex", false);
            }
            m_objCommand.Parameters.AddWithValue("@SNo", Request.Form["SNo"].ToString());
            m_objConnection.Open();
            m_objCommand.ExecuteNonQuery();

            m_objConnection.Close();
            m_objCommand.Dispose();
            m_objConnection.Dispose();

            Response.Redirect("/Default.aspx");
        }

        //关闭资源引用
        public void clearResource()
        {
            m_objReader.Close();
            m_objConnection.Close();
            m_objConnection.Dispose();
            m_objCommand.Dispose();
        }
    }
}
