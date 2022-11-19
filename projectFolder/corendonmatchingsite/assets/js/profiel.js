// $(".toggle_btn").click(function(){
//     $(this).toggleClass("active");
//     $(".wrapper ul").toggleClass("active");
//
//     if($(".toggle_btn").hasClass("active")){
//         $(".toggle_text").text("Show Less");
//     }
//     else{
//         $(".toggle_text").text("Show More");
//     }
// });

// Popup stuff

const serviceItems = document.querySelector(".service-items");
const popup = document.querySelector(".popup-box")
const popupCloseBtn = popup.querySelector(".popup-close-btn");
const popupCloseIcon = popup.querySelector(".popup-close-icon");

serviceItems.addEventListener("click",function(event){
    if(event.target.tagName.toLowerCase() == "button"){
        console.log("Clicked")
        const item = document.querySelector(".popup_stuff");
        const h3 = item.querySelector("h3").innerHTML;
        const readMoreCont = item.querySelector(".read-more-cont").innerHTML;
        popup.querySelector("h3").innerHTML = h3;
        popup.querySelector(".popup-body").innerHTML = readMoreCont;
        popupBox();
    }

})

popupCloseBtn.addEventListener("click", popupBox);
popupCloseIcon.addEventListener("click", popupBox);

popup.addEventListener("click", function(event){
    if(event.target == popup){
        popupBox();
    }
})

function popupBox(){
    popup.classList.toggle("open");
}

