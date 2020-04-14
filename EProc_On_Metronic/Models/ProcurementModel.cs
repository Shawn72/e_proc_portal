using System;

namespace EProc_On_Metronic.Models
{
    public class ProcurementModel
    {
        public  int EntryNo { get; set; }
        public string No { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Category_Code { get; set; }
        
        public DateTime Return_Date { get; set; }
        public DateTime Creation_Date { get; set; }
        public string Return_Time { get; set; }
        public string Status { get; set; }
        public string E_Mail { get; set; }
        public string Process_Type { get; set; }
        public bool Quotation_Finished { get; set; }
        public string Vendor_No { get; set; }
        public string Selected_Bidder_Name { get; set; }
        public string Successful_Bidder { get; set; }
        public bool Closed { get; set; }





    }
}