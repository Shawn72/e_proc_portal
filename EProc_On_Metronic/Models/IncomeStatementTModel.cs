namespace EProc_On_Metronic.Models
{
    public class IncomeStatementTModel
    {
        public string Vendor_No { get; set; }
        public string Audit_Year_Code_Reference { get; set; }
        public decimal Total_Revenue_LCY { get; set; }
        public decimal Total_COGS_LCY { get; set; }
        public decimal Gross_Margin_LCY { get; set; }
        public decimal Total_Operating_Expenses_LCY { get; set; }
        public decimal Operating_Income_EBIT_LCY { get; set; }
        public decimal Other_Non_operating_Re_Exp_LCY { get; set; }
        public decimal Interest_Expense_LCY { get; set; }
        public decimal Income_Before_Taxes_LCY { get; set; }
        public decimal Income_Tax_Expense_LCY { get; set; }
        public decimal Net_Income_from_Ops_LCY { get; set; }
        public decimal Below_the_line_Items_LCY { get; set; }
        public decimal Net_Income { get; set; }
    }
}