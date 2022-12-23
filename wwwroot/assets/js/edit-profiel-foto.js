// Inhoud Stuff
const bioInh = document.querySelector("#biografieinhoud");
const pfpInh = document.querySelector("#profielfoto");
const prlInh = document.querySelector("#profielnaam");
const leeftijd = document.querySelector("#leeftijd");
const LIMIT_INFO = 5;
let column_name;
// Fys Cloud stuff
console.log(FYSCloud.Session.get("userId", "Not Found"));
console.log(FYSCloud.Session.get("email", "Not Found"))

const tempBio = FYSCloud.Session.get("tempBio")
const tempName = FYSCloud.Session.get("tempName")
const tempDate = FYSCloud.Session.get("tempDate")
const tempFoto = FYSCloud.Session.get("tempFoto")


FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data){
    if (tempBio === undefined) {
        bioInh.innerHTML = data[0].biografie
        pfpInh.src = "/uploads/" + data[0].fotonaam + "." + data[0].fotoextensie
        leeftijd.value = (data[0].leeftijd).slice(0, 10);
        prlInh.value = data[0].naam
    } else {
        bioInh.innerHTML = tempBio
        pfpInh.src = tempFoto
        leeftijd.value = tempDate
        prlInh.value = tempName
    }
}).catch(function (reason){
    console.log(reason)
})

// Interesses - checkbox
    let ul = document.querySelector("#interesselijst");
    let count = 0;
    FYSCloud.API.queryDatabase(
        'SELECT * FROM interesses WHERE (gebruiker_id = ?)', [FYSCloud.Session.get("userId", "Not Found")]
    ).then(function (data) {
        // Loop through all the columns of first row
        for (let i = 1; i < Object.keys(data[0]).length; i++) {
            column_name = Object.keys(data[0])[i];
            if (Object.values(data[0])[i] === 1) {
                let x = document.createElement("li");
                x.innerText = column_name;
                ul.append(x);
                count += 1;
            }
            if (count === LIMIT_INFO) {break;}
        }
    }).catch(function (reason){
        console.log(reason)
    })

// Reizen naar - checkbox
let ulReizen = document.querySelector("#reizenlijst");
let countReis = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM reis WHERE (gebruiker_id = ?)', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("li");
            x.innerText = column_name;
            ulReizen.append(x);
            countReis += 1;
        }
        if (countReis === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})

// Spreekt  - checkbox
let ulSpreekt = document.querySelector("#spreektLijst");
let countSpreekt = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM talen WHERE (gebruiker_id = ?)', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("li");
            x.innerText = column_name;
            ulSpreekt.append(x);
            countSpreekt += 1;
        }
        if (countSpreekt === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})

// UPDATE NAAR DATABASE ----------------------------------------
document.querySelector("#image").addEventListener("change",

    function updateImage() {
        FYSCloud.Utils.getDataUrl("#image")
            .then(function (data) {
                if (data.isImage) {
                    document.querySelector("#profielfoto").src = data.url;
                }
                console.log(data)
            }).catch(function (reason) {
            console.log(reason);
        })
    })

document.querySelector("#verder").addEventListener("click", function (){
    updateGebruikerDb(prlInh, leeftijd, bioInh)
})

// Delete foto?


function updateGebruikerDb(naam, leeftijd, biografie) {
    FYSCloud.Utils.getDataUrl("#image")
        .then(function (data) {
            if (data.isImage) {
                FYSCloud.API.queryDatabase(
                    "SELECT fotoextensie, fotonaam FROM gebruiker WHERE id = ?", [FYSCloud.Session.get("userId", "Not Found")]
                ).then(function (data) {
                    if (FYSCloud.AP.fileExists(data[0].fotonaam + "." + data[0].fotoextensie)) {
                        FYSCloud.API.deleteFile(data[0].fotonaam + "." + data[0].fotoextensie)
                    }
                }).catch(function (reason){
                    console.log(reason)
                })

                FYSCloud.API.uploadFile(
                    FYSCloud.Session.get("userId", "Not Found") + "." + data.extension, data.url
                ).then(function () {
                    FYSCloud.API.queryDatabase(
                        "UPDATE gebruiker SET fotonaam = ?, fotoextensie = ? WHERE id = ?;",
                        [FYSCloud.Session.get("userId", "Not Found"), data.extension, FYSCloud.Session.get("userId", "Not Found")]
                    ).then(function () {
                    updateLeDB()
                    })
                }).catch(function (reason) {
                    console.log(reason)
                });
            }
        }).catch(function (reason) {
        console.log(reason);
        updateLeDB()
    })

    function updateLeDB() {
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET naam = ?, leeftijd = ?, biografie = ? WHERE id = ?;",
        [naam.value, leeftijd.value, biografie.value, FYSCloud.Session.get("userId", "Not Found")]
    ).then(function () {
        // Logged
        FYSCloud.Session.remove("tempBio")
        FYSCloud.Session.remove("tempName")
        FYSCloud.Session.remove("tempDate")
        FYSCloud.Session.remove("tempFoto")
        window.location.href = "profiel.html"
    }).catch(function (reason) {
        console.log(reason)
    })
    }
}

function infoStorage() {
    FYSCloud.Session.set("tempBio", bioInh.value);
    FYSCloud.Session.set("tempName", prlInh.value);
    FYSCloud.Session.set("tempDate", leeftijd.value);
    FYSCloud.Session.set("tempFoto", pfpInh.src)
}
function infoStorageRM() {
    FYSCloud.Session.remove("tempBio")
    FYSCloud.Session.remove("tempName")
    FYSCloud.Session.remove("tempDate")
    FYSCloud.Session.remove("tempFoto")
}