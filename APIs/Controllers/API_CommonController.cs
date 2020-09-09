using DAL.Common;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIs.Controllers
{
    [RoutePrefix("API/Common")]
    public class API_CommonController : ApiController
    {

        #region Error Logger
        [HttpPost]
        [Route("ErrorLogger")]
        public IHttpActionResult ErrorLogger(ErrorLoger_DTO req)
        {
            return Json(Common_DAL.ErrorLogger(req));
        }
        #endregion Error Logger
    }
}
