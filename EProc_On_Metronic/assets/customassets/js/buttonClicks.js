'use-strict';
$(document).ready(function () {

    //Ajax Start- This is to show ajax loading
    $(document).ajaxStart(function () {
        $(".gifLoading").css("display", "block");

        //$("#downloadfavicon").addClass("fas fa-spinner fa-spin");
        //$("#downloadfavicon").removeClass("fas fa-cloud-download-alt");

        //$("#downloadfavicondld").addClass("fas fa-spinner fa-spin");
        //$("#downloadfavicondld").removeClass("fa fa-download");
        

    });

    $(document).ajaxStop(function () {
        $(".gifLoading").css("display", "none");
    });

    $(document).ajaxComplete(function () {
        $(".gifLoading").css("display", "none");
    });

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


        $.ajax({
            url: "/Home/CheckLogin",
            type: "POST",
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

            case "Loginadmin":
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
                console.log(logontype);
                break;

            case "Logincustomer":
                //now login customer
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
                console.log(logontype);
                break;
            case "Logincontact":
                //now login contact
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
});