'use-strict';
var FormWizard_rfi = function () {
    return {
        init: function () {
            function e(e) {
                return e.id ? "<img class='flag' src='/assets/global/img/flags/" + e.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + e.text : e.text;
            }
            if (jQuery().bootstrapWizard) {
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
                            $("#form_wizard_rfi").find(".button-next-rfi").show(),
                            $("#form_wizard_rfi").find(".button-interimsave-rfi").hide();
                            break;
                        case "li0":
                            $("#regfeedback").css("display", "none");
                            $("#form_wizard_rfi").find(".button-next-rfi").show(),
                            $(".button-backto-ifplists").hide();
                            break;
                        case "li1":
                            $("#form_wizard_rfi").find(".button-next-rfi").hide(),
                            $("#regfeedback").css("display", "none");
                            $(".button-backto-ifplists").hide();
                            break;
                        default:
                            $("#form_wizard_rfi").find(".button-next-rfi").show();
                            $(".button-backto-ifplists").show();
                            break;
                        }

                        1 == o ? $("#form_wizard_rfi").find(".button-previous-rfi").hide() : $("#form_wizard_rfi").find(".button-previous-rfi").show(),
                            o >= i ? ($("#form_wizard_rfi").find(".button-next-rfi").hide(),
                                $("#form_wizard_rfi").find(".button-submit-rfi").show(),

                                a()) : (
                                $("#form_wizard_rfi").find(".button-submit-rfi").hide()),
                                App.scrollTo($(".page-title"));
                    };
                    $("#form_wizard_rfi").bootstrapWizard({
                        nextSelector: ".button-next-rfi",
                            interimSaveSelector: ".button-interimsave-rfi",
                            previousSelector: ".button-previous-rfi",
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
                    $("#form_wizard_rfi").find(".button-previous-rfi").hide(),
                    $("#form_wizard_rfi .button-submit-rfi").click(function () {
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
                                                //go back to RFI lists
                                                window.location.href = "/Home/RfiResponseForm";
                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
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
                                        //go back to RFI lists
                                        window.location.href = "/Home/RfiResponseForm";
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
                    $("#ddldocumentdroplist_rfi").change(function () {
                        var selectedVal = $('#ddldocumentdroplist_rfi').find(":selected").attr('value');
                        $('#pullUpfileselector_rfi').css("display", "block");
                        switch (selectedVal) {
                        case "":
                            Swal.fire
                            ({
                                title: "Wrong Choice",
                                text: "Kindly select kind of Doc to upload!",
                                type: "error"
                            }).then(() => {

                                App.alert({
                                    container: "#docs_feedback_alert",
                                    place: "append",
                                    type: "danger",
                                    message: "Kindly select kind of Doc to upload!",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 5,
                                    icon: "warning"
                                });

                                $("#pullUpfileselector_rfi").css("display", "none");
                            });
                            break;
                        default:
                            $("#pullUpfileselector_rfi").css("display", "block");
                            break;
                        }
                    });
            }
        }
    };
}();
var rfidocs = function () {
        var a = $("#tbl_mandatory_docs_rfiapp"),
            l = a.dataTable({
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"]
                ],
                pageLength: 5,
                language: {
                    lengthMenu: " _MENU_ records"
                },
                columnDefs: [
                    {
                        orderable: !0,
                        targets: [0]
                    }, {
                        searchable: !0,
                        targets: [0]
                    }
                ],
                order: [
                    [0, "asc"]
                ]
            });
    
    return {
        init: function () {
            rfidocs();
        }
    }
}();
jQuery(document).ready(function () {
    FormWizard_rfi.init(), bs.init(), incs.init();
});