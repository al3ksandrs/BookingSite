// Inhoud Stuff
const bioInh = document.querySelector("#biografie_inhoud");
const pfpInh = document.querySelector("#profielfoto");
const prlInh = document.querySelector("#profielnaam");
const twitter = document.querySelector("#twitter");
const facebook = document.querySelector("#facebook");
const instagram = document.querySelector("#instagram");
// removing the first character '?'
const search = window.location.search;
const userId = search.slice(1);

function age(dateString) {
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth + 1;
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
let info;
let column_name;
const LIMIT_INFO = 3;
const MAX_REIS = 5;

    // Interesses ophalen DB
FYSCloud.API.queryDatabase(
    'SELECT * FROM `interesses` WHERE (`gebruiker_id` = ?)', [userId]
).then(function (data) {
    // Loop through all the columns of first row
    let countInteresses = 0;
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("h3");
            x.classList.add("infotext");
            x.innerText = "- " + column_name;
            document.getElementById("interesses").append(x);
            countInteresses += 1;
        }
        if (countInteresses === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})
    // Talen spreekt inladen DB
FYSCloud.API.queryDatabase(
    'SELECT * FROM `talen` WHERE (`gebruiker_id` = ?)', [userId]
).then(function (data) {
    // Loop through all the columns of first row
    let countTalen = 0;
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("h3");
            x.classList.add("infotext");
            x.innerText = "- " + column_name;
            document.getElementById("spreekt").append(x);
            countTalen += 1;
        }
        if (countTalen === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})

// Reizen naar inladen DB
FYSCloud.API.queryDatabase(
    'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [userId]
).then(function (data) {
    // Loop through all the columns of first row
    let countReis = 0;
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("h3");
            x.classList.add("infotext");
            x.innerText = "- " + column_name;
            document.getElementById("reizen").append(x);
            countReis += 1;
        }
        if (countReis === MAX_REIS) {break;}
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

// // // Why this?
// // const search = window.location.search;
// // const userId = search.slice(1);
// // console.log(userId);
//
// // And not this?
// const userIdO = Object.values(FYSCloud.URL.queryString());

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

/* Dit is voor de tekst die moved */

const text = document.querySelector(".sec-textt");

const textLoad = () => {
    setTimeout(() => {
        text.textContent = "bent gematched!";
    }, 0);
    setTimeout(() => {
        text.textContent = "heeft uw reismaatje gevonden";
    }, 4000);
    setTimeout(() => {
        text.textContent ="kan uw reis boeken!" ;
    }, 8000); //1s = 1000 milliseconds
}

textLoad();
setInterval(textLoad, 12000);