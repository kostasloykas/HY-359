
function on_load() {
    isLoggedIn();
}


function login_post() {


    var data = $("#myForm").serialize();
    $("#myForm")[0].reset();
    console.log(data);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("msg-login").style.color = "rgb(0, 0, 153)";
            document.getElementById("msg-login").innerText = "Συνδεθηκατε";
            window.location.href = './Doctor.html';
        } else if (xhttp.status === 403) {
            document.getElementById("msg-login").style.color = "red";
            document.getElementById("msg-login").innerText = "Λαθος στοιχεια";
        } else if (xhttp.status === 400) {
            document.getElementById("msg-login").style.color = "red";
            document.getElementById("msg-login").innerText = "Δεν εχει γινει certified ο συγκεκριμενος Γιατρος";
        } else {
            alert(xhttp.responseText);
        }
    };
    xhttp.open("POST", "servlet_login_doctor");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);


}



function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("msg-login").style.color = "rgb(0, 0, 153)";
            document.getElementById("msg-login").innerText = "Ειστε συνδεδεμενος";
            window.location.href = './Doctor.html';
        } else if (xhr.status !== 200) {
        }
    };
    xhr.open("GET", "Login");
    xhr.send();
}
