/***************************************************************************************************************
FILE NAME   :   WebViewDesign.js
VERSION     :   1.0
PURPOSE     :   to view website
PROJECT     :   Whomp
***************************************************************************************************************/

/*=====================================Declaration=======================================*/
var VrVw = {
    data: new Object(), html: '', Web_ID: '', objTeam: { arrData: [] }, HdrImgPth: '', TeamImgPth: '', FacilityImgPth: '',
    FeedBkImgPth: '', PartnerImgPth: '', Lead_Fields: { arr: [] }
};
/*=====================================End Of Declaration=======================================*/

/*=====================================Intialization=============================================*/

$(document).ready(function () {
    try {
        if (!Convert.objectToBool(WebIsAdd)) {
            WMP_Common.ShowProcess();
            SetWeb.Hdr();
            SetWeb.Menu();
            SetWeb.Slogan();
            SetWeb.Lead_Fields();
            SetWeb.Oper_Flow();
            SetWeb.Products();
            SetWeb.Team();
            SetWeb.Facility();
            SetWeb.FeedBk();
            SetWeb.Package();
            //SetWeb.Pack_Point_Det();
            SetWeb.Partner();
            SetWeb.Information();
            SetWeb.Contact();
            SetWeb.SocailNtwk();
            $(document).on('click', '[id=btn_SubmitLead]', function () { event.preventDefault();SetWeb.CallGenerateLead(); });
        }
    }
    catch (ex) {
        console.log("issue in view website=>Document ready :- " + ex.message);
        return false;
    }
    finally {
        WMP_Common.HideProcess();
    }
});

/*=====================================End Of Intialization=======================================*/

