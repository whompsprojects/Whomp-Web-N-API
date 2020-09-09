using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Website
{
    public struct WebData
    {
        public WebHdr WebHdr { get; set; }
        public WebDET WebDET { get; set; }
        public List<WebDet_Img> WebDetImg { get; set; }
    }

    public struct WebHdr
    {
        public long Web_ID { get; set; }
        public bool Is_Add { get; set; }
        public long User_ID { get; set; }
        public string Timing_Detail { get; set; }
        public string Contact_Detail { get; set; }

        public string Hdr_BkGrnd_Img { get; set; }
        public bool IsChangeImg_Hdr_BkGrnd_Img { get; set; }
        public string Ext_Hdr_BkGrnd_Img { get; set; }

        public string Logo_Path { get; set; }
        public bool IsChangeImg_Logo_Path { get; set; }
        public string Ext_Logo_Path { get; set; }

        public string Slogan_H1 { get; set; }
        public string Slogan_H2 { get; set; }
        public string Fields_Hdr { get; set; }
        public string Emergency_Hdr_Desc { get; set; }
        public string Emergency_Desc { get; set; }
        public string EmergencyBtn_Desc { get; set; }

        public string Product_Hdr_Img_Path { get; set; }
        public bool IsChangeImg_Product_Hdr_Img_Path { get; set; }
        public string Ext_Product_Hdr_Img_Path { get; set; }

        public string Team_Hdr_Desc { get; set; }
        public string Team_Desc { get; set; }
        public string Facilities_Hdr_Desc { get; set; }
        public string Facilities_Desc { get; set; }

        public string FeedBk_BkGrnd_Img { get; set; }
        public bool IsChangeImg_FeedBk_BkGrnd_Img { get; set; }
        public string Ext_FeedBk_BkGrnd_Img { get; set; }

        public string Packages_Hdr_Desc { get; set; }
        public string Packages_Desc { get; set; }
        public string Partner_Hdr_Desc { get; set; }
        public string Partner_Desc { get; set; }
        public string About_Hdr_Desc { get; set; }
        public string About_Desc { get; set; }
        public string Information_Hdr_Desc { get; set; }
        public string Center_Hdr_Desc { get; set; }
        public string Center_Desc { get; set; }
        public string Location_Hdr_Desc { get; set; }
        public string Location_Desc { get; set; }
        public string SocailNtwk_Hdr_Desc { get; set; }
        public string Company_URL { get; set; }
        public string Whomps_URL { get; set; }
        public string Company_Name { get; set; }
        public string Contact_Person { get; set; }
        public string Company_Email { get; set; }
        public string Mob_1 { get; set; }
        public string Tel_1 { get; set; }
        public string Aadhar_Card_NO { get; set; }
        public string Pan_Card_No { get; set; }
        public string Company_Specialist_In { get; set; }
        public string Company_Address { get; set; }
        public int ThemeID { get; set; }
        public string ThemeText { get; set; }
        public string Company_Email_PWD { get; set; }
    }

    public struct WebHdr_Img
    {
        public string Img { get; set; }
        public bool IsChangeImg { get; set; }
    }

    public struct WebDET
    {
        public Menu Menu { get; set; }
        public Slogan Slogan { get; set; }
        public Lead_Fields Lead_Fields { get; set; }
        public Oper_Flow Oper_Flow { get; set; }
        public Products Products { get; set; }
        public Team Team { get; set; }
        public TeamDepartment TeamDepartment { get; set; }
        public Facility Facility { get; set; }
        public FeedBk FeedBk { get; set; }
        public Package Package { get; set; }
        public Pack_Point_Det Pack_Point_Det { get; set; }
        public Partner Partner { get; set; }
        public Information Information { get; set; }
        public Contact Contact { get; set; }
        public SocailNtwk SocailNtwk { get; set; }
    }

    public class WebDet_Img
    {
        public string Img { get; set; }
        public string ModuleName { get; set; }
    }

    public class Menu
    {
        public List<ArrMenu> arr { get; set; }
    }

    public class ArrMenu
    {
        public string Menu_Name { get; set; }
        public string Href { get; set; }
        public long ParentID { get; set; }
    }

    public class Slogan
    {
        public List<ArrSlogan> arr { get; set; }
    }

    public class ArrSlogan
    {
        public string Slogan_Name { get; set; }
        public string Slogan_Desc { get; set; }
    }

    public class Lead_Fields
    {
        public List<ArrLead_Fields> arr { get; set; }
        public long Web_ID { get; set; }         
    }

    public class ArrLead_Fields
    {
        public string Field_Key { get; set; }
        public string Field_Value { get; set; }
        public string Field_Text { get; set; }
    }

    public class Oper_Flow
    {
        public List<ArrOperFlow> arr { get; set; }
    }

    public class ArrOperFlow
    {
        public string Oper_Flow_Name { get; set; }
        public string Oper_Flow_Icon { get; set; }
        public string Oper_Flow_Det { get; set; }
    }

    public class Products
    {
        public List<ArrProducts> arr { get; set; }
    }

    public class ArrProducts
    {
        public string Product_Name { get; set; }
        public string Product_Icon { get; set; }
        public string Product_Det { get; set; }
    }

    public class Team
    {
        public List<ArrTeam> arr { get; set; }
    }

    public class ArrTeam
    {
        public string Team_Name { get; set; }
        public int Team_Department_Code { get; set; }
        public string Team_Desc { get; set; }        
        public string Img { get; set; }
        public bool IsChangeImg { get; set; }
        public string Ext_Img { get; set; }
    }

    public class TeamDepartment
    {
        public List<ArrTeamDepartment> arr { get; set; }
    }

    public class ArrTeamDepartment
    {
        public int Department_Code { get; set; }
        public string Department_Name { get; set; }
    }

    public class Facility
    {
        public List<ArrFacility> arr { get; set; }
    }

    public class ArrFacility
    {
        public string Img { get; set; }
        public string Facility_Title { get; set; }
        public bool IsChangeImg { get; set; }
        public string Ext_Img { get; set; }
    }

    public class FeedBk
    {
        public List<ArrFeedBk> arr { get; set; }
    }

    public class ArrFeedBk
    {
        public string FeedBk_Name { get; set; }
        public string FeedBk_Title { get; set; }
        public int FeedBk_Rate { get; set; }
        public string FeedBk_Desc { get; set; }
        public string Img { get; set; }
        public string FeedBk_Loctn { get; set; }
        public bool IsChangeImg { get; set; }
        public string Ext_Img { get; set; }
    }

    public class Package
    {
        public List<ArrPackage> arr { get; set; }
    }

    public class ArrPackage
    {
        public int PackID { get; set; }
        public string Pack_Name { get; set; }
        public string Pack_Sub_Name { get; set; }
        public string Pack_BTN_HDR_Name { get; set; }
    }

    public class Pack_Point_Det
    {
        public List<ArrPack_Point_Det> arr { get; set; }
    }

    public class ArrPack_Point_Det
    {
        public int PackID { get; set; }
        public string Pack_Point { get; set; }
        public bool Is_Pack_Point_Chk { get; set; }
    }

    public class Partner
    {
        public List<ArrPartner> arr { get; set; }
    }

    public class ArrPartner
    {
        public string Img { get; set; }
        public bool IsChangeImg { get; set; }
        public string Ext_Img { get; set; }
    }

    public class Information
    {
        public List<ArrInformation> arr { get; set; }
    }

    public class ArrInformation
    {
        public string Info_Value { get; set; }
        public string Info_Link { get; set; }
    }

    public class Contact
    {
        public List<ArrContact> arr { get; set; }
    }

    public class ArrContact
    {
        public string Contact_Value { get; set; }
        public string Contact_Icon { get; set; }
    }

    public class SocailNtwk
    {
        public List<ArrSocailNtwk> arr { get; set; }
    }

    public class ArrSocailNtwk
    {
        public string Social_Ntwk_Href { get; set; }
        public string Social_Ntwk_Name { get; set; }
        public string Social_Ntwk_Icon { get; set; }
    }
}
