namespace EProc_On_Metronic.Models
{
    public class BalanceSheetTModel
    {
        public string Vendor_No { get; set; }
        public string Audit_Year_Code_Reference { get; set; }
        public decimal Current_Assets_LCY { get; set; }
        public decimal Fixed_Assets_LCY { get; set; }
        public decimal Total_Assets_LCY { get; set; }
        public decimal Current_Liabilities_LCY { get; set; }
        public decimal Long_term_Liabilities_LCY { get; set; }
        public decimal Total_Liabilities_LCY { get; set; }
        public decimal Owners_Equity_LCY { get; set; }
        public decimal Total_Liabilities_Equity_LCY { get; set; }
        public decimal Debt_Ratio { get; set; }
        public decimal Current_Ratio { get; set; }
        public decimal Working_Capital_LCY { get; set; }
        public decimal Assets_To_Equity_Ratio { get; set; }
        public decimal Debt_To_Equity_Ratio { get; set; }


    }
}