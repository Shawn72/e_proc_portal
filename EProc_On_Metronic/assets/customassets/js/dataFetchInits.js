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
                //for the wizard
                $("#txtVndNo").val(json[i].No);
                $("#txtVndName").val(json[i].Name);

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

                //fetch RFI application No.
                $.ajax({
                    type: "POST",
                    url: "/Home/GetRfiApplicationNo?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (jsonk) {
                    console.log(JSON.stringify({ RfiApplicationNo: jsonk }));
                    $("#txtIfApplicationNo").val(jsonk);
                    //async fetch representative details
                    $.ajax({
                        type: "POST",
                        url: "/Home/GetRepDetails?rfidocpnumber=" + jsonk,
                        data: "",
                        cache: false,
                        async: true
                    }).done(function (json) {
                        console.log("Test IfP No: " + JSON.stringify({ repdetails: json }));
                        for (var i = 0; i < json.length; i++) {
                            $("#txtVndRepName").val(json[i].Vendor_Representative_Name);
                            $("#txtVendrepTitle").val(json[i].Vendor_Repr_Designation);
                        }
                    });
                });

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
                        var rfimodel = new Array();
                        $(".insertselected").on("click",
                            function(e) {
                                e.preventDefault();

                                // Read all checked checkboxes

                               
                                //$("input:checkbox[class=checkboxes]:checked").each(function () {
                                //    $(this).parents("tr").each(function () {
                                //        onerowitem.DocumentNo = $("#txtIfApplicationNo").val();
                                //        onerowitem.ProcurementCategory = $(this)[0].cells[1].innerHTML;
                                //        onerowitem.RfiDocumentNo = $("#txtIfpNo").val();
                                //        selected_arr.push(onerowitem);
                                //    });
                                //});

                                var onerowitem = {};
                                onerowitem.DocumentNo = $("#txtIfApplicationNo").val();
                                onerowitem.RfiDocumentNo = $("#txtIfpNo").val();
                                rfimodel.push(onerowitem);

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
                                    console.log(postData);
                                    console.log(JSON.stringify({ rfimodel: rfimodel }));
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
                                           // data:postData,
                                            data: '{postData: ' + JSON.stringify(postData) + '}',
                                            //data: JSON.stringify({ 'docNo': docNo, 'ifpNo': ifpNo, selected_arr }),
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
                                                        selected_arr = [], rfimodel=[];
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
                                                        selected_arr = [], rfimodel = [];
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
                                            alert("Test row data collected: " + JSON.stringify({ selectedIDs: selected_arr_2 }));
                                            selected_arr_2 = [];
                                        });
                                    }
                                    else if (result.dismiss === Swal.DismissReason.cancel) {
                                        Swal.fire(
                                            'Cancelled',
                                            'You cancelled highlights!',
                                            'error'
                                        );
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
                                var t = jQuery(this).is(":checked"), selected_arr_30 = [];
                                t ? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active"),
                                        $("#grpshowhide-works").css("display", "block"), $("#worksappalert")
                                            .addClass("alert alert-warning"))
                                    : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"),
                                        $("#grpshowhide-works").css("display", "none"), $("#worksappalert")
                                            .removeClass("alert alert-warning"));

                                // Read all checked checkboxes
                                $("input:checkbox[class=checkbox-works]:checked").each(function () {
                                    selected_arr_30.push($(this).val());
                                });

                                if (selected_arr_30.length > 0) {
                                    $("#worksappalert").addClass("alert alert-warning");
                                    $("#grpshowhide-works").css("display", "block");
                                } else {
                                    $("#worksappalert").removeClass("alert alert-warning");
                                    $("#grpshowhide-works").css("display", "none");
                                    selected_arr_30 = [];
                                }
                            });
                    //var selected_arr_3 = [];
                    //$("input[type='checkbox'].group-checkable-works").on("change",
                    //    function (e) {
                    //        e.preventDefault();
                    //        if ($(".group-checkable-works").prop("checked") == true) {
                    //            // Read all checked checkboxes
                    //            $("input:checkbox[class=checkbox-works]:checked").each(function () {
                    //                selected_arr_3.push($(this).val());
                    //            });

                    //            Swal.fire({
                    //                title: "All rows visible selected successfully!",
                    //                text: "You have selected " + selected_arr_3.length + " rows!", //You just unchecked all your selections!
                    //                icon: "success",
                    //                type: "success"
                    //            }).then(() => {
                    //                //show messages for successfull unselections
                    //                $("#grpshowhide-works").css("display", "block"),
                    //                    $("#worksappalert").addClass("alert alert-warning");
                    //            });
                    //        } else {
                    //            Swal.fire({
                    //                title: "Unselect all selections?",
                    //                text: "You're about to uncheck " + selected_arr_3.length + " rows!",
                    //                type: "warning",
                    //                showCancelButton: true,
                    //                closeOnConfirm: true,
                    //                confirmButtonText: "It's OK, uncheck 'em!",
                    //                confirmButtonClass: "btn-warning",
                    //                confirmButtonColor: "#008000",
                    //                position: "center",
                    //                dangerMode: true
                    //            }).then((result) => {
                    //                if (result.value) {
                    //                    //get value of result and switch it down here

                    //                    Swal.fire({
                    //                        title: "Categories unselected successfully!",
                    //                        text: "You have just unselected " + selected_arr_3.length + " rows!",
                    //                        icon: "success",
                    //                        type: "success"
                    //                    }).then(() => {
                    //                        //show messages for successfull unselections
                    //                        $("#grpshowhide-services").css("display", "none"),
                    //                            $("#worksappalert").removeClass("alert alert-warning");
                    //                        //set selected rows array to null
                    //                        selected_arr_3 = [];
                    //                    });

                    //                    //ignore cancel
                    //                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    //                    Swal.fire(
                    //                        'Cancelled',
                    //                        'You cancelled highlights!',
                    //                        'error'
                    //                    );
                    //                }
                    //            });
                    //        }
                    //    });
                    var selected_arr_3 = [];
                    $(".insertselected-works").on("click",
                            function (e) {
                                e.preventDefault();
                                // Read all checked checkboxes
                                $("input:checkbox[class=checkbox-works]:checked").each(function () {
                                    selected_arr_3.push($(this).val());
                                });

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

                                            alert("Test row data collected: " + JSON.stringify({ selectedIDs: selected_arr_3 }));
                                            selected_arr_3 = [];
                                        });
                                    }
                                    else if (result.dismiss === Swal.DismissReason.cancel) {
                                        Swal.fire(
                                            'Cancelled',
                                            'You cancelled highlights!',
                                            'error'
                                        );
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
    //var g = function() {
    //    var e = $("#tbl_rfi_services");
    //    e.dataTable({
    //        language: {
    //            aria: {
    //                sortAscending: ": activate to sort column ascending",
    //                sortDescending: ": activate to sort column descending"
    //            },
    //            emptyTable: "No data available in table",
    //            info: "Showing _START_ to _END_ of _TOTAL_ records",
    //            infoEmpty: "No records found",
    //            infoFiltered: "(filtered1 from _MAX_ total records)",
    //            lengthMenu: "Show _MENU_",
    //            search: "Search:",
    //            zeroRecords: "No matching records found",
    //            paginate: {
    //                previous: "Prev",
    //                next: "Next",
    //                last: "Last",
    //                first: "First"
    //            }
    //        },
    //        bStateSave: !0,
    //        lengthMenu: [
    //            [6, 15, 20, -1],
    //            [6, 15, 20, "All"]
    //        ],
    //        pageLength: 6,
    //        columnDefs: [
    //            {
    //                orderable: !1,
    //                targets: [0]
    //            }, {
    //                searchable: !1,
    //                targets: [0]
    //            }
    //        ],
    //        order: [
    //            [1, "asc"]
    //        ]
    //    });
    //    jQuery("#sample_3_wrapper");
    //    e.find(".group-checkable").change(function() {
    //        var e = jQuery(this).attr("data-set"),
    //            t = jQuery(this).is(":checked");
    //        jQuery(e).each(function() {
    //            t? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active"))
    //                : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"));
    //        });
    //    }), e.on("change",
    //        "tbody tr .checkboxes",
    //        function() {
    //            $(this).parents("tr").toggleClass("active");
    //        });
    //};
    return {
        init: function() {
            e(), rfiresponse();
        }
    }
}();
jQuery(document).ready(function() {
    Ld.init();
});