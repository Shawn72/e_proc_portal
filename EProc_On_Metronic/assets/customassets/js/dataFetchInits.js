﻿'use-strict';
var Ld = function () {
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
    var rfiresponse = function () {
        var tl = $("#tbl_open_rfis_list"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                    }
                ],
                order: [
                    [0, "asc"]
                ],

                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/GetIfPsList",
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].Description,
                    json[i].Tender_Box_Location_Code,
                    json[i].Submission_Start_Date,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
        tl.on("click",
            ".go_respond",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "/Home/GetIfpDetails?ifpnumber=" + i.cells[1].innerHTML,
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });

                //async fetch vendor details
                $.ajax({
                    type: "POST",
                    url: "/Home/VendorDetails",
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json) {
                    for (var i = 0; i < json.length; i++) {
                        //for the wizard
                        $("#txtVndNo").val(json[i].No);
                        $("#txtVndName").val(json[i].Name);
                    }
                });

                //fetch RFI application No.
                $.ajax({
                    type: "POST",
                    url: "/Home/GetRfiApplicationNo?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (jsonk) {
                    $("#txtIfApplicationNo").val(jsonk);
                    //async fetch 1: IFP details fetch
                    $.ajax({
                        data: "",
                        async: true
                    }).done(function (json) {
                        $("#rfiwizardformdiv").css("display", "block");
                        $("#rfilistdiv").css("display", "none");

                        for (var i = 0; i < json.length; i++) {
                            $("#txtIfpNo").val(json[i].Code);
                            console.log("Test IfP No: " + json[i].Code);
                        }
                    });
                    //async fetch representative details
                    $.ajax({
                        type: "POST",
                        url: "/Home/GetRepDetails?rfidocpnumber=" + jsonk,
                        data: "",
                        cache: false,
                        async: true
                    }).done(function (json) {
                        for (var i = 0; i < json.length; i++) {
                            $("#txtVndRepName").val(json[i].Vendor_Representative_Name);
                            $("#txtVendrepTitle").val(json[i].Vendor_Repr_Designation);
                        }
                    });
                });

                //async fetch 2: Prequalification categories get goods(assets) type
                $.ajax({
                    type: "POST",
                    url: "/Home/GetGoodnServicesCategory?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json2) {
                    //console.log(JSON.stringify({ ifpdata2: json2 }));
                    var td2 = $("#tbl_rfi_goods"),
                        p2 = td2.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: {
                                aria: {
                                    sortAscending: ": activate to sort column ascending",
                                    sortDescending: ": activate to sort column descending"
                                },
                                emptyTable: "No data available in table",
                                info: "Showing _START_ to _END_ of _TOTAL_ records",
                                infoEmpty: "No records found",
                                infoFiltered: "(filtered1 from _MAX_ total records)",
                                lengthMenu: "Show _MENU_",
                                search: "Search:",
                                zeroRecords: "No matching records found",
                                paginate: {
                                    previous: "Prev",
                                    next: "Next",
                                    last: "Last",
                                    first: "First"
                                }
                            },
                            bStateSave: !0,
                            columnDefs: [
                                { orderable: !0, defaultContent: "-", targets: "_all" },
                                { searchable: !0, targets: "_all" }
                            ],
                            order: [[0, "asc"]],
                            bDestroy: true,
                            info: false,
                            processing: true,
                            retrieve: true
                        });

                    $(this).parents("tr").addClass("odd gradeX");
                    for (var i = 0; i < json2.length; i++) {
                        p2.fnAddData([
                            '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
                                '<input type="checkbox" class="checkboxes" value="' +  json2[i].Prequalification_Category_ID + '"' +
                            'procCat="' + json2[i].Prequalification_Category_ID + '" /><span></span>' +
                            '</label>',
                            json2[i].Prequalification_Category_ID,
                            json2[i].Description,
                            json2[i].Special_Group_Reservation,
                            json2[i].Tender_Box_Location_Code,
                            ' <div class="btn-group">' +
                                '<button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions' +
                                     '<i class="fa fa-angle-down"></i>' +
                                '</button>' +
                                '<ul class="dropdown-menu pull-left" role="menu">' +
                                '<li>' +
                                    '<a href="javascript:;">' +
                                    '<i class="icon-docs"></i> Respond to Unique Requirements</a>' +
                                '</li>' +
                                '<li>' +
                                    '<a href="javascript:;">' +
                                    '<i class="icon-tag"></i> Select Regions </a>' +
                                '</li>' +
                                '</ul>' +
                            '</div>'
                        ]);
                        }
                        td2.on("change",
                            "tbody tr .checkboxes",
                            function() {
                                var t = jQuery(this).is(":checked"), selected_arr = [];
                                t? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active"),
                                        $("#grpshowhide").css("display", "block"), $("#goodsappalert")
                                            .addClass("alert alert-warning"))
                                    : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"),
                                        $("#grpshowhide").css("display", "none"), $("#goodsappalert")
                                        .removeClass("alert alert-warning"));

                                // Read all checked checkboxes
                                $("input:checkbox[class=checkboxes]:checked").each(function() {
                                    selected_arr.push($(this).val());
                                });

                                if (selected_arr.length > 0) {
                                    $("#goodsappalert").addClass("alert alert-warning");
                                    $("#grpshowhide").css("display", "block");
                                } else {
                                    $("#goodsappalert").removeClass("alert alert-warning");
                                    $("#grpshowhide").css("display", "none");
                                    selected_arr = [];
                                }
                            });

                        var selected_arr = [];
                        $(".insertselected").on("click",
                            function(e) {
                                e.preventDefault();

                                // Read all checked checkboxes
                                $.each($("#tbl_rfi_goods tr.active"), function () {
                                    //procurement category
                                   selected_arr.push($(this).find('td').eq(1).text()); 
                                });

                                var postData = {
                                    DocumentNo: $("#txtIfApplicationNo").val(),
                                    RfiDocumentNo: $('#txtIfpNo').val(),
                                    ProcurementCategory: selected_arr
                                };

                                Swal.fire({
                                    title: "Save selected categories?",
                                    text: "You are about to save " + selected_arr.length + " rows!",
                                    type: "warning",
                                    showCancelButton: true,
                                    closeOnConfirm: true,
                                    confirmButtonText: "It's OK, save 'em!",
                                    confirmButtonClass: "btn-warning",
                                    confirmButtonColor: "#008000",
                                    position: "center",
                                    dangerMode: true
                                }).then((result) => {
                                    if (result.value) {
                                        //get value of result and switch it down here
                                        $.ajaxSetup({
                                            global: false,
                                            url: "/Home/InsertResponseLines",
                                            type: "POST",
                                            beforeSend: function () {
                                                $(".modalspinner").show();
                                            },
                                            complete: function () {
                                                $(".modalspinner").hide();
                                            }
                                        });

                                        $.ajax({
                                            data: '{postData: ' + JSON.stringify(postData) + '}',
                                            dataType: "json",
                                            cache: false,
                                            async: true,
                                            contentType: "application/json"
                                        }).done(function (status) {
                                            var splitstatus = status.split('*');
                                            switch (splitstatus[0]) {
                                                case "success":
                                                    Swal.fire({
                                                        title: "Categories inserted successfully!",
                                                        text: "You have inserted " + selected_arr.length + " rows!",
                                                        icon: "success",
                                                        type: "success"
                                                    }).then(() => {
                                                        var uns = $(".checkboxes").prop("checked", false);
                                                        uns.each(function () {
                                                            $(this).parents("tr").removeClass("active");
                                                        });
                                                        //show messages for successfull inserts
                                                        $("#goodsappalert").removeClass("alert alert-warning");
                                                        $("#grpshowhide").css("display", "none");
                                                        App.alert({
                                                            container: "#rfi_goods_alert",
                                                            place: "append",
                                                            type: "success",
                                                            message: splitstatus[1],
                                                            close: true,
                                                            reset: true,
                                                            focus: true,
                                                            closeInSeconds: 5,
                                                            icon: "check"
                                                        });
                                                        selected_arr = [], postData = {};
                                                    });

                                                    break;
                                                default:
                                                    Swal.fire({
                                                        title: "An Error Occured!",
                                                        text: splitstatus[1],
                                                        icon: "warning",
                                                        type: "error"
                                                    }).then(() => {
                                                        var uns = $(".checkboxes").prop("checked", false);
                                                        uns.each(function () {
                                                            $(this).parents("tr").removeClass("active");
                                                        });
                                                        //show messages for erroneos inserts
                                                        $("#goodsappalert").removeClass("alert alert-warning");
                                                        $("#grpshowhide").css("display", "none");

                                                        App.alert({
                                                            container: "#rfi_goods_alert",
                                                            place: "append",
                                                            type: "danger",
                                                            message: splitstatus[1],
                                                            close: true,
                                                            reset: true,
                                                            focus: true,
                                                            closeInSeconds: 5,
                                                            icon: "warning"
                                                        });
                                                        selected_arr = [], postData = {};
                                                    });
                                                    break;
                                            }
                                        });

                                   }
                                });
                            }),
                        $(".cancelselected").on("click",
                            function(e) {
                                e.preventDefault();
                                // uncheck checked checkboxes
                                var uns =  $(".checkboxes").prop("checked", false);
                                uns.each(function () {
                                    $(this).parents("tr").removeClass("active");
                                });

                                Swal.fire({
                                    title: "Unselected Row (s)",
                                    text: "Unselect " + uns.length + " row (s)!",
                                    type: "warning",
                                    showCancelButton: false,
                                    closeOnConfirm: true,
                                    confirmButtonText: "It's OK, uncheck it!",
                                    confirmButtonClass: "btn-warning",
                                    confirmButtonColor: "#008000",
                                    position: "center",
                                    dangerMode: true
                                }).then((result) => {
                                    if (result.value) {
                                        Swal.fire({
                                            title: "Item unselected!",
                                            text: "You have just unselected " + uns.length + " row (s)!",
                                            icon: "success",
                                            type: "success"
                                        }).then(() => {
                                            //remove all active classes
                                            $("#goodsappalert").removeClass("alert alert-warning"),
                                            $("#grpshowhide").css("display", "none");
                                            $(".checkboxes").prop("checked", false);
                                            $(".group-checkable").prop("checked", false);
                                            selected_arr = [], rfimodel = [];
                                        });
                                     //ignore cancel
                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        Swal.fire(
                                            'Cancelled',
                                            'You cancelled highlights!',
                                            'error'
                                        );
                                    }

                                });
                            });

                        var tld = $("#tbl_mydocs_rfi"),
                        rt = tld.dataTable({
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
                        rt.fnClearTable();
                        var o = 1;
                        for (var i = 0; i < json.length; i++) {
                            rt.fnAddData([
                                o++, json[i].FileName, json[i].Size, '<a class="trash" href="">Delete</a>'
                            ]);
                        }
                    });
                });

                //async fetch 3: Prequalification categories get services type
                $.ajax({
                    type: "POST",
                    url: "/Home/GetServicesCategory?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json3) {
                    //console.log(JSON.stringify({ ifpdata2: json2 }));
                    var td3 = $("#tbl_rfi_services"),
                        p3 = td3.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: {
                                aria: {
                                    sortAscending: ": activate to sort column ascending",
                                    sortDescending: ": activate to sort column descending"
                                },
                                emptyTable: "No data available in table",
                                info: "Showing _START_ to _END_ of _TOTAL_ records",
                                infoEmpty: "No records found",
                                infoFiltered: "(filtered1 from _MAX_ total records)",
                                lengthMenu: "Show _MENU_",
                                search: "Search:",
                                zeroRecords: "No matching records found",
                                paginate: {
                                    previous: "Prev",
                                    next: "Next",
                                    last: "Last",
                                    first: "First"
                                }
                            },
                            bStateSave: !0,
                            columnDefs: [
                                { orderable: !0, defaultContent: "-", targets: "_all" },
                                { searchable: !0, targets: "_all" }
                            ],
                            order: [[0, "asc"]],
                            bDestroy: true,
                            info: false,
                            processing: true,
                            retrieve: true
                        });

                    $(this).parents("tr").addClass("odd gradeX");
                    for (var i = 0; i < json3.length; i++) {
                        p3.fnAddData([
                            '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
                            '<input type="checkbox" class="checkbox-services" value="' +  json3[i].Prequalification_Category_ID + '" /><span></span>' +
                            '</label>',
                            json3[i].Prequalification_Category_ID,
                            json3[i].Description,
                            json3[i].Special_Group_Reservation,
                            json3[i].Tender_Box_Location_Code,
                            ' <div class="btn-group">' +
                                '<button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions' +
                                      '<i class="fa fa-angle-down"></i>' +
                                '</button>' +
                            '<ul class="dropdown-menu pull-left" role="menu">' +
                                '<li>' +
                                    '<a href="javascript:;">' +
                                    '<i class="icon-docs"></i> Respond to Unique Requirements</a>' +
                                '</li>' +
                                '<li>' +
                                    '<a href="javascript:;">' +
                                    '<i class="icon-tag"></i> Select Regions </a>' +
                                '</li>' +
                            '</ul>' +
                            '</div>'
                        ]);
                    }
                        td3.on("change",
                            "tbody tr .checkbox-services",
                            function() {
                                var t = jQuery(this).is(":checked"), selected_arr_2 = [];
                                t? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active"),
                                        $("#grpshowhide-services").css("display", "block"), $("#serviceappalert")
                                            .addClass("alert alert-warning"))
                                    : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"),
                                        $("#grpshowhide-services").css("display", "none"), $("#serviceappalert")
                                            .removeClass("alert alert-warning"));

                                // Read all checked checkboxes
                                $("input:checkbox[class=checkbox-services]:checked").each(function () {
                                    selected_arr_2.push($(this).val());
                                });

                                if (selected_arr_2.length > 0) {
                                    $("#serviceappalert").addClass("alert alert-warning");
                                    $("#grpshowhide-services").css("display", "block");
                                } else {
                                    $("#serviceappalert").removeClass("alert alert-warning");
                                    $("#grpshowhide-services").css("display", "none");
                                    selected_arr_2 = [];
                                }
                            });
                    var selected_arr_2 = [];
                    $(".insertselected-services").on("click",
                            function(e) {
                                e.preventDefault();
                                // Read all checked checkboxes
                                $("input:checkbox[class=checkbox-services]:checked").each(function () {
                                    selected_arr_2.push($(this).val());
                                });

                                var postData = {
                                    DocumentNo: $("#txtIfApplicationNo").val(),
                                    RfiDocumentNo: $('#txtIfpNo').val(),
                                    ProcurementCategory: selected_arr_2
                                };

                                Swal.fire({
                                    title: "Save selected categories?",
                                    text: "You are about to save " + selected_arr_2.length + " rows!",
                                    type: "warning",
                                    showCancelButton: true,
                                    closeOnConfirm: true,
                                    confirmButtonText: "It's OK, save 'em!",
                                    confirmButtonClass: "btn-warning",
                                    confirmButtonColor: "#008000",
                                    position: "center",
                                    dangerMode: true
                                }).then((result) => {
                                    if (result.value) {
                                        //get value of result and switch it down here
                                        $.ajaxSetup({
                                            global: false,
                                            url: "/Home/InsertResponseLines",
                                            type: "POST",
                                            beforeSend: function () {
                                                $(".modalspinner").show();
                                            },
                                            complete: function () {
                                                $(".modalspinner").hide();
                                            }
                                        });

                                        $.ajax({
                                            data: '{postData: ' + JSON.stringify(postData) + '}',
                                            dataType: "json",
                                            cache: false,
                                            async: true,
                                            contentType: "application/json"
                                        }).done(function (status) {
                                            var splitstatus = status.split('*');
                                            switch (splitstatus[0]) {
                                            case "success":
                                                Swal.fire({
                                                    title: "Categories inserted successfully!",
                                                    text: "You have inserted " + selected_arr_2.length + " rows!",
                                                    icon: "success",
                                                    type: "success"
                                                }).then(() => {
                                                    var uns = $(".checkbox-services").prop("checked", false);
                                                    uns.each(function () {
                                                        $(this).parents("tr").removeClass("active");
                                                    });
                                                    //show messages for successfull inserts
                                                    $("#serviceappalert").removeClass("alert alert-warning");
                                                    $("#grpshowhide-services").css("display", "none");
                                                    App.alert({
                                                        container: "#rfi_services_alert",
                                                        place: "append",
                                                        type: "success",
                                                        message: splitstatus[1],
                                                        close: true,
                                                        reset: true,
                                                        focus: true,
                                                        closeInSeconds: 5,
                                                        icon: "check"
                                                    });
                                                    selected_arr_2 = [], postData = {};
                                                });

                                                break;
                                            default:
                                                Swal.fire({
                                                    title: "An Error Occured!",
                                                    text: splitstatus[1],
                                                    icon: "warning",
                                                    type: "error"
                                                }).then(() => {
                                                    var uns = $(".checkbox-services").prop("checked", false);
                                                    uns.each(function () {
                                                        $(this).parents("tr").removeClass("active");
                                                    });
                                                    //show messages for erroneos inserts
                                                    $("#serviceappalert").removeClass("alert alert-warning");
                                                    $("#grpshowhide-services").css("display", "none");

                                                    App.alert({
                                                        container: "#rfi_services_alert",
                                                        place: "append",
                                                        type: "danger",
                                                        message: splitstatus[1],
                                                        close: true,
                                                        reset: true,
                                                        focus: true,
                                                        closeInSeconds: 5,
                                                        icon: "warning"
                                                    });
                                                    selected_arr_2 = [], postData = {};
                                                });
                                                break;
                                            }
                                        });

                                    }
                                });

                            }),

                    $(".cancelselected-services").on("click",
                        function(e) {
                                e.preventDefault();
                                // uncheck checked checkboxes
                                var uns = $(".checkbox-services").prop("checked", false);
                                uns.each(function () {
                                    $(this).parents("tr").removeClass("active");
                                });

                                Swal.fire({
                                    title: "Unselected Row (s)",
                                    text: "Unselect " + uns.length + " row (s)!",
                                    type: "warning",
                                    showCancelButton: false,
                                    closeOnConfirm: true,
                                    confirmButtonText: "It's OK, uncheck it!",
                                    confirmButtonClass: "btn-warning",
                                    confirmButtonColor: "#008000",
                                    position: "center",
                                    dangerMode: true
                                }).then((result) => {
                                    if (result.value) {
                                        Swal.fire({
                                            title: "Item unselected!",
                                            text: "You have just unselected " + uns.length + " row (s)!",
                                            icon: "success",
                                            type: "success"
                                        }).then(() => {
                                            //remove all active classes
                                            $("#serviceappalert").removeClass("alert alert-warning"),
                                                $("#grpshowhide-services").css("display", "none");
                                            $(".checkbox-services").prop("checked", false);
                                            $(".group-checkable-services").prop("checked", false);
                                            selected_arr_2 = [];
                                        });
                                        //ignore cancel
                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        Swal.fire(
                                            'Cancelled',
                                            'You cancelled highlights!',
                                            'error'
                                        );
                                    }

                                });
                            });
                });

                //async fetch 4: Prequalification categories get works/projects type
                $.ajax({
                    type: "POST",
                    url: "/Home/GetWorksCategory?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json4) {
                    //console.log(JSON.stringify({ ifpdata2: json2 }));
                    var td4 = $("#tbl_rfi_works"),
                        p4 = td4.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: {
                                aria: {
                                    sortAscending: ": activate to sort column ascending",
                                    sortDescending: ": activate to sort column descending"
                                },
                                emptyTable: "No data available in table",
                                info: "Showing _START_ to _END_ of _TOTAL_ records",
                                infoEmpty: "No records found",
                                infoFiltered: "(filtered1 from _MAX_ total records)",
                                lengthMenu: "Show _MENU_",
                                search: "Search:",
                                zeroRecords: "No matching records found",
                                paginate: {
                                    previous: "Prev",
                                    next: "Next",
                                    last: "Last",
                                    first: "First"
                                }
                            },
                            bStateSave: !0,
                            columnDefs: [
                                { orderable: !0, defaultContent: "-", targets: "_all" },
                                { searchable: !0, targets: "_all" }
                            ],
                            order: [[0, "asc"]],
                            bDestroy: true,
                            info: false,
                            processing: true,
                            retrieve: true
                        });

                    $(this).parents("tr").addClass("odd gradeX");
                    for (var i = 0; i < json4.length; i++) {
                        p4.fnAddData([
                            '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
                            '<input type="checkbox" class="checkbox-works" value="' + json4[i].Prequalification_Category_ID + '" /><span></span>' +
                            '</label>',
                            json4[i].Prequalification_Category_ID,
                            json4[i].Description,
                            json4[i].Special_Group_Reservation,
                            json4[i].Tender_Box_Location_Code,
                            ' <div class="btn-group">' +
                                '<button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions' +
                                '<i class="fa fa-angle-down"></i>' +
                            '</button>' +
                            '<ul class="dropdown-menu pull-left" role="menu">' +
                                '<li>' +
                                    '<a href="javascript:;">' +
                                '<i class="icon-docs"></i> Respond to Unique Requirements</a>' +
                                '</li>' +
                            '<li>' +
                                '<a href="javascript:;">' +
                                '<i class="icon-tag"></i> Select Regions </a>' +
                            '</li>' +
                            '</ul>' +
                            '</div>'
                        ]);
                    }

                  td4.on("change",
                            "tbody tr .checkbox-works",
                            function () {
                                var t = jQuery(this).is(":checked"), selected_arr_3 = [];
                                t ? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active"),
                                        $("#grpshowhide-works").css("display", "block"), $("#worksappalert")
                                            .addClass("alert alert-warning"))
                                    : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"),
                                        $("#grpshowhide-works").css("display", "none"), $("#worksappalert")
                                            .removeClass("alert alert-warning"));

                                // Read all checked checkboxes
                                $("input:checkbox[class=checkbox-works]:checked").each(function () {
                                    selected_arr_3.push($(this).val());
                                });

                                if (selected_arr_3.length > 0) {
                                    $("#worksappalert").addClass("alert alert-warning");
                                    $("#grpshowhide-works").css("display", "block");
                                } else {
                                    $("#worksappalert").removeClass("alert alert-warning");
                                    $("#grpshowhide-works").css("display", "none");
                                    selected_arr_3 = [];
                                }
                            });
                    
                    var selected_arr_3 = [];
                    $(".insertselected-works").on("click",
                            function (e) {
                                e.preventDefault();
                                // Read all checked checkboxes
                                $("input:checkbox[class=checkbox-works]:checked").each(function () {
                                    selected_arr_3.push($(this).val());
                                });

                                var postData = {
                                    DocumentNo: $("#txtIfApplicationNo").val(),
                                    RfiDocumentNo: $('#txtIfpNo').val(),
                                    ProcurementCategory: selected_arr_3
                                };

                                Swal.fire({
                                    title: "Save selected categories?",
                                    text: "You are about to save " + selected_arr_3.length + " rows!",
                                    type: "warning",
                                    showCancelButton: true,
                                    closeOnConfirm: true,
                                    confirmButtonText: "It's OK, save 'em!",
                                    confirmButtonClass: "btn-warning",
                                    confirmButtonColor: "#008000",
                                    position: "center",
                                    dangerMode: true
                                }).then((result) => {
                                    if (result.value) {
                                        //get value of result and switch it down here
                                        $.ajaxSetup({
                                            global: false,
                                            url: "/Home/InsertResponseLines",
                                            type: "POST",
                                            beforeSend: function () {
                                                $(".modalspinner").show();
                                            },
                                            complete: function () {
                                                $(".modalspinner").hide();
                                            }
                                        });

                                        $.ajax({
                                            data: '{postData: ' + JSON.stringify(postData) + '}',
                                            dataType: "json",
                                            cache: false,
                                            async: true,
                                            contentType: "application/json"
                                        }).done(function (status) {
                                            var splitstatus = status.split('*');
                                            switch (splitstatus[0]) {
                                            case "success":
                                                Swal.fire({
                                                    title: "Categories inserted successfully!",
                                                    text: "You have inserted " + selected_arr_3.length + " rows!",
                                                    icon: "success",
                                                    type: "success"
                                                }).then(() => {
                                                    var uns = $(".checkbox-works").prop("checked", false);
                                                    uns.each(function () {
                                                        $(this).parents("tr").removeClass("active");
                                                    });
                                                    //show messages for successfull inserts
                                                    $("#worksappalert").removeClass("alert alert-warning");
                                                    $("#grpshowhide-works").css("display", "none");
                                                    App.alert({
                                                        container: "#rfi_works_alert",
                                                        place: "append",
                                                        type: "success",
                                                        message: splitstatus[1],
                                                        close: true,
                                                        reset: true,
                                                        focus: true,
                                                        closeInSeconds: 5,
                                                        icon: "check"
                                                    });
                                                    selected_arr_3 = [], postData={};
                                                });

                                                break;
                                            default:
                                                Swal.fire({
                                                    title: "An Error Occured!",
                                                    text: splitstatus[1],
                                                    icon: "warning",
                                                    type: "error"
                                                }).then(() => {
                                                    var uns = $(".checkbox-works").prop("checked", false);
                                                    uns.each(function () {
                                                        $(this).parents("tr").removeClass("active");
                                                    });
                                                    //show messages for erroneos inserts
                                                    $("#worksappalert").removeClass("alert alert-warning");
                                                    $("#grpshowhide-works").css("display", "none");

                                                    App.alert({
                                                        container: "#rfi_works_alert",
                                                        place: "append",
                                                        type: "danger",
                                                        message: splitstatus[1],
                                                        close: true,
                                                        reset: true,
                                                        focus: true,
                                                        closeInSeconds: 5,
                                                        icon: "warning"
                                                    });
                                                    selected_arr_3 = [], postData = {};
                                                });
                                                break;
                                            }
                                        });

                                    }
                                });
                               
                            }),
                        $(".cancelselected-works").on("click",
                            function (e) {
                                e.preventDefault();
                                // uncheck checked checkboxes
                                var uns = $(".checkbox-works").prop("checked", false);
                                uns.each(function () {
                                    $(this).parents("tr").removeClass("active");
                                });

                                Swal.fire({
                                    title: "Unselected Row (s)",
                                    text: "Unselect all " + uns.length + " visible row (s)!",
                                    type: "warning",
                                    showCancelButton: false,
                                    closeOnConfirm: true,
                                    confirmButtonText: "It's OK, uncheck it!",
                                    confirmButtonClass: "btn-warning",
                                    confirmButtonColor: "#008000",
                                    position: "center",
                                    dangerMode: true
                                }).then((result) => {
                                    if (result.value) {
                                        Swal.fire({
                                            title: "Item unselected!",
                                            text: "You have just unselected all " + uns.length + " visible row (s)!",
                                            icon: "success",
                                            type: "success"
                                        }).then(() => {
                                            //remove all active classes
                                            $("#worksappalert").removeClass("alert alert-warning"),
                                            $("#grpshowhide-works").css("display", "none");
                                            $(".checkbox-works").prop("checked", false);
                                            $(".group-checkable-works").prop("checked", false);
                                            selected_arr_3 = [];
                                        });
                                        //ignore cancel
                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        Swal.fire(
                                            'Cancelled',
                                            'You cancelled highlights!',
                                            'error'
                                        );
                                    }

                                });
                            });
                   });

                ////end ajax call here
            }

        );
    };
    
    var optends = function () {
        var tl = $("#tbl_open_tenders_n"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                    }
                ],
                order: [
                    [0, "asc"]
                ],

                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/GetOpentenderList",
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    '<a class="go_respond" href="javascript:;">' + json[i].Code + '</a>',
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    new Date(json[i].Submission_End_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Project_ID
                ]);
            }
        });
        tl.on("click",
            ".go_respond",
            function (tl) {
                tl.preventDefault();
                //toggle divs
                $('#tenderslistdiv').css("display", "none");
                $('#tender_details_div').css("display", "block");

                var i = $(this).parents("tr")[0];
                var linkval = i.cells[1].innerText;
               
                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "/Home/GetSingleItTender?ittpnumber=" + linkval,
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });

                //async fetch 2: Tab 1
                $.ajax({
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json) {
                    console.log(JSON.stringify({ iTendTest: json }));
                    for (var i = 0; i < json.length; i++) {
                        //populate tab 2
                        $("#txtTenderNoticeNo").val(json[i].Code);
                        $("#txtProcmethod").val(json[i].Procurement_Method);
                        $("#txtInvtNoticetype").val(json[i].Invitation_Notice_Type);
                        $("#txtPrebid").val(json[i].Enforce_Mandatory_Pre_bid_Visi);
                        $("#txtDocDate").val(new Date(json[i].Document_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtBidenvelopeType").val(json[i].Bid_Envelop_Type);
                        $("#txtExternalDocNo").val(json[i].External_Document_No);
                        $("#txtSealedBids").val(json[i].Enforce_Mandatory_Pre_bid_Visi);
                        $("#txtRespCenter").val(json[i].Responsibility_Center);
                        $("#txtValidityDur").val(json[i].Tender_Validity_Duration);
                        $("#txtValidityExpry").val(new Date(json[i].Tender_Validity_Expiry_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtLocationCode").val(json[i].Location_Code);
                        $("#txtProductGroup").val(json[i].Requisition_Product_Group);
                        $("#txtSpecialGrp").val(json[i].Mandatory_Special_Group_Reserv);
                        $("#txtLotNo").val(json[i].Lot_No);
                        $("#txtDocStatus").val(json[i].Document_Status);
                        $("#txtTargetBidder").val(json[i].Target_Bidder_Group);
                        $("#txtBidSubMethd").val(json[i].Bid_Submission_Method);
                        $("#txtBidSelctnMethd").val(json[i].Bid_Selection_Method);
                        $("#txtLanguageCode").val(json[i].Language_Code);
                        $("#txtTenderDescription").val(json[i].Tender_Summary);
                        $("#txtSubmisionEndDate").val(new Date(json[i].Submission_End_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtAddress2").val(json[i].Address_2);
                        $("#txtSubEndTime").val(json[i].Submission_Start_Time);
                        $("#txtPostaCode").val(json[i].Post_Code);
                        $("#txtPrebidMeetDte").val(new Date(json[i].Mandatory_Pre_bid_Visit_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtCity").val(json[i].City);
                        $("#txtPrebidMtAddress").val(json[i].Prebid_Meeting_Address);
                        $("#txtCountry").val(json[i].Country_Region_Code);
                        $("#txtBidOpendate").val(new Date(json[i].Bid_Opening_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtPhoneNo").attr("href", "tel:" + json[i].Phone_No);
                        $("#txtPhoneNo").text(json[i].Phone_No);
                        $("#txtBidOpenTime").val(json[i].Bid_Opening_Time);
                        $("#hrefEmail").attr("href", "mailto:" + json[i].E_Mail);
                        $("#hrefEmail").text(json[i].E_Mail);
                        $("#txtBidOpenVenue").val(json[i].Bid_Opening_Venue);
                        $("#txtTenderBoxLoc").val(json[i].Tender_Box_Location_Code);
                        $("#txtProcEntityName").val(json[i].Procuring_Entity_Name_Contact);
                        $("#txtPriTendSubAddress").val(json[i].Primary_Tender_Submission);

                        ////Tab 3 populate Tender requirements
                        $("#txtBidsecReq").val(json[i].Bid_Tender_Security_Required);
                        $("#txtPerfSecReqs").val(json[i].Performance_Security_Required);
                        $("#txtBidSecPercent").val(json[i].Bid_Security);
                        $("#txtPerfSecpercent").val(json[i].Performance_Security);
                        $("#txtBidSecAmnt").val((json[i].Bid_Security_Amount_LCY).toFixed(2));
                        $("#txtAdvpaySecRequired").val(json[i].Advance_Payment_Security_Req);
                        $("#txtBidSec_validity").val(json[i].Bid_Security_Validity_Duration);
                        $("#txtAdvPaysecurity").val((json[i].Advance_Payment_Security).toFixed(2));
                        $("#txtBidsecXpDate").val(new Date(json[i].Bid_Security_Expiry_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtAdvAmountLmt").val((json[i].Advance_Amount_Limit).toFixed(2));
                        $("#txtInsurcoverRequired").val(json[i].Insurance_Cover_Required);
                        $("#txtBiddderArbappointer").val(json[i].Appointer_of_Bid_Arbitrator);

                        //$("#txtBidSecAmnt").val(json[i].Bid_Security_Amount_LCY);
                        //$("#txtAdvpaySecRequired").val(json[i].Advance_Payment_Security_Req);
                        //$("#txtBidSec_validity").val(json[i].Bid_Security_Validity_Duration);
                        //$("#txtAdvPaysecurity").val(json[i].Advance_Payment_Security);

                    }

                });

                //async fetch 3: addendums on click respond
                $.ajax({
                    type: "POST",
                    url: "/Home/FnGetTenderAddendums?invitationNo=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json3) {
                    console.log(JSON.stringify({ addendumshit: json3 }));
                    var td4 = $("#tbl_tender_addendum_n"),
                        p4 = td4.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: {
                                aria: {
                                    sortAscending: ": activate to sort column ascending",
                                    sortDescending: ": activate to sort column descending"
                                },
                                emptyTable: "No data available in table",
                                info: "Showing _START_ to _END_ of _TOTAL_ records",
                                infoEmpty: "No records found",
                                infoFiltered: "(filtered1 from _MAX_ total records)",
                                lengthMenu: "Show _MENU_",
                                search: "Search:",
                                zeroRecords: "No matching records found",
                                paginate: {
                                    previous: "Prev",
                                    next: "Next",
                                    last: "Last",
                                    first: "First"
                                }
                            },
                            bStateSave: !0,
                            columnDefs: [
                                { orderable: !0, defaultContent: "-", targets: "_all" },
                                { searchable: !0, targets: "_all" }
                            ],
                            order: [[0, "asc"]],
                            bDestroy: true,
                            info: false,
                            processing: true,
                            retrieve: true
                        });

                    for (var i = 0; i < json3.length; i++) {
                        p4.fnAddData([
                            '<a class="go_check_addendum" href="javascript:;">' + json3[i].Addendum_Notice_No + '</a>',
                            new Date(json3[i].Document_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                            json3[i].Description,
                            json3[i].Addendum_Instructions
                        ]);
                    }
                });
               
                //async fetch 3: purchase items
                $.ajax({
                    type: "POST",
                    url: "/Home/GetPurchaseItemsforSingleTender?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json) {
                   // console.log(JSON.stringify({ addendumshit: json3 }));
                    var td5 = $("#tbl_tender_purchase_items"),
                        p5 = td5.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: {
                                aria: {
                                    sortAscending: ": activate to sort column ascending",
                                    sortDescending: ": activate to sort column descending"
                                },
                                emptyTable: "No data available in table",
                                info: "Showing _START_ to _END_ of _TOTAL_ records",
                                infoEmpty: "No records found",
                                infoFiltered: "(filtered1 from _MAX_ total records)",
                                lengthMenu: "Show _MENU_",
                                search: "Search:",
                                zeroRecords: "No matching records found",
                                paginate: {
                                    previous: "Prev",
                                    next: "Next",
                                    last: "Last",
                                    first: "First"
                                }
                            },
                            bStateSave: !0,
                            columnDefs: [
                                { orderable: !0, defaultContent: "-", targets: "_all" },
                                { searchable: !0, targets: "_all" }
                            ],
                            order: [[0, "asc"]],
                            bDestroy: true,
                            info: false,
                            processing: true,
                            retrieve: true
                        });

                    var g = 1;
                    for (var i = 0; i < json.length; i++) {
                        p5.fnAddData([
                            g++,
                            json[i].Type,
                            json[i].No,
                            json[i].Description,
                            json[i].Quantity,
                            json[i].Unit_of_Measure_Code,
                            json[i].Amount_Excl_VAT
                        ]);
                    }
                });


                //async fetch 4: bid tender reqs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetBidTenderRequirments?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json6) {
                    console.log(JSON.stringify({ allreqit: json6 }));
                    var td6 = $("#tbl_bid_sec_reqs"),
                        p6 = td6.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: {
                                aria: {
                                    sortAscending: ": activate to sort column ascending",
                                    sortDescending: ": activate to sort column descending"
                                },
                                emptyTable: "No data available in table",
                                info: "Showing _START_ to _END_ of _TOTAL_ records",
                                infoEmpty: "No records found",
                                infoFiltered: "(filtered1 from _MAX_ total records)",
                                lengthMenu: "Show _MENU_",
                                search: "Search:",
                                zeroRecords: "No matching records found",
                                paginate: {
                                    previous: "Prev",
                                    next: "Next",
                                    last: "Last",
                                    first: "First"
                                }
                            },
                            bStateSave: !0,
                            columnDefs: [
                                { orderable: !0, defaultContent: "-", targets: "_all" },
                                { searchable: !0, targets: "_all" }
                            ],
                            order: [[0, "asc"]],
                            bDestroy: true,
                            info: false,
                            processing: true,
                            retrieve: true
                        });

                    for (var i = 0; i < json6.length; i++) {
                        p6.fnAddData([
                            json6[i].Form_of_Security,
                            json6[i].Security_Type,
                            json6[i].Nature_of_Security,
                            json6[i].Description,
                            json6[i].Security_Amount_LCY,
                            new Date(json6[i].Bid_Security_Validity_Expiry).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                          ]);
                    }
                });
                ////end ajax call here
            }

        );
    };

    var optendsSpg = function () {
        var tl = $("#special_grp_tbl_open_tenders_n"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                    }
                ],
                order: [
                    [0, "asc"]
                ],

                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/GetOpentenderSpecialGrpList",
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    new Date(json[i].Submission_End_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Project_ID,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
        tl.on("click",
            ".go_respond",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "/Home/GetIfpDetails?ifpnumber=" + i.cells[1].innerHTML,
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });

                ////end ajax call here
            }

        );
    };

    var rc = function () {
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/GetRepCenters",
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
            //populate dropdownlist here
            $.each(json,
                function(key, entry) {
                    var drlis = $('<option></option>').attr('value', entry.Code).text(entry.Name);
                    $(drlis).appendTo('#regions_centers');
                });

        });
        
    };

    var pg = function () {
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/GetProcTypes",
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
            //populate dropdownlist here
            $.each(json,
                function (key, entry) {
                    var drlis = $('<option></option>').attr('value', entry.Code).text(entry.Description);
                    $(drlis).appendTo('#prod_group');
                });

        });

    };

    var wks = function () {
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/FnGetWorksnCategory",
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
            //populate dropdownlist here
            $.each(json,
                function (key, entry) {
                    var drlis = $('<option></option>').attr('value', entry.Code).text(entry.Description);
                    $(drlis).appendTo('#works_cat_ddl');
                });

        });

    };

    var rgT = function () {
        var tl = $("#region_goods_tenders_n"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                    }
                ],
                order: [
                    [0, "asc"]
                ],

                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/TendersGoodsRegions",
            beforeSend: function () {
                $(".modalspinner").show();
            },
            complete: function () {
                $(".modalspinner").hide();
            }
        });

        //START
        $.ajax({
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
                    new Date(json[i].Submission_End_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Project_ID,
                    '<a class="go_respond" href="">Respond</a>'
                ]);
            }
        });
        tl.on("click",
            ".go_respond",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "/Home/GetIfpDetails?ifpnumber=" + i.cells[1].innerHTML,
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });

                ////end ajax call here
            }

        );
    };

    return {
        init: function() {
            e(), rfiresponse(), optends(), rc(), pg(),wks(), optendsSpg(), rgT();
        }
    }
}();
jQuery(document).ready(function() {
    Ld.init();
});
