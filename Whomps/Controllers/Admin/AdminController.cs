using DTO;
using DTO.Account;
using Newtonsoft.Json;
using System;
using System.Web.Mvc;

namespace Whomps.Controllers.Admin
{
    public class AdminController : Controller
    {

        #region objects
        CommonAPIUtility objCommonAPIUtility = new CommonAPIUtility();
        Response res = new Response();
        #endregion objects

        #region Assign Access

        #region Get Role
        public ActionResult AssignAccessMasterList()
        {
            if (Session["User_ID"] != null && Convert.ToInt64(Session["Role_ID"]) == 1)
            {
                try
                {
                    var data = objCommonAPIUtility.GetPostAsync(API.GetRole_URL, null).Result;
                    res = JsonConvert.DeserializeObject<Response>(data);
                    if (res.status != "success")
                        throw new Exception(res.status);
                    ViewBag.getData = res;
                }
                catch (Exception ex)
                {
                    res.status = ex.Message;
                    //CommonController.Error_Logger(ex);
                }
                return View("~/Views/Admin/AssignAccessMaster.cshtml");
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }
        #endregion Get Role

        #region Get Edit Role Data
        public JsonResult GetRoleEdit(long roleID)
        {
            try
            {
                GetRoleEdit_DTO req = new GetRoleEdit_DTO();
                req.roleID = roleID;
                var data = objCommonAPIUtility.GetAsync(API.GetRoleEdit_URL + "?roleID=" + roleID).Result;
                res = JsonConvert.DeserializeObject<Response>(data);
                if (res.status != "success")
                    throw new Exception(res.status);
                ViewBag.getData = res;
            }
            catch (Exception ex)
            {
                res.status = ex.Message;
                //CommonController.Error_Logger(ex);
            }
            return Json(res);
        }
        #endregion Get Edit Role Data

        #region Edit Role
        public JsonResult EditRole(long RoleID, string MenuIDs)
        {
            try
            {
                EditRole_DTO objEditRole_DTO = new EditRole_DTO();
                objEditRole_DTO.OperationType = "Edit";
                objEditRole_DTO.RoleID = Cnvt.ToInt64(RoleID);
                objEditRole_DTO.MenuID = Cnvt.objectToString(MenuIDs,"");
                objEditRole_DTO.UserID = Cnvt.ToInt64(SessionUtil.val("User_ID"));
                var data = objCommonAPIUtility.GetPostAsync(API.EditRole_URL, objEditRole_DTO).Result;
                res = JsonConvert.DeserializeObject<Response>(data);
                if (res.status != "success")
                    throw new Exception(res.status);
                ViewBag.getData = res;
            }
            catch (Exception ex)
            {
                res.status = ex.Message;
                //CommonController.Error_Logger(ex);
            }
            return Json(res);
        }
        #endregion Edit Role

        #endregion Assign Access
    }
}