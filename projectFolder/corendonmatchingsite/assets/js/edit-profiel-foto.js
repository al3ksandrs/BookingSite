alert ('Hello ');
const form = document.querySelector('form');
const taskInput = document.getElementById('voornaam');

form.addEventListener('submit', runEvent);

function runEvent (e){
    console.log(`EVENT TYPE: ${e.type}`);

//Get Input value
console.log(taskInput.value);

e.preventDefault();
}