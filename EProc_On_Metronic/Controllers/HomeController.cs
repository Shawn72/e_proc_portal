using System;
using System.Collections.Generic;
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
using System.Drawing;
using System.Text.RegularExpressions;
using System.Configuration;
using Microsoft.SharePoint.Client;
using System.Security;
namespace EProc_On_Metronic.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {

        ///uncomment this while publishing on live server

        // public static string Baseurl = ConfigurationManager.AppSettings["API_SERVER_URL"];

        ///uncomment this while publishing on live server

        ///for use on localhost testings

        public static string Baseurl = ConfigurationManager.AppSettings["API_LOCALHOST_URL"];
        
        ///for use on localhost testings
     
        /// API Authentications
        public static string ApiUsername = ConfigurationManager.AppSettings["API_USERNAME"];
        public static string ApiPassword = ConfigurationManager.AppSettings["API_PWD"];
        /// API Authentications

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

        public ActionResult PurchaseItemsInject()
        {
            return View();
        }
        public ActionResult TenderRequirementsInject()
        {
            return View();
        }

        public ActionResult TenderEvalCriteriaInject()
        {
            return View();
        }
        public ActionResult TenderDocuments()
        {
            return View();
        }
        public ActionResult TenderbyRegionOverviewInject()
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
        public ActionResult TenderResponseForm()
        {
            return View();
        }
        public ActionResult BankDetails()
        {
            return View();
        }

        public ActionResult IfpEprequalificationList()
        {
            return View();
        }

        public ActionResult RfiResponseForm()
        {
            return View();
        }

        public ActionResult SideBarMenu()
        {
            return View();
        }

        public ActionResult TendersList()
        {
            Session["tenderclass"] = "notspecial";
            return View();
        }

        public ActionResult SpecialGrpTenders()
        {
            Session["tenderclass"] = "special";
            return View();
        }

        public ActionResult TenderByRegion()
        {
            Session["tenderclass"] = "tenderbyregion";
            return View();
        }

        public ActionResult TenderOverviewInject()
        {
            return View();
        }

        public ActionResult ProjectWorksInject()
        {
            return View();
        }

        public ActionResult TendervendorDebarmentList()
        {
            return View();
        }

        public ActionResult ActiveAddendumNotices()
        {
            return View();
        }

        public ActionResult AddendumDetailsInject()
        {
            return View();
        }

        public ActionResult TenderSpGrpOverviewInject()
        {
            return View();
        }

        public ActionResult ContractAwards()
        {
            return View();
        }

        public ActionResult TendersOpentoPublic()
        {
            List<ProcurementModel> appliedtenders = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetOpenTenders");
            appliedtenders = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
            var record = (from a in appliedtenders where a.Closed == false select a).ToList();
            return View(record);
        }
        public ActionResult Homepage()
        {
            List<TenderModel> model = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            model = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            Session["opentendercnter"] = model.Count();
            var record = (from a in model where a.Document_Status == "Published" && a.Tender_Name != "" select a).ToList();
            HomepageCounter();
            return View(record);
        }

        public ActionResult SupplierCatList()
        {
            List<DropdownListsModel> allsupplierscat = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetSupplierCat");
            allsupplierscat = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var record = (from a in allsupplierscat where a.Category!="" && a.CategoryName!="" select a).ToList();
            return View(record);
        }

        public ActionResult OpenTenders()
        {
            List<ProcurementModel> allopentenders = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetSupplierCat");
            allsupplierscat = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var allsuppliers = (from a in allsupplierscat where a.Category != "" && a.CategoryName !="" select a).ToList();
            return View(allsuppliers);
        }
        
        private static List<SelectListItem> PostalCode()
        {
            List<DropdownListsModel> postacode = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetPostaCodes");
            postacode = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);

