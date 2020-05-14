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
                var r = $("#submit_rfiresponse_form"),
                    t = $(".alert-danger", r),
                    i = $(".alert-success", r);
                r.validate({
                    doNotHideMessage: !0,
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    rules: {
                        txtVndRepName: {
                             minlength: 5,
                            required: !0
                        },
                        txtVendrepTitle: {
                            minlength: 5,
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
                        $(".step-title", $("#form_wizard_rfi")).text("Step " + (t + 1) + " of " + i),
                        jQuery("li", $("#form_wizard_rfi")).removeClass("done");

                        //steps code
                        for (n, s = 0; s < t; s++) {
                            jQuery(n[s]).addClass("done");
                            p = $(n[s]).attr("id");
                        }

                        //for debugging
                        console.log(p);
                        switch (p) {
                        case "":
                            $(".button-backto-ifplists").show();
                            $("#form_wizard_rfi").find(".button-next").show(),
                            $("#form_wizard_rfi").find(".button-interimsave").hide();
                            break;
                        case "li0":
                            $("#regfeedback").css("display", "none");
                            $("#form_wizard_rfi").find(".button-next").show(),
                            $(".button-backto-ifplists").hide();
                            break;
                        case "li1":
                            $("#form_wizard_rfi").find(".button-next").hide(),
                            $("#regfeedback").css("display", "none");
                            $(".button-backto-ifplists").hide();
                            break;
                        default:
                            $("#form_wizard_rfi").find(".button-next").show();
                            $(".button-backto-ifplists").show();
                            break;
                        }

                        1 == o ? $("#form_wizard_rfi").find(".button-previous").hide() : $("#form_wizard_rfi").find(".button-previous").show(),
                            o >= i ? ($("#form_wizard_rfi").find(".button-next").hide(),
                                $("#form_wizard_rfi").find(".button-submit").show(),

                                a()) : (
                                $("#form_wizard_rfi").find(".button-submit").hide()),
                                App.scrollTo($(".page-title"));
                    };
                $("#form_wizard_rfi").bootstrapWizard({
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
                            $("#form_wizard_rfi").find(".progress-bar").css({
                                width: o + "%"
                            });
                        }
                    }),
                    $("#form_wizard_rfi").find(".button-previous").hide(),
                    $("#form_wizard_rfi .button-submit").click(function () {
                        event.preventDefault();
                        //reset to empty
                        $("#regfeedback").html("");

                        var rfimodel = {};
                        //input textfields
                        rfimodel.RepFullName = $("#txtVndRepName").val();
                        rfimodel.RepDesignation = $("#txtVendrepTitle").val();
                        rfimodel.RfiDocumentNo = $("#txtIfpNo").val();
                        rfimodel.RfiDocApplicationNo = $("#txtIfApplicationNo").val();
                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed and finally submit your RFI response?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yeah, Submit my response!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajaxSetup({
                                    global: false,
                                    url: "/Home/SubmitRfiResponse",
                                    type: "POST",
                                    beforeSend: function () {
                                        $(".modalspinner").show();
                                    },
                                    complete: function () {
                                        $(".modalspinner").hide();
                                    }
                                });
                                $.ajax({
                                    data: '{rfimodel: ' + JSON.stringify(rfimodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Response Submitted!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                //$("#regfeedback").css("display", "block");
                                                //$("#regfeedback").css("color", "green");
                                                //$('#regfeedback').addClass("alert alert-success");
                                                //$("#regfeedback").html(splitstatus[1]);

                                                App.alert({
                                                    container: "#respfeedback_alert",
                                                    place: "append",
                                                    type: "success",
                                                    message: splitstatus[1],
                                                    close: true,
                                                    reset: true,
                                                    focus: true,
                                                    closeInSeconds: 5,
                                                    icon: "check"
                                                });

                                                //go back to Dashboard
                                                //window.location.href = "/Home/Index_EProc";
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                //$("#regfeedback").css("display", "block");
                                                //$("#regfeedback").css("color", "red");
                                                //$('#regfeedback').addClass('alert alert-danger');
                                                //$("#regfeedback").html(splitstatus[1]);


                                                App.alert({
                                                    container: "#respfeedback_alert",
                                                    place: "append",
                                                    type: "danger",
                                                    message: splitstatus[1],
                                                    close: true,
                                                    reset: true,
                                                    focus: true,
                                                    closeInSeconds: 5,
                                                    icon: "warning"
                                                });

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
jQuery(document).ready(function () {
    FormWizard.init(), bs.init(), incs.init();
});