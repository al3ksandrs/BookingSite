// ophalen checkbox waarde uit database
let country
FYSCloud.API.queryDatabase(
    'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [2]
).then(function (data) {
    console.log(Object.keys(data[0]).length);

    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        country = Object.keys(data[0])[i]
        console.log(Object.values(data[0])[i])
        console.log(country)
        document.getElementById(country).checked = Object.values(data[0])[i] === "1";
    }
}).catch(function (reason){
    console.log(reason)
})



// checkt of de checkbox gecheckt is
function Check(checkbox) {
    if (checkbox.checked === true) {
        console.log("Je hebt gekozen voor " + checkbox.id);
        checkboxTrueDb(checkbox);
    } else {
        console.log("Je hebt niet meer gekozen voor " + checkbox.id);
        checkboxFalseDb(checkbox);
    }
}
const currentUser = FYSCloud.Session.get("userId", "Not Found");

// functie voor het veranderen van checkbox waarde in de database
function checkboxTrueDb(checkbox) {
    FYSCloud.API.queryDatabase(
        "UPDATE `reis` SET ? = '1' WHERE (`gebruiker_id` = ?)",
        [checkbox.id, currentUser]
        // wat de datebase terug stuurt
    ).then(function (data) {
        console.log(data);
        console.log(checkbox.id);
        // waarom het mis gaat
    }).catch(function (reason) {
        console.log(reason);});
}

function checkboxFalseDb(checkbox) {
    FYSCloud.API.queryDatabase(
        "UPDATE `reis` SET `spanje` = '0' WHERE (`gebruiker_id` = ?)",
        [currentUser]
        // wat de datebase terug stuurt
    ).then(function (data) {
        console.log(data);
        console.log(checkbox.id);
        // waarom het mis gaat
    }).catch(function (reason) {
        console.log(reason);});
}
