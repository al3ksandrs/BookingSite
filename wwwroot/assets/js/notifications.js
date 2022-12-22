window.addEventListener('load', function () {
    const notificationMenu = document.getElementsByClassName("notification-menu")
    const notificationItems = document.getElementsByClassName("notification")
    const notificationMenuFoto = document.getElementById("notification-foto")

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
                    <p class="notification-foto-naam">` + naam + `</p>
                    <p class="notification-foto-leeftijd">` + leeftijd + `</p>
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

    nieuweNotification("Roberto", 40)
    nieuweNotification("Henrik", 54)
    nieuweNotification("Alberto", 46)

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
})