using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Serialization;

namespace DTO
{
    #region Common DTO

    #region Response
    public class Response
    {
        public string status { get; set; }
        public string data { get; set; }
    }
    #endregion Response

    #region Error Logger DTO
    public class ErrorLoger_DTO
    {
        public string Message { get; set; }
        public string Source { get; set; }
        public string TargetSite { get; set; }
        public string StackTrace { get; set; }
        public string Created_By { get; set; }
    }
    #endregion Error Logger DTO

    #region SendMail_DTO
    public class SendMail_DTO
    {
        public string EmailFrom { get; set; }
        public string EmailTo { get; set; }
        public string AttachmentFileName { get; set; }
        public string EmailBody { get; set; }
        public string Subject { get; set; }
        public string EmailFromEmailID { get; set; }
        public string EmailFromDisplayName { get; set; }
        public string Ntwk_EmailId { get; set; }
        public string Ntwk_EmailPwd { get; set; }
        public List<Array_CC> Arr_Cc { get; set; }
    }

    public class Array_CC
    {
        public string MailId { get; set; }
    }
    #endregion SendMail_DTO

    #endregion Common DTO

    #region Encrpty
    public class SecurityHelper
    {
        #region "Password Encryption"
        private static string encryptionKey = "1234567890123451";

        public static string Decrypt(string CipherText)
        {
            return Decrypt(CipherText, encryptionKey);
        }

        protected static string Decrypt(string CipherText, string EncryptionPrivateKey)
        {
            if (String.IsNullOrEmpty(CipherText))
                return CipherText;

            TripleDESCryptoServiceProvider tDESalg = new TripleDESCryptoServiceProvider();
            tDESalg.Key = new ASCIIEncoding().GetBytes(EncryptionPrivateKey.Substring(0, 16));
            tDESalg.IV = new ASCIIEncoding().GetBytes(EncryptionPrivateKey.Substring(8, 8));

            byte[] buffer = Convert.FromBase64String(CipherText);
            string result = DecryptTextFromMemory(buffer, tDESalg.Key, tDESalg.IV);
            return result;
        }

        public static string Encrypt(string PlainText)
        {
            return Encrypt(PlainText, encryptionKey);
        }

        protected static string Encrypt(string PlainText, string EncryptionPrivateKey)
        {
            if (String.IsNullOrEmpty(PlainText))
                return PlainText;

            TripleDESCryptoServiceProvider tDESalg = new TripleDESCryptoServiceProvider();
            tDESalg.Key = new ASCIIEncoding().GetBytes(EncryptionPrivateKey.Substring(0, 16));
            tDESalg.IV = new ASCIIEncoding().GetBytes(EncryptionPrivateKey.Substring(8, 8));

            byte[] encryptedBinary = EncryptTextToMemory(PlainText, tDESalg.Key, tDESalg.IV);
            string result = Convert.ToBase64String(encryptedBinary);
            return result;
        }

        private static byte[] EncryptTextToMemory(string Data, byte[] Key, byte[] IV)
        {
            MemoryStream mStream = new MemoryStream();
            CryptoStream cStream = new CryptoStream(mStream, new TripleDESCryptoServiceProvider().CreateEncryptor(Key, IV), CryptoStreamMode.Write);
            byte[] toEncrypt = new UnicodeEncoding().GetBytes(Data);
            cStream.Write(toEncrypt, 0, toEncrypt.Length);
            cStream.FlushFinalBlock();
            byte[] ret = mStream.ToArray();
            cStream.Close();
            mStream.Close();
            return ret;
        }

        private static string DecryptTextFromMemory(byte[] Data, byte[] Key, byte[] IV)
        {
            MemoryStream msDecrypt = new MemoryStream(Data);
            CryptoStream csDecrypt = new CryptoStream(msDecrypt, new TripleDESCryptoServiceProvider().CreateDecryptor(Key, IV), CryptoStreamMode.Read);
            StreamReader sReader = new StreamReader(csDecrypt, new UnicodeEncoding());
            return sReader.ReadLine();
        }
        #endregion
    }
    #endregion Encrpty

