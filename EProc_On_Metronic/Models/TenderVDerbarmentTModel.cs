namespace EProc_On_Metronic.Models
{
    public class TenderVDerbarmentTModel
    {
        public string Entry_no { get; set; }
        public string Source_Voucher_No { get; set; }
        public string Document_Type { get; set; }
        public string Firm_Name { get; set; }
        public string Reason_Code { get; set; }
        public string Description { get; set; }

        public string Ineligibility_Start_Date { get; set; }
        public string Ineligibility_End_Date { get; set; }
        public string Reinstatement_Date { get; set; }
       
        public bool Blocked { get; set; }
        public string Country_Region_Code { get; set; }
        public string Address { get; set; }
        public string Incorporation_Reg_No { get; set; }
        public string Tax_Registration_PIN_No { get; set; }
        public string Vendor_No { get; set; }

        
    }
}