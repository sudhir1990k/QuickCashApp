function Login(form) {
    let username = new Array("admin");
    let password = new Array("test");
    if (form.username.value === username[0] && form.password.value === password[0]) {
        databaseHandler.createDatabase();
        alert("I am here")
        productHandler.addProduct("Gardening","GRD",200,"2", "Need a Gardener for 2 hrs");
        productHandler.addProduct("Gardening","GRD",200,"2", "Need a Gardener for 2 hrs");
        productHandler.addProduct("Gardening","GRD",200,"2", "Need a Gardener for 2 hrs");
        location.href='home.html';
        return false;
    }
    else {
        alert("Either the username or password you entered is incorrect.\nPlease try again.");
        form.username.focus();
    }
    return true;
}