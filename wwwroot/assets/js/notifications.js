const notificationMenu = document.getElementsByClassName("notification-menu")
const notificationItems = document.getElementsByClassName("notification")
const notificationMenuFoto = document.getElementById("notification-foto")

let lijstLengte = notificationItems.length

window.addEventListener('load', function () {

    /* Nieuwe notificatie aanmaken */
    function nieuweNotification(naam, leeftijd) {
        /* Notificatie template opslaan als variabel. */
        const notification = `        <!--NOTIFICATION-->
            <articleno class="notification-item">
                <p class="notification-text">Gematched met:</p>
                <a href="andermans-profiel.html" class="notification-button">Bezoek profiel</a>
            </articleno>
            <articleno class="notification-informatie">
                <img src=assets/img/rayan.png alt = "profielfoto" class="notification-item-foto"></src>
                <articleno class="notification-naam-leeftijd">
                    <p class="notification-foto-naam">` + naam + `</p>
                    <p class="notification-foto-leeftijd">` + leeftijd + `</p>
                </articleno>
            </articleno>
            <button123 class="notification-delete" onclick="this.parentNode.parentNode.removeChild(this.parentNode); verwijderNotification();">
                <i><img src=assets/img/delete.webp alt = "verwijder" class="kruis" height="30" width="30"></i>
            </button123>`

        let list = document.createElement("li")
        list.className = "notification"
        list.innerHTML = notification
        notificationMenu[0].appendChild(list)

        /* lijstLengte aanpassen en output printen */
        lijstLengte += 1
        console.log("Lijst lengte = " + lijstLengte)
    }

    nieuweNotification("Roberto", 40)
    nieuweNotification("Henrik", 54)
    nieuweNotification("Alberto", 46)

})

/* Checken of lijstLengte 0 is zodat de alert op de menuknop weggaat of blijft. */
function checkNotificationMenuFoto() {
    if (lijstLengte === 0) {
        notificationMenuFoto.src = "assets/img/notification-knop.png"
    } else {
        notificationMenuFoto.src = "assets/img/notification-knop-alert.png"
    }
}

/* Voer elke 100 milliseconden checkNotificationMenuFoto() uit. */
setInterval(checkNotificationMenuFoto, 1000)

function verwijderNotification() {
    lijstLengte -= 1
}