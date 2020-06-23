namespace EProc_On_Metronic.Models
{
    public class TenderAddendums
    {
        public string Addendum_Notice_No { get; set; }
        public string Document_Date { get; set; }
        public string Invitation_Notice_No { get; set; }
        public string Description { get; set; }
        public string Addendum_Instructions { get; set; }
        public string Primary_Addendum_Type_ID { get; set; }
        public string Addendum_Type_Description { get; set; }
        public string Tender_No { get; set; }
        public string Tender_Description { get; set; }
        public string Responsibility_Center { get; set; }
        public string New_Submission_Start_Date { get; set; }
        public string Original_Submission_Start_Date { get; set; }
        public string New_Submission_Start_Time { get; set; }
        public string New_Submission_End_Date { get; set; }
        public string Original_Submission_End_Date { get; set; }
        public string New_Submission_End_Time { get; set; }
        public string Original_Submission_End_Time { get; set; }
        public string Original_Bid_Opening_Date { get; set; }
        public string New_Bid_Opening_Date { get; set; }
        public string Original_Bid_Opening_Time { get; set; }
        public string New_Bid_Opening_Time { get; set; }
        public string Original_Prebid_Meeting_Date { get; set; }
        public string New_Prebid_Meeting_Date { get; set; }
        public string Document_Status { get; set; }
        public string Status { get; set; }
        public bool Posted { get; set; }
    }
}