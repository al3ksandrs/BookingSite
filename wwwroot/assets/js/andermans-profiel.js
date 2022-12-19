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

FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [userId]
).then(function (data){
    bioInh.innerHTML = data[0].biografie
    pfpInh.src = "/uploads/" + data[0].id + "." + data[0].fotoextensie
    prlInh.innerHTML = data[0].naam + "         " + age(data[0].leeftijd)

}).catch(function (reason){
    console.log(reason)
})

// CHECKEN OF ER MATCHES ZIJN

function likeButtonClick(){
    console.log("Huidige gebruikerID van bezochte profiel: " + userId);
    console.log("Huidige gebruikerID van ingelogde gebruiker: " + FYSCloud.Session.get("userId", "Not Found"));

    FYSCloud.API.queryDatabase(
        "INSERT INTO `gebruiker_has_gebruiker` SET ingelogde_gebruiker_id = ?, liked_persoon_id = ?;",
        [FYSCloud.Session.get("userId", "Not Found"), userId]
    )

    console.log("Query is gestuurd naar database. (Like systeem)")
}

FYSCloud.API.queryDatabase(
    "SELECT * FROM `fys_is104_4_dev`.`gebruiker_has_gebruiker` WHERE ingelogde_gebruiker_id = ? AND liked_persoon_id = ? OR liked_persoon_id = ? AND ingelogde_gebruiker_id = ?;",
    [FYSCloud.Session.get("userId", "Not Found"), userId, FYSCloud.Session.get("userId", "Not Found"), userId]
).then(function (data){
    FYSCloud.API.queryDatabase(
        "INSERT INTO `matches` SET `gebruiker_id1` = ?, `gebruiker_id2` = ?;",
        [FYSCloud.Session.get("userId", "Not Found"), userId]
    )
    console.log("Match toegevoegd aan matches")
})