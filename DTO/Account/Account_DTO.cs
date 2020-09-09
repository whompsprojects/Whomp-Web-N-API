using System.ComponentModel.DataAnnotations;

namespace DTO.Account
{
    public class Account_DTO
    {
        [Required]
        [EmailAddress]
        [Display(Name = "user_name")]
        public string email_id { get; set; }

        [Required]
        public string pwd { get; set; }

    }

    public class LoginRes_DTO
    {
        public long User_ID { get; set; }
        public long Role_ID { get; set; }        

        public string First_Name { get; set; }
        public string PWD { get; set; }

    }

    public class GetMenu_DTO
    {
        public long User_ID { get; set; }
    }

    public class GetRoleEdit_DTO
    {
        public long roleID { get; set; }
    }

    public class EditRole_DTO
    {
        public string OperationType { get; set; }
        public long RoleID { get; set; }
        public string MenuID { get; set; }
        public long UserID { get; set; }
    }

    public class AddUpdateUser_DTO
    {
        public string OperType { get; set; }
        public long User_ID { get; set; }
        public string UserName { get; set; }
        public string PWD { get; set; }
        public string First_Name { get; set; }
        public string Middle_Name { get; set; }
        public string Last_Name { get; set; }
        public string Address { get; set; }
        public string Alt_Address { get; set; }
        public string Img { get; set; }
        public bool IsChangeImg { get; set; }
        public string Email_ID { get; set; }
        public string Tel_No { get; set; }
        public string Mob_No { get; set; }
        public bool Status { get; set; }
        public long CompanyID { get; set; }
        public string Extension { get; set; }
        public long createdBy { get; set; }
        public long RoleID { get; set; }
    }
}
