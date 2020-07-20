using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EProc_On_Metronic.Models
{
    public class BidLitigationHistoryModel
    {
        public string Document_Type { get; set; }
        public string No { get; set; }
        public string Entry_No { get; set; }
        public string Vendor_No { get; set; }
        public string Dispute_Matter { get; set; }
        public string Other_Dispute_Party { get; set; }
        public string Dispute_Amount_LCY { get; set; }
        public string Category_of_Matter { get; set; }
        public string Year { get; set; }
        public string Award_Type { get; set; }
    }
}