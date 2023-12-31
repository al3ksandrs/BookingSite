// Set the document references
const email = document.getElementById("emailin");
const wachtwoord = document.getElementById("wachtwoordin");
const submission = document.querySelector("#submit");
const backout = document.querySelector("#backout")
const alerts = document.querySelector(".alert div")
const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        alerts.innerHTML = "Dit email is ongeldig!";
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
            alerts.innerHTML = "Het wachtwoord is verkeerd!"
            email.focus();
            wachtwoord.value = '';
        }
        // Vangnet
    }).catch(function (reason) {
        console.log("Er ging iets mis, probeer nogmaals...");
        console.log(reason)
        email.focus();
    })
}

submission.addEventListener("click",
    function (event) {
        ValidateEmail(email)
        event.preventDefault();
    })

backout.addEventListener("click", function () {
    window.location.href = "home.html"
})