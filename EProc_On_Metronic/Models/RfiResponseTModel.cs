using System.Collections.Generic;

namespace EProc_On_Metronic.Models
{
    public class RfiResponseTModel
    {
        public string Document_Type { get; set; }
        public string Document_No { get; set; }
        public string Document_Date { get; set; }
        public string Vendor_No { get; set; }
        public string Vendor_Name { get; set; }
        public string RFI_Document_No { get; set; }
        public string Vendor_Representative_Name { get; set; }
        public string Vendor_Repr_Designation { get; set; }
        public string Vendor_Address { get; set; }
        public string Vendor_Address_2 { get; set; }
        public string City { get; set; }
        public string Phone_No { get; set; }
        public string Country_Region_Code { get; set; }
        public string Post_Code { get; set; }
        public string E_Mail { get; set; }
        public string Special_Group_Vendor { get; set; }
        public string Special_Group_Category { get; set; }
        public string Final_Evaluation_Score { get; set; }
        public string Document_Status { get; set; }
        public string Date_Submitted { get; set; }
        public string Created_Date { get; set; }

        //to insert lines, use below models
        public string DocumentNo { get; set; }
        public string RfiDocumentNo { get; set; }
        public List<string> ProcurementCategory { get; set; }

        //to submit response, use below models
        public string RepFullName { get; set; }
        public string RepDesignation { get; set; }
        public string RfiDocApplicationNo { get; set; }
    }
}