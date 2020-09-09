using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Filters;

namespace APIs.Models
{
    public class Authentication : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            try
            {
                if (actionContext.Request.Headers.Authorization == null)
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                else
                {
                    string authenticationString = actionContext.Request.Headers.Authorization.Parameter;
                    string authKey = authenticationString.Split(':')[0];
                    string authValue = authenticationString.Split(':')[1];
                    if ((authKey != Constant.authKey) || (authValue != Constant.authValue))
                        actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }

                base.OnAuthorization(actionContext);
            }
            catch (Exception ex)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }
    }
}