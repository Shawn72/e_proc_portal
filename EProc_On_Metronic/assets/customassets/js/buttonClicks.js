'use-strict';
$(document).ready(function () {
    $('.pass_show').append('<span class="ptxt">Show</span>');
    $(document).on('click', '.pass_show .ptxt', function () {

        $(this).text($(this).text() == "Show" ? "Hide" : "Show");

        $(this).prev().attr('type', function (index, attr) { return attr == 'password' ? 'text' : 'password'; });
       
    });

    $("#btnCreateIndAccount").on("click", function (e) {
        e.preventDefault();
        window.location.href = '/Home/SignupIndividual';
    });

    $("#btnCreateCorpAccount").on("click", function (e) {
        e.preventDefault();
        window.location.href = '/Home/SignupCorporate';
    });

    $('#btnLogin').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#loginMsg").html("");
        //Set data to be sent
        var data = {
            "myUserId": $("#venderid_number").val(),
            "myPassword": $("#vendor_password").val()
        }
        var logontype = $("#txtlogintype").val();
        $.ajaxSetup({
            global: false,
            url: "/Home/CheckLogin",
            type: "POST",
            beforeSend: function () {
                $(".modalspinner").show();
                $(".gifLoading").css("display", "block");
                document.getElementById("btnLogin").disabled = true;
            },
            complete: function () {
                $(".modalspinner").hide();
                $(".gifLoading").css("display", "none");
                document.getElementById("btnLogin").disabled = false;
            }
        });
        $.ajax({
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"
        }).done(function (status) {
            switch (status) {
            case "InvalidLogin":
                Swal.fire
                ({
                    title: "Error!!!",
                    text: "Invalid account details!",
                    type: "error"
                }).then(() => {
                    $("#loginMsg").css("display", "block");
                    $("#loginMsg").css("color", "red");
                    $('#loginMsg').attr('class', 'alert alert-danger');
                    $("#loginMsg").html("Invalid account details!");
                    document.getElementById("btnLogin").disabled = false;
                });
                break;

            case "UsernameEmpty":
                Swal.fire
                ({
                    title: "Error!!!",
                    text: "Username field is empty, fill it first!",
                    type: "error"
                }).then(() => {
                    $("#loginMsg").css("display", "block");
                    $("#loginMsg").css("color", "red");
                    $('#loginMsg').attr('class', 'alert alert-danger');
                    $("#loginMsg").html("Username field is empty, fill it first!");
                    $("#venderid_number").focus();
                    $("#venderid_number").css("border", "solid 1px red");
                    document.getElementById("btnLogin").disabled = false;
                });
                break;
            case "PasswordEmpty":
                Swal.fire
                ({
                    title: "Error!!!",
                    text: "Password field is empty, fill it first!",
                    type: "error"
                }).then(() => {
                    $("#loginMsg").css("display", "block");
                    $("#loginMsg").css("color", "red");
                    $('#loginMsg').attr('class', 'alert alert-danger');
                    $("#loginMsg").html("Password field is empty, fill it first!");
                    $("#vendor_password").focus();
                    $("#vendor_password").css("border", "solid 1px red");
                    document.getElementById("btnLogin").disabled = false;
                });
                break;

            case "PasswordMismatched":
                Swal.fire
                ({
                    title: "Error!!!",
                    text: "Wrong Password!",
                    type: "error"
                }).then(() => {
                    $("#loginMsg").css("display", "block");
                    $("#loginMsg").css("color", "red");
                    $('#loginMsg').attr('class', 'alert alert-danger');
                    $("#loginMsg").html("Wrong Password!");
                    $("#vendor_password").focus();
                    $("#vendor_password").css("border", "solid 1px red");
                    document.getElementById("btnLogin").disabled = false;
                });
                break;

              case "accountdeactivated":
                Swal.fire
                ({
                    title: "Error!!!",
                    text: "Account Deactivated!",
                    type: "error"
                }).then(() => {
                    $("#loginMsg").css("display", "block");
                    $("#loginMsg").css("color", "red");
                    $('#loginMsg').attr('class', 'alert alert-danger');
                    $("#loginMsg").html("Your Account is Deactivated!");
                    $("#vendor_password").focus();
                    $("#vendor_password").css("border", "solid 1px red");
                    document.getElementById("btnLogin").disabled = false;
                });
                break;

            case "Loginuser":
                //now login admin
                document.getElementById("btnLogin").disabled = true;
                    switch (logontype) {
                    case "eprocurement":
                        window.location.href = '/Home/Index_Eproc';
                        break;
                    case "ebid":
                        window.location.href = '/Home/Index_EBid';
                        break;
                    default:
                        window.location.href = '/Home/Index_Eproc';
                        break;
                }
                document.getElementById("btnLogin").disabled = true;
                console.log(logontype);
                break;

            default:
                Swal.fire
                ({
                    title: "Error!!!",
                    text: "Error Encountered!",
                    type: "error"
                }).then(() => {
                    $("#loginMsg").css("display", "block");
                    $("#loginMsg").css("color", "red");
                    $('#loginMsg').attr('class', 'alert alert-danger');
                    $("#loginMsg").html(status);
                    document.getElementById("btnLogin").disabled = false;
                });
                break;
            }
        });

    });

    $('#btnApplyPreQ').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#feedbackMsg").html("");
        var krapin = document.getElementById('inputFileKra').files[0];
        var certfreg = document.getElementById('inputFileCertofReg').files[0];
        var cbq = document.getElementById('inputFileCBQ').files[0];
        var txcomply = document.getElementById('inputFileTxComply').files[0];

        var formDt = new FormData();
        //formDt.append("selectedfyear", $("#ddlfiscalyear").find(":selected").attr('value'));
        formDt.append("selectedcategory", $("#ddlallsuppliercats").find(":selected").attr('value'));
        formDt.append("krapinFile", krapin);
        formDt.append("cbqFile", cbq);
        formDt.append("certofRegFile", certfreg);
        formDt.append("taxcomplyFile", txcomply);

        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you'd like to proceed with submission?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, submit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/ApplyforPreQualifc",
                    type: "POST",
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData: false
                }).done(function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "Your registration for prequalification has been received!":
                            Swal.fire
                            ({
                                title: "Submitted!",
                                text: status,
                                type: "success"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "green");
                                $('#feedbackMsg').attr("class","alert alert-success");
                                $("#feedbackMsg").html(status);
                                $("#uploadsMsg").css("display", "block");
                                $("#uploadsMsg").css("color", "green");
                                $("#uploadsMsg").html(uploadsfs[1]);
                                $("#preqappl_form").reset();
                            });
                           
                            break;

                        case "KRApinnull":
                            Swal.fire
                            ({
                                title: "KRA Pin Null!",
                                text: "KRA Pin file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("KRA Pin file cannot be empty!");
                                $("#inputFileKra").focus();
                                $("#inputFileKra").css("border", "solid 1px red");
                            });
                            break;

                        case "cbqFilenull":
                            Swal.fire
                            ({
                                title: "Confidential Business Questionnare Null!",
                                text: "Confidential Business Questionnare cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Confidential Business Questionnare  file cannot be empty!");
                                $("#inputFileCBQ").focus();
                                $("#inputFileCBQ").css("border", "solid 1px red");
                            });
                            break;

                        case "certofRegFilenull":
                            Swal.fire
                            ({
                                title: "Certificate of Registration Null!",
                                text: "Certificate of Registrationfile cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Certificate of Registration file cannot be empty!");
                                $("#inputFileCertofReg").focus();
                                $("#inputFileCertofReg").css("border", "solid 1px red");
                            });
                            break;

                        case "taxcomplyFilenull":
                            Swal.fire
                            ({
                                title: "Tax Compliance Cert Null!",
                                text: "Tax Compliance Cert file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Tax Compliance Certfile cannot be empty!");
                                $("#inputFileCertofReg").focus();
                                $("#inputFileCertofReg").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html(status);
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
    });

    $('#btnUploadDocs').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#uploadsMsg").html("");
        var krapin = document.getElementById('inputFileKraUplds').files[0];
        var certfreg = document.getElementById('inputFileCertofRegUplds').files[0];
        var cbq = document.getElementById('inputFileCBQUplds').files[0];
        var txcomply = document.getElementById('inputFileTxComplyUplds').files[0];

        var formDt = new FormData();
        formDt.append("krapinFile", krapin);
        formDt.append("cbqFile", cbq);
        formDt.append("certofRegFile", certfreg);
        formDt.append("taxcomplyFile", txcomply);

        Swal.fire({
            title: "Upload Documents?",
            text: "Proceed to upload all the selected documents once?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Upload!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/FnUploadAllDocs",
                    type: "POST",
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData: false
                }).done(function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Files Uploaded!",
                                text: "All Selected Files Uploaded Successfully!",
                                type: "success"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "green");
                                $('#feedbackMsg').attr("class", "alert alert-success");
                                $("#feedbackMsg").html("All Selected Files Uploaded Successfully!");
                                $("#uploadsMsg").css("display", "block");
                                $("#uploadsMsg").css("color", "green");
                                $("#uploadsMsg").html(uploadsfs[1]);
                                $("#upld_form").reset();
                            });

                            break;

                        case "KRApinnull":
                            Swal.fire
                            ({
                                title: "KRA Pin Null!",
                                text: "KRA Pin file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("KRA Pin file cannot be empty!");
                                $("#inputFileKraUplds").focus();
                                $("#inputFileKraUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "cbqFilenull":
                            Swal.fire
                            ({
                                title: "Confidential Business Questionnare Null!",
                                text: "Confidential Business Questionnare cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Confidential Business Questionnare  file cannot be empty!");
                                $("#inputFileCBQUplds").focus();
                                $("#inputFileCBQUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "certofRegFilenull":
                            Swal.fire
                            ({
                                title: "Certificate of Registration Null!",
                                text: "Certificate of Registrationfile cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Certificate of Registration file cannot be empty!");
                                $("#inputFileCertofRegUplds").focus();
                                $("#inputFileCertofRegUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "taxcomplyFilenull":
                            Swal.fire
                            ({
                                title: "Tax Compliance Cert Null!",
                                text: "Tax Compliance Cert file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Tax Compliance Certfile cannot be empty!");
                                $("#inputFileCertofRegUplds").focus();
                                $("#inputFileCertofRegUplds").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html(status);
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
    });

    $("body").delegate("#openRfQs .btnDownloadRfq", "click", function (event) {

        event.preventDefault();
        //reset to empty
        $("#openRfqId").html("");
        $("#downloadfavicon").addClass("fa fa-spinner fa-spin");
        $("#downloadfavicon").removeClass("fas fa-cloud-download-alt");
       
        //Set data to be sent    
        var data = {"rfqnumber": $(this).attr("rfqNo")}
        $.ajax({
            url: "/Home/RfQDocument",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"
        }).done(function (status) {
            var splitstatus = status.split("*");

            switch (splitstatus[0]) {
                case "filedownloadsuccess":
                    $("#openRfqId").css("display", "block");
                    $("#openRfqId").css("color", "green");
                    $("#openRfqId").html("RFQ Generated successfully, Click Download RfQ button!");
                    $('#openRfqId').attr('class', 'alert alert-success');
                    
                    $("#downloadfavicon").removeClass("fa fa-spinner fa-spin");
                    $("#downloadfavicon").addClass("fas fa-cloud-download-alt");
                    $(".btnGetrfq").css("display", "block");
                    $(".btnDownloadRfq").css("display", "none");
                    $(".btnGetrfq").attr("dwldfilepath", splitstatus[1]);
                    break;
                case "downloaderror":
                    Swal.fire
                    ({
                        title: "RFQ Generation Error!",
                        text: "Error downloading the RfQ Document, contact the office!",
                        type: "error"
                    }).then(() => {
                        $("#openRfqId").css("display", "block");
                        $("#openRfqId").css("color", "red");
                        $('#openRfqId').attr('class', 'alert alert-danger');
                        $("#openRfqId").html("Error downloading the RfQ Document, contact the office!");
                        $("#downloadfavicon").removeClass("fa fa-spinner fa-spin");
                        $("#downloadfavicon").addClass("fas fa-cloud-download-alt");
                    });
                    break;
                default:
                    Swal.fire
                    ({
                        title: "RFQ Exception Error!",
                        text: "Exception Error thrown! contact the developer to handle this!",
                        type: "error"
                    }).then(() => {
                        $("#openRfqId").css("display", "block");
                        $("#openRfqId").css("color", "red");
                        $('#openRfqId').attr('class', 'alert alert-danger');
                        $("#openRfqId").html(status);
                        $("#downloadfavicon").removeClass("fa fa-spinner fa-spin");
                        $("#downloadfavicon").addClass("fas fa-cloud-download-alt");
                    });
                    break;
                }
        });
    });

    $("body").delegate("#openRfQs .btnGetrfq","click", function(event) {
            event.preventDefault();
            //reset to empty
            $("#openRfqId").html("");
            $("#downloadfavicondld").addClass("fas fa-spinner fa-spin");
            $("#downloadfavicondld").removeClass("fa fa-download");
            //Set data to be sent    
            var filePath = $(this).attr("dwldfilepath");
            window.location.href = "/Home/DownloadFile?filepath=" + filePath;
            $("#downloadfavicondld").removeClass("fas fa-spinner fa-spin");
            $("#downloadfavicondld").addClass("fa fa-download");
    });

    $("body").delegate("#openRfQs .btnGoApply", "click", function (event) {
        event.preventDefault();
        //reset to empty
        $("#openRfqId").html("");
        $("#applyfavicondld").addClass("fas fa-spinner fa-spin");
        $("#applyfavicondld").removeClass("fa fa-edit");
        //Set data to be sent    
        var descr = $(this).attr("theRfQtitle");
        var rfqnno = $(this).attr("theRfQNo");
        window.location.href = "/Home/ApplyforOpenRfQ?descrptn=" + descr + "&&reqno=" + rfqnno;
        $("#applyfavicondld").removeClass("fas fa-spinner fa-spin");
        $("#applyfavicondld").addClass("fa fa-edit");
    });
    
    $("#btnPullphoto").on("click", function (e) {
        e.preventDefault();
        $("#inputPhoto").trigger("click");
    });

    $('#inputPhoto').change(function () {
     
        $.ajax({
            url: "/Home/UploadPhoto",
            type: "POST",
            data: new FormData($('#img_form')[0]),
            contentType: false,
            cache: false,
            processData: false
        }).done(function(status) {
            switch (status) {
            case "changedsuccess":
                Swal.fire
                ({
                    title: "Photo Changed!",
                    text: "Your photo changed successfully!",
                    type: "success"
                }).then(() => {
                    window.location.href = "/Home/Index";
                    location.reload(true);
                    $("#profilefeedback").css("color", "green");
                    $('#profilefeedback').attr("class", "alert alert-success");
                    $("#profilefeedback").html("Your photo changed successfully!");
                });
                break;

            case "nullinputerror":
                Swal.fire
                ({
                    title: "Error!",
                    text: "You have to select file first!",
                    type: "error"
                }).then(() => {
                    $("#profilefeedback").css("color", "red");
                    $('#profilefeedback').attr("class", "alert alert-danger");
                    $("#profilefeedback").html("You have to select file first!");
                });
                break;
            case "unacceptableextension":
                Swal.fire
                ({
                    title: "File Extension Error!",
                    text: "File extension not allowed, ONLY PNG or JPEG!",
                    type: "error"
                }).then(() => {
                    $("#profilefeedback").css("color", "red");
                    $('#profilefeedback').attr("class", "alert alert-danger");
                    $("#profilefeedback").html("File extension not allowed, ONLY PNG or JPEG!");
                });
                break;
            default:
                Swal.fire
                ({
                    title: "Error!",
                    text: "Error Occured!",
                    type: "error"
                }).then(() => {
                    $("#profilefeedback").css("color", "red");
                    $('#profilefeedback').attr("class", "alert alert-danger");
                    $("#profilefeedback").html(status);
                });
                break;
            }
        });

    });

    $('#btnApplyRfQ').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#uploadsMsg").html("");
        var rfqNumber = $("#inputRfqNumber").val();
        var rfqDoc = document.getElementById('inputFileRfQdoc').files[0];
        var krapin = document.getElementById('inputFileKra').files[0];
        var certfreg = document.getElementById('inputFileCertofReg').files[0];
        var cbq = document.getElementById('inputFileCBQ').files[0];
        var txcomply = document.getElementById('inputFileTxComply').files[0];

        var formDt = new FormData();
        formDt.append("krapinFile", krapin);
        formDt.append("cbqFile", cbq);
        formDt.append("certofRegFile", certfreg);
        formDt.append("taxcomplyFile", txcomply);
        formDt.append("myrfqnumber", rfqNumber);
        formDt.append("myrfqdoc", rfqDoc);


        Swal.fire({
            title: "Upload Documents?",
            text: "Proceed to upload all the selected documents once?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Upload!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/FnUploadSpecRfQDocs",
                    type: "POST",
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData: false
                }).done(function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Files Uploaded!",
                                text: "All Selected Files Uploaded Successfully!",
                                type: "success"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "green");
                                $('#feedbackMsg').attr("class", "alert alert-success");
                                $("#feedbackMsg").html("All Selected Files Uploaded Successfully & Your RfQ application submitted!");
                                $("#uploadsMsg").css("display", "block");
                                $("#uploadsMsg").css("color", "green");
                                $("#uploadsMsg").html(uploadsfs[1]);
                                $("#upld_form").reset();
                            });

                            break;

                       case "rfqDocFilenull":
                            Swal.fire
                            ({
                                title: "RFQ Document Null!",
                                text: "RFQ Document cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("RFQ Document file cannot be empty!");
                                $("#inputFileRfQdoc").focus();
                                $("#inputFileRfQdoc").css("border", "solid 1px red");
                            });
                            break;

                        case "KRApinnull":
                            Swal.fire
                            ({
                                title: "KRA Pin Null!",
                                text: "KRA Pin file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("KRA Pin file cannot be empty!");
                                $("#inputFileKra").focus();
                                $("#inputFileKra").css("border", "solid 1px red");
                            });
                            break;

                        case "cbqFilenull":
                            Swal.fire
                            ({
                                title: "Confidential Business Questionnare Null!",
                                text: "Confidential Business Questionnare cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Confidential Business Questionnare  file cannot be empty!");
                                $("#inputFileCBQ").focus();
                                $("#inputFileCBQ").css("border", "solid 1px red");
                            });
                            break;

                        case "certofRegFilenull":
                            Swal.fire
                            ({
                                title: "Certificate of Registration Null!",
                                text: "Certificate of Registrationfile cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Certificate of Registration file cannot be empty!");
                                $("#inputFileCertofReg").focus();
                                $("#inputFileCertofReg").css("border", "solid 1px red");
                            });
                            break;

                        case "taxcomplyFilenull":
                            Swal.fire
                            ({
                                title: "Tax Compliance Cert Null!",
                                text: "Tax Compliance Cert file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Tax Compliance Certfile cannot be empty!");
                                $("#inputFileCertofReg").focus();
                                $("#inputFileCertofReg").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html(status);
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
    });

    $("body").delegate("#openTenders .btnGoapplytender", "click", function (event) {
        event.preventDefault();
        //reset to empty
        $("#openTenderId").html("");
        $("#edittenderfavicon").addClass("fas fa-spinner fa-spin");
        $("#edittenderfavicon").removeClass("fa fa-edit");

        //Set data to be sent 
        var tenderno = $(this).attr("tenderNum");
        window.location.href = "/Home/ApplyforThisTender?tendorNo=" + tenderno;
        $("#edittenderfavicon").removeClass("fas fa-spinner fa-spin");
        $("#edittenderfavicon").addClass("fa fa-edit");
    });

    $("body").delegate("#sample_3 .btnDownloadTender", "click", function (event) {
        event.preventDefault();
        //reset to empty
        $("#openTenderId").html("");
        $("#downloadtenderfavicon").addClass("fas fa-spinner");
        $("#downloadtenderfavicon").removeClass("fas fa-cloud-download-alt");
        //Set data to be sent    
        var tendNo = $(this).attr("tenderNo");
        var data = { "tendorNo": tendNo }
        $.ajax({
            url: "/Home/TenderDocChecker",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"
        }).done(function (status) {
            switch (status) {

            case "filefound":
                window.location.href = "/Home/TenderDocDownloader?tendorNo=" + tendNo;
                $(".downloadtenderfavicon").removeClass("fas fa-spinner");
                $(".downloadtenderfavicon").addClass("fas fa-cloud-download-alt");
                $("#openTenderId").css("display", "block");
                $("#openTenderId").css("color", "green");
                $('#openTenderId').attr('class', 'alert alert-success');
                $("#openTenderId").html("Tender Document Obtained successfully!");
                break;

            case "filenotfound":
                Swal.fire
                ({
                    title: "File Download Error!",
                    text: "Error downloading the Tender Document, contact the office!",
                    type: "error"
                }).then(() => {
                    $("#openTenderId").css("display", "block");
                    $("#openTenderId").css("color", "red");
                    $('#openTenderId').attr('class', 'alert alert-danger');
                    $("#openTenderId").html("The Document you are trying to download is not found!");
                    $(".downloadtenderfavicon").removeClass("fas fa-spinner fa-spin");
                    $(".downloadtenderfavicon").addClass("fas fa-cloud-download-alt");
                });
                break;

            }
        });
    });

    $("body").delegate("#openTenderstoPublc .btnDownloadTenderOtoP", "click", function (event) {
        event.preventDefault();
        //reset to empty
        $("#openTenderId").html("");
        $("#downloadtenderfavicon").addClass("fas fa-spinner fa-spin");
        $("#downloadtenderfavicon").removeClass("fa fa-download");
        //Set data to be sent    
        var tendNo = $(this).attr("tenderNo");
        var data = { "tendorNo": tendNo }
        $.ajax({
            url: "/Home/TenderDocChecker",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"
        }).done(function (status) {
            switch (status) {

            case "filefound":
                window.location.href = "/Home/TenderDocDownloader?tendorNo=" + tendNo;
                $(".downloadtenderfavicon").removeClass("fas fa-spinner fa-spin");
                $(".downloadtenderfavicon").addClass("fa fa-download");
                $("#openTendertoPId").css("display", "block");
                $("#openTendertoPId").css("color", "green");
                $('#openTendertoPId').attr('class', 'alert alert-success');
                $("#openTendertoPId").html("Tender Document Obtained successfully!");
                break;

            case "filenotfound":
                Swal.fire
                ({
                    title: "File Download Error!",
                    text: "Error downloading the Tender Document, contact the office!",
                    type: "error"
                }).then(() => {
                    $("#openTendertoPId").css("display", "block");
                    $("#openTendertoPId").css("color", "red");
                    $('#openTendertoPId').attr('class', 'alert alert-danger');
                    $("#openTendertoPId").html("The Document you are trying to download is not found!");
                    $(".downloadtenderfavicon").removeClass("fas fa-spinner fa-spin");
                    $(".downloadtenderfavicon").addClass("fa fa-download");
                });
                break;

            }
        });
    });

    $("body").delegate("#downloadHeader .btnDownloadTenderLg", "click", function (event) {
        event.preventDefault();
        //reset to empty
        $("#openTenderId").html("");
        $("#downloadtenderfavicon").addClass("fas fa-spinner fa-spin");
        $("#downloadtenderfavicon").removeClass("fa fa-download");
        //Set data to be sent    
        var tendNo = $(this).attr("tenderNo");
        var data = { "tendorNo": tendNo }
        $.ajax({
            url: "/Home/TenderDocChecker",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"
        }).done(function (status) {
            switch (status) {

            case "filefound":
                window.location.href = "/Home/TenderDocDownloader?tendorNo=" + tendNo;
                $(".downloadtenderfavicon").removeClass("fas fa-spinner fa-spin");
                $(".downloadtenderfavicon").addClass("fa fa-download");
                $("#openTendertoPId").css("display", "block");
                $("#openTendertoPId").css("color", "green");
                $('#openTendertoPId').attr('class', 'alert alert-success');
                $("#openTendertoPId").html("Tender Document Obtained successfully!");
                break;

            case "filenotfound":
                Swal.fire
                ({
                    title: "File Download Error!",
                    text: "Error downloading the Tender Document, contact the office!",
                    type: "error"
                }).then(() => {
                    $("#openTendertoPId").css("display", "block");
                    $("#openTendertoPId").css("color", "red");
                    $('#openTendertoPId').attr('class', 'alert alert-danger');
                    $("#openTendertoPId").html("The Document you are trying to download is not found!");
                    $(".downloadtenderfavicon").removeClass("fas fa-spinner fa-spin");
                    $(".downloadtenderfavicon").addClass("fa fa-download");
                });
                break;

            }
        });
    });
    
    $('#btnUploadDocsSelect').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#uploadsMsgselected").html("");
        var selectedFtype = $('#doctoupload').find(":selected").attr('value');
        var browsedDoc = document.getElementById('inputFileSelected').files[0];

        var formDt = new FormData();
        formDt.append("typauploadselect", selectedFtype);
        formDt.append("browsedfile", browsedDoc);

        Swal.fire({
            title: "Upload Document?",
            text: "Proceed to upload all the selected document?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Upload!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/FnUploadSelectedDoc",
                    type: "POST",
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData: false
                }).done(function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Files Uploaded!",
                                text: "All Selected Files Uploaded Successfully!",
                                type: "success"
                            }).then(() => {
                                $("#uploadsMsgselected").css("display", "block");
                                $("#uploadsMsgselected").css("color", "green");
                                $('#uploadsMsgselected').attr("class", "alert alert-success");
                                $("#uploadsMsgselected").html("All Selected Files Uploaded Successfully!");
                                $("#uploadsMsgselected").css("display", "block");
                                $("#uploadsMsgselected").css("color", "green");
                                $("#uploadsMsgselected").html(uploadsfs[1]);
                                $("#upld_form_selected").reset();
                            });

                            break;

                       case "browsedfilenull":
                            Swal.fire
                            ({
                                title: "File selected Null!",
                                text: "File selection cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#uploadfeedbackMsg").css("display", "block");
                                $("#uploadfeedbackMsg").css("color", "red");
                                $('#uploadfeedbackMsg').attr('class', 'alert alert-danger');
                                $("#uploadfeedbackMsg").html("File selection cannot be empty!");
                                $("#inputFileSelected").focus();
                                $("#inputFileSelected").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                $("#uploadfeedbackMsg").css("display", "block");
                                $("#uploadfeedbackMsg").css("color", "red");
                                $('#uploadfeedbackMsg').addClass('alert alert-danger');
                                $("#uploadfeedbackMsg").html(status);
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
    });

    $('#btnApplyTender').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();

        //reset to empty
        $("#feedbackMsg").html("");
        var tecdoc = document.getElementById('inputFileTecDocUplds').files[0];
        var fincdoc = document.getElementById('inputFileFinacDocUplds').files[0];
        var krapin = document.getElementById('inputFileKraUplds').files[0];
        var certfreg = document.getElementById('inputFileCertofRegUplds').files[0];
        var cbq = document.getElementById('inputFileCBQUplds').files[0];
        var txcomply = document.getElementById('inputFileTxComplyUplds').files[0];

        var formDt = new FormData();
        formDt.append("tecnFile", tecdoc);
        formDt.append("fincFile", fincdoc);
        formDt.append("myTendorNo", $("#txtTendorNo").val());
        formDt.append("krapinFile", krapin);
        formDt.append("cbqFile", cbq);
        formDt.append("certofRegFile", certfreg);
        formDt.append("taxcomplyFile", txcomply);


        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you'd like to proceed with submission?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, submit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/SubmitTenderApp",
                    type: "POST",
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData: false
                }).done(function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "submitted success":
                            Swal.fire
                            ({
                                title: "Submitted!",
                                text: "Your bid submitted successfully, Kindly upload documents below!",
                                type: "success"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "green");
                                $('#feedbackMsg').attr("class", "alert alert-success");
                                $("#feedbackMsg").html("Your bid submitted successfully!");
                                //  $("#uploadFilesDiv").show();
                                $("#uploadsMsg").css("display", "block");
                                $("#uploadsMsg").css("color", "green");
                                $("#uploadsMsg").html(uploadsfs[1]);
                                $("#upld_form").reset();
                            });

                            break;
                            
                      case "tecFilenull":
                            Swal.fire
                            ({
                                title: "Technical Proposal null",
                                text: "Technical Proposal Document cannot be left empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html("Technical Proposal Document cannot be left empty!");
                                $("#inputFileTecDocUplds").focus();
                                $("#inputFileTecDocUplds").css("border", "solid 1px red");
                            });
                            break;

                       case "FincFilenull":
                            Swal.fire
                            ({
                                title: "Financial Proposal null",
                                text: "Financial Proposal Document cannot be left empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html("Financial Proposal Document cannot be left empty!");
                                $("#inputFileFinacDocUplds").focus();
                                $("#inputFileFinacDocUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "KRApinnull":
                            Swal.fire
                            ({
                                title: "KRA Pin Null!",
                                text: "KRA Pin file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("KRA Pin file cannot be empty!");
                                $("#inputFileKraUplds").focus();
                                $("#inputFileKraUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "cbqFilenull":
                            Swal.fire
                            ({
                                title: "Confidential Business Questionnare Null!",
                                text: "Confidential Business Questionnare cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Confidential Business Questionnare  file cannot be empty!");
                                $("#inputFileCBQUplds").focus();
                                $("#inputFileCBQUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "certofRegFilenull":
                            Swal.fire
                            ({
                                title: "Certificate of Registration Null!",
                                text: "Certificate of Registrationfile cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Certificate of Registration file cannot be empty!");
                                $("#inputFileCertofRegUplds").focus();
                                $("#inputFileCertofRegUplds").css("border", "solid 1px red");
                            });
                            break;

                        case "taxcomplyFilenull":
                            Swal.fire
                            ({
                                title: "Tax Compliance Cert Null!",
                                text: "Tax Compliance Cert file cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Tax Compliance Certfile cannot be empty!");
                                $("#inputFileCertofRegUplds").focus();
                                $("#inputFileCertofRegUplds").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html(status);
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
    });

    $("body").delegate("#tblRfQs .btnInsertRfQs", "click", function (event) {
        //To prevent form submit after ajax call
        event.preventDefault();
        //Loop through the Table rows and build a JSON array.
        var allrfqitems = new Array();
        $("#tblRfQs TBODY TR").each(function () {
            var row = $(this);
            var onerfqitem = {};
            onerfqitem.Line_No = row.find("TD input").eq(0).val();
            onerfqitem.Type = row.find("TD input").eq(1).val();
            onerfqitem.Item_No = row.find("TD input").eq(2).val();
            onerfqitem.Quantity = row.find("TD input").eq(3).val();
            onerfqitem.Unit_Price = row.find("TD input").eq(4).val();
            onerfqitem.Requisition_No = $("#inputRfqNumber").val();
            allrfqitems.push(onerfqitem);
        });
        console.log(allrfqitems);
        $.ajax({
            type: "POST",
            url: "/Home/InsertRfQItems",
            data: '{rfqitems: ' + JSON.stringify(allrfqitems) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (status) {
                switch (status) {
                    case "submitted success":
                    Swal.fire
                    ({
                        title: "Items Added!",
                        text: "RfQ Items submitted Successfully!, UPLOAD Documents below!",
                        type: "success"
                    }).then(() => {
                        $("#feedbackMsg").css("display", "block");
                        $("#feedbackMsg").css("color", "green");
                        $('#feedbackMsg').attr("class", "alert alert-success");
                        $("#feedbackMsg").html("RfQ Items submitted Successfully!, UPLOAD Documents below!");
                    });
                    break;
                case "unitpriceEmpty":
                    Swal.fire
                    ({
                        title: "Empty field detected!",
                        text: "Unit price empty",
                        type: "error"
                    }).then(() => {
                        $("#feedbackMsg").css("display", "block");
                        $("#feedbackMsg").css("color", "red");
                        $('#feedbackMsg').addClass('alert alert-danger');
                        $("#feedbackMsg").html("Unit price field empty!");
                    });
                    break;
                default:
                    Swal.fire
                    ({
                        title: "Error!!!",
                        text: status,
                        type: "error"
                    }).then(() => {
                        $("#feedbackMsg").css("display", "block");
                        $("#feedbackMsg").css("color", "red");
                        $('#feedbackMsg').addClass('alert alert-danger');
                        $("#feedbackMsg").html(status.d);
                    });
                    break;
                }

            }
        });
    });

    $('.button-upload').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#uploadsMsg").html("");

        var selectedFtype = $('#ddldocumentdroplist').find(":selected").attr('value');
        var selvaluedescription = $("#ddldocumentdroplist option:selected").text();
        var browsedDoc = document.getElementById('inputFileselector').files[0];
        var certNumber = $("#txtCertNo").val();
        var dateofissue = $("#dtOfIssue").val();
        var xprydate = $("#dtOfexpiry").val();

        var formDt = new FormData();
        formDt.append("typauploadselect", selectedFtype);
        formDt.append("browsedfile", browsedDoc);
        formDt.append("filedescription", selvaluedescription);
        formDt.append("certificatenumber", certNumber);
        formDt.append("dateofissue", dateofissue);
        formDt.append("expirydate", xprydate);

        //for test
        console.log(JSON.stringify({ formdata: formDt }));
        Swal.fire({
            title: "Upload Document?",
            text: "Proceed to upload all the selected document once?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Upload!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    xhr: function() {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = ((evt.loaded / evt.total) * 100);
                                $(".progress-bar").width(percentComplete + '%');
                                $(".progress-bar").html(percentComplete+'%');
                            }
                        }, false);
                        return xhr;
                    },
                    type: 'POST',
                    url: '/Home/FnUploadmandatoryDoc',
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $(".progress-bar").width('0%');
                        $('#uploadsMsg').html('<img src="/assets/loaders/load.gif"/>');
                    },
                    error:function(){
                        $("#uploadsMsg").css("color", "red");
                        $('#uploadsMsg').addClass('alert alert-danger');
                        $("#uploadsMsg").html("File upload failed, choose another file and try again!");
                    },
                    success: function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Files Uploaded!",
                                text: "File Uploaded Successfully!",
                                type: "success"
                            }).then(() => {
                                $("#regfeedback").css("display", "block");
                                $("#regfeedback").css("color", "green");
                                $('#regfeedback').attr("class", "alert alert-success");
                                $("#regfeedback").html("Selected File Uploaded Successfully!");
                                $("#uploadsMsg").css("display", "block");
                                $("#uploadsMsg").css("color", "green");
                                $("#uploadsMsg").html(uploadsfs[1]);
                                po.init();

                            });

                            break;
                       case "browsedfilenull":
                            Swal.fire
                            ({
                                title: "File Selection Null!",
                                text: "File input cannot be empty!",
                                type: "error"
                            }).then(() => {
                                $("#regfeedback").css("display", "block");
                                $("#regfeedback").css("color", "red");
                                $('#regfeedback').attr('class', 'alert alert-danger');
                                $("#regfeedback").html("File input cannot be empty!");
                                $("#inputFileselector").focus();
                                $("#inputFileselector").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: uploadsfs[1],
                                type: "error"
                            }).then(() => {
                                $("#regfeedback").css("display", "block");
                                $("#regfeedback").css("color", "red");
                                $('#regfeedback').addClass('alert alert-danger');
                                $("#regfeedback").html(uploadsfs[1]);
                            });

                            break;
                        }


                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your submission!',
                    'error'
                );
            }
        });
    });

    $('.button-upload-rfi').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#docs_feedback_alert").html("");

        var selectedFtype = $('#ddldocumentdroplist_rfi').find(":selected").attr('value');
        var selvaluedescription = $("#ddldocumentdroplist_rfi option:selected").text();
        var browsedDoc = document.getElementById('inputFileselector_rfi').files[0];
        var certNumber = $("#txtCertNo_rfi").val();
        var dateofissue = $("#dtOfIssue_rfi").val();
        var xprydate = $("#dtOfexpiry_rfi").val();
        var rfiApplNum = $("#txtIfApplicationNo").val();

        var formDt = new FormData();
        formDt.append("typauploadselect", selectedFtype);
        formDt.append("browsedfile", browsedDoc);
        formDt.append("filedescription", selvaluedescription);
        formDt.append("certificatenumber", certNumber);
        formDt.append("dateofissue", dateofissue);
        formDt.append("expirydate", xprydate);
        formDt.append("rfiApplicationNum", rfiApplNum);

        //for test
        Swal.fire({
            title: "Upload Document?",
            text: "Proceed to upload the selected document once?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Upload!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = ((evt.loaded / evt.total) * 100);
                                $(".progress-bar").width(percentComplete + '%');
                                $(".progress-bar").html(percentComplete + '%');
                            }
                        }, false);
                        return xhr;
                    },
                    type: 'POST',
                    url: '/Home/FnUploadmandatoryDoc_Rfi',
                    data: formDt,
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function () {
                        $(".progress-bar").width('0%');
                        $('#uploadsMsg').html('<img src="/assets/loaders/load.gif"/>');
                    },
                    error: function () {
                        $("#uploadsMsg").css("color", "red");
                        $('#uploadsMsg').addClass('alert alert-danger');
                        $("#uploadsMsg").html("File upload failed, choose another file and try again!");

                        App.alert({
                            container: "#docs_feedback_alert",
                            place: "append",
                            type: "danger",
                            message: "File upload failed, choose another file and try again!!",
                            close: true,
                            reset: true,
                            focus: true,
                            closeInSeconds: 5,
                            icon: "warning"
                        });
                    },
                    success: function (status) {
                        var uploadsfs = status.split('*');
                        status = uploadsfs[0];
                        switch (status) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Files Uploaded!",
                                text: "File Uploaded Successfully!",
                                type: "success"
                            }).then(() => {
                                App.alert({
                                    container: "#docs_feedback_alert",
                                    place: "append",
                                    type: "success",
                                    message: "Selected File Uploaded Successfully!",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 5,
                                    icon: "check"
                                });

                                $("#uploadsMsg").css("display", "block");
                                $("#uploadsMsg").css("color", "green");
                                $("#uploadsMsg").html(uploadsfs[1]);

                                //call documents uploded for Rfi
                                po.init();
                            });
                            break;

                            

                        case "issuedatenull":
                            Swal.fire
                            ({
                                title: "Date of Issue Null!",
                                text: "Date of Issue input cannot be empty!",
                                type: "error"
                            }).then(() => {
                                App.alert({
                                    container: "#docs_feedback_alert",
                                    place: "append",
                                    type: "danger",
                                    message: "Date of Issue cannot be empty!",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 5,
                                    icon: "warning"
                                });

                                $("#dtOfIssue_rfi").focus();
                                $("#dtOfIssue_rfi").css("border", "solid 1px red");
                            });
                            break;

                         case "exprynull":
                            Swal.fire
                            ({
                                title: "Expiry Date Null!",
                                text: "Expiry Date  input cannot be empty!",
                                type: "error"
                            }).then(() => {
                                App.alert({
                                    container: "#docs_feedback_alert",
                                    place: "append",
                                    type: "danger",
                                    message: "Expiry Date cannot be empty!",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 5,
                                    icon: "warning"
                                });

                                $("#dtOfexpiry_rfi").focus();
                                $("#dtOfexpiry_rfi").css("border", "solid 1px red");
                            });
                            break;

                        case "browsedfilenull":
                            Swal.fire
                            ({
                                title: "File Selection Null!",
                                text: "File input cannot be empty!",
                                type: "error"
                            }).then(() => {
                                App.alert({
                                    container: "#docs_feedback_alert",
                                    place: "append",
                                    type: "danger",
                                    message: "File input cannot be empty!",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 5,
                                    icon: "warning"
                                });

                                $("#inputFileselector_rfi").focus();
                                $("#inputFileselector_rfi").css("border", "solid 1px red");
                            });
                            break;

                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: uploadsfs[1],
                                type: "error"
                            }).then(() => {
                                App.alert({
                                    container: "#docs_feedback_alert",
                                    place: "append",
                                    type: "danger",
                                    message: uploadsfs[1],
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
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your submission!',
                    'error'
                );
            }
        });
    });

    $(".button-go-back-home").click(function() {
        $("#ifpdetailsdiv").css("display", "none");
        $("#ifplistdiv").css("display", "block");
        $("#tbl_ifp_category").dataTable().fnClearTable();
        $("#tbl_ifp_docs").dataTable().fnClearTable();
        $("#tbl_ifp_downloads").dataTable().fnClearTable();
        
    });

    $(".btnlink-reg").click(function() {
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/VendorDetails",
            beforeSend: function() {
                $(".modalspinner").show();
            },
            complete: function() {
                $(".modalspinner").hide();
            }
        });
        $.ajax({
            data: ""
        }).done(function(json) {
            for (var i = 0; i < json.length; i++) {
                var regstatus = json[i].Registrn_Submitted_onPortal;
                // console.log("Reg Status: " + regstatus);
                switch (regstatus) {
                    case "True":
                        App.alert({
                            container: "#generalfeedback",
                            place: "append",
                            type: "danger",
                            message: "You have already submitted your registration, Wait for KeRRA Communication!",
                            close: true,
                            reset: true,
                            focus: true,
                            closeInSeconds: 10,
                            icon: "warning"
                        });
                    break;
                case "False":
                    window.location.href = "/Home/Supplier_Registration_Form";
                    break;
                }              

            }
        });
    });
    
    $(".button-backto-ifplists").click(function () {
        window.location.href = "/Home/RfiResponseForm";
    });
    
    //START: search by region
    $("#region_sel_btn").click(function () {
        $("#region_sel_div").css("display", "none");
        $("#region_sel_div_2").css("display", "block");
    });

    $("#regions_centers").change(function () {
        rg.init();
        $("#region_sel_div").css("display", "block");
        $("#region_sel_div_2").css("display", "none");
    });
    //END: search by region
    
    //START: search by procurement method
    $("#procmethd_sel_btn").click(function () {
        $("#proc_methd_div").css("display", "none");
        $("#proc_methd_div_2").css("display", "block");
    });

    $("#procurement_methods").change(function () {
        to.init();
        $("#proc_methd_div").css("display", "block");
        $("#proc_methd_div_2").css("display", "none");
    });
    //END: search by procurement method

    //START: search by procurement group
    $("#prod_group_sel_btn").click(function () {
        $("#prod_group_div").css("display", "none");
        $("#prod_group_div_2").css("display", "block");
    });

    $("#prod_group").change(function () {
        go.init();
        $("#prod_group_div").css("display", "block");
        $("#prod_group_div_2").css("display", "none");
    });
    //END: search by procurement group

    //START: search by works category
    $("#works_cat_sel_btn").click(function () {
        $("#works_cat_div").css("display", "none");
        $("#works_cat_div_2").css("display", "block");
    });

    $("#works_cat_ddl").change(function () {
        wrks.init();
        $("#works_cat_div").css("display", "block");
        $("#works_cat_div_2").css("display", "none");
    });
    //END: search by works category
    

});
var po = function() {
    var e = function() {
        var tl = $("#tbl_mydocs"),
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
            url: "/Home/UploadedSpecifVendorDocs",
            data: ""
        }).done(function(json) {
            //console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++, json[i].FileName, json[i].Size, '<a class="trash" href="">Delete</a>'
                ]);
            }
        });
    };
    var rfid = function() {
        var tl = $("#tbl_mydocs_rfi"),
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
            url: "/Home/UploadedSpecifVendorDocs_Rfi?rfiApplicationNum=" + $("#txtIfApplicationNo").val(),
            data: ""
        }).done(function(json) {
            //console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++, json[i].FileName, json[i].Size, '<a class="trash" href="">Delete</a>'
                ]);
            }
        });
    };
   
   
    return {
        init: function () {
            e(),rfid(), d(), p();
        }
    }
}();

