/***************************************************************************************************************
FILE NAME   :   WebDesign.js
VERSION     :   1.0
PURPOSE     :   To Design Web site
PROJECT     :   Whomp
***************************************************************************************************************/

/*=====================================Declaration=======================================*/
var Var_SC = {
    objContrl: new Object(), objHdrContrl: new Object(), curThis: new Object(), objTmp: new Object(), tmp: '', html: '',
    objDepartment: { arrData: [] }, objTeam: { arrData: [] }, packPointCurrThis: new Object(), IsValid: false, ErrMsg: '', ErrCnt: '', menuHtml: '',
    objLstElmt: { arrData: [] }, arrMenu: [],
};
/*=====================================End Of Declaration=======================================*/

/*=====================================Intialization=============================================*/
$(document).ready(function () {
    try {
        WMP_Common.ShowProcess();
        WD.IntializeWD();
        WD.IntializeContrl();
        slg.IntializeSlg();
        oper.IntializeOper();
        prod.IntializeProd();
        Team.IntializeTeam();
        TeamDep.IntializeTeamDep();
        Fclty.IntializeFclty();
        FeedBk.IntializeFeedBk();
        Packs.IntializePacks();
        Partner.IntializePartner();
        Info.IntializeInfo();
        Contact.IntializeContact();
        SocialNtwk.IntializeSocialNtwk();
        Field.IntializeField();
        Menu.IntializeMenu();
    }
    catch (ex) {
        console.log("issue in WebDesign=>Document ready :- " + ex.message);
        return false;
    }
    finally {
        WMP_Common.HideProcess();
    }
});
/*=====================================End Of Intialization=======================================*/

/*=====================================Operation=======================================*/
//--==>Web Design common operation
var WD = {

    IntializeWD: function () {
        $(document).on('click', '.cls_Hdr', function () { WD.PopUp_Hdr(this) });
        $(document).on('click', '[id=btn_UpdateHdr]', WD.Set_Hdr);
        $(document).on('click', '[id=a_Edit_Logo]', function () { $('#file_UploadLogo').trigger('click'); });
        $(document).on('change', '[id=file_UploadLogo]', function () { WMP_Common.SetImg_TR(event, this, 'img_Logo', 2000); });
        $(document).on('click', '[id=a_Edit_Hdr_BkGrnd_Img]', function () { $('#file_Hdr_BkGrnd_Img').trigger('click'); });
        $(document).on('change', '[id=file_Hdr_BkGrnd_Img]', function () { WMP_Common.SetImg_TR(event, this, 'img_Hdr_BkGrnd_Img', 2000); });
    },

    IntializeContrl: function () {
        Var_SC.objHdrContrl = {
            'Timing_Detail': {
                title: 'Timing Detail',
                lbl: 'lbl_Timing_Detail',
                spanVal: 'span_Timing_Detail',
            },
            'Contact_Detail': {
                title: 'Contact Detail',
                lbl: 'lbl_Contact_Detail',
                spanVal: 'span_Contact_Detail',
            },
            'Slogan_H1': {
                title: 'Slogan H1',
                lbl: 'lbl_Slogan_H1',
                spanVal: 'span_Slogan_H1',
            },
            'Slogan_H2': {
                title: 'Slogan H2',
                lbl: 'lbl_Slogan_H2',
                spanVal: 'span_Slogan_H2',
            },
            'Fields_Hdr': {
                title: 'Fields Hdr',
                lbl: 'lbl_Fields_Hdr',
                spanVal: 'span_Fields_Hdr',
            },
            'Emergency_Hdr_Desc': {
                title: 'Emergency Hdr Desc',
                lbl: 'lbl_Emergency_Hdr_Desc',
                spanVal: 'span_Emergency_Hdr_Desc',
            },
            'Emergency_Desc': {
                title: 'Emergency Desc',
                lbl: 'lbl_Emergency_Desc',
                spanVal: 'span_Emergency_Desc',
            },
            'Team_Hdr_Desc': {
                title: 'Team Hdr Desc',
                lbl: 'lbl_Team_Hdr_Desc',
                spanVal: 'span_Team_Hdr_Desc',
            },
            'Team_Desc': {
                title: 'Team Desc',
                lbl: 'lbl_Team_Desc',
                spanVal: 'span_Team_Desc',
            },
            'Facilities_Hdr_Desc': {
                title: 'Facilities Hdr Desc',
                lbl: 'lbl_Facilities_Hdr_Desc',
                spanVal: 'span_Facilities_Hdr_Desc',
            },
            'Facilities_Desc': {
                title: 'Facilities Desc',
                lbl: 'lbl_Facilities_Desc',
                spanVal: 'span_Facilities_Desc',
            },
            'Packages_Hdr_Desc': {
                title: 'Packages Hdr Desc',
                lbl: 'lbl_Packages_Hdr_Desc',
                spanVal: 'span_Packages_Hdr_Desc',
            },
            'Packages_Desc': {
                title: 'Packages Desc',
                lbl: 'lbl_Packages_Desc',
                spanVal: 'span_Packages_Desc',
            },
            'Partner_Hdr_Desc': {
                title: 'Partner Hdr Desc',
                lbl: 'lbl_Partner_Hdr_Desc',
                spanVal: 'span_Partner_Hdr_Desc',
            },
            'Partner_Desc': {
                title: 'Partner Desc',
                lbl: 'lbl_Partner_Desc',
                spanVal: 'span_Partner_Desc',
            },
            'About_Hdr_Desc': {
                title: 'About Hdr Desc',
                lbl: 'lbl_About_Hdr_Desc',
                spanVal: 'span_About_Hdr_Desc',
            },
            'About_Desc': {
                title: 'About Desc',
                lbl: 'lbl_About_Desc',
                spanVal: 'span_About_Desc',
            },
            'Information_Hdr_Desc': {
                title: 'Information Hdr Desc',
                lbl: 'lbl_Information_Hdr_Desc',
                spanVal: 'span_Information_Hdr_Desc',
            },
            'Center_Hdr_Desc': {
                title: 'Center Hdr Desc',
                lbl: 'lbl_Center_Hdr_Desc',
                spanVal: 'span_Center_Hdr_Desc',
            },
            'Center_Desc': {
                title: 'Center Desc',
                lbl: 'lbl_Center_Desc',
                spanVal: 'span_Center_Desc',
            },
            'Location_Hdr_Desc': {
                title: 'Location Hdr Desc',
                lbl: 'lbl_Location_Hdr_Desc',
                spanVal: 'span_Location_Hdr_Desc',
            },
            'Location_Desc': {
                title: 'Location Desc',
                lbl: 'lbl_Location_Desc',
                spanVal: 'span_Location_Desc',
            },
            'EmergencyBtn_Desc': {
                title: 'Emergency Btn Desc',
                lbl: 'lbl_EmergencyBtn_Desc',
                spanVal: 'span_EmergencyBtn_Desc',
            },
            'SocailNtwk_Hdr_Desc': {
                title: 'SocailNtwk Hdr Desc',
                lbl: 'lbl_SocailNtwk_Hdr_Desc',
                spanVal: 'span_SocailNtwk_Hdr_Desc',
            },
        }
    },

    PopUp_Hdr: function (curThis) {
        $('#txt_Hdr').removeClass('err');
        Var_SC.curThis = curThis;
        Var_SC.tmp = $(curThis).prop('id').slice(2);
        $('#div_Hdr').modal('show');
        $('#h4_HdrTitle').html('Update ' + Var_SC.objHdrContrl[Var_SC.tmp].title);
        $('#lbl_Hdr').html(Var_SC.objHdrContrl[Var_SC.tmp].title);
        $('#txt_Hdr').val($("#" + Var_SC.objHdrContrl[Var_SC.tmp].spanVal).html().trim());
    },

    Set_Hdr: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_Hdr');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $("#" + Var_SC.objHdrContrl[Var_SC.tmp].spanVal).html($('#txt_Hdr').val().trim());
        $('.cls_UpdateModal').modal('hide');
    },

    ValidateImage: function (file) {
        IsValid = true, InvalidMsg = '', errorImgCount = 0;
        if (file.length < 0) {
            IsValid = false;
            InvalidMsg += '<br>.Please select image'
            errorImgCount++;
        }
        //if (file[0].size > 1048576) {
        //    IsValid = false;
        //    InvalidMsg += '<br>.Image size should be less than 1 mb'
        //    errorImgCount++;
        //}
        if (!file[0].name.match(/\.(jpg|jpeg|png|PNG)$/)) {
            IsValid = false;
            InvalidMsg += '<br>.Only jpg,jpeg & png image allowed';
            errorImgCount++;
        }
        Var_SC.IsValid = IsValid;
    },

};

//--==>Slogan
var slg = {

    IntializeSlg: function () {
        $(document).on('click', '[id=a_EditSlogan]', slg.PopUp_Slogan);
        $(document).on('click', '[id=btn_UpdateSlogan]', slg.Set_Slogan);
        $(document).on('click', '[id^=a_AddSlogan]', function () { slg.Add_Slogan(this) });
        $(document).on('click', '[id^=a_DeleteSlogan]', function () { slg.Delete_Slogan(this) });
    },

    PopUp_Slogan: function () {
        $('#div_ModalBody_Slogan').html('');
        Var_SC.html = '';
        var i = 0, slogan_Det = '';
        $('[id^=strong_SloganHdr]').each(function (k, v) {
            slogan_Det = Convert.objectToString($(this).closest('span').find('[id^=span_SloganDet]').html(), '');
            i++;
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-5">'
                + '<input type="text" id="txt_SloganHdr_' + i + '" value="' + Convert.objectToString($(this).html(), '') + '" class="form-control bold" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-5">'
                + '<input type="text" id="txt_SloganDet_' + i + '" value="' + slogan_Det + '" class="form-control" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;" id="a_AddSlogan_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteSlogan_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>';
            $('#div_ModalBody_Slogan').append(Var_SC.html);
        });
        $("#a_AddSlogan_" + i + "").show();
        $('#div_Slogan').modal('show');
    },

    Set_Slogan: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_SloganHdr');
        Var_SC.objLstElmt.arrData.push('txt_SloganDet');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#ul_Slogan').html('');
        var i = 0, slogan_Det = '';
        $('[id^=txt_SloganHdr]').each(function (k, v) {
            i++;
            slogan_Det = Convert.objectToString($(this).closest('.row').find('[id^=txt_SloganDet]').val(), '');
            Var_SC.html = '<li><span class="fa fa-check fa-2x icon-success"></span><span class="list">'
                + '<strong id="strong_SloganHdr_' + i + '">' + $(this).val() + '</strong><br />'
                + '<span id="span_SloganDet_' + i + '">' + slogan_Det + '</span></span>'
                + '</li>';
            $('#ul_Slogan').append(Var_SC.html);
        });
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Slogan: function (currThis) {
        hdrSlogan = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_SloganHdr]').val(), '');
        detSlogan = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_SloganDet]').val(), '');
        if (Convert.IsObjectNullOrEmpty(hdrSlogan) && Convert.IsObjectNullOrEmpty(detSlogan)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-5">'
            + '<input type="text" id="txt_SloganHdr_' + i + '" value="" class="form-control bold" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-5">'
            + '<input type="text" id="txt_SloganDet_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddSlogan_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteSlogan_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Slogan').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    Delete_Slogan: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddSlogan']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

};

