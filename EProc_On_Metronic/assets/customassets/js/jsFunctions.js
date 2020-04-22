'use-strict';

function getSelectedPosta30() {
    var selectedVal = $('#ddlallpostacodes30').find(":selected").attr('value');
    var ppInd = document.getElementById('txtCity');
    $.ajax({
        type: "POST",
        url: "/Home/SelectedPosta",
        data: "postcode=" + selectedVal
    }).done(function (status) {
        if (status !== "notfound") {
            ppInd.style = "background-color: #d7f4d7";
            ppInd.setAttribute('value', status);
            console.log('Selected City: ' + status);
        }
        else {
            $('#txtCity').val('');
            ppInd.style = "background-color: #f2bfb6";
            alert('Please Select valid Postal code!');
            $("#regfeedback").css("display", "block");
            $("#regfeedback").css("color", "red");
            $("#regfeedback").html("Please choose a valid post code!");
        }
        console.log(status);
    });
}

//const iListallIfpsTable = () => {
//    var selectedVal = $('#ddlifprequest').find(":selected").attr('value');
//    $.ajax({
//        type: "POST",
//        url: "/Home/ListtheIfPsTable",
//        data: "ifpnumber=" + selectedVal
//    }).done(function (status) {

//        $("#tbl_ifps").dataTable({
           
//            pageLength: 5,
//            language: {
//                lengthMenu: " _MENU_ records"
//            },
//            columnDefs: [{
//                orderable: !0,
//                targets: [0]
//            }, {
//                searchable: !0,
//                targets: [0]
//            }],
//            order: [
//                [0, "asc"]
//            ],
//            stateSave: true,
//            bDestroy: true,
//            processing: true,

//        //    processing: true,
//        //    serverSide: true,
//        //    paging: true,
//        //    lengthChange: true,
//        //    searching: true,
//        //    ordering: true,
//        //    info: true,
//        //    autoWidth: true,
//        //    responsive:true,
//        //rowReorder: {selector: 'td:nth-child(2)' },

//            ajax: {url: status, dataSrc: "" },
//            lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
//            dataType: "text",
//            columns: [ 
//                { data: "Code" },
//                { data: "Description" },
//                { data: "Submission_End_Date" },
//                { data: "Submission_End_Time" }
//            ] 
//        });
//       // for test
//        console.log(status);
//    });
//}

function getPullfileChooser() {
    var selectedVal = $('#doctoupload').find(":selected").attr('value');
    $("#pullupafilechooser").css("display", "block");
    switch (selectedVal) {
        case "noChoice":
            Swal.fire
            ({
                title: "Wrong Choice",
                text: "Kindly select kind of Doc to upload!",
                type: "error"
            }).then(() => {
                $("#uploadfeedbackMsg").css("display", "block");
                $("#uploadfeedbackMsg").css("color", "red");
                $('#uploadfeedbackMsg').attr('class', 'alert alert-danger');
                $("#uploadfeedbackMsg").html("Kindly select kind of Doc to upload!");
                $("#pullupafilechooser").css("display", "none");
            });
         break;
        default:
            $("#uploadfeedbackMsg").css("display", "none");
            $("#pullupafilechooser").css("display", "block");
            $("#selectedKindafile").html(selectedVal);
        break;
    }
}

