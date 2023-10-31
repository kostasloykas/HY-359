/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var lat_user = undefined;
var lon_user = undefined;
var guest = 0;
function on_load() {
    isLoggedIn();

    if (guest === 1) {
        enable_functions_for_guest();
    } else {
        $('#logout-butt').show();
        $('#change-data-butt').show();
        $('#health-butt').show();
        $('#doctor-butt').show();
        $('#test-registration-butt').show();
        $('#compare-test-butt').show();
    }
}

function enable_functions_for_guest() {
    $('#doctor-butt').show();
    $('#register-butt').show();
    $('#login-butt').show();
}

function registration_test() {
    document.getElementById('test_date').valueAsDate = new Date();

    if (document.getElementById("blootest-div").hidden === false) {
        $('#blootest-div').hide();
        document.getElementById("blootest-div").hidden = true;
        return 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById("amka").value = data.amka;
            document.getElementById("amka_form3").value = data.amka;
            $('#blootest-div').show();
            document.getElementById("blootest-div").hidden = false;

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'servlet_user_data');
    xhr.send();
}


var map;
var markers_array = new Array();
function init_map() {

    map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

    var lonLat = new OpenLayers.LonLat(25.1343475, 35.3400127).transform(epsg4326, projectTo);
    var zoom = 13;
    map.setCenter(lonLat, zoom);


    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

    for (let i = 0; i < markers_array.length; i++) {
        var tmp = markers_array[i];
        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(tmp[1], tmp[0]).transform(epsg4326, projectTo),
                {description: tmp[2] + " " + tmp[3]},
                {externalGraphic: './img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25}
        );
        vectorLayer.addFeatures(feature);
    }

    map.addLayer(vectorLayer);

    //Add a selector control to the vectorLayer with popup functions
    var controls = {
        selector: new OpenLayers.Control.SelectFeature(vectorLayer, {onSelect: createPopup, onUnselect: destroyPopup})
    };

    function createPopup(feature) {
        feature.popup = new OpenLayers.Popup.FramedCloud("pop",
                feature.geometry.getBounds().getCenterLonLat(),
                null,
                '<div class="markerContent" style="color:black;">' + feature.attributes.description + '</div>',
                null,
                true,
                function () {
                    controls['selector'].unselectAll();
                }
        );
        //feature.popup.closeOnMove = true;
        map.addPopup(feature.popup);
    }

    function destroyPopup(feature) {
        feature.popup.destroy();
        feature.popup = null;
    }

    map.addControl(controls['selector']);
    controls['selector'].activate();

}

function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            guest = 0;
        } else if (xhr.status !== 200) {
            guest = 1;
        }
    };
    xhr.open("GET", "Login", false);
    xhr.send();
}

//ok
function logout(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        window.location.href="./Login_form.html";        
    } else if (xhr.status !== 200) {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}


var current_email;

function req_show_data(){
    if(document.getElementById("form-info").hidden===false) {
        $('#form-info').hide();
        document.getElementById("form-info").hidden=true;
        $('#save-butt').hide();
        return 0;
    }
    
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        var gender=data.gender;

        current_email=data.email;
        document.getElementById("Username").value=data.username;
        document.getElementById("E-mail").value=data.email;
        document.getElementById("Password").value=data.password;
        document.getElementById("Name").value=data.firstname;
        document.getElementById("last-name").value=data.lastname;
        document.getElementById("date").value=data.birthdate;
        document.getElementById(gender.toString()).checked = true;
        document.getElementById("AMKA").value=data.amka;
        document.getElementById("country").value=data.country;
        document.getElementById("City").value=data.city;
        document.getElementById("Address").value=data.address;
        document.getElementById("Phone-number").value=data.telephone;
        document.getElementById("height").value=data.height;
        document.getElementById("weight").value=data.weight;
        document.getElementById("height").value=data.height;
        document.getElementById("Blood-type").value=data.bloodtype;

            lat_user = data.lat;
            lon_user = data.lon;

        var blooddonor=data.blooddonor;
        if(blooddonor=="1") document.getElementById("blooddonoryes").checked=true;
        else document.getElementById("blooddonorno").checked=true;



        
        $('#form-info').show();
        document.getElementById("form-info").hidden=false;
        $('#save-butt').show();
    } else if (xhr.status !== 200) {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    };
    xhr.open('GET', 'servlet_user_data');
    xhr.send();
    
}


var flag_email=1;
function check_email(){
    var data = $("#form-info").serialize();
    
    if(document.getElementById("E-mail").value===current_email){
        document.getElementById("msg-email").innerText="";
        flag_email=1;
        return 0;
    }
   
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            flag_email=1;
            document.getElementById("msg-email").innerText="";
        }else if(xhttp.status === 403){
            flag_email=0;
            document.getElementById("msg-email").innerText="Υπαρχει ηδη αυτο το email";
        } 
    };
    xhttp.open("POST","servlet_email");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}


