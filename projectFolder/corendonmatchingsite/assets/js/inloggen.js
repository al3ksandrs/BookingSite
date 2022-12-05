// Fys Cloud stuff

// FYSCloud.API.queryDatabase(
//     "SELECT * FROM gebruiker WHERE email = 'example@email.com'"
// ).then(function(data) {
//     console.log(data);
// }).catch(function(reason) {
//     console.log(reason);
// });

let email = document.getElementById("emailin");
let wachtwoord = document.getElementById("wachtwoordin");

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
        console.log("You have entered a valid email address!");    //The pop-up alert for a valid email address
        FYSCloud.API.queryDatabase(
            'SELECT email FROM gebruiker WHERE email = ?', [inputEText.value]
        ).then(function (){
            ValidateAccount(email, wachtwoord);
        }).catch(function (reason) {
            console.log("Er is iets fout gegaan!");
            console.log(reason)
        });
    }
    else
    {
        console.log("You have entered an invalid email address!");    //The pop-up alert for an invalid email address
        email.focus();
        wachtwoord.value='';
    }
}

function ValidateAccount(inputEText, inputWText)
{
    FYSCloud.API.queryDatabase(
    "SELECT wachtwoord FROM gebruiker WHERE email = ?", [inputEText.value]
    ).then(function (data){
        if (inputWText.value === data[0].wachtwoord) {
            window.location.href="profiel.html";
        } else {
            console.log("Wachtwoord verkeerd!")
            email.focus();
            wachtwoord.value='';
        }
    }).catch(function (reason){
        console.log("Er ging iets mis, probeer nogmaals");
        console.log(reason)
        email.focus();
    })
}