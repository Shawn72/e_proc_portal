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

