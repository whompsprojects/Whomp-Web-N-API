/***************************************************************************************************************
FILE NAME   :   WebAddUpdate.js
VERSION     :   1.0
PURPOSE     :   To Add Update Web site
PROJECT     :   Whomp
***************************************************************************************************************/

/*=====================================Start Declaration=======================================*/
var WebHdr = {
    Web_ID: 0, Timing_Detail: '', Contact_Detail: '', Logo_Path: '', IsChangeImg_Logo_Path: '', Ext_Logo_Path: '', Slogan_H1: '', Slogan_H2: '', Fields_Hdr: '', Emergency_Hdr_Desc: '', Emergency_Desc: '',
    Product_Hdr_Img_Path: '', IsChangeImg_Product_Hdr_Img_Path: '', Ext_Product_Hdr_Img_Path: '', Team_Hdr_Desc: '', Team_Desc: '', Facilities_Hdr_Desc: '', Facilities_Desc: '', Packages_Hdr_Desc: '', Packages_Desc: '',
    Partner_Hdr_Desc: '', Partner_Desc: '', About_Hdr_Desc: '', Information_Hdr_Desc: '', About_Desc: '', Center_Hdr_Desc: '', Center_Desc: '', Location_Hdr_Desc: '',
    Location_Desc: '',
    Hdr_BkGrnd_Img: '', IsChangeImg_Hdr_BkGrnd_Img: '', Ext_Hdr_BkGrnd_Img: '', FeedBk_BkGrnd_Img: '', IsChangeImg_FeedBk_BkGrnd_Img: '', Ext_FeedBk_BkGrnd_Img: '', SocailNtwk_Hdr_Desc: '',
    Company_Name: '', Contact_Person: '', Company_Email: '', Mob_1: '', Tel_1: '', Aadhar_Card_NO: '', Pan_Card_No: '',
    Company_Specialist_In: '', Company_Address: '',
    IsValidData: true, Error_Msg: '', Error_Count: 0, Is_Preview: false, Is_Add: true
};

var WebDET = {
    Menu: { arr: [] }, Slogan: { arr: [] }, Lead_Fields: { arr: [] }, Oper_Flow: { arr: [] }, Products: { arr: [] }, Team: { arr: [] },
    Facility: { arr: [] }, FeedBk: { arr: [] }, Package: { arr: [] }, Pack_Point_Det: { arr: [] }, Partner: { arr: [] },
    Information: { arr: [] }, Contact: { arr: [] }, SocailNtwk: { arr: [] }, TeamDepartment: { arr: [] },
};

var DATA = new FormData(), file = null;

/*=====================================End of Declaration=======================================*/