//--==>Oper_Flow
var oper = {

    IntializeOper: function () {
        $(document).on('click', '[id=a_EditOper_Flow]', oper.PopUp_Oper_Flow);
        $(document).on('click', '[id=btn_UpdateOper_Flow]', oper.Set_Oper_Flow);
        $(document).on('click', '[id^=a_AddOper_Flow]', function () { oper.Add_Oper_Flow(this) });
        $(document).on('click', '[id^=a_DeleteOper_Flow]', function () { oper.Delete_Oper_Flow(this) });
    },

    PopUp_Oper_Flow: function () {
        $('#div_ModalBody_Oper_Flow').html('');
        Var_SC.html = '';
        var i = 0, Oper_Flow_Det = '';
        $('[id^=h4_Oper_FlowHdr]').each(function (k, v) {
            Oper_FlowIcon = Convert.objectToString($(this).closest('.box').find('[id^=i_Oper_FlowIcon]').attr('class'), '');
            Oper_Flow_Det = Convert.objectToString($(this).closest('.box').find('[id^=p_Oper_FlowDet]').html(), '').trim();
            i++;
            Var_SC.html = '<div class="col-xs-12 rowOper_Flow">'
                + '<div class="col-xs-2">'
                + '<input type="text" id="txt_Oper_FlowIcon_' + i + '" value="' + Oper_FlowIcon + '" class="form-control" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-4">'
                + '<input type="text" id="txt_Oper_FlowHdr_' + i + '" value="' + Convert.objectToString($(this).html(), '') + '" class="form-control bold" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-4">'
                + '<input type="text" id="txt_Oper_FlowDet_' + i + '" value="' + Oper_Flow_Det + '" class="form-control" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;" id="a_AddOper_Flow_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteOper_Flow_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Oper_Flow').append(Var_SC.html);
        });
        $("#a_AddOper_Flow_" + i + "").show();
        $('#div_Oper_Flow_Modal').modal('show');
    },

    Set_Oper_Flow: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_Oper_FlowHdr');
        Var_SC.objLstElmt.arrData.push('txt_Oper_FlowIcon');
        Var_SC.objLstElmt.arrData.push('txt_Oper_FlowDet');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#div_Oper_Flow').html('');
        var i = 0, Oper_FlowIcon = '', Oper_Flow_Det = '', editIcon = '';
        $('[id^=txt_Oper_FlowHdr]').each(function (k, v) {
            editIcon = '';
            i++;
            Oper_FlowIcon = Convert.objectToString($(this).closest('.rowOper_Flow').find('[id^=txt_Oper_FlowIcon]').val(), '');
            Oper_Flow_Det = Convert.objectToString($(this).closest('.rowOper_Flow').find('[id^=txt_Oper_FlowDet]').val(), '');
            if (i == 1)
                editIcon = '<a class="cls_EditWeb" id="a_EditOper_Flow"><i class="fa fa-edit"></i></a>';
            else
                editIcon = '';
            Var_SC.html = '<div class="col-sm-3 col-md-3"> ' + editIcon + ''
                + '<div class="wow fadeInUp" data-wow-delay="0.2s">'
                + '<div class="box text-center">'
                + '<i class="' + Oper_FlowIcon + '" id="i_Oper_FlowIcon_' + i + '"></i>'
                + '<h4 class="h-bold" id="h4_Oper_FlowHdr_' + i + '">' + $(this).val() + '</h4>'
                + '<p id="p_Oper_FlowDet_' + i + '">' + Oper_Flow_Det + '</p>'
                + '</div>'
                + '</div>'
                + '</div>';
            $('#div_Oper_Flow').append(Var_SC.html);
        });
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Oper_Flow: function (currThis) {
        Oper_FlowIcon = Convert.objectToString($(currThis).closest('.rowOper_Flow').find('[id^=txt_Oper_FlowIcon]').val(), '');
        hdrOper_Flow = Convert.objectToString($(currThis).closest('.rowOper_Flow').find('[id^=txt_Oper_FlowHdr]').val(), '');
        detOper_Flow = Convert.objectToString($(currThis).closest('.rowOper_Flow').find('[id^=txt_Oper_FlowDet]').val(), '');
        if (Convert.IsObjectNullOrEmpty(Oper_FlowIcon) && Convert.IsObjectNullOrEmpty(hdrOper_Flow) && Convert.IsObjectNullOrEmpty(detOper_Flow)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 rowOper_Flow">'
            + '<div class="col-xs-2">'
            + '<input type="text" id="txt_Oper_FlowIcon_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-4">'
            + '<input type="text" id="txt_Oper_FlowHdr_' + i + '" value="" class="form-control bold" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-4">'
            + '<input type="text" id="txt_Oper_FlowDet_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddOper_Flow_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteOper_Flow_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Oper_Flow').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    Delete_Oper_Flow: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.rowOper_Flow').remove();
            $("[id^='a_AddOper_Flow']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

}

//--==>Product
var prod = {

    IntializeProd: function () {
        $(document).on('click', '[id=a_Edit_Product_Hdr_Img_Path]', function () { $('#file_UploadProductHdrImg').trigger('click'); });
        $(document).on('change', '[id=file_UploadProductHdrImg]', function () { WMP_Common.SetImg_TR(event, this, 'img_Product_Hdr', 2000); });
        $(document).on('click', '[id=a_Products]', prod.PopUp_Products);
        $(document).on('click', '[id=btn_UpdateProducts]', prod.Set_Products);
        $(document).on('click', '[id^=a_AddProduct]', function () { prod.Add_Products(this) });
        $(document).on('click', '[id^=a_DeleteProduct]', function () { prod.Delete_Products(this) });
    },

    SetHdrProductImg: function (event) {
        var file = '', fileName = '';
        file = event.target.files;
        WMP_Common.ValidateImage(file);
        if (Var_SC.IsValid) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file[0]);
            oFReader.onload = function (oFREvent) {
                $('#img_Product_Hdr').attr("src", oFREvent.target.result);
            };
        }
    },

    PopUp_Products: function () {
        $('#div_ModalBody_Products').html('');
        Var_SC.html = '';
        var i = 0, Product_Icon = '', Product_Det = '';
        $('[id^=h5_ProductHDR]').each(function (k, v) {
            Product_Icon = Convert.objectToString($(this).closest('.row').find('[id^=span_Product_Icon]').attr('class'), '');
            Product_Det = Convert.objectToString($(this).closest('.row').find('[id^=p_ProductDet]').html(), '').trim();
            i++;
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-2">'
                + '<input type="text" id="txt_ProductIcon_' + i + '" value="' + Product_Icon + '" class="form-control" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-4">'
                + '<input type="text" id="txt_ProductHdr_' + i + '" value="' + Convert.objectToString($(this).html(), '') + '" class="form-control bold" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-4">'
                + '<input type="text" id="txt_ProductDet_' + i + '" value="' + Product_Det + '" class="form-control" aria-describedby="basic-addon2" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;" id="a_AddProduct_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteProduct_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Products').append(Var_SC.html);
        });
        $("#a_AddProduct_" + i + "").show();
        $('#div_Products_Modal').modal('show');
    },

    Set_Products: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_ProductHdr');
        Var_SC.objLstElmt.arrData.push('txt_ProductIcon');
        Var_SC.objLstElmt.arrData.push('txt_ProductDet');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#div_Product_Lst_1').html('');
        $('#div_Product_Lst_2').html('');
        var i = 0, Product_Icon = '', Product_Det = '', editIcon = '', totalProduct = 0, lst1 = 0, lst2 = 0, delay = 0;
        totalProduct = Convert.objectToInt($('[id^=txt_ProductHdr]').length, 0);
        lst1 = Math.ceil((totalProduct / 2));
        lst2 = totalProduct - lst1;
        $('[id^=txt_ProductHdr]').each(function (k, v) {
            editIcon = '';
            i++;
            delay++;
            Product_Icon = Convert.objectToString($(this).closest('.row').find('[id^=txt_ProductIcon]').val(), '');
            Product_Det = Convert.objectToString($(this).closest('.row').find('[id^=txt_ProductDet]').val(), '');
            if (i == lst1 + 1)
                editIcon = '<a class="cls_EditWeb cls_Absolute" id="a_Products"><i class="fa fa-edit"></i></a>';


            Var_SC.html = '<div class="wow fadeInRight row" data-wow-delay="0.' + delay + 's">'
                + '<div class="service-box">'
                + '<div class="service-icon">'
                + '<span class="' + Product_Icon + '" id="span_Product_Icon_' + i + '"></span>'
                + '</div>'
                + '<div class="service-desc">' + editIcon + ''
                + '<h5 class="h-light" id="h5_ProductHDR_' + i + '">' + $(this).val() + '</h5>'
                + '<p id="p_ProductDet_' + i + '">' + Product_Det + '</p>'
                + '</div>'
                + '</div>'
                + '</div>';
            if (i <= lst1) {
                $('#div_Product_Lst_1').append(Var_SC.html);
                if (i == lst1)
                    delay = 0;
            }
            else
                $('#div_Product_Lst_2').append(Var_SC.html);
        });
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Products: function (currThis) {
        ProductIcon = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_ProductIcon]').val(), '');
        ProductHdr = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_ProductHdr]').val(), '');
        ProductDet = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_ProductDet]').val(), '');
        if (Convert.IsObjectNullOrEmpty(ProductIcon) && Convert.IsObjectNullOrEmpty(ProductHdr) && Convert.IsObjectNullOrEmpty(ProductDet)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-2">'
            + '<input type="text" id="txt_ProductIcon_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-4">'
            + '<input type="text" id="txt_ProductHdr_' + i + '" value="" class="form-control bold" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-4">'
            + '<input type="text" id="txt_ProductDet_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddProduct_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteProduct_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>';
        $('#div_ModalBody_Products').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    Delete_Products: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddProduct']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

}

