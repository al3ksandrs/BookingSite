// // Fys Cloud stuff
//
// FYSCloud.API.queryDatabase(
//     "SELECT * FROM message"
// ).then(function(data) {
//     console.log(data);
// }).catch(function(reason) {
//     console.log(reason);
// });

function checkIn() {
    let email = document.getElementById("emailin");
    let wachtwoord = document.getElementById("wachtwoordin");
    let wachtwoord2 = document.getElementById("wachtwoord2in")
    if (ValidateEmail(email) === true) {
        if (ValidateWachtwoord(wachtwoord, wachtwoord2) === true) {
            window.location.href="email-confirmation.html";
        }
    }
}

// Valideert de email op karakters, later ook op database bestaan

function ValidateEmail(inputText)
{
    // formaat van emails (van "w3schools")
    let mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(inputText.value)
    if(inputText.value.match(mailformat))
    {
        alert("You have entered a valid email address!");    //The pop-up alert for a valid email address
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");    //The pop-up alert for an invalid email address
        document.getElementById("emailin").focus()
        document.getElementById("wachtwoordin").value='';
        return false;
    }
}

function ValidateWachtwoord(inputW1Text, inputW2Text)
{
    if (inputW1Text.value === inputW2Text.value) {
        return true;
    } else {
        alert("Passwords don't match!")
        return false
    }
}