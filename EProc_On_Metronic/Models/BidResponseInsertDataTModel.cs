namespace EProc_On_Metronic.Models
{
    public class BidResponseInsertDataTModel
    {
        //bid witnessess model
        public string BidRespNumber { get; set; }
        public string BidderRepName { get; set; }
        public string BidderRepDesignation { get; set; }
        public string BidderRepAddress { get; set; }
        public string BidderWitnessName { get; set; }
        public string BidderWitnessDesignation { get; set; }
        public string BidderWitnessAddress { get; set; }

        //bid preference model
        public string BidPrefAgpoCertNo { get; set; }
        public string BidPrefRespNo { get; set; }
        public string BidPrefRegisteredGrpe { get; set; }
        public string BidPrefProductServiceCat { get; set; }
        public string BidPrefAgpoCertEffDte { get; set; }
        public string BidPrefAgpoCertExpDte { get; set; }
    }
}