namespace EProc_On_Metronic.Models
{
    public class TenderEquipSpecTModel
    {
        public string Document_No { get; set; }
        public string Equipment_Type_Code { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Minimum_Required_Qty { get; set; }
        public bool Blocked { get; set; }
    }
}