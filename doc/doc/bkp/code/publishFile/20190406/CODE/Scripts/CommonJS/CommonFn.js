/***************************************************************************************************************
FILE NAME   :   WMP_Common.js
VERSION     :   1.0
PURPOSE     :   Common Operation functions
PROJECT     :   Birla
***************************************************************************************************************/
var init = { successFnName: '', IsValid:true, };

var WMP_Common = {

    //Ajax Call
    AjaxRequest: function (url, data, successFunction, asynced, type, dataType) {
        try {
            successFnName = successFunction.toString();
            if (Convert.IsStringNullOrEmpty(type)) type = 'POST';
            if (Convert.IsStringNullOrEmpty(dataType)) dataType = 'json';
            if (Convert.IsStringNullOrEmpty(asynced)) asynced = true;
            $.ajax({
                async: asynced,
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                success: successFunction,
                error: WMP_Common.LoadError,
                cache: false
            });
        }
        catch (ex) {
            console.log("Issue in WMP_Common->AjaxRequest :-  " + ex);
            WMP_Common.HideProcess();
            WMP_Common.LoadError("Issue in Ajax Request WMP_Common->AjaxRequest");
            //showErrMsg("There seems to be some error in AjaxRequest");
        }
    },

    //Ajax Error
    LoadError: function (err) {
        console.log("Issue in Ajax Request for success function loading having issue :- " + err);
        WMP_Common.HideProcess();
    },

    //Confirmation pop up 
    ConfirmataionPopUp: function (h2_ModalConfiramtionHeader, yesBtnClick) {
        var html = "<div class='modal-dialog'>"
            + "<div class='modal-content'>"
            + "<div class='modal-header'>"
            + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
            + "<i aria-hidden='true' class='fa fa-times-circle fa-lg'></i>"
            + "</button>"
            + "</div>"
            + "<div class='modal-body'>"
            + "<P>" + h2_ModalConfiramtionHeader + "</P>"
            + "</div>"
            + "<div class='modal-footer'>"
            + "<button type='button' id='btn_ComConfrmYes' class='btn btn-sm btn-info' onclick='" + yesBtnClick + "' data-dismiss='modal' autofocus>Yes</button>&nbsp;&nbsp;"
            + "<button type='button' class='btn btn-sm btn-default' data-dismiss='modal'>No</button>"
            + "</div>"
            + "</div>"
            + "</div>";
        $('#div_Error').html(html).modal("show");
        $("#btn_ComConfrmYes").focus();
    },

    //Error pop up
    ErrorPopUp: function (msg, onCloseFn, title) {
        onCloseFn = Convert.objectToString(onCloseFn, '');
        title = Convert.objectToString(title, 'Message');
        return ' <div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
            + '<i aria-hidden="true" class="fa fa-times-circle fa-lg"></i>'
            + '</button>'
            + '<h4 class="modal-title">' + title + '</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + "<P>" + msg + "</P>"
            + '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-sm btn-info" data-dismiss="modal" onclick="' + onCloseFn + '" autofocus>Close</button>'
            + '</div>'
            + '</div>'
            + '</div>'
    },

    ChkSessionLogOut: function (message) {
        if (message == 'session expired') {
            WMP_Common.CallLogout();
        }
        else {
            if (Convert.IsStringNullOrEmpty(message)) {
                WMP_Common.PopUpErrorMsg(message, 'warning');
                return false;
            }
            else {
                WMP_Common.PopUpErrorMsg("Internal server error");
                return false;
            }
        }
    },

    //If session expiry redirect to register page
    CallLogout: function () {
        console.log("call log out");
        window.location.href = registerUrl;
    },

    //Error pop up
    PopUpErrorMsg: function (msg) {
        msg = Convert.objectToString(msg, 'Something went wrong');
        $('#div_Error').html(WMP_Common.ErrorPopUp(msg));
        $('#div_Error').modal('show');
        return false;
    },

    //Show processing
    ShowProcess: function (msg) {
        msg = Convert.objectToString(msg, 'Processing');
        $("#processing-bar-holder span").html("&nbsp;&nbsp;" + msg);
        $("#processing-bar-holder").removeClass('in collapse').addClass('in');
        $('#modaloverlay').show();
    },

    //Hide processing
    HideProcess: function () {
        $('#modaloverlay').hide();
        $("#processing-bar-holder").removeClass('in collapse').addClass('collapse');
    },

    //Bind Drop Down
    BindDropDown: function (objControl, jsonToBind, IsSelectRequired, ValueToBeSelected, selectedText) {
        if (jsonToBind == '')
            objControl.append($("<option></option>").val(0).html('--No Data--'));
        if (!Convert.IsObjectNullOrEmpty(jsonToBind)) {
            objControl.empty();
            if (IsSelectRequired) {
                if (!Convert.IsStringNullOrEmpty(selectedText)) {
                    objControl.append($("<option></option>").val(0).html(selectedText));
                }
                else
                    objControl.append($("<option></option>").val(0).html('--Select--'));
            }
            $.each(jsonToBind, function (key, item) {
                objControl.append($("<option></option>").val(item.CODE).html(item.VALUE));
            });
            if (ValueToBeSelected != '' && ValueToBeSelected != undefined) {
                objControl.val(ValueToBeSelected).attr("selected", "selected");
            }
        }
    },

    //Get JQgrid
    CallJQGrid: function (id, objData, colName, colData, sortCol1Name, sortCol2Name, IsPagingEnable, IsSrNoEnable, IshideHorzitalBorder, sorttype, Isautowidth, loadCompleteFN) {
        var rowNum = 0;
        var idForPager = '';
        IsPagingEnable = Convert.IsObjectUndefinedOrNull(IsPagingEnable) ? false : IsPagingEnable;
        IsSrNoEnable = Convert.IsObjectUndefinedOrNull(IsSrNoEnable) ? false : IsSrNoEnable;
        IshideHorzitalBorder = Convert.IsObjectUndefinedOrNull(IshideHorzitalBorder) ? false : IshideHorzitalBorder;
        sorttype = Convert.IsObjectUndefinedOrNull(sorttype) ? 'string' : sorttype;
        Isautowidth = Convert.IsObjectUndefinedOrNull(Isautowidth) ? true : Isautowidth;
        if (IsPagingEnable) {
            idForPager = "pager_" + id.replace('#', '');
            $(id).after('<div id="' + idForPager + '"></div>');
            rowNum = 10;
            $('#' + idForPager).show();
        }
        else {
            rowNum = objData.length;
            $('#' + idForPager).show();
        }
        if (IshideHorzitalBorder) $('.ui-jqgrid-labels > tr.ui-row-ltr > td').css('border-bottom-color', 'transparent')
        jQuery(id).jqGrid({

            height: "auto",
            datatype: "local",
            data: objData,
            gridview: true,
            sortname: sortCol1Name,
            sorttype: sorttype,
            colNames: colName,
            colModel: colData,
            viewrecords: true,
            //scroll: 1,
            //autowidth: true,
            shrinkToFit: false,
            //autowidth: Isautowidth,
            cmTemplate: { title: false },
            rownumbers: IsSrNoEnable,
            rowNum: rowNum,
            rowList: [10, 20, 30],
            pager: '#' + idForPager,
            emptyrecords: "No records to display",
            loadComplete: loadCompleteFN,
        });
        jQuery(id).jqGrid('clearGridData');
        jQuery(id).jqGrid('setGridParam', { data: objData });
        jQuery(id).trigger('reloadGrid');
        //$(id)[0].updatepager(false, true);
    },

    //Smart search in JQGrid
    CallJQGrid_SmartSearch: function (jqGridID, searchText, colName) {
        try {
            $grid = $('#' + jqGridID);
            var postData = $grid.jqGrid("getGridParam", "postData"),
                colModel = $grid.jqGrid("getGridParam", "colModel"),
                rules = [],
                l = colModel.length,
                i,
                cm;
            for (i = 0; i < l; i++) {
                cm = colModel[i];
                if (cm.search !== false && (cm.stype === undefined || cm.stype === "text")) {
                    rules.push({
                        field: Convert.IsObjectUndefinedOrNull(colName) ? cm.name : colName,
                        op: "cn",
                        data: searchText
                    });
                }
            }
            postData.filters = JSON.stringify({
                groupOp: "OR",
                rules: rules
            });
            $grid.jqGrid("setGridParam", { search: true });
            $grid.trigger("reloadGrid", [{ page: 1, current: true }]);
        }
        catch (ex) {
            console.log(ex);
            //errorFunction(ex);
            //Common.AlertPopUp("No record found", 'green');
            return false;
        }
    },

    //Find Index By Value in any array
    FindIndexByVal: function (arr, key, val, valueifNull) {
        var index;
        try {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i][key] == val) {
                    index = i;
                    break;
                }
            }
            if (Convert.IsObjectUndefinedOrNull(index)) index = valueifNull;
        }
        catch (ex) {
            index = valueifNull;
        }
        return index;
    },

    //Get current id count
    GetCurrIdCnt: function (id) {
        var arr = id.split('_');
        return arr[arr.length - 1];
    },

    //Msg pop
    MsgPopUp: function (msg) {
        msg = Convert.objectToString(msg, 'Please enter the value');
        $('#div_Error').html(WMP_Common.ErrorPopUp(msg));
        $('#div_Error').modal('show');
    },

    //To handle numeric without decimal 
    BindNumWidoutDecimal: function () {
        $(".allownumericwithoutdecimal").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));   // issues getting in Mozilla browser
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

    },

    //To handle numeric with decimal 
    BindNumWidDecimal: function () {
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
    },

    //Delete TR
    Delete_TR: function (currThis, addBtnId) {
        var ConfirmDelete = confirm("Are you sure to delete this record ?");
        if (ConfirmDelete) {
            $(currThis).closest('.row').remove();
            $("[id^='" + addBtnId + "']").each(function () {
                lastControlID = this.id;
            });
            $("#" + lastControlID).show();
        }
        else {
            return false;
        }
    },

    //Set image in tr
    SetImg_TR: function (event, currThis, imgID, lmtSize) {

        var file = '', fileName = '';
        file = event.target.files;
        WMP_Common.ValidateImage(file);
        if (init.IsValid) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file[0]);
            oFReader.onload = function (oFREvent) {
                $(currThis).closest('div').find('[id^=' + imgID + ']').attr("src", oFREvent.target.result);
                $(currThis).closest('div').find('[id^=' + imgID + ']').attr("is_change", 1);
            };
        }
        else {
            WMP_Common.PopUpErrorMsg("Invalid image");
        }
    },

    //Validate image 
    ValidateImage: function (file) {
        lmtSize = 998221;
        IsValid = true, InvalidMsg = '', errorImgCount = 0;
        if (file.length < 0) {
            IsValid = false;
            InvalidMsg += '<br>.Please select image';
            errorImgCount++;
        }
        if (file[0].size > lmtSize) {
            IsValid = false;
            InvalidMsg += '<br>.Image size should be less than ' + lmtSize + ' bytes';
            errorImgCount++;
        }
        if (!file[0].name.match(/\.(jpg|jpeg|png|PNG)$/)) {
            IsValid = false;
            InvalidMsg += '<br>.Only jpg,jpeg & png image allowed';
            errorImgCount++;
        }
        init.IsValid = IsValid;
        //console.log('errorImgCount:- ' + errorImgCount + 'InvalidMsg:- ' + InvalidMsg);
    },

    //To map the child & parent of menu
    BuildParentChildRelationShip: function (objMenuList) {
        var source = [];
        var items = [];
        // build hierarchical source.
        for (i = 0; i < objMenuList.length; i++) {
            var item = objMenuList[i];
            var label = item["MenuName"];
            var parentid = item["ParentID"];
            var id = item["Menu_ID"];
            if (items[parentid]) {
                var item = { parentid: parentid, label: label, item: item };
                if (!items[parentid].items) {
                    items[parentid].items = [];
                }
                items[parentid].items[items[parentid].items.length] = item;
                items[id] = item;
            }
            else {
                items[id] = { parentid: parentid, label: label, item: item };
                source[id] = items[id];
            }
        }
        return source;
    },

    //SliderError 
    SlideErr: function (msg, status) {
        var iClass = 'fa-warning';
        msg = Convert.objectToString(msg, 'There seems to be some error in getting data. Please try again. Report this if problem persists');
        status = Convert.objectToString(status, 'warning');
        WMP_Common.HideProcess();
        if (status == 'success') {
            $("#err-message-holder").removeClass('alert-danger');
            $("#err-message-holder").addClass('alert-success');
            iClass = 'alert-success';
        }
        $("#err-message-holder").fadeTo(500, 1);
        $("#err-message-holder").html("<i class='fa " + iClass + " fa-lg'></i>&nbsp;&nbsp;" + msg);
        hideMsgTimer = setTimeout(function () {
            $("#err-message-holder").fadeTo(500, 0).slideUp(500);
        }, 5000);
    },

    ValidateTxt: function (arr) {
        var ErrCnt = 0, IsValid = true;
        $(arr).each(function (i, v) {
            $('[id^=' + v + ']').each(function (iE, vE) {
                if ($(this).val() == '') {
                    $(this).addClass('err');
                    ErrCnt++;
                    IsValid = false;
                }
            });
        });
        return IsValid;
    },
}

$(document).ready(function () {
    WMP_Common.BindNumWidoutDecimal();
    WMP_Common.BindNumWidDecimal();
});

$(window).load(function () {
    WMP_Common.HideProcess();
});