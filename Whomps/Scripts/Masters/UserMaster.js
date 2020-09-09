/***************************************************************************************************************
AUTHOR      :   Sandeep Maurya
FILE NAME   :   UserMaster.js
VERSION     :   1.0
PURPOSE     :   To generat the bill in Whomps
PROJECT     :   Whomps
***************************************************************************************************************/
/*=====================================Declaration=======================================*/
//==> variable
var tr = '', errorMsg = '', errorCount = 0, IsValidEntry = true, html = '', currId = 1, currThis = '', IsAdd = true;
var V_UM = { objUsers: null, imgExt: '', User_ID: 0, objRole: null };

//==>objects
var objCommAutoComplt = { tableName: '', codeColName: '', valueColName: '', searchText: '', }

/*=====================================Intialization=======================================*/
$(document).ready(function () {
    UserMaster.LoadGrid();
    $(document).on('click', '[id=btn_CallAddUser]', UserMaster.CallAddUser);
    $(document).on("input", "[id='txt_Name']", function () { WMP_Common.CallJQGrid_SmartSearch('tbl_UserMst', $(this).val(), 'First_Name') }); //Smart search by Name
    $(document).on('click', '[id=a_Edit]', function () { UserMaster.CallEdit(this); });
    $(document).on('click', '[id=a_Delete]', function () { UserMaster.CallDeleteUser(this); });
    $(document).on('click', '[id=btn_Cancel]', function () { $('#div_UserMasterLst').show(); $('#div_AddEditUserMst').hide(); });
    $(document).on('click', '[id=btn_AddEditUser]', UserMaster.AddEditUser);
    $(document).on('click', '[id=lbl_UploadImage]', function () { $('#file_img_UserPhoto').trigger('click'); });
    $(document).on('change', '[id=file_img_UserPhoto]', function () { WMP_Common.SetImg_TR(event, this, 'img_UserPhoto', 2000) });

});
/*=====================================End Intialization=======================================*/

