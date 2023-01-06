
// Inhoud Stuff
const bioInh = document.querySelector("#biografie_inhoud");
const pfpInh = document.querySelector("#profielfoto");
const prlInh = document.querySelector("#profielnaam");
// Interesses
const LIMIT_INFO = 5;

// Popup stuff
const serviceItems = document.querySelector(".service-items");
const popup = document.querySelector(".popup-box")
const popupCloseBtn = popup.querySelector(".popup-close-btn");
const popupCloseIcon = popup.querySelector(".popup-close-icon");

// Klikfunctie in de console
serviceItems.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "button") {
        console.log("Clicked")
// retourneert de elementen in het document die overeenkomt met de opgegeven selector of groep selectors.
        const item = document.querySelector(".popup_stuff");
        const h3 = item.querySelector("h3").innerHTML;
        const readMoreCont = item.querySelector(".read-more-cont").innerHTML;
        popup.querySelector("h3").innerHTML = h3;
        popup.querySelector(".popup-body").innerHTML = readMoreCont;
        popupBox();
    }

})
// Popup close button voor het geval dat een gebruiker sluit (read less)
popupCloseBtn.addEventListener("click", popupBox);
popupCloseIcon.addEventListener("click", popupBox);
// Popup
popup.addEventListener("click", function (event) {
    if (event.target === popup) {
        popupBox();
    }
})

function popupBox() {
    popup.classList.toggle("open");
}

// Fys Cloud stuff

console.log(FYSCloud.Session.get("userId", "Not Found"));
console.log(FYSCloud.Session.get("email", "Not Found"))

function age(dateString){
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth + 1;
}

let ulInteresses = document.querySelector("#interesses");
let count = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM interesses WHERE (gebruiker_id = ?)', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("li");
            x.innerText = column_name;
            ulInteresses.append(x);
            count += 1;
        }
        if (count === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})

let ulSpreekt = document.querySelector("#spreekt");
let countSpreekt = 0;
FYSCloud.API.queryDatabase(
    'SELECT *  FROM talen WHERE (gebruiker_id = ?)', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name  = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("li");
            x.innerText = column_name;
            ulSpreekt.append(x);
            countSpreekt += 1;
        }
        if (countSpreekt === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})


let ulReizen = document.querySelector("#reizen");
let countReis = 0;
FYSCloud.API.queryDatabase(
    'SELECT * FROM reis WHERE (gebruiker_id = ?)', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data) {
    // Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        column_name = Object.keys(data[0])[i];
        if (Object.values(data[0])[i] === 1) {
            let x = document.createElement("li");
            x.innerText = column_name;
            ulReizen.append(x);
            countReis += 1;
        }
        if (countReis === LIMIT_INFO) {break;}
    }
}).catch(function (reason){
    console.log(reason)
})


FYSCloud.API.queryDatabase(
    'SELECT * FROM gebruiker WHERE id = ?', [FYSCloud.Session.get("userId", "Not Found")]
).then(function (data){
    bioInh.innerHTML = data[0].biografie
    pfpInh.src = "/uploads/" + data[0].fotonaam + "." + data[0].fotoextensie
    prlInh.innerHTML = data[0].naam + "         " + age(data[0].leeftijd)

}).catch(function (reason){
    console.log(reason)
})





const interessesKeus = document.querySelector("#interesses")
const geslachtKeus = document.querySelector("#Talen");
const leeftijdKeus = document.querySelector("#leeftijd");
const bestemmingKeus = document.querySelector("#bestemming");




function loadMatches(){
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker WHERE NOT id = ?", [FYSCloud.Session.get("userId", "Not Found")])
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
    let matchElement = document.createElement("section");
    matchElement.classList.add("container");
    let pfBox = createFoto(gebruiker.fotonaam, gebruiker.fotoextensie, gebruiker.naam, gebruiker.leeftijd);
    let infoBox = createInfo(gebruiker.id);

    matchElement.append(pfBox, infoBox);
    document.querySelector(".hellooo").appendChild(matchElement);
}

function createFoto(id, fotoextensie, naam, leeftijd) {
    let pfBox = document.createElement("article");
    pfBox.classList.add("textbox1");
    pfBox.classList.add("text3");

    let imageBox = document.createElement("img");
    imageBox.classList.add("profile2");
    imageBox.src = "/uploads/" + id + "." + fotoextensie
    imageBox.setAttribute("alt", "default.jpg")

    let textBox = document.createElement("pre");
    textBox.classList.add("text3");
    textBox.innerText = (naam + "   " + age(leeftijd));

    pfBox.append(imageBox, textBox);
    return pfBox;
}

function createInfo(id) {
    let infoBox = document.createElement("article");
    infoBox.classList.add("container");

    let interesses = createUlInteresses("Interesses", id);
    let spreekt = createUlSpreekt("Spreekt", id);
    let reis = createUlReis("Wilt graag naar", id);

    // let button = document.createElement("a");
    // button.classList.add("profiel_link");
    // button.classList.add("grid-col-span-2");
    // button.setAttribute("href", ("andermans-profiel.html?"+ id));
    // button.innerText = "Bezoek profiel";

    infoBox.append(interesses, spreekt, reis);
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

loadMatches()