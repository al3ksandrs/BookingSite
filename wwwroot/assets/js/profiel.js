
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
