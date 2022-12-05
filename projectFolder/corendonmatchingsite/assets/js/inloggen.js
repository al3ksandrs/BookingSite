// Fys Cloud stuff

FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE id = 1"
).then(function(data) {
    console.log(data);
}).catch(function(reason) {
    console.log(reason);
});

function checkIn() {
    let email = document.getElementById("emailin");
    let wachtwoord = document.getElementById("wachtwoordin");
    console.log(wachtwoord.value)
    if (ValidateEmail(email) === true) {
        if (ValidateAccount(email, wachtwoord) === true) {
            window.location.href="profiel.html";
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

function ValidateAccount(inputEText, inputWText)
{
    return true;    // For now returns true all the time
}