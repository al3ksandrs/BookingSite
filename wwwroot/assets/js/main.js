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

function checkLoginStatus() {
    // Check the login status of the user
    var isLoggedIn = !(FYSCloud.Session.get("userId", "Not Found") === "Not Found") /* check login status */;

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
}

// Run the checkLoginStatus function when the page loads
window.onload = checkLoginStatus;




console.log(FYSCloud.Session.get("userId"))
console.log(FYSCloud.Session.get("email"))

//UITLOGGEN

function uitloggenClicked(){
    FYSCloud.Session.remove("userId", "email");
    location.reload();
    window.location.href="index.html"
}

