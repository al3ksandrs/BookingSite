// ophalen checkbox waarde uit database
const currentUser = FYSCloud.Session.get("userId", "Not Found");
let country

FYSCloud.API.queryDatabase(
    'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [currentUser]
).then(function (data) {
// Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        country = Object.keys(data[0])[i]
        document.getElementById(country).checked = Object.values(data[0])[i] === 1;
    }
}).catch(function (reason){
    console.log(reason)
})



// checkt of de checkbox gecheckt is
function Check(checkbox) {
    const checkId = checkbox.id;
    if (checkbox.checked === true) {
        console.log("Je hebt gekozen voor " + checkId);
        checkboxDb(checkbox, true);
        // checkboxTrueDb(checkbox)
    } else {
        console.log("Je hebt niet meer gekozen voor " + checkId);
        checkboxDb(checkbox, false);
        // checkboxFalseDb(checkbox)
    }
}


// functie voor het veranderen van checkbox waarde in de database
// function checkboxTrueDb(checkbox) {
//     FYSCloud.API.queryDatabase(
//         "UPDATE `reis` SET ? = true WHERE (`gebruiker_id` = ?)",
//         [checkbox.id, '2']
//         // wat de datebase terug stuurt
//     ).then(function (data) {
//         console.log(data);
//         console.log(checkbox.id);
//         // waarom het mis gaat
//     }).catch(function (reason) {
//         console.log(reason);});
// }
//
// function checkboxFalseDb(checkbox) {
//     FYSCloud.API.queryDatabase(
//         "UPDATE `reis` SET ? = false WHERE (`gebruiker_id` = ?)",
//         [checkbox.id, '2']
//         // wat de datebase terug stuurt
//     ).then(function (data) {
//         console.log(data);
//         console.log(checkbox.id);
//         // waarom het mis gaat
//     }).catch(function (reason) {
//         console.log(reason);});
// }

function checkboxDb(checkbox, bool) {
    FYSCloud.API.queryDatabase(
        "UPDATE `reis` SET " + checkbox.id + " = ? WHERE `gebruiker_id` = ?;",
        [bool, currentUser]
        // wat de datebase terug stuurt
    ).then(function (data) {
        // waarom het mis gaat
    }).catch(function (reason) {
        console.log(reason);});
}
