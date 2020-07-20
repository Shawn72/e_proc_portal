using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EProc_On_Metronic.Models
{
    public class BidResponseItemLinesModel
    {
        public string Document_Type { get; set; }
        public string Buy_from_Vendor_No { get; set; }
        public string Document_No { get; set; }
        public string Line_No { get; set; }
        public string Type { get; set; }
        public string No { get; set; }
        public string Location_Code { get; set; }
        public string Expected_Receipt_Date { get; set; }
        public string Description { get; set; }
        public string Description_2 { get; set; }
        public string Unit_of_Measure { get; set; }
        public string Quantity { get; set; }
        public string Amount { get; set; }
        public string Amount_Including_VAT { get; set; }
        public string Unit_Price_LCY { get; set; }
        public string Unit_Volume { get; set; }
        public string Direct_Unit_Cost { get; set; }
        public string VAT { get; set; }

    }
}