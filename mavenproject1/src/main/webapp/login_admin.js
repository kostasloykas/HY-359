    
function on_load() {
    isLoggedIn();
}




function login_post(){
    
    
    var data = $("#myForm").serialize();
    $("#myForm")[0].reset();
    console.log(data);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("msg-login").style.color="rgb(0, 0, 153)";            
            document.getElementById("msg-login").innerText="Συνδεθηκατε";
            window.location.href='./Admin.html';
        }else if(xhttp.status === 401){
            document.getElementById("msg-login").style.color="red";
            document.getElementById("msg-login").innerText="Λαθος στοιχεια";
        }else if(xhttp.status === 402){
            document.getElementById("msg-login").style.color="red";
            document.getElementById("msg-login").innerText="Ο χρηστης δεν ειναι administrator";
        } 
    };
    xhttp.open("POST","servlet_login");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    
    
}



function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#info-user").show();
            document.getElementById("msg-login").style.color="rgb(0, 0, 153)";            
            document.getElementById("msg-login").innerText="Ειστε συνδεδεμενος";
            window.location.href='./Admin.html';
        } else if (xhr.status !== 200) {
        }
    };
    xhr.open("GET", "Login");
    xhr.send();
}
