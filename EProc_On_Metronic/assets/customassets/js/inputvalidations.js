'use-strict';

function IsValidEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ig;
    return expr.test(email);
};
function EmailValidator(emailadd) {
    var isValid = $("#regfeedback");
    if (!IsValidEmail(emailadd.value)) {
        Swal.fire
        ({
            title: "Email Validation Error!",
            text: "Invalid Email address detected!",
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Provide a valid email!",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#ec6c62",
            position: "center"
        }).then(() => {
            isValid.css("display", "block");
            isValid.css("color", "red");
            isValid.attr("class", "alert alert-danger");
            isValid.html("Email is Invalid!");
            $("#email").focus();
            $("#email").css("border", "solid 1px red");
        });
        return;
    }
}

function EmailValidator_Talktous(emailadd) {
    var isValid = $("#submitedfeedback");
    if (!IsValidEmail(emailadd.value)) {
        Swal.fire
        ({
            title: "Email Validation Error!",
            text: "Invalid Email address detected!",
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Provide a valid email!",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#ec6c62",
            position: "center"
        }).then(() => {
            isValid.css("display", "block");
            isValid.css("color", "red");
            isValid.attr("class", "alert alert-danger");
            isValid.html("Email is Invalid!");
            $("#txtemail").focus();
            $("#txtemail").css("border", "solid 1px red");
        });
        return;
    }

}

function IsPhoneNumberValid(phone) {
    var expr = /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/ig;
    return expr.test(phone);
}
function PhoneNoValidator(phonenum) {
    var isValid = $("#regfeedback");
    if (!IsPhoneNumberValid(phonenum.value)) {
        Swal.fire
        ({
            title: "Mobile Number Validation Error!",
            text: "Invalid Mobile Number detected!",
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Provide a valid Phone Number!",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#ec6c62",
            position: "center"
        }).then(() => {
            isValid.css("display", "block");
            isValid.css("color", "red");
            isValid.attr("class", "alert alert-danger");
            isValid.html("Provide a valid Phone Number!");
            $("#txtPhonenumberInd").focus();
            $("#txtPhonenumberInd").css("border", "solid 1px red");
        });
        return;
    }
    $("#txtPhonenumberInd").css("border-width", "0");
    $("#txtPhonenumberInd").css("border", "none");
    isValid.css("display", "none");
}
function PhoneNoValidator_Talktous(phonenum) {
    var isValid = $("#submitedfeedback");
    if (!IsPhoneNumberValid(phonenum.value)) {
        Swal.fire
        ({
            title: "Mobile Number Validation Error!",
            text: "Invalid Mobile Number detected!",
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Provide a valid Phone Number!",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#ec6c62",
            position: "center"
        }).then(() => {
            isValid.css("display", "block");
            isValid.css("color", "red");
            isValid.attr("class", "alert alert-danger");
            isValid.html("Provide a valid Phone Number!");
            $("#txtphone").focus();
            $("#txtphone").css("border", "solid 1px red");
        });
        return;
    }
}

function IsValidEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ig;
    return expr.test(email);
};

const CheckTextArea = (textArea, maxLength) => {
    document.getElementById("lblCharleftTextarea").innerHTML = maxLength - textArea.value.length + " characters left";
    if (textArea.value.length > maxLength) {
        document.getElementById("lblCharleftTextarea").style.color = "red";
        textArea.value = textArea.value.substr(0, maxLength);
        document.getElementById("lblCharleftTextarea").innerHTML = maxLength - textArea.value.length + " characters left";
    }
    else if (textArea.value.length < maxLength) {
        document.getElementById("lblCharleftTextarea").style.color = "Black";
    }
    else {
        document.getElementById("lblCharleftTextarea").style.color = "red";
    }
}
const validateEmail = (() => {
    var myemadd = $("#txtEmailAddInd").val();
    var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/ig;
    if (reg.test(myemadd)) {
        $("#regfeedback").css("display", "block");
        $("#regfeedback").css("color", "green");
        $('#regfeedback').attr("class", "alert alert-success");
        $("#regfeedback").html("Your email is acceptable, continue!");
        $("#txtEmailAddInd").blur();
        $("#txtEmailAddInd").css("border-width", "0");
        $("#txtEmailAddInd").css("border", "none");
        return 0;
    }
    else {
        Swal.fire
        ({
            title: "Email Validation Error!",
            text: "Only Business Email Address is allowed!",
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Provide a nice email!",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#ec6c62",
            position: "center"
        }).then(() => {
            $("#regfeedback").css("display", "block");
            $("#regfeedback").css("color", "red");
            $('#regfeedback').attr("class", "alert alert-danger");
            $("#regfeedback").html("Only Business Email Address is allowed!");
            $("#txtEmailAddInd").focus();
            $("#txtEmailAddInd").css("border", "solid 1px red");
        });
        return false;
    }
});
const IsNumericPOBox= ((e) => {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode;
    if (!(keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
        document.getElementById("poboxerror").style.display = "inline";
        e.preventDefault();
    } else {
        document.getElementById("poboxerror").style.display = "none";
    }
});
const IsNumericAmount = ((e) => {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode;
    if (!(keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
        document.getElementById("amounterror").style.display = "inline";
        e.preventDefault();
    } else {
        document.getElementById("amounterror").style.display = "none";
    }
});
const inputLimit = ((element, maxLegth) => {
    if (element.value.length > maxLegth) {
        element.value = element.value.substr(0, maxLegth);
    }
});