/***************************************************************************************************************
AUTHOR      :   Sandeep Maurya
FILE NAME   :   AssignAccessMaster.js
VERSION     :   1.0
PURPOSE     :   Assign Access Master get,add & update
PROJECT     :   Prestige
REFERENCE   :   1. ~/Scripts/WMP_CommonJS/WMP_Common.js
                2. ~/Scripts/WMP_CommonJS/Convert.js
                3. ~/Scripts/jquery.jqGrid.min.js
***************************************************************************************************************/
/*=====================================Declaration=======================================*/
var objGetData = '', tr = '', errorMsg = '', errorCount = 0, IsValidEntry = true, roleID = '';
/*=====================================End Declaration=======================================*/

/*=====================================Intialization=======================================*/
$(document).ready(function () {
    try {
        $('#divErr').hide();
        $('#lblErrr').hide();
        $('#div_EditRoleSection').hide();
        $('#lblErr').hide();
        LoadGrid();
        $(document).on("input", "[id='txt_SearchByRole']", function () { WMP_Common.CallJQGrid_SmartSearch('tbl_AssignAccessMaster', $(this).val(), 'value') }); //Smart search by Role Name
        $(document).on("click", "[id=a_Edit]", function (event) { CallEditData('Edit', event); });//Edit
        $(document).on("click", "[id=btn_Cancel]", function () { $('#div_GetRoleSection').show(); $('#div_EditRoleSection').hide(); $('#divErr').hide(); }); //Cancel
        $(document).on("click", "[id=btn_Submit]", CallEdit); //Cancel
        $(document).on("change", "[id=ddl_Role]", function () { CallEditData('DDL', ''); });//Edit via ddl
    }
    catch (ex) {
        WMP_Common.PopUpErrorMsg(ex);
        return false;
    }
    finally {
        WMP_Common.HideProcess();
    }
});

/*=====================================End Intialization=======================================*/
//Load grid
function LoadGrid() {
    try {
        if (getData.status == 'success') {
            objGetData = $.parseJSON(getData.data);
            colNames = ['hdnRoleID', 'Role Name', 'Action'];
            colModel = [
                { name: 'code', hidden: true },
                { width: 200, name: 'value' },
                { name: 'Action', width: 80, formatter: GetAction },
            ];
            WMP_Common.CallJQGrid('#tbl_AssignAccessMaster', objGetData, colNames, colModel, 'RoleName', '', true, true, true, '', false, '');
        }
        else {
            WMP_Common.ChkSessionLogOut(data.status);
            return false;
        }
    }
    catch (ex) {
        WMP_Common.PopUpErrorMsg(ex);
        return false;
    }
}

//Get action button td
function GetAction() {
    return "<a title='Edit' href='#' style='vertical-align: middle;' id='a_Edit'><i class='fa fa-edit'></i></a>";
}

//Get Edit data
function CallEditData(operationType, event) {
    $('#btndiv').show();
    $('#btn_Submit').show();
    $('#btn_Cancel').show();
    $('#RoleDiv').show();
    $('#lblRole').show();
    $('#AssignDiv').show();
    $('#lblAssign').show();
    $('#ddlDiv').show();
    $('#ddl_Role').show();
    $('#divErr').hide();
    $('#lblErrr').hide();
    if (operationType == 'Edit') {
        $('#divErr').hide();
        $('#lblErrr').hide();
        tr = $(event.target).closest('tr');
        roleID = $(tr.find("[aria-describedby=tbl_AssignAccessMaster_code]")).html();
    }
    else {
        roleID = $('#ddl_Role').val();
    }
    WMP_Common.AjaxRequest(getEditRoleData_URL, { roleID: Convert.objectToInt(roleID,0) }, LoadEditData, false);
}

