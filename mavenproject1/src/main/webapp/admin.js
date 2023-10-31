/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */



function logout(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        window.location.href="./Login_admin.html";        
    } else if (xhr.status !== 200) {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}


function show_everyone() {

    if (document.getElementById("users-table").hidden === false) {
        $('#users-table').hide();
        $('#doctors-table').hide();
        document.getElementById("users-table").hidden = true;
        return 0;
    } else {
        $('#uncert-doctors-table2').hide();
        document.getElementById("uncert-doctors-table2").hidden = true;
        $('#doctors-table').show();
        $('#users-table').show();
        document.getElementById("users-table").hidden = false;
    }
    
    
    
    var xhr1 = new XMLHttpRequest();
    xhr1.onload = function () {
    if (xhr1.readyState === 4 && xhr1.status === 200) {
        const responseData1 = JSON.parse(xhr1.responseText);
        console.log("Respone Data 1:");
        console.log(responseData1);
        $('#cert-doctors-table').html(createTableFromJSONForDeleteDoctors(responseData1));
        } else if (xhr1.status !== 200) {
        alert('Request failed. Returned status of ' + xhr1.status);
    }
    };
    xhr1.open('GET', 'servlet_print_doctors');
    xhr1.send();
    
    
   
    var xhr2 = new XMLHttpRequest();
    xhr2.onload = function () {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
        const responseData2 = JSON.parse(xhr2.responseText);
        console.log("Respone Data 2:");
        console.log(responseData2);
        $('#uncert-doctors-table').html(createTableFromJSONForDeleteDoctors(responseData2));

    } else if (xhr2.status !== 200) {
        alert('Request failed. Returned status of ' + xhr2.status);
    }
    };
    xhr2.open('GET', 'servlet_get_uncert_doctors');
    xhr2.send();
    
    
    
    var xhr3 = new XMLHttpRequest();
    xhr3.onload = function () {
    if (xhr3.readyState === 4 && xhr3.status === 200) {
        const responseData3 = JSON.parse(xhr3.responseText);
        console.log("Respone Data 3:");
        console.log(responseData3);
            $('#users-table').html(createTableFromJSONForDeleteUsers(responseData3));
    } else if (xhr3.status !== 200) {
        alert('Request failed. Returned status of ' + xhr3.status);
    }
    };
    xhr3.open('GET', 'servlet_get_users');
    xhr3.send();
    

}


function show_uncert_doctors() {
    
    if (document.getElementById("uncert-doctors-table2").hidden === false) {
        $('#uncert-doctors-table2').html("");
        $('#uncert-doctors-table2').hide();

        document.getElementById("uncert-doctors-table2").hidden = true;
        return 0;
    } else {
        $('#users-table').hide();
        $('#doctors-table').hide();
        document.getElementById("users-table").hidden = true;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        console.log("Respone Data:");
        console.log(responseData);
            $('#uncert-doctors-table2').html(createTableFromJSONForDoctors(responseData));
            $('#uncert-doctors-table2').show();
            document.getElementById("uncert-doctors-table2").hidden = false;

    } else if (xhr.status !== 200) {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    };
    xhr.open('GET', 'servlet_get_uncert_doctors');
    xhr.send();
    
    
}



function certified_doctor(amka) {
     
    
    var data = "{ 'amka' : '" + amka + "' }";
    console.log(data);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("message").style.color="rgb(0, 0, 153)";            
            document.getElementById("message").innerText="Η πιστοποιηση εγινε επιτυχως!";
        }else {
            document.getElementById("message").style.color="red";
            document.getElementById("message").innerText="Υπηρξε προβλημα κατα την πιστοποιηση";
        } 
    };
    xhttp.open("PUT","update_doctor");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    

}


function createTableFromJSONForDoctors(data) {
    var html = "<table id='doctors-table'><tr><th>Ονομα</th><th>Επώνυμο</th><th>Ημερομηνια Γεννησης</th></tr>";
    
    for (const x in data) {
        var firstname = data[x].firstname;
        var lastname = data[x].lastname;
        var birthdate = data[x].birthdate;
        var amka = data[x].amka;

        html += "<tr><td>" + firstname + "</td><td>" + lastname + "</td><td>" + birthdate +  "</td><td>" + "<button onclick='certified_doctor(" + amka + ");'>Πιστοποιηση</button>" + "</td></tr>";
    }
    html += "</table>";
    console.log("HTML from createTableFromJSONForDoctors");
    console.log(html);
    return html;
}





function deleteUser(amka) {
    var data = "{ 'amka' : '" + amka + "' }";
    console.log(data);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("message").style.color="rgb(0, 0, 153)";            
            document.getElementById("message").innerText="Η διαγραφή εγινε επιτυχως!";
        }else {
            document.getElementById("message").style.color="red";
            document.getElementById("message").innerText="Υπηρξε προβλημα κατα την διαγραφή";
        } 
    };
    xhttp.open("DELETE","servlet_delete_user");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    
}


function createTableFromJSONForDeleteUsers(data) {
    var html = "<table id='users-table'><tr><th>Username</th><th>Ονομα</th><th>Επώνυμο</th><th>Ημερομηνια Γεννησης</th></tr>";
    
    for (const x in data) {
        var username = data[x].username
        var firstname = data[x].firstname;
        var lastname = data[x].lastname;
        var birthdate = data[x].birthdate;
        var amka = data[x].amka;

        html += "<tr><td>" + username + "</td><td>" + firstname + "</td><td>" + lastname + "</td><td>" + birthdate +  "</td><td>" + "<button onclick='deleteUser(" + amka + ");'>Διαγραφή</button>" + "</td></tr>";
    }
    html += "</table>";
    console.log("HTML from createTableFromJSONForDeleteUsers");
    console.log(html);
    return html;
}








function deleteDoctor(amka) {
    var data = "{ 'amka' : '" + amka + "' }";
    console.log(data);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("message").style.color="rgb(0, 0, 153)";            
            document.getElementById("message").innerText="Η διαγραφή εγινε επιτυχως!";
        }else {
            document.getElementById("message").style.color="red";
            document.getElementById("message").innerText="Υπηρξε προβλημα κατα την διαγραφή";
        } 
    };
    xhttp.open("DELETE","servlet_delete_doctor");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    
}

function createTableFromJSONForDeleteDoctors(data) {
    var html = "<table id='doctors-table'><tr><th>Username</th><th>Ονομα</th><th>Επώνυμο</th><th>Ημερομηνια Γεννησης</th></tr>";
    
    for (const x in data) {
        var username = data[x].username
        var firstname = data[x].firstname;
        var lastname = data[x].lastname;
        var birthdate = data[x].birthdate;
        var amka = data[x].amka;

        html += "<tr><td>" + username + "</td><td>" + firstname + "</td><td>" + lastname + "</td><td>" + birthdate +  "</td><td>" + "<button onclick='deleteDoctor(" + amka + ");'>Διαγραφή</button>" + "</td></tr>";
    }
    html += "</table>";
    console.log("HTML from createTableFromJSONForDeleteDoctors");
    console.log(html);
    return html;
}




