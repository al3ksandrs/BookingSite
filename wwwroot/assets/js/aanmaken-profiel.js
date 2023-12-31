const email = FYSCloud.Session.get("temp_email");
const wachtwoord = FYSCloud.Session.get("temp_pass")
const naam = document.querySelector("#naam");
const leeftijd = document.querySelector("#leeftijd");
const biografie = document.querySelector("#bio");
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

    insertGebruikerDb(id, email, wachtwoord, naam, leeftijd, biografie)
})

function insertGebruikerDb(id, email, wachtwoord, naam, leeftijd, biografie) {
    FYSCloud.Utils.getDataUrl("#foto-bestand")
        .then(function (data) {
            if (data.isImage) {
                FYSCloud.API.uploadFile(
                    id + "." + data.extension,
                    data.url
                ).then(function () {
                    finalize(data.extension, id, email, wachtwoord, naam, leeftijd, biografie, id)
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        }).catch(function (reason) {
        console.log(reason);
        finalize("png", id, email, wachtwoord, naam, leeftijd, biografie, "default")
    })
    function finalize(data, id, email, wachtwoord, naam, leeftijd, biografie, fotonaam) {
        FYSCloud.API.queryDatabase(
            "INSERT INTO `gebruiker` SET id = ?, email = ?, wachtwoord = ?, naam = ?, leeftijd = ?, biografie = ?, fotonaam = ?, fotoextensie = ?;",
            [id, email, wachtwoord, naam.value, leeftijd.value, biografie.value, fotonaam, data]
        ).then(function () {
            FYSCloud.Session.set("userId", id)
            FYSCloud.Session.set("email", email)
            FYSCloud.API.queryDatabase(
                "INSERT INTO `reis` SET gebruiker_id = ?;",
                [id])
            FYSCloud.API.queryDatabase(
                "INSERT INTO `talen` SET gebruiker_id = ?;",
                [id])
            FYSCloud.API.queryDatabase(
                "INSERT INTO `interesses` SET gebruiker_id = ?;",
                [id])
            window.location.href = "profiel.html"
        }).catch(function (reason) {
            console.log(reason)
        })
    }
}