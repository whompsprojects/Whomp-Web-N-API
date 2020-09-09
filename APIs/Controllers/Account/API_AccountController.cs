using APIs.Models;
using DAL.Account;
using DTO.Account;
using System;
using System.Linq;
using System.Web.Http;

namespace APIs.Controllers
{
    
    [RoutePrefix("API/Account")]
    public class AccountController : ApiController
    {
        [HttpPost]
        [Route("AuthenticateUser")]
        public IHttpActionResult AuthenticateUser(Account_DTO req)
        {
            return Json(DAL_Account.AuthenticateUser(req));
        }

        [HttpPost]
        [Route("GetMenu")]
        public IHttpActionResult GetMenu(GetMenu_DTO req)
        {
            return Json(DAL_Account.GetMenu(req.User_ID));
        }

        [HttpPost]
        [Route("GetRole")]
        public IHttpActionResult GetRole()
        {
            return Json(DAL_Account.GetRole());
        }

        [HttpGet]
        [ActionName("GetRoleEdit")]
        [Route("GetRoleEdit")]
        public IHttpActionResult GetRoleEdit(long roleID)
        {
            return Json(DAL_Account.GetRoleEdit(roleID));
        }

        [HttpPost]
        [Route("EditRole")]
        public IHttpActionResult EditRole(EditRole_DTO req)
        {
            return Json(DAL_Account.EditRole(req));
        }

        [HttpGet]
        [Route("GetUser")]
        public IHttpActionResult GetUser(long User_ID, long Role_ID)
        {
            return Json(DAL_Account.Get_UserMaster(User_ID, Role_ID));
        }

        [HttpPost]
        [Route("AddUpdateUser")]
        public IHttpActionResult AddUpdateUser(AddUpdateUser_DTO req)
        {
            return Json(DAL_Account.AddUpdateUser(req));
        }

        [HttpGet]
        [Route("DeleteUser")]
        public IHttpActionResult DeleteUser(long UserId)
        {
            return Json(DAL_Account.DeleteUser(UserId));
        }
    }
}
