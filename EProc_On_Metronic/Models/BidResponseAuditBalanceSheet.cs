using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EProc_On_Metronic.Models
{
    public class BidResponseAuditBalanceSheet
    {
        public string Staff_No { get; set; }
        public string No { get; set; }
        public string Audit_Year_Code_Reference { get; set; }
        public string Vendor_No { get; set; }
        public string Current_Assets_LCY { get; set; }
        public string Fixed_Assets_LCY { get; set; }
        public string Total_Assets_LCY { get; set; }
        public string Current_Liabilities_LCY { get; set; }
        public string Long_term_Liabilities_LCY { get; set; }
        public string Total_Liabilities_LCY { get; set; }
        public string Owners_Equity_LCY { get; set; }
        public string Total_Liabilities_Equity_LCY { get; set; }
        public string Debt_Ratio { get; set; }
        public string Current_Ratio { get; set; }
        public string Working_Capital_LCY { get; set; }
        public string Assets_To_Equity_Ratio { get; set; }
        public string Debt_To_Equity_Ratio { get; set; }
        public string AuxiliaryIndex1 { get; set; }
    }
}