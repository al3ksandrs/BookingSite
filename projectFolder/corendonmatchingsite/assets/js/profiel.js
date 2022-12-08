// Fys cloud datebase
FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE email = 'emily56@email.com'"

// wat de datebase terug stuurt
)
    .then(function (data) {
    console.log(data);
// waarom het mis gaat
}).catch(function (reason) {
    console.log(reason);
});

// Popup stuff
const serviceItems = document.querySelector(".service-items");
const popup = document.querySelector(".popup-box")
const popupCloseBtn = popup.querySelector(".popup-close-btn");
const popupCloseIcon = popup.querySelector(".popup-close-icon");

// Klikfunctie in de console
serviceItems.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() == "button") {
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
    if (event.target == popup) {
        popupBox();
    }
})

function popupBox() {
    popup.classList.toggle("open");
}

// Fys Cloud stuff

