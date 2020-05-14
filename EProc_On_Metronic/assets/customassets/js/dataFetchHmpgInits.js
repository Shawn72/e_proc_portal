'use-strict';

var Ld = function () {
    var ifps = function() {
        var tl = $("#tbl_open_ifps"),
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
            }).done(function(json) {
                l.fnClearTable();
                var o = 1;
                for (var i = 0; i < json.length; i++) {
                    l.fnAddData([
                        o++,
                        json[i].Code,
                        json[i].Description,
                        json[i].Period_Start_Date,
                        json[i].Period_End_Date,
                        json[i].Tender_Box_Location_Code,
                        json[i].Submission_Start_Date,
                        '<a class="view_details" href="">View Details</a>'
                    ]);
                }
            });
        tl.on("click",
            ".view_details",
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

                //async fetch 1: IFP details fetch
                $.ajax({
                    data: "",
                    async: true
                }).done(function (json) {
                    $("#ifpdetailsdiv").css("display", "block");
                    $("#ifplistdiv").css("display", "none");
              
                    for (var i = 0; i < json.length; i++) {
                        $("#txtIfpnoticeNo").val(json[i].Code),
                        $("#txtXtDocNo").val(json[i].External_Document_No),
                        $("#txtareaDescription").val(json[i].Description),
                        $("#txtareaInvsummary").val(json[i].Tender_Summary),
                        $("#txtPreqstartdate").val(json[i].Period_Start_Date),
                        $("#txtPreqenddate").val(json[i].Period_End_Date),
                        $("#txtRegionIssuing").val(json[i].Tender_Box_Location_Code),
                        $("#txtPublishDate").val(json[i].Document_Date),
                        $("#txtSubmissionStartDate").val(json[i].Submission_Start_Date),
                        $("#txtSubmissionEndDate").val(json[i].Submission_End_Date);
                    }
                });

                //async fetch 2: Prequalification categories get
                $.ajax({
                    type: "POST",
                    url: "/Home/GetPreqcategories?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json2) {
                    console.log(JSON.stringify({ ifpdata2: json2 }));
                    var td2 = $("#tbl_ifp_category"),
                        p2 = td2.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: { lengthMenu: " _MENU_ records" },
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
                    for (var i = 0; i < json2.length; i++) {
                        p2.fnAddData([
                            json2[i].Prequalification_Category_ID,
                            json2[i].Description,
                            json2[i].Procurement_Type,
                            json2[i].Applicable_Location
                        ]);
                    }
                });

                //async fetch 3: Fetch mandatory Docs list
                $.ajax({
                    type: "POST",
                    url: "/Home/GetIfpDocuments?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function (json3) {
                    console.log(JSON.stringify({ ifpdata3: json3 }));
                    var td3 = $("#tbl_ifp_docs"),
                        x = 1,
                        p3 = td3.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: { lengthMenu: " _MENU_ records" },
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
                        p3.fnAddData([
                            x++,
                            json3[i].Procurement_Document_Type_ID,
                            json3[i].Description
                        ]);
                    }
                });

                //async fetch 4: Load Documents
                $.ajax({
                    type: "POST",
                    url: "/Home/UploadedKerraIfpDocs?ifpnumber=" + i.cells[1].innerHTML,
                    data: "",
                    cache: false,
                    async: true
                }).done(function(json4) {
                    console.log(JSON.stringify({ ifpdata4: json4 }));
                    var td4 = $("#tbl_ifp_downloads"),
                        x = 1,
                        p4 = td4.dataTable({
                            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                            pageLength: 5,
                            language: { lengthMenu: " _MENU_ records" },
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
                    for (var i = 0; i < json4.length; i++) {
                        p4.fnAddData([
                            x++,
                            json4[i].FileName,
                            json4[i].Size,
                            '<a class="download_file" href="">Download File</a>'
                        ]);

                    }
                    td4.on("click",
                    ".download_file",
                    function (td4) {
                        td4.preventDefault();
                        var i = $(this).parents("tr")[0];
                        alert("Download function is under development...hang on, Filename: " + i.cells[1].innerHTML);

                        //file download code goes here.

                    });
                });

                ////end ajax call here
            }

          );
    };
  
    return {
        init: function () {
            ifps();
        }
    }
}();
jQuery(document).ready(function () {
    Ld.init();
});