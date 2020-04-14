namespace EProc_On_Metronic.Models
{
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string IDNoorRegNo { get; set; }
        public string customer_No { get; set; }
        public bool isAdmin { get; set; }
        public bool ActivatedAsVendor { get; set; }
    }
}