//--==>Team Members
var Team = {

    IntializeTeam: function () {
        $(document).on('click', '[id^=img_PopUpTeam]', function () { $(this).closest('div').find('[id^=file_Team]').trigger('click'); });
        $(document).on('change', '[id^=file_Team]', function () { WMP_Common.SetImg_TR(event, this, 'img_PopUpTeam', 2000); }); //Team.SetTeamImg(event, this) 
        $(document).on('click', '[id=a_EditTeam]', Team.PopUp_Team);
        $(document).on('click', '[id=btn_UpdateTeam]', Team.Set_Team);
        $(document).on('click', '[id^=a_AddTeam]', function () { Team.Add_Team(this) });
        $(document).on('click', '[id^=a_DeleteTeam]', function () { Team.Delete_Team(this) });
        $(document).on('change', '[id^=ddl_TeamDepartment]', function () { if ($(this).val() == -1) TeamDep.PopUp_TeamDep(this) });
    },

    PopUp_Team: function () {
        try {
            $('#div_ModalBody_Team').html('');
            Var_SC.html = '';
            var i = 0, TeamDepartment = '', TeamMember_Img = '', TeamDesc = '';
            Var_SC.objDepartment.arrData.length = 0;
            Var_SC.objTeam.arrData.length = 0;
            $('[id^=div_Department]').each(function (k, v) {
                if ($(this).attr('code') != 0) {
                    Var_SC.objDepartment.arrData.push({
                        'VALUE': $(this).attr('val'),
                        'CODE': $(this).attr('code')
                    });
                }
            });
            Var_SC.objDepartment.arrData.push({
                'VALUE': 'Add Update',
                'CODE': -1
            });

            $('[id^=a_TeamName]').each(function (k, v) {
                Team_Department_Code = Convert.objectToString($(this).closest('.rowTeam').find('[id^=div_TeamDepartment]').attr('code'), '');
                TeamMember_Img = Convert.objectToString($(this).closest('.rowTeam').find('[id^=img_Team]').attr('src'), '');
                TeamDesc = Convert.objectToString($(this).closest('.rowTeam').find('[id^=hdn_TeamDesc_]').val(), '');
                i++;
                Var_SC.html = '<div class="col-xs-12 row">'
                    + '<div class="col-xs-2">'
                    + '<select id="ddl_TeamDepartment_' + i + '" class="form-control" aria-describedby="basic-addon2"/>'
                    + '</div>'
                    + '<div class="col-xs-2">'
                    + '<img src="' + TeamMember_Img + '" is_change=0 alt="img/no-image.jpg" id="img_PopUpTeam_' + i + '" class="img cls_logo" title="Click to change team member images">'
                    + '<input id="file_Team_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
                    + '</div>'
                    + '<div class="col-xs-2">'
                    + '<input type="text" id="txt_TeamName_' + i + '" value="' + $(this).html() + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter team name" title="Enter team name"/>'
                    + '</div>'
                    + '<div class="col-xs-4">'
                    + '<input type="text" id="ta_TeamDesc_' + i + '" value="' + TeamDesc + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter team description" title="Enter team description"/>'
                    + '</div>'
                    + '<div class="col-xs-2">'
                    + '<a class="pointer" style="display:none;" id="a_AddTeam_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                    + '<a class="pointer" id="a_DeleteTeam_' + i + '"><i class="fa fa-minus"></i></a>'
                    + '</div>'
                    + '</div>';
                $('#div_ModalBody_Team').append(Var_SC.html);
                WMP_Common.BindDropDown($("#ddl_TeamDepartment_" + i + ""), Var_SC.objDepartment.arrData, true, Team_Department_Code, '');
            });

            $("#a_AddTeam_" + i + "").show();
            $('#div_Team_Modal').modal('show');
        }
        catch (ex) {
            console.log(ex);
        }
    },

    Set_Team: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objTeam.arrData = [];
        //Department
        Var_SC.objLstElmt.arrData.push('txt_TeamName');
        Var_SC.objLstElmt.arrData.push('ddl_TeamDepartment');
        Var_SC.objLstElmt.arrData.push('ta_TeamDesc');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('.cls_Department').html('');
        Var_SC.html = '';
        var i = 1, totalDep = 0;
        $('[id^=txt_TeamName]').each(function (k, v) {
            Team_Department_Code = Convert.objectToString($(this).closest('.row').find('[id^=ddl_TeamDepartment]').val(), '');
            Var_SC.objTeam.arrData.push({
                'Team_Department_Code': Team_Department_Code,
                'Team_Member_Name': $(this).html()
            });
        });

        totalDep = Var_SC.objTeam.arrData.length;
        Var_SC.html = '<div id="div_Department_0" data-filter="*" class="cbp-filter-item-active cbp-filter-item" val="All" code="0">'
            + 'All (<div class="cbp-filter-counter">' + totalDep + '</div>)'
            + '</div>';
        $('.cls_Department').append(Var_SC.html);

        $(Var_SC.objDepartment.arrData).each(function (k, v) {
            if (v.CODE == -1)
                return false;
            var tmpobj = $.grep(Var_SC.objTeam.arrData, function (gv) {
                if (gv.Team_Department_Code == v.CODE) {
                    return gv;
                }
            });
            i++;
            Var_SC.html = '<div id="div_Department_' + i + '" data-filter=".' + v.VALUE + '" class="cbp-filter-item" val="' + v.VALUE + '" code="' + v.CODE + '">'
                + '' + v.VALUE + ' (<div class="cbp-filter-counter">' + tmpobj.length + '</div>)'
                + '</div>'
            $('.cls_Department').append(Var_SC.html);
        });

        //Team
        //$('#div_Team').html('');
        Var_SC.html = ''; Team_Department_Val = '', Team_Department_Code = '', Team_Img = '', Team_Desc = '', i = 0;
        var activeCur = '', endActiveCur = '', tmp = '', segrate = 3, totalLen = 0;
        if ($('[id^=txt_TeamName]').length <= 3) {
            $('#a_lftArrTeam').hide();
            $('#a_rgtArrTeam').hide();
        }
        else {
            $('#a_lftArrTeam').show();
            $('#a_rgtArrTeam').show();
        }
        totalLen = $('[id^=txt_TeamName]').length;
        $('[id^=txt_TeamName]').each(function (k, v) {
            activeCur = '', endActiveCur = '',
                i++;
            Team_Department_Code = Convert.objectToString($(this).closest('.row').find('[id^=ddl_TeamDepartment]').val(), '');
            Team_Department_Val = Convert.objectToString($(this).closest('.row').find('[id^=ddl_TeamDepartment] option:selected').text(), '');
            Team_Img = Convert.objectToString($(this).closest('.row').find('[id^=img_PopUpTeam]').attr('src'), '');
            Team_IsChangeImg = Convert.objectToString($(this).closest('.row').find('[id^=img_PopUpTeam]').attr('is_change'), '');
            Team_Desc = Convert.objectToString($(this).closest('.row').find('[id^=ta_TeamDesc]').val(), '');
            if (i == 1)
                activeCur = '<div class="item active">';
            if (segrate == i && segrate != totalLen) {
                segrate = segrate + segrate;
                endActiveCur = '</div>'
                    + '<div class="item">';
            }
            if (segrate >= i) {
                Var_SC.html = Var_SC.html + '' + activeCur + '<div class="col-md-4 col-sm-6 rowTeam">'
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
                    + '<a class="cbp-singlePage cbp-l-grid-team-name" id="a_TeamName_' + i + '">' + $(this).val() + '</a>'
                    + '<div class="cbp-l-grid-team-position" id="div_TeamDepartment_' + i + '" code="' + Team_Department_Code + '">' + Team_Department_Val + '</div>'
                    + '<input type="hidden" id="hdn_TeamDesc_' + i + '"  value="' + Team_Desc + '"/>'
                    + '</div>' + endActiveCur + '';
            }
        });
        $('#div_Team').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Team: function (currThis) {
        Team_Department_Code = Convert.objectToString($(currThis).closest('.row').find('[id^=ddl_TeamDepartment]').val(), '');
        Team_Img = Convert.objectToString($(currThis).closest('.row').find('[id^=img_PopUpTeam]').attr('src'), '');
        TeamName = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_TeamName]').val(), '');
        Team_Desc = Convert.objectToString($(currThis).closest('.row').find('[id^=ta_TeamDesc]').val(), '');
        if (Convert.IsObjectNullOrEmpty(Team_Department_Code) && Convert.IsObjectNullOrEmpty(Team_Img) && Convert.IsObjectNullOrEmpty(TeamName) && Convert.IsObjectNullOrEmpty(Team_Desc)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-2">'
            + '<select id="ddl_TeamDepartment_' + i + '" class="form-control" aria-describedby="basic-addon2"/>'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<img src="../Content/Images/no-image.jpg" is_change=0 alt="img/no-image.jpg" id="img_PopUpTeam_' + i + '" class="img cls_logo" title="Add Team Member Images">'
            + '<input id="file_Team_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<input type="text" id="txt_TeamName_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter team name" title="Enter team name"/>'
            + '</div>'
            + '<div class="col-xs-4">'
            + '<input type="text" id="ta_TeamDesc_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter team name" title="Enter team name"/>'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddTeam_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteTeam_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Team').append(Var_SC.html);
        $("#" + currThis.id).hide();
        WMP_Common.BindDropDown($("#ddl_TeamDepartment_" + i + ""), Var_SC.objDepartment.arrData, true, '', '');
    },

    Delete_Team: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddTeam']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

    SetTeamImg: function (event, currThis) {
        var file = '', fileName = '';
        file = event.target.files;
        WMP_Common.ValidateImage(file);
        if (Var_SC.IsValid) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file[0]);
            oFReader.onload = function (oFREvent) {
                $(currThis).closest('div').find('[id^=img_PopUpTeam]').attr("src", oFREvent.target.result);
                $(currThis).closest('div').find('[id^=img_PopUpTeam]').attr("is_change", 1);
            };
        }
    },
};

var TeamDep = {

    IntializeTeamDep: function () {
        $(document).on('click', '[id=btn_AddUpdateTeamDep]', TeamDep.Set_TeamDep);
        $(document).on('click', '[id^=a_AddDept_Team]', function () { TeamDep.AddDept_Team(this) });
        $(document).on('click', '[id^=a_Delete_Dept_Team]', function () { TeamDep.DeleteDept_Team(this) });
    },

    PopUp_TeamDep: function () {
        $('#div_ModalBody_TeamDep').html('');
        Var_SC.html = '';
        var i = 0;
        $(Var_SC.objDepartment.arrData).each(function (k, v) {
            if (v.CODE != -1) {
                i++;
                Var_SC.html = ' <div class="col-xs-12 row">'
                    + '<div class="col-xs-10">'
                    + '<input type="text" id="txt_TeamDepName_' + i + '"  value="' + v.VALUE + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter team department name" title="Enter team department name" />'
                    + '</div>'
                    + '<div class="col-xs-2">'
                    + '<a class="pointer" style="display:none;"  id="a_AddDept_Team_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                    + '<a class="pointer" id="a_Delete_Dept_Team_' + i + '"><i class="fa fa-minus"></i></a>'
                    + '</div>'
                    + '</div>'

                $('#div_ModalBody_TeamDep').append(Var_SC.html);
            }
        });
        $("#a_AddDept_Team_" + i + "").show();
        $('#div_TeamDep_Modal').modal('show');
    },

    Set_TeamDep: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_TeamDepName');
        Var_SC.objLstElmt.arrData.push('ddl_TeamDepartment');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        Var_SC.objDepartment.arrData.length = 0;
        var i = 0;
        $('[id^=txt_TeamDepName]').each(function (k, v) {
            i++;
            Var_SC.objDepartment.arrData.push({
                'VALUE': $(this).val(),
                'CODE': i
            });
        });
        Var_SC.objDepartment.arrData.push({
            'VALUE': 'Add Update',
            'CODE': -1
        });
        $('[id^=ddl_TeamDepartment]').each(function () {
            WMP_Common.BindDropDown($(this), Var_SC.objDepartment.arrData, true, '', '');
        });
        $('#div_TeamDep_Modal').modal('hide');
    },

    AddDept_Team: function (currThis) {
        Team_Department_Value = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_TeamDepName]').val(), '');
        if (Convert.IsObjectNullOrEmpty(Team_Department_Value)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = ' <div class="col-xs-12 row">'
            + '<div class="col-xs-10">'
            + '<input type="text" id="txt_TeamDepName_' + i + '"  value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter team department name" title="Enter team department name" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_DepAddTeamDep_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteTeamDep_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>';
        $('#div_ModalBody_TeamDep').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    DeleteDept_Team: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddTeamDep']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },
}

