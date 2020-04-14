'use-strict';
$(function () {
    //Build an array containing Customer records.
    var customers = new Array();
    customers.push(["John Hammond", "United States"]);
    customers.push(["Mudassar Khan", "India"]);
    customers.push(["Suzanne Mathews", "France"]);
    customers.push(["Robert Schidner", "Russia"]);
 
    //Add the data rows.
    for (var i = 0; i < customers.length; i++) {
        AddRow(customers[i][0], customers[i][1]);
    }
});
 
function Add() {
    AddRow($("#txtName").val(), $("#txtCountry").val());
    $("#txtName").val("");
    $("#txtCountry").val("");
};
 
function AddRow(name, country) {
    //Get the reference of the Table's TBODY element.
    var tBody = $("#tblCustomers > TBODY")[0];
 
    //Add Row.
    row = tBody.insertRow(-1);
 
    //Add Name cell.
    var cell = $(row.insertCell(-1));
    cell.html(name);
 
    //Add Country cell.
    cell = $(row.insertCell(-1));
    cell.html(country);
 
    //Add Button cell.
    cell = $(row.insertCell(-1));
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell.append(btnRemove);
};
 
function Remove(button) {
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var name = $("TD", row).eq(0).html();
    if (confirm("Do you want to delete: " + name)) {
 
        //Get the reference of the Table.
        var table = $("#tblCustomers")[0];
 
        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};