    #region Utility
    public static class ExUtil
    {
        #region Converts DataTable To List
        /*Converts DataTable To List*/
        public static List<TSource> ToList<TSource>(this DataTable dataTable) where TSource : new()
        {
            var dataList = new List<TSource>();

            const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic;
            var objFieldNames = (from PropertyInfo aProp in typeof(TSource).GetProperties(flags)
                                 select new { Name = aProp.Name, Type = Nullable.GetUnderlyingType(aProp.PropertyType) ?? aProp.PropertyType }).ToList();

            for (int i = 0; i < objFieldNames.Count; i++)
            {
                var oField = objFieldNames[i];
                for (int j = 0; j < dataTable.Columns.Count; j++)
                {
                    if (oField.Name.ToUpper() == dataTable.Columns[j].ColumnName.ToUpper())
                    {
                        dataTable.Columns[j].ColumnName = oField.Name;
                    }
                }
            }

            var dataTblFieldNames = (from DataColumn aHeader in dataTable.Columns
                                     select new { Name = aHeader.ColumnName, Type = aHeader.DataType }).ToList();
            var commonFields = objFieldNames.Intersect(dataTblFieldNames).ToList();

            foreach (DataRow dataRow in dataTable.AsEnumerable().ToList())
            {
                var aTSource = new TSource();
                foreach (var aField in commonFields)
                {
                    PropertyInfo propertyInfos = aTSource.GetType().GetProperty(aField.Name);

                    if (dataRow[aField.Name] == DBNull.Value)
                    {
                        switch (aField.Type.FullName)
                        {
                            case "System.DateTime":
                                propertyInfos.SetValue(aTSource, DateTime.MinValue, null); break;
                            case "System.String":
                                propertyInfos.SetValue(aTSource, "", null); break;
                            case "System.Decimal":
                            case "System.Double":
                            case "System.Int16":
                            case "System.Int32":
                            case "System.Int64":
                                propertyInfos.SetValue(aTSource, 0, null); break;
                            case "System.Boolean":
                                propertyInfos.SetValue(aTSource, false, null); break;
                            default: break;
                        }
                    }
                    else
                        propertyInfos.SetValue(aTSource, dataRow[aField.Name], null);
                }
                dataList.Add(aTSource);
            }
            return dataList;
        }

        #endregion Converts DataTable To List

        #region checker

        /// <summary>
        /// This Function will Check the Datatable if its Null Or Empty
        /// Sandeep Maurya
        /// </summary>
        /// <param name="dt">DataTable object to check</param>
        /// <returns></returns>
        public static bool IsDataTableNullOrEmpty(DataTable dt)
        {
            try
            {
                if ((dt != null) && (dt.Rows.Count > 0))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                return true;
            }
        }

        /// <summary>
        /// This Function will Check the Dataset if its Null Or Empty
        /// Sandeep Maurya
        /// </summary>
        /// <param name="ds">Dataset object to check</param>
        /// <returns></returns>
        public static bool IsDataSetNullOrEmpty(DataSet ds)
        {
            try
            {
                if ((ds != null) && (ds.Tables != null) && (ds.Tables.Count > 0) && (ds.Tables[0] != null) && (ds.Tables[0].Rows.Count > 0))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                return true;
            }
        }

        /// <summary>
        /// The Function will Check the object for Null Or Empty
        /// - Sandeep Maurya
        /// </summary>
        /// <param name="o">Object : The object to be checked</param>
        /// <returns></returns>
        public static bool IsObjectNullOrEmpty(Object o)
        {
            try
            {
                if ((o != null) && (o != ""))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                return true;
            }
        }

        /// <summary>
        /// The Function will Check the String for Null Or Empty
        /// Sandeep Maurya
        /// </summary>
        /// <param name="s">The string to be passed</param>
        /// <param name="valueifNull">value to be used when given string is null</param>
        /// <returns></returns>
        public static bool IsStringNullOrEmpty(string s)
        {
            try
            {
                // string s = WebXConvert.objectToString(o, string.Empty);
                if (string.IsNullOrEmpty(s.Trim()))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return true;
            }
        }

        #endregion checker