//--==>Facility
var Fclty = {

    IntializeFclty: function () {
        $(document).on('click', '[id^=img_PopUpFacility]', function () { $(this).closest('div').find('[id^=file_PopUpFacility]').trigger('click'); });
        $(document).on('change', '[id^=file_PopUpFacility]', function () { WMP_Common.SetImg_TR(event, this, 'img_PopUpFacility', 2000); });//Fclty.Set_FcltyImg(event, this)
        $(document).on('click', '[id=a_EditFacility]', Fclty.PopUp_Fclty);
        $(document).on('click', '[id=btn_UpdateFacility]', Fclty.Set_Fclty);
        $(document).on('click', '[id^=a_AddFacility]', function () { Fclty.Add_Fclty(this) });
        $(document).on('click', '[id^=a_DeleteFacility]', function () { Fclty.Delete_Fclty(this) });
    },

    PopUp_Fclty: function () {
        $('#div_ModalBody_Fclty').html('');
        Var_SC.html = '';
        var i = 0;
        $('[id^=img_Facility]').each(function (k, v) {
            Facility_Img = Convert.objectToString($(this).closest('.rowFclty').find('[id^=img_Facility]').attr('src'), '');
            Facility_Title = Convert.objectToString($(this).closest('.rowFclty').find('[id^=a_FcltyTitle]').attr('title'), '');
            i++;
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-5">'
                + '<input type="text" id="txt_FcltyTitle_' + i + '" value="' + Facility_Title + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter facility title" title="Enter facility title" />'
                + '</div>'
                + '<div class="col-xs-5">'
                + '<img src="' + Facility_Img + '" is_change=0  alt="/Content/Images/no-image.jpg" id="img_PopUpFacility_' + i + '" class="img cls_logo" title="Add facility images">'
                + '<input id="file_PopUpFacility_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
                + ' </div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;" id="a_AddFacility_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteFacility_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Fclty').append(Var_SC.html);
        });
        $("#a_AddFacility_" + i + "").show();
        $('#div_Fclty_Modal').modal('show');
    },

    Set_Fclty: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_FcltyTitle');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        var i = 0, totalLen = 0;
        totalLen = $('[id^=txt_FcltyTitle]').length;
        $('#div_Facility').html('');
        Var_SC.html = '<div class="wow bounceInUp" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: bounceInUp;">'
            + '<div id="owl-works" class="owl-carousel owl-theme" style="opacity: 1; display: block;">'
            + '<div class="owl-wrapper-outer">'
            + '<div class="owl-wrapper" style="width: 3336px; left: 0px; display: block; transition: all 800ms ease 0s; transform: translate3d(-556px, 0px, 0px);">';
        $('[id^=txt_FcltyTitle]').each(function (k, v) {
            i++;
            Fclty_Img = Convert.objectToString($(this).closest('.row').find('[id^=img_PopUpFacility]').attr('src'), '');
            Fclty_IsChangeImg = Convert.objectToString($(this).closest('.row').find('[id^=img_PopUpFacility]').attr('is_change'), '');
            Var_SC.html = Var_SC.html + ' <div class="owl-item" style="width: 278px;">'
                + '<div class="item rowFclty"><a  id="a_FcltyTitle_' + i + '" href="' + Fclty_Img + '" title="' + Facility_Title + '" data-lightbox-gallery="gallery_' + i + '" data-lightbox-hidpi="' + Fclty_Img + '">'
                + '<img id="img_Facility_' + i + '" src="' + Fclty_Img + '" is_change="' + Fclty_IsChangeImg + '" class="img-responsive cls_img_Facility" alt="img">'
                + '</a>'
                + '</div>'
                + '</div>';
        });
        Var_SC.html = Var_SC.html + '</div></div>'
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
        $('#div_Facility').html(Var_SC.html);
        $(document).on('click', '[id=div_left]', function () { $('#div_right').removeClass('active'); $(this).addClass('active'); $('.owl-wrapper').css({ "width": "3336px", "left": "0px", "display": "block", "transition": "all 800ms ease 0s", "transform": "translate3d(0px, 0px, 0px)", }) });
        $(document).on('click', '[id=div_right]', function () { $('#div_left').removeClass('active'); $(this).addClass('active'); $('.owl-wrapper').css({ "width": "3336px", "left": "0px", "display": "block", "transition": "all 800ms ease 0s", "transform": "translate3d(-556px, 0px, 0px)", }) });
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Fclty: function (currThis) {
        FcltyTitle = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_FcltyTitle]').val(), '');
        Fclty_Img = Convert.objectToString($(currThis).closest('.row').find('[id^=img_PopUpFacility]').attr('src'), '');
        if (Convert.IsObjectNullOrEmpty(FcltyTitle) && Convert.IsObjectNullOrEmpty(Fclty_Img)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-5">'
            + '<input type="text" id="txt_FcltyTitle_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter facility title" title="Enter facility title" />'
            + '</div>'
            + '<div class="col-xs-5">'
            + '<img src="/Content/Images/no-image.jpg" is_change=0 alt="/Content/Images/no-image.jpg" id="img_PopUpFacility_' + i + '" class="img cls_logo" title="Add facility images">'
            + '<input id="file_PopUpFacility_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
            + ' </div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddFacility_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteFacility_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Fclty').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    Delete_Fclty: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddFacility']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

    Set_FcltyImg: function (event, currThis) {
        var file = '', fileName = '';
        file = event.target.files;
        WMP_Common.ValidateImage(file);
        if (Var_SC.IsValid) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file[0]);
            oFReader.onload = function (oFREvent) {
                $(currThis).closest('div').find('[id^=img_PopUpFacility]').attr("src", oFREvent.target.result);
            };
        }
    },
}

