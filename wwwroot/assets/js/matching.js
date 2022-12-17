window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    initializeMessageBoard();
}

function initializeMessageBoard(){
    loadMatches();
}

function loadMatches(){
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker")
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
    let pfBox = createFoto(gebruiker.id, gebruiker.fotoextensie, gebruiker.naam, gebruiker.leeftijd);
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

    let textBox = document.createElement("p");
    textBox.classList.add("naam");
    textBox.innerText = (naam + age(leeftijd));

    pfBox.append(imageBox, textBox);
    return pfBox;
}

function createInfo(id) {
    let infoBox = document.createElement("div");
    infoBox.classList.add("flexbox-item");
    infoBox.classList.add("flexbox-item-2");

    let ul1 = createUl("Interesses");
    let ul2 = createUl("Spreekt");
    let ul3 = createUl("Wilt graag naar");

    let button = document.createElement("a");
    button.classList.add("profiel_link");
    button.classList.add("grid-col-span-2");
    button.setAttribute("href", ("https://mockup-is104-4.fys.cloud/andermans-profiel.html?"+ id));
    button.innerText = "Bezoek profiel";

    infoBox.append(ul1, ul2, ul3, button);
    return infoBox;
}

function createUl(textUl) {
    let ul = document.createElement("ul");
    ul.innerText = textUl;
    let li1 = document.createElement("li");
    li1.innerText = "informatie 1"
    let li2 = document.createElement("li");
    li2.innerText = "informatie 2"
    let li3 = document.createElement("li");
    li3.innerText = "informatie 3"

    ul.append(li1,li2,li3);
    return ul
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
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
}