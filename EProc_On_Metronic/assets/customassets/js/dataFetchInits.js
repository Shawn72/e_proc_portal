﻿'use-strict';
var Ld = function () {
    var e = function() {
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/VendorDetails",
            beforeSend: function () {
               // $(".modalspinner").show();
            },
            complete: function () {
              //  $(".modalspinner").hide();
            }
        });

        $(".modalspinner").show();
        $.ajax({
            data: ""
        }).done(function (json) {
            $(".modalspinner").hide();
          //  console.log(JSON.stringify({ vendorTestdata: json}));
            for (var i = 0; i < json.length; i++) {
                $("#txtDisVendorNo").val(json[i].No),
                $("#txtBznameRO").val(json[i].Name),
                $("#txtVATNo").val(json[i].VAT_Registration_No),
                $("#ddlBusinesstype").val(json[i].Business_Type);
                //$("#ddlVendortype").text(json[i].Supplier_Type),
              
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
                        loadRfiFiles.init();

                        for (var i = 0; i < json.length; i++) {
                            $("#txtIfpNo").val(json[i].Code);
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

    var debaredList = function() {
        var tl = $("#tbl_debarment_list"),
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
            url: "/Home/GetDebarmentList",
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Firm_Name,
                    json[i].Reason_Code,
                    json[i].Description,
                    new Date(json[i].Ineligibility_Start_Date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    new Date(json[i].Ineligibility_End_Date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' })
                ]);
            }
        });
    }

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
                    '<a class="go_respond" href="javascript:;">' + json[i].Code + '</a>',
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    new Date(json[i].Submission_End_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Bid_Scoring_Template
                ]);
            }
        });
        tl.on("click",
            ".go_respond",
            function (tl) {
                tl.preventDefault();
                //toggle divs
                $('#special_grp_tenderslistdiv').css("display", "none");
                $('#tender_details_div').css("display", "block");

                var i = $(this).parents("tr")[0];
                var linkval = i.cells[1].innerText;
                var bidscortemp = i.cells[6].innerText;
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
                    //console.log(JSON.stringify({ iTendTest: json }));
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
                    }
                });

                //async fetch 3: addendums on click respond
                $.ajax({
                    type: "POST",
                    url: "/Home/FnGetTenderAddendums?invitationNo=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json3) {
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
                    //console.log(JSON.stringify({ allreqit: json6 }));
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

                //async fetch 7: bid tender docs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTenderRequiredDocs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json7) {
                    //console.log(JSON.stringify({ allreqit: json7 }));
                    var td7 = $("#tbl_bid_req_docs"),
                        p7 = td7.dataTable({
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

                    for (var i = 0; i < json7.length; i++) {
                        p7.fnAddData([
                            json7[i].Procurement_Document_Type_ID,
                            json7[i].Description,
                            json7[i].Track_Certificate_Expiry,
                            json7[i].Requirement_Type

                        ]);
                    }
                });

                //async fetch 8: bid scope
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTenderRequiredDocs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json8) {
                    //console.log(JSON.stringify({ allreqit: json7 }));
                    var td8 = $("#tbl_bid_scope"),
                        p8 = td8.dataTable({
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

                    for (var i = 0; i < json8.length; i++) {
                        p8.fnAddData([
                            json8[i].Procurement_Document_Type_ID,
                            json8[i].Description,
                            json8[i].Track_Certificate_Expiry,
                            json8[i].Requirement_Type

                        ]);
                    }
                });

                //async fetch 9: bid reserved tender
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTenderRerved?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json9) {
                   // console.log(JSON.stringify({ reserved: json9 }));
                    var td9 = $("#tbl_bid_preserv_scheme"),
                        p9 = td9.dataTable({
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

                    for (var i = 0; i < json9.length; i++) {
                        p9.fnAddData([
                            json9[i].Restricted_Vendor_Category_ID,
                            json9[i].Description

                        ]);
                    }
                });


                //async fetch 10: eval crit
                $.ajax({
                    type: "POST",
                    url: "/Home/GetEvalCriteria?bidscoretemplate=" + bidscortemp,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json10) {
                    var td10 = $("#tbl_eval_criteria"),
                        p10 = td10.dataTable({
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

                    for (var i = 0; i < json10.length; i++) {
                        p10.fnAddData([
                            '<a class="go_check_evalcrit" href="javascript:;">' + json10[i].Code + '</a>',
                            json10[i].Description,
                            json10[i].Total_Preliminary_Checks_Score,
                            json10[i].Total_Technical_Evaluation,
                            json10[i].Total_Financial_Evaluation,
                            json10[i].Total_Assigned_Score_Weight
                        ]);
                    }

                    td10.on("click",
                        ".go_check_evalcrit",
                        function (td10) {
                            td10.preventDefault();
                            var i = $(this).parents("tr")[0];

                            //switch divs
                            $("#eval_crit_display").css("display", "none");
                            $("#eval_crit_details_display").css("display", "block");

                            //alert("clicked :" + i.cells[0].innerText);

                            //global loader spinner;
                            $.ajaxSetup({
                                global: false,
                                type: "POST",
                                url: "/Home/CalculateBidEvalCriteriaScores?templatenumber=" + i.cells[0].innerText,
                                beforeSend: function () {
                                    $(".modalspinner").show();
                                },
                                complete: function () {
                                    $(".modalspinner").hide();
                                }
                            });

                            $.ajax({
                                data: "",
                                async: true
                            }).done(function (json) {
                                var splitjson = json.split("*");

                                $("#txtPreliminaryEval").val(splitjson[0]),
                                $("#txtTechnicalEval").val(splitjson[1]),
                                $("#txtFinancialEval").val(splitjson[2]);

                            });

                            $.ajax({
                                type: "POST",
                                url: "/Home/GetBidEvalCriteriaScores?templatenumber=" + i.cells[0].innerText,
                                data: "",
                                cache: false,
                                async: true
                            }).done(function (json) {
                                var tds = $("#tbl_creit_details_v"),
                                    ps = tds.dataTable({
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

                                for (var i = 0; i < json.length; i++) {
                                    ps.fnAddData([
                                        json[i].Criteria_Group_ID,
                                        json[i].Description,
                                        json[i].Total_Weight
                                    ]);
                                }

                            });


                        });


                    ////end ajax call here

                });

                //async fetch 11: personel specs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetPersonelSpecs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json) {
                    var tds = $("#tbl_bid_personel_descr"),
                        ps = tds.dataTable({
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

                    for (var i = 0; i < json.length; i++) {
                        ps.fnAddData([
                            json[i].Staff_Role_Code,
                            json[i].Title_Designation_Description,
                            json[i].Staff_Category,
                            json[i].Min_No_of_Recomm_Staff,
                            json[i].Requirement_Type
                        ]);
                    }
                });

                //async fetch 12: equipment specs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTendeEqSpecs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json) {
                    var tds = $("#tbl_equip_specs"),
                        ps = tds.dataTable({
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

                    for (var i = 0; i < json.length; i++) {
                        ps.fnAddData([
                            json[i].Equipment_Type_Code,
                            json[i].Description,
                            json[i].Category,
                            json[i].Minimum_Required_Qty
                        ]);
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

        //on ID
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

        //on Class
        $.ajax({
            data: ""
        }).done(function (json) {
            //populate dropdownlist here
            $.each(json,
                function (key, entry) {
                    var drlis = $('<option></option>').attr('value', entry.Code).text(entry.Name);
                     $(drlis).appendTo('.regions_centers');

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

    var regionPwks = function () {

        var tl = $("#tbl_tenders_works_byregion"),
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
        var tnType = $(".loaded_tender_type").val();

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/GetRegionWorksCategory",
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    '<a class="go_respond_w" href="javascript:;">' + json[i].Code + '</a>',
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    new Date(json[i].Submission_End_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Bid_Scoring_Template
                ]);
            }
        });
        //onclick here

        tl.on("click",
            ".go_respond_w",
            function(tl) {
                tl.preventDefault();
                //toggle divs
                //$('#projectworks_byregion_list').css("display", "none");
                //$('#tndbyregion_details_2').css("display", "block");
               

                var i = $(this).parents("tr")[0];
                var linkval = i.cells[1].innerText;
                var bidscortemp = i.cells[6].innerText;
                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "/Home/GetSingleItTender?ittpnumber=" + linkval,
                    beforeSend: function() {
                        $(".modalspinner").show();
                    },
                    complete: function() {
                        $(".modalspinner").hide();
                    }
                });

                window.location = "/Home/TendersList/";


            });


    };

    var addendumList = function () {

        var td4 = $("#tbl_addendum_list"),
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

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "/Home/FnAllTenderAddendums",
            beforeSend: function () {
                $(".modalspinner").show();
            },
            complete: function () {
                $(".modalspinner").hide();
            }
        });

        //async fetch 3: addendums list for menu
        $.ajax({
            data: "",
            cache: false,
            async: true
        }).done(function (json3) {
            for (var i = 0; i < json3.length; i++) {
                p4.fnAddData([
                    '<a class="go_check_addendum" href="javascript:;">' + json3[i].Addendum_Notice_No + '</a>',
                    new Date(json3[i].Document_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    '<a class="go_check_addendum" href="javascript:;">' + json3[i].Invitation_Notice_No + '</a>',
                    json3[i].Description,
                    json3[i].Tender_Description,
                    json3[i].Responsibility_Center
                
                ]);
            }


            td4.on("click",
                ".go_check_addendum",
                function(td4) {
                    td4.preventDefault();
                    var i = $(this).parents("tr")[0];

                    //switch divs
                    $("#addedum_show_list").css("display", "none");
                    $("#addendum_details").css("display", "block");

                    //alert("clicked :" + i.cells[0].innerText);

                    //global loader spinner;
                    $.ajaxSetup({
                        global: false,
                        type: "POST",
                        url: "/Home/FnSingleTenderAddendums?addendumnumber=" + i.cells[0].innerText,
                        beforeSend: function() {
                            $(".modalspinner").show();
                        },
                        complete: function() {
                            $(".modalspinner").hide();
                        }
                    });

                    $.ajax({
                        data: "",
                        async: true
                    }).done(function (json) {
                        for (var i = 0; i < json.length; i++) {
                            p4.fnAddData([
                                $("#txtAddendNoticeNo").val(json[i].Addendum_Notice_No),
                                $("#txtDocumentDte").val(new Date(json[i].Document_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })),
                                $("#txtTenderDescription").val(json[i].Tender_Description),
                                $("#txtInvNoticeNo").val(json[i].Invitation_Notice_No),
                                $("#txtResponsibilityCenter").val(json[i].Responsibility_Center),
                                $("#txtAddendumInstruct").val(json[i].Addendum_Instructions),
                                $("#txtDescription").val(json[i].Description),
                                $("#txtSubstartDate").val(new Date(json[i].New_Submission_Start_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })),
                                $("#txtBidOpentime").val(json[i].New_Submission_Start_Time),
                                $("#txtSubendTime").val(json[i].New_Submission_End_Time),
                                $("#txtPrebidMettingTime").val(json[i].New_Bid_Opening_Time),
                                $("#txtPrebidMettingDte").val(new Date(json[i].New_Prebid_Meeting_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })),
                                $("#txtBidopeningDte").val(new Date(json[i].New_Bid_Opening_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })),
                               
                            ]);
                        }

                    });
                });
        });

   }

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
              //  $(".modalspinner").show();
            },
            complete: function () {
               // $(".modalspinner").hide();
            }
        });

        //START
        $(".modalspinner").show();
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
            $(".modalspinner").hide();
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
            e(), rfiresponse(), rc(), pg(), wks(), optendsSpg(), rgT(), debaredList(), addendumList(), regionPwks();
        }
    }
}();