            var postalitems = (from a in postacode select a).ToList();
            return View(postalitems);
        }

        public ActionResult CountryList()
        {
            List<DropdownListsModel> countries = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetCountry");
            countries = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var countryitems = (from a in countries select a).ToList();

            return View(countryitems);
        }
        public ActionResult CountryListStaff()
        {
            List<DropdownListsModel> countries = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetCountry");
            countries = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var countryitems = (from a in countries select a).ToList();

            return View(countryitems);
        }

        public ActionResult IfpRequestsList()
        {
            List<IFPRequestsModel> ifpRequests = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIfPs");
            ifpRequests = JsonConvert.DeserializeObject<List<IFPRequestsModel>>(json);
            var ifpitems = (from a in ifpRequests select a).ToList();

            return View(ifpitems);
        }


        public JsonResult SelectedPosta(string postcode)
        {
            List<DropdownListsModel> postacode = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIfPs");
            ifpRequests = JsonConvert.DeserializeObject<List<IFPRequestsModel>>(json);
            var ifpitems = (from a in ifpRequests where a.Code== ifpnumber select a).ToList();
            
            return Json(ifpitems, JsonRequestBehavior.AllowGet);
        } 
              

        public JsonResult DynamicDDlCountryList()
        {
            List<DropdownListsModel> countries = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetCountry");
            countries = JsonConvert.DeserializeObject<List<DropdownListsModel>>(json);
            var countryitems = (from a in countries select a).ToList();
            return Json(countryitems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DynamicSpecialCatGroups()
        {
            List<SpecialGrpTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetSpecialGroupes");
            docTModel = JsonConvert.DeserializeObject<List<SpecialGrpTModel>>(json);
            var resp = (from a in docTModel where a.Vendor_Group == "Special" select a).ToList();
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult RegisterSupplier(VendorModel vendormodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                DateTime myOpsdate, myIncopdate;

               //do switches here for business type
               // vendormodel.BusinessType

                CultureInfo usCulture = new CultureInfo("en-US");
                myOpsdate = DateTime.Parse(vendormodel.OpsDate, usCulture.DateTimeFormat);
                myIncopdate = DateTime.Parse(vendormodel.DateofIncorporation, usCulture.DateTimeFormat);

                var status = nvWebref.FnSupplierRegistration(vendormodel.BusinessType, vendormodel.VendorType, vendormodel.OwnerType, vendormodel.IndustryGroup,
                    vendormodel.PostaCode, vendormodel.CountryofOrigin, vendormodel.CompanySize, vendormodel.NominalCap, vendormodel.DealerType, myIncopdate,
                    myOpsdate, vendormodel.LanguageCode, vendormodel.Vision, vendormodel.Mision, vendormodel.PoBox, vendormodel.PhysicalLocation,
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
                var checkperclimit = directormodel.OwnershipPercentage;
                var citizentype = directormodel.CitizenshipType;
                int citizType = 0;

                if (string.IsNullOrWhiteSpace(directormodel.Fullname))
                    return Json("danger*Please provide directors full name, Click Edit!", JsonRequestBehavior.AllowGet);

                if (directormodel.Nationality == "--select country--")
                    return Json("danger*Please select a country from dropdownlist, Click Edit!", JsonRequestBehavior.AllowGet);

                if (string.IsNullOrWhiteSpace(directormodel.IdNumber))
                    return Json("danger*Please provide ID number,Click Edit!", JsonRequestBehavior.AllowGet);

                if (directormodel.CitizenshipType == "--select citizenship--")
                    return Json("danger*Please select citizenship from dropdownlist, Click Edit!", JsonRequestBehavior.AllowGet);

                if (string.IsNullOrWhiteSpace(directormodel.OwnershipPercentage.ToString()))
                    return Json("danger*Percentage should not be left empty, Click Edit!", JsonRequestBehavior.AllowGet);

                if (checkperclimit > 100)
                    return Json("danger*Percentage cannot be more than 100 %, Click Edit!", JsonRequestBehavior.AllowGet);

                if (string.IsNullOrWhiteSpace(directormodel.Email))
                    return Json("danger*Please provide Email address, Click Edit!", JsonRequestBehavior.AllowGet);
                
                switch (citizentype)
                {
                    case "Birth":
                        citizType = 1;
                        break;
                    case "Naturalization":
                        citizType = 2;
                        break;
                    case "Registration":
                        citizType = 3;
                        break;
                   default:
                       citizType = 0;
                        break;
                }

                var percentstatus = nvWebref.FnGetOwnerPercentage(vendorNo);
                var pctgres = percentstatus.Split('*');
                switch (pctgres[0])
                {
                    case "success":
                        var status = nvWebref.FnInsertDirector(vendorNo, directormodel.Phonenumber, directormodel.OwnershipPercentage,
                            directormodel.Nationality, directormodel.Email, directormodel.Address, directormodel.Fullname, directormodel.IdNumber, citizType);
                        var res = status.Split('*');
                        switch (res[0])
                        {
                            case "success":
                                return Json("success*" + res[1], JsonRequestBehavior.AllowGet);

                            default:
                                return Json("danger*" + res[1], JsonRequestBehavior.AllowGet);
                        }
                    default:
                        return Json("danger*" + pctgres[1], JsonRequestBehavior.AllowGet);

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

        public new ActionResult Profile()
        {
            List<ProfileModel> profilemodel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
                wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));

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
            //IMPORTANT D
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
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
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAdds");
            ads = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var record = (from a in ads select a).ToList();
            return View(record);
        }

        public ActionResult ListNotices()
        {
            List<TenderModel> ads = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAdds");
            ads = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var record = (from a in ads select a).ToList();
            return View(record);
        }

        public ActionResult DocumentTemplateList()
        {
            List<DocumentsTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetDocumentsTemplates");
            docTModel = JsonConvert.DeserializeObject<List<DocumentsTModel>>(json);
            var madocs = (from a in docTModel where a.Procurement_Process== "Registration" select a).ToList();

            return View(madocs);
        }

        public ActionResult DocumentTemplateList_Rfi()
        {
            List<DocumentsTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetDocumentsTemplates_Rfi");
            docTModel = JsonConvert.DeserializeObject<List<DocumentsTModel>>(json);
            var madocs = (from a in docTModel where a.Document_Type == "Invitation For Prequalification" select a).ToList();

            return View(madocs);
        }
        public ActionResult DocumentTemplateDroplist()
        {
            List<DocumentsTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetDocumentsTemplates");
            docTModel = JsonConvert.DeserializeObject<List<DocumentsTModel>>(json);
            var madocs = (from a in docTModel where a.Procurement_Process == "Registration" select a).ToList();

            return View(madocs);
        }
        public ActionResult DocumentTemplateDroplist_Rfi()
        {
            List<DocumentsTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetDocumentsTemplates_Rfi");
            docTModel = JsonConvert.DeserializeObject<List<DocumentsTModel>>(json);
            var madocs = (from a in docTModel where a.Document_Type == "Invitation For Prequalification" select a).ToList();

            return View(madocs);
        }

        public ActionResult SpecialCatGroups()
        {
            List<SpecialGrpTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetSpecialGroupes");
            docTModel = JsonConvert.DeserializeObject<List<SpecialGrpTModel>>(json);
            var resp = (from a in docTModel where a.Vendor_Group == "Special" select a).ToList();

            return View(resp);
        }

        public ActionResult BusinessTypes()
        {
            List<BusinessTypesModel> bzTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBusinessTypes");
            bzTModel = JsonConvert.DeserializeObject<List<BusinessTypesModel>>(json);
            var madocs = (from a in bzTModel where a.Blocked == false select a).ToList();
            return View(madocs);
        }

        public ActionResult IndustryGroupes()
        {
            List<IndustryGroupModel> indTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIndustryGroups");
            indTModel = JsonConvert.DeserializeObject<List<IndustryGroupModel>>(json);
            var madocs = (from a in indTModel select a).ToList();
            return View(madocs);
        }

        public ActionResult CompanySize()
        {
            List<BusinessSizeModel> bzSzModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetCompanySize");
            bzSzModel = JsonConvert.DeserializeObject<List<BusinessSizeModel>>(json);
            var madocs = (from a in bzSzModel select a).ToList();
            return View(madocs);
        }

        public ActionResult LanguageCode()
        {
            List<LanguageModel> langModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetLanguageCode");
            langModel = JsonConvert.DeserializeObject<List<LanguageModel>>(json);
            var jsresult = (from a in langModel select a).ToList();
            return View(jsresult);
        }

        public JsonResult FnUploadmandatoryDoc(HttpPostedFileBase browsedfile, string typauploadselect, 
            string filedescription, string certificatenumber, string dateofissue, string expirydate)
        {
            try
            {
                var vendorNo = Convert.ToString(Session["vendorNo"]);
                var nvWebref = WsConfig.EProcWebRef;
                string storedFilename = "";
                CultureInfo usCulture = new CultureInfo("en-US");
                int errCounter = 0, filesCounter = 1, succCounter = 0, entryCounter = 0;
                string uploads ;
                var dtofIssue = DateTime.Parse(dateofissue, usCulture.DateTimeFormat);
                var expiryDate = DateTime.Parse(expirydate, usCulture.DateTimeFormat);
               
          
                if (browsedfile == null)
                {
                    errCounter++;
                    return Json("danger*browsedfilenull", JsonRequestBehavior.AllowGet);
                }

                if (vendorNo.Contains(":"))
                    vendorNo = vendorNo.Replace(":", "[58]");
                    vendorNo = vendorNo.Replace("/", "[47]");

                if (filedescription.Contains("/"))
                    filedescription = filedescription.Replace("/", "_");

                if (typauploadselect.Contains("/"))
                    typauploadselect = typauploadselect.Replace("/", "_");

                var rootFolder = Server.MapPath("~/Uploads/Vendor Card");
                var subfolder = Path.Combine(rootFolder, vendorNo);

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);
                    succCounter = (filesCounter - errCounter) / filesCounter * 100;

                string fileName0 = Path.GetFileName(browsedfile.FileName);
                string ext0 = _getFileextension(browsedfile);
                string savedF0 = vendorNo + "_"+ typauploadselect + ext0;

                // Recursively get file names for all files in a directory.
                foreach (string file in Directory.EnumerateFiles(subfolder, "*.*", SearchOption.AllDirectories))
                {
                    storedFilename = Path.GetFileName(file);
                }
                if (savedF0 == storedFilename)
                {
                    entryCounter++;
                    savedF0 = vendorNo + "_" + typauploadselect + "_"+ entryCounter + ext0;
                }
                bool up2Sharepoint = _UploadSupplierDocumentToSharepoint(vendorNo, browsedfile);
                if (up2Sharepoint == true)
                {
                 string fsavestatus = nvWebref.FnInsertFiledetails(vendorNo, typauploadselect, filedescription,
                    certificatenumber, dtofIssue, expiryDate, savedF0);
                   var splitanswer = fsavestatus.Split('*');
                  switch (splitanswer[0])
                   {
                    case "success":
                       // browsedfile.SaveAs(subfolder + "/" + savedF0);
                         uploads = string.Format("{0}",
                            "<div class='form-group'>" +
                            "<h4><strong style='color: chocolate'>List of files you uploaded successfully!</strong></h4></br>Upload Feedback: " +
                            splitanswer[1] + "</br> Uploaded File Name: " +
                            fileName0 + "<br/> Filename Saved: " +
                            savedF0 +
                            "</div>");
                        return Json("success*" + uploads + "*" + succCounter, JsonRequestBehavior.AllowGet);
                     default:
                         uploads = string.Format("{0}",
                            "<div class='form-group alert alert-danger'>" +
                            "<h4><strong style='color: chocolate'>Files upload error!</strong></h4></br>" + splitanswer[1] + "</br>" +
                            fileName0 + "<br/>" +
                            "<br/></div>");
                        return Json("danger*" + uploads + "*" + succCounter, JsonRequestBehavior.AllowGet);
                     
                    }
                }
                else
                {
                    uploads = string.Format("{0}",
                    "<div class='form-group alert alert-danger'>" +
                    "<h4><strong style='color: chocolate'>Files upload error!</strong></h4></br>Upload to sharepoint error!</br>" +
                    fileName0 + "<br/>" +
                    "<br/></div>");
                    return Json("danger*" + uploads + "*" + succCounter, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("danger*"+ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult FnUploadmandatoryDoc_Rfi(HttpPostedFileBase browsedfile, string typauploadselect,
            string filedescription, string certificatenumber, string dateofissue, string expirydate, string rfiApplicationNum)
        {
            try
            {
                var vendorNo = Convert.ToString(Session["vendorNo"]);
                var nvWebref = WsConfig.EProcWebRef;
                string storedFilename = "";
                CultureInfo usCulture = new CultureInfo("en-US");
                int errCounter = 0, filesCounter = 1, succCounter = 0, entryCounter = 0;
                DateTime dtofIssue, expiryDate;
                string uploads;

                if(string.IsNullOrWhiteSpace(dateofissue))
                    return Json("danger*issuedatenull", JsonRequestBehavior.AllowGet);

                if (string.IsNullOrWhiteSpace(expirydate))
                    return Json("danger*exprynull", JsonRequestBehavior.AllowGet);

                dtofIssue = DateTime.Parse(dateofissue, usCulture.DateTimeFormat);
                expiryDate = DateTime.Parse(expirydate, usCulture.DateTimeFormat);


                if (browsedfile == null)
                {
                    errCounter++;
                    return Json("danger*browsedfilenull", JsonRequestBehavior.AllowGet);
                }

                if (vendorNo.Contains(":"))
                    vendorNo = vendorNo.Replace(":", "[58]");
                    vendorNo = vendorNo.Replace("/", "[47]");

                if (filedescription.Contains("/"))
                    filedescription = filedescription.Replace("/", "_");

                if (typauploadselect.Contains("/"))
                    typauploadselect = typauploadselect.Replace("/", "_");

                if (rfiApplicationNum.Contains("/"))
                    rfiApplicationNum = rfiApplicationNum.Replace("/", "_");

                var rootFolder = Server.MapPath("~/Uploads/Vendor Card");
                var subfolder = Path.Combine(rootFolder, vendorNo+"/"+ rfiApplicationNum);

                if (!Directory.Exists(subfolder))
                    Directory.CreateDirectory(subfolder);
                succCounter = (filesCounter - errCounter) / filesCounter * 100;

                string fileName0 = Path.GetFileName(browsedfile.FileName);
                string ext0 = _getFileextension(browsedfile);
                string savedF0 = vendorNo + "_" + typauploadselect + ext0;

                // Recursively get file names for all files in a directory.
                foreach (string file in Directory.EnumerateFiles(subfolder, "*.*", SearchOption.AllDirectories))
                {
                    storedFilename = Path.GetFileName(file);
                }
                if (savedF0 == storedFilename)
                {
                    entryCounter++;
                    savedF0 = vendorNo + "_" + typauploadselect + "_" + entryCounter + ext0;
                }

                bool up2Sharepoint = _UploadRfiDocumentToSharepoint(rfiApplicationNum, browsedfile, vendorNo);
                if(up2Sharepoint == true)
                {                  
                    string fsavestatus = nvWebref.FnInsertFiledetails_Rfi(vendorNo, typauploadselect, filedescription,
                    certificatenumber, dtofIssue, expiryDate, savedF0, rfiApplicationNum);
                    var splitanswer = fsavestatus.Split('*');
                    switch (splitanswer[0])
                    {
                        case "success":
                            // browsedfile.SaveAs(subfolder + "/" + savedF0);
                            uploads = string.Format("{0}",
                                "<div class='form-group'>" +
                                "<h4><strong style='color: chocolate'>List of files you uploaded successfully!</strong></h4></br>Upload Feedback: " +
                                splitanswer[1] + "</br> Uploaded File Name: " +
                                fileName0 + "<br/> Filename Saved: " +
                                savedF0 +
                                "</div>");
                            return Json("success*" + uploads + "*" + succCounter, JsonRequestBehavior.AllowGet);
                        default:
                            uploads = string.Format("{0}",
                                "<div class='form-group alert alert-danger'>" +
                                "<h4><strong style='color: chocolate'>Files upload error!</strong></h4></br>" + splitanswer[1] + "</br>" +
                                fileName0 + "<br/>" +
                                "<br/></div>");
                            return Json("danger*" + uploads + "*" + succCounter, JsonRequestBehavior.AllowGet);                               
                    }                      
                }
                else
                {
                    uploads = string.Format("{0}",
                               "<div class='form-group alert alert-danger'>" +
                               "<h4><strong style='color: chocolate'>Files upload error!</strong></h4></br>Upload to sharepoint error!</br>" +
                               fileName0 + "<br/>" +
                               "<br/></div>");
                    return Json("danger*" + uploads + "*" + succCounter, JsonRequestBehavior.AllowGet);
                }              
            }
            catch (Exception ex)
            {
                return Json("danger*" + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        protected bool _UploadRfiDocumentToSharepoint(string rfiNumber, HttpPostedFileBase browsedFile, string vendorNumber )

        {
           
            bool fileuploadSuccess = false;
            string sURL = ConfigurationManager.AppSettings["S_URL"];
            string sDocName = string.Empty;
            string tfilename = browsedFile.FileName;
            string defaultlibraryname = "ERP%20Documents/";
            string customlibraryname = "KeRRA/RFI Response Card";
            string sharepointLibrary = defaultlibraryname + customlibraryname;
            rfiNumber = rfiNumber.Replace('/', '_');
            rfiNumber = rfiNumber.Replace(':', '_');
             
            if (!string.IsNullOrWhiteSpace(sURL) && !string.IsNullOrWhiteSpace(sharepointLibrary) && !string.IsNullOrWhiteSpace(tfilename))
            {                    
                string username = ConfigurationManager.AppSettings["S_USERNAME"];
                string password = ConfigurationManager.AppSettings["S_PWD"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                bool bbConnected = WsConfig.Connect(sURL, username, password, domainname);

                try
                {
                if (bbConnected)
                {
                    Uri uri = new Uri(sURL);
                    string sSpSiteRelativeUrl = uri.AbsolutePath;
                    string uploadfilename = rfiNumber + "_" + browsedFile.FileName;                    
                    Stream uploadfileContent = browsedFile.InputStream;
                    // sDocName = UploadFile(FileLocalPath.FileContent, FileLocalPath.FileName, sSPSiteRelativeURL, txtLibraryName.Text);

                    sDocName = UploadFile(uploadfileContent, uploadfilename, sSpSiteRelativeUrl, sharepointLibrary, rfiNumber, vendorNumber);

                    //SharePoint Link to be added to Navison Card
                    string sharepointlink = sURL + sharepointLibrary + "/" + rfiNumber  + "/" + uploadfilename;

                        
                    if (!string.IsNullOrWhiteSpace(sDocName))
                        {
                            var nvWebref = WsConfig.EProcWebRef;
                            string rfiNumberIdentity = rfiNumber;
                            string fsavestatus = nvWebref.FnrfiResponsetLinks(rfiNumberIdentity, uploadfilename, sharepointlink);
                            fileuploadSuccess = true;
                    }
                }
            }
            catch (Exception)
            {
                // throw;
            }
           }
          return fileuploadSuccess;    

        }

        protected bool _UploadSupplierDocumentToSharepoint(string vendorNumber, HttpPostedFileBase browsedFile)
        {
            bool fileuploadSuccess = false;
            string sUrl = ConfigurationManager.AppSettings["S_URL"];
            string tfilename = browsedFile.FileName;
            string defaultlibraryname = "ERP%20Documents/";
            string customlibraryname = "KeRRA/Vendor Card";
            string sharepointLibrary = defaultlibraryname + customlibraryname;
            vendorNumber = vendorNumber.Replace('/', '_');
            vendorNumber = vendorNumber.Replace(':', '_');

            if (!string.IsNullOrWhiteSpace(sUrl) && !string.IsNullOrWhiteSpace(sharepointLibrary) && !string.IsNullOrWhiteSpace(tfilename))
            {
                string username = ConfigurationManager.AppSettings["S_USERNAME"];
                string password = ConfigurationManager.AppSettings["S_PWD"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                bool bbConnected = WsConfig.Connect(sUrl, username, password, domainname);

                try
                {
                    if (bbConnected)
                    {
                        Uri uri = new Uri(sUrl);
                        string sSpSiteRelativeUrl = uri.AbsolutePath;
                        string uploadfilename = vendorNumber + "_" + browsedFile.FileName;
                        Stream uploadfileContent = browsedFile.InputStream;
                        var sDocName = UploadSupplierRegFile(uploadfileContent, uploadfilename, sSpSiteRelativeUrl, sharepointLibrary, vendorNumber);

                        //SharePoint Link to be added to Navison Card
                        string sharepointlink = sUrl + sharepointLibrary + "/" + vendorNumber + "/" + uploadfilename;
                        
                        if (!string.IsNullOrWhiteSpace(sDocName))
                        {
                            var nvWebref = WsConfig.EProcWebRef;
                            string vendorNumberIdentity = vendorNumber;
                            string fsavestatus = nvWebref.FnSupplierRegistrationLinks(vendorNumberIdentity, uploadfilename, sharepointlink);
                            fileuploadSuccess = true;
                        }
                    }
                }
                catch (Exception)
                {
                    // throw;
                }
            }
            return fileuploadSuccess;
        }

        public JsonResult PullRfIDocumentsfromSharePoint( string rfiNumber )
        {
            using (ClientContext ctx = new ClientContext(ConfigurationManager.AppSettings["S_URL"]))
            {
                var vendorNo = Convert.ToString(Session["vendorNo"]);
                string password = ConfigurationManager.AppSettings["S_PWD"];
                string account = ConfigurationManager.AppSettings["S_USERNAME"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                var secret = new SecureString();

                List<SharePointTModel> alldocuments = new List<SharePointTModel>();

                foreach (char c in password)
                {
                    secret.AppendChar(c);
                }
                
                ctx.Credentials = new NetworkCredential(account, secret, domainname);
                ctx.Load(ctx.Web);
                ctx.ExecuteQuery();
                List list = ctx.Web.Lists.GetByTitle("ERP Documents");

                //Get Unique rfiNumber
                string uniquerfiNumber = rfiNumber;
                uniquerfiNumber = uniquerfiNumber.Replace('/', '_');
                uniquerfiNumber = uniquerfiNumber.Replace(':', '_');

                ctx.Load(list);
                ctx.Load(list.RootFolder);
                ctx.Load(list.RootFolder.Folders);
                ctx.Load(list.RootFolder.Files);
                ctx.ExecuteQuery();

                FolderCollection allFolders = list.RootFolder.Folders;
                foreach (Folder folder in allFolders)
                {
                    if (folder.Name == "KeRRA")
                    {
                        ctx.Load(folder.Folders);
                        ctx.ExecuteQuery();
                        var uniquerfiNumberFolders = folder.Folders;

                        foreach (Folder folders in uniquerfiNumberFolders)
                        {
                            if (folders.Name == "RFI Response Card")
                            {
                                ctx.Load(folders.Folders);
                                ctx.ExecuteQuery();
                                var uniqueittpnumberSubFolders = folders.Folders;

                                        foreach (Folder rfinumber in uniqueittpnumberSubFolders)
                                        {
                                            if (rfinumber.Name == uniquerfiNumber)
                                            {
                                                ctx.Load(rfinumber.Files);
                                                ctx.ExecuteQuery();

                                                FileCollection rfinumberFiles = rfinumber.Files;
                                                foreach (Microsoft.SharePoint.Client.File file in rfinumberFiles)
                                                {
                                                    ctx.ExecuteQuery();
                                                    alldocuments.Add(new SharePointTModel {FileName = file.Name});

                                                }
                                         }
                                  }

                            }
                        }

                    }
                }
                return Json(alldocuments, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult PullSupplierRegDocumentsfromSharePoint()
        {
            using (ClientContext ctx = new ClientContext(ConfigurationManager.AppSettings["S_URL"]))
            {
                var vendorNo = Convert.ToString(Session["vendorNo"]);
                string password = ConfigurationManager.AppSettings["S_PWD"];
                string account = ConfigurationManager.AppSettings["S_USERNAME"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                var secret = new SecureString();

                List<SharePointTModel> alldocuments = new List<SharePointTModel>();

                foreach (char c in password)
                {
                    secret.AppendChar(c);
                }

                ctx.Credentials = new NetworkCredential(account, secret, domainname);
                ctx.Load(ctx.Web);
                ctx.ExecuteQuery();
                List list = ctx.Web.Lists.GetByTitle("ERP Documents");

                //Get Unique rfiNumber
                string uniquevendorNumber = vendorNo;
                uniquevendorNumber = uniquevendorNumber.Replace('/', '_');
                uniquevendorNumber = uniquevendorNumber.Replace(':', '_');

                ctx.Load(list);
                ctx.Load(list.RootFolder);
                ctx.Load(list.RootFolder.Folders);
                ctx.Load(list.RootFolder.Files);
                ctx.ExecuteQuery();

                FolderCollection allFolders = list.RootFolder.Folders;
                foreach (Folder folder in allFolders)
                {
                    if (folder.Name == "KeRRA")
                    {
                        ctx.Load(folder.Folders);
                        ctx.ExecuteQuery();
                        var uniquerfiNumberFolders = folder.Folders;

                        foreach (Folder folders in uniquerfiNumberFolders)
                        {
                            if (folders.Name == "Vendor Card")
                            {
                                ctx.Load(folders.Folders);
                                ctx.ExecuteQuery();
                                var uniquevendorNumberSubFolders = folders.Folders;

                                foreach (Folder vendornumber in uniquevendorNumberSubFolders)
                                {
                                    if (vendornumber.Name == uniquevendorNumber)
                                    {
                                        ctx.Load(vendornumber.Files);
                                        ctx.ExecuteQuery();

                                        FileCollection vendornumberFiles = vendornumber.Files;
                                        foreach (Microsoft.SharePoint.Client.File file in vendornumberFiles)
                                        {
                                            ctx.ExecuteQuery();
                                            alldocuments.Add(new SharePointTModel { FileName = file.Name });

                                        }
                                    }
                                }

                            }
                        }

                    }
                }
                return Json(alldocuments, JsonRequestBehavior.AllowGet);
            }
        }

        public string UploadSupplierRegFile(Stream fs, string sFileName, string sSpSiteRelativeUrl, string sLibraryName, string vendorNumber)
        {
            string sDocName = string.Empty;
            vendorNumber = vendorNumber.Replace('/', '_');
            vendorNumber = vendorNumber.Replace(':', '_');

            string parent_folderName = "KeRRA/Vendor Card";
            string subFolderName = vendorNumber;
            //+ "/"+ VendorNumber;
            string filelocation = sLibraryName + "/" + subFolderName;
            try
            {
                // if a folder doesn't exists, create it
                var listTitle = "ERP Documents";
                if (!FolderExists(WsConfig.SPClientContext.Web, listTitle, parent_folderName + "/" + subFolderName))
                    CreateFolder(WsConfig.SPClientContext.Web, listTitle, parent_folderName + "/" + subFolderName);

                if (WsConfig.SPWeb != null)
                {
                    var sFileUrl = string.Format("{0}/{1}/{2}", sSpSiteRelativeUrl, filelocation, sFileName);
                    Microsoft.SharePoint.Client.File.SaveBinaryDirect(WsConfig.SPClientContext, sFileUrl, fs, true);
                    WsConfig.SPClientContext.ExecuteQuery();
                    sDocName = sFileName;
                }
             }

            catch (Exception)
            {
                sDocName = string.Empty;
            }
            return sDocName;
        }
        public string UploadFile(Stream fs, string sFileName, string sSpSiteRelativeUrl, string sLibraryName, string rfidocnumber, string vendorNumber)
        {
            string sDocName = string.Empty;
            rfidocnumber = rfidocnumber.Replace('/', '_');
            rfidocnumber = rfidocnumber.Replace(':', '_');

            string parent_folderName = "KeRRA/RFI Response Card";
           // string parent_folderName2 = "KeRRA/RFI Response Card/"+ rfidocnumber;

            string subFolderName = rfidocnumber;
           // string subFolderName2 = vendorNumber;
           

            string filelocation = sLibraryName + "/" + subFolderName;
            try
            {
               
                
                // if a folder doesn't exists, create it
                var listTitle = "ERP Documents";
                if (!FolderExists(WsConfig.SPClientContext.Web, listTitle, parent_folderName + "/" + subFolderName))
                    CreateFolder(WsConfig.SPClientContext.Web, listTitle, parent_folderName + "/" + subFolderName);

                //Creating a folder inside a subfolder
                // if (!FolderExists(WsConfig.SPClientContext.Web, listTitle, parent_folderName2 + "/" + subFolderName2))
                // CreateFolder(WsConfig.SPClientContext.Web, listTitle, parent_folderName2 + "/" + subFolderName2);
             
                if (WsConfig.SPWeb != null)
                {
                    var sFileUrl = string.Format("{0}/{1}/{2}", sSpSiteRelativeUrl, filelocation, sFileName);
                    Microsoft.SharePoint.Client.File.SaveBinaryDirect(WsConfig.SPClientContext, sFileUrl, fs, true);
                    WsConfig.SPClientContext.ExecuteQuery();
                    sDocName = sFileName;
                }
            }

            catch (Exception ex)
            {
                sDocName = string.Empty;
            }
            return sDocName;
        }
        public static bool FolderExists(Web web, string listTitle, string folderUrl)
        {
            var list = web.Lists.GetByTitle(listTitle);
            var folders = list.GetItems(CamlQuery.CreateAllFoldersQuery());
            web.Context.Load(list.RootFolder);
            web.Context.Load(folders);
            web.Context.ExecuteQuery();
            var folderRelativeUrl = string.Format("{0}/{1}", list.RootFolder.ServerRelativeUrl, folderUrl);
            return Enumerable.Any(folders, folderItem => (string)folderItem["FileRef"] == folderRelativeUrl);
        }

        private static void CreateFolder(Web web, string listTitle, string folderName)
        {
            var list = web.Lists.GetByTitle(listTitle);
            var folderCreateInfo = new ListItemCreationInformation
            {
                UnderlyingObjectType = FileSystemObjectType.Folder,
                LeafName = folderName
            };
            var folderItem = list.AddItem(folderCreateInfo);
            folderItem.Update();
            web.Context.ExecuteQuery();
        }


        public JsonResult DeleteRfDocfromSharepoint(string filename, string ifpNumber)
        {
            var sharepointUrl = ConfigurationManager.AppSettings["S_URL"];
            using (ClientContext ctx = new ClientContext(sharepointUrl))
            {

                string password = ConfigurationManager.AppSettings["S_PWD"];
                string account = ConfigurationManager.AppSettings["S_USERNAME"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                var secret = new SecureString();
                var parentFolderName = @"/ERP%20Documents/KeRRA/RFI Response Card/";

                foreach (char c in password)
                { secret.AppendChar(c); }
                try
                {
                    ctx.Credentials = new NetworkCredential(account, secret, domainname);
                    ctx.Load(ctx.Web);
                    ctx.ExecuteQuery();
                    
                    Uri uri = new Uri(sharepointUrl);
                    string sSpSiteRelativeUrl = uri.AbsolutePath;

                    string filePath = sSpSiteRelativeUrl + parentFolderName + ifpNumber +"/"+ filename;

                    var file = ctx.Web.GetFileByServerRelativeUrl(filePath);
                    ctx.Load(file, f => f.Exists);
                    file.DeleteObject();
                    ctx.ExecuteQuery();

                    if (!file.Exists)
                        throw new FileNotFoundException();
                    return Json("delete_success*File deleted successfully from Sharepoint, Upload it again!", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    // ignored
                    return Json("delete_error*"+ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult DownloadRfDocfromSharepoint(string filename, string ifpNumber)
        {
            var sharepointUrl = ConfigurationManager.AppSettings["S_URL"];
            using (ClientContext ctx = new ClientContext(sharepointUrl))
            {

                string password = ConfigurationManager.AppSettings["S_PWD"];
                string account = ConfigurationManager.AppSettings["S_USERNAME"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                var secret = new SecureString();
                var parentFolderName = @"/ERP%20Documents/KeRRA/RFI Response Card/";

                foreach (char c in password)
                {
                    secret.AppendChar(c);
                }

                try
                {
                    ctx.Credentials = new NetworkCredential(account, secret, domainname);
                    ctx.Load(ctx.Web);
                    ctx.ExecuteQuery();

                    Uri uri = new Uri(sharepointUrl);
                    string sSpSiteRelativeUrl = uri.AbsolutePath;

                    string filePath = sSpSiteRelativeUrl + parentFolderName + ifpNumber;

                    List list = ctx.Web.Lists.GetByTitle("ERP Documents");
                    FileCollection files = list.RootFolder.Folders.GetByUrl(filePath).Files;
                    ctx.Load(files);
                    ctx.ExecuteQuery();
                    foreach (Microsoft.SharePoint.Client.File file in files)
                    {
                        FileInformation fileinfo = Microsoft.SharePoint.Client.File.OpenBinaryDirect(ctx, file.ServerRelativeUrl);
                        ctx.ExecuteQuery();
                        using (FileStream filestream = new FileStream(@"C:\ServiceTest\SharePointDocs" + "\\" + file.Name, FileMode.Create))
                        {
                            fileinfo.Stream.CopyTo(filestream);
                        }

                    }

                }
                catch (Exception ex)
                {
                // ignored
                }
            }
            return Json("download_danger", JsonRequestBehavior.AllowGet);
        }

        private static void DownloadFile(string webUrl, ICredentials credentials, string fileRelativeUrl)
        {
            using (var client = new WebClient())
            {
                client.Credentials = credentials;
                client.Headers.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
                client.DownloadFile(webUrl, fileRelativeUrl);
            }
        }

        public JsonResult UploadedSpecifVendorDocs()
        {
            var vendorNo = Convert.ToString(Session["vendorNo"]);
            var uploadedFiles = new List<UploadedFile>();
            try
            {
              //  uploaded vendor docs

                if (vendorNo.Contains(":"))
                    vendorNo = vendorNo.Replace(":", "[58]");
                    vendorNo = vendorNo.Replace("/", "[47]");

                var rootFolder = Server.MapPath("~/Uploads/Vendor Card");
                var subfolder = Path.Combine(rootFolder, vendorNo);

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
                return Json(uploadedFiles, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
           
        }

        public JsonResult UploadedSpecifVendorDocs_Rfi(string rfiApplicationNum)
        {
            var vendorNo = Convert.ToString(Session["vendorNo"]);
            var uploadedFiles = new List<UploadedFile>();
            try
            {
                if (vendorNo.Contains(":"))
                    vendorNo = vendorNo.Replace(":", "[58]");
                vendorNo = vendorNo.Replace("/", "[47]");

                var rootFolder = Server.MapPath("~/Uploads/Vendor Card");
                var subfolder = Path.Combine(rootFolder, vendorNo + "/" + rfiApplicationNum);

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
                return Json(uploadedFiles, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        
        public JsonResult UploadedKerraIfpDocs(string ifpnumber)
        {
            var uploadedFiles = new List<UploadedFile>();
            try
            {
                Regex reg = new Regex("[*'\",_&#^@:/]");
              //Regex regrule1 = new Regex("[ ]");

                ifpnumber = reg.Replace(ifpnumber, string.Empty);
                ifpnumber = reg.Replace(ifpnumber, "_");

                //if (ifpnumber.Contains(":"))
                //    ifpnumber = ifpnumber.Replace(":", "[58]");
                //    ifpnumber = ifpnumber.Replace("/", "[47]");

                var rootFolder = Server.MapPath("~/Uploads/IFPs/Downloads");
                var subfolder = Path.Combine(rootFolder, ifpnumber);

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
                return Json(uploadedFiles, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        [AllowAnonymous]
        public JsonResult SupplierRegReq(SignupModel signupmodel)
        {
            try
            {
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnReqforRegistration(signupmodel.VendorName, signupmodel.Phonenumber, signupmodel.Email, signupmodel.KraPin, signupmodel.ContactName);

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
        
        public JsonResult AddSpecialGroupEntry(SpecialGrpEntryModel agpomodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                DateTime myCerteffectivedate;
                DateTime myExpdate;
                CultureInfo usCulture = new CultureInfo("en-US");
                myCerteffectivedate = DateTime.Parse(agpomodel.Effective_Date, usCulture.DateTimeFormat);
                myExpdate = DateTime.Parse(agpomodel.End_Date, usCulture.DateTimeFormat);
                

                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnInsertSpecialGrp(vendorNo, agpomodel.Vendor_Category, agpomodel.Certifcate_No, myCerteffectivedate, myExpdate, agpomodel.Products_Service_Category);

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
        
        public JsonResult AddPastExPr(PastXprModel pastxpmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                DateTime prjstartdate;
                DateTime prjenddate;
                CultureInfo usCulture = new CultureInfo("en-US");
                prjstartdate = DateTime.Parse(pastxpmodel.ProjectStartDate, usCulture.DateTimeFormat);
                prjenddate = DateTime.Parse(pastxpmodel.ProjectEndDate, usCulture.DateTimeFormat);

                var status = nvWebref.FnInsertPastXep(vendorNo, pastxpmodel.ClientName, pastxpmodel.Address, 
                    pastxpmodel.ProjectName, pastxpmodel.ProjectScope, prjstartdate,
                    prjenddate, pastxpmodel.ProjectValue);
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

        public JsonResult AddBalanceSheetEntry(AuditedFinancialsTModel financemodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnInsertBalanceSheet(financemodel.Year, financemodel.TotalCurrentAssets, 
                    financemodel.TotalFixedAssets, financemodel.TotalCurrentLiabilty,
                    financemodel.TotalLongTermLiability, financemodel.TotalOwnersEquity, vendorNo);

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

        public JsonResult AddIncomestatementEntry(AuditedFinancialsTModel incomemodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnInsertIncomestatement(incomemodel.YearI, incomemodel.TotalRevenue, incomemodel.TotalCogs, incomemodel.TotalOpsExpense,
                    incomemodel.OtherNonOpsExpense, incomemodel.InterestExpense, vendorNo);

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

        public JsonResult VendorBalanceSheet()
        {
            var vendorNo = Session["vendorNo"].ToString();
            List<BalanceSheetTModel> modelItems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBalanceSheet");
            modelItems = JsonConvert.DeserializeObject<List<BalanceSheetTModel>>(json);
            var jritems = (from a in modelItems where a.Vendor_No == vendorNo select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }
  
        public JsonResult  GetmeAllyears()
        {
            int currentYear = DateTime.Now.Year;
            List<DropdownListforYears> ddlYears = new List<DropdownListforYears>();
            for (int i = 2010; i <= currentYear; i++)
            {
                ddlYears.Add(new DropdownListforYears
                {
                    YearCode = i.ToString(),
                    YearDescription = i.ToString()
                });
            }
            return Json(ddlYears, JsonRequestBehavior.AllowGet);
        }

        public JsonResult VendorIncomeStatement()
        {
            var vendorNo = Session["vendorNo"].ToString();
            List<IncomeStatementTModel> modelItems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIncomeStatememt");
            modelItems = JsonConvert.DeserializeObject<List<IncomeStatementTModel>>(json);
            var jritems = (from a in modelItems where a.Vendor_No == vendorNo select a).ToList();

            return Json(jritems, JsonRequestBehavior.AllowGet);
        }
        public JsonResult VendorDetails()
        {
            var vendorNo = Session["vendorNo"].ToString();
            List<GetVendorTModel> modelItems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername+":"+ ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAllVendors");
            modelItems = JsonConvert.DeserializeObject<List<GetVendorTModel>>(json);
            var jritems = (from a in modelItems where a.No == vendorNo select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddStaffEntry(StaffEntryTModel staffmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                CultureInfo usCulture = new CultureInfo("en-US");
                var stfDateofbirth = DateTime.Parse(staffmodel.StaffDateofBirth, usCulture.DateTimeFormat);
                var stfJoiningDate = DateTime.Parse(staffmodel.StaffJoiningDate, usCulture.DateTimeFormat);

                var status = nvWebref.FnInsertStaffEntry(vendorNo, staffmodel.StaffName, staffmodel.StaffProfession, staffmodel.StaffDesignation, staffmodel.StaffPhonenumber,
                staffmodel.StaffNationality, stfDateofbirth, staffmodel.StaffEmail, stfJoiningDate, staffmodel.StaffYearswithfirm, staffmodel.StaffNumber);

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
        public JsonResult AddStaffQualifEntry(StaffQualificTModel staffqlfcmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var qualiftype = staffqlfcmodel.QualificCategories;
                int qualifCat = 0;
                //do switches here
                switch (qualiftype)
                {
                    case "PhD":
                        qualifCat = 1;
                        break;

                    case "Masters":
                        qualifCat = 2;
                        break;

                    case "Post-Graduate Diploma":
                        qualifCat = 3;
                        break;

                    case "Undergraduate":
                        qualifCat = 4;
                        break;

                    case "Diploma":
                        qualifCat = 5;
                        break;

                    case "A-Level":
                        qualifCat = 6;
                        break;

                    case "O-Level":
                        qualifCat = 7;
                        break;

                    case "Professional Certification":
                        qualifCat = 8;
                        break;
                }


                var status = nvWebref.FnInsertStaffQlfEntry(vendorNo, staffqlfcmodel.StaffID, qualifCat, staffqlfcmodel.QualificDescription, staffqlfcmodel.QualificInstitution, staffqlfcmodel.QualificStartdate,
                    staffqlfcmodel.QualificCompletiondate, staffqlfcmodel.QualificOutstAchievement);

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
        public JsonResult AddStaffXpEntry(StaffXPTModel staffxpmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var xptype = staffxpmodel.XpCategory;
                int xpCat = 0;
                //do switches here
                switch (xptype)
                {
                    case "General Experience":
                        xpCat = 1;
                        break;

                    case "Specialized Experience":
                        xpCat = 2;
                        break;

                    case "Training Experience":
                        xpCat = 3;
                        break;

                    case "No. of Handled Projects":
                        xpCat = 4;
                        break;

                    case "Other Experience":
                        xpCat = 5;
                        break;
                }

                var status = nvWebref.FnInsertStaffXPrEntry(vendorNo, staffxpmodel.XpStaffId, xpCat, staffxpmodel.XpSummary, staffxpmodel.XpPrjdescription, staffxpmodel.XpStartdate, staffxpmodel.XpEnddate, staffxpmodel.XpYearsofExperience);

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
        public JsonResult SubmitRegistration()
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnCompleteSupplierReg(vendorNo);

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
        public JsonResult GetIfPsList()
        {
            List<IFPRequestsModel> ifpRequests = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIfPs");
            ifpRequests = JsonConvert.DeserializeObject<List<IFPRequestsModel>>(json);
            var ifpitems = (from a in ifpRequests where a.Document_Type== "Invitation For Prequalification" select a).ToList();
            return Json(ifpitems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetIfpDetails(string ifpnumber)
        {
            List<IFPRequestsModel> ifpRequests = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIfPs");
            ifpRequests = JsonConvert.DeserializeObject<List<IFPRequestsModel>>(json);
            var ifpitems = (from a in ifpRequests where a.Code == ifpnumber select a).ToList();
            return Json(ifpitems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPreqcategories(string ifpnumber)
        {
            List<RfiPrequalifcTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetRfiPrequalification");
            modelitems = JsonConvert.DeserializeObject<List<RfiPrequalifcTModel>>(json);
            var jritems = (from a in modelitems where a.Document_No == ifpnumber select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGoodnServicesCategory(string ifpnumber)
        {
            List<RfiPrequalifcTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetRfiPrequalification");
            modelitems = JsonConvert.DeserializeObject<List<RfiPrequalifcTModel>>(json);
            var jritems = (from a in modelitems where a.Document_No == ifpnumber && a.Procurement_Type=="GOODS" select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetServicesCategory(string ifpnumber)
        {
            List<RfiPrequalifcTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetRfiPrequalification");
            modelitems = JsonConvert.DeserializeObject<List<RfiPrequalifcTModel>>(json);
            var jritems = (from a in modelitems where a.Document_No == ifpnumber && a.Procurement_Type == "SERVICES" select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWorksCategory(string ifpnumber)
        {
            List<RfiPrequalifcTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetRfiPrequalification");
            modelitems = JsonConvert.DeserializeObject<List<RfiPrequalifcTModel>>(json);
            var jritems = (from a in modelitems where a.Document_No == ifpnumber && a.Procurement_Type == "WORKS" select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetIfpDocuments(string ifpnumber)
        {
            List<IfPDocumentsTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetRfiDocs");
            modelitems = JsonConvert.DeserializeObject<List<IfPDocumentsTModel>>(json);
            var jritems = (from a in modelitems where a.Document_No == ifpnumber select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRepDetails(string rfidocpnumber)
        {
            List<RfiResponseTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetRfiResponses");
            modelitems = JsonConvert.DeserializeObject<List<RfiResponseTModel>>(json);
            var jritems = (from a in modelitems where a.Document_No == rfidocpnumber select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRfiApplicationNo(string ifpnumber)
        {
            var vendorNo = Session["vendorNo"].ToString();
            var nvWebref = WsConfig.EProcWebRef;
            var status = nvWebref.FnInsertRFIresponseHeader(vendorNo, ifpnumber);
            var res = status.Split('*');
            return Json(res[1], JsonRequestBehavior.AllowGet);
        }


        public JsonResult SubmitRfiResponse(RfiResponseTModel rfimodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnSubmitResponseFinal(vendorNo, rfimodel.RfiDocumentNo, rfimodel.RepFullName, rfimodel.RepDesignation, rfimodel.RfiDocApplicationNo);

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

        public JsonResult InsertResponseLines(RfiResponseTModel postData)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                string results_0 = (dynamic)null;
                string results_1 = (dynamic)null;
                
                List<string> procatlist = postData.ProcurementCategory.ToList();

                //Loop and insert records.
                foreach (var iteminlist in procatlist)
                {
                    var disectedCategory = iteminlist;
                    var status = nvWebref.FnInsertRFIResponseLines(postData.DocumentNo, disectedCategory, postData.RfiDocumentNo, vendorNo);
                    var res = status.Split('*');

                    results_0 = res[0];
                    results_1 = res[1];
                }
                switch (results_0)
                {
                    case "success":
                        return Json("success*" + results_1, JsonRequestBehavior.AllowGet);

                    default:
                        return Json("danger*" + results_1, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("danger*" + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult RfiSubmisionStatus(string applicationNo)
        {
            try
            {
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnSubmisionResponseStatus(applicationNo);
                return Json(status, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetOpentenderList()
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Document_Status == "Published" && a.Tender_Name!= "" select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRepCenters()
        {
            List<GeneralModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetResponsibiltyCenter");
            req = JsonConvert.DeserializeObject<List<GeneralModel>>(json);
            var items = (from a in req select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProcTypes()
        {
            List<ProcurementModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetProcurementTypes");
            req = JsonConvert.DeserializeObject<List<ProcurementModel>>(json);
            var items = (from a in req select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FnGetWorksnCategory()
        {
            List<WorksCategoryModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetWorksCategory");
            req = JsonConvert.DeserializeObject<List<WorksCategoryModel>>(json);
            var items = (from a in req select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchByRegion(string responsibilitycenter)
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Responsibility_Center == responsibilitycenter select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchByProcMethod(string procurementmethod)
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Procurement_Method == procurementmethod select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchByProcurementGroup(string procurementgroup)
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Procurement_Type == procurementgroup select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchByWorksCat(string workscategory)
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Works_Category == workscategory select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchByXpryDate(string xpirydte)
        {
            var dateplushyphen = xpirydte.Replace("/", "-");
            var matchjsondate = dateplushyphen + "T00:00:00";
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Submission_End_Date == matchjsondate select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOpentenderSpecialGrpList()
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Document_Status == "Published" && a.Mandatory_Special_Group_Reserv==true && a.Tender_Name != "" select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TendersGoodsRegions()
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Procurement_Type == "GOODS" select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSingleItTender(string ittpnumber)
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Code == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FnAllTenderAddendums()
        {
            List<TenderAddendums> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAddendums");
            req = JsonConvert.DeserializeObject<List<TenderAddendums>>(json);
            var items = (from a in req select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FnSingleTenderAddendums(string addendumnumber)
        {
            List<TenderAddendums> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAddendums");
            req = JsonConvert.DeserializeObject<List<TenderAddendums>>(json);
            var items = (from a in req select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FnGetTenderAddendums(string invitationNo)
        {
            List<TenderAddendums> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAddendums");
            req = JsonConvert.DeserializeObject<List<TenderAddendums>>(json);
            var items = (from a in req where a.Invitation_Notice_No == invitationNo select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPurchaseItemsforSingleTender(string ittpnumber)
        {
            List<PurchaseCodeLinesModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetPurchaseCodeLines");
            req = JsonConvert.DeserializeObject<List<PurchaseCodeLinesModel>>(json);
            var items = (from a in req where a.Standard_Purchase_Code == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBidTenderRequirments(string ittpnumber)
        {
            List<BidSecurityModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIfsRequirements");
            req = JsonConvert.DeserializeObject<List<BidSecurityModel>>(json);
            var items = (from a in req where a.IFS_Code == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTenderRequiredDocs(string ittpnumber)
        {
            List<IfsDocumentTModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetIfsDocs");
            req = JsonConvert.DeserializeObject<List<IfsDocumentTModel>>(json);
            var items = (from a in req where a.Document_No == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTenderRerved(string ittpnumber)
        {
            List<BidderReservedtModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetTenderReservCategory");
            req = JsonConvert.DeserializeObject<List<BidderReservedtModel>>(json);
            var items = (from a in req where a.Document_No == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEvalCriteria(string bidscoretemplate)
        {
            List<TenderEvalCriteriaModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidScoringTemplate");
            req = JsonConvert.DeserializeObject<List<TenderEvalCriteriaModel>>(json);
            var items = (from a in req where a.Code == bidscoretemplate select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPersonelSpecs(string ittpnumber)
        {
            List<TenderKeyStaffModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetTenderKeystaff");
            req = JsonConvert.DeserializeObject<List<TenderKeyStaffModel>>(json);
            var items = (from a in req where a.IFS_Code == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTendeEqSpecs(string ittpnumber)
        {
            List<TenderEquipSpecTModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetTenderEquipSpecs");
            req = JsonConvert.DeserializeObject<List<TenderEquipSpecTModel>>(json);
            var items = (from a in req where a.Document_No == ittpnumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBidEvalCritGroup(string templatenumber)
        {
            List<TenderBidScrCritGrpTModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetTenderifsBidscoreGrp");
            req = JsonConvert.DeserializeObject<List<TenderBidScrCritGrpTModel>>(json);
            var items = (from a in req where a.Template_ID == templatenumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CalculateBidEvalCriteriaScores(string templatenumber)
        {
            var nvWebref = WsConfig.EProcWebRef;
            var preliminaryeval = nvWebref.FnGetEvalCritScores(templatenumber, 0);
            var techeval = nvWebref.FnGetEvalCritScores(templatenumber, 1);
            var financialeval = nvWebref.FnGetEvalCritScores(templatenumber, 2);
            return Json(preliminaryeval +"*"+ techeval + "*" + financialeval, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBidEvalCriteriaScores(string templatenumber)
        {
            List<TenderBidScrCritGrpTModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetTenderifsBidscoreGrp");
            req = JsonConvert.DeserializeObject<List<TenderBidScrCritGrpTModel>>(json);
            var items = (from a in req where a.Template_ID == templatenumber select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDebarmentList()
        {
            List<TenderVDerbarmentTModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetTenderVDebarment");
            req = JsonConvert.DeserializeObject<List<TenderVDerbarmentTModel>>(json);
            var items = (from a in req select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRegionWorksCategory()
        {
            List<TenderModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            modelitems = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var jritems = (from a in modelitems where a.Procurement_Type == "WORKS" select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PopulateDocumentsfromSpTable(string ittpnumber)
        {
            using (ClientContext ctx = new ClientContext(ConfigurationManager.AppSettings["S_URL"]))
            {
                string password = ConfigurationManager.AppSettings["S_PWD"];
                string account = ConfigurationManager.AppSettings["S_USERNAME"];
                string domainname = ConfigurationManager.AppSettings["S_DOMAIN"];
                var secret = new SecureString();

                var arraydocs = new List<string>();
                List<SharePointTModel> alldocuments = new List<SharePointTModel>();
                List<SharePointTModel> lstmd = null;

                foreach (char c in password)
                {
                    secret.AppendChar(c);
                }
                // ctx.Credentials = new SharePointOnlineCredentials(account, secret);
                ctx.Credentials = new NetworkCredential(account, secret, domainname);
                ctx.Load(ctx.Web);
                ctx.ExecuteQuery();
                List list = ctx.Web.Lists.GetByTitle("ERP Documents");
                //Get Unique IttNumber
                string uniqueittpnumber = ittpnumber;
                uniqueittpnumber = uniqueittpnumber.Replace('/', '_');
                uniqueittpnumber = uniqueittpnumber.Replace(':', '_');   
                             
                ctx.Load(list);
                ctx.Load(list.RootFolder);
                ctx.Load(list.RootFolder.Folders);
                ctx.Load(list.RootFolder.Files);
                ctx.ExecuteQuery();

                FolderCollection allFolders = list.RootFolder.Folders;
                //   List<string> imprestfolders = new List<string>();
                List<string> allFiles = new List<string>();
                foreach (Folder folder in allFolders)
                {
                    if (folder.Name == "KeRRA")
                    {
                        ctx.Load(folder.Folders);
                        ctx.ExecuteQuery();
                        var uniqueittpnumberFolders = folder.Folders;

                        foreach (Folder folders in uniqueittpnumberFolders)
                        {
                            if (folders.Name == "Invitation To Tender")
                            {
                                ctx.Load(folders.Folders);
                                ctx.ExecuteQuery();
                                var uniqueittpnumberSubFolders = folders.Folders;

                                foreach (Folder ittnumber in uniqueittpnumberSubFolders)
                                {
                                    if (ittnumber.Name == uniqueittpnumber)
                                    {
                                        ctx.Load(ittnumber.Files);
                                        ctx.ExecuteQuery();

                                        FileCollection ittnumberFiles = ittnumber.Files;
                                        foreach (Microsoft.SharePoint.Client.File file in ittnumberFiles)
                                        {
                                            ctx.ExecuteQuery();
                                            alldocuments.Add(new SharePointTModel { FileName = file.Name });

                                        }
                                    }
                                }

                            }
                        } 

                    }
                }
                return Json(alldocuments, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult FetchTenderVendorDetails()
        {
            List<VendorTenderTModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetAllVendors");
            modelitems = JsonConvert.DeserializeObject<List<VendorTenderTModel>>(json);
            var jritems = (from a in modelitems where a.No == Session["vendorNo"].ToString() select a).ToList();
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }
        public JsonResult FetchTenderResponseDetails(string ittnumber)
        {
            List<BidResponseDetailsModel> modelitems = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidResponseDetails");
            modelitems = JsonConvert.DeserializeObject<List<BidResponseDetailsModel>>(json);
            var jritems = (from a in modelitems where a.Invitation_For_Supply_No == ittnumber &&a.Pay_to_Vendor_No == Session["vendorNo"].ToString() select a).ToList();
            var result = jritems.FirstOrDefault();
            if (result != null)
            {
                Session["BideResponseNumber"] = result.No;
            }
            return Json(jritems, JsonRequestBehavior.AllowGet);
        }
        public JsonResult FnPullSingeTenderDetailsrsp(string ittcode)
        {
            List<TenderModel> req = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetInvitetoTenders");
            req = JsonConvert.DeserializeObject<List<TenderModel>>(json);
            var items = (from a in req where a.Code == ittcode select a).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetVendorPreferenceDetails(string ittresponsenumber)
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<VendorPreferenceModel> vendorpreference = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetVenderPreferences");
            vendorpreference = JsonConvert.DeserializeObject<List<VendorPreferenceModel>>(json);
            var vpreference = (from a in vendorpreference where a.Vendor_No == Session["vendorNo"].ToString() &&a.Document_No== ittresponseid select a).ToList();
          
                return Json(vpreference, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDirectorOwnership(string ittresponsenumber)
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidResponseOwnerModel> ownership = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidResponseOwners");
            ownership = JsonConvert.DeserializeObject<List<BidResponseOwnerModel>>(json);
            var vownership = (from a in ownership where a.Vendor_No == Session["vendorNo"].ToString()&&a.No== ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidResponseItemsLines()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidResponseItemLinesModel> itemlines = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidItemsLinesDetails");
            itemlines = JsonConvert.DeserializeObject<List<BidResponseItemLinesModel>>(json);
            var vownership = (from a in itemlines where a.Buy_from_Vendor_No == Session["vendorNo"].ToString() && a.Document_No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidResponseStaffQualificationss(string bidresponsenumber)
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidKeyStaffQualificationModel> staffqualification = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidKeyStaffQualification");
            staffqualification = JsonConvert.DeserializeObject<List<BidKeyStaffQualificationModel>>(json);
            var vownership = (from a in staffqualification where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidResponseAuditBalanceSheet()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidResponseAuditBalanceSheet> balancesheet = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidKeyAuditedBalanaceSheet");
            balancesheet = JsonConvert.DeserializeObject<List<BidResponseAuditBalanceSheet>>(json);
            var vownership = (from a in balancesheet where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidResponseAuditIncomeStatement()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidResponseAuditIncomeStatements> incomestatement = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidKeyAuditedIncomeStatement");
            incomestatement = JsonConvert.DeserializeObject<List<BidResponseAuditIncomeStatements>>(json);
            var vownership = (from a in incomestatement where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
       }
        public JsonResult GetBidVendorBankAccounts()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidVendorBankAccountsModel> bankaccount = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetBidKeyBankAccounts");
            bankaccount = JsonConvert.DeserializeObject<List<BidVendorBankAccountsModel>>(json);
            var vownership = (from a in bankaccount where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidVendorPastExperiences()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidPastExperienceModel> pastexperience = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetKeyBidPastExperience");
            pastexperience = JsonConvert.DeserializeObject<List<BidPastExperienceModel>>(json);
            var vownership = (from a in pastexperience where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidLitigationsHistorys()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidLitigationHistoryModel> litigations = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetKeyBidLitigationHistory");
            litigations = JsonConvert.DeserializeObject<List<BidLitigationHistoryModel>>(json);
            var vownership = (from a in litigations where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBidContractKeySecurity()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidTenderSecuritycs> keysecurity = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetKeyBidSecurityDetails");
            keysecurity = JsonConvert.DeserializeObject<List<BidTenderSecuritycs>>(json);
            var vownership = (from a in keysecurity where a.Vendor_No == Session["vendorNo"].ToString() && a.No == ittresponseid select a).ToList();
            return Json(vownership, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SubmitTenderResponse(string ittpnumber)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnSubmitTenderResponse(vendorNo, ittpnumber);
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

        public JsonResult AddBidResponseInfoTab1(BidResponseInsertDataTModel bidmodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;
                var status = nvWebref.FnInserBidInfoTab1(vendorNo, bidmodel.BidRespNumber, bidmodel.BidderRepName, bidmodel.BidderRepDesignation, bidmodel.BidderRepAddress,
                    bidmodel.BidderWitnessName, bidmodel.BidderWitnessDesignation, bidmodel.BidderWitnessAddress);
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

        public JsonResult AddaPreference(BidResponseInsertDataTModel preferencemodel)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                CultureInfo usCulture = new CultureInfo("en-US");
                var myEffdate = DateTime.Parse(preferencemodel.BidPrefAgpoCertEffDte, usCulture.DateTimeFormat);
                var myExpdate = DateTime.Parse(preferencemodel.BidPrefAgpoCertExpDte, usCulture.DateTimeFormat);
                
                var status = nvWebref.FnAddBidPrefr(preferencemodel.BidPrefAgpoCertNo, vendorNo, preferencemodel.BidPrefRespNo, preferencemodel.BidPrefRegisteredGrpe, preferencemodel.BidPrefProductServiceCat,
                    myEffdate, myExpdate);
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

        public JsonResult GetBidResponseEquipment()
        {
            var ittresponseid = Session["BideResponseNumber"].ToString();
            List<BidderEquipmentTModel> balancesheet = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetKeyBidderEquipment");
            balancesheet = JsonConvert.DeserializeObject<List<BidderEquipmentTModel>>(json);
            var jresp = (from a in balancesheet where a.No == ittresponseid select a).ToList();
            return Json(jresp, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteBidAuditedBalSheetentry(string yearCode)
        {
            try
            {
                var vendorNo = Session["vendorNo"].ToString();
                var ittresponseid = Session["BideResponseNumber"].ToString();
                var nvWebref = WsConfig.EProcWebRef;

                var status = nvWebref.FnDeleteBidAuditedBalsheet(yearCode, vendorNo, ittresponseid);
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

        public ActionResult DocumentTemplateList_TenderResponse()
        {
            List<DocumentsTModel> docTModel = null;
            WebClient wc = new WebClient();
            wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
            string json = wc.DownloadString(Baseurl + "api/GetDocumentsTemplates_Rfi");
            docTModel = JsonConvert.DeserializeObject<List<DocumentsTModel>>(json);
            var madocs = (from a in docTModel where a.Document_Type == "Invitation For Prequalification" select a).ToList();

            return View(madocs);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult CheckLogin(string myUserId, string myPassword)
        {
            try
            {
                List<Login> loginmodel = null;
                WebClient wc = new WebClient();
                wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(ApiUsername + ":" + ApiPassword)));
                string json = wc.DownloadString(Baseurl + "api/GetPortalUsers");
                loginmodel = JsonConvert.DeserializeObject<List<Login>>(json);

                List<ContactsModel> contacts = null;
                string json2 = wc.DownloadString(Baseurl + "api/GetPortalContacts");
                contacts = JsonConvert.DeserializeObject<List<ContactsModel>>(json2);

                List<VendorModel> vendor = null;
                string json3 = wc.DownloadString(Baseurl + "api/GetAllVendors");
                vendor = JsonConvert.DeserializeObject<List<VendorModel>>(json3);


                if (string.IsNullOrWhiteSpace(myUserId))
                    return Json("UsernameEmpty", JsonRequestBehavior.AllowGet);
                if (string.IsNullOrWhiteSpace(myPassword))
                    return Json("PasswordEmpty", JsonRequestBehavior.AllowGet);

                var loginresult = (from a in loginmodel where a.User_Name == myUserId select a).ToList();
                var result = loginresult.FirstOrDefault();
                if (result != null)
                {
                    Session["prequalified"] = result.State;
                    Session["email"] = result.Authentication_Email;
                    Session["password"] = result.Password_Value;
                    Session["name"] = result.Full_Name;
                    Session["email"] = result.Authentication_Email;
                    Session["contactNo"] = result.Record_ID;
                    Session["userNo"] = result.Record_ID;
                    Session["vendorNo"] = result.Record_ID;

                    if (result.Password_Value != myPassword)
                        return Json("PasswordMismatched", JsonRequestBehavior.AllowGet);
                   
                    //check if the are in Vendor table
                    var vendorcollection = (from a in vendor where a.Primary_Contact_No == (string)Session["contactNo"] select a).ToList();

                    if (result.State == "Enabled")
                    {
                        foreach (var vend in vendorcollection)
                        {
                            Session["vendorNo"] = vend.No;
                            Session["userNo"] = vend.No;
                            Session["category"] = vend.Supplier_Category;
                        }
                        return Json("Loginuser", JsonRequestBehavior.AllowGet);
                    }
                    if (result.State != "Enabled")
                    {
                        return Json("accountdeactivated", JsonRequestBehavior.AllowGet);

                    }
                }
                return Json("InvalidLogin", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

    }
}