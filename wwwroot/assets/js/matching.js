window.addEventListener("DOMContentLoaded", initialize);
let column_name;
const LIMIT_INFO = 3;
const interessesKeus = document.querySelector("#interesses")
const geslachtKeus = document.querySelector("#Talen");
const leeftijdKeus = document.querySelector("#leeftijd");
const bestemmingKeus = document.querySelector("#bestemming");
const userId = FYSCloud.Session.get("userId", "Not Found")

function initialize() {
    initializeMessageBoard();
}

function initializeMessageBoard(){
    loadMatches();
}

function loadMatches(){
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker WHERE NOT id = ?", [userId])
        .then(matches => {
            for (const matchJson of matches) {
                let gebruiker = convertDbJson(matchJson)
                displayMessage(gebruiker);
            }
        })
        .catch(function(reason) {
            console.error(reason);
        });
}

function displayMessage(gebruiker) {
    let matchElement = document.createElement("div");
    matchElement.classList.add("flexbox-container");
    let pfBox = createFoto(gebruiker.fotonaam, gebruiker.fotoextensie, gebruiker.naam, gebruiker.leeftijd);
    let infoBox = createInfo(gebruiker.id);

    matchElement.append(pfBox, infoBox);
    document.querySelector("main").appendChild(matchElement);
}

function createFoto(id, fotoextensie, naam, leeftijd) {
    let pfBox = document.createElement("div");
    pfBox.classList.add("flexbox-item");
    pfBox.classList.add("flexbox-item-1");

    let imageBox = document.createElement("img");
    imageBox.classList.add("match_foto");
    imageBox.src = "/uploads/" + id + "." + fotoextensie
    imageBox.setAttribute("alt", "default.jpg")

    let textBox = document.createElement("p");
    textBox.classList.add("naam");
    textBox.innerText = (naam + "   " + age(leeftijd));

    pfBox.append(imageBox, textBox);
    return pfBox;
}

function createInfo(id) {
    let infoBox = document.createElement("div");
    infoBox.classList.add("flexbox-item");
    infoBox.classList.add("flexbox-item-2");

    let interesses = createUlInteresses("Interesses", id);
    let spreekt = createUlSpreekt("Spreekt", id);
    let reis = createUlReis("Wilt graag naar", id);

    let button = document.createElement("a");
    button.classList.add("profiel_link");
    button.classList.add("grid-col-span-2");
    button.setAttribute("href", ("andermans-profiel.html?"+ id));
    button.innerText = "Bezoek profiel";

    infoBox.append(interesses, spreekt, reis, button);
    return infoBox;
}

function createUlInteresses(interessesText, id) {
    let ul = document.createElement("ul");
    ul.innerText = interessesText;
    let count = 0;
    FYSCloud.API.queryDatabase(
        'SELECT * FROM `interesses` WHERE (`gebruiker_id` = ?)', [id]
    ).then(function (data) {
        // Loop through all the columns of first row
        for (let i = 1; i < Object.keys(data[0]).length; i++) {
            column_name = Object.keys(data[0])[i];
            if (Object.values(data[0])[i] === 1) {
                let x = document.createElement("li");
                x.innerText = column_name;
                ul.append(x);
                count += 1;
            }
            if (count === LIMIT_INFO) {break;}
        }
    }).catch(function (reason){
        console.log(reason)
    })
    return ul;
}

function createUlSpreekt(spreektText, id) {
    let ul = document.createElement("ul");
    ul.innerText = spreektText;
    let count = 0;
    FYSCloud.API.queryDatabase(
        'SELECT * FROM `talen` WHERE (`gebruiker_id` = ?)', [id]
    ).then(function (data) {
        // Loop through all the columns of first row
        for (let i = 1; i < Object.keys(data[0]).length; i++) {
            column_name = Object.keys(data[0])[i];
            if (Object.values(data[0])[i] === 1) {
                let x = document.createElement("li");
                x.innerText = column_name;
                ul.append(x);
                count += 1;
            }
            if (count === LIMIT_INFO) {break;}
        }
    }).catch(function (reason){
        console.log(reason)
    })
    return ul;
}

function createUlReis(reisText, id) {
    let ul = document.createElement("ul");
    ul.innerText = reisText;
    let count = 0;
    FYSCloud.API.queryDatabase(
        'SELECT * FROM `reis` WHERE (`gebruiker_id` = ?)', [id]
    ).then(function (data) {
        // Loop through all the columns of first row
        for (let i = 1; i < Object.keys(data[0]).length; i++) {
            column_name = Object.keys(data[0])[i]
            if (Object.values(data[0])[i] === 1) {
                let x = document.createElement("li");
                x.innerText = column_name;
                ul.append(x);
                count += 1;
            }
            if (count === LIMIT_INFO) {break;}
        }
    }).catch(function (reason){
        console.log(reason)
    })
    return ul;
}

function Gebruiker(id, naam, leeftijd, fotonaam, fotoextensie) {
    this.id = id;
    this.naam = naam;
    this.leeftijd = leeftijd;
    this.fotonaam = fotonaam;
    this.fotoextensie = fotoextensie;
}

function convertDbJson(matchJson) {
    return new Gebruiker(matchJson['id'],
        matchJson['naam'],
        matchJson['leeftijd'],
        matchJson['fotonaam'],
        matchJson['fotoextensie']);
}

function age(dateString){
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth + 1;
}

// Filter naar standaard waarde
// function Reset1() {
//     interessesKeus.selectedIndex = 0;
// }
//
// function Reset2() {
//     geslachtKeus.selectedIndex = 0;
// }
//
// function Reset3() {
//     leeftijdKeus.selectedIndex = 0;
// }
//
// function Reset4() {
//     bestemmingKeus.selectedIndex = 0;
// }

// Elke filter waarde wordt nu gereset naar
function Reset5() {
    interessesKeus.selectedIndex = 0;
    geslachtKeus.selectedIndex = 0;
    leeftijdKeus.selectedIndex = 0;
    bestemmingKeus.selectedIndex = 0;
}

interessesKeus.addEventListener("change", function () {
    console.log(interessesKeus.value)
    document.querySelector("main").innerHTML = ""
    loadMatches()
})