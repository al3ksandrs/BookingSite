function clearIUnputFields() {
    document.getElementById("interesses").value = '';

}
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        select.classList.toggle('select-clicked');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active')
        });
    });
});

// checkLoginStatus() heb ik gehide omdat logout button al in de navbar automatisch staat en als de navbar verandert dan is dit niet nodig

/*function checkLoginStatus() {
    // Check the login status of the user
    var isLoggedIn = !(FYSCloud.Session.get("userId", "Not Found") === "Not Found") /!* check login status *!/;

    // Get the logout button
    var logoutButton = document.getElementById('loguit-knop');

    // If the user is logged in, show the logout button
    if (isLoggedIn) {
        logoutButton.style.display = 'block';
    }
    // If the user is not logged in, hide the logout button
    else {
        logoutButton.style.display = 'none';
    }
}*/

// CORRECTE NAVBAR LOADEN WANNEER PAGE GE-OPENED IS

function loadNavbar(){
    var isLoggedIn = !(FYSCloud.Session.get("userId", "Not Found") === "Not Found") /* checked login status */;

    const navbar = document.querySelector('.navbar');
    const main = document.querySelector('main');
    const navbarIngelogd = `    <ul>
        <li><a href="index.html" class="navbar-normale-button">Home</a></li>
        <li><a href="over-ons.html" class="navbar-normale-button">Over ons</a></li>
        <li class="logo"><img src=assets/img/logo.PNG class="logo-foto"></src></li>
        <li><a href="matching-met-filter.html" class="navbar-normale-button">Matches</a></li>
        <li><a href="profiel.html" class="navbar-normale-button">Profiel</a></li>

        <input id="navbar-menu-toggle" type="checkbox"/>                               <!--navbar menu voor mobile-->
        <label class='navbar-menu-container' for="navbar-menu-toggle">
            <div class='navbar-menu-button'><img src=assets/img/burger-menu.png class="navbar-foto"></src></div>
        </label>
        <ul class="navbar-links">
            <li><a href="index.html" class="navbar-menu-link">Home</a></li>
            <li><a href="over-ons.html" class="navbar-menu-link">Over ons</a></li>
            <li><a href="matching.html" class="navbar-menu-link">Matches</a></li>
            <li><a href="profiel.html" class="navbar-menu-link">Profiel</a></li>
        </ul>
    </ul>
    <button onclick="uitloggenClicked()" id="uitlogButton">Uitloggen</button>`
    const navbarNietIngelogd = `    <ul>
        <li><a href="index.html" class="navbar-normale-button">Home</a></li>
        <li><a href="over-ons.html" class="navbar-normale-button">Over ons</a></li>
        <li class="logo"><img src=assets/img/logo.PNG class="logo-foto"></src></li>
        <li><a href="inloggen.html" class="navbar-normale-button">Inloggen</a></li>
        <li><a href="registreren.html" class="navbar-normale-button">Registreren</a></li>

        <input id="navbar-menu-toggle" type="checkbox"/>                               <!--navbar menu voor mobile-->
        <label class='navbar-menu-container' for="navbar-menu-toggle">
            <div class='navbar-menu-button'><img src=assets/img/burger-menu.png class="navbar-foto"></src></div>
        </label>
        <ul class="navbar-links">
            <li><a href="index.html" class="navbar-menu-link">Home</a></li>
            <li><a href="over-ons.html" class="navbar-menu-link">Over ons</a></li>
            <li><a href="inloggen.html" class="navbar-menu-link">Inloggen</a></li>
            <li><a href="registreren.html" class="navbar-menu-link">Registreren</a></li>
        </ul>`
    const notificationMenu = `    <input id="notification-toggle" type="checkbox"/>                               <!--notification knop-->
    <label class="notification-container" for="notification-toggle">
        <div class="notification-menu-button"><img src=assets/img/notification-knop-alert.png
                                                   id="notification-foto"></src></div>
    </label>

    <ul class="notification-menu">
    </ul>
`

    if (isLoggedIn) {
        navbar.innerHTML = navbarIngelogd
        main.innerHTML += notificationMenu
        console.log("Huidige navbar: Ingelogd")
    }
    else {
        navbar.innerHTML = navbarNietIngelogd
        console.log("Huidige navbar: Niet Ingelogd")
    }
}

// Run the checkLoginStatus + loadNavbar functions when the page loads
/*window.onload = checkLoginStatus;*/
window.onload = loadNavbar;


// Checken of iemand op dit moment ingelogd is
console.log(FYSCloud.Session.get("userId"))
console.log(FYSCloud.Session.get("email"))

//UITLOGGEN

function uitloggenClicked(){
    FYSCloud.Session.remove("userId");
    FYSCloud.Session.remove("email");
    window.location.href="index.html"
}

