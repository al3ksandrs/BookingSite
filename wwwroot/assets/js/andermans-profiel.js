// Fys cloud datebase
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"
    // wat de datebase terug stuurt
).then(function (data) {
    console.log(data);
// waarom het mis gaat
}).catch(function (reason) {
    console.log(reason);});

checkMatch();
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

FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [userId]
).then(function (data){
    bioInh.innerHTML = data[0].biografie
    pfpInh.src = "/uploads/" + data[0].fotonaam + "." + data[0].fotoextensie
    prlInh.innerHTML = data[0].naam + "         " + age(data[0].leeftijd)

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

FYSCloud.API.queryDatabase(
    /* Checken of er een match is in de gebruiker_has_gebruiker tabel (likes) */
    "SELECT * FROM `fys_is104_4_dev`.`gebruiker_has_gebruiker` WHERE ingelogde_gebruiker_id = ? AND liked_persoon_id = ? OR liked_persoon_id = ? AND ingelogde_gebruiker_id = ?;",
    [FYSCloud.Session.get("userId", "Not Found"), userId, FYSCloud.Session.get("userId", "Not Found"), userId]
).then(function (data){
    /* Als er een match ook is dan voert de code hieronder uit */
    FYSCloud.API.queryDatabase(
        "INSERT INTO `matches` SET `gebruiker_id1` = ?, `gebruiker_id2` = ?;",
        [FYSCloud.Session.get("userId", "Not Found"), userId]
    )
    console.log("Match toegevoegd aan matches")
})

// checkt of er een match is
function checkMatch() {
    FYSCloud.API.queryDatabase(
    "SELECT * FROM `gebruiker_has_gebruiker` WHERE ingelogde_gebruiker_id = ?;"
        [FYSCloud.Session.get("userId", "Not Found")]
    ).then(function (data){
        console.log(data);
        for (let i = 0; i < data[0].length; i++) {
            if(data[0][i] === userId) {
                gematchedButton();
                break;
            }
        }
    })
}

function gematchedButton() {
    let buttons = document.getElementsByClassName("buttons")
    buttons.textContent = '';

    buttons.innerText = "Gematched";
}


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
