/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function on_load(){
    document.getElementById('test_date').valueAsDate = new Date();
}

function new_test(){
    
    if(check_metrices()===0) return 0;
    
    if(check_date()===0) return 0;
    
    req_new();
    
    return 1;
}

function req_new(){
    
    let myForm = document.getElementById('myform');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("msg-submit").innerHTML = "Καταχωρηθηκε με επιτυχια το Test";
            document.getElementById("myform").reset();


            setTimeout(function(){
                document.getElementById("msg-submit").innerHTML = '';
            }, 2000);
            
            
        } else if(xhr.status === 409){
            alert("Υπαρχει ειδη αυτο το Test");
        }else if (xhr.status !== 200) {
            alert("Request failed. Returned status of " + xhr.status );
        }
    };
    xhr.open('POST', 'http://localhost:8080/Computers_REST_API/lab/lab/newBloodTest');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData); 
}


function check_metrices(){
   if(document.getElementById("vitamin_d3").value==="0" && document.getElementById("vitamin_b12").value==="0" && document.getElementById("cholesterol").value==="0" && document.getElementById("blood_sugar").value==="0" && document.getElementById("iron").value==="0"){
        alert("Πρεπει να βαλετε τουλαχιστον μια μετρηση");
        return 0;
    }
    return 1;
}

function check_date(){
    var value=document.getElementById("test_date").value;
    var today=new Date();
    var tmp=new Date(value);
    
    if(tmp>today){
        alert("Date invalid");
        return 0;
    }
    return 1;
}


function req_get_tests(){
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("form2").reset();
            const obj = JSON.parse(xhr.responseText);
            var count= Object.keys(obj).length;
            document.getElementById("msg").style.visibility="visible";
            document.getElementById("msg").innerHTML="<h3>"+count+" Tests</h3>";
            
            var i;
            for(i in obj){
                document.getElementById("msg").innerText+='\n';
                document.getElementById("msg").innerText+=JSON.stringify(obj[i]);
            }
            
        }else if(xhr.status === 400){
            alert(xhr.responseText);
        }else if (xhr.status !== 200) {
            alert("Request failed. Returned status of " + xhr.status );
            
        }
    };
    var amka = document.getElementById("amka_get").value;
    var URL="http://localhost:8080/Computers_REST_API/lab/lab/bloodTests/"+amka;
    var fromDate=document.getElementById("fromDate").value;
    var toDate=document.getElementById("toDate").value;

    console.log(fromDate+"---"+toDate);
    if(fromDate!==""){
        URL+="?fromDate="+fromDate; 
        var date1=new Date(fromDate);    
        if(toDate!==""){
            var date2=new Date(toDate);
            if(date1>date2){
                alert("Error fromdate > todate");
                return 0;
            }
            if(date1!==date2) URL+="&toDate="+toDate; 
        }
    }
    
    xhr.open("GET", URL);
    xhr.send();
}

function req_measure(){
    
        var amka = document.getElementById("amka_form3").value;
        var measure=$('#measure').val();
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("form3").reset();
                const obj = JSON.parse(xhr.responseText);
                var count= Object.keys(obj).length;
                document.getElementById("msg").style.visibility="visible";
                document.getElementById("msg").innerHTML="<h3>"+count+" Tests</h3>";
                
                var i;
                for(i in obj){
                    var value_of_measure= value1(measure,obj,i);
                    var level=value2(measure,obj,i);
                    document.getElementById("msg").innerText+='\n';
                    document.getElementById("msg").innerText+=JSON.stringify("Medical Center: "+obj[i].medical_center +" Date: " + obj[i].test_date + " "+measure+": "+ value_of_measure +" "+measure+"_level: "+level);       
                }
                
            }else if(xhr.status === 400){
                alert(xhr.responseText);
            }else if (xhr.status !== 200) {
                alert("Request failed. Returned status of " + xhr.status );
            }
        };
    
    
    var URL="http://localhost:8080/Computers_REST_API/lab/lab/bloodTestMeasure/"+amka+"/"+measure;
    
    xhr.open("GET",URL);
    xhr.send();
    
}

function value1(measure,obj,i){
    if(measure==="blood_sugar") return obj[i].blood_sugar;
    if(measure==="iron") return obj[i].iron;
    if(measure==="cholesterol") return obj[i].cholesterol;
    if(measure==="vitamin_d3") return obj[i].vitamin_d3;
    if(measure==="vitamin_b12") return obj[i].vitamin_b12;
}

function value2(measure,obj,i){
    if(measure==="blood_sugar") return obj[i].blood_sugar_level;
    if(measure==="iron") return obj[i].iron_level;
    if(measure==="cholesterol") return obj[i].cholesterol_level;
    if(measure==="vitamin_d3") return obj[i].vitamin_d3_level;
    if(measure==="vitamin_b12") return obj[i].vitamin_b12_level;
}



function req_update(){
    var value= document.getElementById("value_measure").value;
    if(value<=0) {
        alert("Το value πρεπει να ειναι μεγαλυτερο του 0");
        return 0;
    }
    var id=document.getElementById("id_test").value;
    var measure=document.getElementById("measure-form4").value;
    
    var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("form4").reset();
                const obj = JSON.parse(xhr.responseText);
                
                document.getElementById("msg-submit-form4").innerHTML="Το update εγινε με επιτυχια";
                setTimeout(function(){
                    document.getElementById("msg-submit-form4").innerHTML = '';
                }, 2000);
            }else if(xhr.status === 400){
                alert("Δεν υπαρχει αυτο το ID");
            }else if (xhr.status !== 200) {
                alert("Request failed. Returned status of " + xhr.status );
            }
        };
        
        console.log(id+" "+measure+" "+ value);
    var URL="http://localhost:8080/Computers_REST_API/lab/lab/bloodTest/"+id+"/"+measure+"/"+value;
    xhr.open("PUT",URL);
    xhr.send();
   
        
}



function req_delete(){
    var xhr = new XMLHttpRequest();
        xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("form5").reset();
            const obj = JSON.parse(xhr.responseText);

            document.getElementById("msg-submit-form5").innerHTML="Η διαγραφη εγινε με επιτυχια";
            setTimeout(function(){
                document.getElementById("msg-submit-form5").innerHTML = '';
            }, 2000);
        }else if(xhr.status === 400){
            alert("Δεν υπαρχει αυτο το ID");
        }else if (xhr.status !== 200) {
            alert("Request failed. Returned status of " + xhr.status );
        }
    };
    
    var id = document.getElementById("id_test_form5").value;
    var URL="http://localhost:8080/Computers_REST_API/lab/lab/bloodTestDeletion/"+id;
    xhr.open("DELETE",URL);
    xhr.send();

}







