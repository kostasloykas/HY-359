"use strict";

function init_body(){
    document.getElementById("doctor-category").style.display="none";
    getLocation();
}

function call_functions(){
    var value=1;
    if(check_password()==0) value=0;
    
    if(check_AMKA()==0) value=0;

    if(check_terms()==0) value=0;
    
    return value;
}

function show_password(){
    if(document.getElementById("Password").type==="text"){
        document.getElementById("Password").type="password";
        document.getElementById("Password-confirm").type="password";
        document.getElementById("password-button").value="Show Password";
        }
        else{
        document.getElementById("Password").type="text";
        document.getElementById("Password-confirm").type="text";
        document.getElementById("password-button").value="Hide Password";
        }
}


/* return 0 : not right password
    return 1 : succeed
*/
function check_password(){
    var pass1=document.getElementById("Password").value;
    var pass2=document.getElementById("Password-confirm").value;
    var x=document.getElementsByClassName("msg-pass");
    x[0].style.color="red";
    x[1].style.color="red";
    /* check an einai idioi */
    if(pass1!==pass2){
        x[0].innerHTML="Δεν ταιριαζουν οι κωδικοι";
        x[1].innerHTML="Δεν ταιριαζουν οι κωδικοι";
        return 0;
    }else{
        x[0].innerHTML="";
        x[1].innerHTML="";
        return 1;
    }


}

function see_strength_password(){
    var pass1=document.getElementById("Password").value;
    var x=document.getElementsByClassName("strength-pass");
    x[0].style.color="red";

    /* check an einai weak */
    var nums=["0","1","2","3","4","5","6","7","8","9"];
    var count_nums=0;
    for (let i=0;i<pass1.length;i++){
        if(pass1[i] in nums){
            count_nums++;
        }
    }
    if(count_nums>=(pass1.length/2)) {
        x[0].innerHTML="Weak Password<br>"; 
        return 0;
    }

    
    for (let i=0;i<pass1.length;i++){
        count_nums=0;
        for(let j=0;j<pass1.length;j++){
            if(pass1[j]===pass1[i]) count_nums++;
        }
        if(count_nums>=(pass1.length/2)) {
            x[0].innerHTML="Weak Password<br>"; 
            return 0;
        }
    }   
    
    /* check an einai strong password */

    var length_pass=pass1.length;
    var pososto= length_pass*0.8;
    var valid=0;
    const array=[];
    for (let i=0;i<length_pass;i++){
        if(array.includes(pass1[i])) continue;
        else {
            valid++;
            array.push(pass1[i]);
        }
    }
    if(valid>=pososto) {
        x[0].style.color="green";
        x[0].innerHTML="Strong Password<br>"; 
        return 1;
    }

    x[0].style.color="orange";
    x[0].innerHTML="Medium Password<br>"; 
    return 1;
}


function doctor(){
    var doctordiv = document.getElementById("doctor-category");
    var user=document.getElementById("user-type").value;
    doctordiv.style.marginTop="30px";

    if(user==="aplos"){
        doctordiv.style.display = "none";
        document.getElementById("label-address").innerText="Διευθυνση Οικιας:";
    }else if (user==="giatros") {
        doctordiv.style.display = "block";
        document.getElementById("label-address").innerText="Διευθυνση Ιατρείου:";
    }
    
}

function check_AMKA(){
    var birthday=document.getElementById("date").value;
    birthday=birthday.split("-");
    var year=birthday[0][2]+birthday[0][3];
    var month=birthday[1];
    var day=birthday[2];
    birthday=day+month+year;
    var amka=document.getElementById("AMKA").value;
    /* if not sompatible to birthdate */
    if(amka.indexOf(birthday) != 0) {
        document.getElementById("msg-amka").style.color="red";
        document.getElementById("msg-amka").innerText="Λαθος καταχωρηση ΑΜΚΑ";
        return 0;
    }else document.getElementById("msg-amka").innerText="";

    return 1;
}

function check_terms(){
    var box=document.getElementById("agree-terms");
    if(box.checked !== true){
        document.getElementById("msg-terms").innerText="Πρεπει να σημφωνησετε με τους ορους";
        document.getElementById("msg-terms").style.color="red";
        return 0;
    }else document.getElementById("msg-terms").innerText="";

    return 1;
}



/* -----------------------------INITIALIZE MAP--------------------------------- */

let lat=undefined;
let lon=undefined;
function check_addr(){
    lat=undefined;
    lon=undefined;
    send_req(document.getElementById("Address").value);
}

function send_req(address){
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(xhr.responseText);
            lat=undefined;
            lon=undefined;
            if(obj[0]===undefined){
                document.getElementById("msg-address").innerText="Δεν βρεθηκε αυτη η διευθυνση";
                return;
            }else if(!obj[0].display_name.includes("Crete") && !obj[0].display_name.includes("Κρήτη")){
                document.getElementById("msg-address").innerText="Η υπηρεσια ειναι διαθεσιμη μονο στην Κρητη";
                return;
            }else{
                document.getElementById("msg-address").innerText="";
            }
            lat=obj[0].lat;
            lon=obj[0].lon;
            document.getElementById("see-map").style.display="inline";
            
        }
    });
   
    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+address+"&accept-language=en&format=json&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d8411a84a8mshf5884f4d72ca62fp1808a6jsna58f1b00cced");
    xhr.send(data);
}

