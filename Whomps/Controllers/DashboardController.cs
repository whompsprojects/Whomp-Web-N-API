using DTO;
using DTO.Account;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Whomps.Controllers
{
    public class DashboardController : Controller
    {
        #region objects
        CommonAPIUtility objCommonAPIUtility = new CommonAPIUtility();
        Response res = new Response();
        #endregion objects

        #region Dashboard
        public ActionResult Dashboard()
        {
            try
            {
                if (Session["User_ID"] == null)
                {
                    return RedirectToAction("Logout", "Account");
                }
                else
                {
                    GetMenu();
                }

            }
            catch (Exception ex)
            {
                //CommonController.Error_Logger(ex);
            }
            return View("~/Views/Dashboard/Dashboard.cshtml");
        }
        #endregion Dashboard

        #region Get Menu
        public JsonResult GetMenu()
        {
            try
            {
                if (SessionUtil.val("MenuDetail") == null)
                {
                    if (Convert.ToInt64(SessionUtil.val("User_ID")) > 0)
                    {
                        GetMenu_DTO req =new GetMenu_DTO();
                        req.User_ID = Convert.ToInt64(SessionUtil.val("User_ID"));
                        var data = objCommonAPIUtility.GetPostAsync(API.GetMenu_URL, req).Result;
                        res = JsonConvert.DeserializeObject<Response>(data);
                        if (res.status != "success")
                            throw new Exception(res.status);
                        Session["MenuDetail"] = res.data;
                    }
                }
                else
                {
                    res.status = "success";
                    res.data = SessionUtil.val("MenuDetail");
                }
            }
            catch (Exception ex)
            {
                res.status = ex.Message;
                //CommonController.Error_Logger(ex);
            }
            return Json(res);
        }
        #endregion Get Menu
    }
}