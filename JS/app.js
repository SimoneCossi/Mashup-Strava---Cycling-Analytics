'use strict'

////////////////////////////////////////////////////////////////////////////////////////////////
// STRAVA

                        // SOSTITUIRE QUI SOTTO IL CODICE NUOVO
var stravaToken = "Bearer 3e962dc7e4fd0db8b23882a035ea9424360761dc";
StravaFunction(stravaToken);

//FUNZIoNE CHE SVOLGE IL LAVORO DI LETTURA E INSERIMENTO DEI DATI
function StravaFunction(stravaKey){
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
}

// Lettura del token dall'HTML e ricaricarica di tutti i dati della pagina
document.getElementById("StravaToken").onchange = function(){
    stravaToken = "Bearer " + document.querySelector("input").value;
    // resetto le tabelle html in modo da non stampare i dati sotto i vecchi dati
    document.getElementById("stravaTable").innerHTML = "";
    document.getElementById("mashupTable").innerHTML = "";
    document.getElementById("cyclingTable").innerHTML = "";
    // chiamo le funzioni per andare a inserire i nuovi dati nelle tabelle
    StravaFunction(stravaToken);
    inserimentoCycling();
}


////////////////////////////////////////////////////////////////////////////////////////////////
// CYCLING ANALYTICS
var cyclingKey = "Bearer UfjMBIU34VYYQayFchUza7KcJ5vffQFA";
var cyclingResult = httpGet("https://www.cyclinganalytics.com/api/me", cyclingKey);

// Eliminazione dei caratteri inutili
var cyclingData = cyclingResult.replace(/{|}|"/g, "");
inserimentoCycling();
// Inserisco l'inserimento dei dati nell'html in una funzione in modo da poterlo richiamare quando cambio il token di accesso alla API Strava
// Passaggio dati al HTML e generazione della tabella
function inserimentoCycling(){
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
