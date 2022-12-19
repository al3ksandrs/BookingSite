// alert ('Hello World ');
// FYSCloud.API.queryDatabase(
//     "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"
//
//  // Dit stuurt de data terug van de database
// ).then(function (data) {
//     console.log(data);
//
// // melding als er iets mis is gegaan
// }).catch(function (reason) {
//     console.log(reason);});

//input profiel content
const form = document.querySelector('.profielc-form,.biografie-form,.interesses-form,.interesses-activiteit');
const taskInput = document.getElementById('voornaam');
const taskInput1 = document.getElementById('leeftijd');
const taskInput2 = document.getElementById('image');
const taskInput3 = document.getElementById('geslacht');
//input Biografie
const taskInput4 = document.getElementById('biografie');
// input interesses
const taskInput5 = document.getElementById('gebruikersnaam');

form.addEventListener('submit',runEvent);
function runEvent(e){
    console.log(`EVENT TYPE: ${e.type}`);

//Get Input value
console.log(taskInput.value,taskInput1.value,taskInput2.value,taskInput3.value,taskInput4,taskInput5.value);
e.preventDefault();
}

//checkbox
const cb = document.querySelector('#checkboxShopen,#checkboxZwemmen,#checkboxUitgaan');
console.log(cb.checked); // false



//weet niet zeker of ik dit nodig heb
// const voornaam  = document.getElementById("voornaam");
//
// FYSCloud.API.queryDatabase(
//     'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
// ).then(function (data){
//     voornaam.innerHTML = data[2].naam
//
// }).catch(function (reason){
//     console.log(reason)
// })

//persoonlijke informatie uit de database
// document.querySelector("#foto-bestand").addEventListener("change",
//
//     function updateImage() {
//         FYSCloud.Utils.getDataUrl("#foto-bestand")
//             .then(function (data) {
//                 if (data.isImage) {
//                     document.querySelector("#imagePreview").src = data.url;
//                 }
//                 console.log(data)
//             }).catch(function (reason) {
//             console.log(reason);
//         })
//     })

const bioInh = document.querySelector("#biografie");
// const pfpInh = document.querySelector("#profielfoto");
// const prlInh = document.querySelector("#profielnaam");



console.log(FYSCloud.Session.get("userId", "Not Found"));
console.log(FYSCloud.Session.get("email", "Not Found"))

function age(dateString){
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
}

FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data){
    bioInh.innerHTML = data[0].biografie
    pfpInh.src = "/uploads/" + data[0].id + "." + data[0].fotoextensie
    prlInh.innerHTML = data[0].naam + "         " + age(data[0].leeftijd)

}).catch(function (reason){
    console.log(reason)
})
