// Fys cloud datebase
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"

    // wat de datebase terug stuurt
).then(function (data) {
    console.log(data);
// waarom het mis gaat
}).catch(function (reason) {
    console.log(reason);});


// LIKE/MATCHING SYSTEEM

function likeButtonClick(){
    console.log("Huidige gebruiker: " + FYSCloud.Session.get("userId"));
}

const naam = document.querySelector("#naamtext");

FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data){
    naam.innerHTML = data[0].naam
}).catch(function (reason){
    console.log(reason)
})