var optends = function() {
    var y = function () {
        var tnType = $(".loaded_tender_type").val();
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

        switch (tnType) {
        case "tenderbyregion":
            $.ajaxSetup({
                global: false,
                type: "POST",
                url: "/Home/TendersGoodsRegions"
                //,
                //beforeSend: function() {
                //    // $(".modalspinner").show();
                //},
                //complete: function() {
                //    // $(".modalspinner").hide();
                //}
            });

            break;

        default:
            $.ajaxSetup({
                global: false,
                type: "POST",
                url: "/Home/GetOpentenderList"
                //,
                //beforeSend: function() {
                //    // $(".modalspinner").show();
                //},
                //complete: function() {
                //    //$(".modalspinner").hide();
                //}
            });
            break;
        }

       
        $.ajax({
            data: "",
            beforeSend: function () {
                $(".modalspinner").show();
            },
            complete: function () {
               $(".modalspinner").hide();
            }
        }).done(function(json) {
           // $(".modalspinner").hide();
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    '<a class="go_respond" href="javascript:;">' + json[i].Code + '</a>',
                    json[i].External_Document_No,
                    json[i].Tender_Name,
                    json[i].Procurement_Type,
                    new Date(json[i].Submission_End_Date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Bid_Scoring_Template
                ]);
            }
           // $(".modalspinner").hide();
        });

        tl.on("click",
            ".go_respond",
            function(tl) {
                tl.preventDefault();
                switch (tnType) {
                case "tenderbyregion":
                    //toggle divs
                    $('#tender_by_region_div').css("display", "none");
                    $('#tndbyregion_details').css("display", "block");

                    break;

                default:
                    //toggle divs
                    $('#tenderslistdiv').css("display", "none");
                    $('#tender_details_div').css("display", "block");
                    break;
                }

                var i = $(this).parents("tr")[0];
                var linkval = i.cells[1].innerText;
                var bidscortemp = i.cells[6].innerText;

                //async fetch itt details as per user and determine if its draft
                $.ajax({
                    url: "/Home/FetchTenderResponseDetails?ittnumber=" + linkval,
                    data: "",
                    async: true
                }).done(function (json) {
                    var submissionstatus = "";
                    for (var i = 0; i < json.length; i++) {
                        //populate tab 2
                        submissionstatus = json[i].Document_Status;
                    }

                    // console.log(submissionstatus)
                    switch (submissionstatus) {
                    case "Draft":
                        // switch button accordingly
                        $(".continue_div").css("display", "block");
                        $(".apply_div").css("display", "none");
                        break;

                    default:
                        $(".continue_div").css("display", "none");
                        $(".apply_div").css("display", "block");

                        break;
                    }
                });

                //async fetch 2: Tab 1
                $.ajax({
                    type: "POST",
                    url: "/Home/GetSingleItTender?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true,
                    beforeSend: function () {
                        $(".modalspinner").show();
                    }
                }).done(function(json) {

                    for (var i = 0; i < json.length; i++) {
                        $(".btn_go_apply").attr("attr_ittnumber", json[i].Code);
                        //populate tab 2
                        $("#txtTenderNoticeNo").val(json[i].Code);
                        $("#txtProcmethod").val(json[i].Procurement_Method);
                        $("#txtInvtNoticetype").val(json[i].Invitation_Notice_Type);
                        $("#txtPrebid").val(json[i].Enforce_Mandatory_Pre_bid_Visi);
                        $("#txtDocDate").val(new Date(json[i].Document_Date).toLocaleDateString('en-US',
                            { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtBidenvelopeType").val(json[i].Bid_Envelop_Type);
                        $("#txtExternalDocNo").val(json[i].External_Document_No);
                        $("#txtSealedBids").val(json[i].Enforce_Mandatory_Pre_bid_Visi);
                        $("#txtRespCenter").val(json[i].Responsibility_Center);
                        $("#txtValidityDur").val(json[i].Tender_Validity_Duration);
                        $("#txtValidityExpry")
                            .val(new Date(json[i].Tender_Validity_Expiry_Date).toLocaleDateString('en-US',
                                { day: '2-digit', month: '2-digit', year: 'numeric' }));
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
                        $("#txtSubmisionEndDate").val(new Date(json[i].Submission_End_Date).toLocaleDateString('en-US',
                            { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtAddress2").val(json[i].Address_2);
                        $("#txtSubEndTime").val(json[i].Submission_Start_Time);
                        $("#txtPostaCode").val(json[i].Post_Code);
                        $("#txtPrebidMeetDte")
                            .val(new Date(json[i].Mandatory_Pre_bid_Visit_Date).toLocaleDateString('en-US',
                                { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtCity").val(json[i].City);
                        $("#txtPrebidMtAddress").val(json[i].Prebid_Meeting_Address);
                        $("#txtCountry").val(json[i].Country_Region_Code);
                        $("#txtBidOpendate").val(new Date(json[i].Bid_Opening_Date).toLocaleDateString('en-US',
                            { day: '2-digit', month: '2-digit', year: 'numeric' }));
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
                        $("#txtBidsecXpDate").val(new Date(json[i].Bid_Security_Expiry_Date).toLocaleDateString('en-US',
                            { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        $("#txtAdvAmountLmt").val((json[i].Advance_Amount_Limit).toFixed(2));
                        $("#txtInsurcoverRequired").val(json[i].Insurance_Cover_Required);
                        $("#txtBiddderArbappointer").val(json[i].Appointer_of_Bid_Arbitrator);

                        //$("#txtBidSecAmnt").val(json[i].Bid_Security_Amount_LCY);
                        //$("#txtAdvpaySecRequired").val(json[i].Advance_Payment_Security_Req);
                        //$("#txtBidSec_validity").val(json[i].Bid_Security_Validity_Duration);
                        //$("#txtAdvPaysecurity").val(json[i].Advance_Payment_Security);

                    }
                    $(".modalspinner").hide();

                });

                //async fetch 3: addendums on click respond
                $.ajax({
                    type: "POST",
                    url: "/Home/FnGetTenderAddendums?invitationNo=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json3) {
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
                            new Date(json3[i].Document_Date).toLocaleDateString('en-US',
                                { day: '2-digit', month: '2-digit', year: 'numeric' }),
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
                }).done(function(json) {
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
                }).done(function(json6) {
                    //console.log(JSON.stringify({ allreqit: json6 }));
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
                            new Date(json6[i].Bid_Security_Validity_Expiry).toLocaleDateString('en-US',
                                { day: '2-digit', month: '2-digit', year: 'numeric' }),
                        ]);
                    }
                });

                //async fetch 7: bid tender docs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTenderRequiredDocs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json7) {
                    //console.log(JSON.stringify({ allreqit: json7 }));
                    var td7 = $("#tbl_bid_req_docs"),
                        p7 = td7.dataTable({
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

                    for (var i = 0; i < json7.length; i++) {
                        p7.fnAddData([
                            json7[i].Procurement_Document_Type_ID,
                            json7[i].Description,
                            json7[i].Track_Certificate_Expiry,
                            json7[i].Requirement_Type
                        ]);
                    }
                });

                //async fetch 8: bid scope
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTenderRequiredDocs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json8) {
                    //console.log(JSON.stringify({ allreqit: json7 }));
                    var td8 = $("#tbl_bid_scope"),
                        p8 = td8.dataTable({
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

                    for (var i = 0; i < json8.length; i++) {
                        p8.fnAddData([
                            json8[i].Procurement_Document_Type_ID,
                            json8[i].Description,
                            json8[i].Track_Certificate_Expiry,
                            json8[i].Requirement_Type
                        ]);
                    }
                });

                //async fetch 9: bid reserved tender
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTenderRerved?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json9) {
                   // console.log(JSON.stringify({ reserved: json9 }));
                    var td9 = $("#tbl_bid_preserv_scheme"),
                        p9 = td9.dataTable({
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

                    for (var i = 0; i < json9.length; i++) {
                        p9.fnAddData([
                            json9[i].Restricted_Vendor_Category_ID,
                            json9[i].Description
                        ]);
                    }
                });


                //async fetch 10: eval crit
                $.ajax({
                    type: "POST",
                    url: "/Home/GetEvalCriteria?bidscoretemplate=" + bidscortemp,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json10) {
                    var td10 = $("#tbl_eval_criteria"),
                        p10 = td10.dataTable({
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

                    for (var i = 0; i < json10.length; i++) {
                        p10.fnAddData([
                            '<a class="go_check_evalcrit" href="javascript:;">' + json10[i].Code + '</a>',
                            json10[i].Description,
                            json10[i].Total_Preliminary_Checks_Score,
                            json10[i].Total_Technical_Evaluation,
                            json10[i].Total_Financial_Evaluation,
                            json10[i].Total_Assigned_Score_Weight
                        ]);
                    }

                    td10.on("click",
                        ".go_check_evalcrit",
                        function(td10) {
                            td10.preventDefault();
                            var i = $(this).parents("tr")[0];

                            //switch divs
                            $("#eval_crit_display").css("display", "none");
                            $("#eval_crit_details_display").css("display", "block");

                            //alert("clicked :" + i.cells[0].innerText);

                            //global loader spinner;
                            $.ajaxSetup({
                                global: false,
                                type: "POST",
                                url: "/Home/CalculateBidEvalCriteriaScores?templatenumber=" + i.cells[0].innerText,
                                beforeSend: function() {
                                    $(".modalspinner").show();
                                },
                                complete: function() {
                                    $(".modalspinner").hide();
                                }
                            });

                            $.ajax({
                                data: "",
                                async: true
                            }).done(function(json) {
                                var splitjson = json.split("*");

                                $("#txtPreliminaryEval").val(splitjson[0]),
                                    $("#txtTechnicalEval").val(splitjson[1]),
                                    $("#txtFinancialEval").val(splitjson[2]);

                            });

                            $.ajax({
                                type: "POST",
                                url: "/Home/GetBidEvalCriteriaScores?templatenumber=" + i.cells[0].innerText,
                                data: "",
                                cache: false,
                                async: true
                            }).done(function(json) {
                                var tds = $("#tbl_creit_details_v"),
                                    ps = tds.dataTable({
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

                                for (var i = 0; i < json.length; i++) {
                                    ps.fnAddData([
                                        json[i].Criteria_Group_ID,
                                        json[i].Description,
                                        json[i].Total_Weight
                                    ]);
                                }

                            });


                        });


                    ////end ajax call here

                });

                //async fetch 11: personel specs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetPersonelSpecs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json) {
                    var tds = $("#tbl_bid_personel_descr"),
                        ps = tds.dataTable({
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

                    for (var i = 0; i < json.length; i++) {
                        ps.fnAddData([
                            json[i].Staff_Role_Code,
                            json[i].Title_Designation_Description,
                            json[i].Staff_Category,
                            json[i].Min_No_of_Recomm_Staff,
                            json[i].Requirement_Type
                        ]);
                    }
                });

                //async fetch 12: equipment specs
                $.ajax({
                    type: "POST",
                    url: "/Home/GetTendeEqSpecs?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json) {
                    var tds = $("#tbl_equip_specs"),
                        ps = tds.dataTable({
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

                    for (var i = 0; i < json.length; i++) {
                        ps.fnAddData([
                            json[i].Equipment_Type_Code,
                            json[i].Description,
                            json[i].Category,
                            json[i].Minimum_Required_Qty
                        ]);
                    }
                });

                //async fetch sharepoint docs 
                $.ajax({
                    type: "POST",
                    url: "/Home/PopulateDocumentsfromSPTable?ittpnumber=" + linkval,
                    data: "",
                    cache: false,
                    async: true,
                    dataType: "json"
                }).done(function(json) {
                    var tl = $("#tbl_tender_documents"),
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

                    console.log(JSON.stringify(json))

                    l.fnClearTable();
                    var o = 1;
                    for (var i = 0; i < json.length; i++) {
                        l.fnAddData([
                            o++,
                            json[i].FileName,
                            '<a class="download_sfile" href="javascript:;" attr_filelink ="" >Download File</a>'
                        ]);
                    }
                });

                ////end ajax call here
            }
        );
    }
    return {
        init: function() {
            y();
        }
    }
}();
var loadRfiFiles = function() {
    var p = function() {
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

        //async fetch sharepoint docs 
        $.ajax({
            type: "POST",
            url: "/Home/PullRfIDocumentsfromSharePoint?rfiNumber=" + $("#txtIfApplicationNo").val(),
            data: "",
            cache: false,
            async: true,
            dataType: "json"
        }).done(function(json) {
            console.log(JSON.stringify({ testrfsDcs: json }));
            $("#ifpnum_id").val($("#txtIfApplicationNo").val());
            rt.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                rt.fnAddData([
                    o++,
                    json[i].FileName,
                    '<a class="delete_sfile" href="javascript:;" attr_delt_filelink ="" >Delete File</a>',
                    '<a class="downnload_sfile" href="javascript:;" attr_download_filelink ="" >Download File</a>'
                ]);
            }

            rt.on("click",
                ".delete_sfile",
                function(rt) {
                    var i = $(this).parents("tr")[0];
                    var filename = i.cells[1].innerText;

                   // alert($("#ifpnum_id").val());

                    rt.preventDefault();
                    //global loader spinner;
                    $.ajaxSetup({
                        global: false,
                        type: "POST",
                        url: "/Home/DeleteRfDocfromSharepoint?filename=" +
                            filename +
                            "&&ifpNumber=" +
                            $("#ifpnum_id").val(),
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
                        var deleteRes = json.split('*');
                        var respstatus = deleteRes[0];
                        switch (respstatus) {
                            case "delete_success":
                                Swal.fire
                                ({
                                    title: "File Deleted!",
                                    text: deleteRes[1],
                                    type: "success"
                                }).then(() => {
                                        App.alert({
                                            container: "#docs_feedback_alert",
                                            place: "append",
                                            type: "success",
                                            message: deleteRes[1],
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 5,
                                            icon: "check"
                                        });
                                    }
                                );
                                break;
                            default:
                                Swal.fire
                                ({
                                    title: "Error Occured while deleting..!",
                                    text: deleteRes[1],
                                    type: "error"
                                }).then(() => {
                                        App.alert({
                                            container: "#docs_feedback_alert",
                                            place: "append",
                                            type: "danger",
                                            message: deleteRes[1],
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 5,
                                            icon: "warning"
                                        });
                                    }
                                );
                                break;
                        }
                    });
                });

            rt.on("click",
                ".downnload_sfile",
                function (rt) {
                    var i = $(this).parents("tr")[0];
                    var filename = i.cells[1].innerText;
                    rt.preventDefault();
                    //global loader spinner;
                    $.ajaxSetup({
                        global: false,
                        type: "POST",
                        url: "/Home/DownloadRfDocfromSharepoint?filename=" +
                            filename +
                            "&&ifpNumber=" +
                            $("#ifpnum_id").val(),
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

                        var deleteRes = json.split('*');
                        var respstatus = deleteRes[0];
                        switch (respstatus) {
                        case "download_success":
                            Swal.fire
                            ({
                                title: "Your File is being downloaded!",
                                text: deleteRes[1],
                                type: "success"
                            }).then(() => {
                                    App.alert({
                                        container: "#docs_feedback_alert",
                                        place: "append",
                                        type: "success",
                                        message: deleteRes[1],
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 5,
                                        icon: "check"
                                    });
                                }
                            );
                            break;
                        default:

                            Swal.fire
                            ({
                                title: "Error Occured while downloading..!",
                                text: "Could not Download file!",
                                type: "error"
                            }).then(() => {
                                    App.alert({
                                        container: "#docs_feedback_alert",
                                        place: "append",
                                        type: "danger",
                                        message: deleteRes[1],
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 5,
                                        icon: "warning"
                                    });
                                }
                            );
                            break;
                        }
                    });
                });
        });
    }
    return{
        init: function() {
            p();
        }
    }
}();

var suppregDocs = function() {
    var p = function() {
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
            url: "/Home/PullSupplierRegDocumentsfromSharePoint",
            data: ""
        }).done(function(json) {
            // console.log(JSON.stringify({ data: json }));
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].FileName,
                    '<a class="trash" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
            p();
        }
    }
}();

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
                            loadRfiFiles.init();
                            //po.init();
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

$('.btn_back_2_tenderlist').click(function () {
    var tnType = $(".loaded_tender_type").val();

    switch (tnType) {
        case "special":
            window.location = "/Home/SpecialGrpTenders";
            break;
        case "notspecial":
            window.location = "/Home/TendersList";
            break;
        case "tenderbyregion":
            window.location = "/Home/TenderByRegion";
            break;
    }
});

$('.btn_back_2_evalcrit').click(function () {
    //switch divs
    $("#eval_crit_display").css("display", "block");
    $("#eval_crit_details_display").css("display", "none");
});

$('.btn_back_2_addendumlist').click(function () {
    //switch divs
    var tnType = $(".loaded_tender_type").val();
    window.location = "/Home/ActiveAddendumNotices";
    $("#addendum_details").css("display", "none");
});

$('.button-go-back').click(function (e) {

    $("#tender_responses").css("display", "none");
    $("#tender_displays").css("display", "block");
});

$('.btn_go_apply').click(function (e) {

    //if (('.btn_go_apply').clicked == true) {
    //    alert("button was clicked");
    //}
    
    var ittNoticeNumber = $(".btn_go_apply").attr("attr_ittnumber");
   //load vendor details first
   // ittNoticeNumber = $(".btn_go_apply").attr("attr_ittnumber");
    $.ajax({
            type: "POST",
            url: "/Home/FetchTenderResponseDetails?ittnumber=" + ittNoticeNumber,
            data: "",
            cache: false,
            async: true,
            beforeSend: function () {
                $(".modalspinner").show();
            }
    }).done(function (json) {
        // $(".modalspinner").hide();
        var ittNumber = $(".btn_go_apply").attr("attr_ittnumber");
        var submissionstatus = "";
        $("#txtInvTenderNo").val(ittNumber);

            for (var i = 0; i < json.length; i++) {
                //populate tab 2
                $("#txtBidResponseNo").val(json[i].No); 
                $("#txtRepdesignation").val(json[i].Bidder_Representative_Desgn); 
                $("#txtbiddderName").val(json[i].Bidder_Representative_Name); 
                $("#txtBidChargeCode").val(json[i].Bid_Charge_Code);
                $("#txtBidChargeAmount").val(json[i].Bid_Charge_LCY); 
                $("#txtPaymentReference").val(json[i].Payment_Reference_No); 
                $("#txtInvTenderNo").val(json[i].Invitation_For_Supply_No);
                $("#txtVendorNo").val(json[i].Pay_to_Vendor_No);
                $("#txtVendorName").val(json[i].Pay_to_Name);
                $("#txtDocumentStatus").val(json[i].Document_Status);
                $("#txtTaxPinNo").val(json[i].VAT_Registration_No);

                submissionstatus = json[i].Document_Status;

                // Pre-load other response details.

                vendorpreference.init();
                ownerships.init();
                personnelExperience.init();
                pricinginformation.init();
                auditedbalancesheet.init();
                auditedincomestatement.init();
                keybidvendorbankaccounts.init();
                KeyBidLitigationsHistory.init();
                KeyBidVendorPastExperience.init();
                KeyBidTenderSecurity.init();
            }

        switch (submissionstatus) {
            case "Draft":
                //only switch divs after a successful inserts first
                $("#tender_responses").css("display", "block");
                $("#tender_displays").css("display", "none");

                $("#continue_div").css("display", "block");
                $("#save_div").css("display", "none");

                //initial load some data down here //to be deleted after test
                vendorpreference.init();
                ownerships.init();
                personnelExperience.init();
                pricinginformation.init();
                auditedbalancesheet.init();
                auditedincomestatement.init();
                keybidvendorbankaccounts.init();
                KeyBidLitigationsHistory.init();
                KeyBidVendorPastExperience.init();
                KeyBidTenderSecurity.init();
                break;
            
            default:
                //$("#continue_div").css("display", "block");
                //$("#save_div").css("display", "none");

                //Swal.fire
                //({
                //    title: "Tender Response Exception Error!",
                //    text: "You have already submitted the Tender Response. Kindly Await for Notifications",
                //    type: "error"
                //}).then(() => {
                //    App.alert({
                //        container: "#tenderesponsefeedbacks",
                //        place: "append",
                //        type: "danger",
                //        message: "Your application is not under Draft stage!",
                //        close: true,
                //        reset: true,
                //        focus: true,
                //        closeInSeconds: 5,
                //        icon: "warning"
                //    });
                //});

                //var ittNoticeNumber = $("#txtTenderNoticeNo").val();
                // Create a New Tender Response On Navision
                //Set data to be sent   
                $.ajax({
                    url: "/Home/SubmitTenderResponse?ittpnumber=" + ittNoticeNumber,
                    type: "POST",
                    data: "",
                    cache: false,
                    async: true,
                    dataType: "json",
                    beforeSend: function () {
                        $(".modalspinner").show();
                        // $(".btn_go_apply").attr('disabled', "disabled");
                    }
                }).done(function (status) {

                    var splitstatus = status.split("*");
                    switch (splitstatus[0]) {
                    case "success":
                        //do something
                        // Load Tender Response Details //NOTE:Load everything else after a successful insert / save to dB first

                        $("#tender_responses").css("display", "block");
                        $("#tender_displays").css("display", "none");

                        vendorpreference.init();
                        ownerships.init();
                        personnelExperience.init();
                        pricinginformation.init();
                        auditedbalancesheet.init();
                        auditedincomestatement.init();
                        keybidvendorbankaccounts.init();
                        KeyBidLitigationsHistory.init();
                        KeyBidVendorPastExperience.init();
                        KeyBidTenderSecurity.init();

                        break;
                    default:
                        Swal.fire
                        ({
                            title: "Tender Response Exception Error!",
                            text: splitstatus[1],
                            type: "error"
                        }).then(() => {
                            App.alert({
                                container: "#tenderesponsefeedbacks",
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
                    $(".modalspinner").hide();
                });


                break;
        }
          $(".modalspinner").hide();
        });
    
        //async fetch 2: tender details
        $.ajax({
            type: "POST",
            url: "/Home/FnPullSingeTenderDetailsrsp?ittpnumber=" + ittNoticeNumber,
            data: "",
            cache: false,
            async: true
        }).done(function (json) {
            $(".modalspinner").hide();
            for (var i = 0; i < json.length; i++) {
                //populate tab 2
                $("#txtBidChargeCode").val(json[i].Bid_Charge_Code);
                $("#txtBidenvelopeType").val(json[i].Bid_Envelop_Type);
                $("#txtInvtNoticetype").val(json[i].Invitation_Notice_Type);
                $("#txtRespCenter").val(json[i].Responsibility_Center);
                $("#txtDocDate").val(new Date(json[i].Document_Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                $("#txtTenderDescription").val(json[i].Tender_Summary);
            }

        });

        //async fetch : bid tender docs
        $.ajax({
            type: "POST",
            url: "/Home/DocumentTemplateList_TenderRes?ittpnumber=" + ittNoticeNumber,
            data: "",
            cache: false,
            async: true
        }).done(function (json7) {
            //console.log(JSON.stringify({ allreqit: json7 }));
            var td7 = $("#tbl_mandatory_docs_bidresponse"),
                p7 = td7.dataTable({
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
            var k = 1;
            for (var i = 0; i < json7.length; i++) {
                p7.fnAddData([
                    k++,
                    json7[i].Procurement_Document_Type_ID,
                    json7[i].Description,
                    json7[i].Requirement_Type

                ]);
            }
        });

        //async fetch Confidential Details: tender details
        $.ajax({
            type: "POST",
            url: "/Home/FetchTenderVendorDetails",
            data: "",
            cache: false,
            async: true
        }).done(function (json) {
            $(".modalspinner").hide();
            for (var i = 0; i < json.length; i++) {
                //populate Vendor Details
                $("#txtHouseNo").val(json[i].Building_House_No);
                $("#txtPlotNo").val(json[i].Plot_No);
                $("#txtBankName").val(json[i].Name);
                $("#txtStreet").val(json[i].Street);
                $("#txtBankName").val(json[i].Bank_Name);
                $("#txtBankBranch").val(json[i].Bank_Branch_Name);
                $("#txtKNTCAgent").val(json[i].KNTC_Agent);
                $("#txtBusinessType").val(json[i].Business_Type);
                $("#txtCapital").val(json[i].Nominal_Capital_LCY);
                $("#txtMaxValue").val(json[i].Max_Value_of_Business);
                $("#txtNatureBusiness").val(json[i].Nature_of_Business);
                $("#txtBankCode").val(json[i].Nature_of_Business);
                $("#txtTradeLisence").val(json[i].Trade_Licence_Expiry_Date);
            }
        });

});
//Fetch Vendor Preferences
var itttenderrseponse = $('#txtBidResponseNo').val();
var vendorpreference = function() {
    var e = function () {
        function e(e, t) {
            for (var n = e.fnGetData(t), a = $(">td", t), l = 0, r = a.length; l < r; l++) e.fnUpdate(n[l], t, l, !1);
            e.fnDraw();
        }

        function t(e, t) {
            var n = e.fnGetData(t),
                a = $(">td", t);

                //special groupes to the DropDownList.
                $.ajax({
                    url: "/Home/DynamicSpecialCatGroups",
                        datatype: "JSON",
                        type: "Get",
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                $('#ddlspecialgrpes').append('<option value="' +data[i].Code +'">' +data[i].Description +'</option>');
                            }
                        }
                }),

                a[0].innerHTML = '<input type="text" class="form-control input-small" value="' + n[0] + '">',
                a[1].innerHTML = '<select class="form-control select2" id="ddlspecialgrpes" name="ddlspecialgrpes" data_live_search = "true"><option value="">--select group--</option></select>',
                a[2].innerHTML = '<input type="text" class="form-control input-small" value="' + n[1] + '">',
                a[3].innerHTML =
                    '<div class="input-group input-medium date date-picker" data-date="12-02-2012" data-date-viewmode="years">' +
                    '<input type="text" class="form-control input-circle-left" readonly id="crtEffDte" value="' +n[2] +'">' +
                        '<span class="input-group-btn input-circle-right">' +
                            '<button class="btn default" type="button">' +
                                 '<i class="fa fa-calendar"></i>' +
                            '</button>' +
                        '</span>' +
                    '</div>',
                a[4].innerHTML =
                    '<div class="input-group input-medium date date-picker" data-date="12-02-2012" data-date-viewmode="years">' +
                        '<input type="text" class="form-control input-circle-left" readonly id="crtEXpDte" value="' +n[3] +'">' +
                        '<span class="input-group-btn input-circle-right">' +
                            '<button class="btn default" type="button">' +
                                '<i class="fa fa-calendar"></i>' +
                            '</button>' +
                        '</span>' +
                    '</div>',
                a[5].innerHTML = '<input type="text" class="form-control input-small" value="' + n[4] + '">',
                a[6].innerHTML = '<a class="edit_preference" href="">Save</a>',
                a[7].innerHTML = '<a class="cancel" href="">Cancel</a>';
        }

        function n(e, t) {
            var n = $("input", t);
                e.fnUpdate(n[0].value, t, 0, !1),
                e.fnUpdate($("#ddlspecialgrpes option:selected").text(), t, 1, !1),
                e.fnUpdate(n[1].value, t, 2, !1),
                e.fnUpdate($("#crtEffDte").val(), t, 3, !1),
                e.fnUpdate($("#crtEXpDte").val(), t, 4, !1),
                e.fnUpdate(n[4].value, t, 5, !1),
                e.fnUpdate('<a class ="edit_preference" href="">Edit</a>', t, 6, !1),
                e.fnUpdate('<a class ="delete_preference" href="">Delete</a>', t, 7, !1),
                e.fnDraw();
        }

        var a = $("#tbl_getVendor_Prefereneces"),
            l = a.dataTable({
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
            }),

        r = ($("#tbl_getVendor_Prefereneces_wrapper"), null),
            o = !1;

        $('body').on('click', '.date-picker', function () {
            $(this).datepicker('destroy').datepicker({ showOn: 'focus' }).focus();
        });

        $("#btn_add_preference_new").click(function(e) {
            if (e.preventDefault(), o && r) {
                if (!confirm("Previous row not saved. Do you want to save it ?"))
                    return l.fnDeleteRow(r), r = null, void (o = !1);
                n(l, r), $(r).find("td:first").html("Untitled"), r = null, o = !1
            }
            var a = l.fnAddData(["", "", "", "", "", "", "", ""]),
                i = l.fnGetNodes(a[0]);
            t(l, i), r = i, o = !0;
        });
            $.ajaxSetup({
                global: false,
                type: "POST",
                url: "/Home/GetVendorPreferenceDetails?ittresponsenumber=" + itttenderrseponse,
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    json[i].AGPO_Certificate_No,
                    json[i].Registered_Special_Group,
                    json[i].Products_Service_Category,
                    new Date(json[i].Certificate_Effective_Date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    new Date(json[i].Certificate_Expiry_Date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    json[i].Certifying_Agency,
                    '<a class="edit_preference" href="">Edit</a>',
                    '<a class="delete_preference" href="">Delete</a>'
                ]);
            }
        });
            a.on("click",
                ".delete_preference",
                function(e) {
                    if (e.preventDefault(), 0 != confirm("Are you sure to delete this row ?")) {
                        var t = $(this).parents("tr")[0];
                        l.fnDeleteRow(t),
                            alert("Deleted! functionality under development on the backend)");
                        //put delete code here below

                        //end delete code
                    }
                }), a.on("click",
                ".cancel",
                function(t) {
                    t.preventDefault(), o ? (l.fnDeleteRow(r), r = null, o = !1) : (e(l, r), r = null);
                }), a.on("click",
                ".edit_preference",
                function(a) {
                    a.preventDefault(), o = !1;
                    var i = $(this).parents("tr")[0];
                    if (null !== r && r != i) {
                        (e(l, r), t(l, i), r = i);
                    } else if (r == i && "Save" == this.innerHTML) {
                        (n(l, r), r = null);
                        //To prevent form submit after ajax call
                       
                        //reset to empty
                        $("#prefsfeedback").html("");
                        var preferencemodel = {};
                        //dropdownlists

                        //input textfields
                        preferencemodel.BidPrefRespNo = $("#txtBidResponseNo").val();
                        preferencemodel.BidPrefAgpoCertNo = i.cells[0].innerHTML;
                        preferencemodel.BidPrefRegisteredGrpe = i.cells[1].innerHTML;
                        preferencemodel.BidPrefProductServiceCat = i.cells[2].innerHTML;
                        preferencemodel.BidPrefAgpoCertEffDte = i.cells[3].innerHTML;
                        preferencemodel.BidPrefAgpoCertExpDte = i.cells[4].innerHTML;

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed to add a preference?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Add Preference!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddaPreference",
                                    type: "POST",
                                    data: '{preferencemodel: ' + JSON.stringify(preferencemodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function(status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Preference Added!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#prefsfeedback").css("display", "block");
                                                $("#prefsfeedback").css("color", "green");
                                                $('#prefsfeedback').addClass("alert alert-success");
                                                $("#prefsfeedback").html(splitstatus[1]);
                                                // console.log('Bank info submitted : ' + JSON.stringify(bankmodel));

                                            });
                                            break;
                                        default:
                                            Swal.fire
                                            ({
                                                title: "Error!!!",
                                                text: splitstatus[1],
                                                type: "error"
                                            }).then(() => {
                                                $("#prefsfeedback").css("display", "block");
                                                $("#prefsfeedback").css("color", "red");
                                                $('#prefsfeedback').addClass('alert alert-danger');
                                                $("#prefsfeedback").html(splitstatus[1]);
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

                        ////end ajax call here

                    } else {
                        (t(l, i), r = i);
                    }
                });
    }
    return {
        init: function() {
            e();
        }
    }
}();

//Get/Fetch Directors Ownerships Detailstbl_pricing_information
var ittTenderResponseNumber = $("#txtBidResponseNo").val();
var ownerships = function () {
    var on = function() {
        var tl = $("#tbl_ownership_list"),
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
            url: "/Home/GetDirectorOwnership?ittresponsenumber=" + ittTenderResponseNumber,
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
            l.fnClearTable();
           // console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Name,
                    json[i].Address,
                    json[i].Post_Code,
                    json[i].Address_2,
                    json[i].City,
                    json[i].Phone_No,
                    json[i].Country_Region_Code,
                    json[i].Nationality_ID
                ]);
            }
        });
    }
    return {
        init: function() {
            on();
        }
    }
}();
//Get/Fetch Directors Pricing Details
var ittBidResponseNumber = $("#txtBidResponseNo").val();
var pricinginformation = function() {
    var price = function() {
        var tl = $("#tbl_pricing_information"),
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
            url: "/Home/GetBidResponseItemsLines",
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
            l.fnClearTable();
          //  console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Type,
                    json[i].No,
                    json[i].Description,
                    json[i].Location_Code,
                    json[i].Quantity,
                    json[i].Unit_of_Measure,
                    json[i].Direct_Unit_Cost,
                    json[i].VAT,
                    json[i].Amount_Including_VAT,
                    json[i].Amount_Including_VAT
                ]);
            }
        });
    }
    return {
        init: function() {
            price();
        }
    }
}();
//Get/Fetch Key Staff Personnel Experience Details
var ittBidKeyResponseNumber = $("#txtBidResponseNo").val();
var personnelExperience = function() {
    var personnel = function() {
        var tl = $("#tbl_keystaff_experience"),
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
            url: "/Home/GetBidResponseStaffQualificationss?bidresponsenumber=" + ittBidKeyResponseNumber,
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
            l.fnClearTable();
          //  console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Staff_No,
                    json[i].Proposed_Project_Role_ID,
                    json[i].Qualification_Category,
                    json[i].Years_of_Experience,
                    json[i].Experience_From_Year,
                    json[i].Experience_To_Year,
                    '<a class="edit_preferenece" href="">Edit</a>',
                    '<a class="delete_preferenece" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function() {
            personnel();
        }
    }
}();
   //Get All AuditedBalance Sheet Details
var auditedbalancesheet = function() {
    var auditedbalance = function() {
        var tl = $("#tbl_audited-balancesheet"),
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
            url: "/Home/GetBidResponseAuditBalanceSheet",
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
            l.fnClearTable();
            //console.log(JSON.stringify({ vendorTestdata: json }));
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
                    json[i].Debt_Ratio,
                    json[i].Current_Ratio,
                    '<a class="delete_aud_bal_sheet" href="">Delete</a>'
                ]);
            }
        });

        tl.on("click",
            ".delete_aud_bal_sheet",
            function(tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

                // alert(i.cells[1].innerHTML);

                Swal.fire({
                    title: "Delete Entry?",
                    text: "Sure you'd like to proceed with deletion?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, delete balance sheet entry!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "#008000",
                    position: "center"
                }).then((result) => {
                    if (result.value) {

                         //global loader spinner;
                        $.ajaxSetup({
                            global: false,
                            type: "POST",
                            url: "/Home/DeleteBidAuditedBalSheetentry?yearCode=" + i.cells[1].innerHTML,
                            beforeSend: function() {
                                $(".modalspinner").show();
                            },
                            complete: function() {
                                $(".modalspinner").hide();
                            }
                        });

                        $.ajax({
                            data: ''
                        }).done(function (status) {
                                var splitstatus = status.split('*');
                                switch (splitstatus[0]) {
                                case "success":
                                    Swal.fire
                                    ({
                                        title: "Entry Deleted!",
                                        text: "Entry Deleted Successfully!",
                                        type: "success"
                                    }).then(() => {
                                        App.alert({
                                            container: "#financialstatsfeedback",
                                            place: "append",
                                            type: "success",
                                            message: "Entry Removed Successfully, You can add it again!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 5,
                                            icon: "check"
                                        });
                                    });
                                    auditedbalancesheet.init()

                                    break;
                                default:
                                    Swal.fire
                                    ({
                                        title: "Error!",
                                        text: "Error occured while deleting..",
                                        type: "error"
                                    }).then(() => {
                                        App.alert({
                                            container: "#financialstatsfeedback",
                                            place: "append",
                                            type: "danger",
                                            message: "Could not delete the entry!",
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
                            'You cancelled your deletion!',
                            'error'
                        );
                    }
            });

            });
     }
    return {
        init: function() {
            auditedbalance();
        }
    }
}();
    //Get All AuditedIncomeStatement  Details
var auditedincomestatement = function() {
    var statement = function() {
        var tl = $("#tbl_audit_incomestatement_"),
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
            url: "/Home/GetBidResponseAuditIncomeStatement",
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
            l.fnClearTable();
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Audit_Year_Code_Reference,
                    json[i].Total_Revenue_LCY,
                    json[i].Total_COGS_LCY,
                    json[i].Gross_Margin_LCY,
                    json[i].Operating_Income_EBIT_LCY,
                    json[i].Interest_Expense_LCY,
                    json[i].Income_Before_Taxes_LCY,
                    json[i].Income_Tax_Expense_LCY,
                    '<a class="delete_audinc_statement" href="">Delete</a>'
                ]);
            }
        });

        tl.on("click",
            ".delete_audinc_statement",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

                alert("record to be deleted: "+i.cells[1].innerHTML);

                //Swal.fire({
                //    title: "Delete Entry?",
                //    text: "Sure you'd like to proceed with deletion?",
                //    type: "warning",
                //    showCancelButton: true,
                //    closeOnConfirm: true,
                //    confirmButtonText: "Yes, delete balance sheet entry!",
                //    confirmButtonClass: "btn-success",
                //    confirmButtonColor: "#008000",
                //    position: "center"
                //}).then((result) => {
                //    if (result.value) {

                //        //global loader spinner;
                //        $.ajaxSetup({
                //            global: false,
                //            type: "POST",
                //            url: "/Home/DeleteBidAuditedBalSheetentry?yearCode=" + i.cells[1].innerHTML,
                //            beforeSend: function () {
                //                $(".modalspinner").show();
                //            },
                //            complete: function () {
                //                $(".modalspinner").hide();
                //            }
                //        });

                //        $.ajax({
                //            data: ''
                //        }).done(function (status) {
                //                var splitstatus = status.split('*');
                //                switch (splitstatus[0]) {
                //                case "success":
                //                    Swal.fire
                //                    ({
                //                        title: "Entry Deleted!",
                //                        text: "Entry Deleted Successfully!",
                //                        type: "success"
                //                    }).then(() => {
                //                        App.alert({
                //                            container: "#financialstatsfeedback",
                //                            place: "append",
                //                            type: "success",
                //                            message: "Entry Removed Successfully, You can add it again!",
                //                            close: true,
                //                            reset: true,
                //                            focus: true,
                //                            closeInSeconds: 5,
                //                            icon: "check"
                //                        });
                //                    });
                //                    auditedbalancesheet.init()

                //                    break;
                //                default:
                //                    Swal.fire
                //                    ({
                //                        title: "Error!",
                //                        text: "Error occured while deleting..",
                //                        type: "error"
                //                    }).then(() => {
                //                        App.alert({
                //                            container: "#financialstatsfeedback",
                //                            place: "append",
                //                            type: "danger",
                //                            message: "Could not delete the entry!",
                //                            close: true,
                //                            reset: true,
                //                            focus: true,
                //                            closeInSeconds: 5,
                //                            icon: "warning"
                //                        });
                //                    });
                //                    break;
                //                }
                //            }
                //        );
                //    } else if (result.dismiss === Swal.DismissReason.cancel) {
                //        Swal.fire(
                //            'Cancelled',
                //            'You cancelled your deletion!',
                //            'error'
                //        );
                //    }
                //});

            });
    }
    return {
        init: function() {
            statement();
        }
    }
}();
    //Get All BankAccounts  Details
var keybidvendorbankaccounts = function() {
    var bankaccount = function() {
        var tl = $("#tbl_bidvendor_banks"),
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
            url: "/Home/GetBidVendorBankAccounts",
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
            l.fnClearTable();
          //  console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Code,
                    json[i].Name,
                    json[i].Currency_Code,
                    json[i].Address,
                    json[i].Post_Code,
                    json[i].City,
                    json[i].Country_Region_Code,,
                    json[i].Phone_No,
                    json[i].Bank_Account_No,
                    '<a class="edit_preferenece" href="">Edit</a>',
                    '<a class="delete_preferenece" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function() {
            bankaccount();
        }
    }
}();
  //Get All KeyBidVendorPastExperience  Details
var KeyBidVendorPastExperience = function() {
    var experience = function() {
        var tl = $("#tbl_past_experience"),
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
            url: "/Home/GetBidVendorPastExperiences",
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
            l.fnClearTable();
          //  console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Client_Name,
                    json[i].Address,
                    json[i].Phone_No,
                    json[i].Country_Region_Code,
                    json[i].E_Mail,
                    json[i].Project_Scope_Summary,
                    json[i].Assignment_Project_Name,,
                    json[i].Contract_Ref_No,
                    json[i].Assignment_Value_LCY,
                    json[i].Assignment_Status,
                    '<a class="edit_preferenece" href="">Edit</a>',
                    '<a class="delete_preferenece" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function() {
            experience();
        }
    }
}();
    //Get All KeyBidVendorPastExperience  Details