//--==>Feed Back
var FeedBk = {

    IntializeFeedBk: function () {
        $(document).on('click', '[id=a_Edit_FeedBk]', FeedBk.PopUp_FeedBk);
        $(document).on('click', '[id^=img_PopFeedBk]', function () { $(this).closest('div').find('[id^=file_FeedBk]').trigger('click'); });
        $(document).on('change', '[id^=file_FeedBk]', function () { WMP_Common.SetImg_TR(event, this, 'img_PopFeedBk', 2000); });//FeedBk.Set_FeedBkImg(event, this)
        $(document).on('click', '[id=btn_UpdateFeedBk]', FeedBk.Set_FeedBk);
        $(document).on('click', '[id^=a_AddFeedBk]', function () { FeedBk.Add_FeedBk(this) });
        $(document).on('click', '[id^=a_DeleteFeedBk]', function () { FeedBk.Delete_FeedBk(this); });
        $(document).on('click', '[id=a_Edit_FeedBk_BkGrnd_Img]', function () { $('#hdr_file_FeedBk_BkGrnd_Img').trigger('click'); });
        $(document).on('change', '[id=hdr_file_FeedBk_BkGrnd_Img]', function () { WMP_Common.SetImg_TR(event, this, 'img_FeedBk_BkGrnd_Img', 2000); });
    },

    PopUp_FeedBk: function () {
        $('#div_ModalBody_FeedBk').html('');
        Var_SC.html = '';
        var i = 0;

        $('[id^=a_FeedBk_Name]').each(function (k, v) {
            FeedBk_Title = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=a_FeedBk_Title]').html(), '');
            //FeedBk_Rate = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=span_FeedBk_Rate]').html(), ''); --remaning
            FeedBk_Desc = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Desc]').html(), '');
            FeedBk_Img = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=p_FeedBk_Img]').attr('src'), '');
            FeedBk_Loctn = Convert.objectToString($(this).closest('.rowFeedbk').find('[id^=span_FeedBk_Loctn]').html(), '');
            i++;
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-2">'
                + ' <input type="text" id="txt_FeedBk_Title_' + i + '"  value="' + FeedBk_Title + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback title" title="Enter feedback title" />'
                + '</div>'
                + '<div class="col-xs-1">'
                + '<input type="text" id="txt_FeedBk_Rate_' + i + '"  value="' + 5 + '" class="form-control allownumericwithoutdecimal" aria-describedby="basic-addon2" placeholder="Enter feedback rate" title="Enter feedback rate" />'
                + ' </div>'
                + '<div class="col-xs-2">'
                + '<textarea id="ta_FeedBk_Desc_' + i + '"  value="' + FeedBk_Desc + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback description" title="Enter feedback description">' + FeedBk_Desc + '</textarea>'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<img src="' + FeedBk_Img + '" id="img_PopFeedBk_' + i + '"  is_change=0 alt="/Content/Images/no-image.jpg"class="img cls_logo" title="Add Customer Images">'
                + '<input id="file_FeedBk_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<input type="text" id="txt_FeedBk_Name_' + i + '"  value="' + $(this).html() + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback name" title="Enter feedback name" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<input type="text" id="txt_FeedBk_Loctn_' + i + '"  value="' + FeedBk_Loctn + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback location" title="Enter feedback location" />'
                + ' </div>'
                + '<div class="col-xs-1">'
                + '<a class="pointer" style="display:none;"  id="a_AddFeedBk_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteFeedBk_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_FeedBk').append(Var_SC.html);
        });
        $("#a_AddFeedBk_" + i + "").show();
        WMP_Common.BindNumWidoutDecimal();
        $('#div_FeedBk_Modal').modal('show');
    },

    Set_FeedBk: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_FeedBk_Name');
        Var_SC.objLstElmt.arrData.push('txt_FeedBk_Title');
        Var_SC.objLstElmt.arrData.push('txt_FeedBk_Rate');
        Var_SC.objLstElmt.arrData.push('ta_FeedBk_Desc');
        Var_SC.objLstElmt.arrData.push('txt_FeedBk_Loctn');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        //$('#div_Team').html('');
        Var_SC.html = ''; FeedBk_Title = '', FeedBk_Rate = '', FeedBk_Desc = '', FeedBk_Img = '', FeedBk_Loctn = '', i = 0;
        var activeCur = '', endActiveCur = '', tmp = '', segrate = 3, totalLen = 0, rate_html = '';
        if ($('[id^=txt_FeedBk_Name]').length <= 3) {
            $('#a_lftArrowFeedbkp').hide();
            $('#a_rgtArrowFeedbkp').hide();
        }
        else {
            $('#a_lftArrowFeedbkp').show();
            $('#a_rgtArrowFeedbkp').show();
        }
        totalLen = $('[id^=txt_FeedBk_Name]').length;
        $('[id^=txt_FeedBk_Name]').each(function (k, v) {
            activeCur = '', endActiveCur = '', rate_html = '';
            i++;
            FeedBk_Title = Convert.objectToString($(this).closest('.row').find('[id^=txt_FeedBk_Title]').val(), '');
            FeedBk_Rate = Convert.objectToString($(this).closest('.row').find('[id^=txt_FeedBk_Rate]').val(), '');
            FeedBk_Desc = Convert.objectToString($(this).closest('.row').find('[id^=ta_FeedBk_Desc]').val(), '');
            FeedBk_Img = Convert.objectToString($(this).closest('.row').find('[id^=img_PopFeedBk]').attr('src'), '');
            FeedBk_Loctn = Convert.objectToString($(this).closest('.row').find('[id^=txt_FeedBk_Loctn]').val(), '');
            FeedBk_IsChangeImg = Convert.objectToString($(this).closest('.row').find('[id^=img_PopFeedBk]').attr('is_change'), '');

            //--==> get rate
            {
                for (j = 1; j <= 5; j++) {
                    if (FeedBk_Rate >= j)
                        rate_html = rate_html + '<span data-value=' + j + ' class="glyphicon glyphicon-star"></span>';
                    else
                        rate_html = rate_html + '<span data-value=' + j + ' class="glyphicon glyphicon-star-empty"></span>';
                }
            }
            if (i == 1)
                activeCur = '<div class="item active">';
            if (segrate == i && segrate != totalLen) {
                segrate = segrate + segrate;
                endActiveCur = '</div>'
                    + '<div class="item">';
            }
            if (segrate >= i) {
                Var_SC.html = Var_SC.html + '' + activeCur + '<div class="col-md-4 col-sm-6 rowFeedbk">'
                    + '<div class="block-text rel zmin">'
                    + '<a title="" href="#" id="a_FeedBk_Title_' + i + '">' + FeedBk_Title + '</a>'
                    + '<div class="mark">My rating: <span class="rating-input" id="span_FeedBk_Rate_' + i + '">' + rate_html + '</span></div>'
                    + '<p id="p_FeedBk_Desc_' + i + '">' + FeedBk_Desc + '</p>'
                    + '<ins class="ab zmin sprite sprite-i-triangle block"></ins>'
                    + '</div>'
                    + '<div class="person-text rel text-light">'
                    + '<img id="p_FeedBk_Img_' + i + '" src="' + FeedBk_Img + '" is_change="' + FeedBk_IsChangeImg + '" alt="" class="person img-circle" />'
                    + '<a id="a_FeedBk_Name_' + i + '" title="" href="#">' + $(this).val() + '</a>'
                    + '<span id="span_FeedBk_Loctn_' + i + '">' + FeedBk_Loctn + '</span>'
                    + '</div>'
                    + '</div>' + endActiveCur + '';
            }
        });
        $('#div_Feedbk').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_FeedBk: function (currThis) {
        FeedBk_Title = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_FeedBk_Title]').val(), '');
        FeedBk_Rate = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_FeedBk_Rate]').val(), '');
        FeedBk_Desc = Convert.objectToString($(currThis).closest('.row').find('[id^=ta_FeedBk_Desc]').attr('value'), '');
        FeedBk_Img = Convert.objectToString($(currThis).closest('.row').find('[id^=img_PopFeedBk]').attr('src'), '');
        FeedBk_Loctn = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_FeedBk_Loctn]').val(), '');
        if (Convert.IsObjectNullOrEmpty(FeedBk_Title) || Convert.IsObjectNullOrEmpty(FeedBk_Rate) || Convert.IsObjectNullOrEmpty(FeedBk_Desc) || Convert.IsObjectNullOrEmpty(FeedBk_Img) || Convert.IsObjectNullOrEmpty(FeedBk_Loctn)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-2">'
            + ' <input type="text" id="txt_FeedBk_Title_' + i + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback title" title="Enter feedback title" />'
            + '</div>'
            + '<div class="col-xs-1">'
            + '<input type="text" id="txt_FeedBk_Rate_' + i + '"  class="form-control allownumericwithoutdecimal" aria-describedby="basic-addon2" placeholder="Enter feedback rate" title="Enter feedback rate" />'
            + ' </div>'
            + '<div class="col-xs-2">'
            + '<textarea id="ta_FeedBk_Desc_' + i + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback description" title="Enter feedback description"></textarea>'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<img src="/Content/Images/no-image.jpg" id="img_PopFeedBk_' + i + '"  is_change=0 alt="/Content/Images/no-image.jpg" class="img cls_logo" title="Add Customer Images">'
            + '<input id="file_FeedBk_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<input type="text" id="txt_FeedBk_Name_' + i + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback name" title="Enter feedback name" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<input type="text" id="txt_FeedBk_Loctn_' + i + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter feedback location" title="Enter feedback location" />'
            + ' </div>'
            + '<div class="col-xs-1">'
            + '<a class="pointer" id="a_AddFeedBk_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteFeedBk_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'

        $('#div_ModalBody_FeedBk').append(Var_SC.html);
        WMP_Common.BindNumWidoutDecimal();
        $("#" + currThis.id).hide();
    },

    Delete_FeedBk: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddFeedBk']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

    Set_Hdr_BkGrnd_Img: function (event, currThis, imgID, lmtSize) {
        var file = '', fileName = '';
        file = event.target.files;
        WMP_Common.ValidateImage(file);
        if (Var_SC.IsValid) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file[0]);
            oFReader.onload = function (oFREvent) {
                $(currThis).closest('div').find('[id^=' + imgID + ']').attr("src", oFREvent.target.result);
                $(currThis).closest('div').find('[id^=' + imgID + ']').attr("is_change", 1);
                $('#testimonial').css({ 'background': 'url(' + oFREvent.target.result + ') no-repeat top center;' })
            };
        }
        else {
            WMP_Common.PopUpErrorMsg("Invalid image");
        }
    },
}

