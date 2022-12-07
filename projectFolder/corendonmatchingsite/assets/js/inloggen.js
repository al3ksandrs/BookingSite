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

// Activator voor inloggen HTML (veranderen naar listener)
function checkIn() {
    console.log(wachtwoord.value);
    ValidateEmail(email);
}

// Valideert de email op karakters, later ook op database bestaan

function ValidateEmail(inputEText)
{
    // formaat van emails (van "w3schools")
    let mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(inputEText.value.match(mailformat))
    {
        console.log("You have entered a valid email address!");    // Dit wordt een div

        // Database Query
        FYSCloud.API.queryDatabase(
            'SELECT email FROM gebruiker WHERE email = ?', [inputEText.value]
        ).then(function (){

            // Roep account validatie aan
            ValidateAccount(email, wachtwoord);
        // Vangnet
        }).catch(function (reason) {
            console.log("Er is iets fout gegaan!"); // Ook een div
            console.log(reason)
        });
    }

    // Voor als het niet een correcte email is
    else
    {
        console.log("You have entered an invalid email address!");    // Dit wordt een div die tevoorschijn komt
        email.focus();
        wachtwoord.value='';
    }
}

// Validatie Account met de Database
function ValidateAccount(inputEText, inputWText)
{
    // Database Query
    FYSCloud.API.queryDatabase(
    "SELECT wachtwoord FROM gebruiker WHERE email = ?", [inputEText.value]
    ).then(function (data){

        // Vergelijking Database en Waarde input
        if (inputWText.value === data[0].wachtwoord) {
            // Aanmaken Session ID ...
            FYSCloud.Session.set("userId", inputEText.value);
            // Do something

            // ...Verzenden naar profiel ...
            window.location.href="profiel.html";
        } else {
            console.log("Wachtwoord verkeerd!") // dit wordt een div die tevoorschijn komt
            email.focus();
            wachtwoord.value='';
        }

    // Vangnet
    }).catch(function (reason){
        console.log("Er ging iets mis, probeer nogmaals");
        console.log(reason)
        email.focus();
    })
}