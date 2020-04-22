var TableDatatablesEditable = function () {
    var e = function () {
        function e(e, t) {
            for (var n = e.fnGetData(t), a = $(">td", t), l = 0, r = a.length; l < r; l++) e.fnUpdate(n[l], t, l, !1);
            e.fnDraw()
        }

        function t(e, t) {
            var n = e.fnGetData(t),
                a = $(">td", t);
            a[0].innerHTML = '<input type="text" class="form-control input-small" value="' + n[0] + '">', a[1].innerHTML = '<input type="text" class="form-control input-small" value="' + n[1] + '">', a[2].innerHTML = '<input type="text" class="form-control input-small" value="' + n[2] + '">', a[3].innerHTML = '<input type="text" class="form-control input-small" value="' + n[3] + '">', a[4].innerHTML = '<a class="edit" href="">Save</a>', a[5].innerHTML = '<a class="cancel" href="">Cancel</a>'
        }

        function n(e, t) {
            var n = $("input", t);
            e.fnUpdate(n[0].value, t, 0, !1), e.fnUpdate(n[1].value, t, 1, !1), e.fnUpdate(n[2].value, t, 2, !1), e.fnUpdate(n[3].value, t, 3, !1), e.fnUpdate('<a class="edit" href="">Edit</a>', t, 4, !1), e.fnUpdate('<a class="delete" href="">Delete</a>', t, 5, !1), e.fnDraw()
        }
        var a = $("#sample_editable_1"),
            l = a.dataTable({
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"]
                ],
                pageLength: 5,
                language: {
                    lengthMenu: " _MENU_ records"
                },
                columnDefs: [{
                    orderable: !0,
                    targets: [0]
                }, {
                    searchable: !0,
                    targets: [0]
                }],
                order: [
                    [0, "asc"]
                ]
            }),
            r = ($("#sample_editable_1_wrapper"), null),
            o = !1;
        $("#sample_editable_1_new").click(function(e) {
                if (e.preventDefault(), o && r) {
                    if (!confirm("Previous row not saved. Do you want to save it ?"))
                        return l.fnDeleteRow(r), r = null, void (o = !1);
                    n(l, r), $(r).find("td:first").html("Untitled"), r = null, o = !1
                }
                var a = l.fnAddData(["", "", "", "", "", ""]),
                    i = l.fnGetNodes(a[0]);
                t(l, i), r = i, o = !0;
            }),
            a.on("click",
                ".delete",
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
                ".edit",
                function(a) {
                    a.preventDefault(), o = !1;
                    var i = $(this).parents("tr")[0];
                    if (null !== r && r != i) {
                        (e(l, r), t(l, i), r = i);
                    } else if (r == i && "Save" == this.innerHTML) {
                        (n(l, r), r = null

                        ////call ajax to insert data here
                           // alert("bank name: " + i.cells[0].innerHTML)
                        );
                            //To prevent form submit after ajax call
                       // e.preventDefault();

                        //reset to empty
                        $("#regfeedback").html("");
                        var bankmodel = {};
                        //dropdownlists

                        //input textfields
                        bankmodel.BankCode = i.cells[0].innerHTML;
                        bankmodel.BankName = i.cells[1].innerHTML;
                        bankmodel.CurrencyCode = i.cells[2].innerHTML;
                        bankmodel.BankAccountNo = i.cells[3].innerHTML;

                      
                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed to add the bank??",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Add Bank Details!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddaBank",
                                    type: "POST",
                                    data: '{bankmodel: ' + JSON.stringify(bankmodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Bank Added!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);

                                                console.log('Bank info submitted : ' + JSON.stringify(bankmodel));

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
                                    'You cancelled your account creation!',
                                    'error'
                                );
                            }
                        });
                            
                        ////end ajax call here

                    } else {
                        (t(l, i), r = i);
                    }
                    //null !== r && r != i ? (e(l, r), t(l, i), r = i) : r == i && "Save" == this.innerHTML ? (n(l, r), r = null,
                    ////call ajax to insert data here
                    //alert("bank name: " + i.cells[0].innerHTML)) : (t(l, i), r = i)
                });
    };
    return {
        init: function () {
            e()
        }
    }
}();
var TableDatatablesDirector = function () {
    var e = function () {
        function e(e, t) {
            for (var n = e.fnGetData(t), a = $(">td", t), l = 0, r = a.length; l < r; l++) e.fnUpdate(n[l], t, l, !1);
            e.fnDraw()
        }

        function t(e, t) {
            var n = e.fnGetData(t),
                a = $(">td", t);
               //Add countries to the DropDownList.
                $.ajax({
                    url: "/Home/DynamicDDlCountryList",
                    datatype: "JSON",
                    type: "Get",
                    success: function(data) {
                        for (var i = 0; i < data.length; i++) {
                            $('#ddlallcountriesdy').append('<option value="' +data[i].Code +'">' +data[i].Name +'</option>');
                        }
                    }
                }),
                a[0].innerHTML = '<input type="text" class="form-control input-small" value="' + n[0] + '">',
                a[1].innerHTML ='<select class="form-control select2" id="ddlallcountriesdy" name="ddlallcountriesdy" data_live_search = "true"><option value="">--Select Country--</option></select>',
                a[2].innerHTML = '<input type="number" class="form-control input-small" value="' + n[2] + '">',
                a[3].innerHTML = '<input type="number" class="form-control input-small" value="' + n[3] + '">',
                a[4].innerHTML = '<input type="text" class="form-control input-small" value="' + n[4] + '">',
                a[5].innerHTML = '<input type="text" class="form-control input-small" value="' + n[5] + '">',
                a[6].innerHTML = '<input type="email" class="form-control input-small" value="' + n[6] + '">',
                a[7].innerHTML = '<a class="edit" href="">Save</a>',
                a[8].innerHTML = '<a class="cancel" href="">Cancel</a>';
        }

        function n(e, t) {
            var n = $("input", t);
            e.fnUpdate(n[0].value, t, 0, !1),
            e.fnUpdate($("#ddlallcountriesdy option:selected").text(), t, 1, !1),
            e.fnUpdate(n[1].value, t, 2, !1),
            e.fnUpdate(n[2].value, t, 3, !1),
            e.fnUpdate(n[3].value, t, 4, !1),
            e.fnUpdate(n[4].value, t, 5, !1),
            e.fnUpdate(n[5].value, t, 6, !1),
            e.fnUpdate('<a class="edit" href="">Edit</a>', t, 7, !1),
            e.fnUpdate('<a class="delete" href="">Delete</a>', t, 8, !1),
            e.fnDraw()
        }
        var a = $("#tbl_directors"),
            l = a.dataTable({
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"]
                ],
                pageLength: 5,
                language: {
                    lengthMenu: " _MENU_ records"
                },
                columnDefs: [{
                    orderable: !0,
                    targets: [0]
                }, {
                    searchable: !0,
                    targets: [0]
                }],
                order: [
                    [0, "asc"]
                ]
            }),
            r = ($("#sample_editable_1_wrapper"), null),
            o = !1;
        $("#btn_add_director_new").click(function(e) {
                if (e.preventDefault(), o && r) {
                    if (!confirm("Previous row not saved. Do you want to save it ?"))
                        return l.fnDeleteRow(r), r = null, void (o = !1);
                    n(l, r), $(r).find("td:first").html("Untitled"), r = null, o = !1
                }
                var a = l.fnAddData(["", "", "", "", "", "","", "",""]),
                    i = l.fnGetNodes(a[0]);
                t(l, i), r = i, o = !0;
            }),
            a.on("click",
                ".delete",
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
                ".edit",
                function(a) {
                    a.preventDefault(), o = !1;
                    var i = $(this).parents("tr")[0];
                    if (null !== r && r != i) {
                        (e(l, r), t(l, i), r = i);
                    } else if (r == i && "Save" == this.innerHTML) {
                        (n(l, r), r = null);

                        ////call ajax to insert data here
                        //To prevent form submit after ajax call

                        //reset to empty
                        $("#regfeedback").html("");
                        var directormodel = {};
                        //dropdownlists
                       
                        //input textfields
                        directormodel.Fullname = i.cells[0].innerHTML;
                        directormodel.Nationality = i.cells[1].innerHTML;
                        directormodel.IdNumber = i.cells[2].innerHTML;
                        directormodel.OwnershipPercentage = i.cells[3].innerHTML;
                        directormodel.Phonenumber = i.cells[4].innerHTML;
                        directormodel.Address = i.cells[5].innerHTML;
                        directormodel.Email = i.cells[6].innerHTML;

                         console.log('Director info submitted : ' + JSON.stringify(directormodel));

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed to add the director??",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Add Director Details!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddaDirector",
                                    type: "POST",
                                    data: '{directormodel: ' + JSON.stringify(directormodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Director Added!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);

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
                                    'You data submission!',
                                    'error'
                                );
                            }
                        });
                        ////end ajax call here

                    } else {
                        (t(l, i), r = i);
                    }
                });
    };
    return {
        init: function () {
            e();
        }
    }
}();
var TableDatatablesIFPs = function () {
    var e = function () {

        var a = $("#tbl_ifps"),
            l = a.dataTable({
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

        $("#ddlifprequest").change(function() {

            var selectedIfp = $('#ddlifprequest').find(":selected").attr('value');

            //alert("You have selected the iFP - " + selectedIfp);

            $.ajax({
                type: "POST",
                url: "/Home/ListtheIfPsTable",
                data: "ifpnumber=" + selectedIfp
            }).done(function (json) {
                console.log(JSON.stringify({ data: json }));
                l.fnClearTable();
                for (var i = 0; i < json.length; i++) {
                    l.fnAddData([
                        json[i].Code, json[i].Description, '<a class="applyifp" href="">Apply</a>'
                    ]);
                }
            });
           
        });

        a.on("click",".applyifp",
            function (a) {
                a.preventDefault();
                var i = $(this).parents("tr")[0];
                if ("Apply" == this.innerHTML) {
                    alert("For Test:- You want to apply to: " + i.cells[0].innerHTML);

                    //start Ajax insert to DB 

                    //reset alert div to empty
                    //$("#regfeedback").html("");

                    //var bankmodel = {};
                    ////dropdownlists

                    ////input textfields
                    //bankmodel.BankCode = i.cells[0].innerHTML;
                    //bankmodel.BankName = i.cells[1].innerHTML;
                    //bankmodel.CurrencyCode = i.cells[2].innerHTML;
                    //bankmodel.BankAccountNo = i.cells[3].innerHTML;


                    ////end ajax call here

                } else {
                    alert("Something else! clicked");
                }
                ////call ajax to insert data here
            });
    };
    return {
        init: function () {
            e();
        }
    }
}();

var TableDatatablesLitigation= function () {
    var e = function () {
        function e(e, t) {
            for (var n = e.fnGetData(t), a = $(">td", t), l = 0, r = a.length; l < r; l++) e.fnUpdate(n[l], t, l, !1);
            e.fnDraw()
        }

        function t(e, t) {
            var n = e.fnGetData(t),
                a = $(">td", t);

                a[0].innerHTML = '<select class="form-control select2" id="ddlcategorydispute" name="ddlcategorydispute" data_live_search = "true">' +
                                    '<option value="">--Select Category--</option>' +
                                    '<option value="1">Litigation</option>' +
                                    '<option value="2">Arbitration</option>' +
                                    '<option value="3">Mediation</option>' +
                                '</select>',
                a[1].innerHTML = '<input type="text" class="form-control input-small" value="' + n[1] + '">',
                a[2].innerHTML = '<input type="text" class="form-control input-small" value="' + n[2] + '">',
                a[3].innerHTML = '<input type="text" class="form-control input-small" value="' + n[3] + '">',
                a[4].innerHTML = '<input type="text" class="form-control input-small" value="' + n[4] + '">',
                a[5].innerHTML = '<select class="form-control select2" id="ddlawardtype" name="ddlawardtype" data_live_search = "true">' +
                                    '<option value="">--Select Type--</option>' +
                                    '<option value="1">Pending Verdict</option>' +
                                    '<option value="2">Won</option>' +
                                    '<option value="3">Lost</option>' +
                                '</select>',

                a[6].innerHTML = '<a class="edit" href="">Save</a>',
                a[7].innerHTML = '<a class="cancel" href="">Cancel</a>';
        }

        function n(e, t) {
            var n = $("input", t);

                e.fnUpdate($("#ddlcategorydispute option:selected").text(), t, 0, !1),
                e.fnUpdate(n[0].value, t, 1, !1),
                e.fnUpdate(n[1].value, t, 2, !1),
                e.fnUpdate(n[2].value, t, 3, !1),
                e.fnUpdate(n[3].value, t, 4, !1),
                e.fnUpdate($("#ddlawardtype option:selected").text(), t, 5, !1),
                e.fnUpdate('<a class="edit" href="">Edit</a>', t, 6, !1),
                e.fnUpdate('<a class="delete" href="">Delete</a>', t, 7, !1),
                e.fnDraw();
        }
        var a = $("#tbl_litigation"),
            l = a.dataTable({
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"]
                ],
                pageLength: 5,
                language: {
                    lengthMenu: " _MENU_ records"
                },
                columnDefs: [{
                    orderable: !0,
                    targets: [0]
                }, {
                    searchable: !0,
                    targets: [0]
                }],
                order: [
                    [0, "asc"]
                ]
            }),
            r = ($("#sample_editable_1_wrapper"), null),
            o = !1;
        $("#btn_add_litigation_new").click(function (e) {
                if (e.preventDefault(), o && r) {
                    if (!confirm("Previous row not saved. Do you want to save it ?"))
                        return l.fnDeleteRow(r), r = null, void (o = !1);
                    n(l, r), $(r).find("td:first").html("Untitled"), r = null, o = !1
                }
                var a = l.fnAddData(["", "", "", "", "", "","",""]),
                    i = l.fnGetNodes(a[0]);
                t(l, i), r = i, o = !0;
            }),
            a.on("click",
                ".delete",
                function (e) {
                    if (e.preventDefault(), 0 != confirm("Are you sure to delete this row ?")) {
                        var t = $(this).parents("tr")[0];
                        l.fnDeleteRow(t),
                            alert("Deleted! functionality under development on the backend)");
                        //put delete code here below

                        //end delete code
                    }
                }), a.on("click",
                ".cancel",
                function (t) {
                    t.preventDefault(), o ? (l.fnDeleteRow(r), r = null, o = !1) : (e(l, r), r = null);
                }), a.on("click",
                ".edit",
                function (a) {
                    a.preventDefault(), o = !1;
                    var i = $(this).parents("tr")[0];
                    if (null !== r && r != i) {
                        (e(l, r), t(l, i), r = i);
                    } else if (r == i && "Save" == this.innerHTML) {
                        (n(l, r), r = null);
                        ////call ajax to insert data here

                        //reset to empty
                        $("#regfeedback").html("");
                        var litgmodel = {};
                        //dropdownlists

                        //input textfields
                        litgmodel.CategoryofDispute = i.cells[0].innerHTML;;
                        litgmodel.DisputeDescription = i.cells[1].innerHTML;
                        litgmodel.DisputeAmount = i.cells[2].innerHTML;
                        litgmodel.TheotherDisputeparty = i.cells[3].innerHTML;
                        litgmodel.Year = i.cells[4].innerHTML;
                        litgmodel.AwardType = i.cells[5].innerHTML;;

                        // console.log('Bank info submitted : ' + JSON.stringify(litgmodel));

                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you'd like to proceed to add Litigation history?",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: true,
                            confirmButtonText: "Yes, Litigation History!",
                            confirmButtonClass: "btn-success",
                            confirmButtonColor: "#008000",
                            position: "center"
                        }).then((result) => {
                            if (result.value) {
                                $.ajax({
                                    url: "/Home/AddLitigation",
                                    type: "POST",
                                    data: '{litgmodel: ' + JSON.stringify(litgmodel) + '}',
                                    dataType: "json",
                                    contentType: "application/json"
                                }).done(function (status) {
                                        var splitstatus = status.split('*');
                                        switch (splitstatus[0]) {
                                        case "success":
                                            Swal.fire
                                            ({
                                                title: "Litigation Added!",
                                                text: splitstatus[1],
                                                type: "success"
                                            }).then(() => {
                                                $("#regfeedback").css("display", "block");
                                                $("#regfeedback").css("color", "green");
                                                $('#regfeedback').addClass("alert alert-success");
                                                $("#regfeedback").html(splitstatus[1]);

                                                console.log('Bank info submitted : ' + JSON.stringify(bankmodel));

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
                                    'You cancelled your account creation!',
                                    'error'
                                );
                            }
                        });

                        ////end ajax call here

                    } else {
                        (t(l, i), r = i);
                    }
                    //null !== r && r != i ? (e(l, r), t(l, i), r = i) : r == i && "Save" == this.innerHTML ? (n(l, r), r = null,
                    ////call ajax to insert data here
                    //alert("bank name: " + i.cells[0].innerHTML)) : (t(l, i), r = i)
                });
    };
    return {
        init: function () {
            e()
        }
    }
}();

jQuery(document).ready(function () {
    TableDatatablesEditable.init(),
    TableDatatablesDirector.init(),
    TableDatatablesIFPs.init(),
    TableDatatablesLitigation.init();
});