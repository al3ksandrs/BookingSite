// alert ('Hello World ');
// FYSCloud.API.queryDatabase(
//     "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"
//
//  // Dit stuurt de data terug van de database
// ).then(function (data) {
//     console.log(data);
//
// // melding als er iets mis is gegaan
// }).catch(function (reason) {
//     console.log(reason);});

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

FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data){
    bioInh.innerHTML = data[0].biografie
    pfpInh.src = "/uploads/" + data[0].id + "." + data[0].fotoextensie
    leeftijd.value = (data[0].leeftijd).slice(0, 10);
    prlInh.value = data[0].naam

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

function updateGebruikerDb(naam, leeftijd, biografie) {
    FYSCloud.API.queryDatabase(
        "SELECT fotoextensie FROM gebruiker WHERE id = ?", [FYSCloud.Session.get("userId", "Not Found")]
    ).then(function (data) {
        FYSCloud.API.deleteFile((FYSCloud.Session.get("userId", "Not Found") + "." + data[0].fotoextensie))
    }).catch(function (reason){
        console.log(reason)
    })
    FYSCloud.Utils.getDataUrl("#image")
        .then(function (data) {
            if (data.isImage) {
                FYSCloud.API.uploadFile(
                    FYSCloud.Session.get("userId", "Not Found") + "." + data.extension, data.url
                ).then(function () {
                    updateLeDB(data)
                }).catch(function (reason) {
                    console.log(reason)
                });
            }
        }).catch(function (reason) {
        console.log(reason);
    })

    function updateLeDB(data) {
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET naam = ?, leeftijd = ?, biografie = ?, fotonaam = ?, fotoextensie = ? WHERE id = ?;",
        [naam.value, leeftijd.value, biografie.value, FYSCloud.Session.get("userId", "Not Found"), data.extension, FYSCloud.Session.get("userId", "Not Found")]
    ).then(function (data) {
        // Logged
        window.location.href = "profiel.html"
    }).catch(function (reason) {
        console.log(reason)
    })
    }
}