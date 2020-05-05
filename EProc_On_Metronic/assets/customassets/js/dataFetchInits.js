'use-strict';

var Ld = function () {
    var fnc = function () {

    }
    var e = function() {
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/VendorDetails",
            beforeSend: function () {
                $(".modalspinner").show();
            },
            complete: function () {
                $(".modalspinner").hide();
            }
        });

        $.ajax({
            data: ""
        }).done(function (json) {
            console.log(JSON.stringify({ vendorTestdata: json}));
            for (var i = 0; i < json.length; i++) {
                $("#txtDisVendorNo").val(json[i].No),
                $("#txtBznameRO").val(json[i].Name),
                $("#txtVATNo").val(json[i].VAT_Registration_No),
                $("#ddlBusinesstype").val(json[i].Business_Type);
                //$("#ddlVendortype").text(json[i].Supplier_Type),
                //$("#ddlOwnershiptype").val(json[i].Ownership_Type),
                //$("#txtCertofIncorp").val(json[i].Registration_Incorporation_No),
                //$("#dtIncorp").val(json[i].Reg_Incorporation_Date),
                //$("#dtOps").val(json[i].Operations_Start_Date),
                //$("#ddlLanguageCode").val(json[i].Language_Code),
                //$("#txtareaVision").val(json[i].Vision_Statement),
                //$("#txtareaMision").val(json[i].Mission_Statement),
                //$("#txtPoBox").val(json[i].Address),
                //$("#txtLocation").val(json[i].Address_2),
                //$("#ddlallpostacodes30").val(json[i].Post_Code),
                //$("#txtCity").val(json[i].City),
                //$("#ddlallcountries").val(json[i].Country_Region_Code),
                //$("#txtwebsiteurl").val(json[i].Website_Url),
                //$("#txtTelphNo").val(json[i].Tel),
                //$("#txtBuildNo").val(json[i].Building_House_No),
                //$("#txtFloor").val(json[i].Floor),
                //$("#txtPlotNo").val(json[i].Plot_No),
                //$("#txtStreetroad").val(json[i].Street),
                //$("#txtFaxNo").val(json[i].Fax_No),
                //$("#ddlCompanysize").val(json[i].Company_Size),
                //$("#ddlIndustrygroup").val(json[i].Industry_Group),
                //$("#ddlNominalCap").val(json[i].Nominal_Capital_LCY),
                //$("#txtDealertype").text(json[i].Dealer_Type),
                //$("#txtMaxbzVal").val(json[i].Max_Value_of_Business),
                //$("#txtCntPhoneno").val(json[i].Phone_No),
                //$("#txtareaNatureofBz").val(json[i].Nature_of_Business);
            }
        });
    };
    return {
        init: function() {
            e(), fnc();
        }
    }
}();
jQuery(document).ready(function() {
    Ld.init();
});