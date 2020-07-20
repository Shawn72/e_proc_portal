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
        init: function () {
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
                    escapeMarkup: function (e) {
                        return e;
                    }
                });
                var r = $("#submit_tenderreg_form"),
                    t = $(".alert-danger", r),
                    i = $(".alert-success", r);
                r.validate({
                    doNotHideMessage: !0,
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    rules: {
                        txtAddress: {
                            required: !0
                        },
                      
                        txtAddress2: {
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
                            number: !0
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
                            maxlength: 3,
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

                        txtwebsiteurl: {
                            minlength: 5,
                            required: !0
                        },
                        txtMaxbzVal: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtCntPhoneno: {
                            minlength: 10,
                            required: !0
                        },
                        txtareaNatureofBz: {
                            minlength: 10,
                            maxlength: 50,
                            required: !0
                        },
                        txtPlotNo: {
                            minlength: 2,
                            required: !0
                        },

                        txtTotalcurrentassets: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtTotalfixedassets: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtTotalcurrentliability: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtTotalLongtermliability: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtTotalOwnerequity: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },



                        txtTotalRevenue: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtTotalOprXpens: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtTotalCoGs: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },

                        txtTotalOthernonOprexp: {
                            minlength: 4,
                            required: !0,
                            number: !0
                        },
                        txtInterestExpense: {
                            minlength: 4,
                            required: !0,
                            number: !0
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

                    errorPlacement: function (e, r) {
                        "gender" == r.attr("name") ? e.insertAfter("#form_gender_error") : "payment[]" == r.attr("name") ?
                            e.insertAfter("#form_payment_error") : e.insertAfter(r);
                    },
                    invalidHandler: function (e, r) {
                        i.hide(), t.show(), App.scrollTo(t, -200);
                    },
                    highlight: function (e) {
                        $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                    },
                    unhighlight: function (e) {
                        $(e).closest(".form-group").removeClass("has-error");
                    },
                    success: function (e) {
                        "gender" == e.attr("for") || "payment[]" == e.attr("for") ? (e.closest(".form-group").removeClass("has-error").addClass("has-success"), e.remove()) : e.addClass("valid").closest(".form-group").removeClass("has-error").addClass("has-success");
                    },
                    submitHandler: function (e) {
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


                var a = function () {
                        $("#tab4 .form-control-static", r).each(function () {
                            var e = $('[name="' + $(this).attr("data-display") + '"]', r);
                            if (e.is(":radio") && (e = $('[name="' + $(this).attr("data-display") + '"]:checked', r)), e.is(":text") || e.is("textarea")) $(this).html(e.val());
                            else if (e.is("select")) $(this).html(e.find("option:selected").text());
                            else if (e.is(":radio") && e.is(":checked")) $(this).html(e.attr("data-title"));
                            else if ("payment[]" == $(this).attr("data-display")) {
                                var t = [];
                                $('[name="payment[]"]:checked', r).each(function () {
                                    t.push($(this).attr("data-title"));
                                }), $(this).html(t.join("<br>"));
                            }
                        });
                    },
                    o = function (e, r, t) {
                        var i = r.find("li").length,
                            o = t + 1;
                        var p = "",
                            n = r.find("li");
                        $(".step-title", $("#form_wizard_tender")).text("Step " + (t + 1) + " of " + i), jQuery("li", $("#form_wizard_tender")).removeClass("done");

                        //steps code
                        for (n, s = 0; s < t; s++) { jQuery(n[s]).addClass("done"); p = $(n[s]).attr("id"); }

                        //for debugging
                        console.log(p);
                        switch (p) {
                        case "li1":
                            $("#regfeedback").css("display", "none");
                            break;
                        case "li2":
                            //$("#form_wizard_tender").find(".button-next").hide(),
                            //    $("#form_wizard_tender").find(".button-interimsave").show();
                            $("#regfeedback").css("display", "none");
                            break;
                        case "li3":
                            $("#regfeedback").css("display", "none");
                            break;
                        case "li4":
                            $("#regfeedback").css("display", "none");
                            break;
                        case "li5":
                            $("#regfeedback").css("display", "none");
                            break;
                        case "li6":
                            $("#regfeedback").css("display", "none");
                            break;
                        case "li7":
                            $("#regfeedback").css("display", "none");
                            break;
                        default:
                            $("#form_wizard_tender").find(".button-interimsave").hide(),
                                $("#form_wizard_tender").find(".button-next").show();
                            break;
                        }

                        1 == o ? $("#form_wizard_tender").find(".button-previous").hide() : $("#form_wizard_tender").find(".button-previous").show(),
                            o >= i ? ($("#form_wizard_tender").find(".button-next").hide(),
                                $("#form_wizard_tender").find(".button-submit").show(),

                                a()) : (
                                //  $("#form_wizard_tender").find(".button-next").show(),
                                $("#form_wizard_tender").find(".button-submit").hide()),
                            App.scrollTo($(".page-title"));
                    };
                $("#form_wizard_tender").bootstrapWizard({
                        nextSelector: ".button-next",
                        interimSaveSelector: ".button-interimsave",
                        previousSelector: ".button-previous",
                        onTabClick: function (e, r, t, i) {
                            return !1;
                        },
                        onNext: function (e, a, n) {
                            return i.hide(), t.hide(), 0 != r.valid() && void o(e, a, n);
                        },
                        onInterim: function (e, a, n) {
                            return i.hide(), t.hide(), 0 != r.valid() && void o(e, a, n);
                        },
                        onPrevious: function (e, r, a) {
                            i.hide(), t.hide(), o(e, r, a);
                        },
                        onTabShow: function (e, r, t) {
                            var i = r.find("li").length,
                                a = t + 1,
                                o = a / i * 100;
                            $("#form_wizard_tender").find(".progress-bar").css({
                                width: o + "%"
                            });
                        }
                    }),
                    $("#form_wizard_tender").find(".button-previous").hide(),
                    $("#form_wizard_tender .button-insert-agpo").click(function () {

                        alert("am being developed,...hang on!");
                        //Insert data 
                        //To prevent form submit after ajax call
                        event.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var agpomodel = {};

                        //input textfields
                        agpomodel.Certifcate_No = $("#txtAgpoCertNo").val();
                        agpomodel.Products_Service_Category = $("#txtProdservCat").val();
                        agpomodel.Vendor_Category = $("#ddlRegSpgrp").val();
                        agpomodel.Effective_Date = $("#dtagpoCEDt").val();
                        agpomodel.End_Date = $("#dtagpoCEXt").val();

                        ///for test, delete after the test passes


                        ///for test, delete after the test passes

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed with submission?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, save Special group!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddSpecialGroupEntry",
                                    type: "POST",
                                    data: '{agpomodel: ' + JSON.stringify(agpomodel) + '}',
                                    // data: JSON.stringify(data),
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Details Submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);

                                                //go back to first tab
                                                //$("#genTab").css("class", "active");
                                                //$("#specTab").removeClass("active");
                                                window.location.href = '/Home/Supplier_Registration_Form/';

                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstatus[1]);
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your submission!',
                                    'error'
                                );
                            }
                        });

                    }),
                    $("#form_wizard_tender .button-insert-balsheet").click(function () {
                        //Insert data 
                        //To prevent form submit after ajax call
                        event.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var financemodel = {};

                        //input textfields
                        financemodel.Year = $("#ddlYear").val();
                        financemodel.TotalCurrentAssets = $("#txtTotalcurrentassets").val();
                        financemodel.TotalFixedAssets = $("#txtTotalfixedassets").val();
                        financemodel.TotalCurrentLiabilty = $("#txtTotalcurrentliability").val();
                        financemodel.TotalLongTermLiability = $("#txtTotalLongtermliability").val();
                        financemodel.TotalOwnersEquity = $("#txtTotalOwnerequity").val();

                        ///for test, delete after the test passes

                        ///for test, delete after the test passes
                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed with submission?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, save balance sheet entry!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddBalanceSheetEntry",
                                    type: "POST",
                                    data: '{financemodel: ' + JSON.stringify(financemodel) + '}',
                                    // data: JSON.stringify(data),
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Details Submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);
                                                bs.init();
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstatus[1]);
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your submission!',
                                    'error'
                                );
                            }
                        });

                    }),
                    $("#form_wizard_tender .button-insert-savestaff").click(function () {
                        //To prevent form submit after ajax call
                        event.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var staffmodel = {};
                        //input textfields
                        staffmodel.StaffNumber = $("#txtStaffNo").val();
                        staffmodel.StaffName = $("#txtStaffName").val();
                        staffmodel.StaffProfession = $("#txtProfession").val();
                        staffmodel.StaffDesignation = $("#txtDesignation").val();
                        staffmodel.StaffDateofBirth = $("#dobStaff").val();
                        staffmodel.StaffJoiningDate = $("#dtJoining").val();
                        staffmodel.StaffYearswithfirm = $("#txtYrscount").val();
                        staffmodel.StaffPhonenumber = $("#txtStaffphonenumber").val();
                        staffmodel.StaffNationality = $("#ddlstaffcountries").val();
                        staffmodel.StaffEmail = $("#txtStaffEmail").val();

                        ///for test, delete after the test passes


                        ///for test, delete after the test passes

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed with submission?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, save staff entry!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajaxSetup({
                                    global: false,
                                    url: "/Home/AddStaffEntry",
                                    type: "POST",
                                    beforeSend: function () {
                                        $(".modalspinner").show();
                                    },
                                    complete: function () {
                                        $(".modalspinner").hide();
                                    }
                                });

                                $.ajax({
                                    data: '{staffmodel: ' + JSON.stringify(staffmodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Staff details submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);
                                                $("#pullupstaffXpr").css("display", "block");
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstatus[1]);
                                                $("#pullupstaffXpr").css("display", "none");
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your submission!',
                                    'error'
                                );
                            }
                        });

                    }),
                    $("#form_wizard_tender .button-insert-incomestates").click(function () {

                        //Insert data 
                        //To prevent form submit after ajax call
                        event.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var incomemodel = {};
                        //input textfields
                        incomemodel.YearI = $("#ddlYearI").val();
                        incomemodel.TotalRevenue = $("#txtTotalRevenue").val();
                        incomemodel.TotalCogs = $("#txtTotalCoGs").val();
                        incomemodel.TotalOpsExpense = $("#txtTotalOprXpens").val();
                        incomemodel.OtherNonOpsExpense = $("#txtTotalOthernonOprexp").val();
                        incomemodel.InterestExpense = $("#txtInterestExpense").val();

                        ///for test, delete after the test passes


                        ///for test, delete after the test passes

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed with submission?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, save income statement entry!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddIncomestatementEntry",
                                    type: "POST",
                                    data: '{incomemodel: ' + JSON.stringify(incomemodel) + '}',
                                    // data: JSON.stringify(data),
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Details Submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);
                                                incs.init();
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstatus[1]);
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your submission!',
                                    'error'
                                );
                            }
                        });

                    }),
                    $("#form_wizard_tender .button-interimsave").click(function () {

                        //Insert data 
                        event.preventDefault();
                        //reset to empty
                        $("#regfeedback").html("");
                        var vendormodel = {};
                        //dropdownlist
                        vendormodel.BusinessType = $("#ddlBusinesstype").val();
                        vendormodel.VendorType = $("#ddlVendortype").val();
                        vendormodel.OwnerType = $("#ddlOwnershiptype").val();
                        vendormodel.IndustryGroup = $("#ddlIndustrygroup").val();
                        vendormodel.PostaCode = $("#ddlallpostacodes30").val();
                        vendormodel.CountryofOrigin = $("#ddlallcountries").val();
                        vendormodel.CompanySize = $("#ddlCompanysize").val();
                        vendormodel.NominalCap = $("#ddlNominalCap").val();
                        vendormodel.DealerType = $("#txtDealertype").val();

                        //input textfields
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

                        //for test, delete after the test passes
                        //$("#form_wizard_tender").find(".button-interimsave").hide(),
                        //    $("#form_wizard_tender").find(".button-next").show(),
                        //    $("#form_wizard_tender").find(".button-next").removeAttr("disabled");

                        ////$("#divCollecteddataTest").css("display", "block"),
                        ////    $("#txtCollectedData").val('Collected Data : ' + JSON.stringify(vendormodel)),
                        ////    console.log(JSON.stringify(vendormodel)),
                        ////    console.log("Business Type for Test : " + $("#ddlBusinesstype option:selected").text());
                        //for test, delete after the test passes
                        console.log("dataSubmitted: " + JSON.stringify(vendormodel));

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed with Supplier Registration?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Register as a Supplier!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajaxSetup({
                                    global: false,
                                    url: "/Home/RegisterSupplier",
                                    type: "POST",
                                    beforeSend: function () {
                                        $(".modalspinner").show();
                                    },
                                    complete: function () {
                                        $(".modalspinner").hide();
                                    }
                                });
                                $.ajax({
                                    data: '{vendormodel: ' + JSON.stringify(vendormodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Details Submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);

                                                //execute this after insert success
                                                $("#form_wizard_tender").find(".button-interimsave").hide(),
                                                    $("#form_wizard_tender").find(".button-next").show(),
                                                    $("#form_wizard_tender").find(".button-next").removeAttr("disabled");

                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstatus[1]);
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your submission!',
                                    'error'
                                );
                            }
                        });

                    }).hide(),
                    $("#form_wizard_tender .button-submit").click(function () {

                        //Insert data 
                        event.preventDefault();
                        //reset to empty
                        $("#regfeedback").html("");

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed and finally submit your application?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Submit my application!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajaxSetup({
                                    global: false,
                                    url: "/Home/SubmitRegistration",
                                    type: "POST",
                                    beforeSend: function () {
                                        $(".modalspinner").show();
                                    },
                                    complete: function () {
                                        $(".modalspinner").hide();
                                    }
                                });
                                $.ajax({
                                    data: '',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Registration Submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);
                                                //go back to Dashboard
                                                window.location.href = "/Home/Index_EProc";
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstatus[1]);
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your submission!',
                                    'error'
                                );
                            }
                        });

                    }).hide();
            }
        }
    };
}();
var bs = function () {
    var e = function () {
        var tl = $("#tbl_balance_sheet"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        // targets: [0],
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                        // targets: [0]
                    }
                ],
                order: [
                    [0, "asc"]
                ],

                //stateSave: true,
                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });
        $.ajax({
            type: "POST",
            url: "/Home/VendorBalanceSheet",
            data: ""
        }).done(function (json) {
            // console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Audit_Year_Code_Reference,
                    json[i].Current_Assets_LCY,
                    json[i].Fixed_Assets_LCY,
                    json[i].Current_Liabilities_LCY,
                    json[i].Long_term_Liabilities_LCY,
                    json[i].Owners_Equity_LCY,
                    '<a class="trash" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
            e();
        }
    }

}();
var incs = function () {
    var e = function () {
        var tl = $("#tbl_income_statement"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        // targets: [0],
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                        // targets: [0]
                    }
                ],
                order: [
                    [0, "asc"]
                ],

                //stateSave: true,
                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });
        $.ajax({
            type: "POST",
            url: "/Home/VendorIncomeStatement",
            data: ""
        }).done(function (json) {
            // console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Audit_Year_Code_Reference,
                    json[i].Total_Revenue_LCY,
                    json[i].Total_COGS_LCY,
                    json[i].Total_Operating_Expenses_LCY,
                    json[i].Other_Non_operating_Re_Exp_LCY,
                    json[i].Interest_Expense_LCY,
                    '<a class="trash" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
            e();
        }
    }

}();
jQuery(document).ready(function () {
    FormWizard.init(), bs.init(), incs.init();
});