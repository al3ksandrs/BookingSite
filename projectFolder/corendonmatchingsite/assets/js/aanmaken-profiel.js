// FYSCloud.Utils
//     .getDataUrl(document.querySelector("#foto-bestand"))
//     .then(function(data) {
//         FYSCloud.API.uploadFile(
//             "test.png",
//             data.url
//         ).then(function(data) {
//             console.log(data);
//         }).catch(function(reason) {
//             console.log(reason);
//         });
//     }).catch(function(reason) {
//     console.log(reason);
// })

function gogo() {
    FYSCloud.Utils.getDataUrl("#foto-bestand")
            .then(function (data) {
                if (data.isImage) {
                    document.querySelector("#imagePreview").src = data.url;
                }
                console.log(data)
            }).catch(function (reason) {
                console.log(reason);
            })
}

window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    initializeGebruiker();
}

function initializeGebruiker(){
    document.querySelector("#verder").addEventListener("click", evt => submitGebruiker(evt))
}

function submitGebruiker(evt) {
    evt.preventDefault();

    let email = FYSCloud.Session.get("temp_email");
    let wachtwoord = FYSCloud.Session.get("temp_pass")
    let naam = document.querySelector("#naam").value;
    let leeftijd = document.querySelector("#leeftijd").value;
    let biografie = document.querySelector("#bio").value;

    let gebruiker = new Gebruiker(null, email, wachtwoord, naam, leeftijd, biografie);
    console.log(gebruiker);
    insertGebruikerDb(gebruiker);
}

function insertGebruikerDb(gebruiker) {
    FYSCloud.API.queryDatabase(
        "INSERT INTO 'gebruiker' ('email', 'wachtwoord', 'naam', 'leeftijd', 'biografie') VALUES (?,?,?,?,?);",
        [gebruiker.email,  gebruiker.wachtwoord, gebruiker.naam, gebruiker.leeftijd, gebruiker.biografie]
    )
        .then(response => {
            Gebruiker.id = response.insertId;
        })
        .catch(function(reason) {
            console.error(reason);
        });
}

function Gebruiker(id, email, wachtwoord, naam, leeftijd, biografie) {
    this.id = id;
    this.email = email
    this.wachtwoord = wachtwoord;
    this.naam = naam;
    this.leeftijd = leeftijd;
    this.biografie = biografie;
}
