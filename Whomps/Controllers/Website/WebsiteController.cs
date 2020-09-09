using DTO;
using DTO.Website;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Whomps.Controllers.Website
{
    public class WebsiteController : Controller
    {
        #region declaration
        CommonAPIUtility objCommonAPIUtility = new CommonAPIUtility();
        Response res = new Response();
        #endregion declaration

        #region Create Update Website
        public ActionResult CreateWebsite(bool WebIsAdd, long Web_ID = 0)
        {
            if (Session["User_ID"] != null && (Convert.ToInt64(Session["Role_ID"]) == 1 || Convert.ToInt64(Session["Role_ID"]) == 2))
            {
                ViewBag.WebIsAdd = WebIsAdd;
                ViewBag.Web_ID = Web_ID;
                if (!WebIsAdd && Web_ID != 0)
                {
                    ViewBag.VB_WebIsView = false;
                    ViewBag.WebViewData = objCommonAPIUtility.GetAsync(API.GetData_Website_URL + "?Web_ID=" + Web_ID).Result;
                }
                ViewBag.VB_Theme = objCommonAPIUtility.GetAsync(API.Get_WebsiteTheme_URL).Result;
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }
        #endregion Create Update Website

        #region View Website
        public ActionResult ViewWebsite(long Web_ID)
        {
            try
            {
                ViewBag.Web_ID = Web_ID;
                ViewBag.WebIsAdd = false;
                ViewBag.VB_WebIsView = true;
                ViewBag.WebViewData = objCommonAPIUtility.GetAsync(API.GetData_Website_URL + "?Web_ID=" + Web_ID).Result;
                var res = JsonConvert.DeserializeObject<Response>(ViewBag.WebViewData);
                dynamic json = Newtonsoft.Json.JsonConvert.DeserializeObject(res.data);
                ViewBag.VB_Theme = "../Content/WebsiteCSS/Theme/" + Cnvt.objectToString(json["Hdr"][0]["ThemeText"].Value, "blue") + ".css";
                ViewBag.VB_ThemeID = Cnvt.objectToInt(json["Hdr"][0]["ThemeID"].Value, 0);
            }
            catch (Exception ex)
            {
                res.data = ex.Message;
                res.status = "error";
            }
            return View();
        }
        #endregion View Website

        #region Get Website
        public ActionResult GetWebsite()
        {
            if (Session["User_ID"] != null && (Convert.ToInt64(Session["Role_ID"]) == 1 || Convert.ToInt64(Session["Role_ID"]) == 2 || Convert.ToInt64(Session["Role_ID"]) == 3))
            {
                ViewBag.WebsiteDetail = objCommonAPIUtility.GetAsync(API.GetWebsiteDetail_URL + "?User_ID=" + Session["User_ID"]).Result;
                return View();
            }
            else
            {
                return RedirectToAction("Logout", "Account");
            }
        }
        #endregion Get Website

        #region Save
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult AddEditWebsite(string str_HDR, string str_DET)
        {
            long Web_ID = 0;long Prev_Web_ID = 0;
            try
            {
                WebHdr HDR = new WebHdr(); WebDET DET = new WebDET();
                HDR = (JsonConvert.DeserializeObject<WebData>(str_HDR)).WebHdr;
                DET = (JsonConvert.DeserializeObject<WebData>(str_DET)).WebDET;
                Prev_Web_ID = HDR.Web_ID;
                if (Cnvt.ToInt64(Session["User_ID"]) == 0)
                {
                    res.data = "session expired";
                    res.status = "error";
                    return Json(res);
                }

                #region Add Edit Record In DB
                HDR.User_ID = Cnvt.ToInt64(Session["User_ID"]);
                res = AddEditWebsiteData(HDR, DET);
                if (res.status != "success")
                    throw new Exception(res.data);
                var obj = JsonConvert.DeserializeObject<List<Response>>(res.data);
                res = obj[0];
                Web_ID = Cnvt.ToInt64(res.data);
                if (Web_ID == 0)
                    throw new Exception(res.data);
                #endregion Add Edit Record In DB

                #region Creating Directories
                bool exists = Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID));
                if (!exists)
                {
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Facility"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/FeedBk"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Partner"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Team"));
                }
                #endregion Creating Directories

                #region Storing New Images
                if (Request.Files.Count > 0)
                {
                    string filePath = "", fileName = "", fname = "", ext = ""; bool isFileFound = true; int index = 0;
                    HttpFileCollectionBase files = Request.Files;
                    HttpPostedFileBase file = null;
                    for (int i = 0; i < files.Count; i++)
                    {
                        isFileFound = true;
                        file = files[i];
                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        index = fname.LastIndexOf(@".");
                        ext = fname.Substring(index, (fname.Length - index));
                        if (files.AllKeys[i].IndexOf("HDR_BkGrnd") == 0)
                        {
                            filePath = GetFileName("HDR_BkGrnd", Web_ID);
                            fileName = "hdr_bg1" + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("HDR_Logo") == 0)
                        {
                            filePath = GetFileName("HDR_Logo", Web_ID);
                            fileName = "Logo1" + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("HDR_Product") == 0)
                        {
                            filePath = GetFileName("HDR_Product", Web_ID);
                            fileName = "product_hdr1" + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("HDR_FeedBk") == 0)
                        {
                            filePath = GetFileName("HDR_FeedBk", Web_ID);
                            fileName = "feedbck_bg1" + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("Team") == 0)
                        {
                            filePath = GetFileName("Team", Web_ID);
                            fileName = files.AllKeys[i].Split('_')[1] + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("Facility") == 0)
                        {
                            filePath = GetFileName("Facility", Web_ID);
                            fileName = files.AllKeys[i].Split('_')[1] + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("FeedBk") == 0)
                        {
                            filePath = GetFileName("FeedBk", Web_ID);
                            fileName = files.AllKeys[i].Split('_')[1] + ext;
                        }
                        else if (files.AllKeys[i].IndexOf("Partner") == 0)
                        {
                            filePath = GetFileName("Partner", Web_ID);
                            fileName = files.AllKeys[i].Split('_')[1] + ext;
                        }
                        else
                        {
                            isFileFound = false;
                        }
                        file = files[i];
                        if (isFileFound)
                        {
                            fname = Path.Combine(Server.MapPath(filePath), fileName);
                            file.SaveAs(fname);
                        }
                    }
                }
                #endregion storing new images

                #region copying old image to new location
                string frmPath, toPath, o_ext; int o_index = 0, o_i = 0;
                if (!HDR.IsChangeImg_Hdr_BkGrnd_Img)
                {
                    frmPath = GetDidel(HDR.Hdr_BkGrnd_Img);
                    toPath = GetFileName("HDR_BkGrnd", Web_ID);
                    o_index = frmPath.LastIndexOf(@".");
                    o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                    System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + "hdr_bg1" + o_ext));
                }
                if (!HDR.IsChangeImg_Logo_Path)
                {
                    frmPath = GetDidel(HDR.Logo_Path);
                    toPath = GetFileName("HDR_Logo", Web_ID);
                    o_index = frmPath.LastIndexOf(@".");
                    o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                    System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + "Logo1" + o_ext));
                }
                if (!HDR.IsChangeImg_Product_Hdr_Img_Path)
                {
                    frmPath = GetDidel(HDR.Product_Hdr_Img_Path);
                    toPath = GetFileName("HDR_Product", Web_ID);
                    o_index = frmPath.LastIndexOf(@".");
                    o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                    System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + "product_hdr1" + o_ext));
                }
                if (!HDR.IsChangeImg_FeedBk_BkGrnd_Img)
                {
                    frmPath = GetDidel(HDR.FeedBk_BkGrnd_Img);
                    toPath = GetFileName("HDR_FeedBk", Web_ID);
                    o_index = frmPath.LastIndexOf(@".");
                    o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                    System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + "feedbck_bg1" + o_ext));
                }
                o_i = 0;
                foreach (var item in DET.Team.arr)
                {
                    o_i++;
                    if (!item.IsChangeImg)
                    {
                        frmPath = GetDidel(item.Img);
                        toPath = GetFileName("Team", Web_ID);
                        o_index = frmPath.LastIndexOf(@".");
                        o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                        System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + o_i + o_ext));
                    }
                }
                o_i = 0;
                foreach (var item in DET.Facility.arr)
                {
                    o_i++;
                    if (!item.IsChangeImg)
                    {
                        frmPath = GetDidel(item.Img);
                        toPath = GetFileName("Facility", Web_ID);
                        o_index = frmPath.LastIndexOf(@".");
                        o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                        System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + o_i + o_ext));
                    }
                }
                o_i = 0;
                foreach (var item in DET.FeedBk.arr)
                {
                    o_i++;
                    if (!item.IsChangeImg)
                    {
                        frmPath = GetDidel(item.Img);
                        toPath = GetFileName("FeedBk", Web_ID);
                        o_index = frmPath.LastIndexOf(@".");
                        o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                        System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + o_i + o_ext));
                    }
                }
                o_i = 0;
                foreach (var item in DET.Partner.arr)
                {
                    o_i++;
                    if (!item.IsChangeImg)
                    {
                        frmPath = GetDidel(item.Img);
                        toPath = GetFileName("Partner", Web_ID);
                        o_index = frmPath.LastIndexOf(@".");
                        o_ext = frmPath.Substring(o_index, (frmPath.Length - o_index));
                        System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(frmPath), System.Web.HttpContext.Current.Server.MapPath(toPath + o_i + o_ext));
                    }
                }
                #endregion copying old image to new location

                if(!HDR.Is_Add)
                {
                    string filePath = Server.MapPath("~/Content/Images/WebsiteCreation/" + Prev_Web_ID + "");
                    if (Directory.Exists(filePath))
                    {
                        Directory.Delete(filePath,true);
                    }
                }

                res.data = "";
                res.status = "success";
            }
            catch (Exception ex)
            {
                UpdateWebStatus(Web_ID, 4);
                res.data = ex.Message;
                res.status = "error";

            }
            return new JsonResult()
            {
                Data = res,
                MaxJsonLength = Int32.MaxValue
            };
        }
        
        private static string GetDidel(string img)
        {
            img = "~" + (img.Replace("..", string.Empty));
            return img;
        }
        #endregion Save

        #region Add Edit Record In DB
        private Response AddEditWebsiteData(WebHdr HDR, WebDET DET)
        {
            try
            {
                WebData objWebData = new WebData();
                objWebData.WebHdr = HDR;
                objWebData.WebDET = DET;
                var data = objCommonAPIUtility.GetPostAsync(API.AddEditWebsiteData_URL, objWebData).Result;
                res = JsonConvert.DeserializeObject<Response>(data);
                if (res.status != "success")
                    throw new Exception(res.status);
                res.status = "success";
            }
            catch (Exception ex)
            {
                res.data = ex.Message;
                res.status = "error";
            }
            return res;
        }
        #endregion Add Edit Record In DB

        #region Update Web Status
        public JsonResult UpdateWebStatus(long Web_ID, int Status_ID)
        {
            if (Session["User_ID"] != null && (Convert.ToInt64(Session["Role_ID"]) == 1 || Convert.ToInt64(Session["Role_ID"]) == 2))
            {
                res.status = "success";
                res.data = objCommonAPIUtility.GetAsync(API.UpdateWebStatus_URL + "?User_ID=" + Session["User_ID"] + "&Web_ID=" + Web_ID + "&Status_ID=" + Status_ID).Result;

            }
            else
            {
                res.status = "session expired";
                res.data = "";
            }
            return Json(res);
        }
        #endregion Update Web Status

        #region Get File Path N Name
        private static string GetFileName(string moduleName, long Web_ID)
        {
            string res = "";
            switch (moduleName)
            {
                case "HDR_BkGrnd":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/";//hdr_bg
                    break;
                case "HDR_Logo":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/";//Logo
                    break;
                case "HDR_Product":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/";//product_hdr
                    break;
                case "HDR_FeedBk":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/";//feedbck_bg
                    break;
                case "Team":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Team/";
                    break;
                case "Facility":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Facility/";
                    break;
                case "FeedBk":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/FeedBk/";
                    break;
                case "Partner":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Partner/";
                    break;
                default:
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/issue";
                    break;

            }
            return res;
        }
        #endregion Get File Path N Name

        #region Generate Lead
        public JsonResult GenerateLead(Lead_Fields req)
        {
            var res = new Response();
            try
            {
                string UserMailId = "";
                WebHdr objWebHdr = new WebHdr();
                SendMail_DTO objSendMail_DTO = new SendMail_DTO();

                //Get company details
                {
                    res = JsonConvert.DeserializeObject<Response>(objCommonAPIUtility.GetPostAsync(API.GenerateLead_URL, req).Result);
                    var obj = JsonConvert.DeserializeObject<List<WebHdr>>(res.data);
                    objWebHdr = obj[0];
                }

                //To company
                {
                    objSendMail_DTO.Subject = "Lead Genrated";
                    //objSendMail_DTO.EmailBody = EmailTemplate.T1(objWebHdr, req);
                    objSendMail_DTO.EmailBody = EmailTemplate.T2(objWebHdr, req,true);
                    objSendMail_DTO.EmailTo = objWebHdr.Company_Email;
                    if (objSendMail_DTO.Ntwk_EmailPwd != null)
                    {
                        objSendMail_DTO.Ntwk_EmailId = objWebHdr.Company_Email;
                        objSendMail_DTO.Ntwk_EmailPwd = objWebHdr.Company_Email_PWD;
                        objSendMail_DTO.EmailFromEmailID= objWebHdr.Company_Email;
                        objSendMail_DTO.EmailFromDisplayName = objWebHdr.Company_Name;
                    }
                    else
                    {
                        objSendMail_DTO.Ntwk_EmailId = Constant.Ntwk_EmailId;
                        objSendMail_DTO.Ntwk_EmailPwd = Constant.Ntwk_EmailPwd;
                        objSendMail_DTO.EmailFromEmailID = Constant.Ntwk_EmailId;
                        objSendMail_DTO.EmailFromDisplayName = "sandeepmaurya";
                    }
                    res = ExUtil.SendMail(objSendMail_DTO); 
                }

                //To customer
                {
                    foreach (var item in req.arr)
                    {
                        if (item.Field_Text.IndexOf('@') > 0)
                        {
                            UserMailId = item.Field_Text;
                            break;
                        }
                    }
                    if (UserMailId != "")
                    {
                        objSendMail_DTO.Subject = "Acknowledge from " + objWebHdr.Company_Name;
                        objSendMail_DTO.EmailBody = EmailTemplate.T2(objWebHdr, req,false);
                        objSendMail_DTO.EmailTo = UserMailId;
                        objSendMail_DTO.EmailFromDisplayName = objWebHdr.Company_Name;
                        res = ExUtil.SendMail(objSendMail_DTO);
                    }
                }
            }
            catch (Exception ex)
            {
                res.status = "error";
                res.data = ex.Message;
            }
            return Json(res);
        }
        #endregion Generate Lead
        
    }
}