function save_data(){
        console.log("sdf");

    if (flag_email === 0) {
        document.getElementById("msg-email").innerText="Μη εγκυρο email";
        return 0;
    }
    let myForm = document.getElementById("form-info");
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    
    console.log(jsonData);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("msg-submit").innerHTML="Οι αλλαγες αποθηκευτηκαν επιτυχως";
            setTimeout(function(){
                document.getElementById("msg-submit").innerHTML = '';
            }, 1500);
        } else if (xhr.status !== 200) {
            console.log("Request failed. Returned status of " + xhr.status + "<br>");
        }
    };
    
    xhr.open("PUT", "update_user");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
    
    
}



//ok
function req_list_doctors(){
    
    if(document.getElementById("doctor_list").hidden===false) {
        $('#doctor_list').hide();
        $('#doctor_list_visit').hide();
        $('#doctor_list_duration').hide();
        document.getElementById("doctor_list").hidden = true;
        $('#map').hide();
        const myNode = document.getElementById("map").innerHTML = "";
        return 0;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
            if (guest === 1) {
                $('#doctor_list').html(createTableFromJSON(responseData));
                $('#doctor_list').show();
                document.getElementById("doctor_list").hidden = false;
                $('#map').show();
                init_map();
            } else if (guest === 0) {
                createTableFromJSONSorted(responseData);
//                $('#doctor_list_visit').html(createTableFromJSONSortedVisit(responseData)); -----------------------------------------------------
                
                $('#doctor_list').show();
                $('#doctor_list_visit').show();
                $('#doctor_list_duration').show();
                document.getElementById("doctor_list").hidden = false;
                $('#map').show();
                init_map();
            }

        } else if (xhr.status !== 200) {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    };
    xhr.open('GET', 'servlet_print_doctors');
    xhr.send();
    
    
}


//ok
function createTableFromJSON(data) {
    html="<table id='doctor-table'><tr><th>Ονομα</th><th>Επώνυμο</th><th>Διεύθυνση</th><th>Πόλη</th><th>Πληροφορίες</th><th>Ειδικότητα</th><th>Τηλέφωνο</th></tr>";
    for (const x in data) {
        var firstname=data[x].firstname;
        var lastname=data[x].lastname;
        var address=data[x].address;
        var city=data[x].city;
        var doctor_info=data[x].doctor_info;
        var specialty=data[x].specialty;
        var telephone = data[x].telephone;
        var lat = data[x].lat;
        var lon = data[x].lon;

        var obj = new Array(lat, lon, firstname, lastname);
        markers_array.push(obj);

        html += "<tr><td>" + firstname + "</td><td>" + lastname + "</td><td>" + address + "</td><td>" + city + "</td><td>" + doctor_info + "</td><td>" + specialty + "</td><td>" + telephone + "</td></tr>";
    }
    html += "</table>";
    return html;
}

function compareDistance(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}

function compareDuration(a, b) {
    if (a.duration < b.duration) {
        return -1;
    }
    if (a.duration > b.duration) {
        return 1;
    }
    return 0;
}

