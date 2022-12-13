// alert ('Hello World ');
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"

 // Dit stuurt de data terug van de database
).then(function (data) {
    console.log(data);

// melding als er iets mis is gegaan
}).catch(function (reason) {
    console.log(reason);});


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




const voornaam  = document.getElementById("voornaam");

FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data){
    voornaam.innerHTML = data[0].naam

}).catch(function (reason){
    console.log(reason)
})


// input opslaan selector
// const select = document.querySelector("select");
// //change event
// select.addEventListener('change', runEvent);

//get from storage
// const name = localStorage.getItem('name');
// console.log(name);

// //TAKE 8 - OPSLAAN FOTO
// const inputFoto = document.getElementById('image');
// inputFoto.addEventListener('change', (event)=> {
//     const image = event.target.files[0];
// });

//TAKE7 foto opslaan
// function readURL(input)
// {
//     document.getElementById("image").style.display = "block";
//
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//
//         reader.onload = function (e) {
//             document.getElementById('image').src =  e.target.result;
//         }
//
//         reader.readAsDataURL(input.files[0]);
//     }
// }

//TAKE 6
// let biografieForm = document.getElementById("biografie");
// console.log(biografieForm.value)
//TAKE 5

// document.querySelector('form').addEventListener('submit',
//     function (e){
//     const task = document.getElementById('biografie').value;
//     console.log(biografie);
//
//     e.preventDefault();
//     });

//TAKE 4-
//document.getElementById('voornaam').value = "Emily";
//TAKE 3
// function wawa () {
//     var variable = document.getElementById('voornaam').value;
//     document.getElementById('alert').innerHTML = 'The user input is: ' + variable;
// }

//TAKE 2
// document.getElementsByName('voornaam')[0].valueOf();