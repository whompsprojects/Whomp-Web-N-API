/***************************************************************************************************************
AUTHOR      :   Sandeep Maurya
FILE NAME   :   GetWebiste.js
VERSION     :   1.0
PURPOSE     :   Get website details
PROJECT     :   Whomps
REFERENCE   :   1. ~/Scripts/WMP_CommonJS/WMP_Common.js
                2. ~/Scripts/WMP_CommonJS/Convert.js
***************************************************************************************************************/
var VrGB = {
    tbl_GetWebsite: null, html: '', curThis: null, companyName: '', objWebsite: null, Web_ID: 0,
};

$(document).ready(function () {
    try {
        GetWeb.BindWebDetail();
        $(document).on('click', '[id^=a_Delete]', function () { GetWeb.CallDelete(this); });
        $(document).on('click', '[id^=a_Approve]', function () { GetWeb.CallApprove(this); });
    }
    catch (ex) {
        console.log('issue in GetWebiste=>document ready:- ' + ex);
        WMP_Common.SlideErr("Something went wrong");
    }
    finally {
        WMP_Common.HideProcess();
    }
});

var GetWeb = {

    BindWebDetail: function () {
        try {
            var data = $.parseJSON(WebsiteDetail), Status = '', color = '', editCls = '', deleteCls = '', approveCls = ' hide', disableCls = '';
            if (VrGB.objWebsite == null) {
                if (data.data == 'no record found') {
                    WMP_Common.SlideErr(data.data);
                    return false;
                }
                VrGB.objWebsite = $.parseJSON(data.data);
            }
            if (data.status != 'success') {
                console.log(data);
                WMP_Common.SlideErr("Something went wrong");
                return false;
            }
            var view_url = '', update_url = '';
            if (VrGB.tbl_GetWebsite != null) {
                $("#tbl_GetWebsite").dataTable().fnDestroy();
                $("#tbl_GetWebsite tbody").empty();
            }
            VrGB.html = '';
            var i = 0;
            $.each(VrGB.objWebsite, function (k, v) {
                i++;
                if (S_Role_ID == 1 || v.User_ID == S_User_ID) {
                    editCls = ' unhide', deleteCls = ' unhide';
                }
                else {
                    editCls = ' hide', deleteCls = ' hide';
                }
                if (v.Status == 'Approved' || v.Status == 'De-Activated')
                    approveCls = ' hide';
                else
                    approveCls = ' unhide';
                if (v.Status == 'Approval Pending' || v.Status == 'De-Activated') {
                    disableCls = ' disable', disableCls = ' disable';
                }
                else {
                    disableCls = '', disableCls = '';
                }

                if (S_Role_ID == 1) {
                    approveCls = ' unhide';
                    disableCls = '';
                }

                Status = Convert.objectToString(v.Status, '');
                color = (Status == 'Approved' ? 'Green' : 'Red');
                view_url = (AppPath == '/' ? '/' : (AppPath + "/")) + "Website/ViewWebsite?Web_ID=" + v.Web_ID;
                update_url = (AppPath == '/' ? '/' : (AppPath + "/")) + "Website/CreateWebsite?WebIsAdd=false&Web_ID=" + v.Web_ID;
                VrGB.html += "<tr>"
                    + "<td style='display:none' id='td_Web_ID_" + i + "'>" + Convert.objectToString(v.Web_ID, '') + "</td>"
                    + "<td id='td_Logo_" + i + "'><img src='../Content/Images/WebsiteCreation/" + Convert.objectToString(v.Web_ID, '') + '/Hdr/Logo' + Convert.objectToString(v.Logo_Path, '') + "' alt='na' class='img cls_logo'/> </td>"
                    + "<td id='td_CompanyName_" + i + "'>" + Convert.objectToString(v.CompanyName, '') + "</td>"
                    + "<td id='td_Status_" + i + "'><span style='color:" + color + "'>" + Status + "</span></td>"
                    + "<td id='td_Created_By_" + i + "'>" + Convert.objectToString(v.Created_By, 0) + "</td>"
                    + "<td id='td_Created_Date_" + i + "'>" + Convert.objectToString(v.Created_Date, 0) + "</td>"
                    + "<td id='td_Updated_By_" + i + "'>" + Convert.objectToString(v.Updated_By, '') + "</td>"
                    + "<td id='td_Updated_Date_" + i + "'>" + Convert.objectToString(v.Updated_Date, '') + "</td>"
                    + "<td><a class='" + disableCls + "' href=" + view_url + " target='_blank' id='a_View_" + i + "' title='View'><i class='fa fa-eye' aria-hidden='true'></i></a>&nbsp;"
                    + "<a class='" + editCls + disableCls + "' href=" + update_url + " target='_blank'  id='a_Update_" + i + "' title='Update'> <i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>&nbsp;"
                    + "<a class='" + approveCls + "' id='a_Approve_" + i + "' title='Approve'> <i class='fa fa-check' aria-hidden='true'></i></a>&nbsp;"
                    + "<a class='" + deleteCls + "' id='a_Delete_" + i + "' title='Delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></a></td> "
                    + "</tr>";
            });
            $("#tbl_GetWebsite").append(VrGB.html);
            VrGB.tbl_GetWebsite = $('#tbl_GetWebsite').DataTable({
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'excel',
                    title: 'Website Details',
                    exportOptions: {
                        columns: [1, 3, 4, 9, 10, 12]
                    }
                }],
                "paging": true
            });
            $('.buttons-excel').hide();
        }
        catch (ex) {
            console.log('issue in GetWeb=>BindWebDetail:- ' + ex);
            WMP_Common.SlideErr("Something is not right");
        }
        finally {
            WMP_Common.HideProcess();
        }
    },

    CallDelete: function (curThis) {
        VrGB.curThis = curThis;
        VrGB.companyName = $(VrGB.curThis).closest('tr').find('[id^=td_CompanyName]').html();
        VrGB.Web_ID = $(VrGB.curThis).closest('tr').find('[id^=td_Web_ID]').html();
        WMP_Common.ConfirmataionPopUp('Do you want ' + VrGB.companyName + ' website ?', 'DeleteWebsite(' + VrGB.Web_ID + ')');
    },

    LoadDeleteWebsite(data) {
        if (data.status == "success") {
            //WMP_Common.PopUpErrorMsg("Successfully deleted " + VrGB.companyName + " website");
            WMP_Common.SlideErr("Successfully deleted " + VrGB.companyName + " website", "success");
            VrGB.objWebsite = $.grep(VrGB.objWebsite, function (v) {
                if (v.Web_ID != VrGB.Web_ID)
                    return v;
            });
            GetWeb.BindWebDetail();
        }
        else {
            console.log(data);
            WMP_Common.ChkSessionLogOut(data.status);
        }
    },

    CallApprove: function (curThis) {
        VrGB.curThis = curThis;
        VrGB.companyName = $(VrGB.curThis).closest('tr').find('[id^=td_CompanyName]').html();
        Web_ID = $(VrGB.curThis).closest('tr').find('[id^=td_Web_ID]').html();
        var req = { Web_ID: Web_ID, Status_ID: 2 };
        WMP_Common.AjaxRequest(UpdateWebStatus_URL, req, GetWeb.LoadApprove);
    },

    LoadApprove(data) {
        if (data.status == "success") {
            WMP_Common.PopUpErrorMsg("Successfully approved " + VrGB.companyName + " website");
            $(VrGB.curThis).closest('tr').find('[id^=a_View]').removeClass('disable');
            $(VrGB.curThis).closest('tr').find('[id^=a_Update]').removeClass('disable');
            $(VrGB.curThis).closest('tr').find('[id^=a_Approve]').addClass('hide');
            $(VrGB.curThis).closest('tr').find('[id^=td_Status]').html("<span style='color:green'>Approved</span>");
            //location.reload();
        }
        else {
            console.log(data);
            WMP_Common.ChkSessionLogOut(data.status);
        }
    },
};

function DeleteWebsite(Web_ID) {
    var req = { Web_ID: Web_ID, Status_ID: 3 };
    WMP_Common.AjaxRequest(UpdateWebStatus_URL, req, GetWeb.LoadDeleteWebsite);
}

