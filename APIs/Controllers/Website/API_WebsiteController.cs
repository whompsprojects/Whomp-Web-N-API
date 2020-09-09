using DAL.Account;
using DAL.Website;
using DTO.Website;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIs.Controllers.Website
{
    [RoutePrefix("API/Website")]
    public class WebsiteController : ApiController
    {
        [HttpPost]
        [Route("AddEditWebsite")]
        public IHttpActionResult AddEditWebsite(WebData req)
        {
            return Json(DAL_Website.AddEditWebsite_DAL(req));
        }

        [HttpGet]
        [Route("GetData_Website")]
        public IHttpActionResult GetData_Website(long Web_ID)
        {
            return Json(DAL_Website.GetData_Website_DAL(Web_ID));
        }

        [HttpGet]
        [Route("GetWebsiteDetail")]
        public IHttpActionResult GetWebsiteDetail(long User_ID)
        {
            return Json(DAL_Website.GetWebsiteDetail_DAL(User_ID));
        }

        [HttpGet]
        [Route("UpdateWebStatus")]
        public IHttpActionResult UpdateWebStatus(long User_ID, long Web_ID, int Status_ID)
        {
            return Json(DAL_Website.UpdateWebStatus(User_ID, Web_ID, Status_ID));
        }

        [HttpPost]
        [Route("GenerateLead")]
        public IHttpActionResult GenerateLead(Lead_Fields req)
        {
            return Json(DAL_Website.GenerateLead_DAL(req));
        }

        [HttpGet]
        [Route("Get_WebsiteTheme")]
        public IHttpActionResult Get_WebsiteTheme()
        {
            return Json(DAL_Website.Get_WebsiteTheme_DAL());
        }
    }
}
