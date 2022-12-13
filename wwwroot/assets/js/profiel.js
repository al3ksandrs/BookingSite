// // Fys cloud datebase
// FYSCloud.API.queryDatabase(
//     "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"
//
// // wat de datebase terug stuurt
// )
//     .then(function (data) {
//     console.log(data);
// // waarom het mis gaat
// }).catch(function (reason) {
//     console.log(reason);
// });

// Inhoud Stuff
const bioInh = document.querySelector("#biografie_inhoud");
const pfpInh = document.querySelector("#profielfoto");
const prlInh = document.querySelector("#profielnaam");

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
