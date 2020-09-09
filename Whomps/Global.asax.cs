using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Whomps.Controllers;

namespace Whomps
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        void Application_Error(object sender, EventArgs e)
        {

            var exception = Server.GetLastError();
            CommonController.Error_Logger(exception);
            Response.Clear();
            Server.ClearError();
            var routeData = new RouteData();
            routeData.Values["controller"] = "Common";
            routeData.Values["action"] = "Error";
            routeData.Values.Add("exMsg", exception.Message);
            IController controller = new CommonController();
            var rc = new RequestContext(new HttpContextWrapper(Context), routeData);
            controller.Execute(rc);
        }
    }
}
