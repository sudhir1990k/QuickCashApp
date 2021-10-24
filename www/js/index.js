$(document).on("ready", function(){
    databaseHandler.createDatabase();
    productHandler.addProduct("Gardening","GRD",200,"2", "Need a Gardener for 2 hrs","none");
    productHandler.addProduct("Gardening","GRD",200,"2", "Need a Gardener for 2 hrs","");
    productHandler.addProduct("Gardening","GRD",200,"2", "Need a Gardener for 2 hrs","");
});
function addProduct(){
    var name = $("#txtName").val();
    var type = $("#txtType").val();
    var amount = $("#txtAmount").val();
    var time = $("#txtTime").val();
    var description = $("#txtDescription").val();
    var jobAssignedTo = $("#txtAssigned").val();

    if(!name){
        alert("Name is required");
    }else{
        var r = confirm("JobName: " + name + "\n" + "JobType: " + type);
        if(r===true){
            productHandler.addProduct(name, type, amount, time, description, jobAssignedTo);
            $("#txtName").val("");
            $("#txtType").val("");
            $("#txtAmount").val("");
            $("#txtTime").val("");
            $("#txtDescription").val("");
            $("#txtAssigned").val("");
        }
    }
}
var currentProduct={
    id: -1,
    jobName: "",
    type: "",
    amount:0,
    time:"",
    description:"",
    assignedTo:"none"
}
function displayProducts(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    alert("I am here - display")
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var h3 = $("<h3 />").text("Job name: ");
        var h4 = $("<h4 />").text("Job Type: ");
        var h5 = $("<h4 />").text("Amount: ");
        var h6 = $("<h4 />").text("Time: ");
        var h7 = $("<h4 />").text("Description: ");
        var h8 = $("<h4 />").text("AssignedTo: ");
        var p = $("<p />").text("Id: ");
        var spanName = $("<span />").text(item.jobName);
        spanName.attr("name", "JobName");
        var jobType = $("<span />").text(item.type);
        jobType.attr("name", "type");
        var amount = $("<span />").text(item.amount);
        amount.attr("name", "amount");
        var time = $("<span />").text(item.time);
        time.attr("name", "time");
        var description = $("<span />").text(item.description);
        description.attr("name", "description");
        var assignedTo = $("<span />").text(item.assignedTo);
        assignedTo.attr("name", "assignedTo");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        h3.append(spanName);
        h4.append(jobType);
        h5.append(amount);
        h6.append(time);
        h7.append(description);
        h8.append(assignedTo);
        p.append(spanId);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        a.append(h6);
        a.append(h7);
        a.append(h8);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.name);
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function(){
        currentProduct.id = $(this).find("[name='_id']").text();
        currentProduct.name = $(this).find("[name='jobName']").text();
        currentProduct.type = $(this).find("[name='type']").text();
        currentProduct.amount = $(this).find("[name='amount']").text();
        currentProduct.time = $(this).find("[name='time']").text();
        currentProduct.description = $(this).find("[name='description']").text();
        currentProduct.assignedTo = $(this).find("[name='assignedTo']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    productHandler.loadProducts(displayProducts);
});

function deleteProduct(){
    var r = confirm("Delete product\nName: "+currentProduct.name+
        "\nQuantity: " + currentProduct.quantity);
    if(r==true){
        productHandler.deleteProduct(currentProduct.id);
        productHandler.loadProducts(displayProducts);
    }
    $("#popupUpdateDelete").popup("close");
}

function negotiate(){
    $("#popupUpdateDelete").popup("Negotiation Initiated")
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#txtNewName").val(currentProduct.name);
    $("#txtNewQuantity").val(currentProduct.quantity);
});

function updateProduct(){
    var newName = $("#txtNewName").val();
    productHandler.updateProduct(currentProduct.id, newName);
    $("#updatedialog").dialog("close");
}