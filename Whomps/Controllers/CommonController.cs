using DTO;
using System;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace Whomps.Controllers
{
    public class CommonController : Controller
    {
        public static void Error_Logger(Exception ex)
        {
            CommonAPIUtility objCommonAPIUtility = new CommonAPIUtility();
            ErrorLoger_DTO req = new ErrorLoger_DTO();
            req.Message = ex.Message;
            req.Source = ex.Source;
            req.TargetSite = ex.TargetSite.ToString();
            req.StackTrace = ex.StackTrace;
            req.Created_By = SessionUtil.val("User_ID");
            try
            {
                var data = objCommonAPIUtility.GetPostAsync(API.error, req).Result;
            }
            catch (Exception exs)
            {
                return;
            }
            if (Constant.isFileError)
            {
                string ErrorBody = "", ErrorTime = "";
                ErrorBody = " ====> " + DateTime.Now.ToShortDateString().ToString() + " " + DateTime.Now.ToLongTimeString().ToString() + " <==== ";
                ErrorBody += "\nException Message:" + ex.Message + "\nSource:" + ex.Source + "\nTarget site:" + ex.TargetSite.ToString() + "\nStack Trace:" + ex.StackTrace;
                ErrorTime = DateTime.Now.Year.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Day.ToString();
                StreamWriter sw = new StreamWriter(System.Web.HttpContext.Current.Server.MapPath(Constant.ErrorFilePath) + ErrorTime, true);
                sw.WriteLine(ErrorBody);
                sw.Flush();
                sw.Close();
            }
        }

        public ActionResult Error(string exMsg = null)
        {
            //return View("~/Views/Shared/Error.cshtml");
            ViewBag.exMsg = exMsg;
            return View();
        }
    }
}