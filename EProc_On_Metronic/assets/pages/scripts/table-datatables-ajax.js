﻿var TableDatatablesAjax = function () {
    var a = function () {
            $(".date-picker").datepicker({
                rtl: App.isRTL(),
                autoclose: !0
            })
        },
        e = function () {
            var a = new Datatable;
            a.init({
                src: $("#datatable_ajax"),
                onSuccess: function (a, e) { },
                onError: function (a) { },
                onDataLoad: function (a) { },
                loadingMessage: "Loading...",
                dataTable: {
                    bStateSave: !0,
                    fnStateSaveParams: function (a, e) {
                        return $("#datatable_ajax tr.filter .form-control").each(function () {
                            e[$(this).attr("name")] = $(this).val()
                        }), e
                    },
                    fnStateLoadParams: function (a, e) {
                        return $("#datatable_ajax tr.filter .form-control").each(function () {
                            var a = $(this);
                            e[a.attr("name")] && a.val(e[a.attr("name")])
                        }), !0
                    },
                    lengthMenu: [
                        [10, 20, 50, 100, 150, -1],
                        [10, 20, 50, 100, 150, "All"]
                    ],
                    pageLength: 50,
                    ajax: {
                        url: "../demo/table_ajax.php"
                    },
                    ordering: !1,
                    order: [
                        [1, "asc"]
                    ]
                }
            }), a.getTableWrapper().on("click", ".table-group-action-submit", function (e) {
                e.preventDefault();
                var t = $(".table-group-action-input", a.getTableWrapper());
                "" != t.val() && a.getSelectedRowsCount() > 0 ? (a.setAjaxParam("customActionType", "group_action"), a.setAjaxParam("customActionName", t.val()), a.setAjaxParam("id", a.getSelectedRows()), a.getDataTable().ajax.reload(), a.clearAjaxParams()) : "" == t.val() ? App.alert({
                    type: "danger",
                    icon: "warning",
                    message: "Please select an action",
                    container: a.getTableWrapper(),
                    place: "prepend"
                }) : 0 === a.getSelectedRowsCount() && App.alert({
                    type: "danger",
                    icon: "warning",
                    message: "No record selected",
                    container: a.getTableWrapper(),
                    place: "prepend"
                })
            })
        },
        t = function () {
            var a = new Datatable;
            a.init({
                src: $("#datatable_ajax_2"),
                onSuccess: function (a, e) { },
                onError: function (a) { },
                onDataLoad: function (a) { },
                dataTable: {
                    dom: "<'row'<'col-md-8 col-sm-12'i><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'i><'col-md-4 col-sm-12'>>",
                    bStateSave: !0,
                    fnStateSaveParams: function (a, e) {
                        return $("#datatable_ajax_2 tr.filter .form-control").each(function () {
                            e[$(this).attr("name")] = $(this).val()
                        }), e
                    },
                    fnStateLoadParams: function (a, e) {
                        return $("#datatable_ajax_2 tr.filter .form-control").each(function () {
                            var a = $(this);
                            e[a.attr("name")] && a.val(e[a.attr("name")])
                        }), !0
                    },
                    pageLength: 10,
                    ajax: {
                        url: "../demo/table_ajax.php"
                    },
                    order: [
                        [1, "asc"]
                    ],
                    language: {
                        loadingRecords: "Please wait ...",
                        zeroRecords: "No records",
                        emptyTable: "No data available in table",
                        info: "Showing _START_ to _END_ of _TOTAL_ entries"
                    },
                    scrollY: 400,
                    deferRender: !0,
                    scroller: {
                        loadingIndicator: !0
                    }
                }
            }), a.getTableWrapper().on("click", ".table-group-action-submit", function (e) {
                e.preventDefault();
                var t = $(".table-group-action-input", a.getTableWrapper());
                "" != t.val() && a.getSelectedRowsCount() > 0 ? (a.setAjaxParam("customActionType", "group_action"), a.setAjaxParam("customActionName", t.val()), a.setAjaxParam("id", a.getSelectedRows()), a.getDataTable().ajax.reload(), a.clearAjaxParams()) : "" == t.val() ? App.alert({
                    type: "danger",
                    icon: "warning",
                    message: "Please select an action",
                    container: a.getTableWrapper(),
                    place: "prepend"
                }) : 0 === a.getSelectedRowsCount() && App.alert({
                    type: "danger",
                    icon: "warning",
                    message: "No record selected",
                    container: a.getTableWrapper(),
                    place: "prepend"
                })
            })
        };
    return {
        init: function () {
            a(), e(), t()
        }
    }
}();
jQuery(document).ready(function () {
    TableDatatablesAjax.init()
});