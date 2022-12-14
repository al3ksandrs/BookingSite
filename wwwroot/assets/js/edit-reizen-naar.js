    // Fys cloud datebase
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"

    // wat de datebase terug stuurt
).then(function (data) {
    console.log(data);
    // waarom het mis gaat
}).catch(function (reason) {
    console.log(reason);});

function Check(checkbox) {
    if (checkbox.checked === true) {
        console.log("Je hebt gekozen voor "+checkbox.id);
    } else {
        console.log("Je hebt niet meer gekozen voor "+checkbox.id);
    }
}