var SetWeb = {

    Hdr: function () {
        try {
            VrVw.data = $.parseJSON(objWebViewData);
            if (VrVw.data.status != "success") {
                console.log(VrVw.data);
                WMP_Common.PopUpErrorMsg(VrVw.data.data);
                return false;
            }
            var hdr = $.parseJSON(VrVw.data.data).Hdr[0];
            VrVw.Web_ID = hdr.Web_ID;
            VrVw.HdrImgPth = '../Content/Images/WebsiteCreation/' + VrVw.Web_ID + '/Hdr/';
            $('#img_Logo').attr('src', (VrVw.HdrImgPth + 'Logo' + Convert.objectToString(hdr.Logo_Path, '')));
            $('#img_Product_Hdr').attr('src', (VrVw.HdrImgPth + 'product_hdr' + Convert.objectToString(hdr.Product_Hdr_Img_Path, '')));
            $(".intro-content").css("background-image", "url('" + VrVw.HdrImgPth + 'hdr_bg' + hdr.Hdr_BkGrnd_Img + "')");
            $('#testimonial').css("background-image", "url('" + VrVw.HdrImgPth + 'feedbck_bg' + hdr.FeedBk_BkGrnd_Img + "')");
            $('#span_Timing_Detail').html(hdr.Timing_Detail);
            $('#span_Contact_Detail').html(hdr.Contact_Detail);
            $('#span_Slogan_H1').html(hdr.Slogan_H1);
            $('#span_Slogan_H2').html(hdr.Slogan_H2);
            $('#span_Fields_Hdr').html(hdr.Fields_Hdr);
            $('#span_Emergency_Hdr_Desc').html(hdr.Emergency_Hdr_Desc);
            $('#span_Emergency_Desc').html(hdr.Emergency_Desc);
            $('#span_EmergencyBtn_Desc').html(hdr.EmergencyBtn_Desc);
            $('#span_Team_Hdr_Desc').html(hdr.Team_Hdr_Desc);
            $('#span_Team_Desc').html(hdr.Team_Desc);
            $('#span_Facilities_Hdr_Desc').html(hdr.Facilities_Hdr_Desc);
            $('#span_Facilities_Desc').html(hdr.Facilities_Desc);
            $('#span_Packages_Hdr_Desc').html(hdr.Packages_Hdr_Desc);
            $('#span_Packages_Desc').html(hdr.Packages_Desc);
            $('#span_Partner_Hdr_Desc').html(hdr.Partner_Hdr_Desc);
            $('#span_Partner_Desc').html(hdr.Partner_Desc);
            $('#span_About_Hdr_Desc').html(hdr.About_Hdr_Desc);
            $('#span_About_Desc').html(hdr.About_Desc);
            $('#span_Information_Hdr_Desc').html(hdr.Information_Hdr_Desc);
            $('#span_Information_Hdr_Desc').html(hdr.Information_Hdr_Desc);
            $('#span_Center_Hdr_Desc').html(hdr.Center_Hdr_Desc);
            $('#span_Center_Desc').html(hdr.Center_Desc);
            $('#span_Location_Hdr_Desc').html(hdr.Location_Hdr_Desc);
            $('#span_Location_Desc').html(hdr.Location_Desc);
            $('#span_EmergencyBtn_Desc').html(hdr.EmergencyBtn_Desc);
        }
        catch (ex) {
            console.log("issue in view website=>Hdr :- " + ex.message);
            return false;
        }
    },

    Menu: function () {
        try {
            VrVw.html = '', arrMenu = [];
            var i = 0, edit_Html = '', len = 0, active = '', href = '', mainMenu = '', subMenu = '';
            var menuDet = $.parseJSON(VrVw.data.data).Menu;
            $(menuDet).each(function (k, v) {
                edit_Html = '', active = '';
                if (k == 0)
                    active = 'class="active"';
                if (v.ParentID == 0) {
                    arrMenu.push(v.Href);
                    mainMenu += '<li isUsed="1" ' + active + '><a href=' + v.Href + '>' + v.Menu_Name + '</a></li>';
                }
                else {
                    if (subMenu == '') {
                        subMenu = '<li isUsed="0" class="dropdown">'
                            + '<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <span class="badge custom-badge red pull-right">Extra</span>More <b class="caret"></b></a>'
                            + '<ul class="dropdown-menu">';
                    }
                    subMenu += '<li subLi="1"><a href="' + v.Href + '">' + v.Menu_Name + '</a></li>';
                }
            });
            if (subMenu != '')
                subMenu += '</ul></li>';

            VrVw.html = mainMenu + subMenu;
            VrVw.html += '';
            $('#ul_Menu').html(VrVw.html);
            $('.cls_UpdateModal').modal('hide');
            SetWeb.HideShowMenuHref(arrMenu);
        }
        catch (ex) {
            console.log("issue in view website=>Menu :- " + ex.message);
            return false;
        }
    },

    HideShowMenuHref: function (arrMenu) {
        try {
            $('#product').hide();
            $('#team').hide();
            $('#facilities').hide();
            $('#pricing').hide();
            $(arrMenu).each(function (k, v) {
                $(v).show();
            });
        }
        catch (ex) {
            console.log("issue in view website=>HideShowMenuHref :- " + ex.message);
            return false;
        }
    },

    Slogan: function () {
        try {
            $('#ul_Slogan').html('');
            var i = 0, slogan_Det = '';
            var slogaDet = $.parseJSON(VrVw.data.data).Slogan;
            $(slogaDet).each(function (k, v) {
                i++;
                VrVw.html = '<li><span class="fa fa-check fa-2x icon-success"></span><span class="list">'
                    + '<strong id="strong_SloganHdr_' + i + '">' + v.Slogan_Name + '</strong><br />'
                    + '<span id="span_SloganDet_' + i + '">' + v.Slogan_Desc + '</span></span>'
                    + '</li>';
                $('#ul_Slogan').append(VrVw.html);
            });
        }
        catch (ex) {
            console.log("issue in view website=>Slogan :- " + ex.message);
            return false;
        }
    },

    Lead_Fields: function () {
        try {
            var Lead_FieldsDet = $.parseJSON(VrVw.data.data).Lead_Fields;
            $('#form_Field').html('');
            VrVw.html = '';
            var i = 0, edit_Html = '', startRow_Html = '', endRow_Html = '', segrate = 2, totalLen = 0;
            totalLen = $(Lead_FieldsDet).length;
            $(Lead_FieldsDet).each(function (k, v) {
                i++;
                edit_Html = '', startRow_Html = '', endRow_Html = '';
                if (i == 2)
                    edit_Html = '';
                if (i == 1)
                    startRow_Html = ' <div class="row">';
                if (segrate == i && segrate != totalLen) {
                    segrate = segrate + segrate;
                    endRow_Html = '</div>'
                        + '<div class="row">';
                }
                VrVw.html += ' ' + startRow_Html + '<div class="col-xs-6 col-sm-6 col-md-6">'
                    + '<div class="form-group">' + edit_Html + ''
                    + '<label id="lbl_FieldKey_' + i + '">' + v.Field_Value + '</label>'
                    + '<input id="txt_FieldValue_' + i + '" type="text" class="form-control input-md">'
                    + '</div>'
                    + '</div>' + endRow_Html + '';
            });
            VrVw.html = VrVw.html + '<input id="btn_SubmitLead" type = "submit" value = "Submit" class="btn btn-skin btn-block btn-lg">'
                + '<p class="lead-footer">* We\'ll contact you by phone & email later</p>';
            $('#form_Field').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>Lead_Fields :- " + ex.message);
            return false;
        }
    },

    Oper_Flow: function () {
        try {
            var Oper_Flow_Dets = $.parseJSON(VrVw.data.data).Oper_Flow;
            $('#div_Oper_Flow').html('');
            var i = 0, Oper_FlowIcon = '', Oper_Flow_Det = '', editIcon = '';
            $(Oper_Flow_Dets).each(function (k, v) {
                editIcon = '';
                i++;
                if (i == 1)
                    editIcon = '';
                else
                    editIcon = '';
                VrVw.html = '<div class="col-sm-3 col-md-3"> ' + editIcon + ''
                    + '<div class="wow fadeInUp" data-wow-delay="0.2s">'
                    + '<div class="box text-center">'
                    + '<i class="' + v.Oper_Flow_Icon + '" id="i_Oper_FlowIcon_' + i + '"></i>'
                    + '<h4 class="h-bold" id="h4_Oper_FlowHdr_' + i + '">' + v.Oper_Flow_Name + '</h4>'
                    + '<p id="p_Oper_FlowDet_' + i + '">' + v.Oper_Flow_Det + '</p>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $('#div_Oper_Flow').append(VrVw.html);
            });
        }
        catch (ex) {
            console.log("issue in view website=>Oper_Flow :- " + ex.message);
            return false;
        }
    },

    Products: function () {
        try {
            var Products_Det = $.parseJSON(VrVw.data.data).Products;
            $('#div_Product_Lst_1').html('');
            $('#div_Product_Lst_2').html('');
            var i = 0, Product_Icon = '', Product_Det = '', editIcon = '', totalProduct = 0, lst1 = 0, lst2 = 0, delay = 0;
            totalProduct = Convert.objectToInt($(Products_Det).length, 0);
            lst1 = Math.ceil((totalProduct / 2));
            lst2 = totalProduct - lst1;
            $(Products_Det).each(function (k, v) {
                editIcon = '';
                i++;
                delay++;
                Product_Icon = v.Product_Icon;
                Product_Det = v.Product_Det;
                if (i == lst1 + 1)
                    editIcon = '<a class="cls_EditWeb cls_Absolute" id="a_Products"><i class="fa fa-edit"></i></a>';


                VrVw.html = '<div class="wow fadeInRight row" data-wow-delay="0.' + delay + 's">'
                    + '<div class="service-box">'
                    + '<div class="service-icon">'
                    + '<span class="' + Product_Icon + '" id="span_Product_Icon_' + i + '"></span>'
                    + '</div>'
                    + '<div class="service-desc">' + editIcon + ''
                    + '<h5 class="h-light" id="h5_ProductHDR_' + i + '">' + v.Product_Name + '</h5>'
                    + '<p id="p_ProductDet_' + i + '">' + Product_Det + '</p>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                if (i <= lst1) {
                    $('#div_Product_Lst_1').append(VrVw.html);
                    if (i == lst1)
                        delay = 0;
                }
                else
                    $('#div_Product_Lst_2').append(VrVw.html);
            });
        }
        catch (ex) {
            console.log("issue in view website=>Products :- " + ex.message);
            return false;
        }
    },

    Team: function () {
        try {
            VrVw.TeamImgPth = '../Content/Images/WebsiteCreation/' + VrVw.Web_ID + '/Team/';
            var Team_Department_Det = $.parseJSON(VrVw.data.data).Team_Department;
            var Team_Det = $.parseJSON(VrVw.data.data).Team;
            $('.cls_Department').html('');
            VrVw.html = '';
            var i = 1, totalDep = 0, totalLen = 0;
            $(Team_Department_Det).each(function (k, v) {
                if (v.Department_Code == -1)
                    return false;
                VrVw.objTeam.arrData.push({
                    'Team_Department_Code': v.Department_Code,
                    'Team_Member_Name': v.Department_Name
                });
            });

            totalDep = VrVw.objTeam.arrData.length;
            VrVw.html = '<div id="div_Department_1" data-filter="*" class="cbp-filter-item-active cbp-filter-item" val="All" code="0">'
                + 'All (<div class="cbp-filter-counter">' + totalDep + '</div>)'
                + '</div>';
            $('.cls_Department').append(VrVw.html);

            $(Team_Department_Det).each(function (k, v) {
                if (v.Department_Code == -1)
                    return false;
                var tmpobj = $.grep(VrVw.objTeam.arrData, function (gv) {
                    if (gv.Team_Department_Code == v.Department_Code) {
                        return gv;
                    }
                });
                i++;
                VrVw.html = '<div id="div_Department_' + i + '" data-filter=".' + v.Department_Name + '" class="cbp-filter-item" val="' + v.Department_Name + '" code="' + v.Department_Code + '">'
                    + '' + v.Department_Name + ' (<div class="cbp-filter-counter">' + tmpobj.length + '</div>)'
                    + '</div>'
                $('.cls_Department').append(VrVw.html);
            });

            //Team
            //$('#div_Team').html('');
            VrVw.html = ''; Team_Department_Val = '', Team_Department_Code = '', Team_Img = '', Team_Desc = '', i = 0;
            var activeCur = '', endActiveCur = '', tmp = '', segrate = 3;
            if ($(Team_Det).length <= 3) {
                $('#a_lftArrTeam').hide();
                $('#a_rgtArrTeam').hide();
            }
            else {
                $('#a_lftArrTeam').show();
                $('#a_rgtArrTeam').show();
            }
            totalLen = $('[id^=txt_TeamName]').length;
            $(Team_Det).each(function (k, v) {
                activeCur = '', endActiveCur = '',
                    i++;
                Team_Department_Code = v.Team_Department_Code;
                Team_Department_Val = v.Department_Name;
                Team_Img = VrVw.TeamImgPth + v.Img;
                Team_IsChangeImg = '';
                Team_Desc = v.Team_Desc;
                if (i == 1)
                    activeCur = '<div class="item active">';
                if (segrate == i && segrate != totalLen) {
                    segrate = segrate + segrate;
                    endActiveCur = '</div>'
                        + '<div class="item">';
                }
                if (segrate >= i) {
                    VrVw.html = VrVw.html + '' + activeCur + '<div class="col-md-4 col-sm-6 rowTeam">'
                        + '<a class="cbp-caption cbp-singlePage">'
                        + '<div>'
                        + '<img  class="img_teamsize" src="' + Team_Img + '" is_change="' + Team_IsChangeImg + '"alt="" width="100%" id="img_Team_' + i + '">'
                        + '</div>'
                        + '<div class="cbp-caption-activeWrap">'
                        + '<div class="cbp-l-caption-alignCenter">'
                        + '<div class="cbp-l-caption-body">'
                        + '<div class="cbp-l-caption-text">VIEW PROFILE</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<a class="cbp-singlePage cbp-l-grid-team-name" id="a_TeamName_' + i + '">' + v.Team_Name + '</a>'
                        + '<div class="cbp-l-grid-team-position" id="div_TeamDepartment_' + i + '" code="' + Team_Department_Code + '">' + Team_Department_Val + '</div>'
                        + '<input type="hidden" id="hdn_TeamDesc_' + i + '"  value"' + Team_Desc + '"/>'
                        + '</div>' + endActiveCur + '';
                }
            });
            $('#div_Team').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>Team:- " + ex.message);
            return false;
        }
    },

    Facility: function () {
        try {
            VrVw.FacilityImgPth = '../Content/Images/WebsiteCreation/' + VrVw.Web_ID + '/Facility/';
            var Facility_Det = $.parseJSON(VrVw.data.data).Facility;
            var i = 0;
            $('#div_Facility').html('');
            VrVw.html = '<div class="wow bounceInUp" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: bounceInUp;">'
                + '<div id="owl-works" class="owl-carousel owl-theme" style="opacity: 1; display: block;">'
                + '<div class="owl-wrapper-outer">'
                + '<div class="owl-wrapper" style="width: 3336px; left: 0px; display: block; transition: all 800ms ease 0s; transform: translate3d(-556px, 0px, 0px);">';
            $(Facility_Det).each(function (k, v) {
                i++;
                Fclty_Img = VrVw.FacilityImgPth + v.Img;
                Fclty_IsChangeImg = '';
                VrVw.html = VrVw.html + ' <div class="owl-item" style="width: 278px;">'
                    + '<div class="item rowFclty"><a  id="a_FcltyTitle_' + i + '" href="' + Fclty_Img + '" title="' + v.Facility_Title + '" data-lightbox-gallery="gallery_' + i + '" data-lightbox-hidpi="' + Fclty_Img + '">'
                    + '<img id="img_Facility_' + i + '" src="' + Fclty_Img + '" is_change="' + Fclty_IsChangeImg + '" class="img-responsive cls_img_Facility" alt="img">'
                    + '</a>'
                    + '</div>'
                    + '</div>';
            });
            VrVw.html = VrVw.html + '</div></div>'
                + '<div class="owl-controls clickable">'
                + '<div class="owl-pagination">'
                + '<div class="owl-page" id="div_left"><span class=""></span></div>'
                + '<div class="owl-page active" id="div_right"><span class=""></span></div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
            $('#div_Facility').html(VrVw.html);
            $(document).on('click', '[id=div_left]', function () { $('#div_right').removeClass('active'); $(this).addClass('active'); $('.owl-wrapper').css({ "width": "3336px", "left": "0px", "display": "block", "transition": "all 800ms ease 0s", "transform": "translate3d(0px, 0px, 0px)", }) });
            $(document).on('click', '[id=div_right]', function () { $('#div_left').removeClass('active'); $(this).addClass('active'); $('.owl-wrapper').css({ "width": "3336px", "left": "0px", "display": "block", "transition": "all 800ms ease 0s", "transform": "translate3d(-556px, 0px, 0px)", }) });

        }
        catch (ex) {
            console.log("issue in view website=>Facility :- " + ex.message);
            return false;
        }
    },

    FeedBk: function () {
        try {
            VrVw.FeedBkImgPth = '../Content/Images/WebsiteCreation/' + VrVw.Web_ID + '/FeedBk/';
            var FeedBk = $.parseJSON(VrVw.data.data).FeedBk;
            VrVw.html = ''; FeedBk_Title = '', FeedBk_Rate = '', FeedBk_Desc = '', FeedBk_Img = '', FeedBk_Loctn = '', i = 0;
            var activeCur = '', endActiveCur = '', tmp = '', segrate = 3, totalLen = 0;
            if ($(FeedBk).length <= 3) {
                $('#a_lftArrowFeedbkp').hide();
                $('#a_rgtArrowFeedbkp').hide();
            }
            else {
                $('#a_lftArrowFeedbkp').show();
                $('#a_rgtArrowFeedbkp').show();
            }

            totalLen = $(FeedBk).length;
            $(FeedBk).each(function (k, v) {
                activeCur = '', endActiveCur = '',
                    i++;
                FeedBk_Title = v.FeedBk_Title;
                FeedBk_Rate = v.FeedBk_Rate;
                FeedBk_Desc = v.FeedBk_Desc;
                FeedBk_Img = VrVw.FeedBkImgPth + v.Img;
                FeedBk_Loctn = FeedBk_Loctn;
                FeedBk_IsChangeImg = '';
                if (i == 1)
                    activeCur = '<div class="item active">';
                if (segrate == i && segrate != totalLen) {
                    segrate = segrate + segrate;
                    endActiveCur = '</div>'
                        + '<div class="item">';
                }
                if (segrate >= i) {
                    VrVw.html = VrVw.html + '' + activeCur + '<div class="col-md-4 col-sm-6 rowFeedbk">'
                        + '<div class="block-text rel zmin">'
                        + '<a title="" href="#" id="a_FeedBk_Title_' + i + '">' + FeedBk_Title + '</a>'
                        + '<div class="mark">My rating: <span class="rating-input" id="span_FeedBk_Rate_' + i + '"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>'
                        + '<p id="p_FeedBk_Desc_' + i + '">' + FeedBk_Desc + '</p>'
                        + '<ins class="ab zmin sprite sprite-i-triangle block"></ins>'
                        + '</div>'
                        + '<div class="person-text rel text-light">'
                        + '<img id="p_FeedBk_Img_' + i + '" src="' + FeedBk_Img + '" is_change="' + FeedBk_IsChangeImg + '" alt="" class="person img-circle" />'
                        + '<a id="a_FeedBk_Name_' + i + '" title="" href="#">' + v.FeedBk_Name + '</a>'
                        + '<span id="span_FeedBk_Loctn_' + i + '">' + FeedBk_Loctn + '</span>'
                        + '</div>'
                        + '</div>' + endActiveCur + '';
                }
            });
            $('#div_Feedbk').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>FeedBk :- " + ex.message);
            return false;
        }
    },

    Package: function () {
        try {
            var Package_Det = $.parseJSON(VrVw.data.data).Package;
            var Pack_Point_Det = $.parseJSON(VrVw.data.data).Pack_Point_Det;
            $('#div_Package').html('');
            VrVw.html = '';
            var Pack_Name = '', Pack_Price = '', Pack_Price_Per = '', Pack_Point = '', point_Html = '', i_point = 0, iSDel = 0, delStartHtml = '',
                delEndHtml = '', icon = '', fa_times = '', featured_price = '', activeCur = '', endActiveCur = '', tmp = '', segrate = 3, featured = '', i = 0,
                middleDiv = 2; animtn = 1, Web_Package_ID = 0, totalLen = 0;
            if ($(Package_Det).length <= 3) {
                $('#a_lftArrowPack').hide();
                $('#a_rgtArrowPack').hide();
            }
            else {
                $('#a_lftArrowPack').show();
                $('#a_rgtArrowPack').show();
            }
            totalLen = $(Package_Det).length;
            $(Package_Det).each(function (k, v) {
                activeCur = '', endActiveCur = '', featured = '', point_Html = '', i_point = 0;
                i++;
                Pack_Price = v.Pack_Price;
                Pack_Price_Per = v.Pack_Price_Per;
                Web_Package_ID = v.Web_Package_ID;
                var arrPack_Point = $.grep(Pack_Point_Det, function (gv) {
                    if (Web_Package_ID == gv.Web_PackageID)
                        return gv;
                });
                $(arrPack_Point).each(function (k, v) {
                    i_point++;
                    iSDel = Convert.objectToBool(v.Is_Pack_Point_Chk, false);
                    if (iSDel == true) {
                        delStartHtml = '<del>';
                        fa_times = 'fa-times';
                        icon = 'danger';
                        delEndHtml = '</del>'
                    }
                    else {
                        delStartHtml = '';
                        fa_times = 'fa-check';
                        icon = 'success';
                        delEndHtml = ''
                    }
                    point_Html += '<li id="li_Pack_Point_' + i_point + '">'
                        + '' + delStartHtml + '<strong class="cls_strong_Pack_Point">' + v.Pack_Point + '</strong>' + delEndHtml + ''
                        + '<i class="fa ' + fa_times + ' icon-' + icon + '"></i>'
                        + '</li > ';
                });
                PackBtnHDRName = v.Pack_BTN_HDR_Name;
                if (i == 1)
                    activeCur = '<div class="item active">';
                if (segrate == i && segrate != totalLen) {
                    segrate = segrate + segrate;
                    endActiveCur = '</div>'
                        + '<div class="item">';
                }
                if (middleDiv == i) {
                    console.log('1');
                    featured_price = 'featured-price';
                    featured = 'featured';
                    middleDiv = middleDiv + segrate;
                    animtn = 3;
                }
                else {
                    featured_price = '';
                    featured = 'general';
                    animtn = 1;
                }
                html_Pack_Point = '';
                i_PackPoint = 0;
                $(arrPack_Point).each(function (k, v) {
                    i_PackPoint++;
                    html_Pack_Point += '<li id="li_Pack_Point_' + i_PackPoint + '">' + v.Pack_Point + '</li>';
                });

                if (segrate >= i) {
                    VrVw.html = VrVw.html + '' + activeCur + '<div class="col-sm-4 pricing-box ' + featured_price + ' rowPack">'
                        + '<div class="wow bounceInUp" data-wow-delay="0.' + animtn + 's">'
                        + '<div class="pricing-content ' + featured + '">'
                        + '<h2 id="h2_Package_Name_' + i + '">' + v.Pack_Name + '</h2>'
                        + '<h3>'
                        + '<i class="fa fa-inr" aria-hidden="true"></i>'
                        + '<strong id="strong_Price_' + i + '">' + Pack_Price + '</strong>'
                        + '<span>/<strong id="strong_Package_Price_Per_' + i + '"> ' + Pack_Price_Per + '</strong></span>'
                        + '</h3>'
                        + '<ul id="ul_Pack_Point_' + i + '">' + point_Html + '</ul>'
                        + '<div class="price-bottom">'
                        + ' <a href="#" class="btn btn-skin btn-lg" id="a_Pack_Btn_HDR_Name_' + i + '">' + PackBtnHDRName + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>' + endActiveCur + ''
                }
            });
            $('#div_Package').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>Package :- " + ex.message);
            return false;
        }
    },

    Partner: function () {
        try {
            VrVw.PartnerImgPth = '../Content/Images/WebsiteCreation/' + VrVw.Web_ID + '/Partner/';
            var Partner_Det = $.parseJSON(VrVw.data.data).Partner;
            VrVw.html = ''; Partner_Img = '', i = 0;
            var activeCur = '', endActiveCur = '', tmp = '', segrate = 4, totalLen = 0;
            if ($(Partner_Det).length <= 4) {
                $('#a_lftArrowPartner').hide();
                $('#a_rgtArrowPartner').hide();
            }
            else {
                $('#a_lftArrowPartner').show();
                $('#a_rgtArrowPartner').show();
            }
            totalLen = $(Partner_Det).length;
            $(Partner_Det).each(function (k, v) {
                activeCur = '', endActiveCur = '',
                    i++;
                Partner_Img = VrVw.PartnerImgPth + v.Img;
                Partner_IsChangeImg = '';
                if (i == 1)
                    activeCur = '<div class="item active">';
                if (segrate == i && segrate != totalLen) {
                    segrate = segrate + segrate;
                    endActiveCur = '</div>'
                        + '<div class="item">';
                }
                VrVw.html += '' + activeCur + '<div class="col-sm-6 col-md-3">'
                    + '<div class="partner">'
                    + '<a href="#"><img id="img_Partner_' + i + '" src="' + Partner_Img + '" is_change="' + Partner_IsChangeImg + '" alt="" class="img-responsive cls_img_Partner"/></a>'
                    + '</div>'
                    + '</div>' + endActiveCur + '';
            });
            $('#div_Partner').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>Partner :- " + ex.message);
            return false;
        }
    },

    Information: function () {
        try {
            var Information_Det = $.parseJSON(VrVw.data.data).Information;
            $('#ul_Information').html('');
            VrVw.html = '';
            var Info_Name = '', i = 0, edit = '';
            $(Information_Det).each(function (k, v) {
                edit = '';
                if (k == 0)
                    edit = '';
                VrVw.html += ' <li><a href=' + v.Info_Link + ' id="a_info_' + i + '">' + v.Info_Value + '</a>' + edit + '</li>';
            });
            $('#ul_Information').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>Information :- " + ex.message);
            return false;
        }
    },

    Contact: function () {
        try {
            var Contact_Det = $.parseJSON(VrVw.data.data).Contact;
            $('#ul_Contact').html('');
            VrVw.html = '';
            var contactIcon = '', i = 0, edit_Html = '';
            $(Contact_Det).each(function (k, v) {
                i++;
                edit_Html = '';
                contactIcon = v.Contact_Icon;
                if (k == 0)
                    edit_Html = '';
                VrVw.html += '<li>'
                    + '<span class="fa-stack fa-lg">'
                    + '<i class="fa fa-circle fa-stack-2x"></i>'
                    + '<i id="i_ContactIcon_' + i + '" class="' + contactIcon + '"></i>'
                    + '</span> <strong id="strong_ContactText_' + i + '">' + v.Contact_Value + '</strong>'
                    + '' + edit_Html + '</li >';
            });
            $('#ul_Contact').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>Contact :- " + ex.message);
            return false;
        }
    },

    SocailNtwk: function () {
        try {
            var SocailNtwk_Det = $.parseJSON(VrVw.data.data).SocailNtwk;
            $('#ul_SocailNtwk').html('');
            VrVw.html = '';
            var socialNtwkIcon = '', i = 0;
            $(SocailNtwk_Det).each(function (k, v) {
                i++;
                socialNtwkIcon = v.Social_Ntwk_Icon;
                VrVw.html += '<li id="li_SocailNtwkName_' + i + '" class="' + v.Social_Ntwk_Name + '">'
                    + '<a href = "#" > <i id="i_SocailNtwkIcon_' + i + '" class="' + socialNtwkIcon + '"></i></a>'
                    + '</li>';
            });
            $('#ul_SocailNtwk').html(VrVw.html);
        }
        catch (ex) {
            console.log("issue in view website=>SocailNtwk :- " + ex.message);
            return false;
        }
    },

    CallGenerateLead: function () {
        try {
            var arrData = [];
            arrData.push('txt_FieldValue');
            if (!WMP_Common.ValidateTxt(arrData)) {
                WMP_Common.MsgPopUp();
                return false;
            }

            VrVw.Lead_Fields.arr.length = 0;
            VrVw.Lead_Fields.Web_ID = Web_ID;
            $('[id^=lbl_FieldKey]').each(function (k, v) {
                VrVw.Lead_Fields.arr.push({
                    Field_Key: k + 1,
                    Field_Value: Convert.objectToString($(this).html(), ''),
                    Field_Text: Convert.objectToString($(this).closest('.form-group').find('[id^=txt_FieldValue]').val(), '')
                });
            });
            var req = { req: VrVw.Lead_Fields };
            WMP_Common.AjaxRequest(GenerateLead_URL, req, SetWeb.LoadGenerateLead);
        }
        catch (ex) {
            console.log(ex);
            WMP_Common.SlideErr();
        }
    },

    LoadGenerateLead: function (data) {
        console.log(data);
    },
}

