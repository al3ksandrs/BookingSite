const currentUser = FYSCloud.Session.get("userId", "Not Found");
let interesse

FYSCloud.API.queryDatabase(
    'SELECT * FROM `interesses` WHERE (`gebruiker_id` = ?)', [currentUser]
).then(function (data) {
// Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        interesse = Object.keys(data[0])[i]
        document.getElementById(interesse).checked = Object.values(data[0])[i] === 1;
    }
}).catch(function (reason) {
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

function checkboxDb(checkbox, bool) {
    FYSCloud.API.queryDatabase(
        "UPDATE `interesses` SET " + checkbox.id + " = ? WHERE `gebruiker_id` = ?;",
        [bool, currentUser]
        // wat de datebase terug stuurt
    ).then(function (data) {
        // waarom het mis gaat
    }).catch(function (reason) {
        console.log(reason);
    });
}
