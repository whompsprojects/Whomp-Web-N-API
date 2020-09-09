using DAL.Common;
using DTO;
using DTO.Account;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Account
{
    public class DAL_Account
    {

        #region Authenticate User
        public static Response AuthenticateUser(Account_DTO req)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@UserName", req.email_id));
                dt = db.ExecuteDataTable("USP_Authenticate_User", prmList.ToArray());
                if (ExUtil.IsDataTableNullOrEmpty(dt))
                {
                    res.status = "error";
                    res.data = "invalid_user";
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
        #endregion Authenticate User

        #region Get Menu
        public static Response GetMenu(long User_ID)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@UserID", User_ID));
                dt = db.ExecuteDataTable("USP_GetMenu", prmList.ToArray());
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
        #endregion Get Menu

        #region Get Role
        public static Response GetRole()
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@OperationType", "GetRole"));
                dt = db.ExecuteDataTable("USP_AssignAccess_Master", prmList.ToArray());
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
        #endregion Get Role

        #region Get Role Edit
        public static Response GetRoleEdit(long roleID)
        {
            var ds = new DataSet();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@OperationType", "GetEdit"));
                prmList.Add(new SqlParameter("@RoleID", roleID));
                ds = db.ExecuteDataSet("USP_AssignAccess_Master", prmList.ToArray());
                if (ExUtil.IsDataSetNullOrEmpty(ds))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
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
        #endregion Get Role Edit

        #region Edit Role
        public static Response EditRole(EditRole_DTO req)
        {
            var dt = new DataTable();
            var db = new DBHelper();
            var res = new Response();
            try
            {
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@OperationType", "Edit"));
                prmList.Add(new SqlParameter("@RoleID", req.RoleID));
                prmList.Add(new SqlParameter("@MenuID", req.MenuID));
                prmList.Add(new SqlParameter("@UserID", req.UserID));
                dt = db.ExecuteDataTable("USP_AssignAccess_Master", prmList.ToArray());
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
        #endregion Edit Role

        #region Get_UserMaster
        public static Response Get_UserMaster(long User_ID, long Role_ID)
        {

            Response res = new Response();
            var ds = new DataSet();
            DBHelper objDBHelper = new DBHelper();
            try
            {
                res.status = "success";
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@User_ID", User_ID));
                prmList.Add(new SqlParameter("@Role_ID", Role_ID));
                ds = objDBHelper.ExecuteDataSet("USP_Wmp_GetUserMst", prmList.ToArray(), false);
                if (ExUtil.IsDataSetNullOrEmpty(ds))
                {
                    res.status = "error";
                    res.data = "no record found";
                }
                else
                {
                    string[] arrTable = { "UserLst", "RoleLst"};
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
        #endregion Get_UserMaster 

        #region Add/Update User
        public static Response AddUpdateUser(AddUpdateUser_DTO req)
        {
            Response res = new Response();
            DBHelper objDBHelper = new DBHelper();
            try
            {
                res.status = "success";
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@OperType", req.OperType));
                prmList.Add(new SqlParameter("@User_ID", req.User_ID));
                prmList.Add(new SqlParameter("@UserName", req.Email_ID));
                prmList.Add(new SqlParameter("@PWD", req.PWD));
                prmList.Add(new SqlParameter("@First_Name", req.First_Name));
                prmList.Add(new SqlParameter("@Last_Name", req.Last_Name));
                prmList.Add(new SqlParameter("@Address", req.Address));
                prmList.Add(new SqlParameter("@Alt_Address", req.Alt_Address));
                prmList.Add(new SqlParameter("@Extension", req.Extension));
                prmList.Add(new SqlParameter("@Email_ID", req.Email_ID));
                prmList.Add(new SqlParameter("@Tel_No", req.Tel_No));
                prmList.Add(new SqlParameter("@Mob_No", req.Mob_No));
                prmList.Add(new SqlParameter("@Status", req.Status));
                prmList.Add(new SqlParameter("@CompanyID", req.CompanyID));
                prmList.Add(new SqlParameter("@createdBy", req.createdBy));
                prmList.Add(new SqlParameter("@RoleID", req.RoleID));
                res.data = JsonConvert.SerializeObject(objDBHelper.ExecuteDataTable("USP_Wmp_AddEditUserMst", prmList.ToArray(), false));
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion Add/Update User

        #region DeleteUser
        public static Response DeleteUser(long UserId)
        {
            Response res = new Response();
            DBHelper objDBHelper = new DBHelper();
            try
            {
                res.status = "success";
                var prmList = new List<SqlParameter>();
                prmList.Add(new SqlParameter("@UserId", UserId));
                res.data = JsonConvert.SerializeObject(objDBHelper.ExecuteDataTable("USP_Wmp_DeleteUserMst", prmList.ToArray(), false));
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return res;
        }
        #endregion DeleteUser
    }
}