var UserMaster = {

    LoadGrid: function () {
        try {
            if (V_UM.objUsers == null) {
                getData = $.parseJSON(getData);
                if (getData.status == 'success') {
                    V_UM.objUsers = $.parseJSON(getData.data).UserLst;
                    V_UM.objRole = $.parseJSON(getData.data).RoleLst;
                }
                else
                    throw getData.data;
            }
            colNames = ['ID', 'Photo', 'Name', 'Address', 'Email ID', 'Contact No.', 'Action'];
            colModel = [
                { width: 50, name: 'User_ID', hidden: true },
                { width: 100, name: 'Photo_Name', formatter: UserMaster.GetPhoto },
                { width: 200, name: 'First_Name', formatter: UserMaster.GetName },
                { width: 300, name: 'AllAddress', formatter: UserMaster.GetAddress },
                { width: 150, name: 'Email_ID' },
                { width: 150, name: 'Contact_No', formatter: UserMaster.Contact },
                { name: 'Action', width: 80, formatter: UserMaster.GetAction },
            ];
            WMP_Common.CallJQGrid('#tbl_UserMst', V_UM.objUsers, colNames, colModel, 'User_ID', '', true, true, true, '', false, '');
            $('#div_UserMasterLst').show();
            $('#div_AddEditUserMst').hide();
        }
        catch (ex) {
            WMP_Common.PopUpErrorMsg(ex);
            return false;
        }
    },

    GetPhoto: function (cellvalue, options, rowdata) {
        cellvalue = Convert.IsObjectNullOrEmpty(cellvalue) ? 'no-image.jpg' : cellvalue;
        return "<img src='../Content/images/Users/" + cellvalue + " ' class='img-responsive' ></i>";
    },

    GetName: function (cellvalue, options, rowdata) {
        fname = rowdata.First_Name;
        mname = Convert.IsObjectNullOrEmpty(rowdata.Middle_Name) ? '' : ' ' + rowdata.Middle_Name;
        lname = Convert.IsObjectNullOrEmpty(rowdata.Last_Name) ? '' : ' ' + rowdata.Last_Name;
        return $.trim(fname + mname + lname);
    },

    GetAddress: function (cellvalue, options, rowdata) {
        add = Convert.IsObjectNullOrEmpty(rowdata.Address) ? '' : ' ' + rowdata.Address;
        altrAdd = Convert.IsObjectNullOrEmpty(rowdata.Alt_Address) ? '' : ' ' + rowdata.Alt_Address;
        return $.trim(add + altrAdd);
    },

    Contact: function (cellvalue, options, rowdata) {
        Tel_No = Convert.IsObjectNullOrEmpty(rowdata.Tel_No) ? '' : ' ' + rowdata.Tel_No;
        Mob_No = Convert.IsObjectNullOrEmpty(rowdata.Mob_No) ? '' : ' ' + rowdata.Mob_No;
        return $.trim(Tel_No + Mob_No);
    },

    GetAction: function (cellvalue, options, rowdata) {
        var action = "<a title='Edit' href='#' style='vertical-align: middle;' id='a_Edit'><i class='fa fa-edit'></i></a>";
        if (S_Role_ID == 1)
            action = action + "&nbsp;&nbsp;<a id='a_Delete' title='Delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></a>";
        return action;
    },

    CallAddUser: function () {
        $('#div_UserMasterLst').hide();
        $('#div_AddEditUserMst').show();
        $('#img_UserPhoto').attr('src', '../Content/Images/no-image.jpg');
        $('#txt_EmailID').val(''); $('#txt_First_Name').val(''); $('#txt_LastName').val(''); $('#txt_Password').val(''); $('#txt_ConfrmPassword').val('');
        $('#txt_Address').val(''); $('#txt_Alt_Address').val(''); $('#txt_Tel_No').val(''); $('#txt_Mobile').val('');
        WMP_Common.BindDropDown($('#ddl_Role'), V_UM.objRole, true, '', '', 'Select Role');
    },

    //Edit user 
    CallEdit: function (currThis) {
        $('#div_UserMasterLst').hide();
        $('#div_AddEditUserMst').show();
        V_UM.User_ID = $(currThis).closest('tr').find('[aria-describedby=tbl_UserMst_User_ID]').html();
        var tmpObj = $.grep(V_UM.objUsers, function (v) {
            if (v.User_ID == V_UM.User_ID)
                return v;
        });
        $('#img_UserPhoto').attr('src', '../Content/images/Users/' + tmpObj[0].Photo_Name);
        $('#txt_EmailID').val(tmpObj[0].Email_ID); $('#txt_First_Name').val(tmpObj[0].First_Name); $('#txt_LastName').val(tmpObj[0].Last_Name);
        $('#txt_Password,#txt_ConfrmPassword').val('');
        $('#txt_Address').val(tmpObj[0].Address); $('#txt_Alt_Address').val(tmpObj[0].Alt_Address); $('#txt_Tel_No').val(tmpObj[0].Tel_No);
        $('#txt_Mobile').val(tmpObj[0].Mob_No);
        IsAdd = false;
        WMP_Common.BindDropDown($('#ddl_Role'), V_UM.objRole, true, '', '', 'Select Role');
    },

    AddEditUser: function () {
        try {
            var arrData = [];
            arrData.push('txt_EmailID');
            arrData.push('txt_First_Name');
            arrData.push('txt_LastName');
            arrData.push('txt_Password');
            arrData.push('txt_ConfrmPassword');
            arrData.push('txt_Address');
            //arrData.push('txt_Tel_No');
            arrData.push('txt_Mobile');
            if (!WMP_Common.ValidateTxt(arrData)) {
                WMP_Common.MsgPopUp();
                return false;
            }
            if ($('#txt_Password').val() != $('#txt_ConfrmPassword').val()) {
                WMP_Common.MsgPopUp('Pwd are not same');
                return false;
            }
            var req = {
                OperType: ((IsAdd) ? 'Add' : 'Edit'),
                User_ID: V_UM.User_ID,
                PWD: $('#txt_Password').val(),
                First_Name: $('#txt_First_Name').val(),
                Last_Name: $('#txt_LastName').val(),
                Address: $('#txt_Address').val(),
                Alt_Address: $('#txt_Alt_Address').val(),
                Img: $('#img_UserPhoto').attr('src'),
                IsChangeImg: Convert.objectToBool($('#img_UserPhoto').attr('is_change'), false),
                Email_ID: $('#txt_EmailID').val(),
                Tel_No: $('#txt_Tel_No').val(),
                Mob_No: $('#txt_Mobile').val(),
                RoleID: $('#ddl_Role').val(),
            }
            WMP_Common.AjaxRequest(AddUpdateUser_URL, { req: req }, UserMaster.LoadAddEditUser);
        }
        catch (ex) {
            console.log("Total issue in AddEditUser :- " + ex.message);
            WMP_Common.PopUpErrorMsg(ex);
            return false;
        }
        finally {
            WMP_Common.HideProcess();
        }
    },

    LoadAddEditUser: function (data) {
        if (data.status == 'success') {
            var Photo_Name = '', OperType;
            OperType = ((IsAdd) ? 'created' : 'updated');
            WMP_Common.SlideErr('User ' + OperType + ' succesfully', 'success');
            if (Convert.objectToBool($('#img_UserPhoto').attr('is_change'), false))
                Photo_Name = data.data + '.' + $('#file_img_UserPhoto')[0].files[0].name.split('.')[1];
            else
                Photo_Name = data.data + '.' + $('#img_UserPhoto').attr('src').split('.')[3];
            V_UM.objUsers = $.grep(V_UM.objUsers, function (v) {
                if (v.User_ID != V_UM.User_ID)
                    return v;
            });
            V_UM.objUsers.push({
                Address: $('#txt_Address').val(), Alt_Address: $('#txt_Alt_Address').val(), Company_Name: "Whomps"
                , Created_Date: null, Email_ID: $('#txt_EmailID').val()
                , First_Name: $('#txt_First_Name').val(), Last_Name: $('#txt_LastName').val(), Middle_Name: null, Mob_No: $('#txt_Mobile').val()
                , Photo_Name: Photo_Name
                , Status: 1, Tel_No: $('#txt_Tel_No').val(), UserName: $('#txt_EmailID').val(), User_ID: data.data
            });
            UserMaster.LoadGrid();

        } else {
            WMP_Common.ChkSessionLogOut(data.status);
            return false;
        }
    },

    CallDeleteUser: function (currThis) {
        V_UM.User_ID = $(currThis).closest('tr').find('[aria-describedby=tbl_UserMst_User_ID]').html();
        var tmpObj = $.grep(V_UM.objUsers, function (v) {
            if (v.User_ID == V_UM.User_ID)
                return v;
        });
        WMP_Common.ConfirmataionPopUp('Do you want to delete ' + tmpObj[0].First_Name + ' ' + tmpObj[0].Last_Name + '?', 'DeleteUser()');
    },

    LoadDeleteUser: function (data) {
        if (data.status == 'success') {
            WMP_Common.SlideErr('User deleted succesfully', 'success');
            V_UM.objUsers = $.grep(V_UM.objUsers, function (v) {
                if (v.User_ID != V_UM.User_ID)
                    return v;
            });
            UserMaster.LoadGrid();
        }
    },
}

function DeleteUser() {
    WMP_Common.AjaxRequest(DeleteUser_URL, { userId: V_UM.User_ID }, UserMaster.LoadDeleteUser);
}