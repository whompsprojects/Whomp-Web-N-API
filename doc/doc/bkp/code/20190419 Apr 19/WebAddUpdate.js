/***************************************************************************************************************
FILE NAME   :   WebAddUpdate.js
VERSION     :   1.0
PURPOSE     :   To Add Update Web site
PROJECT     :   Whomp
***************************************************************************************************************/

/*=====================================Start Declaration=======================================*/
var VrWDHdr = {
    Web_ID: 0, Timing_Detail: '', Contact_Detail: '', Logo_Path: '', IsChangeImg_Logo_Path: '', Slogan_H1: '', Slogan_H2: '', Fields_Hdr: '', Emergency_Hdr_Desc: '', Emergency_Desc: '',
    Product_Hdr_Img_Path: '', IsChangeImg_Product_Hdr_Img_Path: '', Team_Hdr_Desc: '', Team_Desc: '', Facilities_Hdr_Desc: '', Facilities_Desc: '', Packages_Hdr_Desc: '', Packages_Desc: '',
    Partner_Hdr_Desc: '', Partner_Desc: '', About_Hdr_Desc: '', Information_Hdr_Desc: '', About_Desc: '', Center_Hdr_Desc: '', Center_Desc: '', Location_Hdr_Desc: '',
    Location_Desc: '',
    Hdr_BkGrnd_Img: '', IsChangeImg_Hdr_BkGrnd_Img: '', FeedBk_BkGrnd_Img: '', IsChangeImg_FeedBk_BkGrnd_Img: '', SocailNtwk_Hdr_Desc: '',
    Company_Name: '', Contact_Person: '', Company_Email: '', Mob_1: '', Tel_1: '', Aadhar_Card_NO: '', Pan_Card_No: '',
    Company_Specialist_In: '', Company_Address: '',
    IsValidData: true, Error_Msg: '', Error_Count: 0, Is_Preview: false, Is_Add: true
};

var VrWDObj = {
    Menu: { arr: [] }, Slogan: { arr: [] }, Lead_Fields: { arr: [] }, Oper_Flow: { arr: [] }, Products: { arr: [] }, Team: { arr: [] },
    Facility: { arr: [] }, FeedBk: { arr: [] }, Package: { arr: [] }, Pack_Point_Det: { arr: [] }, Partner: { arr: [] },
    Information: { arr: [] }, Contact: { arr: [] }, SocailNtwk: { arr: [] }, TeamDepartment: { arr: [] },
};

/*=====================================End of Declaration=======================================*/

/*=====================================Start of Intialization=============================================*/
$(document).ready(function () {
    try {
        $(document).on('click', '[id=btn_Preview]', WDAd.Preview);
        $(document).on('click', '[id=btn_Save]', WDAd.GatherCompany);
        $(document).on('click', '[id=btn_Cancel]', function () { location.reload(); });
        $(document).on('click', '[id=btn_AddUpdate_Company]', WDAd.AssignCompDet);
        $(document).on('input', '[id=txt_Company_Name]', function () { $('#strg_CreateComp').html($(this).val()); });

    }
    catch (ex) {
        console.log("issue in WebAddUpdate=>Document ready :- " + ex.message);
        return false;
    }
});
/*=====================================End Of Intialization=======================================*/

