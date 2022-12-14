// ophalen checkbox waarde uit database
FYSCloud.API.queryDatabase(
    'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [2]
).then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        if (data[i] === 1) {
            document.getElementById(data[i]).checked = true;
        } else {
            document.getElementById(data[i]).checked = false;
        }
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
