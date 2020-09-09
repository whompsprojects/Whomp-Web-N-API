using DTO;
using DTO.Account;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;
using System.IO;

namespace Whomps.Controllers
{
    public class AccountController : Controller
    {
        #region objects
        CommonAPIUtility objCommonAPIUtility = new CommonAPIUtility();
        Response res = new Response();
        #endregion objects

        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Account_DTO req)
        {
            var viewName = "";

            List<LoginRes_DTO> lstLoginRes_DTO = new List<LoginRes_DTO>();
            var data = objCommonAPIUtility.GetPostAsync(API.AuthenticateUser_URL, req).Result;
            res = JsonConvert.DeserializeObject<Response>(data);
            if (Cnvt.objectToString(res.status, "") == "success")
            {
                lstLoginRes_DTO = JsonConvert.DeserializeObject<List<LoginRes_DTO>>(res.data);
                if (Cnvt.ToInt64(lstLoginRes_DTO[0].User_ID) != 0)
                {
                    string tmpPwd = Cnvt.objectToString(lstLoginRes_DTO[0].PWD, "");
                    if (tmpPwd == SecurityHelper.Encrypt(req.pwd))
                    {

                        ViewBag.Message = "";
                        Session["User_ID"] = Cnvt.ToInt64(lstLoginRes_DTO[0].User_ID);
                        Session["Role_ID"] = Cnvt.ToInt64(lstLoginRes_DTO[0].Role_ID);
                        Session["First_Name"] = Cnvt.objectToString(lstLoginRes_DTO[0].First_Name, "");
                        //viewName = "~/Views/Dashboard/Dashboard.cshtml";
                        return RedirectToAction("Dashboard", "Dashboard");
                    }
                    else
                    {
                        ViewBag.Message = "Invalid UserName or Password...!";
                        viewName = "~/Views/Account/Login.cshtml";
                    }
                }
            }
            else
            {
                ViewBag.Message = "Invalid UserName or Password...!";
                viewName = "~/Views/Account/Login.cshtml";
            }
            return View(viewName);
        }

        public ActionResult Logout()
        {
            Session.Clear();
            Session.RemoveAll();
            Session.Abandon();
            return RedirectToAction("Login", "Account");
        }

        #region UserMaster 

        #region View
        public ActionResult UserMaster()
        {
            if (Session["User_ID"] != null)
            {
                try
                {
                    ViewBag.getData = objCommonAPIUtility.GetAsync(API.GetUser_URL + "?User_ID=" + Session["User_ID"] + "&Role_ID=" + Session["Role_ID"]).Result;
                }
                catch (Exception ex)
                {
                    res.status = "error";
                    res.data = ex.Message;
                }
                return View("~/Views/Masters/UserMaster.cshtml");
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }
        #endregion View

        #region Add/Update
        [HttpPost]
        public JsonResult AddUpdateUser(AddUpdateUser_DTO req)
        {
            if (Session["User_ID"] != null)
            {

                string filepath = "", fileName = "", result = "", img = "";
                int cnt = 0; string strImg = "";
                long User_ID = 0;
                try
                {
                    req.PWD = SecurityHelper.Encrypt(req.PWD);
                    req.createdBy = Convert.ToInt64(Session["User_ID"]);
                    req.CompanyID = 1;
                    if (req.Img != null)
                        req.Extension = req.Img.Contains("png") ? ".png" : ".jpg";
                    img = req.Img;
                    req.Img = null;
                    res.data = objCommonAPIUtility.GetPostAsync(API.AddUpdateUser_URL, req).Result;
                    res = JsonConvert.DeserializeObject<Response>(res.data);
                    var obj = JsonConvert.DeserializeObject<List<Response>>(res.data);
                    res.data = obj[0].data;
                    User_ID = Cnvt.ToInt64(res.data);
                    if (User_ID == 0)
                        throw new Exception(res.data);

                    #region User Image
                    try
                    {
                        filepath = "~/Content/Images/Users/";
                        fileName = User_ID + req.Extension;
                        req.Img = img;
                        if (req.IsChangeImg)
                        {
                            req.Img = req.Img.Replace("data:image/png;base64,", String.Empty);
                            strImg = req.Img.Replace("data:image/jpeg;base64,", String.Empty);
                            byte[] bytes = Convert.FromBase64String(strImg);
                            using (var imageFile = new FileStream(System.Web.HttpContext.Current.Server.MapPath(filepath + fileName), FileMode.Create))
                            {
                                imageFile.Write(bytes, 0, bytes.Length);
                                imageFile.Flush();
                            }
                        }
                        else
                        {
                            if (img != null)
                            {
                                if (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(req.Img)))
                                    System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(req.Img), System.Web.HttpContext.Current.Server.MapPath(filepath + fileName));

                            }
                        }
                        if (result == "")
                            result = fileName;
                        else
                            result = result + ":" + fileName;
                    }
                    catch(Exception ex)
                    {

                    }
                    #endregion User Image
                    res.status = "success";
                }
                catch (Exception ex)
                {
                    res.status = "error";
                    res.data = ex.Message;
                }
            }
            else
            {
                res.status = "session expired";
            }
            return Json(res);
        }
        #endregion Add/Update

        #region delete
        [HttpPost]
        public JsonResult DeleteUser(long userId)
        {
            if (Session["User_ID"] != null && (Convert.ToInt64(Session["Role_ID"]) == 1))
            {
                try
                {
                    res.data = objCommonAPIUtility.GetAsync(API.DeleteUser_URL + "?userId=" + userId).Result;
                    res.status = "success";
                }
                catch (Exception ex)
                {
                    res.status = "error";
                    res.data = ex.Message;
                }
            }
            else
            {
                res.status = "session expired";
            }
            return Json(res);
        }
        #endregion delete

        #endregion UserMaster
    }
}
