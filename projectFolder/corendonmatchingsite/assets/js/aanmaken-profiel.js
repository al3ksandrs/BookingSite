let email = FYSCloud.Session.get("temp_email");
let wachtwoord = FYSCloud.Session.get("temp_pass")
let naam = document.querySelector("#naam");
let leeftijd = document.querySelector("#leeftijd");
let biografie = document.querySelector("#bio");

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
                fotobestand = data.url;
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
        "INSERT INTO `gebruiker` SET id = ?, email = ?, wachtwoord = ?, naam = ?, leeftijd = ?, biografie = ?, fotobestand = ?;",
        [id, email, wachtwoord, naam.value, leeftijd.value, biografie.value, fotobestand]
        ).then(response => {
            console.log("thenned")


        })
        .catch(function(reason) {
            console.log("thunded")
            console.error(reason);
        })
}