var data_doctors = new Array();
function createTableFromJSONSorted(data) {
    data_doctors = [];
    markers_array = [];
    for (const x in data) {
        var obj = {};
        obj.firstname = data[x].firstname;
        obj.lastname = data[x].lastname;
        obj.address = data[x].address;
        obj.city = data[x].city;
        obj.doctor_info = data[x].doctor_info;
        obj.specialty = data[x].specialty;
        obj.telephone = data[x].telephone;
        obj.lat = data[x].lat;
        obj.lon = data[x].lon;
        obj.duration = null;
        obj.distance = null;
        data_doctors.push(obj);
        var map_data = new Array(obj.lat, obj.lon, obj.firstname, obj.lastname);
        markers_array.push(map_data);
    }
    function req_true_way() {
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const datas = JSON.parse(this.responseText);
                var html1 = "<h2>Duration<h2>";
                var html2 = "<h2>Distance<h2>";
                html1 += "<table id='doctor-table'><tr><th>Ονομα</th><th>Επώνυμο</th><th>Διεύθυνση</th><th>Πόλη</th><th>Πληροφορίες</th><th>Ειδικότητα</th><th>Τηλέφωνο</th></tr>";
                html2 += "<table id='doctor-table'><tr><th>Ονομα</th><th>Επώνυμο</th><th>Διεύθυνση</th><th>Πόλη</th><th>Πληροφορίες</th><th>Ειδικότητα</th><th>Τηλέφωνο</th></tr>";
                console.log("datas req_true_way");
                console.log(datas);
                x = datas["distances"]["0"];
                y = datas.durations[0];
                console.log(x + " " + y);
                var j = 0;
                var max_x = Math.max(x);
                var max_y = Math.max(y);
                for (const i in data_doctors) {
                    if (x[j] === null) {
                        data_doctors[i].duration = max_x;
                    } else {
                        data_doctors[i].duration = x[j];
                    }
                    j++;
                }
                j = 0;
                console.log(data_doctors);
                for (const i in data_doctors) {
                    if (y[j] === null) {
                        data_doctors[i].distance = max_y;
                    } else {
                        data_doctors[i].distance = y[j];
                    }
                    j++;
                }
                var arr1 = data_doctors.sort(compareDuration);
                var arr2 = data_doctors.sort(compareDistance);
                console.log(arr1);
                console.log(arr2);

                for (const i in arr1) {

                    html1 += "<tr><td>" + arr1[i].firstname + "</td><td>" + arr1[i].lastname + "</td><td>" + arr1[i].address + "</td><td>" + arr1[i].city + "</td><td>" + arr1[i].doctor_info + "</td><td>" + arr1[i].specialty + "</td><td>" + arr1[i].telephone + "</td></tr>";
                }
                html1 += "</table>";

                for (const i in arr2) {
                    html2 += "<tr><td>" + arr2[i].firstname + "</td><td>" + arr2[i].lastname + "</td><td>" + arr2[i].address + "</td><td>" + arr2[i].city + "</td><td>" + arr2[i].doctor_info + "</td><td>" + arr2[i].specialty + "</td><td>" + arr2[i].telephone + "</td></tr>";
                }
                html2 += "</table>";

                document.getElementById("doctor_list").innerHTML = html1;
                document.getElementById("doctor_list_duration").innerHTML = html2;
            }
        };

        let all_destinations = "";

        data_doctors.forEach(function (element) {
            all_destinations += element.lat + "%2C" + element.lon + "%3B";
        });
        all_destinations = all_destinations.substr(0, all_destinations.length - 3);

        xhr.open("GET", "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=" + lat_user + "%2C" + lon_user + "&destinations=" + all_destinations);
        xhr.setRequestHeader("x-rapidapi-host", "trueway-matrix.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "d8411a84a8mshf5884f4d72ca62fp1808a6jsna58f1b00cced");
        xhr.send(data);
    }

    req_true_way();
}





//ok
function health(){
    
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        var birthdate = new Date(data.birthdate);
        var age=2021 - birthdate.getFullYear();
        var weight=data.weight;
        var height=data.height;
        var gender=data.gender;
        
        console.log(age,weight,height,gender);
        if( age===null || data.weight===null || data.heigth===null || data.gender===null) {
            document.getElementById("msg-health").style.color="red";
            document.getElementById("msg-health").innerHTML="Δεν εχετε δηλωσει ολα τα στοιχεια για αυτην την επιλογη";
            return;
        }
        req_bmi(age,weight,height);
        ideal_weight(gender,height);
    } else if (xhr.status !== 200) {
        alert('Request failed. Returned status of ' + xhr.status);
    }
    };
    xhr.open('GET', 'servlet_health');
    xhr.send();

    
}

//ok
function req_bmi(age,weight,height){
    if(document.getElementById("health").hidden===false) {
        $('#health').hide();
        document.getElementById("health").hidden=true;
        $('#health').hide();
        return 0;
    }
    
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                    var data=JSON.parse(this.responseText);
                    var bmi=data.data.bmi;
                    var health=data.data.health;
                    document.getElementById("cel1").innerHTML=bmi;
                    document.getElementById("cel2").innerHTML=health;
                    $('#health').show();
                    document.getElementById("health").hidden=false;

            }
    });

    xhr.open("GET", "https://fitness-calculator.p.rapidapi.com/bmi?age="+age+"&weight="+weight+"&height="+height);
    xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d8411a84a8mshf5884f4d72ca62fp1808a6jsna58f1b00cced");
    xhr.send(data);

}

//ok
function ideal_weight(gender,height){
    const data = null;
    if(gender=="Male") gender="male";
    if(gender=="Female") gender="female";
    if(gender=="Other") alert("User gender is Other");

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                    var data=JSON.parse(this.responseText);
                    var devine = data.data.Devine;
                    document.getElementById("cel3").innerHTML=devine;
            }
    });

    xhr.open("GET", "https://fitness-calculator.p.rapidapi.com/idealweight?gender="+gender+"&height="+height);
    xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d8411a84a8mshf5884f4d72ca62fp1808a6jsna58f1b00cced");

    xhr.send(data);
}