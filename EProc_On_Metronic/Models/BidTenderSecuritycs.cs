using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EProc_On_Metronic.Models
{
    public class BidTenderSecuritycs
    {
        public string No { get; set; }
        public string Form_of_Security { get; set; }
        public string Vendor_No { get; set; }
        public string Security_Type { get; set; }
        public string Issuer_Institution_Type { get; set; }
        public string Issuer_Guarantor_Name { get; set; }
        public string Issuer_Registered_Offices { get; set; }
        public string Description { get; set; }
        public string Security_Amount_LCY { get; set; }
        public string Bid_Security_Effective_Date { get; set; }
        public string Bid_Security_Validity_Expiry { get; set; }
        public string Security_ID { get; set; }
        public string Security_Closure_Date { get; set; }
        public string Security_Closure_Voucher_No { get; set; }
        public string IFS_No { get; set; }
    }
}