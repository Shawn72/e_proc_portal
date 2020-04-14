namespace EProc_On_Metronic.Models
{
    public class RfQsModel
    {
        public string Bidder_Email { get; set; }
        public string No { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
       
        public decimal Amount { get; set; }
        public  string contactNo { get; set; }
        public bool Select { get; set; }
        public bool Awarded { get; set; }
        public  string Vendor_No { get; set; }
        public string Name { get; set; }
        public  int EntryNo { get; set; }
        public string Unit_of_Measure { get; set; }

        //Rfqinsert model //to be shared across
        public decimal Unit_Price { get; set; }
        public decimal Quantity { get; set; }
        public string Requisition_No { get; set; }
        public string Item_No { get; set; }
        public int Line_No { get; set; }
        public string Type { get; set; }


    }
}