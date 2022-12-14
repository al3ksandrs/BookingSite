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
        if (Object.values(data[0])[i] === 1) {
            document.getElementById(country).checked = true;
        } else {
            document.getElementById(country).checked = false;
        }
    }
}).catch(function (reason) {
    console.log(reason)
})

// checkt of de checkbox gecheckt is
function Check(checkbox) {
    let x = controleren(checkbox);
    if (checkbox.checked === true) {
        console.log("Je hebt gekozen voor " + checkbox.id);
        checkboxTrueDb(checkbox, x);
    } else {
        console.log("Je hebt niet meer gekozen voor " + checkbox.id);
        checkboxFalseDb(checkbox, x);
    }
}

const currentUser = FYSCloud.Session.get("userId", "Not Found");

function controleren(checkbox) {
    FYSCloud.API.queryDatabase(
        'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [2]
    ).then(function (data) {
        for (let i = 1; i < Object.keys(data[0]).length; i++) {
            if (Object.keys(data[0])[i] === checkbox.id) {
                return (Object.keys(data[0])[i]);
            } else return null;
        }
    }).catch(function (reason) {
        console.log(reason)
    })
}

// functie voor het veranderen van checkbox waarde in de database
function checkboxTrueDb(checkbox, x) {
    FYSCloud.API.queryDatabase(
        "UPDATE `reis` SET ? = '1' WHERE (`gebruiker_id` = ?)",
        [x, currentUser]
        // wat de datebase terug stuurt
    ).then(function (data) {
        console.log(data);
        console.log(checkbox.id);
        // waarom het mis gaat
    }).catch(function (reason) {
        console.log(reason);
    });
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
        console.log(reason);
    });
}