var go = function () {
    var y = function () {
        var tl = $("#tbl_open_tenders_n"),
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
            url: "/Home/SearchByProcurementGroup?procurementgroup=" + $("#prod_group").children("option:selected").val(),
            data: ""
        }).done(function (json) {
            //console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    json[i].Submission_End_Date,
                    json[i].Project_ID,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
           y();
        }
    }
}();

var to = function () {
    var p = function () {
        var tl = $("#tbl_open_tenders_n"),
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
            url: "/Home/SearchByProcMethod?procurementmethod=" +
                $("#procurement_methods").children("option:selected").text(),
            data: ""
        }).done(function (json) {
            //console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    json[i].Submission_End_Date,
                    json[i].Project_ID,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
    };
    return {
        init: function () {
            p();
        }
    }
}();

var rg = function () {
    var d = function () {
        var tl = $("#tbl_open_tenders_n"),
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
            url: "/Home/SearchByRegion?responsibilitycenter=" + $("#regions_centers").children("option:selected").text(),
            data: ""
        }).done(function (json) {
           // console.log($("#regions_centers").children("option:selected").text());
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    json[i].Submission_End_Date,
                    json[i].Project_ID,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
            d();
        }
    }
}();

var wrks = function () {
    var d = function () {
        var tl = $("#tbl_open_tenders_n"),
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
            url: "/Home/SearchByWorksCat?workscategory=" + $("#works_cat_ddl").children("option:selected").val(),
            data: ""
        }).done(function (json) {
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    json[i].Submission_End_Date,
                    json[i].Project_ID,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
            d();
        }
    }
}();
