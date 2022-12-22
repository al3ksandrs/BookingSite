// Fys cloud datebase
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"
    // wat de datebase terug stuurt
).then(function (data) {
    console.log(data);
// waarom het mis gaat
}).catch(function (reason) {
    console.log(reason);});
    // Laden van de database gebruiker gegevens

// Inhoud Stuff
const bioInh = document.querySelector("#biografie_inhoud");
const pfpInh = document.querySelector("#profielfoto");
const prlInh = document.querySelector("#profielnaam");
// removing the first character '?'
const search = window.location.search;
const userId = search.slice(1);

function age(dateString) {
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
}
// database informatie ophalen
FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [userId]
).then(function (data){
    bioInh.innerHTML = data[0].biografie
    pfpInh.src = "/uploads/" + data[0].fotonaam + "." + data[0].fotoextensie
    prlInh.innerHTML = data[0].naam + "         " + age(data[0].leeftijd)

}).catch(function (reason){
    console.log(reason)
})
let count;
let info;
let column_name;
const LIMIT_INFO = 3;
const MAX_REIS = 5;

    // Interesses ophalen DB
count = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM `interesses` WHERE (`gebruiker_id` = ?)', [userId]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("h3");
            x.classList.add("infotext");
            x.innerText = column_name;
            document.getElementById("interesses").append(x);
            count += 1;
        }
        if (count === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})
    // Talen spreekt inladen DB
count = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM `talen` WHERE (`gebruiker_id` = ?)', [userId]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("h3");
            x.classList.add("infotext");
            x.innerText = column_name;
            document.getElementById("spreekt").append(x);
            count += 1;
        }
        if (count === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})

// Reizen naar inladen DB
count = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [userId]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("h3");
            x.classList.add("infotext");
            x.innerText = column_name;
            document.getElementById("reizen").append(x);
            count += 1;
        }
        if (count === MAX_REIS) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})

// CHECKEN OF ER MATCHES ZIJN

function likeButtonClick(){
    /* Wanneer de like button wordt geclicked dan voert deze code uit hieronder */
    console.log("Huidige gebruikerID van bezochte profiel: " + userId);
    console.log("Huidige gebruikerID van ingelogde gebruiker: " + FYSCloud.Session.get("userId", "Not Found"));

    FYSCloud.API.queryDatabase(
        "INSERT INTO `gebruiker_has_gebruiker` SET ingelogde_gebruiker_id = ?, liked_persoon_id = ?;",
        [FYSCloud.Session.get("userId", "Not Found"), userId]
    )

    console.log("Query is gestuurd naar database. (Like systeem)")
}

// FYSCloud.API.queryDatabase(
//     /* Checken of er een match is in de gebruiker_has_gebruiker tabel (likes) */
//     "SELECT * FROM `fys_is104_4_dev`.`gebruiker_has_gebruiker` WHERE ingelogde_gebruiker_id = ? AND liked_persoon_id = ? OR liked_persoon_id = ? AND ingelogde_gebruiker_id = ?;",
//     [FYSCloud.Session.get("userId", "Not Found"), userId, FYSCloud.Session.get("userId", "Not Found"), userId]
// ).then(function (data){
//     /* Als er een match ook is dan voert de code hieronder uit */
//     FYSCloud.API.queryDatabase(
//         "INSERT INTO `matches` SET `gebruiker_id1` = ?, `gebruiker_id2` = ?;",
//         [FYSCloud.Session.get("userId", "Not Found"), userId]
//     )
//     console.log("Match toegevoegd aan matches")
// })

// checkt of er een match is
function checkMatch() {
    console.log("MATCH SCRIPT")
    console.log(userId);
    console.log(FYSCloud.Session.get("userId", "Not Found"))
    FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker_has_gebruiker G INNER JOIN gebruiker G2 ON G.ingelogde_gebruiker_id = G2.id WHERE ingelogde_gebruiker_id = ? AND liked_persoon_id = ? AND liked_persoon_id IN (SELECT ingelogde_gebruiker_id FROM gebruiker_has_gebruiker WHERE liked_persoon_id = ?)",
        [FYSCloud.Session.get("userId", "Not Found"), userId, FYSCloud.Session.get("userId", "Not Found")]
    ).then(function (data){
        console.log(data + "DATA")
        if(data.length > 0){
            document.querySelector(".buttons").style.display = "none";      //.visibility = "hidden";
            document.querySelector(".gematched").style.display = "flex";
        }

    })
}
console.log("test")

checkMatch();

// Zakaria Testing
// // // Fys cloud datebase
// // FYSCloud.API.queryDatabase(
// //     "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"
// //     // wat de datebase terug stuurt
// // ).then(function (data) {
// //     console.log(data);
// // // waarom het mis gaat
// // }).catch(function (reason) {
// //     console.log(reason);});
//
//
// // Inhoud Stuff
// const bioInh = document.querySelector("#biografie_inhoud");
// const pfpInh = document.querySelector("#profielfoto");
// const prlInh = document.querySelector("#profielnaam");
// const buttons = document.querySelector(".buttons")
// // removing the first character '?'
// // // Why this?
// // const search = window.location.search;
// // const userId = search.slice(1);
// // console.log(userId);
//
// // And not this?
// const userIdO = Object.values(FYSCloud.URL.queryString());
//
// const userId = FYSCloud.Session.get("userId", "Not Found")
//
// FYSCloud.API.queryDatabase(
//     'SELECT * FROM gebruiker_has_gebruiker WHERE ingelogde_gebruiker_id = ? AND liked_persoon_id = ? OR liked_persoon_id = ? AND ingelogde_gebruiker_id = ?;',
//     [userId, userIdO, userId, userIdO]
// ).then(function (data) {
//     console.log(data)
// }).catch(function (reason) {
//     console.log(reason)
// })
//
// function age(dateString) {
//     let birth = new Date(dateString);
//     let now = new Date();
//     let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
//     return now.getFullYear() - birth.getFullYear() - beforeBirth;
// }
//
// FYSCloud.API.queryDatabase(
//     'SELECT * FROM gebruiker WHERE id = ?', [userId]
// ).then(function (data){
//     bioInh.innerHTML = data[0].biografie
//     pfpInh.src = "/uploads/" + data[0].id + "." + data[0].fotoextensie
//     prlInh.innerHTML = data[0].naam + "         " + age(data[0].leeftijd)
//
// }).catch(function (reason){
//     console.log(reason)
// })
//
//
// // LIKE/MATCHING SYSTEEM
//
// function likeButtonClick(){             //kan nu const window.location.search gebruiken
//     console.log("Huidige gebruiker: " + userIdO);
//     console.log("Ingelogd gebruiker: " + userId);
// }
//
// // const naam = document.querySelector("#profielnaam");
//
// // FYSCloud.API.queryDatabase(                 //kan nu const window.location.search gebruiken
// //     'SELECT * FROM gebruiker WHERE id = ?', [userId]
// // ).then(function (data){
// //     naam.innerHTML = data[0].naam
// // }).catch(function (reason){
// //     console.log(reason)
// // })