function LoadEditData(data) {
    try {
        if (data.status == 'success') {
            $('#div_Menu').html('');
            $('#div_GetRoleSection').hide();
            $('#div_EditRoleSection').show();
            WMP_Common.BindDropDown($('#ddl_Role'), objGetData, false, roleID, false);
            var menuHierarchy = WMP_Common.BuildParentChildRelationShip($.parseJSON(data.data).Table);
            var BuildAssignAccessList = function (parent, items, ischild) {
                $.each(items, function () {
                    var i = 0;
                    if (this.label) {
                        // create LI element and append it to the parent element.
                        if (ischild == undefined)
                            var li = $("<li><input type='checkbox' onclick='checkboxFunction(this)' class='chckBox-assign parent_" + this.item.Menu_ID + "' id='chk_Menu' menuId='" + this.item.Menu_ID + "'/>" + this.label + "</li>");
                        else
                            var li = $("<li><input type='checkbox' onclick='checkboxFunction(this)' class='chckBox-assign child_" + this.item.ParentID + "' id='chk_Menu' menuId='" + this.item.Menu_ID + "'/>" + this.label + "</li>");
                        li.appendTo(parent);
                        i++;
                        // if there are sub items, call the recursive function
                        if (this.items && this.items.length > 0) {
                            var ul = $("<ul></ul>");
                            ul.appendTo(li);
                            BuildAssignAccessList(ul, this.items, true);
                        }
                    }
                });
            }
            var ul = $("<ul></ul>");
            ul.appendTo("#div_Menu");
            BuildAssignAccessList(ul, menuHierarchy); //Design ul 
            var objListPreselectedValue = $.parseJSON(data.data).Table1;
            if (objListPreselectedValue.length > 0) //Assign Previous selection
            {
                $(objListPreselectedValue).each(function (key, value) {
                    $("input[menuId='" + value.MenuID + "']").prop('checked', true);
                });
            }
        }
        else {
            WMP_Common.ChkSessionLogOut(data.status);
            return false;
        }
    }
    catch (ex) {
        WMP_Common.PopUpErrorMsg(ex);
        return false;
    }
}

//Edit
function CallEdit() {
    try {
        var Ischecked = false, MenuIDs = '';
        $("#chk_Menu:checked").each(function () {
            Ischecked = true;
        });
        if (Ischecked) {
            $('#btn_Submit').prop('disabled', true);
            $("#chk_Menu:checked").each(function () {
                MenuIDs += $(this).attr('menuId') + ',';
            });
            WMP_Common.AjaxRequest(editRole_URL, { "RoleID": Convert.objectToInt(roleID, 0), "MenuIDs": MenuIDs }, LoadEdit, true);
        }
        else {
            $(document).scrollTop('40px');
            $('#divErr').show();
            $('#lblErrr').show();
            return false;
        }
    }
    catch (ex) {
        $('#btn_Submit').prop('disabled', false);
        WMP_Common.PopUpErrorMsg(ex);
        return false;
    }
}

function LoadEdit(data) {
    try {
        if (data.status == 'success') {
            $('#lblErr').show();
            setTimeout(function () { $("#lblErr").fadeOut(1500); }, 5000);
            $("#btn_Cancel").trigger("click");
        }
        else {
            WMP_Common.ChkSessionLogOut(data.status);
            return false;
        }
    }
    catch (ex) {
        WMP_Common.PopUpErrorMsg(ex);
        return false;
    }
    finally {
        $('#btn_Submit').prop('disabled', false);
    }
}


//Checkbox click method(Added by Prabir Biswas)
// ========================
function checkboxFunction(data) {
    var classname = data.classList[1];
    var arr = classname.split('_');
    var lastchar = arr[1];
    if (arr[0] == "parent") {
        if (data.checked == true)
            $('.child_' + lastchar).prop("checked", true);
        else
            $('.child_' + lastchar).prop("checked", false);
    }
    else {
        $('.child_' + lastchar).each(function (index, value) {
            if (this.checked == true) {
                isempty = false;
                return false;
            }
            else
                isempty = true
        });
        if (data.checked == false && isempty == true)
            $('.parent_' + lastchar).prop("checked", false);
        else
            $('.parent_' + lastchar).prop("checked", true);
    }
}
