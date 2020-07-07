namespace EProc_On_Metronic.Models
{
    public class IfsDocumentTModel
    {
        public string Document_No { get; set; }
        public string Procurement_Document_Type_ID { get; set; }
        //ifp Documents
        public string Description { get; set; }
        public bool Track_Certificate_Expiry { get; set; }
        public string Requirement_Type { get; set; }
        public string Special_Group_Requirement { get; set; }
        public string Specialized_Provider_Req { get; set; }
    }
}