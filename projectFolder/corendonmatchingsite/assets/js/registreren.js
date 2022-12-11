// Initializering nuttige variabelen

let email = document.getElementById("emailin");
let wachtwoord = document.getElementById("wachtwoordin");
let wachtwoord2 = document.getElementById("wachtwoord2in");
let submission = document.querySelector("#submit");
let backout = document.querySelector("#backout");
let alerts = document.querySelector(".alert div");
let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function ValidateEmail(inputE, inputW1, inputW2) {
    FYSCloud.API.queryDatabase(
        'SELECT 1 FROM gebruiker WHERE email = ?', [inputE]
    ).then(function (data){

        if (data[0] === undefined) {

            if (inputE.match(mailFormat)){
                VerifyPass(inputE, inputW1, inputW2)
            } else alerts.innerHTML = "Voer een geldig email :D"

        } else alerts.innerHTML = ('Deze gebruiker bestaat al ;p. Hier kan je <a href="../paginas/inloggen.html">inloggen!</a>')

    }).catch(function (reason){
        console.log(reason)
    })
}

function VerifyPass(inputE, inputW1, inputW2) {
    if ((inputW1 === inputW2) && (inputW1.length >= 6)) {
        handleEmail(inputE, inputW1);
    } else console.log("Not match or too short") // Divify
}

function handleEmail(inputE, inputW1) {
    FYSCloud.Session.set("temp_id", "404");
    FYSCloud.Session.set("temp_email", inputE)
    FYSCloud.Session.set("temp_pass", inputW1) // Moet ofc encrypted zijn. Maar, goed mag voor nu

//     [Email] Disabled for now
//     FYSCloud.API.sendEmail({
//         from: {
//             name: "Group",
//             address: "group@fys.cloud"
//         },
//         to: [
//             {
//                 name: "Gebruiker",
//                 address: inputE
//             }
//         ],
//         subject: "Just a test!",
//         html: "<h1>Hello Lennard!</h1><p>This is an email :)</p>"
//     }).then(function(data) {
//         console.log(data);
//     }).catch(function(reason) {
//         console.log(reason);
//     })
    window.location.href="../paginas/aanmaken-intresses.html";
}

submission.addEventListener("click",
    function () {
        ValidateEmail(email.value, wachtwoord.value, wachtwoord2.value)
    })

backout.addEventListener("click", function () {
    window.location.href = "../paginas/home.html"
})