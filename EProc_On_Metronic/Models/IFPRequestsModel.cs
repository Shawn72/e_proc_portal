namespace EProc_On_Metronic.Models
{
    public class IFPRequestsModel
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string Tender_Summary { get; set; }
        public string Primary_Target_Vendor_Cluster { get; set; }
        public string Document_Date { get; set; }
        public string Period_Start_Date { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public bool Published { get; set; }
        public string Submission_Start_Date { get; set; }
        public string Submission_Start_Time { get; set; }
        public string Procurement_Type { get; set; }
       
    }
}