const notificationMenu = document.getElementsByClassName("notification-menu")
const notificationItems = document.getElementsByClassName("notification")
const notificationMenuFoto = document.getElementById("notification-foto")

let naam = "Roberto"
let leeftijd = 40;

let lijstLengte = notificationItems.length;

const notification = `        <!--NOTIFICATION-->
            <article class="notification-item">
                <p class="notification-text">Gematched met:</p>
                <a href="andermans-profiel.html" class="notification-button">Bezoek profiel</a>
            </article>
            <article class="notification-informatie">
                <img src=../assets/img/rayan.png class="notification-item-foto"></src>
                <article class="notification-naam-leeftijd">
                    <p class="notification-foto-naam">`+ naam +`</p>
                    <p class="notification-foto-leeftijd">`+ leeftijd +`</p>
                </article>
            </article>
            <button class="notification-delete" onclick="this.parentNode.parentNode.removeChild(this.parentNode); verwijderNotification();">
                <i><img src=../assets/img/delete.webp class="kruis" height="30" width="30"></i>
            </button>`

function nieuweNotification() {
    let list = document.createElement("li");
    list.className = "notification"
    list.innerHTML = notification;
    notificationMenu[0].appendChild(list);
    lijstLengte += 1;
    console.log("Lijst lengte = " + lijstLengte)
}

function checkNotificationMenuFoto(){
    if(lijstLengte === 0){
        notificationMenuFoto.src="../assets/img/notification-knop.png"
    }
    else{
        notificationMenuFoto.src="../assets/img/notification-knop-alert.png"
    }
}

function verwijderNotification(){
    lijstLengte -= 1;
}

setInterval(checkNotificationMenuFoto,100);     /* Voer elke 100 milliseconden checkNotificationMenuFoto() uit. */

nieuweNotification()
nieuweNotification()
nieuweNotification()
