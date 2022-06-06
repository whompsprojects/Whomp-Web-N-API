using DTO;
using DTO.Website;
using Newtonsoft.Json;
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
                    ViewBag.WebViewData = objCommonAPIUtility.GetAsync(API.GetData_Website_URL + "?Web_ID=" + Web_ID).Result;
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
        public JsonResult AddEditWebsite(WebHdr HDR, WebDET DET)
        {
            try
            {
                if (Cnvt.ToInt64(Session["User_ID"]) == 0)
                {
                    res.data = "session expired";
                    res.status = "error";
                    return Json(res);
                }
                long Web_ID = 0;
                #region Add Edit Record In DB
                WebHdr objOutImgHDR = new WebHdr();
                WebDET objOutImgDET = new WebDET();
                WebHdr_Img objWebHdr_Img = new WebHdr_Img();
                List<WebHdr_Img> lstTeam = new List<WebHdr_Img>();
                List<WebHdr_Img> lstFacility = new List<WebHdr_Img>();
                List<WebHdr_Img> lstFeedBk = new List<WebHdr_Img>();
                List<WebHdr_Img> lstPartner = new List<WebHdr_Img>();
                objOutImgHDR = HDR;
                objOutImgDET = DET;
                objOutImgHDR.Hdr_BkGrnd_Img = null;
                objOutImgHDR.Logo_Path = null;
                objOutImgHDR.Product_Hdr_Img_Path = null;
                objOutImgHDR.FeedBk_BkGrnd_Img = null;
                objOutImgHDR.User_ID = Cnvt.ToInt64(Session["User_ID"]);
                if (objOutImgDET.Team != null)
                {
                    int i = 0;
                    foreach (var item in objOutImgDET.Team.arr)
                    {
                        WebHdr_Img objImg = new WebHdr_Img();
                        objImg.Img = item.Img;
                        objImg.IsChangeImg = item.IsChangeImg;
                        lstTeam.Add(objImg);
                        item.Img = null;
                        i++;
                    }
                }
                if (objOutImgDET.Facility != null)
                {
                    foreach (var item in objOutImgDET.Facility.arr)
                    {
                        WebHdr_Img objImg = new WebHdr_Img();
                        objImg.Img = item.Img;
                        objImg.IsChangeImg = item.IsChangeImg;
                        lstFacility.Add(objImg);
                        item.Img = null;
                    }
                }
                if (objOutImgDET.FeedBk != null)
                {
                    foreach (var item in objOutImgDET.FeedBk.arr)
                    {
                        WebHdr_Img objImg = new WebHdr_Img();
                        objImg.Img = item.Img;
                        objImg.IsChangeImg = item.IsChangeImg;
                        lstFeedBk.Add(objImg);
                        item.Img = null;
                    }
                }
                if (objOutImgDET.Partner != null)
                {
                    foreach (var item in objOutImgDET.Partner.arr)
                    {
                        WebHdr_Img objImg = new WebHdr_Img();
                        objImg.Img = item.Img;
                        objImg.IsChangeImg = item.IsChangeImg;
                        lstPartner.Add(objImg);
                        item.Img = null;
                    }
                }
                res = AddEditWebsiteData(objOutImgHDR, objOutImgDET);
                if (res.status != "success")
                    throw new Exception(res.data);
                var obj = JsonConvert.DeserializeObject<List<Response>>(res.data);
                res = obj[0];
                Web_ID = Cnvt.ToInt64(res.data);
                if (Web_ID == 0)
                    throw new Exception(res.data);
                #endregion Add Edit Record In DB

                #region Store Img

                #region hdr
                List<WebHdr_Img> lstHDR_BkGrnd = new List<WebHdr_Img>();
                WebHdr objImgHdr = new WebHdr();
                objWebHdr_Img.Img = HDR.Hdr_BkGrnd_Img;
                objWebHdr_Img.IsChangeImg = HDR.IsChangeImg_Hdr_BkGrnd_Img;
                lstHDR_BkGrnd.Add(objWebHdr_Img);
                res = StoreUpdateImg(lstHDR_BkGrnd, "HDR_BkGrnd", Web_ID);
                if (res.status == "success")
                    objImgHdr.Hdr_BkGrnd_Img = res.data;
                else
                    throw new Exception(res.data);

                List<WebHdr_Img> lstHDR_Logo = new List<WebHdr_Img>();
                objWebHdr_Img.Img = HDR.Logo_Path;
                objWebHdr_Img.IsChangeImg = HDR.IsChangeImg_Logo_Path;
                lstHDR_Logo.Add(objWebHdr_Img);
                res = StoreUpdateImg(lstHDR_Logo, "HDR_Logo", Web_ID);
                if (res.status == "success")
                    objImgHdr.Logo_Path = res.data;
                else
                    throw new Exception(res.data);

                List<WebHdr_Img> lstHDR_Product = new List<WebHdr_Img>();
                objWebHdr_Img.Img = HDR.Product_Hdr_Img_Path;
                objWebHdr_Img.IsChangeImg = HDR.IsChangeImg_Product_Hdr_Img_Path;
                lstHDR_Product.Add(objWebHdr_Img);
                res = StoreUpdateImg(lstHDR_Product, "HDR_Product", Web_ID);
                if (res.status == "success")
                    objImgHdr.Product_Hdr_Img_Path = res.data;
                else
                    throw new Exception(res.data);

                List<WebHdr_Img> lstHDR_FeedBk = new List<WebHdr_Img>();
                objWebHdr_Img.Img = HDR.FeedBk_BkGrnd_Img;
                objWebHdr_Img.IsChangeImg = HDR.IsChangeImg_FeedBk_BkGrnd_Img;
                lstHDR_FeedBk.Add(objWebHdr_Img);
                res = StoreUpdateImg(lstHDR_FeedBk, "HDR_FeedBk", Web_ID);
                if (res.status == "success")
                    objImgHdr.FeedBk_BkGrnd_Img = res.data;
                else
                    throw new Exception(res.data);
                #endregion hdr

                #region det
                List<WebDet_Img> objLstDetImg = new List<WebDet_Img>();
                res = StoreUpdateImg(lstTeam, "Team", Web_ID);
                if (res.status == "success")
                {
                    var arrReq = res.data.Split(':');
                    foreach (var item in arrReq)
                    {
                        var objArr = new WebDet_Img();
                        objArr.Img = item;
                        objArr.ModuleName = "Team";
                        objLstDetImg.Add(objArr);
                    }
                }
                else
                    throw new Exception(res.data);

                res = StoreUpdateImg(lstFacility, "Facility", Web_ID);
                if (res.status == "success")
                {
                    var arrReq = res.data.Split(':');
                    foreach (var item in arrReq)
                    {
                        var objArr = new WebDet_Img();
                        objArr.Img = item;
                        objArr.ModuleName = "Facility";
                        objLstDetImg.Add(objArr);
                    }
                }
                else
                    throw new Exception(res.data);

                res = StoreUpdateImg(lstFeedBk, "FeedBk", Web_ID);
                if (res.status == "success")
                {
                    var arrReq = res.data.Split(':');
                    foreach (var item in arrReq)
                    {
                        var objArr = new WebDet_Img();
                        objArr.Img = item;
                        objArr.ModuleName = "FeedBk";
                        objLstDetImg.Add(objArr);
                    }
                }
                else
                    throw new Exception(res.data);

                res = StoreUpdateImg(lstPartner, "Partner", Web_ID);
                if (res.status == "success")
                {
                    var arrReq = res.data.Split(':');
                    foreach (var item in arrReq)
                    {
                        var objArr = new WebDet_Img();
                        objArr.Img = item;
                        objArr.ModuleName = "Partner";
                        objLstDetImg.Add(objArr);
                    }
                }
                else
                    throw new Exception(res.data);
                #endregion det

                #endregion Store Img                

                #region Update Img In DB
                if (res.status != "success")
                    throw new Exception(res.data);
                objImgHdr.Web_ID = Web_ID;
                res = UpdateWebsiteImg(objImgHdr, objLstDetImg);
                if (res.status != "success")
                    throw new Exception(res.data);
                #endregion Update Img In DB

                res.data = "";
                res.status = "success";
            }
            catch (Exception ex)
            {
                res.data = ex.Message;
                res.status = "error";
            }
            return new JsonResult()
            {
                Data = res,
                MaxJsonLength = Int32.MaxValue
            };
        }
        #endregion Save

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

        #region Store New Img
        private Response StoreUpdateImg(List<WebHdr_Img> lstWebHdr_Img, string moduleName, long Web_ID)
        {
            try
            {
                string filepath = "", fileName = "", result = "";
                if (lstWebHdr_Img != null)
                {
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Facility"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/FeedBk"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Partner"));
                    Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath("~/Content/Images/WebsiteCreation/" + Web_ID + "/Team"));
                    int cnt = 0; string strImg = "", extension = ".jpg";
                    foreach (var item in lstWebHdr_Img)
                    {
                        cnt++;
                        filepath = GetFileName(moduleName, Web_ID);
                        if (item.Img != null)
                            extension = item.Img.Contains("png") ? ".png" : ".jpg";
                        fileName = cnt + extension;
                        if (item.IsChangeImg)
                        {

                            var imgPngChk = item.Img.Replace("data:image/png;base64,", String.Empty);
                            strImg = imgPngChk.Replace("data:image/jpeg;base64,", String.Empty);
                            byte[] bytes = Convert.FromBase64String(strImg);
                            using (var imageFile = new FileStream(System.Web.HttpContext.Current.Server.MapPath(filepath + fileName), FileMode.Create))
                            {
                                imageFile.Write(bytes, 0, bytes.Length);
                                imageFile.Flush();
                            }
                        }
                        else
                        {
                            if (item.Img != null)
                            {
                                var img = "~" + (item.Img.Replace("..",string.Empty));
                                System.IO.File.Copy(System.Web.HttpContext.Current.Server.MapPath(img), System.Web.HttpContext.Current.Server.MapPath(filepath + fileName));

                            }
                        }
                        if (result == "")
                            result = fileName;
                        else
                            result = result + ":" + fileName;
                    }
                }
                else
                {
                    throw new Exception("Invalid image");
                }
                res.data = result;
                res.status = "success";
            }
            catch (Exception ex)
            {
                res.data = ex.Message;
                res.status = "error";
                throw new Exception(res.data);
            }
            return res;
        }
        #endregion Store New Img

        #region Get File Path N Name
        private static string GetFileName(string moduleName, long Web_ID)
        {
            string res = "";
            switch (moduleName)
            {
                case "HDR_BkGrnd":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/hdr_bg";
                    break;
                case "HDR_Logo":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/Logo";
                    break;
                case "HDR_Product":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/product_hdr";
                    break;
                case "HDR_FeedBk":
                    res = "~/Content/Images/WebsiteCreation/" + Web_ID + "/Hdr/feedbck_bg";
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

        #region Update Img In DB
        private Response UpdateWebsiteImg(WebHdr HDR, List<WebDet_Img> DET)
        {
            try
            {
                WebData objWebData = new WebData();
                objWebData.WebHdr = HDR;
                objWebData.WebDetImg = DET;
                var data = objCommonAPIUtility.GetPostAsync(API.UpdateWebsiteImg_URL, objWebData).Result;
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
        #endregion Update Img In DB

        #region Generate Lead
        public JsonResult GenerateLead(Lead_Fields req)
        {
            var res = new Response();
            try
            {
                WebHdr objWebHdr = new WebHdr();
                res = JsonConvert.DeserializeObject<Response>(objCommonAPIUtility.GetPostAsync(API.GenerateLead_URL, req).Result);
                var obj = JsonConvert.DeserializeObject<List<WebHdr>>(res.data);
                objWebHdr = obj[0];
                SendMail_DTO objSendMail_DTO = new SendMail_DTO();
                objSendMail_DTO.EmailBody = EmailTemplate.T1(objWebHdr, req);
                ExUtil.SendMail(objSendMail_DTO);
                res.status = "success";
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