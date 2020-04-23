using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Security;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using EProc_On_Metronic.Models;

namespace EProc_On_Metronic.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        public static string Baseurl = "http://197.155.64.54:5050/datafetchapi/";
        //public static string Baseurl = "http://192.168.1.87:5050/datafetchapi/";
        //public static string Baseurl = "https://sngutu30:3031/";
        public ActionResult Index_Eproc()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Index_EBid()
        {
            return View();
        }

        public ActionResult About()
        {
          return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    
        public ActionResult OpenEOI()
        {
            return View();
        }

        public ActionResult AppliedEOI()
        {
            return View();
        }

        public ActionResult AwardedEOI()
        {
            return View();
        }
        public ActionResult AwardedCategories()
        {
            return View();
        }
        public ActionResult SupplierCategoriesList()
        {
            return View();
        }
        public ActionResult ApplyforOpenRfQ()
        {
            return View();
        }

        public ActionResult OpenRfPs()
        {
            return View();
        }

        public ActionResult AppliedRfPs()
        {
            return View();
        }

        public ActionResult Login_Eproc()
        {
            Session["logintype"] = "eprocurement";
            return View("Login");
        }
        public ActionResult Login_Ebid()
        {
            Session["logintype"] = "ebid";
            return View("Login");
        }
        public ActionResult ApplyforPublicTender(string tenderNor)
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult ChooseAccounttoCreate()
        {
            return View();
        }

        public ActionResult SignupIndividual()
        {
            return View();
        }

        public ActionResult SignupCorporate()
        {
            return View();
        }
        public ActionResult UploadsCustorVendor()
        {
            return View();
        }
        public ActionResult ApplyCategorization()
        {
            return View();
        }

        public ActionResult ApplyforThisTender()
        {
            return View();
        }
        public ActionResult AwardedTenders()
        {
            return View();
        }

        public ActionResult Supplier_Registration_Form()
        {
            return View();
        }

        public ActionResult BankDetails()
        {
            return View();
        }

        public ActionResult TestForm()
        {
            return View();
        }

        public ActionResult TendersOpentoPublic()
        {
            List<ProcurementModel> appliedtenders = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetOpenTenders");
            appliedtenders = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
            var record = (from a in appliedtenders where a.Closed == false select a).ToList();
            return View(record);
        }
        public ActionResult Homepage()
        {
            List<ProcurementModel> appliedtenders = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetOpenTenders");
            appliedtenders = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
            Session["opentendercnter"] = appliedtenders.Count();
            var record = (from a in appliedtenders where a.Closed == false select a).ToList();
            HomepageCounter();
            return View(record);}

        public ActionResult SupplierCatList()
        {
            List<DropdownListsModel> allsupplierscat = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetSupplierCat");
            allsupplierscat = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var record = (from a in allsupplierscat where a.Category!="" && a.CategoryName!="" select a).ToList();
            return View(record);
        }

        public ActionResult OpenTenders()
        {
            List<ProcurementModel> allopentenders = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetOpenTenders");
            allopentenders = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
            var record = (from a in allopentenders select a).ToList();
            return View(record);
        }

        public ActionResult OpenRfQs()
        {
            List<ProcurementModel> allopenrfqs = null;
            var catgry = (string) Session["category"];
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetOpenRfQs");
            allopenrfqs = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
            //var record = (from a in allopenrfqs where a.Title != "" select a).DistinctBy(s => s.No).ToList();
            var record = (from a in allopenrfqs where a.Title != "" && a.Category_Code == catgry select a).DistinctBy(s => s.No).ToList();
            return View(record);
        }

        public ActionResult AppliedCategories()
        {
            List<PreQualificationModel> appliedcategoriess = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetAllPreQualifications");
            appliedcategoriess = JsonConvert.DeserializeObject<List<PreQualificationModel>>(json);
            //select filter from returned Json
            var record = (from a in appliedcategoriess select a)
                .Where(r => r.Contact_No == Convert.ToString(Session["contactNo"])).ToList();
            return View(record);
        }

        public ActionResult AppliedTenders()
        {
            List<TenderModel> appliedtenders = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetTenderApplication/" + (string)Session["vendorNo"]);
            appliedtenders = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var record = (from a in appliedtenders select a).ToList();
            return View(record);
        }


        public ActionResult UploadsList()
        {
            var uploadedFiles = new List<UploadedFile>();
            var cntNo = Session["contactNo"].ToString();
            if (cntNo.Contains(":"))
                cntNo = cntNo.Replace(":", "[47]");

            var rootFolder = Server.MapPath("~/Uploads");
            var subfolder = Path.Combine(rootFolder, cntNo);
            if (!Directory.Exists(subfolder))
                Directory.CreateDirectory(subfolder);

            var files = Directory.GetFiles(subfolder);
            foreach (var file in files)
            {
                var fileInfo = new FileInfo(file);

                var uploadedFile = new UploadedFile { FileName = Path.GetFileName(file) };
                uploadedFile.Size = fileInfo.Length;

                uploadedFile.Path = (subfolder) + "/" + Path.GetFileName(file);
                uploadedFiles.Add(uploadedFile);
            }

            return View(uploadedFiles);
        }

        public static List<SelectListItem> SupplierCategories()
        {
            List<DropdownListsModel> allsupplierscat = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetSupplierCat");
            allsupplierscat = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);

            List<SelectListItem> supplierItems = allsupplierscat.Where(r=>r.Category!="" && r.CategoryName!="").Select(supplier => new SelectListItem
            {
                Text = supplier.CategoryName,
                Value = supplier.Category
            }).ToList();
            return supplierItems;
        }

        public ActionResult AllSupplierCategories()
        {
            List<DropdownListsModel> allsupplierscat = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetSupplierCat");
            allsupplierscat = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var allsuppliers = (from a in allsupplierscat where a.Category != "" && a.CategoryName !="" select a).ToList();
            return View(allsuppliers);
        }
        
        private static List<SelectListItem> PostalCode()
        {
            List<DropdownListsModel> postacode = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetPostaCodes");
            postacode = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);

            List<SelectListItem> postalitems = postacode.Select(posta => new SelectListItem
            {
                Text = posta.Code,
                Value = posta.Code
            }).ToList();
            return postalitems;
        }
        
        public static List<SelectListItem> Country()
        {
            List<DropdownListsModel> countries = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetCountry");
            countries = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            List<SelectListItem> countryitems = countries.Select(nchi => new SelectListItem
            {
                Text = nchi.Code,
                Value = nchi.Name
            }).ToList();
            return countryitems;
        }

        private static List<SelectListItem> FiscalYear()
        {
            List<DropdownListsModel> fiscalyear = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetFiscalYear");
            fiscalyear = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
          
            List<SelectListItem> yearItems = fiscalyear.Select(myyear => new SelectListItem
            {
                Text = myyear.Code,
                Value = myyear.Code
            }).ToList();
            return yearItems;
        }

        public ActionResult FiscalYears()
        {
            DropdownListsModel dropdownmodel = new DropdownListsModel();
            dropdownmodel.MyDropdownList = FiscalYear();
            return View(dropdownmodel);
        }

        public ActionResult PostalCodeList()
        {
            List<DropdownListsModel> postacode = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetPostaCodes");
            postacode = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);

            var postalitems = (from a in postacode select a).ToList();
            return View(postalitems);
        }

        public ActionResult CountryList()
        {
            List<DropdownListsModel> countries = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetCountry");
            countries = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var countryitems = (from a in countries select a).ToList();

            return View(countryitems);
        }

        public ActionResult IfpRequestsList()
        {
            List<IFPRequestsModel> ifpRequests = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetIfPs");
            ifpRequests = JsonConvert.DeserializeObject<List<IFPRequestsModel>>(json);
            var ifpitems = (from a in ifpRequests select a).ToList();

            return View(ifpitems);
        }


        public JsonResult SelectedPosta(string postcode)
        {
            List<DropdownListsModel> postacode = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetPostaCodes");
            postacode = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);

            var result = (from a in postacode where  a.Code== postcode select a.City).FirstOrDefault();

            if (result != null)
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json("notfound", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListtheIfPsTable(string ifpnumber)
        {
            List<IFPRequestsModel> ifpRequests = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetIfPs");
            ifpRequests = JsonConvert.DeserializeObject<List<IFPRequestsModel>>(json);
            var ifpitems = (from a in ifpRequests where a.Code== ifpnumber select a).ToList();
            
            return Json(ifpitems, JsonRequestBehavior.AllowGet);
        }       

        public JsonResult DynamicDDlCountryList()
        {
            List<DropdownListsModel> countries = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetCountry");
            countries = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var countryitems = (from a in countries select a).ToList();
            return Json(countryitems, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult RegisterSupplier(VendorModel vendormodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                var status = nvWebref.FnSupplierRegistration(vendormodel.BusinessType, vendormodel.VendorType, vendormodel.OwnerType, vendormodel.IndustryGroup,
                    vendormodel.PostaCode, vendormodel.CountryofOrigin, vendormodel.CompanySize, vendormodel.NominalCap, vendormodel.DealerType, vendormodel.DateofIncorporation,
                    vendormodel.OpsDate, vendormodel.LanguageCode, vendormodel.Vision, vendormodel.Mision, vendormodel.PoBox, vendormodel.PhysicalLocation,
                    vendormodel.PostaCity, vendormodel.WebUrl, vendormodel.TelephoneNo, vendormodel.HouseNo, vendormodel.FloorNo, vendormodel.PlotNo,
                    vendormodel.StreetorRoad, vendormodel.Fax, vendormodel.MaxBizValue, vendormodel.MobileNo, vendormodel.NatureofBz, vendorNo, vendormodel.CertofIncorporation);

                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("success*" + res[1], JsonRequestBehavior.AllowGet);

                    default:
                        return Json("danger*" + res[1], JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("danger*" + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult AddaBank(BankModel bankmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                var status = nvWebref.FnInsertBank(vendorNo, bankmodel.BankCode, bankmodel.BankName,bankmodel.CurrencyCode, bankmodel.BankAccountNo);
                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("success*" + res[1], JsonRequestBehavior.AllowGet);

                    default:
                        return Json("danger*" + res[1], JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("danger*" + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult AddaDirector(DirectorModel directormodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                var status = nvWebref.FnInsertDirector(vendorNo, directormodel.Phonenumber, directormodel.OwnershipPercentage, 
                    directormodel.Nationality, directormodel.Email, directormodel.Address, directormodel.Fullname, directormodel.IdNumber);
                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("success*" + res[1], JsonRequestBehavior.AllowGet);

                    default:
                        return Json("danger*" + res[1], JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("danger*" + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AddLitigation(LitigationModel litgmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                int catdispute = 0, awardtype = 0;

                var discat = litgmodel.CategoryofDispute;
                var ardtyp = litgmodel.AwardType;
                switch (discat)
                {
                    case "Litigation":
                        catdispute = 1;
                        break;
                    case "Arbitration":
                        catdispute = 2;
                        break;
                    case "Mediation":
                        catdispute = 3;
                        break;
                   default:
                        catdispute = 0;
                        break;
                }
               
                switch (ardtyp)
                {
                    case "Pending Verdict":
                        awardtype = 1;
                        break;
                    case "Won":
                        awardtype = 2;
                        break;
                    case "Lost":
                        awardtype = 3;
                        break;
                    default:
                        awardtype = 0;
                        break;
                }

                var status = nvWebref.FnInsertLitigationH(vendorNo, litgmodel.DisputeDescription, catdispute, litgmodel.Year, litgmodel.TheotherDisputeparty, litgmodel.DisputeAmount, awardtype);
                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("success*" + res[1], JsonRequestBehavior.AllowGet);

                    default:
                        return Json("danger*" + res[1], JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("danger*" + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        static string EncryptP(string mypass)
        {
            //encryptpassword:
            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
            {
                UTF8Encoding utf8 = new UTF8Encoding();
                byte[] data = md5.ComputeHash(utf8.GetBytes(mypass));
                return Convert.ToBase64String(data);
            }
        }

        protected string NewPassword()
        {
            var nPwd = "";
            var rdmNumber = new Random();
            nPwd = rdmNumber.Next(1000, 1999).ToString();
            return nPwd;
        }
       
        protected void SendNewPassword(string myEmail, string myName, string myPassword)
        {
            const string mSubject = @"Request password Reset";
            string emailbody = "Dear " + myName + ",";
            emailbody += "<br />You have reset your password successfully. Your new Password is " + myPassword +
                         ". Kindly go to <a href='http://41.89.63.253:6060/'>Login</a>";
            emailbody += "<br /><br />Thank you";
            //send email to user
            WsConfig.MailFunction(emailbody, myEmail, mSubject);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult CheckLogin(string myUserId, string myPassword)
        {
            try
            {
                List<Login> loginmodel = null;
                WebClient wc = new WebClient();
                wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
                string json = wc.DownloadString(Baseurl + "api/GetPortalUsers");
                loginmodel = JsonConvert.DeserializeObject<List<Login>>(json);

                List<ContactsModel> contacts = null;
                //wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
                string json2 = wc.DownloadString(Baseurl + "api/GetPortalContacts");
                contacts = JsonConvert.DeserializeObject<List<ContactsModel>>(json2);

                List<VendorModel> vendor = null;
                //wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
                string json3 = wc.DownloadString(Baseurl + "api/GetAllVendors");
                vendor = JsonConvert.DeserializeObject<List<VendorModel>>(json3);

                // var nvOdata = WsConfig.ODataObj();
                if (string.IsNullOrWhiteSpace(myUserId))
                    return Json("UsernameEmpty", JsonRequestBehavior.AllowGet);
                if (string.IsNullOrWhiteSpace(myPassword))
                    return Json("PasswordEmpty", JsonRequestBehavior.AllowGet);

                var loginresult = (from a in loginmodel where a.IDNoorRegNo == myUserId select a).ToList();
                var result = loginresult.FirstOrDefault();
                if (result != null)
                {
                    Session["idnumber"] = result.IDNoorRegNo;
                    Session["prequalified"] = result.ActivatedAsVendor;
                    Session["email"] = result.Email;
                    Session["password"] = result.Password;
                    if (result.Password != EncryptP(myPassword))
                        return Json("PasswordMismatched", JsonRequestBehavior.AllowGet);
                   
                    var contactDetails = (from a in contacts where a.E_mail == (string)Session["email"] select a).ToList().SingleOrDefault();
                    if (contactDetails != null)
                    {
                        //set Sessions here
                        Session["name"] = contactDetails.Name;
                        Session["email"] = contactDetails.E_mail;
                        Session["contactNo"] = contactDetails.No;
                        Session["userNo"] = contactDetails.No;
                    }
                    else
                    {
                        return Json("Details does not exist on the system, create account first!",
                            JsonRequestBehavior.AllowGet);
                    }
                    //check if the are in Vendor table
                    var vendorcollection = (from a in vendor where a.Primary_Contact_No == (string)Session["contactNo"] select a).ToList();

                    if (result.isAdmin == true && result.ActivatedAsVendor == true)
                    {
                        Session["isAdmin"] = "administrator";

                        foreach (var vend in vendorcollection)
                        {
                            Session["name"] = contactDetails.Name;
                            Session["vendorNo"] = vend.No;
                            Session["userNo"] = vend.No;
                            Session["category"] = vend.Supplier_Category;
                        }
                        Session.Remove("contact");
                        Session.Remove("customer");
                        return Json("Loginadmin", JsonRequestBehavior.AllowGet);
                    }
                    if (result.isAdmin == false && result.ActivatedAsVendor == true)
                    {
                        Session["isAdmin"] = "customer";
                        foreach (var vend in vendorcollection)
                        {
                            Session["name"] = contactDetails.Name;
                            Session["vendorNo"] = vend.No;
                            Session["userNo"] = vend.No;
                            Session["category"] = vend.Supplier_Category;
                        }
                        Session.Remove("contact");
                        Session.Remove("administrator");
                        CountApplicationsInfo((string)Session["vendorNo"]);
                        return Json("Logincustomer", JsonRequestBehavior.AllowGet);
                    }

                    if (result.isAdmin == false && result.ActivatedAsVendor == false)
                    {
                        Session["isAdmin"] = "contact";
                        Session.Remove("customer");
                        Session.Remove("administrator");
                        Session["vendorNo"] = null;
                        return Json("Logincontact", JsonRequestBehavior.AllowGet);
                    }
                }
                return Json("InvalidLogin", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public new ActionResult Profile()
        {
            List<ProfileModel> profilemodel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetPortalContacts");
            profilemodel = JsonConvert.DeserializeObject<List<ProfileModel>>(json);
            //select filter from returned Json
            var record = (from a in profilemodel orderby a.No select a).Where(r => r.No == (string)Session["contactNo"])
                .ToList();
            return View(record);
        }
        public ActionResult CheckLogout()
        {
            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();
            Response.AppendHeader("Cache-Control", "no-store");
            Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            FormsAuthentication.SignOut();
            return RedirectToAction("Homepage", "Home");
        }

        public JsonResult ApplyforPreQualifc(string selectedcategory, HttpPostedFileBase krapinFile, HttpPostedFileBase cbqFile, HttpPostedFileBase certofRegFile, HttpPostedFileBase taxcomplyFile)
        {
            try
            {
               var nvWebref = WsConfig.EProcWebRef;
                var tContactNo = Convert.ToString(Session["contactNo"]);
                if (string.IsNullOrWhiteSpace(selectedcategory))
                    return Json("Select Category", JsonRequestBehavior.AllowGet);
                if (krapinFile == null)
                    return Json("KRApinnull", JsonRequestBehavior.AllowGet);
                if (cbqFile == null)
                    return Json("cbqFilenull", JsonRequestBehavior.AllowGet);
                if (certofRegFile == null)
                    return Json("certofRegFilenull", JsonRequestBehavior.AllowGet);
                if (taxcomplyFile == null)
                    return Json("taxcomplyFilenull", JsonRequestBehavior.AllowGet);

                if (tContactNo.Contains(":"))
                    tContactNo = tContactNo.Replace(":", "[58]");

                var rootFolder = Server.MapPath("~/Uploads");
                var subfolder = Path.Combine(rootFolder,"Colaborator Card/" +tContactNo);

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);

                string fileName0 = Path.GetFileName(krapinFile.FileName);
                string ext0 = _getFileextension(krapinFile);
                string savedF0 = tContactNo + "_KRAPIN" + ext0;

                string fileName1 = Path.GetFileName(cbqFile.FileName);
                string ext1 = _getFileextension(cbqFile);
                string savedF1 = tContactNo + "_CONFIDENTIAL BUSINESS QUESTIONNARE" + ext1;

                string fileName2 = Path.GetFileName(certofRegFile.FileName);
                string ext2 = _getFileextension(certofRegFile);
                string savedF2 = tContactNo + "_CERT OF REGISTRATION" + ext2;

                string fileName3 = Path.GetFileName(taxcomplyFile.FileName);
                string ext3 = _getFileextension(taxcomplyFile);
                string savedF3 = tContactNo + "_TAX COMPLIANT CERT" + ext3;

                krapinFile.SaveAs(subfolder + "/" + savedF0);
                cbqFile.SaveAs(subfolder + "/" + savedF1);
                certofRegFile.SaveAs(subfolder + "/" + savedF2);
                taxcomplyFile.SaveAs(subfolder + "/" + savedF3);
                string uploads = string.Format("{0}",
                    "<div class='form-group'>" +
                    "<h3><strong style='color: chocolate'>List of files you uploaded successfully!</strong></h3><br/>" +
                    fileName0 + "<br/>" + fileName1 + "<br/>" + fileName2 + "<br/>" + fileName3 +
                    "<br/></div>");
                var contNoReverse = tContactNo.Replace("[58]", ":");
                var status = nvWebref.FnApplyPreQualification(contNoReverse, selectedcategory);
                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("Your registration for prequalification has been received!*" + uploads,
                            JsonRequestBehavior.AllowGet);
                    default:
                        return Json(res[1], JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult SubmitTenderApp(string myTendorNo, HttpPostedFileBase krapinFile,
            HttpPostedFileBase cbqFile, HttpPostedFileBase certofRegFile, 
            HttpPostedFileBase taxcomplyFile, HttpPostedFileBase tecnFile, HttpPostedFileBase fincFile)
        {
            try
            {
                var nvWebref = WsConfig.EProcWebRef;
                var vendorNo = Session["vendorNo"].ToString();
                var tenderNu = myTendorNo;
                var myemail = (string) Session["email"];

                if (tecnFile == null)
                    return Json("tecFilenull", JsonRequestBehavior.AllowGet);
                if (fincFile == null)
                    return Json("FincFilenull", JsonRequestBehavior.AllowGet);
                if (krapinFile == null)
                    return Json("KRApinnull", JsonRequestBehavior.AllowGet);
                if (cbqFile == null)
                    return Json("cbqFilenull", JsonRequestBehavior.AllowGet);
                if (certofRegFile == null)
                    return Json("certofRegFilenull", JsonRequestBehavior.AllowGet);
                if (taxcomplyFile == null)
                    return Json("taxcomplyFilenull", JsonRequestBehavior.AllowGet);

                if (vendorNo.Contains(":"))
                    vendorNo = vendorNo.Replace(":", "[58]");

                if (tenderNu.Contains(":"))
                    tenderNu = tenderNu.Replace(":", "[58]");
                    tenderNu = tenderNu.Replace("/", "[47]");

                var rootFolder = Server.MapPath("~/Uploads");
                var subfolder = Path.Combine(rootFolder, "Bidder Mandatory Requirements/" + tenderNu + "/" + vendorNo);

                var tecDocfolder = subfolder + "/TechnicalDocs";
                var finacialDocfolder = subfolder + "/FinancialDocs";

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);

                if (!Directory.Exists(tecDocfolder))
                    Directory.CreateDirectory(tecDocfolder);

                if (!Directory.Exists(finacialDocfolder))
                    Directory.CreateDirectory(finacialDocfolder);

                string fileName0 = Path.GetFileName(krapinFile.FileName);
                string ext0 = _getFileextension(krapinFile);
                string savedF0 = vendorNo + "_KRAPIN" + ext0;

                string fileName1 = Path.GetFileName(cbqFile.FileName);
                string ext1 = _getFileextension(cbqFile);
                string savedF1 = vendorNo + "_CONFIDENTIAL BUSINESS QUESTIONNARE" + ext1;

                string fileName2 = Path.GetFileName(certofRegFile.FileName);
                string ext2 = _getFileextension(certofRegFile);
                string savedF2 = vendorNo + "_CERT OF REGISTRATION" + ext2;

                string fileName3 = Path.GetFileName(taxcomplyFile.FileName);
                string ext3 = _getFileextension(taxcomplyFile);
                string savedF3 = vendorNo + "_TAX COMPLIANT CERT" + ext3;

                string fileName4 = Path.GetFileName(tecnFile.FileName);
                string ext4 = _getFileextension(tecnFile);
                string savedF4 = vendorNo + "_TECHNICAL PROPOSAL" + ext4;

                string fileName5 = Path.GetFileName(fincFile.FileName);
                string ext5 = _getFileextension(fincFile);
                string savedF5 = vendorNo + "_FINANCIAL PROPOSAL" + ext5;


                krapinFile.SaveAs(subfolder + "/" + savedF0);
                cbqFile.SaveAs(subfolder + "/" + savedF1);
                certofRegFile.SaveAs(subfolder + "/" + savedF2);
                taxcomplyFile.SaveAs(subfolder + "/" + savedF3);

                tecnFile.SaveAs(tecDocfolder + "/" + savedF4);
                fincFile.SaveAs(finacialDocfolder + "/" + savedF5);

                string uploads = string.Format("{0}",
                    "<div class='form-group'>" +
                    "<h4><strong style='color: chocolate'>List of files you uploaded successfully!</strong></h4>" +
                    fileName0 + "<br/>" + fileName1 + "<br/>" + fileName2 + "<br/>" + fileName3 + "<br/>" + fileName4 + "<br/>" +
                     fileName5 +
                    "<br/></div>");

                var status = nvWebref.FnApplyforTender(myTendorNo, vendorNo, myemail);

                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("submitted success*" + uploads, JsonRequestBehavior.AllowGet);

                    default:
                        return Json(res[1], JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public string _getFileextension(HttpPostedFileBase filename)
        {
            return (Path.GetExtension(filename.FileName));
        }

        public ActionResult UploadFiles()
        {
            return View();
        }
        public JsonResult FnUploadAllDocs(HttpPostedFileBase krapinFile, HttpPostedFileBase cbqFile, HttpPostedFileBase certofRegFile, HttpPostedFileBase taxcomplyFile)
        {
            var cntNo = Convert.ToString(Session["contactNo"]);
            int errCounter = 0, filesCounter = 4, succCounter = 0;
            try
            {
                if (krapinFile == null)
                {
                    errCounter++;
                    return Json("KRApinnull", JsonRequestBehavior.AllowGet);
                }
                if (cbqFile == null)
                {
                    errCounter++;
                    return Json("cbqFilenull", JsonRequestBehavior.AllowGet);
                }
                if (certofRegFile == null)
                {
                    errCounter++;
                    return Json("certofRegFilenull", JsonRequestBehavior.AllowGet);
                }
                if (taxcomplyFile == null)
                {
                    errCounter++;
                    return Json("taxcomplyFilenull", JsonRequestBehavior.AllowGet);
                }

                if (cntNo.Contains(":"))
                    cntNo = cntNo.Replace(":", "[58]");

                var rootFolder = Server.MapPath("~/Uploads");
                var subfolder = Path.Combine(rootFolder, "Colaborator Card/" + cntNo);

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);

                succCounter = (filesCounter - errCounter) / filesCounter * 100;

                string fileName0 = Path.GetFileName(krapinFile.FileName);
                string ext0 = _getFileextension(krapinFile);
                string savedF0 = cntNo + "_KRAPIN" + ext0;

                string fileName1 = Path.GetFileName(cbqFile.FileName);
                string ext1 = _getFileextension(cbqFile);
                string savedF1 = cntNo + "_CONFIDENTIAL BUSINESS QUESTIONNARE" + ext1;

                string fileName2 = Path.GetFileName(certofRegFile.FileName);
                string ext2 = _getFileextension(certofRegFile);
                string savedF2 = cntNo + "_CERT OF REGISTRATION" + ext2;

                string fileName3 = Path.GetFileName(taxcomplyFile.FileName);
                string ext3 = _getFileextension(taxcomplyFile);
                string savedF3 = cntNo + "_TAX COMPLIANT CERT" + ext3;

                krapinFile.SaveAs(subfolder + "/" + savedF0);
                cbqFile.SaveAs(subfolder + "/" + savedF1);
                certofRegFile.SaveAs(subfolder + "/" + savedF2);
                taxcomplyFile.SaveAs(subfolder + "/" + savedF3);
                string uploads = string.Format("{0}",
                    "<div class='form-group'>" +
                    "<h4><strong style='color: chocolate'>List of files you uploaded successfully ("+ succCounter + "%)!</strong></h4>" +
                    fileName0 + "<br/>" + fileName1 + "<br/>" + fileName2 + "<br/>" + fileName3 +
                    "<br/></div>");
                return Json("success*" + uploads+"*"+ succCounter, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json("danger*"+ex.Message + "*" + succCounter, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult FnUploadSelectedDoc(HttpPostedFileBase browsedfile, string typauploadselect)
        {
            try
            {
                var cntNo = Convert.ToString(Session["contactNo"]);

                if (browsedfile == null)
                    return Json("browsedfilenull", JsonRequestBehavior.AllowGet);

                if (cntNo.Contains(":"))
                    cntNo = cntNo.Replace(":", "_");

                var rootFolder = Server.MapPath("~/Uploads");
                var subfolder = Path.Combine(rootFolder, cntNo);

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);

                string fileName0 = Path.GetFileName(browsedfile.FileName);
                browsedfile.SaveAs(subfolder + "/" + fileName0);
               
                string uploads = string.Format("{0}",
                    "<div class='form-group'>" +
                    "<h4><strong style='color: chocolate'>List of files you uploaded successfully!</strong></h4>" +
                    fileName0 + "<br/>"+
                    "<br/></div>");
                return Json("success*" + uploads, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public void CountApplicationsInfo(string vendorNum)
        {
            try
            {
                var nvWebref = WsConfig.EProcWebRef;
                WebClient wc = new WebClient();
                wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));

                List<ProcurementModel> allopenrfqs = null;
                List<PreQualificationModel> appliedcategoriess = null;
                List<DropdownListsModel> allsupplierscat = null;
                
                string json6 = wc.DownloadString(Baseurl + "api/GetSupplierCat");
                allsupplierscat = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json6);
                var suppcat = (from a in allsupplierscat where a.Category != "" && a.CategoryName != "" select a).ToList();


                string json = wc.DownloadString(Baseurl + "api/GetOpenRfQs");
                allopenrfqs = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
                var rfqcount = (from a in allopenrfqs where a.Title != "" && a.Category_Code == (string)Session["category"] select a).DistinctBy(s => s.No).ToList();
               //var rfqcount = (from a in allopenrfqs where a.Title != "" select a).DistinctBy(s => s.No).ToList();


                string json2 = wc.DownloadString(Baseurl + "api/GetAllPreQualifications");
                appliedcategoriess = JsonConvert.DeserializeObject<List<PreQualificationModel>>(json2);
                var appliedcatcount = (from a in appliedcategoriess orderby a.Vendor_No select a)
                    .Where(r => r.Contact_No == Convert.ToString(Session["contactNo"])).ToList();

                string json3 = wc.DownloadString(Baseurl + "api/GetOpenTenders");
                allopenrfqs = JsonConvert.DeserializeObject<List<ProcurementModel>>(json3);
                var opentendelist = (from a in allopenrfqs select a).ToList();

                Session["suppcatcount"] = suppcat.Count();
                Session["openTenders"] = nvWebref.FnCountOpenTenders();
                Session["appliedTenders"] = nvWebref.FnCountAppliedTenders(vendorNum);
                Session["tendersAwarded"] = nvWebref.FnCountTendersAwarded(vendorNum);
                Session["myopenrfqs"] = rfqcount.Count();
                Session["appliedcatgry"] = appliedcatcount.Count();
                Session["opentenderscount"] = opentendelist.Count();
            }
            #pragma warning disable 168
            catch (Exception ex)
            #pragma warning restore 168
            {
                // ignored
            }
        }

        [HttpPost]
        public JsonResult RfQDocument(string rfqnumber)
        {
            try
            {
               var nvWebref = WsConfig.EProcWebRef;
                string vendorNo = Session["vendorNo"].ToString().Replace(@"/", @"");
                var vendorName = Session["name"].ToString();

                string returnString = "";
                 nvWebref.FnBLOBRfQDocument(vendorName, rfqnumber, ref returnString);
                    if (!string.IsNullOrWhiteSpace(returnString))
                    {

                        if (vendorNo.Contains(":"))
                            vendorNo = vendorNo.Replace(":", "[58]");
                        if (rfqnumber.Contains(":"))
                            rfqnumber = rfqnumber.Replace(":", "[58]");
                            rfqnumber = rfqnumber.Replace("/", "[47]");


                    var rootFolder = Server.MapPath("~/Downloads");
                        var subfolder = Path.Combine(rootFolder, vendorNo);

                        if (!Directory.Exists(subfolder))
                            Directory.CreateDirectory(subfolder);

                         byte[] buffer = Convert.FromBase64String(returnString);
                        string path = HostingEnvironment.MapPath(@"~/Downloads/" + vendorNo +"/"+ string.Format("{0}.pdf", rfqnumber));
                        if (System.IO.File.Exists(path))
                            System.IO.File.Delete(path);
                        BinaryWriter binaryWriter = new BinaryWriter((Stream)new FileStream(path, FileMode.CreateNew));
                        binaryWriter.Write(buffer, 0, buffer.Length);
                        binaryWriter.Close();
                        //srcPath = @"/Downloads/" + vendorNo + "/"+ string.Format(rfqnumber + "{0}.pdf", vendorNo);
                      return Json("filedownloadsuccess*"+ path, JsonRequestBehavior.AllowGet);
                    }
                    return Json("downloaderror", JsonRequestBehavior.AllowGet);
                 }
            catch (Exception)
            {
               // return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json("downloaderror", JsonRequestBehavior.AllowGet);
            }
        }
        public FileResult DownloadFile(string filepath)
        {
            var fileVirtualPath = filepath;
            return File(fileVirtualPath, "application/force-download", Path.GetFileName(fileVirtualPath));
        }
        [HttpPost]
        public JsonResult UploadPhoto(HttpPostedFileBase inputPhoto)
        {
            try
            {
                var contactNo = Session["contactNo"].ToString();
                if (contactNo.Contains(":"))
                    contactNo = contactNo.Replace(":", "_");
                    contactNo = contactNo.Replace("/", "_");

                var rootFolder = Server.MapPath("~/Profiles");
                var subfolder = Path.Combine(rootFolder, contactNo + "/");

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);
                if (inputPhoto.ContentLength > 0)
                {
                    var fExt = Path.GetExtension(inputPhoto.FileName);
                    var specfilname = "profpic.png";

                    switch (fExt)
                    {
                        case ".png":
                            inputPhoto.SaveAs(subfolder + "/" + specfilname);
                            return Json("changedsuccess", JsonRequestBehavior.AllowGet);

                        case ".jpg":
                            inputPhoto.SaveAs(subfolder + "/" + inputPhoto.FileName);
                            Image image1 = Image.FromFile(subfolder + "/" + inputPhoto.FileName);
                            image1.Save(subfolder + "/" + specfilname, ImageFormat.Png);
                            image1.Dispose();
                            System.IO.File.Delete(subfolder + "/" + inputPhoto.FileName);
                            return Json("changedsuccess", JsonRequestBehavior.AllowGet);

                        case ".jpeg":
                            inputPhoto.SaveAs(subfolder + "/" + inputPhoto.FileName);
                            Image image = Image.FromFile(subfolder + "/" + inputPhoto.FileName);
                            image.Save(subfolder + "/" + specfilname, ImageFormat.Png);
                            image.Dispose();
                            System.IO.File.Delete(subfolder + "/" + inputPhoto.FileName);
                            return Json("changedsuccess", JsonRequestBehavior.AllowGet);

                        default:
                            return Json("unacceptableextension", JsonRequestBehavior.AllowGet);
                    }
                }
                return Json("nullinputerror", JsonRequestBehavior.AllowGet);
            }
            #pragma warning disable 168
            catch (Exception exp)
            #pragma warning restore 168
            {
                // ignored
                return Json(exp.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult FnUploadSpecRfQDocs(HttpPostedFileBase krapinFile, 
           HttpPostedFileBase cbqFile, HttpPostedFileBase certofRegFile, 
           HttpPostedFileBase taxcomplyFile, string myrfqnumber, HttpPostedFileBase myrfqdoc)
        {
            var vendorNo = Session["vendorNo"].ToString();
            try
            {
                if (myrfqdoc == null)
                    return Json("rfqDocFilenull", JsonRequestBehavior.AllowGet);
                if (krapinFile == null)
                    return Json("KRApinnull", JsonRequestBehavior.AllowGet);
                if (cbqFile == null)
                    return Json("cbqFilenull", JsonRequestBehavior.AllowGet);
                if (certofRegFile == null)
                    return Json("certofRegFilenull", JsonRequestBehavior.AllowGet);
                if (taxcomplyFile == null)
                    return Json("taxcomplyFilenull", JsonRequestBehavior.AllowGet);

                if (vendorNo.Contains(":"))
                    vendorNo = vendorNo.Replace(":", "[58]");
                if (myrfqnumber.Contains(":"))
                    myrfqnumber = myrfqnumber.Replace(":", "[58]");
                    myrfqnumber = myrfqnumber.Replace("/", "[47]");

                var rootFolder = Server.MapPath("~/Uploads/RfQs");
                var subfolder = Path.Combine(rootFolder, myrfqnumber + "/" + vendorNo);

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);

                //code to save the application on DB to come here
                string fileName0 = Path.GetFileName(krapinFile.FileName);
                string ext0 = _getFileextension(krapinFile);
                string savedF0 = vendorNo + "_KRAPIN" + ext0;

                string fileName1 = Path.GetFileName(cbqFile.FileName);
                string ext1 = _getFileextension(cbqFile);
                string savedF1 = vendorNo + "_CONFIDENTIAL BUSINESS QUESTIONNARE" + ext1;

                string fileName2 = Path.GetFileName(certofRegFile.FileName);
                string ext2 = _getFileextension(certofRegFile);
                string savedF2 = vendorNo + "_CERT OF REGISTRATION" + ext2;

                string fileName3 = Path.GetFileName(taxcomplyFile.FileName);
                string ext3 = _getFileextension(taxcomplyFile);
                string savedF3 = vendorNo + "_TAX COMPLIANT CERT" + ext3;

                string fileName4 = Path.GetFileName(taxcomplyFile.FileName);
                string ext4 = _getFileextension(taxcomplyFile);
                string savedF4 = vendorNo + "_RFQ DOCUMENT" + ext4;

                krapinFile.SaveAs(subfolder + "/" + savedF0);
                cbqFile.SaveAs(subfolder + "/" + savedF1);
                certofRegFile.SaveAs(subfolder + "/" + savedF2);
                taxcomplyFile.SaveAs(subfolder + "/" + savedF3);
                myrfqdoc.SaveAs(subfolder + "/" + savedF4);
                
                string uploads = string.Format("{0}",
                    "<div class='form-group'>" +
                    "<h4><strong style='color: chocolate'>List of files you uploaded successfully!</strong></h4>" +
                    fileName0 + "<br/>" + fileName1 + "<br/>" + fileName2 + "<br/>" + fileName3 + "<br/>"+ fileName4+
                    "<br/></div>");
                return Json("success*" + uploads, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DownloadTenderDoc(string tendorNo)
        {
            var fileVirtualPath = (dynamic)null;
            try
            {
                if (tendorNo.Contains(":"))
                    tendorNo = tendorNo.Replace(":", "[58]");
                    tendorNo = tendorNo.Replace("/", "[47]");

                 fileVirtualPath = HostingEnvironment.MapPath(@"~/Downloads/Tenders/" + tendorNo + "/" +string.Format("{0}.pdf", tendorNo));
                return File(fileVirtualPath, "application/force-download", Path.GetFileName(fileVirtualPath));

            }
            catch (Exception ex)
            {
                return fileVirtualPath;
            }
        }

        public JsonResult TenderDocChecker(string tendorNo)
        {
            try
            {
                var fileVirtualPath = (dynamic)null;
                if (tendorNo.Contains(":"))
                    tendorNo = tendorNo.Replace(":", "[58]");
                tendorNo = tendorNo.Replace("/", "[47]");
                fileVirtualPath = HostingEnvironment.MapPath(@"~/Downloads/Tenders/" + tendorNo + "/" + string.Format("{0}.pdf", tendorNo));
                byte[] fileBytes = GetFile(fileVirtualPath);
                if (fileBytes != null)
                {
                    return Json("filefound", JsonRequestBehavior.AllowGet);
                }
                return Json("filenotfound", JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("filenotfound", JsonRequestBehavior.AllowGet);
                // return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        byte[] GetFile(string s)
        {
            FileStream fs = System.IO.File.OpenRead(s);
            byte[] data = new byte[fs.Length];
            int br = fs.Read(data, 0, data.Length);
            if (br != fs.Length)
                throw new IOException(s);
            return data;
        }

        public ActionResult TenderDocDownloader(string tendorNo)
        {
            var fileVirtualPath = (dynamic)null;
            if (tendorNo.Contains(":"))
                tendorNo = tendorNo.Replace(":", "[58]");
                tendorNo = tendorNo.Replace("/", "[47]");
            fileVirtualPath = HostingEnvironment.MapPath(@"~/Downloads/Tenders/" + tendorNo + "/" + string.Format("{0}.pdf", tendorNo));
            return File(fileVirtualPath, System.Net.Mime.MediaTypeNames.Application.Octet, Path.GetFileName(fileVirtualPath));
        }

        public JsonResult SubmitTenderAppPublic(string myBidamount, string myTendorNo)
        {
            try
            {
                var nvWebref = WsConfig.EProcWebRef;
                if (string.IsNullOrWhiteSpace(myBidamount))
                    return Json("BidamountEmpty", JsonRequestBehavior.AllowGet);

                var status = nvWebref.FnApplyforOpenTender(myTendorNo, Convert.ToDecimal(myBidamount),
                    (string)Session["contactNo"], (string)Session["email"]);

                var res = status.Split('*');
                switch (res[0])
                {
                    case "success":
                        return Json("submitted success", JsonRequestBehavior.AllowGet);

                    default:
                        return Json(res[1], JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult RfQLines()
        {
            var reqsnNo = Request.QueryString["reqno"];
            List<RfQsModel> allrfqs = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetPurchaseReqLines");
            allrfqs = JsonConvert.DeserializeObject<List<RfQsModel>>(json);

            //select filter from returned Json
            var record = (from a in allrfqs orderby a.Requisition_No where a.Line_No!=0 select a).Where(r => r.Requisition_No == reqsnNo).DistinctBy(i => i.No)
                .ToList();
            return View(record);

        }

        public JsonResult InsertRfQItems(List<RfQsModel> rfqitems)
        {
            try
            {
                var nvWebref = WsConfig.EProcWebRef;
                int _type = 0;
                string results_0 = (dynamic) null;
                string results_1 = (dynamic)null;
                //Check for NULL.
                if (rfqitems == null)
                    rfqitems = new List<RfQsModel>();

                //Loop and insert records.
                foreach (RfQsModel oneitems in rfqitems)
                {
                    if (string.IsNullOrWhiteSpace(oneitems.Unit_Price.ToString(CultureInfo.InvariantCulture)))
                        return Json("unitpriceEmpty", JsonRequestBehavior.AllowGet);

                        switch (oneitems.Type)
                        {
                            case "Non Stock Item":
                                 _type = 0;
                                break;
                            case "Item":
                                _type = 1;
                                break;
                            case "Fixed Asset":
                                _type = 2;
                                break;
                        }
                    var status = nvWebref.FnAddPurchaseReqLine(oneitems.Requisition_No, oneitems.Item_No, oneitems.Quantity, oneitems.Unit_Price, Session["vendorNo"].ToString(), oneitems.Line_No, _type);
                    string[] info = status.Split('*');
                    results_0 = info[0];
                    results_1 = info[1];
                }
                switch (results_0)
                {
                    case "success":
                        return Json("submitted success", JsonRequestBehavior.AllowGet);

                    default:
                        return Json(results_1, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public void HomepageCounter()
        {
            List<Login> loginmodel = null;
            List<TenderModel> ads = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetPortalUsers");
            loginmodel = JsonConvert.DeserializeObject<List<Login>>(json);

            string json2 = wc.DownloadString(Baseurl + "api/GetAdds");
            ads = JsonConvert.DeserializeObject<List<TenderModel>>(json2);
            var notifs = (from a in ads select a).ToList();

            Session["notificounter"] = notifs.Count();
            Session["portalusers"] = loginmodel.Count();
        }

        public ActionResult Ads()
        {
            List<TenderModel> ads = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetAdds");
            ads = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var record = (from a in ads select a).ToList();
            return View(record);
        }

        public ActionResult ListNotices()
        {
            List<TenderModel> ads = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("shawn72:cherry*30")));
            string json = wc.DownloadString(Baseurl + "api/GetAdds");
            ads = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var record = (from a in ads select a).ToList();
            return View(record);
        }


    }
}