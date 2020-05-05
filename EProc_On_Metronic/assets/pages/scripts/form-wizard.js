var FormWizard = function() {
    return {
        init: function() {
            function e(e) {
                return e.id ? "<img class='flag' src='/assets/global/img/flags/" + e.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + e.text : e.text
            }
            if (jQuery().bootstrapWizard) {
                $("#country_list").select2({
                    placeholder: "Select",
                    allowClear: !0,
                    formatResult: e,
                    width: "auto",
                    formatSelection: e,
                    escapeMarkup: function(e) {
                        return e
                    }
                });
                var r = $("#submit_form"),
                    t = $(".alert-danger", r),
                    i = $(".alert-success", r);
                r.validate({
                    doNotHideMessage: !0,
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    rules: {
                        txtContPerName: {
                            minlength: 5,
                            required: !0
                        },
                        txtPass1Ind: {
                            minlength: 5,
                            required: !0
                        },
                        txtPass2Ind: {
                            minlength: 5,
                            required: !0,
                            equalTo: "#txtPass1Ind"
                        },
                        txtBusinessName: {
                            minlength: 3,
                            required: !0
                        },
                        txtVendorLName: {
                            minlength: 3,
                            required: !0
                        },

                        txtEmailAddInd: {
                            required: !0,
                            txtEmailAddInd: !0
                        },
                        txtPhonenumberInd: {
                            required: !0
                        },
                        txtKRAPinInd: {
                            minlength: 3,
                            required: !0

                        },
                        txtIDNoInd: {
                            minlength: 3,
                            required: !0
                        },
                        city: {
                            required: !0
                        },
                        country: {
                            required: !0
                        },
                        card_name: {
                            required: !0
                        },
                        card_number: {
                            minlength: 16,
                            maxlength: 16,
                            required: !0
                        },
                        card_cvc: {
                            digits: !0,
                            required: !0,
                            minlength: 3,
                            maxlength: 4
                        },
                        card_expiry_date: {
                            required: !0
                        },
                        "payment[]": {
                            required: !0,
                            minlength: 1
                        }
                    },
                    messages: {
                        "payment[]": {
                            required: "Please accept our terms before you continue!",
                            minlength: jQuery.validator.format("Please accept our terms before you continue!")
                        }
                    },
                    errorPlacement: function(e, r) {
                        "gender" == r.attr("name") ? e.insertAfter("#form_gender_error") : "payment[]" == r.attr("name") ? e.insertAfter("#form_payment_error") : e.insertAfter(r)
                    },
                    invalidHandler: function(e, r) {
                        i.hide(), t.show(), App.scrollTo(t, -200)
                    },
                    highlight: function(e) {
                        $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
                    },
                    unhighlight: function(e) {
                        $(e).closest(".form-group").removeClass("has-error")
                    },
                    success: function(e) {
                        "gender" == e.attr("for") || "payment[]" == e.attr("for") ? (e.closest(".form-group").removeClass("has-error").addClass("has-success"), e.remove()) : e.addClass("valid").closest(".form-group").removeClass("has-error").addClass("has-success")
                    },
                    submitHandler: function(e) {
                        i.show(), t.hide(), e[0].submit()
                    }
                });
                var a = function() {
                        $("#tab3 .form-control-static", r).each(function() {
                            var e = $('[name="' + $(this).attr("data-display") + '"]', r);
                            if (e.is(":radio") && (e = $('[name="' + $(this).attr("data-display") + '"]:checked', r)), e.is(":text") || e.is("textarea")) $(this).html(e.val());
                            else if (e.is("select")) $(this).html(e.find("option:selected").text());
                            else if (e.is(":radio") && e.is(":checked")) $(this).html(e.attr("data-title"));
                            else if ("payment[]" == $(this).attr("data-display")) {
                                var t = [];
                                $('[name="payment[]"]:checked', r).each(function() {
                                    t.push($(this).attr("data-title"))
                                }), $(this).html(t.join("<br>"))
                            }
                        })
                    },
                    o = function(e, r, t) {
                        var i = r.find("li").length,
                            o = t + 1;
                        $(".step-title", $("#form_wizard_1")).text("Step " + (t + 1) + " of " + i), jQuery("li", $("#form_wizard_1")).removeClass("done");
                        for (var n = r.find("li"), s = 0; s < t; s++) jQuery(n[s]).addClass("done");
                        1 == o ? $("#form_wizard_1").find(".button-previous").hide() : $("#form_wizard_1").find(".button-previous").show(), o >= i ? ($("#form_wizard_1").find(".button-next").hide(), $("#form_wizard_1").find(".button-submit").show(), a()) : ($("#form_wizard_1").find(".button-next").show(), $("#form_wizard_1").find(".button-submit").hide()), App.scrollTo($(".page-title"))
                    };
                $("#form_wizard_1").bootstrapWizard({
                        nextSelector: ".button-next",
                        previousSelector: ".button-previous",
                        onTabClick: function(e, r, t, i) {
                            return !1
                        },
                        onNext: function(e, a, n) {
                            return i.hide(), t.hide(), 0 != r.valid() && void o(e, a, n)
                        },
                        onPrevious: function(e, r, a) {
                            i.hide(), t.hide(), o(e, r, a)
                        },
                        onTabShow: function(e, r, t) {
                            var i = r.find("li").length,
                                a = t + 1,
                                o = a / i * 100;
                            $("#form_wizard_1").find(".progress-bar").css({
                                width: o + "%"
                            })
                        }
                    }),
                    $("#form_wizard_1").find(".button-previous").hide(),
                    $("#form_wizard_1 .button-submit").click(function() {
                        $("#regfavicon").removeClass("fas fa fa-check");

                       // $("#regfavicon").addClass("fa fa-spinner fa-spin");
                        $('.button-submit').text("Please wait...");
                        $('.button-submit').css("width", "200px");
                        $('.button-submit').attr("disabled", "disabled");
                        $('#regfavicon').attr("class", "fa fa-spinner fa-spin");

                        //To prevent form submit after ajax call
                        event.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var signupmodel = {};
                        //Set data to be sent
                        signupmodel.VendorName = $("#txtBusinessName").val();
                        signupmodel.Phonenumber = $("#txtPhonenumberInd").val();
                        signupmodel.KraPin = $("#txtKRAPinInd").val();
                        signupmodel.ContactName = $("#txtContPerName").val();
                        signupmodel.Email = $("#txtEmailAddInd").val();

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed with account creation?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Create Account!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajaxSetup({
                                    global: false,
                                    url: "/Home/SupplierRegReq",
                                    type: "POST",
                                    beforeSend: function () {
                                        $(".modalspinner").show();
                                    },
                                    complete: function () {
                                        $(".modalspinner").hide();
                                    }
                                });

                                $.ajax({
                                    data: '{signupmodel: ' + JSON.stringify(signupmodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstat = status.split('*');
                                        switch (splitstat[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Account Created!",
                                                text: splitstat[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstat[1]);
                                                $("#regfavicon").removeClass("fa fa-spinner fa-spin");
                                                $("#regfavicon").addClass("fas fa fa-check");
                                                $('.button-submit').text("Submit Request");
                                                window.location.href = "/Home/Homepage/";
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstat[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "red");
                                                $('#regfeedback').addClass('alert alert-danger');
                                                $("#regfeedback").html(splitstat[1]);

                                                $("#regfavicon").removeClass("fa fa-spinner fa-spin");
                                                $("#regfavicon").addClass("fas fa fa-check");
                                                $('.button-submit').text("Submit Request");
                                                $('.button-submit').removeAttr("disabled");
                                            });
                                            break;
                                        }
                                    }
                                );
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire(
                                    'Cancelled',
                                    'You cancelled your account creation!',
                                    'error'
                                );
                            }
                        });
                  }).hide();
            }
        }
    }
}();
jQuery(document).ready(function() {
    FormWizard.init();
});