// Set the document references
const email = document.getElementById("codein");
const submission = document.querySelector("#submit");
const backout = document.querySelector("#backout")
const alerts = document.querySelector(".alert div")
const tempE = FYSCloud.Session.get("temp_email")
const eCode = (Math.floor(Math.random() * 100000))

// versturen van Email

FYSCloud.API.sendEmail({
    from: {
        name: "Group",
        address: "group@fys.cloud"
    },
    to: [
        {
            name: "Gebruiker",
            address: tempE
        }
    ],
    subject: "Uw verificatie code voor Match4U!",
    html: "<h1>Deze email is bedoeld voor verificatie</h1><p>Hier is uw code, zorg dat u deze invult op hetzelfde apparaat: "+ eCode +"</p>"
}).then(function (data) {
    // Do something?
}).catch(function (reason) {
    console.log(reason);
})

function ValidateReality() {
    if (email.value === eCode.toString()) {
        window.location.href = "aanmaken-profiel.html"
    } else alerts.innerHTML ="<h3>Check ook even uw SPAM box</h3>\n"
}

// Buttons Werkend krijgen (ook met drukken van enter)

submission.addEventListener("click",
    function (event) {
        event.preventDefault();
        ValidateReality()
    }
)

backout.addEventListener("click", function () {
    window.location.href = "home.html"
})