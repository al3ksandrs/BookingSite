// Fys cloud datebase
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"

    // wat de datebase terug stuurt
).then(function (data) {
    console.log(data);
// waarom het mis gaat
}).catch(function (reason) {
    console.log(reason);});
