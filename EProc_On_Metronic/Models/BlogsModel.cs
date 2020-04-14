using System;

namespace EProc_On_Metronic.Models
{
    public class BlogsModel
    {
        //blogs
        public int Blog_Id { get; set; }
        public string Blog_Title { get; set; }
        public string Blog_Body { get; set; }
        public string Created_ByVendorNo { get; set; }
        public DateTime Date_Created { get; set; }
        public string Created_ByVendorName { get; set; }
        public string Time_Created { get; set; }

        //blog replies
        public  int Entry_Id { get; set; }
        public int BlogIdCode { get; set; }
        public string Blog_Reply { get; set; }
        public string Replier_Name { get; set; }
        public string Replier_VendorNo { get; set; }
        public DateTime Date_Replied { get; set; }
        public string Time_Replied { get; set; }
    }
}