var KeyBidLitigationsHistory = function() {
    var litigation = function() {
        var tl = $("#tb_litigation_history"),
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
            url: "/Home/GetBidLitigationsHistorys",
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
            l.fnClearTable();
           // console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Dispute_Matter,
                    json[i].Other_Dispute_Party,
                    json[i].Dispute_Amount_LCY,
                    json[i].Category_of_Matter,
                    json[i].Year,
                    json[i].Award_Type,
                    '<a class="edit_preferenece" href="">Edit</a>',
                    '<a class="delete_preferenece" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function() {
            litigation();
        }
    }
}();
//Get All KeyBidVendorPastExperience  Details
var KeyBidTenderSecurity = function () {
    var security = function () {
        var tl = $("#tbl_tender_security"),
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
            url: "/Home/GetBidContractKeySecurity",
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
          //  console.log(JSON.stringify({ vendorTestdata: json }));
            var o = 1;
            for (var i = 0; i < json.length; i++) {
                l.fnAddData([
                    o++,
                    json[i].Form_of_Security,
                    json[i].Security_Type,
                    json[i].Issuer_Institution_Type,
                    json[i].Issuer_Guarantor_Name,
                    json[i].Issuer_Registered_Offices,
                    json[i].Description,
                    json[i].Security_Amount_LCY, ,
                    json[i].Bid_Security_Effective_Date,
                    json[i].Bid_Security_Validity_Expiry,
                    '<a class="edit_preferenece" href="">Edit</a>',
                    '<a class="delete_preferenece" href="">Delete</a>'
                ]);
            }
        });
    }
    return {
        init: function () {
            security();
        }
    }
}();

//Get Equipment bidder Details
var KeyBidEquipment = function () {
    var eq = function () {
        var tl = $("#tbl_equipment"),
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
            url: "/Home/GetBidVendorPastExperiences",
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
                    json[i].Client_Name,
                    json[i].Address,
                    json[i].Phone_No,
                    json[i].Country_Region_Code,
                    json[i].E_Mail,
                    json[i].Project_Scope_Summary,
                    json[i].Assignment_Project_Name, ,
                    json[i].Contract_Ref_No,
                    json[i].Assignment_Value_LCY,
                    json[i].Assignment_Status
                ]);
            }
        });
    }
    return {
        init: function () {
            eq();
        }
    }
}();

jQuery(document).ready(function () {
    optends.init(), Ld.init(); //, suppregDocs.init();
});