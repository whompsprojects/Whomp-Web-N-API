/***************************************************************************************************************
AUTHOR      :   Sandeep Maurya
FILE NAME   :   _Layout.js
VERSION     :   1.0
PURPOSE     :   WMP_Common Operation functions on layout page 
PROJECT     :   Prestige
***************************************************************************************************************/
/*=====================================Declaration=======================================*/
var objMenuDetail = '';
/*=====================================End Declaration=======================================*/

/*=====================================Intialization=======================================*/
$(document).ready(function () {
    try {

        if (Convert.IsObjectUndefinedOrNull_V1(layout_MenuDetail))
            Layout.CallMenu();
        else
            Layout.CreateMenu();
    }
    catch (ex) {
        WMP_Common.PopUpErrorMsg(ex);
        return false;
    }

    // To add active class to menu using href
    var path = window.location.href.split('#')[0]; // because the 'href' property of the DOM element is the absolute path
    $('#nav_layout_Menu ul li').removeClass('active');
    $('#nav_layout_Menu ul li a').each(function () {
        if (this.href === path) {
            $(this).parents('li').addClass('active');
        }
    });
});
var Layout = {

    CallMenu: function () {
        WMP_Common.AjaxRequest(layout_GetMenu_URL, '', Layout.LoadMenu, false);
    },

    LoadMenu: function (data) {
        Layout.CreateMenu(data);
    },

    //Create Menu
    CreateMenu: function (data) {

        if (!Convert.IsObjectUndefinedOrNull(data))
            objMenuDetail = $.parseJSON(data.data);
        else
            objMenuDetail = $.parseJSON(layout_MenuDetail);
        var menuHierarchy = WMP_Common.BuildParentChildRelationShip(objMenuDetail);
        var url = "";
        var BuildAssignAccessList = function (parent, items) {
            $.each(items, function () {
                if (this.label) {
                    // create LI element and append it to the parent element.
                    if (this.item.ControllerName != null)
                        url = (AppPath == '/' ? '/' : (AppPath + "/")) + this.item.ControllerName + "/" + this.item.ActionName;

                    else
                        url = "#";

                    if (this.item.MenuName == "Create Website") {
                        var li = $("<li class='li_" + this.label.replace(' ', '') + "'><a href=" + url + " target='_blank'>" + this.label + "</a></li>");
                        li.appendTo(parent);
                    }
                    else {
                        var li = $("<li class='li_" + this.label.replace(' ', '') + "'><a href=" + url + ">" + (this.label == "User Activity" ? UserName : this.label) + "</a></li>");
                        li.appendTo(parent);
                    }
                    // if there are sub items, call the recursive function
                    if (this.items && this.items.length > 0) {
                        var ul = $("<ul></ul>");
                        ul.appendTo(li);
                        BuildAssignAccessList(ul, this.items);
                    }
                }
            });
        }
        var ul = $("<ul id='main-menu' class='sm sm-blue top_main_menu'></ul>");
        ul.appendTo("#nav_layout_Menu");
        BuildAssignAccessList(ul, menuHierarchy); //Design ul 
    }
}