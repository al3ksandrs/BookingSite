// alert ('Hello World ');




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

//TAKE 1 - PROBEREN
const form = document.getElementsByClassName('profielc-form');
const taskInput = document.getElementById('voornaam');
taskInput.addEventListener('submit',runEvent);
function runEvent(e){
    console.log(`EVENT TYPE: ${e.type}`);

//Get Input value
console.log(taskInput.value);
e.preventDefault();
}


// input opslaan selector
// const select = document.querySelector("select");
// //change event
// select.addEventListener('change', runEvent);

//get from storage
// const name = localStorage.getItem('name');
// console.log(name);