console.log("Notifications aan het laden! [0%]")

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

sleep(4000) // Wacht 4 secondes toddat alles geladen is in de pagina

const notificationMenu = document.querySelector('.notification-menu');
const notificationItems = document.querySelector('.notification');
const notificationMenuFoto = document.querySelector('#notification-foto');
let lijstLengte = notificationItems.length

/* Nieuwe notificatie aanmaken */
function nieuweNotification(naam, leeftijd) {
    /* Notificatie template opslaan als variabel. */
    const notification = `        <!--NOTIFICATION-->
            <article class="notification-item">
                <p class="notification-text">Gematched met:</p>
                <a href="andermans-profiel.html" class="notification-button">Bezoek profiel</a>
            </article>
            <article class="notification-informatie">
                <img src=assets/img/rayan.png alt = "profielfoto" class="notification-item-foto"></src>
                <article class="notification-naam-leeftijd">
                    <p class="notification-foto-naam">`+ naam +`</p>
                    <p class="notification-foto-leeftijd">`+ leeftijd +`</p>
                </article>
            </article>
            <button class="notification-delete" onclick="this.parentNode.parentNode.removeChild(this.parentNode); verwijderNotification();">
                <i><img src=assets/img/delete.webp alt = "verwijder" class="kruis" height="30" width="30"></i>
            </button>`

    let list = document.createElement("li")
    list.className = "notification"
    list.innerHTML = notification
    notificationMenu[0].appendChild(list)

    /* lijstLengte aanpassen en output printen */
    lijstLengte += 1
    console.log("Lijst lengte = " + lijstLengte)
}

console.log("Notifications geladen! [100%]")

/* Checken of lijstLengte 0 is zodat de alert op de menuknop weggaat of blijft. */
function checkNotificationMenuFoto(){
    if(lijstLengte === 0){
        notificationMenuFoto.src="assets/img/notification-knop.png"
    }
    else{
        notificationMenuFoto.src="assets/img/notification-knop-alert.png"
    }
}

function verwijderNotification(){
    lijstLengte -= 1
}

/* Voer elke 100 milliseconden checkNotificationMenuFoto() uit. */
setInterval(checkNotificationMenuFoto,100)

nieuweNotification("Roberto", 40)
nieuweNotification("Henrik", 54)
nieuweNotification("Alberto", 46)
