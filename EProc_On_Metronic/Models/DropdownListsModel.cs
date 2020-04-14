using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace EProc_On_Metronic.Models
{
    public class DropdownListsModel
    {
        public List<SelectListItem> MyDropdownList { get; set; }

        public int? PostalId { get; set; }
        public string PostaCode { get; set; }

        public int? CountryId { get; set; }
        public string CountryName { get; set; }

        public int? SupplierCategoryId { get; set; }
        public string SupplierCategory { get; set; }
        
        public enum SupplierType
        {
            Individual = 1,
            Organization = 2
        }
        [Display(Name = "Applicant Type")]
        public int ApptypeId { get; set; }
        public IEnumerable<SelectListItem> ApptypeList { get; set; }

        public string Code { get; set; }
        public string Name { get; set; }
        public string City { get; set; }

        //supplier categories list 
        public string Category_Code { get; set; }
        public string Description { get; set; }

        public string Category { get; set; }
        public string CategoryName { get; set; }
    }
}