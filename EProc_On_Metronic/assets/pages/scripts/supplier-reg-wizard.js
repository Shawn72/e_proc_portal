'use-strict';

function checkTextAreaVision(textArea, maxLength) {
    document.getElementById("lblCharleftTextarea1").innerHTML = maxLength - textArea.value.length + " characters left";
    if (textArea.value.length > maxLength) {
        document.getElementById("lblCharleftTextarea1").style.color = "red";
        textArea.value = textArea.value.substr(0, maxLength);
        document.getElementById("lblCharleftTextarea1").innerHTML = maxLength - textArea.value.length + " characters left";
    }
    else if (textArea.value.length < maxLength) {
        document.getElementById("lblCharleftTextarea1").style.color = "Black";
    }
    else {
        document.getElementById("lblCharleftTextarea1").style.color = "red";
    }
}
function checkTextAreaMision(textArea, maxLength) {
    document.getElementById("lblCharleftTextarea2").innerHTML = maxLength - textArea.value.length + " characters left";
    if (textArea.value.length > maxLength) {
        document.getElementById("lblCharleftTextarea2").style.color = "red";
        textArea.value = textArea.value.substr(0, maxLength);
        document.getElementById("lblCharleftTextarea2").innerHTML = maxLength - textArea.value.length + " characters left";
    }
    else if (textArea.value.length < maxLength) {
        document.getElementById("lblCharleftTextarea2").style.color = "Black";
    }
    else {
        document.getElementById("lblCharleftTextarea2").style.color = "red";
    }
}

function checkTextAreaNtrBz(textArea, maxLength) {
    document.getElementById("lblCharleftTextarea3").innerHTML = maxLength - textArea.value.length + " characters left";
    if (textArea.value.length > maxLength) {
        document.getElementById("lblCharleftTextarea3").style.color = "red";
        textArea.value = textArea.value.substr(0, maxLength);
        document.getElementById("lblCharleftTextarea3").innerHTML = maxLength - textArea.value.length + " characters left";
    }
    else if (textArea.value.length < maxLength) {
        document.getElementById("lblCharleftTextarea3").style.color = "Black";
    }
    else {
        document.getElementById("lblCharleftTextarea3").style.color = "red";
    }
}

