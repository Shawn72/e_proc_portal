namespace EProc_On_Metronic.Models
{
    public class AuditedFinancialsTModel
    {
        ///balance sheet
        public string Year { get; set; }
        public decimal TotalCurrentAssets { get; set; }
        public decimal TotalFixedAssets { get; set; }
        public decimal TotalCurrentLiabilty{ get; set; }
        public decimal TotalLongTermLiability { get; set; }
        public decimal TotalOwnersEquity { get; set; }

        ///income statement
        public string YearI { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalCogs { get; set; }
        public decimal TotalOpsExpense{ get; set; }
        public decimal OtherNonOpsExpense { get; set; }
        public decimal InterestExpense { get; set; }
    }
}