var WDAd = {

    //--==> Preview
    Preview: function () {
        VrWDHdr.Is_Preview = true;
        VrWDHdr.IsValidData = true;
        WDAd.GatherHdrData();
        WDAd.GatherSlg();
        WDAd.GatherOper();
        WDAd.GatherProd();
        WDAd.GatherTeam()
        WDAd.GatherFclty();
        WDAd.GatherFeedBk()
        WDAd.GatherPacks();
        WDAd.GatherPartner()
        WDAd.GatherInfo();
        WDAd.GatherContact()
        WDAd.GatherSocialNtwk();
        WDAd.GatherField();
        if (!VrWDHdr.IsValidData) {
            WMP_Common.PopUpErrorMsg(VrWDHdr.Error_Msg);
            return false;
        }
        $('.cls_EditWeb').hide();
    },

    //--==> Save
    Save: function () {
        try {
            WMP_Common.ShowProcess();
            VrWDHdr.Is_Preview = false;
            VrWDHdr.IsValidData = true;
            WDAd.GatherHdrData();
            WDAd.GatherSlg();
            WDAd.GatherOper();
            WDAd.GatherProd();
            WDAd.GatherTeam();
            WDAd.GatherTeamDep();
            WDAd.GatherFclty();
            WDAd.GatherFeedBk();
            WDAd.GatherPacks();
            WDAd.GatherPartner();
            WDAd.GatherInfo();
            WDAd.GatherContact();
            WDAd.GatherSocialNtwk();
            WDAd.GatherField();
            WDAd.GatherMenu();
            if (!VrWDHdr.IsValidData) {
                WMP_Common.PopUpErrorMsg(VrWDHdr.Error_Msg);
                return false;
            }
            WMP_Common.AjaxRequest(save_url, { HDR: VrWDHdr, DET: VrWDObj }, WDAd.LoadSave);

        }
        catch (ex) {
            console.log("Total " + VrWDHdr.Error_Count + " issue in WebAddUpdate=>Save :- " + ex.message);
            WMP_Common.PopUpErrorMsg(VrWDHdr.Error_Msg);
            return false;
        }
    },

    //--==>LoadSave
    LoadSave: function (data) {
        try {
            if (data.status == 'success') {
                WMP_Common.PopUpErrorMsg('Website created successfully');
                $('#btn_Preview').trigger('click');
            }
            else {
                console.log(data);
                WMP_Common.ChkSessionLogOut(data.data);
            }
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            WMP_Common.HideProcess();
        }
    },

    //--==> Hdr
    GatherHdrData: function () {
        try {
            VrWDHdr.Web_ID = VB_Web_ID;
            VrWDHdr.Timing_Detail = $('#span_Timing_Detail').html(); VrWDHdr.Contact_Detail = $('#span_Contact_Detail').html();
            var src = '';
            src = Convert.objectToString($('#img_Hdr_BkGrnd_Img').attr('src'), '');
            if (src == '') {
                bkgImg = $('.intro-content').css('background-image');
                src = '/' + bkgImg.substring(bkgImg.indexOf('Content'), bkgImg.length - 2);
            }
            VrWDHdr.Hdr_BkGrnd_Img = src;
            VrWDHdr.IsChangeImg_Hdr_BkGrnd_Img = Convert.objectToBool($('#img_Hdr_BkGrnd_Img').attr('is_change'), false);

            VrWDHdr.Logo_Path = Convert.objectToString($('#img_Logo').attr('src'), '');
            VrWDHdr.IsChangeImg_Logo_Path = Convert.objectToBool($('#img_Logo').attr('is_change'), false);

            VrWDHdr.Slogan_H1 = $('#span_Slogan_H1').html(); VrWDHdr.Slogan_H2 = $('#span_Slogan_H2').html(); VrWDHdr.Fields_Hdr = $('#span_Fields_Hdr').html();
            VrWDHdr.Emergency_Hdr_Desc = $('#span_Emergency_Hdr_Desc').html(); VrWDHdr.Emergency_Desc = $('#span_Emergency_Desc').html();
            VrWDHdr.EmergencyBtn_Desc = $('#span_EmergencyBtn_Desc').html();

            VrWDHdr.Product_Hdr_Img_Path = Convert.objectToString($('#img_Product_Hdr').attr('src'), '');
            VrWDHdr.IsChangeImg_Product_Hdr_Img_Path = Convert.objectToBool($('#img_Product_Hdr').attr('is_change'), false);

            VrWDHdr.Team_Hdr_Desc = $('#span_Team_Hdr_Desc').html(); VrWDHdr.Team_Desc = $('#span_Team_Desc').html(); VrWDHdr.Facilities_Hdr_Desc = $('#span_Facilities_Hdr_Desc').html();
            VrWDHdr.Facilities_Desc = $('#span_Facilities_Desc').html(); VrWDHdr.Packages_Hdr_Desc = $('#span_Packages_Hdr_Desc').html(); 
            VrWDHdr.Packages_Desc = $('#span_Packages_Desc').html(); VrWDHdr.Partner_Hdr_Desc = $('#span_Partner_Hdr_Desc').html();
            VrWDHdr.Partner_Desc = $('#span_Partner_Desc').html(); VrWDHdr.SocailNtwk_Hdr_Desc = $('#span_SocailNtwk_Hdr_Desc').html();


            src = Convert.objectToString($('#img_FeedBk_BkGrnd_Img').attr('src'), '');
            if (src == '') {
                bkgImg = $('#testimonial').css('background-image');
                src = '/' + bkgImg.substring(bkgImg.indexOf('Content'), bkgImg.length - 2);
            }
            VrWDHdr.FeedBk_BkGrnd_Img = src;
            VrWDHdr.IsChangeImg_FeedBk_BkGrnd_Img = Convert.objectToBool($('#img_FeedBk_BkGrnd_Img').attr('is_change'), false);

            VrWDHdr.About_Hdr_Desc = $('#span_About_Hdr_Desc').html(); VrWDHdr.About_Desc = $('#span_About_Desc').html();
            VrWDHdr.Information_Hdr_Desc = $('#span_Information_Hdr_Desc').html();

            VrWDHdr.Center_Hdr_Desc = $('#span_Center_Hdr_Desc').html(); VrWDHdr.Center_Desc = $('#span_Center_Desc').html(); VrWDHdr.Location_Hdr_Desc = $('#span_Location_Hdr_Desc').html();
            VrWDHdr.Location_Desc = $('#span_Location_Desc').html();
        }
        catch (ex) {
            VrWDHdr.IsValidData = false;
            console.log("Total " + VrWDHdr.Error_Count + " issue in WebAddUpdate=>GatherHdrData :- " + ex.message);
            WMP_Common.PopUpErrorMsg(VrWDHdr.Error_Msg);
            return false;
        }
    },

    //--==> slg
    GatherSlg: function () {
        VrWDObj.Slogan.arr.length = 0;
        $('[id^=strong_SloganHdr]').each(function (k, v) {
            VrWDObj.Slogan.arr.push({
                Slogan_Name: Convert.objectToString($(this).html(), ''),
                Slogan_Desc: Convert.objectToString($(this).closest('span').find('[id^=span_SloganDet]').html(), ''),
            });
        });
    },

    //--==> oper
    GatherOper: function () {
        VrWDObj.Oper_Flow.arr.length = 0;
        $('[id^=h4_Oper_FlowHdr]').each(function (k, v) {
            VrWDObj.Oper_Flow.arr.push({
                Oper_Flow_Name: Convert.objectToString($(this).html(), ''),
                Oper_Flow_Icon: Convert.objectToString($(this).closest('.box').find('[id^=i_Oper_FlowIcon]').attr('class'), ''),
                Oper_Flow_Det: Convert.objectToString($(this).closest('.box').find('[id^=p_Oper_FlowDet]').html(), '').trim(),
            });
        });
    },

    //--==> prod
    GatherProd: function () {
        VrWDObj.Products.arr.length = 0;
        $('[id^=h5_ProductHDR]').each(function (k, v) {
            VrWDObj.Products.arr.push({
                Product_Name: Convert.objectToString($(this).html(), ''),
                Product_Icon: Convert.objectToString($(this).closest('.row').find('[id^=span_Product_Icon]').attr('class'), ''),
                Product_Det: Convert.objectToString($(this).closest('.row').find('[id^=p_ProductDet]').html(), '').trim(),
            });
        });
    },

    //--==> Team
    GatherTeam: function () {
        VrWDObj.Team.arr.length = 0;
        $('[id^=a_TeamName]').each(function (k, v) {
            VrWDObj.Team.arr.push({
                Team_Name: $(this).html(),
                Team_Department_Code: Convert.objectToString($(this).closest('.rowTeam').find('[id^=div_TeamDepartment]').attr('code'), ''),
                Img: Convert.objectToString($(this).closest('.rowTeam').find('[id^=img_Team]').attr('src'), ''),
                IsChangeImg: Convert.objectToBool($(this).closest('.rowTeam').find('[id^=img_Team]').attr('is_change'), false),
                Team_Desc: Convert.objectToString($(this).closest('.rowTeam').find('[id^=a_TeamName]').html(), ''),
            });
        });
    },

    //--==> TeamDep
    GatherTeamDep: function () {
        VrWDObj.TeamDepartment.arr.length = 0;
        $('[id^=div_Department]').each(function (k, v) {
            VrWDObj.TeamDepartment.arr.push({
                Department_Code: Convert.objectToString($(this).attr('code'), ''),
                Department_Name: Convert.objectToString($(this).attr('val'), ''),
            });
        });
    },

    //--==> Fclty
    GatherFclty: function () {
        VrWDObj.Facility.arr.length = 0;
        $('[id^=img_Facility]').each(function (k, v) {
            VrWDObj.Facility.arr.push({
                Img: Convert.objectToString($(this).closest('.rowFclty').find('[id^=img_Facility]').attr('src'), ''),
                IsChangeImg: Convert.objectToBool($(this).closest('.rowFclty').find('[id^=img_Facility]').attr('is_change'), false),
                Facility_Title: Convert.objectToString($(this).closest('.rowFclty').find('[id^=a_FcltyTitle]').attr('title'), ''),
            });
        });
    },

    //--==> FeedBk
    GatherFeedBk: function () {
        VrWDObj.FeedBk.arr.length = 0;
        $('[id^=a_FeedBk_Name]').each(function (k, v) {
            VrWDObj.FeedBk.arr.push({
                FeedBk_Name: $(this).html(),
                FeedBk_Title: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=a_FeedBk_Title]').html(), ''),
                //FeedBk_Rate = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=span_FeedBk_Rate]').html(), ''); --remaning
                FeedBk_Rate: 4,
                FeedBk_Desc: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Desc]').html(), ''),
                Img: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Img]').attr('src'), ''),
                IsChangeImg: Convert.objectToBool($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Img]').attr('is_change'), false),
                FeedBk_Loctn: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=span_FeedBk_Loctn]').html(), ''),
            });
        });
    },

    //--==> Packs
    GatherPacks: function () {
        var i = 0, Is_Pack_Point_Chk = 0;
        VrWDObj.Package.arr.length = 0;
        VrWDObj.Pack_Point_Det.arr.length = 0;
        $('[id^=h2_Package_Name]').each(function (k, v) {
            i++;
            VrWDObj.Package.arr.push({
                PackID: i,
                Pack_Name: $(this).html(),
                Pack_Price: Convert.objectToString($(this).closest('.rowPack').find('[id^=strong_Price]').html(), ''),
                Pack_Price_Per: Convert.objectToString($(this).closest('.rowPack').find('[id^=strong_Package_Price_Per]').html(), ''),
                Pack_BTN_HDR_Name: Convert.objectToString($(this).closest('.rowPack').find('[id^=a_Pack_Btn_HDR_Name]').html(), ''),
            });
            $(this).closest('.rowPack').find('[id^=li_Pack_Point]').each(function (k, v) {
                Is_Pack_Point_Chk = ($(this).find('del').length > 0 ? true : false);
                VrWDObj.Pack_Point_Det.arr.push({
                    PackID: i,
                    Pack_Point: Convert.objectToString($(this).find('.cls_strong_Pack_Point').html(), ''),
                    Is_Pack_Point_Chk: Is_Pack_Point_Chk,
                });
            });
        });
    },

    //--==> Partner
    GatherPartner: function () {
        VrWDObj.Partner.arr.length = 0;
        $('[id^=img_Partner]').each(function (k, v) {
            VrWDObj.Partner.arr.push({
                Img: Convert.objectToString($(this).attr('src'), ''),
                IsChangeImg: Convert.objectToBool($(this).attr('is_change'), false),
            });
        });
    },

    //--==> Info
    GatherInfo: function () {
        VrWDObj.Information.arr.length = 0;
        $('[id^=h4_Oper_FlowHdr]').each(function (k, v) {
            VrWDObj.Information.arr.push({
                Info_Value: Convert.objectToString($(this).html(), ''),
                Info_Link: ''
            });
        });
    },

    //--==> Contact
    GatherContact: function () {
        VrWDObj.Contact.arr.length = 0;
        $('[id^=strong_ContactText]').each(function (k, v) {
            VrWDObj.Contact.arr.push({
                Contact_Value: $(this).html(),
                Contact_Icon: $(this).closest('li').find('[id^=i_ContactIcon]').attr('class'),
            });
        });
    },

    //--==> SocialNtwk
    GatherSocialNtwk: function () {
        VrWDObj.SocailNtwk.arr.length = 0;
        $('[id^=li_SocailNtwkName]').each(function (k, v) {
            VrWDObj.SocailNtwk.arr.push({
                Social_Ntwk_Name: $(this).attr('class'),
                Social_Ntwk_Icon: $(this).find('[id^=i_SocailNtwkIcon]').attr('class'),
            });
        });
    },

    //--==> Field
    GatherField: function () {
        VrWDObj.Lead_Fields.arr.length = 0;
        $('[id^=lbl_FieldKey]').each(function (k, v) {
            VrWDObj.Lead_Fields.arr.push({
                Field_Key: k + 1,
                Field_Value: Convert.objectToString($(this).html(), ''),
            });
        });
    },

    //--==> Menu--p
    GatherMenu: function () {
        VrWDObj.Menu.arr.length = 0;
        $('[id=ul_Menu]').find('li').each(function (k, v) {
            if (Convert.objectToString($(this).attr('isUsed'), '') == 1) {
                VrWDObj.Menu.arr.push({
                    Menu_Name: Convert.objectToString($(this).find('a').html(), ''),
                    Href: Convert.objectToString($(this).find('a').attr('href'), ''),
                    ParentID: Convert.objectToString($(this).attr('subLi'), ''),
                });
            }
        });
    },

    //--==>Company Details
    GatherCompany: function () {
        $('#txt_Company_Name,#txt_Contact_Person,#txt_Company_Email,#txt_Mob_1,#txt_Tel_1,#txt_Aadhar_Card_NO,#txt_Pan_Card_No,#txt_Company_Specialist_In,#txt_Company_Address').val('');
        $('#div_Comp_Mdl').modal('show');
        Company.setComp();
    },

    //--==>Assign Company Detail
    AssignCompDet: function () {
        var arrData = [];
        arrData.push('txt_Company_Name');
        arrData.push('txt_Contact_Person');
        arrData.push('txt_Company_Email');
        arrData.push('txt_Mob_1');
        arrData.push('txt_Aadhar_Card_NO');
        arrData.push('txt_Pan_Card_No');
        arrData.push('txt_Company_Specialist_In');
        arrData.push('txt_Company_Address');
        if (!WMP_Common.ValidateTxt(arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        VrWDHdr.Company_Name = $('#txt_Company_Name').val();
        VrWDHdr.Contact_Person = $('#txt_Contact_Person').val();
        VrWDHdr.Company_Email = $('#txt_Company_Email').val();

        VrWDHdr.Mob_1 = $('#txt_Mob_1').val();
        VrWDHdr.Tel_1 = $('#txt_Tel_1').val();
        VrWDHdr.Aadhar_Card_NO = $('#txt_Aadhar_Card_NO').val();
        VrWDHdr.Pan_Card_No = $('#txt_Pan_Card_No').val();

        VrWDHdr.Company_Specialist_In = $('#txt_Company_Specialist_In').val();
        VrWDHdr.Company_Address = $('#txt_Company_Address').val();
        $('#div_Comp_Mdl').modal('hide');
        WDAd.Save();
    }
};