        #region object To xml
        public static string XmlSerializeToString(object objectInstance)
        {
            try
            {
                var sb = new StringBuilder();
                if (objectInstance == null)
                    return null;
                else
                {
                    var serializer = new XmlSerializer(objectInstance.GetType());
                    using (TextWriter writer = new StringWriter(sb))
                    {
                        serializer.Serialize(writer, objectInstance);
                    }
                }
                return sb.ToString();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion object To xml

        #region Send Mail
        public static Response SendMail(SendMail_DTO req)
        {
            var res = new Response();
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    //req.EmailFrom = "noreply@gmail.com";
                    mail.From = new MailAddress(req.EmailFromEmailID + req.EmailFromDisplayName);
                    //mail.From = new MailAddress(req.EmailFrom,req.EmailFromDisplayName);
                    mail.Body = req.EmailBody;
                    mail.Subject = req.Subject;
                    req.EmailTo = req.EmailTo;// "hisandeepmaurya@gmail.com";//delete this
                    mail.To.Add(req.EmailTo);
                    if (req.Arr_Cc != null)
                    {
                        foreach (var item in req.Arr_Cc)
                        {
                            mail.CC.Add(new MailAddress(item.MailId)); //Adding Multiple CC email Id
                        }
                    }
                    if (req.AttachmentFileName != null)
                    {
                        FileStream fStream = File.OpenRead(req.AttachmentFileName);
                        string fileName = Path.GetFileName(req.AttachmentFileName);
                        mail.Attachments.Add(new Attachment(fStream, fileName));
                    }
                    mail.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
                    smtp.EnableSsl = true;
                    NetworkCredential networkCredential = new NetworkCredential(req.Ntwk_EmailId,req.Ntwk_EmailPwd );
                    smtp.Credentials = networkCredential;
                    smtp.Send(mail);
                }
                res.status = "success";
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        #endregion Send Mail

    }
    #endregion Utility

    #region Convert
    public static class Cnvt
    {
        public static double ToDouble(object num)
        {
            try
            {
                return Convert.ToDouble(num);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public static Int16 ToInt16(object num)
        {
            double iNum;
            try
            {
                iNum = Math.Round(Convert.ToDouble(num));
                return Convert.ToInt16(iNum);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public static Int32 ToInt32(object num)
        {
            double iNum;
            try
            {
                iNum = Math.Round(Convert.ToDouble(num));
                return Convert.ToInt32(iNum);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public static Int64 ToInt64(object num)
        {
            double iNum;
            try
            {
                iNum = Math.Round(Convert.ToDouble(num));
                return Convert.ToInt64(iNum);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        /// <summary>
        /// Converts to DateTime from string using different cultures
        /// </summary>
        /// <param name="date"></param>
        /// <param name="culture"></param>
        /// <returns></returns>
        public static DateTime ToDateTime(string date, string culture)
        {
            System.Globalization.CultureInfo cif = new System.Globalization.CultureInfo(culture);
            DateTime dt;
            try
            {
                dt = Convert.ToDateTime(date, cif);
            }
            catch (Exception ex)
            {
                dt = DateTime.MinValue;
            }
            return dt;
        }

        public static bool ToBoolean(string Y_N)
        {
            return (Y_N.ToUpper().CompareTo("Y") == 0) ? true : false;
        }


        /// <summary>
        /// The Function will Convert the Passed object to Dataset and retrun it
        /// it will return the Second Parameter if Passed Object's Value is null
        ///  - Sandeep Maurya
        /// </summary>
        /// <param name="s">Object : The Object to be converted</param>
        /// <param name="valueifNull">DataSet object : The Function will return this Parameter if Passed Object's Value is null</param>
        /// <returns></returns>
        public static DataSet objectToDataSet(Object objToConvert, DataSet valueifNull)
        {
            try
            {
                if ((objToConvert != null))
                {
                    DataSet t = (DataSet)(objToConvert);
                    return t;
                }
                else
                {
                    return valueifNull;

                }
            }
            catch (Exception ex)
            {

                return valueifNull;
            }
        }

        /// <summary>
        /// The function will be used to convert an object type to int type
        ///  - Sandeep Maurya
        /// </summary>
        /// <param name="s">object: The value to convert</param>
        /// <param name="valueifNull">int: returns the value if passed value is null</param>
        /// <returns></returns>
        public static int objectToInt(Object valueToConvert, int valueifNull)
        {
            try
            {
                if ((valueToConvert != null))
                {
                    int t = Convert.ToInt32(valueToConvert);
                    return t;
                }
                else
                {
                    return valueifNull;
                }
            }
            catch (Exception ex)
            {
                return valueifNull;
            }
        }

        /// <summary>
        /// The function will be used to convert an object type to string type
        ///  - Sandeep Maurya
        /// </summary>
        /// <param name="s">object: The value to convert</param>
        /// <param name="valueifNull">string: returns the value if passed value is null</param>
        /// <returns></returns>
        public static string objectToString(Object valueToConvert, string valueifNull)
        {
            try
            {
                if ((valueToConvert != null))
                {
                    string t = valueToConvert.ToString();
                    return t;
                }
                else
                {
                    return valueifNull;
                }
            }
            catch (Exception ex)
            {
                return valueifNull;
            }
        }

        /// <summary>
        /// The function will be used to convert an object type to double type
        ///  - Sandeep Maurya
        /// </summary>
        /// <param name="s">object: The value to convert</param>
        /// <param name="valueifNull">double: returns the value if passed value is null</param>
        /// <returns></returns>
        public static double objectToDouble(Object valueToConvert, double valueifNull)
        {
            try
            {
                if ((valueToConvert != null))
                {
                    double t = Convert.ToDouble(valueToConvert);
                    return t;
                }
                else
                {
                    return valueifNull;
                }
            }
            catch (Exception ex)
            {
                return valueifNull;
            }
        }

        /// <summary>
        /// The function will be used to convert an object type to decimal type
        ///  - Sandeep Maurya
        /// </summary>
        /// <param name="s">object: The value to convert</param>
        /// <param name="valueifNull">double: returns the value if passed value is null</param>
        /// <returns></returns>
        public static decimal objectToDecimal(Object valueToConvert, decimal valueifNull)
        {
            try
            {
                if ((valueToConvert != null) && valueToConvert.ToString() != "")
                {
                    decimal t = Convert.ToDecimal(valueToConvert);
                    return t;
                }
                else
                {
                    return valueifNull;
                }
            }
            catch (Exception ex)
            {
                return valueifNull;
            }
        }

        /// <summary>
        /// The function will be used to convert an object type to boolean type
        ///  - Sandeep Maurya
        /// </summary>
        /// <param name="s">object: The value to convert</param>
        /// <param name="valueifNull">bool: returns the value if passed value is null</param>
        /// <returns></returns>
        public static bool objectToBoolean(Object s, bool valueifNull)
        {
            try
            {
                if ((s != null))
                {
                    bool t = Convert.ToBoolean(Convert.ToInt16(s));
                    return t;
                }
                else
                {
                    return valueifNull;
                }
            }
            catch (Exception ex)
            {
                return valueifNull;
            }
        }

        /// <summary>
        /// The function will convert the timeString into TimeSpan object that we can add into DateTime object
        /// </summary>
        /// <param name="txtTime">Time String</param>
        /// <param name="timeFormat">pass the timeFormat i.e. 12HR OR 24HR</param>
        /// <returns></returns>
        public static TimeSpan ConvertToTime(string txtTime, string timeFormat)
        {
            TimeSpan tm = new TimeSpan(0, 0, 0);
            if (!string.IsNullOrEmpty(txtTime.Trim()))
            {
                var strTime = txtTime.Substring(0, 5);
                tm = TimeSpan.Parse(strTime);

                if (timeFormat == "12HR")
                {
                    var strAmPm = txtTime.Substring(5, 2).ToUpper();

                    if (strAmPm == "PM")
                    {
                        if (tm.Hours < 12)
                        {
                            tm = new TimeSpan(tm.Hours + 12, tm.Minutes, tm.Seconds);
                        }
                    }
                    else if (strAmPm == "AM")
                    {
                        if (tm.Hours == 12)
                        {
                            tm = new TimeSpan(0, tm.Minutes, tm.Seconds);
                        }
                    }
                }
            }
            return tm;
        }

    }
    #endregion Convert

    #region API Name
    public static class API
    {
        #region Account
        public static string AuthenticateUser_URL = "Account/AuthenticateUser";
        public static string GetMenu_URL = "Account/GetMenu";
        public static string GetRole_URL = "Account/GetRole";
        public static string GetRoleEdit_URL = "Account/GetRoleEdit";
        public static string EditRole_URL = "Account/EditRole";
        public static string GetUser_URL = "Account/GetUser";
        public static string AddUpdateUser_URL = "Account/AddUpdateUser";
        public static string DeleteUser_URL = "Account/DeleteUser";


        #endregion Account

        #region Website
        public static string AddEditWebsiteData_URL = "Website/AddEditWebsite";
        public static string GetData_Website_URL = "Website/GetData_Website";
        public static string GetWebsiteDetail_URL = "Website/GetWebsiteDetail";
        public static string UpdateWebStatus_URL = "Website/UpdateWebStatus";
        public static string GenerateLead_URL = "Website/GenerateLead";
        public static string Get_WebsiteTheme_URL = "Website/Get_WebsiteTheme";
        #endregion Website

        #region Common
        public static string error = "Common/ErrorLogger";
        #endregion Common
    }
    #endregion API Name

    #region API calling
    public class CommonAPIUtility
    {

        public async Task<string> GetAsync(string api)
        {
            HttpClient httpClient = new HttpClient();
            HttpContent httpContent = new StringContent("", Encoding.UTF8, "application/json");
            httpClient.DefaultRequestHeaders.Add(Constant.authKey, Constant.authValue);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", string.Format("{0}:{1}", Constant.authKey, Constant.authValue));
            var response = await httpClient.GetStringAsync(Constant.prfx + api).ConfigureAwait(false);
            return response;
        }

        public async Task<string> GetPostAsync(string api, dynamic req)
        {
            var res = "";
            HttpClient httpClient = new HttpClient();
            var json = JsonConvert.SerializeObject(req);
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", string.Format("{0}:{1}", Constant.authKey, Constant.authValue));
            var response = await httpClient.PostAsync(Constant.prfx + api, httpContent).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
                res = response.Content.ReadAsStringAsync().Result;
            else
                throw new Exception("Something went wrong:- " + response.Content.ReadAsStringAsync().Result);
            return res;
        }
    }
    #endregion API calling

    #region Constant Value
    public class Constant
    {
        public static bool IsLocal = Convert.ToBoolean(ConfigurationManager.AppSettings["IsLocal"]);
        public static string DBQueryString = GetDBQueryString();
        public static string prfx = Getprfx();
        public static string authKey = "WhompAuthName";
        public static string authValue = "authValue";
        public static bool isFileError = true;
        public static string ErrorFilePath = "~/Logger/";
        public static string Ntwk_EmailId = "whompsprojects@gmail.com";
        public static string Ntwk_EmailPwd = "dec@2012";
        public static string WhompsURL = "www.google.com";
        static string GetDBQueryString()
        {
            if (IsLocal)
                DBQueryString = @"Data Source=VF317\MSSQLSERVER01;Initial Catalog=WhompWebsite;User ID=whomps;password=whomps;";
            else
                DBQueryString = "Data Source=.\\SQLEXPRESS;Initial Catalog=WhompWebsite_V1;User ID=Whomp;password=no1can@2012;";
            return DBQueryString;
        }

        static string Getprfx()
        {
            if (IsLocal)
                //prfx = "http://localhost:57704/API/";
            prfx = "http://192.168.1.44/API/";
            else
                prfx = "http://localhost/WhompsApi/API/";
            return prfx;
        }
    }

    public class Constant_DTO
    {
        public string prfx { get; set; }
        public string DBQueryString { get; set; }
    }
    #endregion Constant Value

    #region Get Session Value
    public class SessionUtil
    {
        public static string val(string key, string valueifNull = "")
        {
            try
            {
                //if (HttpContext.Current != null && HttpContext.Current.Session != null || HttpContext.Current.Session[key] != null)
                if (HttpContext.Current.Session[key] != null)
                    return System.Web.HttpContext.Current.Session[key].ToString().Trim();
                else
                    return null;
            }
            catch (Exception ex)
            {
                return valueifNull;
            }
        }
    }
    #endregion Get Session Value
}
