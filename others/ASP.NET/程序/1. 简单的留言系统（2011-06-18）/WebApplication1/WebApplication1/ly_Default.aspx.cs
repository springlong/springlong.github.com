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
    public partial class _Default : System.Web.UI.Page
    {
        public SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["connStr"]);
        public SqlDataAdapter obj_Adapter;
        public SqlCommandBuilder obj_CommandBuilder;
        public DataSet ds = new DataSet();
        public DataTable tab = new DataTable();
        public int amountPages;
        public int currentPage;
        protected void Page_Load(object sender, EventArgs e)
        {
            obj_Adapter= new SqlDataAdapter("SELECT * FROM lyInfo ORDER BY addTime DESC", conn);
            obj_CommandBuilder = new SqlCommandBuilder(obj_Adapter);

            obj_Adapter.Fill(ds, "lyInfo");

            tab=ds.Tables["lyInfo"];

            //当前页和总页的设置
            int amountOfAPage=Convert.ToInt32(ConfigurationManager.AppSettings["amountOfAPage"]);       //每一页所显示的记录数
            amountPages=Convert.ToInt32(Math.Truncate((tab.Rows.Count-1)/Convert.ToDecimal(amountOfAPage))+1);       //显示总记录页
            if (Session["currentPage"] == null)
            {
                currentPage=1;//如果第一次打开，默认显示第一页
            }
            else
            {
                currentPage=Convert.ToInt32(Session["currentPage"].ToString());
            }

            if (Request.QueryString["ty"] == "moveFirst") //移至首页
            {
                currentPage = 1;
            }
            else if (Request.QueryString["ty"] == "movePrivious")//移至上一页
            {
                currentPage = (currentPage == 1) ? amountPages : --currentPage;
            }
            else if (Request.QueryString["ty"] == "moveNext") //移至下一页
            {
                currentPage = (currentPage == amountPages) ? 1 : ++currentPage;
            }
            else if (Request.QueryString["ty"] == "moveLast") //移至尾页
            {
                currentPage=amountPages;
            }
            else if (Request.QueryString["ty"] == "moveDirect")
            {
                int num;
                bool result = int.TryParse(Request.QueryString["directPos"].ToString(), out num);
                if (result)
                {
                    if (num >= 1 && num <= amountPages)
                    {
                        currentPage= num;
                    }
                }
            }
            //通过添加记录而跳转到这里，则显示第一页
            if (Request.QueryString["info"] != null && Request.QueryString["info"].ToString() == "addSucess")
            {
                currentPage = 1;
            }
            Session["currentPage"] = currentPage;

            //判断是否需要删除记录
            if (!String.IsNullOrEmpty(Request.QueryString["ID"]) && Request.QueryString["ty"].ToString() == "del")
            {
                if (Session["userName"]==null || String.IsNullOrEmpty(Session["userName"].ToString()) || Session["role"].ToString().ToLower()=="false")
                {
                    Response.Write("<script>alert('对不起，你没有足够的权限！');location='/ly_Default.aspx';</script>");
                }
                else
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("DELETE FROM lyInfo WHERE ID=" + Request.Params["ID"].ToString(), conn);
                    if (cmd.ExecuteNonQuery() >= 1)
                    {
                        Response.Write("<script>alert('删除成功！');location='/ly_Default.aspx';</script>");
                    }
                }
            }
            
            //进行注销操作
            if(Request.QueryString["ty"]!=null && Request.QueryString["ty"].ToString()=="logout")
            {
                Session["userName"]=null;
            }
        }
    }
}
