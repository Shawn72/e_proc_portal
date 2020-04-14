'use-strict';
$(function() {
    $('.exportopentenderstable').DataTable({
        stateSave: true,
        bDestroy: true,
        processing: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: true,
        responsive: true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'copy',
                title: 'Open Tenders List',
                filename: 'Open Tenders List',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'csv',
                title: 'Open Tenders List',
                filename: 'Open Tenders List',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'excel',
                title: 'Open Tenders List',
                filename: 'Open Tenders List',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'pdf',
                title: 'Open Tenders List',
                filename: 'Open Tenders List',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'print',
                title: 'Open Tenders List',
                filename: 'Open Tenders List',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            }
        ]
    });

    $('.xportabletable').DataTable({
        stateSave: true,
        bDestroy: true,
        processing: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: true,
        responsive: true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'copy',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'csv',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'excel',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'pdf',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'print',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            }
        ]
    });

    $('.tblBankdetails').DataTable({
        stateSave: true,
        bDestroy: true,
        processing: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: true,
        responsive: true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'copy',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'csv',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'excel',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'pdf',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            {
                extend: 'print',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            }
        ]
    });
    
});