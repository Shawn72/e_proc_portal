using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EProc_On_Metronic.Models
{
    public class BidResponseAuditIncomeStatements
    {
        public string Vendor_No { get; set; }
        public string Audit_Year_Code_Reference { get; set; }
        public string Total_Revenue_LCY { get; set; }
        public string Total_COGS_LCY { get; set; }
        public string Gross_Margin_LCY { get; set; }
        public string Total_Operating_Expenses_LCY { get; set; }
        public string Operating_Income_EBIT_LCY { get; set; }
        public string Other_Non_operating_Re_Exp_LCY { get; set; }
        public string Interest_Expense_LCY { get; set; }
        public string Income_Before_Taxes_LCY { get; set; }
        public string Income_Tax_Expense_LCY { get; set; }
        public string Net_Income_from_Ops_LCY { get; set; }
        public string Below_the_line_Items_LCY { get; set; }
        public string Net_Income { get; set; }
        public string Document_Type { get; set; }
        public string No { get; set; }
    }
}