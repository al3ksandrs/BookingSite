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
console.log(userId);

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


// LIKE/MATCHING SYSTEEM

function likeButtonClick(){             //kan nu const window.location.search gebruiken
    console.log("Huidige gebruiker: " + userId);
}

const naam = document.querySelector("#profielnaam");

FYSCloud.API.queryDatabase(                 //kan nu const window.location.search gebruiken
    'SELECT * FROM gebruiker WHERE id = ?', [userId]
).then(function (data){
    naam.innerHTML = data[0].naam
}).catch(function (reason){
    console.log(reason)
})