//--==>Packages
var Packs = {

    IntializePacks: function () {
        $(document).on('click', '[id=a_EditPackage]', Packs.PopUp_Packs);
        $(document).on('click', '[id=btn_UpdatePacks]', Packs.Set_Packs);
        $(document).on('click', '[id^=a_AddPacks]', function () { Packs.Add_Packs(this) });
        $(document).on('click', '[id^=a_DeletePacks]', function () { Packs.Delete_Packs(this) });
        //pack point
        $(document).on('click', '[id^=i_Pack_Point]', function () { Packs.PopUp_PacksPoints(this) });
        $(document).on('click', '[id=btn_UpdatePacksPoints]', function () { Packs.Set_PacksPoint(this) });
        $(document).on('click', '[id^=a_AddPointsPacks]', function () { Packs.Add_PacksPoint(this) });
        $(document).on('click', '[id^=a_DeletePointsPacks]', function () { WMP_Common.Delete_TR(this, 'a_AddPointsPacks') });

    },

    PopUp_Packs: function () {
        $('#div_ModalBody_Packs').html('');
        Var_SC.html = '';
        var i = 0, arr_Sub_Name = [];

        $('[id^=h2_Package_Name]').each(function (k, v) {
            arr_Sub_Name.push(Convert.objectToString($(this).closest('.rowPack').find('[id^=h3_Pack_Sub_Name]').html(), '').trim());
            Pack_Point = '', Is_Pack_Del = '';
            $(this).closest('.rowPack').find('[id^=li_Pack_Point]').each(function (k, v) {
                Pack_Point = Pack_Point + Convert.objectToString($(this).find('.cls_strong_Pack_Point').html(), '') + '^';
                Is_Pack_Del = Is_Pack_Del + ($(this).find('del').length > 0 ? 1 : 0) + '^';
            });
            Pack_Point = Pack_Point.slice(0, -1);
            Is_Pack_Del = Is_Pack_Del.slice(0, -1);
            Pack_BTN_HDR_Name = Convert.objectToString($(this).closest('.rowPack').find('[id^=a_Pack_Btn_HDR_Name]').html(), '');
            i++;

            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-3">'
                + '<input type="text" id="txt_Package_Name_' + i + '" value="' + $(this).html() + '"class="form-control" aria-describedby="basic-addon2" placeholder="Enter package name" title="Enter package name" />'
                + '</div>'
                + '<div class="col-xs-4">'
                + ' <input type="text" id="txt_Pack_Sub_Name_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter package price" title="Enter package sub name" />'
                + ' </div>'
                + '<div class="col-xs-1">'
                + ' <i class="fa fa-list-alt fa-1x circled bg-skin pointer" id="i_Pack_Point_' + i + '"></i>'
                + '<input type="hidden" id="hdn_Pack_Point_' + i + '" value="' + Pack_Point + '"/>'
                + '<input type="hidden" id="hdn_Is_Pack_Chk_' + i + '" value="' + Is_Pack_Del + '"/>'
                + ' </div>'
                + '<div class="col-xs-2">'
                + ' <input type="text" id="txt_PackBtnHDRName_' + i + '" value="' + Pack_BTN_HDR_Name + '"  class="form-control" aria-describedby="basic-addon2" placeholder="Enter package button hdr name" title="Enter package button hdr name" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + ' <a class="pointer" style="display:none;" id="a_AddPacks_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeletePacks_' + i + '"><i class="fa fa-minus"></i></a>'
                + ' </div>'
                + ' </div>';
            $('#div_ModalBody_Packs').append(Var_SC.html);
        });
        WMP_Common.BindNumWidoutDecimal();
        $('[id^=txt_Pack_Sub_Name]').each(function (k, v) {
            $(this).val(arr_Sub_Name[k]);
        });
        $("#a_AddPacks_" + i + "").show();
        $('#div_Packs_Modal').modal('show');
    },

    Set_Packs: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_Package_Name');
        Var_SC.objLstElmt.arrData.push('txt_Package_Price');
        Var_SC.objLstElmt.arrData.push('txt_Package_Price_Per');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#div_Package').html('');
        Var_SC.html = '';
        var Pack_Name = '', Pack_Sub_Name = '', Pack_Point = '', point_Html = '', i_point = 0, iSDel = 0, delStartHtml = '',
            delEndHtml = '', icon = '', fa_times = '', featured_price = '', activeCur = '', endActiveCur = '', tmp = '', segrate = 3, featured = '', i = 0,
            middleDiv = 2; animtn = 1, totalLen = 0;
        if ($('[id^=txt_Package_Name]').length <= 3) {
            $('#a_lftArrowPack').hide();
            $('#a_rgtArrowPack').hide();
        }
        else {
            $('#a_lftArrowPack').show();
            $('#a_rgtArrowPack').show();
        }
        totalLen = $('[id^=txt_Package_Name]').length;
        $('[id^=txt_Package_Name]').each(function (k, v) {
            activeCur = '', endActiveCur = '', featured = '', point_Html = '', i_point = 0;
            i++;
            Pack_Sub_Name = Convert.objectToString($(this).closest('.row').find('[id^=txt_Pack_Sub_Name]').val(), '');
            Pack_Point = Convert.objectToString($(this).closest('.row').find('[id^=hdn_Pack_Point]').val(), '');
            IsPackPointChk = Convert.objectToString($(this).closest('.row').find('[id^=hdn_Is_Pack_Chk]').val(), '');
            arrPack_Point = Pack_Point.split('^');
            arrPack_PointChk = IsPackPointChk.split('^');
            $(arrPack_Point).each(function (k, v) {
                i_point++;
                iSDel = Convert.objectToInt(arrPack_PointChk[k], 0);
                if (iSDel == 1) {
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
                    + '' + delStartHtml + '<strong class="cls_strong_Pack_Point">' + v + '</strong>' + delEndHtml + ''
                    + '<i class="fa ' + fa_times + ' icon-' + icon + '"></i>'
                    + '</li > ';
            });
            PackBtnHDRName = Convert.objectToString($(this).closest('.row').find('[id^=txt_PackBtnHDRName]').val(), '');
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
                featured = 'general'
                animtn = 1;
            }
            html_Pack_Point = '';
            i_PackPoint = 0;
            $(arrPack_Point).each(function (k, v) {
                i_PackPoint++;
                html_Pack_Point += '<li id="li_Pack_Point_' + i_PackPoint + '">' + v + '</li>'
            });

            if (segrate >= i) {
                Var_SC.html = Var_SC.html + '' + activeCur + '<div class="col-sm-4 pricing-box ' + featured_price + ' rowPack">'
                    + '<div class="wow bounceInUp" data-wow-delay="0.' + animtn + 's">'
                    + '<div class="pricing-content ' + featured + '">'
                    + '<h2 id="h2_Package_Name_' + i + '">' + $(this).val() + '</h2>'
                    + '<h3 id="h3_Pack_Sub_Name_' + i + '">' + Pack_Sub_Name + '</h3>'
                    + '<ul id="ul_Pack_Point_' + i + '">' + point_Html + '</ul>'
                    + '<div class="price-bottom">'
                    + ' <a href="#" class="btn btn-skin btn-lg" id="a_Pack_Btn_HDR_Name_' + i + '">' + PackBtnHDRName + '</a>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '</div>' + endActiveCur + '';
            }
        });
        $('#div_Package').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Packs: function (currThis) {
        Pack_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_Package_Name]').val(), '');
        Pack_Sub_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_Pack_Sub_Name]').val(), '');
        Pack_Point = Convert.objectToString($(currThis).closest('.row').find('[id^=hdn_Pack_Point]').val(), '');
        Pack_BTN_HDR_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_PackBtnHDRName]').val(), '');

        if (Convert.IsObjectNullOrEmpty(Pack_Name) || Convert.IsObjectNullOrEmpty(Pack_Sub_Name) || Convert.IsObjectNullOrEmpty(Pack_Point) || Convert.IsObjectNullOrEmpty(Pack_BTN_HDR_Name)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-3">'
            + '<input type="text" id="txt_Package_Name_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter package name" title="Enter package name" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + ' <input type="text" id="txt_Package_Price_' + i + '" value="" class="form-control allownumericwithoutdecimal" aria-describedby="basic-addon2" placeholder="Enter package price" title="Enter package price" />'
            + ' </div>'
            + '<div class="col-xs-2">'
            + '<input type="text" id="txt_Package_Price_Per_' + i + '" value=""  class="form-control" aria-describedby="basic-addon2" placeholder="Enter price per" title="Enter price per" />'
            + ' </div>'
            + '<div class="col-xs-1">'
            + ' <i class="fa fa-list-alt fa-1x circled bg-skin" id="i_Pack_Point_' + i + '" pointDet=""></i>'
            + '<input type="hidden" id="hdn_Pack_Point_' + i + '" value=""/>'
            + '<input type="hidden" id="hdn_Is_Pack_Chk_' + i + '" value=""/>'
            + '<input type="hidden" id="hdn_pointDet_' + i + '"/>'
            + ' </div>'
            + '<div class="col-xs-2">'
            + ' <input type="text" id="txt_PackBtnHDRName_' + i + '" value=""  class="form-control" aria-describedby="basic-addon2" placeholder="Enter package button hdr name" title="Enter package button hdr name" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + ' <a class="pointer" id="a_AddPacks_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeletePacks_' + i + '"><i class="fa fa-minus"></i></a>'
            + ' </div>'
            + ' </div>'
        $('#div_ModalBody_Packs').append(Var_SC.html);
        $("#" + currThis.id).hide();
        WMP_Common.BindNumWidoutDecimal();
    },

    Delete_Packs: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddPacks']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

    //--==============Pack Point=============--//

    PopUp_PacksPoints: function (currThis) {
        Var_SC.packPointCurrThis = currThis;
        $('#div_PacksPoints').modal('hide');
        $('#div_ModalBody_PacksPoints').html('');
        Var_SC.html = '';
        var i = 0, arrPackPoint = [], arrIsPackPointChk = [], isPackPointChk = '';

        Pack_Point = Convert.objectToString($(currThis).closest('div').find('[id^=hdn_Pack_Point]').val().toString().trim(), '');
        Is_Pack_Chk = Convert.objectToString($(currThis).closest('div').find('[id^=hdn_Is_Pack_Chk]').val(), '');
        arrPackPoint = Pack_Point.split('^');
        arrIsPackPointChk = Is_Pack_Chk.split('^');
        $(arrPackPoint).each(function (k, v) {
            i++;
            isPackPointChk = Convert.objectToInt(arrIsPackPointChk[k], 0) == 1 ? 'checked' : 'unchecked';
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-8">'
                + '<input type="text" id="txt_PackagePoints_' + i + '" value="' + v + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter package point" title="Enter package point" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<input type="checkbox" id="chk_IsPackPointsChk_' + i + '" ' + isPackPointChk + '>'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;" id="a_AddPointsPacks_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeletePointsPacks_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>';
            $('#div_ModalBody_PacksPoints').append(Var_SC.html);

        });
        $("#a_AddPointsPacks_" + i + "").show();
        $('#div_PacksPoints').modal('show');
    },

    Set_PacksPoint: function (currThis) {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_PackagePoints');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        var Pack_Point = '', Is_Pack_Point_Chk = '', i = 0;
        $('[id^=txt_PackagePoints]').each(function (k, v) {
            i++;
            Pack_Point = Pack_Point + $(this).val() + '^';
            Is_Pack_Point_Chk = Is_Pack_Point_Chk + (Convert.objectToBool($(this).closest('.row').find('[id^=chk_IsPackPointsChk]').prop('checked'), 0) ? '1' : 0) + '^';
        });
        $(Var_SC.packPointCurrThis).closest('div').find('[id^=hdn_Pack_Point]').val(Pack_Point.slice(0, -1));
        $(Var_SC.packPointCurrThis).closest('div').find('[id^=hdn_Is_Pack_Chk]').val(Is_Pack_Point_Chk.slice(0, -1));
        $('#div_PacksPoints').modal('hide');
    },

    Add_PacksPoint: function (currThis) {
        Pack_NamePoint = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_PackagePoints]').val(), '');
        Is_Pack_Point_Chk = Convert.objectToInt($(currThis).closest('.row').find('[id^=chk_IsPackPointsChk]').val(), 0);

        if (Convert.IsObjectNullOrEmpty(Pack_NamePoint) || Convert.IsObjectNullOrEmpty(Is_Pack_Point_Chk)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-8">'
            + '<input type="text" id="txt_PackagePoints_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter package point" title="Enter package point" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<input type="checkbox" id="chk_IsPackPointsChk_' + i + '">'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddPointsPacks_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeletePointsPacks_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>';
        $('#div_ModalBody_PacksPoints').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    Delete_PacksPoint: function (currThis) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='a_AddPointsPacks']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },


};

