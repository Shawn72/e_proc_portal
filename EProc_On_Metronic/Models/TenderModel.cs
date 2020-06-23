namespace EProc_On_Metronic.Models
{
    public class TenderModel
    {
        public int EntryNo { get; set; }
        public string Ref_No { get; set; }
        public string Name { get; set; }
        public string Vendor_No { get; set; }
        public string Title { get; set; }
        public bool Prequalified { get; set; }
        public bool Selected { get; set; }
        public  bool Successful { get; set; }
        public string Contact_No { get; set; }
        public string E_Mail { get; set; }

        //Tender Notices n' Ads
        public string Advert_Description { get; set; }
        public string Date_Created { get; set; }

        //START:Advanced Tenders Model
        public string Code { get; set; }
        public string Description { get; set; }
        public string Procurement_Method { get; set; }
        public string External_Document_No { get; set; }
        public string Procurement_Type { get; set; }
        public string Procurement_Category_ID { get; set; }
        public string Project_ID { get; set; }
        public string Constituency_ID { get; set; }
        public string Tender_Name { get; set; }
        public string Tender_Summary { get; set; }
        public string Status { get; set; }
        public string City { get; set; }
        public string Country_Region_Code { get; set; }
        public string Submission_Start_Date { get; set; }
        public string Submission_End_Date { get; set; }
        public string Bid_Document_Template { get; set; }
        public string Financial_Year_Code { get; set; }
        public string Bid_Opening_Date { get; set; }
        public string Bid_Opening_Venue { get; set; }
        public string Document_Status { get; set; }
        public string Location_Code { get; set; }
        public string Responsibility_Center { get; set; }
        public string Works_Category { get; set; }
        public bool Mandatory_Special_Group_Reserv { get; set; }
        public bool Enforce_Mandatory_Pre_bid_Visi { get; set; }
        public string Invitation_Notice_Type { get; set; }
        public string Document_Date { get; set; }

        ////
        /// 
        public string Bid_Envelop_Type { get; set; }
        public bool Sealed_Bids { get; set; }
        public string Tender_Validity_Duration { get; set; }
        public string Tender_Validity_Expiry_Date { get; set; }
        public string Requisition_Product_Group { get; set; }
        public string Lot_No { get; set; }
        public string Target_Bidder_Group { get; set; }
        public string Bid_Submission_Method { get; set; }
        public string Bid_Selection_Method { get; set; }
        public string Language_Code { get; set; }
        public string Address_2 { get; set; }
        public string Submission_Start_Time { get; set; }
        public string Post_Code { get; set; }
        public string Mandatory_Pre_bid_Visit_Date { get; set; }
        public string Prebid_Meeting_Address { get; set; }
        public string Phone_No { get; set; }
        public string Bid_Opening_Time { get; set; }
        public string Tender_Box_Location_Code { get; set; }
        public string Procuring_Entity_Name_Contact { get; set; }
        public string Primary_Tender_Submission { get; set; }
        public bool Performance_Security_Required { get; set; }
        public bool Bid_Tender_Security_Required { get; set; }

        //seperator
        public string Bid_Security { get; set; }
        public string Performance_Security { get; set; }
        public decimal Bid_Security_Amount_LCY { get; set; }
        public bool Advance_Payment_Security_Req { get; set; }
        public decimal Advance_Payment_Security { get; set; }
        public string Bid_Security_Validity_Duration { get; set; }
        public string Bid_Security_Expiry_Date { get; set; }
        public decimal Advance_Amount_Limit { get; set; }
        public bool Insurance_Cover_Required { get; set; }
        public string Appointer_of_Bid_Arbitrator { get; set; }
        //END: Advanced Tenders Model

    }
}