/*=====================================Start of Intialization=============================================*/
$(document).ready(function () {
    try {
        $(document).on('click', '[id=btn_Preview]', WDAd.Preview);
        $(document).on('click', '[id=btn_Save]', WDAd.GatherCompany);
        $(document).on('click', '[id=btn_Cancel]', function () { location.reload(); });
        $(document).on('click', '[id=btn_AddUpdate_Company]', WDAd.AssignCompDet);
        $(document).on('input', '[id=txt_Company_Name]', function () { $('#strg_CreateComp').html($(this).val()); });
        $(document).on('blur', '[id=txt_Company_Email]', function () { WDAd.ValidateEmail(this) });

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
        WebHdr.Is_Preview = true;
        WebHdr.IsValidData = true;
        WDAd.GatherHdrData();
        WDAd.GatherSlg();
        WDAd.GatherOper();
        WDAd.GatherProd();
        WDAd.GatherTeam();
        WDAd.GatherFclty();
        WDAd.GatherFeedBk();
        WDAd.GatherPacks();
        WDAd.GatherPartner();
        WDAd.GatherInfo();
        WDAd.GatherContact();
        WDAd.GatherSocialNtwk();
        WDAd.GatherField();
        if (!WebHdr.IsValidData) {
            WMP_Common.PopUpErrorMsg(WebHdr.Error_Msg);
            return false;
        }
        $('.cls_EditWeb').hide();
    },

    //--==> Save
    Save: function () {
        try {
            WMP_Common.ShowProcess();
            WebHdr.Is_Preview = false;
            WebHdr.IsValidData = true;
            DATA = new FormData();
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
            if (!WebHdr.IsValidData) {
                WMP_Common.PopUpErrorMsg(WebHdr.Error_Msg);
                return false;
            }
            //WMP_Common.AjaxRequest(save_url, { HDR: WebHdr, DET: WebDET }, WDAd.LoadSave);
            DATA.append("str_HDR", JSON.stringify({ WebHdr }));
            DATA.append("str_DET", JSON.stringify({ WebDET }));
            $.ajax({
                url: save_url,
                type: "POST",
                dataType: "json",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: DATA,
                success: WDAd.LoadSave,
                error: function (err, a, b) {
                    debugger;
                    WMP_Common.PopUpErrorMsg(err);
                    WMP_Common.HideProcess();
                }
            });
        }
        catch (ex) {
            console.log("Total " + WebHdr.Error_Count + " issue in WebAddUpdate=>Save :- " + ex.message);
            WMP_Common.PopUpErrorMsg(WebHdr.Error_Msg);
            WMP_Common.HideProcess();
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
            WebHdr.Web_ID = VB_Web_ID;
            WebHdr.Is_Add = Convert.objectToBool(WebIsAdd);
            WebHdr.Timing_Detail = $('#span_Timing_Detail').html(); WebHdr.Contact_Detail = $('#span_Contact_Detail').html();
            var src = '', ext = '';
            src = Convert.objectToString($('#img_Hdr_BkGrnd_Img').attr('src'), '');
            if (src == '') {
                bkgImg = $('.intro-content').css('background-image');
                src = '../' + bkgImg.substring(bkgImg.indexOf('Content'), bkgImg.length - 2);
                WebHdr.Hdr_BkGrnd_Img = src;
                WebHdr.Ext_Hdr_BkGrnd_Img = "1" + bkgImg.substring(bkgImg.lastIndexOf(".")).slice(0, -2);
            }
            else {
                WebHdr.Hdr_BkGrnd_Img = '';
                file = $("#file_Hdr_BkGrnd_Img").get(0).files[0];
                DATA.append('HDR_BkGrnd', file);
                WebHdr.Ext_Hdr_BkGrnd_Img = "1" + file.name.substring(file.name.lastIndexOf('.'));
            }
            WebHdr.IsChangeImg_Hdr_BkGrnd_Img = Convert.objectToBool($('#img_Hdr_BkGrnd_Img').attr('is_change'), false);

            WebHdr.IsChangeImg_Logo_Path = Convert.objectToBool($('#img_Logo').attr('is_change'), false);
            if (WebHdr.IsChangeImg_Logo_Path) {
                file = $("#file_UploadLogo").get(0).files[0];
                DATA.append('HDR_Logo', file);
                ext = file.name.substring(file.name.lastIndexOf('.'));
            }
            else {
                WebHdr.Logo_Path = Convert.objectToString($('#img_Logo').attr('src'), '');
                ext = WebHdr.Logo_Path.substring(WebHdr.Logo_Path.lastIndexOf("."));
            }
            WebHdr.Ext_Logo_Path = "1" + ext;

            WebHdr.Slogan_H1 = $('#span_Slogan_H1').html(); WebHdr.Slogan_H2 = $('#span_Slogan_H2').html(); WebHdr.Fields_Hdr = $('#span_Fields_Hdr').html();
            WebHdr.Emergency_Hdr_Desc = $('#span_Emergency_Hdr_Desc').html(); WebHdr.Emergency_Desc = $('#span_Emergency_Desc').html();
            WebHdr.EmergencyBtn_Desc = $('#span_EmergencyBtn_Desc').html();

            WebHdr.IsChangeImg_Product_Hdr_Img_Path = Convert.objectToBool($('#img_Product_Hdr').attr('is_change'), false);
            if (WebHdr.IsChangeImg_Product_Hdr_Img_Path) {
                file = $("#file_UploadProductHdrImg").get(0).files[0];
                DATA.append('HDR_Product', file);
                ext = file.name.substring(file.name.lastIndexOf('.'));
            }
            else {
                WebHdr.Product_Hdr_Img_Path = Convert.objectToString($('#img_Product_Hdr').attr('src'), '');
                ext = WebHdr.Product_Hdr_Img_Path.substring(WebHdr.Product_Hdr_Img_Path.lastIndexOf("."));
            }
            WebHdr.Ext_Product_Hdr_Img_Path = "1" + ext;

            WebHdr.Team_Hdr_Desc = $('#span_Team_Hdr_Desc').html(); WebHdr.Team_Desc = $('#span_Team_Desc').html(); WebHdr.Facilities_Hdr_Desc = $('#span_Facilities_Hdr_Desc').html();
            WebHdr.Facilities_Desc = $('#span_Facilities_Desc').html(); WebHdr.Packages_Hdr_Desc = $('#span_Packages_Hdr_Desc').html();
            WebHdr.Packages_Desc = $('#span_Packages_Desc').html(); WebHdr.Partner_Hdr_Desc = $('#span_Partner_Hdr_Desc').html();
            WebHdr.Partner_Desc = $('#span_Partner_Desc').html(); WebHdr.SocailNtwk_Hdr_Desc = $('#span_SocailNtwk_Hdr_Desc').html();


            src = Convert.objectToString($('#img_FeedBk_BkGrnd_Img').attr('src'), '');
            if (src == '') {
                bkgImg = $('#testimonial').css('background-image');
                src = '../' + bkgImg.substring(bkgImg.indexOf('Content'), bkgImg.length - 2);
                WebHdr.FeedBk_BkGrnd_Img = src;
                WebHdr.Ext_FeedBk_BkGrnd_Img = "1" + bkgImg.substring(bkgImg.lastIndexOf(".")).slice(0, -2);
            }
            else {
                WebHdr.FeedBk_BkGrnd_Img = '';
                file = $("#hdr_file_FeedBk_BkGrnd_Img").get(0).files[0];
                DATA.append('HDR_FeedBk', file);
                WebHdr.Ext_FeedBk_BkGrnd_Img = "1" + file.name.substring(file.name.lastIndexOf('.'));
            }
            WebHdr.IsChangeImg_FeedBk_BkGrnd_Img = Convert.objectToBool($('#img_FeedBk_BkGrnd_Img').attr('is_change'), false);

            WebHdr.About_Hdr_Desc = $('#span_About_Hdr_Desc').html(); WebHdr.About_Desc = $('#span_About_Desc').html();
            WebHdr.Information_Hdr_Desc = $('#span_Information_Hdr_Desc').html();

            WebHdr.Center_Hdr_Desc = $('#span_Center_Hdr_Desc').html(); WebHdr.Center_Desc = $('#span_Center_Desc').html(); WebHdr.Location_Hdr_Desc = $('#span_Location_Hdr_Desc').html();
            WebHdr.Location_Desc = $('#span_Location_Desc').html();
        }
        catch (ex) {
            WebHdr.IsValidData = false;
            console.log("Total " + WebHdr.Error_Count + " issue in WebAddUpdate=>GatherHdrData :- " + ex.message);
            WMP_Common.PopUpErrorMsg(WebHdr.Error_Msg);
            return false;
        }
    },

    //--==> slg
    GatherSlg: function () {
        WebDET.Slogan.arr.length = 0;
        $('[id^=strong_SloganHdr]').each(function (k, v) {
            WebDET.Slogan.arr.push({
                Slogan_Name: Convert.objectToString($(this).html(), ''),
                Slogan_Desc: Convert.objectToString($(this).closest('span').find('[id^=span_SloganDet]').html(), ''),
            });
        });
    },

    //--==> oper
    GatherOper: function () {
        WebDET.Oper_Flow.arr.length = 0;
        $('[id^=h4_Oper_FlowHdr]').each(function (k, v) {
            WebDET.Oper_Flow.arr.push({
                Oper_Flow_Name: Convert.objectToString($(this).html(), ''),
                Oper_Flow_Icon: Convert.objectToString($(this).closest('.box').find('[id^=i_Oper_FlowIcon]').attr('class'), ''),
                Oper_Flow_Det: Convert.objectToString($(this).closest('.box').find('[id^=p_Oper_FlowDet]').html(), '').trim(),
            });
        });
    },

    //--==> prod
    GatherProd: function () {
        WebDET.Products.arr.length = 0;
        $('[id^=h5_ProductHDR]').each(function (k, v) {
            WebDET.Products.arr.push({
                Product_Name: Convert.objectToString($(this).html(), ''),
                Product_Icon: Convert.objectToString($(this).closest('.row').find('[id^=span_Product_Icon]').attr('class'), ''),
                Product_Det: Convert.objectToString($(this).closest('.row').find('[id^=p_ProductDet]').html(), '').trim(),
            });
        });
    },

    //--==> Team
    GatherTeam: function () {
        WebDET.Team.arr.length = 0;
        var ext = '';
        $('[id^=a_TeamName]').each(function (k, v) {
            IsChangeImg = Convert.objectToBool($(this).closest('.rowTeam').find('[id^=img_Team]').attr('is_change'), false);
            if (IsChangeImg) {
                img = '';
                if (!Convert.IsObjectNullOrEmpty($('#file_Team_' + (k + 1) + ''))) {
                    file = $('#file_Team_' + (k + 1) + '').get(0).files[0];
                    if (typeof (file) === 'undefined')
                        return false;
                    DATA.append('Team_' + (k + 1) + '', file);
                    ext = file.name.substring(file.name.lastIndexOf('.'));
                }
            }
            else {
                img = Convert.objectToString($(this).closest('.rowTeam').find('[id^=img_Team]').attr('src'), '');
                ext = img.substring(img.lastIndexOf("."));
            }
            WebDET.Team.arr.push({
                Team_Name: $(this).html(),
                Team_Department_Code: Convert.objectToString($(this).closest('.rowTeam').find('[id^=div_TeamDepartment]').attr('code'), ''),
                Img: img,
                IsChangeImg: IsChangeImg,
                Team_Desc: Convert.objectToString($(this).closest('.rowTeam').find('[id^=hdn_TeamDesc]').val(), ''),
                Ext_Img: (k + 1) + ext,
            });
        });
    },

    //--==> TeamDep
    GatherTeamDep: function () {
        WebDET.TeamDepartment.arr.length = 0;
        $('[id^=div_Department]').each(function (k, v) {
            WebDET.TeamDepartment.arr.push({
                Department_Code: Convert.objectToString($(this).attr('code'), ''),
                Department_Name: Convert.objectToString($(this).attr('val'), ''),
            });
        });
    },

    //--==> Fclty
    GatherFclty: function () {
        WebDET.Facility.arr.length = 0;
        var ext = '';
        $('[id^=img_Facility]').each(function (k, v) {
            IsChangeImg = Convert.objectToBool($(this).closest('.rowFclty').find('[id^=img_Facility]').attr('is_change'), false);
            if (IsChangeImg) {
                img = '';
                if (!Convert.IsObjectNullOrEmpty($('#file_PopUpFacility_' + (k + 1) + ''))) {
                    file = $('#file_PopUpFacility_' + (k + 1) + '').get(0).files[0];
                    DATA.append('Facility_' + (k + 1) + '', file);
                    ext = file.name.substring(file.name.lastIndexOf('.'));
                }
            }
            else {
                img = Convert.objectToString($(this).closest('.rowFclty').find('[id^=img_Facility]').attr('src'), '');
                ext = img.substring(img.lastIndexOf("."));
            }
            WebDET.Facility.arr.push({
                Img: img,
                IsChangeImg: IsChangeImg,
                Facility_Title: Convert.objectToString($(this).closest('.rowFclty').find('[id^=a_FcltyTitle]').attr('title'), ''),
                Ext_Img: (k + 1) + ext,
            });
        });
    },

    //--==> FeedBk
    GatherFeedBk: function () {
        WebDET.FeedBk.arr.length = 0;
        var ext = '';
        $('[id^=a_FeedBk_Name]').each(function (k, v) {
            IsChangeImg = Convert.objectToBool($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Img]').attr('is_change'), false);
            if (IsChangeImg) {
                img = '';
                if (!Convert.IsObjectNullOrEmpty($('#file_FeedBk_' + (k + 1) + ''))) {
                    file = $('#file_FeedBk_' + (k + 1) + '').get(0).files[0];
                    DATA.append('FeedBk_' + (k + 1) + '', file);
                    ext = file.name.substring(file.name.lastIndexOf('.'));
                }
            }
            else {
                img = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Img]').attr('src'), '');
                ext = img.substring(img.lastIndexOf("."));
            }
            WebDET.FeedBk.arr.push({
                FeedBk_Name: $(this).html(),
                FeedBk_Title: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=a_FeedBk_Title]').html(), ''),
                FeedBk_Rate: Convert.objectToInt($(this).closest('.rowFeedbk').find('.glyphicon-star').length, 0),
                FeedBk_Desc: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Desc]').html(), ''),
                Img: img,
                IsChangeImg: IsChangeImg,
                FeedBk_Loctn: Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=span_FeedBk_Loctn]').html(), ''),
                Ext_Img: (k + 1) + ext,
            });
        });
    },

    //--==> Packs
    GatherPacks: function () {
        var i = 0, Is_Pack_Point_Chk = 0;
        WebDET.Package.arr.length = 0;
        WebDET.Pack_Point_Det.arr.length = 0;
        $('[id^=h2_Package_Name]').each(function (k, v) {
            i++;
            WebDET.Package.arr.push({
                PackID: i,
                Pack_Name: $(this).html(),
                Pack_Sub_Name: Convert.objectToString($(this).closest('.rowPack').find('[id^=h3_Pack_Sub_Name]').html(), ''),
                Pack_BTN_HDR_Name: Convert.objectToString($(this).closest('.rowPack').find('[id^=a_Pack_Btn_HDR_Name]').html(), ''),
            });
            $(this).closest('.rowPack').find('[id^=li_Pack_Point]').each(function (k, v) {
                Is_Pack_Point_Chk = ($(this).find('del').length > 0 ? true : false);
                WebDET.Pack_Point_Det.arr.push({
                    PackID: i,
                    Pack_Point: Convert.objectToString($(this).find('.cls_strong_Pack_Point').html(), ''),
                    Is_Pack_Point_Chk: Is_Pack_Point_Chk,
                });
            });
        });
    },

    //--==> Partner
    GatherPartner: function () {
        var ext = '';
        WebDET.Partner.arr.length = 0;
        $('[id^=img_Partner]').each(function (k, v) {
            IsChangeImg = Convert.objectToBool($(this).attr('is_change'), false);
            if (IsChangeImg) {
                img = '';
                if (!Convert.IsObjectNullOrEmpty($('#file_Partner_' + (k + 1) + ''))) {
                    file = $('#file_Partner_' + (k + 1) + '').get(0).files[0];
                    DATA.append('Partner_' + (k + 1) + '', file);
                    ext = file.name.substring(file.name.lastIndexOf('.'));
                }
            }
            else {
                img = Convert.objectToString($(this).attr('src'), '');
                ext = img.substring(img.lastIndexOf("."));
            }
            WebDET.Partner.arr.push({
                Img: img,
                IsChangeImg: IsChangeImg,
                Ext_Img: (k + 1) + ext,
            });
        });
    },

    //--==> Info
    GatherInfo: function () {
        WebDET.Information.arr.length = 0;
        $('[id^=h4_Oper_FlowHdr]').each(function (k, v) {
            WebDET.Information.arr.push({
                Info_Value: Convert.objectToString($(this).html(), ''),
                Info_Link: ''
            });
        });
    },

    //--==> Contact
    GatherContact: function () {
        WebDET.Contact.arr.length = 0;
        $('[id^=strong_ContactText]').each(function (k, v) {
            WebDET.Contact.arr.push({
                Contact_Value: $(this).html(),
                Contact_Icon: Convert.objectToString($(this).closest('li').find('[id^=i_ContactIcon]').attr('class'), ''),
            });
        });
    },

    //--==> SocialNtwk
    GatherSocialNtwk: function () {
        WebDET.SocailNtwk.arr.length = 0;
        $('[id^=li_SocailNtwkName]').each(function (k, v) {
            WebDET.SocailNtwk.arr.push({
                Social_Ntwk_Href: $(this).find('[id^=a_SocailNtwkHref]').attr('href'),
                Social_Ntwk_Name: $(this).attr('class'),
                Social_Ntwk_Icon: $(this).find('[id^=i_SocailNtwkIcon]').attr('class'),
            });
        });
    },

    //--==> Field
    GatherField: function () {
        WebDET.Lead_Fields.arr.length = 0;
        $('[id^=lbl_FieldKey]').each(function (k, v) {
            WebDET.Lead_Fields.arr.push({
                Field_Key: k + 1,
                Field_Value: Convert.objectToString($(this).html(), ''),
            });
        });
    },

    //--==> Menu--p
    GatherMenu: function () {
        WebDET.Menu.arr.length = 0;
        $('[id=ul_Menu]').find('li').each(function (k, v) {
            if (Convert.objectToString($(this).attr('isUsed'), '') == 1) {
                WebDET.Menu.arr.push({
                    Menu_Name: Convert.objectToString($(this).find('a').html(), ''),
                    Href: Convert.objectToString($(this).find('a').attr('href'), ''),
                    ParentID: Convert.objectToInt($(this).attr('subLi'), 0),
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
        WebHdr.Company_Name = $('#txt_Company_Name').val();
        WebHdr.Contact_Person = $('#txt_Contact_Person').val();
        WebHdr.Company_Email = $('#txt_Company_Email').val();

        WebHdr.Mob_1 = $('#txt_Mob_1').val();
        WebHdr.Tel_1 = $('#txt_Tel_1').val();
        WebHdr.Aadhar_Card_NO = $('#txt_Aadhar_Card_NO').val();
        WebHdr.Pan_Card_No = $('#txt_Pan_Card_No').val();
        WebHdr.Company_Specialist_In = $('#txt_Company_Specialist_In').val();
        WebHdr.Company_Address = $('#txt_Company_Address').val();
        WebHdr.ThemeID = $('#ddl_Theme').val();
        WebHdr.ThemeText = $('#ddl_Theme option:selected').text();
        $('#div_Comp_Mdl').modal('hide');
        WDAd.Save();
    },

    ValidateEmail: function (obj) {
        if ($(obj).val().length < 5) {
            WMP_Common.MsgPopUp('Email-ID should be greater than 5 character');
            $(obj).val('');
            return false;
        }
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test($(obj).val())) {
            WMP_Common.MsgPopUp('Invalid mail id format');
            $(obj).val('');
            return false;
        }
    },
};