//--==>Partner
var Partner = {

    IntializePartner: function () {
        $(document).on('click', '[id=a_Edit_Partner]', Partner.PopUp_Partner);
        $(document).on('click', '[id^=img_PopPartner]', function () { $(this).closest('div').find('[id^=file_Partner]').trigger('click'); });
        $(document).on('change', '[id^=file_Partner]', function () { WMP_Common.SetImg_TR(event, this, 'img_PopPartner', 2000) });
        $(document).on('click', '[id=btn_UpdatePartner]', Partner.Set_Partner);
        $(document).on('click', '[id^=a_AddPartner]', function () { Partner.Add_Partner(this) });
        $(document).on('click', '[id^=a_DeletePartner]', function () { WMP_Common.Delete_TR(this, 'a_AddPartner') });
    },

    PopUp_Partner: function () {
        $('#div_ModalBody_Partner').html('');
        Var_SC.html = '';
        var i = 0;

        $('[id^=img_Partner]').each(function (k, v) {
            i++;
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-10">'
                + '<img src="' + $(this).attr('src') + '" is_change=0 alt="/Content/Images/no-image.jpg" id="img_PopPartner_' + i + '" class="img cls_logo" title="Add Partner Images">'
                + '<input id="file_Partner_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
                + ' </div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;"  id="a_AddPartner_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeletePartner_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Partner').append(Var_SC.html);
        });
        $("#a_AddPartner_" + i + "").show();
        $('#div_Partner_Modal').modal('show');
    },

    Set_Partner: function () {
        //$('#div_Team').html('');
        Var_SC.html = ''; Partner_Img = '', i = 0;
        var activeCur = '', endActiveCur = '', tmp = '', segrate = 4, totalLen = 0;
        if ($('[id^=img_PopPartner]').length <= 4) {
            $('#a_lftArrowPartner').hide();
            $('#a_rgtArrowPartner').hide();
        }
        else {
            $('#a_lftArrowPartner').show();
            $('#a_rgtArrowPartner').show();
        }
        totalLen = $('[id^=img_PopPartner]').length;
        $('[id^=img_PopPartner]').each(function (k, v) {
            activeCur = '', endActiveCur = '',
                i++;
            Partner_Img = Convert.objectToString($(this).closest('.row').find('[id^=img_PopPartner]').attr('src'), '');
            Partner_IsChangeImg = Convert.objectToString($(this).closest('.row').find('[id^=img_PopPartner]').attr('is_change'), '');
            if (i == 1)
                activeCur = '<div class="item active">';
            if (segrate == i && segrate != totalLen) {
                segrate = segrate + segrate;
                endActiveCur = '</div>'
                    + '<div class="item">';
            }
            Var_SC.html += '' + activeCur + '<div class="col-sm-6 col-md-3">'
                + '<div class="partner">'
                + '<a href="#"><img id="img_Partner_' + i + '" src="' + Partner_Img + '" is_change="' + Partner_IsChangeImg + '" alt="" class="img-responsive cls_img_Partner"/></a>'
                + '</div>'
                + '</div>' + endActiveCur + '';
        });
        $('#div_Partner').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Partner: function (currThis) {
        Partner_Img = Convert.objectToString($(currThis).closest('.row').find('[id^=img_PopPartner]').attr('src'), '');
        if (Convert.IsObjectNullOrEmpty(Partner_Img)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        var i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-10">'
            + '<img src="/Content/Images/no-image.jpg" alt="/Content/Images/no-image.jpg" is_change=0 id="img_PopPartner_' + i + '" class="img cls_logo" title="Add Partner Images">'
            + '<input id="file_Partner_' + i + '" type="file" accept="image/*" data-type="image" style="display:none;">'
            + ' </div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer"  id="a_AddPartner_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeletePartner_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'

        $('#div_ModalBody_Partner').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },
}

//--==>Information
var Info = {

    IntializeInfo: function () {
        $(document).on('click', '[id=a_Edit_Information]', Info.PopUp_Info);
        $(document).on('click', '[id=btn_UpdateInfo]', Info.Set_Info);
        $(document).on('click', '[id^=a_AddInfo]', function () { Info.Add_Info(this) });
        $(document).on('click', '[id^=a_DeleteInfo]', function () { WMP_Common.Delete_TR(this, 'a_AddInfo') });
    },

    PopUp_Info: function () {
        $('#div_ModalBody_Info').html('');
        Var_SC.html = '';
        var i = 0;

        $('[id^=a_info]').each(function (k, v) {
            i++;

            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-10">'
                + ' <input type="text" id="txt_Info_' + i + '" value="' + $(this).html() + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company info" title="Enter company info" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;"  id="a_AddInfo_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteInfo_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Info').append(Var_SC.html);
        });
        $("#a_AddInfo_" + i + "").show();
        $('#div_Info_Modal').modal('show');
    },

    Set_Info: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_Info');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#ul_Information').html('');
        Var_SC.html = '';
        var Info_Name = '', i = 0, edit = '';
        $('[id^=txt_Info]').each(function (k, v) {
            edit = '';
            if (k == 0)
                edit = '<a class="cls_EditWeb" id="a_Edit_Information"><i class="fa fa-edit"></i></a>';
            Var_SC.html += ' <li><a href="#" id="a_info_' + i + '">' + $(this).val() + '</a>' + edit + '</li>';
        });
        $('#ul_Information').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Info: function (currThis) {
        Info_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_Info]').val(), '');

        if (Convert.IsObjectNullOrEmpty(Info_Name)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-10">'
            + ' <input type="text" id="txt_Info_' + i + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company info" title="Enter company info" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddInfo_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteInfo_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Info').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },
}

//--==>Contact
var Contact = {

    IntializeContact: function () {
        $(document).on('click', '[id=a_Edit_Contact]', Contact.PopUp_Contact);
        $(document).on('click', '[id=btn_UpdateContact]', Contact.Set_Contact);
        $(document).on('click', '[id^=a_AddContact]', function () { Contact.Add_Contact(this) });
        $(document).on('click', '[id^=a_DeleteContact]', function () { WMP_Common.Delete_TR(this, 'a_AddContact') });
    },

    PopUp_Contact: function () {
        $('#div_ModalBody_Contact').html('');
        Var_SC.html = '';
        var i = 0, contactIcon = '';

        $('[id^=strong_ContactText]').each(function (k, v) {
            i++;
            contactIcon = $(this).closest('li').find('[id^=i_ContactIcon]').attr('class');
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-5">'
                + ' <input type="text" id="txt_ContactName_' + i + '" value="' + $(this).html() + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company contact" title="Enter company contact" />'
                + '</div>'
                + '<div class="col-xs-5">'
                + ' <input type="text" id="txt_ContactIcon_' + i + '" value="' + contactIcon + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company icon" title="Enter company icon" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;"  id="a_AddContact_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteContact_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Contact').append(Var_SC.html);
        });
        $("#a_AddContact_" + i + "").show();
        $('#div_Contact_Modal').modal('show');
    },

    Set_Contact: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_ContactName');
        Var_SC.objLstElmt.arrData.push('txt_ContactIcon');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#ul_Contact').html('');
        Var_SC.html = '';
        var contactIcon = '', i = 0, edit_Html = '';
        $('[id^=txt_ContactName]').each(function (k, v) {
            i++;
            edit_Html = '';
            contactIcon = Convert.objectToString($(this).closest('.row').find('[id^=txt_ContactIcon]').val(), '');
            if (k == 0)
                edit_Html = '<a class="cls_EditWeb" id="a_Edit_Contact"><i class="fa fa-edit"></i></a>';
            Var_SC.html += '<li>'
                + '<span class="fa-stack fa-lg">'
                + '<i class="fa fa-circle fa-stack-2x"></i>'
                + '<i id="i_ContactIcon_' + i + '" class="' + contactIcon + '"></i>'
                + '</span> <strong id="strong_ContactText_' + i + '">' + $(this).val() + '</strong>'
                + '' + edit_Html + '</li >';
        });
        $('#ul_Contact').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Contact: function (currThis) {
        Contact_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_Contact]').val(), '');

        if (Convert.IsObjectNullOrEmpty(Contact_Name)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-5">'
            + ' <input type="text" id="txt_ContactName_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company contact" title="Enter company contact" />'
            + '</div>'
            + '<div class="col-xs-5">'
            + ' <input type="text" id="txt_ContactIcon_' + i + '" value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company icon" title="Enter company icon" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddContact_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteContact_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Contact').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

}

//--==>SocialNtwk
var SocialNtwk = {

    IntializeSocialNtwk: function () {
        $(document).on('click', '[id=a_Edit_SocailNtwk]', SocialNtwk.PopUp_SocialNtwk);
        $(document).on('click', '[id=btn_UpdateSocialNtwk]', SocialNtwk.Set_SocialNtwk);
        $(document).on('click', '[id^=a_AddSocialNtwk]', function () { SocialNtwk.Add_SocialNtwk(this) });
        $(document).on('click', '[id^=a_DeleteSocialNtwk]', function () { WMP_Common.Delete_TR(this, 'a_AddSocialNtwk') });
    },

    PopUp_SocialNtwk: function () {
        $('#div_ModalBody_SocialNtwk').html('');
        Var_SC.html = '';
        var i = 0, socialNtwkHref = '', socialNtwkIcon = '';

        $('[id^=li_SocailNtwkName]').each(function (k, v) {
            i++;
            socialNtwkHref = $(this).find('[id^=a_SocailNtwkHref]').attr('href');
            socialNtwkIcon = $(this).find('[id^=i_SocailNtwkIcon]').attr('class');
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-4">'
                + ' <input type="text" id="txt_SocialNtwkHref_' + i + '"  value="' + socialNtwkHref + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company social Ntwk Href" title="Enter company social Ntwk Href" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + ' <input type="text" id="txt_SocialNtwkName_' + i + '"  value="' + $(this).attr('class') + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company SocialNtwk" title="Enter company SocialNtwk" />'
                + '</div>'
                + '<div class="col-xs-4">'
                + ' <input type="text" id="txt_SocialNtwkIcon_' + i + '"  value="' + socialNtwkIcon + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company SocialNtwk" title="Enter company SocialNtwk" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;"  id="a_AddSocialNtwk_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteSocialNtwk_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>';
            $('#div_ModalBody_SocialNtwk').append(Var_SC.html);
        });
        $("#a_AddSocialNtwk_" + i + "").show();
        $('#div_SocialNtwk_Modal').modal('show');
    },

    Set_SocialNtwk: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_SocialNtwkName');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#ul_SocailNtwk').html('');
        Var_SC.html = '';
        var socialNtwkHref = '', socialNtwkIcon = '', i = 0;
        $('[id^=txt_SocialNtwkName]').each(function (k, v) {
            i++;
            socialNtwkHref = $(this).closest('.row').find('[id^=txt_SocialNtwkHref]').val();
            socialNtwkIcon = $(this).closest('.row').find('[id^=txt_SocialNtwkIcon]').val();
            Var_SC.html += '<li id="li_SocailNtwkName_' + i + '" class="' + $(this).val() + '">'
                + '<a id="a_SocailNtwkHref_' + i + '" href = "' + socialNtwkHref + '" target="_blank"> <i id="i_SocailNtwkIcon_' + i + '" class="' + socialNtwkIcon + '"></i></a>'
                + '</li>';
        });
        $('#ul_SocailNtwk').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_SocialNtwk: function (currThis) {
        SocialNtwk_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_SocialNtwk]').val(), '');

        if (Convert.IsObjectNullOrEmpty(SocialNtwk_Name)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-4">'
            + ' <input type="text" id="txt_SocialNtwkHref_' + i + '"  value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company social Ntwk Href" title="Enter company social Ntwk Href" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + ' <input type="text" id="txt_SocialNtwkName_' + i + '"  value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company SocialNtwk" title="Enter company SocialNtwk" />'
            + '</div>'
            + '<div class="col-xs-4">'
            + ' <input type="text" id="txt_SocialNtwkIcon_' + i + '"  value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company SocialNtwk" title="Enter company SocialNtwk" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddSocialNtwk_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteSocialNtwk_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>';
        $('#div_ModalBody_SocialNtwk').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },
};

