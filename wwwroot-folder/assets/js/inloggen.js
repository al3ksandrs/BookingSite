// Fys Cloud stuff
//
// FYSCloud.API.queryDatabase(
//     "SELECT * FROM gebruiker WHERE email = 'example@email.com'"
// ).then(function(data) {
//     console.log(data);
// }).catch(function(reason) {
//     console.log(reason);
// });

// Set the document references
let email = document.getElementById("emailin");
let wachtwoord = document.getElementById("wachtwoordin");
let submission = document.querySelector("#submit");
let backout = document.querySelector("#backout")
let alerts = document.querySelector(".alert div")
let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// Valideert de email op karakters, later ook op database bestaan
function ValidateEmail(inputEText) {
    // formaat van emails (van "w3schools")
    if (inputEText.value === "") {
        alerts.innerHTML = "Vul eerst iets in!"

    } else if (inputEText.value.match(mailFormat)) {
        // Database Query
        FYSCloud.API.queryDatabase(
            'SELECT * FROM gebruiker WHERE email = ?', [inputEText.value]
        ).then(function (data) {

            // Roep account validatie aan
            ValidateAccount(data[0].email, wachtwoord);

            // Vangnet
        }).catch(function (reason) {
            alerts.innerHTML = "Geen account gevonden! " +
                "<a href='registreren.html'>" +
                "Maak er een aan?" +
                "</a>"
            console.log(reason)
        });
    }
    // Voor als het niet een correcte email is
    else {
        console.log("You have entered an invalid email address!");    // Dit wordt een div die tevoorschijn komt
        email.focus();
        wachtwoord.value = '';
    }
}

// Validatie Account met de Database
function ValidateAccount(inputEText, inputWText) {
    // Database Query
    FYSCloud.API.queryDatabase(
        'SELECT * FROM gebruiker WHERE email = ?', [inputEText]
    ).then(function (data) {

        // Vergelijking Database en Waarde input
        if (inputWText.value === data[0].wachtwoord) {
            // Aanmaken Session ID ...
            FYSCloud.Session.set("userId", data[0].id);
            FYSCloud.Session.set("email", data[0].email);

            // ...Verzenden naar profiel ...
            window.location.href = "profiel.html";
        } else {
            console.log("Wachtwoord verkeerd!") // dit wordt een div die tevoorschijn komt
            alerts.innerHTML = "Wachtwoord verkeerd!"
            email.focus();
            wachtwoord.value = '';
        }

        // Vangnet
    }).catch(function (reason) {
        console.log("Er ging iets mis, probeer nogmaals");
        console.log(reason)
        email.focus();
    })
}

submission.addEventListener("click",
    function () {
        ValidateEmail(email)
    })

backout.addEventListener("click", function () {
    window.location.href = "home.html"
})