var FormWizard = function () {
    return {
        init: function() {
            function e(e) {
                return e.id ? "<img class='flag' src='/assets/global/img/flags/" + e.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + e.text : e.text;
            }
            if (jQuery().bootstrapWizard) {
                $("#country_list").select2({
                    placeholder: "Select",
                    allowClear: !0,
                    formatResult: e,
                    width: "auto",
                    formatSelection: e,
                    escapeMarkup: function(e) {
                        return e;
                    }
                });
                var r = $("#submit_supplier_form"),
                    t = $(".alert-danger", r),
                    i = $(".alert-success", r);
                r.validate({
                    doNotHideMessage: !0,
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    rules: {
                        ddlbzTypename: {
                            required: !0
                        },
                        txtCertofIncorp: {
                            minlength: 5,
                            required: !0
                        },
                        ddlVendortype: {
                            required: !0
                        },
                        ddlallpostacodes30: {
                            required: !0
                        },
                        ddlallcountries: {
                            required: !0
                        },
                        ddlOwnershiptype: {
                            required: !0
                        },
                        dtOps: {
                            required: !0
                        },
                        dtIncorp: {
                            required: !0
                        },
                        ddlLanguageCode: {
                            required: !0
                        },
                        ddlIndustrygroup: {
                            required: !0
                        },
                        txtVendorLName: {
                            minlength: 3,
                            required: !0
                        },
                        txtareaVision: {
                            minlength: 10,
                            maxlength: 250,
                            required: !0,
                        },
                        txtareaMision: {
                            minlength: 10,
                            maxlength: 250,
                            required: !0
                        },
                        txtPoBox: {
                            minlength: 3,
                            required: !0,
                            number:!0
                        },
                        txtLocation: {
                            minlength: 3,
                            required: !0,
                        },
                        txtCity: {
                            required: !0
                        },
                        txtBuildNo: {
                            minlength: 2,
                            required: !0,
                            number:!0
                        },

                        txtStreetroad: {
                            minlength: 3,
                            required: !0
                        },
                        
                        txtTelphNo: {
                            minlength: 7,
                            maxlength: 15,
                            required: !0
                        },
                        txtFloor: {
                            minlength: 2,
                            required: !0
                        },
                        ddlCompanysize: {
                            required: !0
                        },
                        ddlNominalCap: {
                            required: !0
                        },
                        txtDealertype: {
                            required: !0
                        },
                       
                        txtFloor: {
                            minlength: 2,
                            required: !0
                        },
                        txtMaxbzVal: {
                            minlength: 4,
                            required: !0,
                            number:!0
                        },
                        txtCntPhoneno: {
                            minlength: 10,
                            required: !0
                        },
                        txtareaNatureofBz: {
                            minlength: 10,
                            maxlength:50,
                            required: !0
                        },

                        //custom validators
                        "payment[]": {
                            required: !0,
                            minlength: 1
                        }
                    },
                    //custom validator messages
                    messages: {
                        "payment[]": {
                            required: "Please accept our terms before you continue!",
                            minlength: jQuery.validator.format("Please accept our terms before you continue!")
                        }
                    },

                    errorPlacement: function(e, r) {
                        "gender" == r.attr("name") ? e.insertAfter("#form_gender_error") : "payment[]" == r.attr("name") ?
                        e.insertAfter("#form_payment_error") : e.insertAfter(r);
                    },
                    invalidHandler: function(e, r) {
                        i.hide(), t.show(), App.scrollTo(t, -200);
                    },
                    highlight: function(e) {
                        $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                    },
                    unhighlight: function(e) {
                        $(e).closest(".form-group").removeClass("has-error");
                    },
                    success: function(e) {
                        "gender" == e.attr("for") || "payment[]" == e.attr("for") ? (e.closest(".form-group").removeClass("has-error").addClass("has-success"), e.remove()) : e.addClass("valid").closest(".form-group").removeClass("has-error").addClass("has-success");
                    },
                    submitHandler: function(e) {
                        i.show(), t.hide(), e[0].submit();
                    }
                });
                $('#txtareaVision').bind("cut copy paste", function (e) {
                    e.preventDefault();
                    Swal.fire
                    ({
                        title: "Oops!!",
                        text: "No copy pasting!",
                        type: "error"
                    }).then(() => {
                        $("#lblCharleftTextarea1").css("color", "red");
                        $('#txtareaVision').css('border', "solid 2px red");
                        $("#lblCharleftTextarea1").html("You cannot paste into this textarea, sorry, you gonna have to type!");
                    });

                    $('#txtareaVision').bind("contextmenu", function (e) {
                        e.preventDefault();
                    });
                });

                $('#txtareaMision').bind("cut copy paste", function (e) {
                    e.preventDefault();
                    Swal.fire
                    ({
                        title: "Oops!!",
                        text: "No copy pasting!",
                        type: "error"
                    }).then(() => {
                        $("#lblCharleftTextarea2").css("color", "red");
                        $('#txtareaMision').css('border', "solid 2px red");
                        $("#lblCharleftTextarea2").html("You cannot paste into this textarea, sorry, you gonna have to type!");
                    });

                    $('#txtareaMision').bind("contextmenu", function (e) {
                        e.preventDefault();
                    });
                });

                $('#txtareaNatureofBz').bind("cut copy paste", function (e) {
                    e.preventDefault();
                    Swal.fire
                    ({
                        title: "Oops!!",
                        text: "No copy pasting!",
                        type: "error"
                    }).then(() => {
                        $("#lblCharleftTextarea3").css("color", "red");
                        $('#txtareaNatureofBz').css('border', "solid 2px red");
                        $("#lblCharleftTextarea3").html("You cannot paste into this textarea, sorry, you gonna have to type!");
                    });

                    $('#txtareaNatureofBz').bind("contextmenu", function (e) {
                        e.preventDefault();
                    });
                });


                var a = function() {
                        $("#tab4 .form-control-static", r).each(function() {
                            var e = $('[name="' + $(this).attr("data-display") + '"]', r);
                            if (e.is(":radio") && (e = $('[name="' + $(this).attr("data-display") + '"]:checked', r)), e.is(":text") || e.is("textarea")) $(this).html(e.val());
                            else if (e.is("select")) $(this).html(e.find("option:selected").text());
                            else if (e.is(":radio") && e.is(":checked")) $(this).html(e.attr("data-title"));
                            else if ("payment[]" == $(this).attr("data-display")) {
                                var t = [];
                                $('[name="payment[]"]:checked', r).each(function() {
                                    t.push($(this).attr("data-title"));
                                }), $(this).html(t.join("<br>"));
                            }
                        });
                    },
                    o = function(e, r, t) {
                        var i = r.find("li").length,
                            o = t + 1;
                        var p = "",
                            n = r.find("li");
                        $(".step-title", $("#form_wizard_2")).text("Step " + (t + 1) + " of " + i), jQuery("li", $("#form_wizard_2")).removeClass("done");

                        //steps code
                        for (n, s = 0; s < t; s++) { jQuery(n[s]).addClass("done"); p = $(n[s]).attr("id"); }
                       
                        //for debugging
                        console.log(p);
                        switch(p) {
                            case "li2":
                                $("#form_wizard_2").find(".button-next").hide(),
                                   // $("#form_wizard_2").find(".button-next").attr("disabled", "disabled");
                                $("#form_wizard_2").find(".button-interimsave").show();
                                break;
                            default:
                                $("#form_wizard_2").find(".button-interimsave").hide(),
                                $("#form_wizard_2").find(".button-next").show();
                                break;
                        }

                        1 == o? $("#form_wizard_2").find(".button-previous").hide(): $("#form_wizard_2").find(".button-previous").show(),
                        o >= i? ($("#form_wizard_2").find(".button-next").hide(),
                        $("#form_wizard_2").find(".button-submit").show(),

                        a()) : (
                      //  $("#form_wizard_2").find(".button-next").show(),
                        $("#form_wizard_2").find(".button-submit").hide()),
                        App.scrollTo($(".page-title"));
                    };
                $("#form_wizard_2").bootstrapWizard({
                        nextSelector: ".button-next",
                        interimSaveSelector: ".button-interimsave",
                        previousSelector: ".button-previous",
                        onTabClick: function(e, r, t, i) {
                            return !1;
                        },
                        onNext: function (e, a, n) {
                            return i.hide(), t.hide(), 0 != r.valid() && void o(e, a, n);
                        },
                        onInterim: function (e, a, n) {
                            return i.hide(), t.hide(), 0 != r.valid() && void o(e, a, n);
                        },
                        onPrevious: function(e, r, a) {
                            i.hide(), t.hide(), o(e, r, a);
                        },
                        onTabShow: function(e, r, t) {
                            var i = r.find("li").length,
                                a = t + 1,
                                o = a / i * 100;
                            $("#form_wizard_2").find(".progress-bar").css({
                                width: o + "%"
                            });
                        }
                    }),
                    $("#form_wizard_2").find(".button-previous").hide(),
                    $("#form_wizard_2 .button-interimsave").click(function () {
                        alert("Include data insert!)");

                        //Insert data 

                        //execute this after insert success
                        $("#form_wizard_2").find(".button-interimsave").hide(),
                        $("#form_wizard_2").find(".button-next").show(),
                        $("#form_wizard_2").find(".button-next").removeAttr("disabled");


                        //To prevent form submit after ajax call
                        event.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var vendormodel = {};

                        //var selHigh = document.getElementById("ddlhighestAcademicQlic");
                        //oneinputitem.highAcadlevel = selHigh.options[selHigh.selectedIndex].text;

                        //Set data to be sent
                        vendormodel.BusinessType = $("#ddlBusinesstype").val();;
                        vendormodel.VendorType = $("#ddlVendortype").val(); 
                        vendormodel.OwnerType = $("#ddlOwnershiptype").val(); 
                        vendormodel.IndustryGroup = $("#ddlIndustrygroup").val(); 
                        vendormodel.PostaCode = $("#ddlallpostacodes30").val();
                        vendormodel.CountryofOrigin = $("#ddlallcountries").val(); 
                        vendormodel.CompanySize = $("#ddlCompanysize").val(); 
                        vendormodel.NominalCap = $("#ddlNominalCap").val();
                        vendormodel.DealerType = $("#txtDealertype").val();

                        vendormodel.CertofIncorporation = $("#txtCertofIncorp").val();
                        vendormodel.OpsDate = $("#dtOps").val();
                        vendormodel.DateofIncorporation = $("#dtIncorp").val();
                        vendormodel.LanguageCode = $("#ddlLanguageCode").val();
                        vendormodel.Vision = $("#txtareaVision").val();
                        vendormodel.Mision = $("#txtareaMision").val();
                        vendormodel.PoBox = $("#txtPoBox").val();
                        vendormodel.PhysicalLocation = $("#txtLocation").val();
                        vendormodel.PostaCity = $("#txtCity").val();
                        vendormodel.WebUrl = $("#txtwebsiteurl").val();
                        vendormodel.TelephoneNo = $("#txtTelphNo").val();
                        vendormodel.HouseNo = $("#txtBuildNo").val();
                        vendormodel.FloorNo = $("#txtFloor").val();
                        vendormodel.PlotNo = $("#txtPlotNo").val();
                        vendormodel.StreetorRoad = $("#txtStreetroad").val();
                        vendormodel.Fax = $("#txtFaxNo").val();
                        vendormodel.MaxBizValue = $("#txtMaxbzVal").val();
                        vendormodel.MobileNo = $("#txtCntPhoneno").val();
                        vendormodel.NatureofBz = $("#txtareaNatureofBz").val();

                        $("#divCollecteddataTest").css("display", "block"),
                            $("#txtCollectedData").val('Collected Data : ' + JSON.stringify(vendormodel)),
                            console.log(JSON.stringify(vendormodel)),
                            console.log("Business Type for Test : "+$("#ddlBusinesstype option:selected").text());


                        //Swal.fire({
                        //    title: "Are you sure?",
                        //    text: "Are you sure you'd like to proceed with account creation?",
                        //    type: "warning",
                        //    showCancelButton: true,
                        //    closeOnConfirm: true,
                        //    confirmButtonText: "Yes, Create Account!",
                        //    confirmButtonClass: "btn-success",
                        //    confirmButtonColor: "#008000",
                        //    position: "center"
                        //}).then((result) => {
                        //    if (result.value) {
                        //        $.ajax({
                        //            url: "/Home/RegisterSupplier",
                        //            type: "POST",
                        //            data: '{vendormodel: ' + JSON.stringify(vendormodel) + '}',
                        //            // data: JSON.stringify(data),
                        //            dataType: "json",
                        //            contentType: "application/json"
                        //        }).done(function (status) {
                        //                switch (status) {
                        //                case "Your account created successfully!":
                        //                    Swal.fire
                        //                    ({
                        //                        title: "Account Created!",
                        //                        text: status,
                        //                        type: "success"
                        //                    }).then(() => {
                        //                        $("#regfeedback").css("display", "block");
                        //                        $("#regfeedback").css("color", "green");
                        //                        $('#regfeedback').addClass("alert alert-success");
                        //                        $("#regfeedback").html(status);
                        //                        window.location.href = "/Home/Homepage/";
                        //                    });
                        //                    break;

                        //                case "vendorEmpty":
                        //                    Swal.fire
                        //                    ({
                        //                        title: "Error!!!",
                        //                        text: "Registered Business name cannot be empty!",
                        //                        type: "error"
                        //                    }).then(() => {
                        //                        $("#regfeedback").css("display", "block");
                        //                        $("#regfeedback").css("color", "red");
                        //                        $('#regfeedback').attr('class', 'alert alert-danger');
                        //                        $("#regfeedback").html("Registered Business name cannot be empty!");
                        //                        $("#txtBusinessName").focus();
                        //                        $("#txtBusinessName").css("border", "solid 1px red");
                        //                    });
                        //                    break;

                        //                case "contactEmpty":
                        //                    Swal.fire
                        //                    ({
                        //                        title: "Error!!!",
                        //                        text: "Contact name cannot be empty!",
                        //                        type: "error"
                        //                    }).then(() => {
                        //                        $("#regfeedback").css("display", "block");
                        //                        $("#regfeedback").css("color", "red");
                        //                        $('#regfeedback').attr('class', 'alert alert-danger');
                        //                        $("#regfeedback").html("Contact name cannot be empty!");
                        //                        $("#txtContPerName").focus();
                        //                        $("#txtContPerName").css("border", "solid 1px red");
                        //                    });
                        //                    break;
                        //                case "EmailEmpty":
                        //                    Swal.fire
                        //                    ({
                        //                        title: "Error!!!",
                        //                        text: "Email Address cannot be empty!",
                        //                        type: "error"
                        //                    }).then(() => {
                        //                        $("#regfeedback").css("display", "block");
                        //                        $("#regfeedback").css("color", "red");
                        //                        $('#regfeedback').attr('class', 'alert alert-danger');
                        //                        $("#regfeedback").html("Email Address cannot be empty!");
                        //                        $("#txtEmailAddInd").focus();
                        //                        $("#txtEmailAddInd").css("border", "solid 1px red");
                        //                    });
                        //                    break;
                        //                case "KRAEmpty":
                        //                    Swal.fire
                        //                    ({
                        //                        title: "Error!!!",
                        //                        text: "KRA Pin cannot be empty!",
                        //                        type: "error"
                        //                    }).then(() => {
                        //                        $("#regfeedback").css("display", "block");
                        //                        $("#regfeedback").css("color", "red");
                        //                        $('#regfeedback').addClass('alert alert-danger');
                        //                        $("#regfeedback").html("KRA Pin cannot be empty!");
                        //                        $("#txtKRAPinInd").focus();
                        //                        $("#txtKRAPinInd").css("border", "solid 1px red");

                        //                    });
                        //                    break;

                        //                default:
                        //                    Swal.fire
                        //                    ({
                        //                        title: "Error!!!",
                        //                        text: status,
                        //                        type: "error"
                        //                    }).then(() => {
                        //                        $("#regfeedback").css("display", "block");
                        //                        $("#regfeedback").css("color", "red");
                        //                        $('#regfeedback').addClass('alert alert-danger');
                        //                        $("#regfeedback").html(status);
                        //                    });
                        //                    break;
                        //                }
                        //            }
                        //        );
                        //    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        //        Swal.fire(
                        //            'Cancelled',
                        //            'You cancelled your account creation!',
                        //            'error'
                        //        );
                        //    }
                        //});


                    }).hide(),
                    $("#form_wizard_2 .button-submit").click(function() {
                        //alert("Finished! Hope you like it :)")

                        //Insert data 



                    }).hide(),
                $("#country_list", r).change(function () {
                    r.validate().element($(this));
                });
            }
        }
    };
}();
jQuery(document).ready(function() {
    FormWizard.init();
});