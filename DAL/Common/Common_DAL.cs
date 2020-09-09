using DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Common
{
    public class Common_DAL
    {
        #region Error Logger
        public static Response ErrorLogger(ErrorLoger_DTO req)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@Message", req.Message));
                prmList.Add(new SqlParameter("@Source", req.Source));
                prmList.Add(new SqlParameter("@StackTrace", req.StackTrace));
                prmList.Add(new SqlParameter("@TargetSite", req.TargetSite));
                prmList.Add(new SqlParameter("@Created_By", req.Created_By));
                dt = db.ExecuteDataTable("USP_Error_Logger", prmList.ToArray());
                if (ExUtil.IsDataTableNullOrEmpty(dt))
                {
                    res.status = "error";
                    res.data = "issue in db";
                }
                else
                {
                    res.status = "success";
                    res.data = "";
                }

            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion Error Logger
    }
}
