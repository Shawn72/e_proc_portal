namespace EProc_On_Metronic.Models
{
    public class TenderModel
    {
        public int EntryNo { get; set; }
        public string Ref_No { get; set; }
        public string Name { get; set; }
        public string Vendor_No { get; set; }
        public string Title { get; set; }
        public bool Prequalified { get; set; }
        public bool Selected { get; set; }
        public  bool Successful { get; set; }
        public string Contact_No { get; set; }
        public string E_Mail { get; set; }

        //Tender Notices n' Ads
        public string Advert_Description { get; set; }
        public string Date_Created { get; set; }
    }
}