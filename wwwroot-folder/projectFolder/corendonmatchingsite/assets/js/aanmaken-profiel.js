const email = FYSCloud.Session.get("temp_email");
const wachtwoord = FYSCloud.Session.get("temp_pass")
const naam = document.querySelector("#naam");
const leeftijd = document.querySelector("#leeftijd");
const biografie = document.querySelector("#bio");
let fotobestand;
let id;

document.querySelector("#foto-bestand").addEventListener("change",

function updateImage() {
    FYSCloud.Utils.getDataUrl("#foto-bestand")
        .then(function (data) {
            if (data.isImage) {
                document.querySelector("#imagePreview").src = data.url;
            }
            console.log(data)
        }).catch(function (reason) {
        console.log(reason);
    })
})

document.querySelector("#verder").addEventListener("click", function (){
    id = Math.floor(Math.random() * Date.now())

    FYSCloud.Utils.getDataUrl("#foto-bestand")
        .then(function (data) {
            if (data.isImage) {
                fotobestand = data.value;
            }
            console.log(fotobestand)
            console.log(data)
        }).catch(function (reason) {
        console.log(reason);
    })

    insertGebruikerDb(id, email, wachtwoord, naam, leeftijd, biografie, fotobestand)
})


function insertGebruikerDb(id, email, wachtwoord, naam, leeftijd, biografie, fotobestand) {
    FYSCloud.API.queryDatabase(
        "INSERT INTO `gebruiker` SET id = ?, email = ?, wachtwoord = ?, naam = ?, leeftijd = ?, biografie = ?;",
        [id, email, wachtwoord, naam.value, leeftijd.value, biografie.value]
        ).then(response => {
            console.log("thenned")
        FYSCloud.API.uploadFile(
            "test.png",
            fotobestand.url
        ).then(function(data) {
            console.log(data);
        }).catch(function(reason) {
            console.log(reason);
        });

        })
        .catch(function(reason) {
            console.log("thunded")
            console.error(reason);
        })
}