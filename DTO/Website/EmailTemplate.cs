﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DTO.Website
{
    public class EmailTemplate
    {
        public static string T1(WebHdr hdr, Lead_Fields lead)
        {
            string leads = "", Address1 = "", Address2 = "";
            if (hdr.Location_Desc.Length > 10)
            {
                Address1 = hdr.Location_Desc.Substring(0, 10);
                Address2 = hdr.Location_Desc.Substring(10);
            }
            else
            {
                Address1 = hdr.Location_Desc;
                Address2 = "";
            }
            foreach (var item in lead.arr)
            {
                leads = leads + "<b>" + item.Field_Value + " :- </b> " + item.Field_Text + "<br />";
            }
            string res = "";
            res = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head>  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />  <title>Notification</title></head><body yahoo bgcolor=\"#ffffff\"><table width=\"100%\" bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\"><tr>  <td>    <table bgcolor=\"#ffffff\" class=\"content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">			<tr>				<td valign=\"top\" mc:edit=\"headerBrand\" id=\"templateContainerHeader\">					<p style=\"text-align:center;margin:0;padding:0;\">"
                + "<img class=\"clsLogo\" src='" + hdr.Logo_Path + "' style=\"max-width:600px;display:inline-block;\" />					</p>				</td>			</tr>			<tr>				<td align=\"center\" valign=\"top\">						<!-- BEGIN BODY // -->							<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" id=\"templateContainer\">									<tr>											<td valign=\"top\" class=\"bodyContent\" mc:edit=\"body_content\">												<p>Hi </p>												<p><b>Below are the details send by you:-</b> 												<br /><br />"
                // + "<b>Field_Value_1 :- </b> Field_Text_1<br />"
                //+ "<b>Field_Value_2 :- </b> Field_Text_2<br />"
                //+ "<b>Field_Value_3 :- </b> Field_Text_3<br />"

                + leads + "<br />"
               + "We will contact you soon. Please <a href='" + hdr.Company_URL + "'>contact</a> us for further commuication </p> </td> </tr>" +
                " <tr align=\"top\"> <td valign=\"top\" class=\"bodyContentImage\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" valign=\"top\">													<tr>														<td align=\"left\" valign=\"top\" mc:edit=\"footer_sig\" valign=\"top\">"
                + "<h5>Build by <a href='" + hdr.Whomps_URL + "'>Whomps</a></h5> </td> </tr>												</table>											</td>									</tr>							</table>							<!-- // END BODY -->					</td>			</tr>			<tr>				<td align=\"center\" valign=\"top\" id=\"bodyCellFooter\" class=\"unSubContent\">					<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" id=\"templateContainerFooter\">						<tr>							<td valign=\"top\" width=\"100%\" mc:edit=\"footer_unsubscribe\">								<p style=\"text-align:center;\"> " +
                "<img  class=\"clsLogo\" src='" + hdr.Logo_Path + "' style=\"max-width:600px;margin:0 auto 0 auto;display:inline-block;\" />								</p>" +
                "<h6 style=\"text-align:center;margin-top: 9px;\">" + hdr.Slogan_H1 + "</h6> " +
                "<h6 style=\"text-align:center;\">" + Address1 + "</h6> " +
                "<h6 style=\"text-align:center;\">" + Address2 + "</h6>" +
                "</td>						</tr>					</table>				</td>			</tr>    </table>    </td>  </tr></table><style type=\"text/css\">  /* /\\/\\/\\/\\/\\/\\/\\/\\/ CLIENT-SPECIFIC STYLES /\\/\\/\\/\\/\\/\\/\\/\\/ */  #outlook a{padding:0;} /* Force Outlook to provide a \"view in browser\" message */  .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */  body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */  table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */  img{-ms-interpolation-mode:bicubic;max-width:100%;} /* Allow smoother rendering of resized image in Internet Explorer */  td ul li {    font-size: 16px;  }  /* /\\/\\/\\/\\/\\/\\/\\/\\/ RESET STYLES /\\/\\/\\/\\/\\/\\/\\/\\/ */  body{margin:0; padding:0;}  img{    max-width:100%;    border:0;    line-height:100%;    outline:none;    text-decoration:none;  }  table{border-collapse:collapse !important;}  .content {width: 100%; max-width: 600px;}  .content img { height: auto; min-height: 1px; }  .content {width: 100%; max-width: 600px;}  #bodyTable{margin:0; padding:0; width:100% !important;}  #bodyCell{margin:0; padding:0;}  #bodyCellFooter{margin:0; padding:0; width:100% !important;padding-top:39px;padding-bottom:15px;}  body {margin: 0; padding: 0; min-width: 100%!important;}  #templateContainerHeader{    font-size: 14px;    padding-top:2.429em;    padding-bottom:0.929em;  }  #templateContainerFootBrd {    border-bottom:1px solid #e2e2e2;    border-left:1px solid #e2e2e2;    border-right:1px solid #e2e2e2;    border-radius: 0 0 4px 4px;    background-clip: padding-box;    border-spacing: 0;    height: 10px;    width:100% !important;  }  #templateContainer{    border-top:1px solid #e2e2e2;    border-bottom:1px solid #e2e2e2;    border-left:1px solid #e2e2e2;    border-right:1px solid #e2e2e2;    border-radius: 4px 4px 4px 4px;    background-clip: padding-box;    border-spacing: 0;  }  /**  * @tab Page  * @section heading 1  * @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.  * @style heading 1  */  h1{     color:#2e2e2e;    display:block;     font-family:Helvetica;     font-size:26px;     line-height:1.385em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  /**  * @tab Page  * @section heading 2  * @tip Set the styling for all second-level headings in your emails.  * @style heading 2  */  h2{     color:#2e2e2e;    display:block;     font-family:Helvetica;     font-size:22px;     line-height:1.455em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  /**  * @tab Page  * @section heading 3  * @tip Set the styling for all third-level headings in your emails.  * @style heading 3  */  h3{     color:#545454;    display:block;     font-family:Helvetica;     font-size:18px;     line-height:1.444em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  /**  * @tab Page  * @section heading 4  * @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.  * @style heading 4  */  h4{     color:#545454;    display:block;     font-family:Helvetica;     font-size:14px;     line-height:1.571em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  h5{     color:#545454;    display:block;     font-family:Helvetica;     font-size:13px;     line-height:1.538em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  h6{     color:#545454;    display:block;     font-family:Helvetica;     font-size:12px;     line-height:2.000em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  p {     color:#545454;    display:block;     font-family:Helvetica;     font-size:16px;     line-height:1.500em;     font-style:normal;     font-weight:normal;     letter-spacing:normal;    margin-top:0;    margin-right:0;    margin-bottom:15px;    margin-left:0;     text-align:left;  }  .unSubContent a:visited { color: #a1a1a1; text-decoration:underline; font-weight:normal;}  .unSubContent a:focus   { color: #a1a1a1; text-decoration:underline; font-weight:normal;}  .unSubContent a:hover   { color: #a1a1a1; text-decoration:underline; font-weight:normal;}  .unSubContent a:link   { color: #a1a1a1 ; text-decoration:underline; font-weight:normal;}  .unSubContent a .yshortcuts   { color: #a1a1a1 ; text-decoration:underline; font-weight:normal;}  .unSubContent h6 {    color: #a1a1a1;    font-size: 12px;    line-height: 1.5em;    margin-bottom: 0;  }  .bodyContent{    color:#505050;    font-family:Helvetica;    font-size:14px;    line-height:150%;    padding-top:3.143em;    padding-right:3.5em;    padding-left:3.5em;    padding-bottom:0.714em;     text-align:left;  }  .bodyContentImage {    color:#505050;    font-family:Helvetica;    font-size:14px;    line-height:150%;    padding-top:0;    padding-right:3.571em;    padding-left:3.571em;    padding-bottom:2em;    text-align:left;  }  .bodyContentImage h4 {    color: #4E4E4E;    font-size: 13px;    line-height: 1.154em;    font-weight:normal;    margin-bottom: 0;  }  .bodyContentImage h5 {    color: #828282;    font-size: 12px;    line-height: 1.667em;    margin-bottom: 0;  }  /**  * @tab Body  * @section body link  * @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.  */  a:visited { color: #3386e4; text-decoration:none;}  a:focus   { color: #3386e4; text-decoration:none;}  a:hover   { color: #3386e4; text-decoration:none;}  a:link   { color: #3386e4 ; text-decoration:none;}  a .yshortcuts   { color: #3386e4 ; text-decoration:none;}  .bodyContent img{    height:auto;    max-width:498px;  }  .footerContent{    color:#808080;    font-family:Helvetica;    font-size:10px;    line-height:150%;    padding-top:2.000em;    padding-right:2.000em;    padding-bottom:2.000em;    padding-left:2.000em;    text-align:left;  }  /**  * @tab Footer  * @section footer link  * @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.  */  .footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */{     color:#606060;     font-weight:normal;     text-decoration:underline;  }  @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {    body[yahoo] .hide {display: none!important;}    body[yahoo] .buttonwrapper {background-color: transparent!important;}    body[yahoo] .button {padding: 0px!important;}    body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important;}    body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 5px; text-decoration: none!important; font-weight: bold;}  }  /*@media only screen and (min-device-width: 601px) {    .content {width: 600px !important;}  }*/  @media only screen and (max-width: 480px){    h1 {      font-size:34px !important;    }    h2{      font-size:30px !important;    }    h3{      font-size:24px !important;    }    h4{      font-size:18px !important;    }    h5{      font-size:16px !important;    }    h6{      font-size:14px !important;    }    p {      font-size: 18px !important;    }    .bodyContent {      padding: 6% 5% 1% 6% !important;    }    .bodyContent img {      max-width: 100% !important;    }    .bodyContentImage {      padding: 3% 6% 3% 6% !important;    }    .bodyContentImage img {      max-width: 100% !important;    }    .bodyContentImage h4 {      font-size: 16px !important;    }    .bodyContentImage h5 {      font-size: 15px !important;      margin-top:0;    }  }  .ii a[href] {color: inherit !important;}  span > a, span > a[href] {color: inherit !important;}  a > span, .ii a[href] > span {text-decoration: inherit !important;}</style></body></html>";
            return res;
        }

        public static string T2(WebHdr hdr, Lead_Fields lead,bool IsCompany )
        {
            string res = "", leadStr = "";
            using (StreamReader reader = new StreamReader(HttpContext.Current.ApplicationInstance.Server.MapPath("~/Views/Website/EMailTemplates/T1_LeadGeneration.html")))
            {
                res = reader.ReadToEnd();
            }
            res = res.Replace("{CompanyLogoURL}", HttpContext.Current.ApplicationInstance.Server.MapPath("~/Content/Images/WebsiteCreation/" + lead.Web_ID + "/Hdr/Logo" + hdr.Logo_Path + ""));
            if (IsCompany)
            {
                res = res.Replace("{HDR}", "A new lead is generated on " + DateTime.Now.ToString("dd MMM yyyy") + ".");
                res = res.Replace("{SubHDR}", "Please refer the below details was your customer has enquired about.");
            }
            else
            {
                res = res.Replace("{HDR}", "Thank you for writing us on " + DateTime.Now.ToString("dd MMM yyyy") + ".");
                res = res.Replace("{SubHDR}", "We appreciate your request & will contact you as soon as possible, below what you had enquired about.");
                
            }
            foreach (var item in lead.arr)
            {
                leadStr = leadStr + "<tr><td style='vertical-align:top;padding:10px 4px;border-bottom:solid #eaeaea 1px;text-align:left;white-space:nowrap;font-weight:600;min-width:130px'>" + item.Field_Value + " </td>" +
                    "<td style='vertical-align:top;padding:10px 4px;border-bottom:solid #eaeaea 1px;text-align:left;white-space:normal;width:99%;word-break:break-word'>" + item.Field_Text + "</td></tr>";
            }
            res = res.Replace("{LeadDetail}", leadStr);
            res = res.Replace("{CompanyName}", hdr.Company_Name);
            res = res.Replace("{CompanyURL}", hdr.Company_URL);
            res = res.Replace("{CompanyAddress}", hdr.Company_Address);
            res = res.Replace("{WhompsURLLink}", Constant.WhompsURL);
            return res;

        }
    }
}