function see_map(){
    init_map();
    document.getElementById("Map").style.display="block";
    handler(setPosition(lat,lon),"kostas loukas");
}

let flag=0;
let map;
function init_map(){
    flag++;
    if(flag>1) return;
    map = new OpenLayers.Map("Map");
    var mapnik= new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);
}



function setPosition(lat, lon){
    var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position= new OpenLayers.LonLat(lon, lat).transform( fromProjection,toProjection);
    return position;
}

var markers=undefined;
function handler(position, message){
    if(markers!=undefined) markers.destroy();
    //Markers
    markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    //Protos Marker
    var mar=new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register("mousedown", mar, function(evt) {
    handler(position,message);});

    //Orismos zoom
    const zoom = 14;
    map.setCenter(position, zoom);
}




/* -----------------------------GET LOCATION AUTO--------------------------------- */




let msg_location;
function getLocation() {
    msg_location = document.getElementById("msg-location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        msg_location.style.color="red";
        msg_location.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("fill-fields").disabled=false;
    msg_location.style.color="white";
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    send_req_reverse();
    see_map();
}

function showError(error) {
    document.getElementById("fill-fields").disabled=true;
    msg_location.style.color="red";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        msg_location.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        msg_location.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        msg_location.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        msg_location.innerHTML = "An unknown error occurred.";
        break;
    }
}


let city=undefined;
let country=undefined;
let addr=undefined;
function fill_fields(){
    document.getElementById("country").value=country;
    document.getElementById("City").value=city;
    document.getElementById("Address").value=addr;
}


function send_req_reverse(){
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var file=this.responseText;
            console.log(this.responseText); 
            /* JSON file */
            if(file.startsWith("{")){
                file=this.responseText;
                const obj=JSON.parse(file);
                city=obj.address.city;
                country=obj.address.country;
                addr=obj.address.road;                
            }

        }
    });
    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat="+lat+"&lon="+lon+"&accept-language=en&format=json&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d8411a84a8mshf5884f4d72ca62fp1808a6jsna58f1b00cced");
    xhr.send(data);
}





function RegisterPost(){
    
    if(call_functions()==0 || flag_username==0 || flag_email==0 || flag_amka==0) {
        document.getElementById("msg-submit").style.margin="0px 50px";
        document.getElementById("msg-submit").style.color="red";
        document.getElementById("msg-submit").innerHTML ="Request failed.<br>";
        return 0;
    }else document.getElementById("msg-submit").innerHTML ="";
    
    flag_username=0;
    flag_email=0;
    flag_amka=0;

    let myForm = document.getElementById("myForm");
    let formData = new FormData(myForm);
    if(document.getElementById("user-type").value==="aplos"){
        formData.delete("specialty");
        formData.delete("doctor_info");
    }
    formData.append("lon", lon);
    formData.append("lat", lat);
    formData.delete("user-type");
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    
    console.log(jsonData);
    
    if(jsonData.includes("script") || jsonData.includes("style") ){
        alert("Καπου υπαρχει script ή style");
        return 0;
    }
    
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var jsondata=JSON.parse(xhr.responseText);
            var data= JSON.stringify(jsondata);
            document.getElementById("msg-submit").style.color="white";
            var doctor="doctor_info";
            if(data.includes(doctor)){
                $("#msg-submit").html("Η εγγραφή σας πραγματοποιήθηκε, αλλά θα πρέπει να σας πιστοποιήσει ο διαχειριστής");
            }else{
                $("#msg-submit").html("Η εγγραφή σας πραγματοποιήθηκε επιτυχώς");
            }
            $('#myForm')[0].reset();
            $('#table-after-registration').append(createTableFromJSON(jsondata));
            document.getElementById("login-butt").style.display="block";
        } else if (xhr.status !== 200) {
            document.getElementById("msg-submit").style.color="red";
            document.getElementById("msg-submit").innerHTML ="Request failed. Returned status of " + xhr.status + "<br>";
        }
    };
    
    
    if(document.getElementById("user-type").value==="aplos"){
    xhr.open("POST", "Register_user");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
    
    }else {
    xhr.open("POST", "Register_doctor");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
    }
    
}
function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
    var category=x;
    var value=data[x];
    
    html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;
}


var flag_username=0;
function req_for_username(){
    
    
    var data = $("#myForm").serialize();
    if(data["username"]==="") return 0;
   
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            flag_username=1;
            document.getElementById("msg-username").innerText="";
        }else if(xhttp.status === 403){
            flag_username=0;
            document.getElementById("msg-username").innerText="Υπαρχει ηδη αυτο το ονομα";
        } 
    };
    xhttp.open("POST","servlet_username");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    
    
}


var flag_email=0;
function req_for_email(){
    
    var data = $("#myForm").serialize();
    if(data["email"]==="") return 0;
   
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

var flag_amka=0;
function req_for_amka(){
    
    var data = $("#myForm").serialize();
    if(data["amka"]==="") return 0;
   
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            flag_amka=1;
            document.getElementById("msg-amka-req").innerText="";
        }else if(xhttp.status === 403){
            flag_amka=0;
            document.getElementById("msg-amka-req").innerText="Υπαρχει ηδη αυτο το amka";
        } 
    };
    xhttp.open("POST","servlet_amka");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    
}

