using DAL.Common;
using DTO;
using DTO.Website;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Website
{
    public class DAL_Website
    {
        #region AddEditWebsite_DAL
        public static Response AddEditWebsite_DAL(WebData req)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@Web_ID", req.WebHdr.Web_ID));
                prmList.Add(new SqlParameter("@Is_Add", req.WebHdr.Is_Add));
                prmList.Add(new SqlParameter("@JSON_HDR", JsonConvert.SerializeObject(req.WebHdr).Replace("\'",string.Empty)));
                prmList.Add(new SqlParameter("@JSON_DET", JsonConvert.SerializeObject(req.WebDET).Replace("\'", string.Empty)));
                dt = db.ExecuteDataTable("USP_Wmp_AddEdit_Website", prmList.ToArray());
                if (ExUtil.IsDataTableNullOrEmpty(dt))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    res.status = "success";
                    res.data = JsonConvert.SerializeObject(dt);
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion AddEditWebsite_DAL

        #region GetData_Website_DAL
        public static Response GetData_Website_DAL(long Web_ID)
        {
            var ds = new DataSet();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@Web_ID", Web_ID));
                ds = db.ExecuteDataSet("USP_Wmp_GetData_Website", prmList.ToArray());
                if (ExUtil.IsDataSetNullOrEmpty(ds))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    string[] arrTable = { "Hdr", "Menu", "Slogan", "Lead_Fields", "Oper_Flow", "Products", "Team", "Team_Department", "Facility", "FeedBk", "Package", "Pack_Point_Det", "Partner", "Information", "Contact", "SocailNtwk","Company" };
                    int i = 0;
                    foreach (DataTable table in ds.Tables)
                    {
                        table.TableName = arrTable[i];
                        i++;
                    }
                    res.status = "success";
                    res.data = JsonConvert.SerializeObject(ds);
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion GetData_Website_DAL

        #region GetWebsiteDetail
        public static Response GetWebsiteDetail_DAL(long User_ID)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@User_ID", User_ID));
                dt = db.ExecuteDataTable("USP_Wmp_GetWebsiteDetail", prmList.ToArray());
                if (ExUtil.IsDataTableNullOrEmpty(dt))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    res.status = "success";
                    res.data = JsonConvert.SerializeObject(dt);
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion GetWebsiteDetail

        #region UpdateWebStatus
        public static Response UpdateWebStatus(long User_ID, long Web_ID, int Status_ID)
        {
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@User_ID", User_ID));
                prmList.Add(new SqlParameter("@Web_ID", Web_ID));
                prmList.Add(new SqlParameter("@Status_ID", Status_ID));
                int NoofRowEffected = db.ExecuteNonQuery("USP_Wmp_UpdateWebStatus", prmList.ToArray());
                if (NoofRowEffected == 0)
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    res.status = "success";
                    res.data = Cnvt.objectToString(NoofRowEffected,"");
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion UpdateWebStatus

        #region GenerateLead
        public static Response GenerateLead_DAL(Lead_Fields req)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@JSON_Lead_DET", JsonConvert.SerializeObject(req).Replace("\'", "\''")));
                prmList.Add(new SqlParameter("@Web_ID", req.Web_ID));
                dt = db.ExecuteDataTable("USP_Wmp_GenerateLead", prmList.ToArray());
                if (ExUtil.IsDataTableNullOrEmpty(dt))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    res.status = "success";
                    res.data = JsonConvert.SerializeObject(dt);
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion GenerateLead

        #region Get_WebsiteTheme_DAL
        public static Response Get_WebsiteTheme_DAL()
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                dt = db.ExecuteDataTable("USP_Wmp_Get_WebsiteTheme", prmList.ToArray());
                if (ExUtil.IsDataTableNullOrEmpty(dt))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    res.status = "success";
                    res.data = JsonConvert.SerializeObject(dt);
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion Get_WebsiteTheme_DAL
    }
}
