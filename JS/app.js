'use strict'

////////////////////////////////////////////////////////////////////////////////////////////////
// STRAVA

var stravaKey = "Bearer e4b5a04502a1bd2d1b48807d6232dbfbfbe6f03e";
var stravaResult = httpGet("https://www.strava.com/api/v3/athlete", stravaKey);

// Eliminazione dei caratteri inutili
var stravaData = stravaResult.replace(/{|}|"/g, "");

// Passaggio dati al HTML e generazione della tabella
var stravaDataSplit = stravaData.split(",");
for(var a = 0; a < stravaDataSplit.length; a++)
{
    var b;
    b = stravaDataSplit[a].split(":");
    document.getElementById("stravaTable").innerHTML += '<tr><td style="font-weight:600">'+b[0]+'</td><td class="attributi">'+b[1]+'</td></tr>';

    // Condizione per andare a inserire le informazioni utili all'interno del mashup
    if(a > 2 && a < 9){
        document.getElementById("mashupTable").innerHTML += '<tr><td style="font-weight:600">'+b[0]+'</td><td class="attributi">'+b[1]+'</td></tr>';
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////
// CYCLING ANALYTICS

var cyclingKey = "Bearer UfjMBIU34VYYQayFchUza7KcJ5vffQFA";
var cyclingResult = httpGet("https://www.cyclinganalytics.com/api/me", cyclingKey);

// Eliminazione dei caratteri inutili
var cyclingData = cyclingResult.replace(/{|}|"/g, "");

// Passaggio dati al HTML e generazione della tabella
var cyclingDataSplit = cyclingData.split(",");
for(var a = 0; a < cyclingDataSplit.length; a++)
{
    var b;
    b = cyclingDataSplit[a].split(":");
    document.getElementById("cyclingTable").innerHTML += '<tr><td style="font-weight:600">'+b[0]+'</td><td class="attributi">'+b[1]+'</td></tr>';

    // Condizione per andare a inserire le informazioni utili all'interno del mashup
    if(a == 0 || (a > 2 && a < 6)){
        document.getElementById("mashupTable").innerHTML += '<tr><td style="font-weight:600">'+b[0]+'</td><td class="attributi">'+b[1]+'</td></tr>'; 
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////
// Funzione per le richieste http
function httpGet(theUrl, key) {
    
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, false);
    xmlHttp.setRequestHeader("Authorization", key);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