//--==>Field
var Field = {

    IntializeField: function () {
        $(document).on('click', '[id=a_Edit_Field]', Field.PopUp_Field);
        $(document).on('click', '[id=btn_UpdateField]', Field.Set_Field);
        $(document).on('click', '[id^=a_AddField]', function () { Field.Add_Field(this) });
        $(document).on('click', '[id^=a_DeleteField]', function () { WMP_Common.Delete_TR(this, 'a_AddField') });
    },

    PopUp_Field: function () {
        $('#div_ModalBody_Field').html('');
        Var_SC.html = '';
        var i = 0, lbl_FieldKey = '';
        $('[id^=lbl_FieldKey]').each(function (k, v) {
            i++;
            Var_SC.html = '<div class="col-xs-12 row">'
                + '<div class="col-xs-10">'
                + ' <input type="text" id="txt_ModalFieldName_' + i + '"  value="' + $(this).html() + '" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company field" title="Enter company field" />'
                + '</div>'
                + '<div class="col-xs-2">'
                + '<a class="pointer" style="display:none;"  id="a_AddField_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteField_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>'
            $('#div_ModalBody_Field').append(Var_SC.html);
        });
        $("#a_AddField_" + i + "").show();
        $('#div_Field_Modal').modal('show');
    },

    Set_Field: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_ModalFieldName');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        $('#form_Field').html('');
        Var_SC.html = '';
        var i = 0, edit_Html = '', startRow_Html = '', endRow_Html = '', segrate = 2, totalLen = 0;
        totalLen = $('[id^=txt_ModalFieldName]').length;

        $('[id^=txt_ModalFieldName]').each(function (k, v) {
            i++;
            edit_Html = '', startRow_Html = '', endRow_Html = '';
            if (i == 2)
                edit_Html = '<a class="cls_EditWeb cls_Absolute" id="a_Edit_Field"><i class="fa fa-edit"></i></a>';
            if (i == 1)
                startRow_Html = ' <div class="row">';
            if (segrate == i && segrate != totalLen) {
                segrate = segrate + segrate;
                endRow_Html = '</div>'
                    + '<div class="row">';
            }
            Var_SC.html += ' ' + startRow_Html + '<div class="col-xs-6 col-sm-6 col-md-6">'
                + '<div class="form-group">' + edit_Html + ''
                + '<label id="lbl_FieldKey_' + i + '">' + $(this).val() + '</label>'
                + '<input id="txt_FieldValue_' + i + '" type="text" class="form-control input-md">'
                + '</div>'
                + '</div>' + endRow_Html + '';
        });
        Var_SC.html = Var_SC.html + '<input type = "submit" value = "Submit" class="btn btn-skin btn-block btn-lg">'
            + '<p class="lead-footer">* We\'ll contact you by phone & email later</p>';
        $('#form_Field').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
    },

    Add_Field: function (currThis) {
        Field_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_ModalFieldName]').val(), '');

        if (Convert.IsObjectNullOrEmpty(Field_Name)) {
            $('#div_Error').html(WMP_Common.ErrorPopUp('Please enter the value'));
            $('#div_Error').modal('show');
            return false;
        }
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        Var_SC.html = '<div class="col-xs-12 row">'
            + '<div class="col-xs-10">'
            + ' <input type="text" id="txt_ModalFieldName_' + i + '"  value="" class="form-control" aria-describedby="basic-addon2" placeholder="Enter company Field" title="Enter company Field" />'
            + '</div>'
            + '<div class="col-xs-2">'
            + '<a class="pointer" id="a_AddField_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
            + '<a class="pointer" id="a_DeleteField_' + i + '"><i class="fa fa-minus"></i></a>'
            + '</div>'
            + '</div>'
        $('#div_ModalBody_Field').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },
}

//--==>Menu
var Menu = {

    IntializeMenu: function () {
        $(document).on('click', '[id=a_Edit_Menu]', Menu.PopUp_Menu);
        $(document).on('click', '[id=btn_UpdateMenu]', Menu.Set_Menu);
        $(document).on('click', '[id^=a_AddMenu]', function () { Menu.Add_Menu(this) });
        $(document).on('click', '[id^=a_DeleteMenu]', function () { Menu.Delete_TR(this, 'a_AddMenu'); });
        Var_SC.arrMenu = ['intro', 'product', 'team', 'facilities', 'pricing'];
        Menu.HideShowMenuHref(Var_SC.arrMenu);
    },

    PopUp_Menu: function () {
        if ($('#div_ModalMenu_Html').html() != '') {
            Var_SC.menuHtml = $('#div_ModalMenu_Html').html();
        }
        $('#div_ModalMenu_Html').html('');
        $('#div_ModalBody_Menu').html(Var_SC.menuHtml);
        $('[id^=txt_ModalMenuName]').removeClass('err');
        $('#div_Menu_Modal').modal('show');
    },

    Set_Menu: function () {
        Var_SC.objLstElmt.arrData = [];
        Var_SC.objLstElmt.arrData.push('txt_ModalMenuName');
        Var_SC.objLstElmt.arrData.push('txt_ModalMenuURL');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        Var_SC.html = '', arrMenu = [];
        var i = 0, edit_Html = '', len = 0, active = '', href = '', mainMenu = '', subMenu = '';
        len = $('[id^=txt_ModalMenuName]').length;
        $('[id^=txt_ModalMenuName]').each(function (k, v) {
            i++;
            edit_Html = '', active = '';
            if (k == 0)
                active = 'class="active"';
            if (Convert.objectToString($(this).closest('.row').find('[id^=a_DeleteMenu]').attr('subLi'), '') == '') {
                href = $(this).attr('hrefVal');
                arrMenu.push(href);
                mainMenu += '<li isUsed="1" ' + active + '><a href="#' + href + '">' + $(this).val() + '</a></li>';
            }
            else {
                if (subMenu == '') {
                    subMenu = '<li isUsed="0" class="dropdown">'
                        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <span class="badge custom-badge red pull-right">Extra</span>' + $('#txt_ModalSubMenuHdr').val() + ' <b class="caret"></b></a>'
                        + '<ul class="dropdown-menu">';
                }
                href = $(this).closest('.row').find('[id^=txt_ModalMenuURL]').val();
                subMenu += '<li subLi="1"><a href="' + href + '">' + $(this).val() + '</a></li>';
            }
        });
        if (subMenu != '')
            subMenu += '</ul></li>';

        Var_SC.html = mainMenu + subMenu;
        Var_SC.html += '<li isUsed="0"><a class="cls_EditWeb" id="a_Edit_Menu"><i class="fa fa-edit"></i></a></li>';
        $('#ul_Menu').html(Var_SC.html);
        $('.cls_UpdateModal').modal('hide');
        Menu.HideShowMenuHref(arrMenu);
    },

    Add_Menu: function (currThis) {
        Var_SC.objLstElmt.arrData = [];
        var bodyId = '';
        Var_SC.objLstElmt.arrData.push('txt_ModalMenuName');
        Var_SC.objLstElmt.arrData.push('txt_ModalMenuURL');
        if (!WMP_Common.ValidateTxt(Var_SC.objLstElmt.arrData)) {
            WMP_Common.MsgPopUp();
            return false;
        }
        //Menu_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_ModalMenuName]').val(), '');
        //Menu_Name = Convert.objectToString($(currThis).closest('.row').find('[id^=txt_ModalMenuName]').val(), '');
        i = Convert.objectToInt(WMP_Common.GetCurrIdCnt($(currThis).prop('id'))) + 1;
        if ($(currThis).closest('.row').find('[id^=a_DeleteMenu]').attr('subLi') == 'true') {
            bodyId = 'ol_ModalSubMenu';
            Var_SC.html = '<li>'
                + '<input type="text" value=""  hrefVal="NA" class="cls_MenuText" id="txt_ModalMenuName_' + i + '" /> &nbsp;'
                + '<input type="text" value="" class="cls_MenuText" placeholder="Enter the url" id="txt_ModalMenuURL_' + i + '" /> &nbsp;'
                + '<a class="pointer" id="a_AddMenu_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" subLi="true" id="a_DeleteMenu_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</li>';

        }
        else {
            if ($('#div_ModalMainMenu').find('.row').length > 4) {
                WMP_Common.MsgPopUp('Only 4 menu allowed');
                return false;
            }
            hrefVal = Menu.GetHref($('#div_ModalMainMenu').find('.row').length);
            bodyId = 'div_ModalMainMenu';
            Var_SC.html = '<div class="col-xs-12 row" >'
                + '<div class="col-xs-10">'
                + ' <ul>'
                + '<li>'
                + '<input type="text" value="" hrefVal="' + hrefVal + '" class="cls_MenuText" id="txt_ModalMenuName_' + i + '" />'
                + '</li>'
                + '</ul>'
                + '</div > '
                + '<div class="col-xs-2">'
                + '<a class="pointer" id="a_AddMenu_' + i + '"><i class="fa fa-plus"></i></a>&nbsp;&nbsp;'
                + '<a class="pointer" id="a_DeleteMenu_' + i + '"><i class="fa fa-minus"></i></a>'
                + '</div>'
                + '</div>';
        }
        $('#' + bodyId + '').append(Var_SC.html);
        $("#" + currThis.id).hide();
    },

    Delete_TR: function (currThis, addBtnId) {
        //var ConfirmDelete = confirm("Are you sure to delete this record ?");
        //if (!ConfirmDelete)
        //    return false;
        if ($(currThis).attr('subLi') == 'true') {
            $(currThis).closest('li').remove();
        }
        else {
            $(currThis).closest('.row').remove();
        }
        if ($('#div_ModalBody_Menu').find('ol li').length == 0)
            $('#div_ModalBody_Menu').find('[id=div_ModalMenuMore_TR]').remove();
        $('#div_ModalBody_Menu').find('[id^=a_AddMenu]').each(function () {
            lastControlID = this.id;
        });
        $('#div_ModalBody_Menu').find('[id^=' + lastControlID + ']').show();
    },

    GetHref: function (k) {
        var href = '';
        switch (k) {
            case 0:
                href = 'intro';
                break;
            case 1:
                href = 'product';
                break;
            case 2:
                href = 'intro'
                break;
            case 3:
                href = 'team';
                break;
            case 4:
                href = 'facilities';
                break;
            case 5:
                href = 'pricing'
                break;
        }
    },

    HideShowMenuHref: function (arrMenu) {
        $('#product').hide();
        $('#team').hide();
        $('#facilities').hide();
        $('#pricing').hide();
        $(arrMenu).each(function (k, v) {
            $('#' + v + '').show();
        });
    },
};

//--==> Company
var Company = {

    setComp: function () {
        try {
            var objTheme = $.parseJSON(VB_Theme);
            if (objTheme.status == 'success') {
                WMP_Common.BindDropDown($('#ddl_Theme'), $.parseJSON(objTheme.data), true);
            }
            if (!Convert.objectToBool(WebIsAdd)) {
                $('#btn_AddUpdate_Company').html('Update Website');
                VrVw.data = $.parseJSON(objWebViewData);
                var ComDet = $.parseJSON(VrVw.data.data).Company;
                $('#strg_CreateComp').html(ComDet[0].Company_Name);
                $('#txt_Company_Name').val(ComDet[0].Company_Name);
                $('#txt_Contact_Person').val(ComDet[0].Contact_Person);
                $('#txt_Company_Email').val(ComDet[0].Company_Email);

                $('#txt_Mob_1').val(ComDet[0].Mob_1);
                $('#txt_Tel_1').val(ComDet[0].Tel_1);
                $('#txt_Aadhar_Card_NO').val(ComDet[0].Aadhar_Card_NO);
                $('#txt_Pan_Card_No').val(ComDet[0].Pan_Card_No);

                $('#txt_Company_Specialist_In').val(ComDet[0].Company_Specialist_In);
                $('#txt_Company_Address').val(ComDet[0].Company_Address);
                var hdr = $.parseJSON(VrVw.data.data).Hdr[0];
                $('#ddl_Theme').val(hdr.ThemeID).attr("selected", "selected");
            }
        }
        catch (ex) {
            console.log("issue in view website=>Company :- " + ex.message);
            return false;
        }
    },
};



