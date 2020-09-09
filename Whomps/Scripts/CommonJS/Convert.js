/***************************************************************************************************************
AUTHOR      :   Sandeep Maurya
FILE NAME   :   Convert.js
VERSION     :   1.0
PURPOSE     :   Common Convert functions
PROJECT     :   Whomp Website
***************************************************************************************************************/
var Convert = {

    objectToInt: function (obj, valueifNull) {
        try {

            if (obj != null && obj != "" && obj != undefined) {
                // alert('Start1');
                return parseInt(obj);

            }
            else {
                return valueifNull;
            }
        }
        catch (err) {
            return valueifNull;
        }
    },

    objectToDecimal: function (s, valueifNull) {
        try {
            if ((s != null) && (s.toString().trim() != '') && (s != undefined)) {
                var t = parseFloat(s);
                return t;
            }
            else {
                return valueifNull;
            }
        }
        catch (err) {
            return valueifNull;
        }
    },

    IsStringNullOrEmpty: function (obj) {
        try {

            if (obj != null && obj != '' && obj != undefined && obj.toString().trim() != '') {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            return true;
        }
    },

    IsObjectNullOrEmpty: function (obj) {
        try {

            if ((obj != undefined) && (obj != null) && (obj.toString().trim() != '')) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            return true;
        }
    },

    IsObjectUndefined: function (obj) {
        try {
            //alert('obj ' + obj);
            if (typeof obj === 'undefined') {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return true;
        }
    },

    objectToString: function (obj, valueifNull) {
        try {
            if (obj != null && obj != "" && obj != undefined) {
                return obj.toString();
            }
            else {
                return valueifNull;
            }
        }
        catch (err) {
            return valueifNull;
        }
    },

    objectToJSON: function (obj, valueifNull) {
        try {
            if (obj != null && obj != "" && obj != undefined) {

                var jsonDataParsed = $.parseJSON(obj);
                return jsonDataParsed;
            }
            else {
                return valueifNull;
            }
        }
        catch (err) {
            return valueifNull;
        }
    },

    IsObjectUndefinedOrNull: function (obj) {
        try {
            if (typeof obj === 'undefined' || obj == undefined || obj == null || obj == 'null' || obj == '') {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return true;
        }
    },

    IsObjectUndefinedOrNull_V1: function (obj) {
        try {
            if (typeof obj === 'undefined' || obj == undefined || obj == null || obj == 'null' || obj == '' || obj == '[]') {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return true;
        }
    },

    //convert dd/mm/yy format into yyyy-mm-dd for e.g 19/05/2018 to 2018-05-19 
    ConvertDt: function (d, dt) {
        try {
            if (Convert.IsStringNullOrEmpty(d) || Convert.IsStringNullOrEmpty(dt)) throw new Error('Issue on date formating');
            if (dt == 'd/m/y') {
                var arr = d.split('/');
                d = arr[2] + '-' + arr[1] + '-' + arr[0];
            }
            else if (dt == 'm/d/y') {
                var arr = d.split('/');
                d = arr[2] + '-' + arr[0] + '-' + arr[1];
            }
            else {
                var date = new Date();
                d = (date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()));
            }
        }
        catch (e) {
            console.log("issue in Convert=>ConvertDt :- " + e.message);
            var date = new Date();
            d = (date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()));
        }
        return d;
    },

    objectToBool: function (obj, valueifNull) {
        switch (obj) {
            case true:
            case "true":
            case "True":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    },

};
