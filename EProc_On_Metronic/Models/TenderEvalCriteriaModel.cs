namespace EProc_On_Metronic.Models
{
    public class TenderEvalCriteriaModel
    {
        public string Code { get; set; }
        public string Template_type { get; set; }
        public string Description { get; set; }
        public string Document_No { get; set; }
        public string Default_Procurement_Type { get; set; }
        public string Total_Preliminary_Checks_Score { get; set; }
        public string Total_Technical_Evaluation { get; set; }
        public string Total_Financial_Evaluation { get; set; }
        public string Total_Assigned_Score_Weight { get; set; }
        public string Default_YES_Bid_Rating_Score { get; set; }
        public string NO_Bid_Rating_Response_Value { get; set; }
        public string Default_NO_Bid_Rating_Score { get; set; }
        public string V1_POOR_Option_Text_Bid_Score { get; set; }
        public string V3_GOOD_Option_Text_Bid_Score { get; set; }
        public string V2_FAIR_Option_Text_Bid_Score { get; set; }
        public string V4_VERY_GOOD_Text_Bid_Score { get; set; }
        public string V5_EXCELLENT_Text_Bid_Score { get; set; }
        public bool Blocked { get; set; }
    }
}