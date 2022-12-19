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

console.log(FYSCloud.Session.get("userId"))
console.log(FYSCloud.Session.get("email"))



// CHECKEN OF ER MATCHES ZIJN

function likeButtonClick(){
    console.log("Huidige gebruikerID van bezochte profiel: " + userId);
    console.log("Huidige gebruikerID van ingelogde gebruiker: " + FYSCloud.Session.get("userId", "Not Found"));

    FYSCloud.API.queryDatabase(
        "INSERT INTO `gebruiker_has_gebruiker` SET ingelogde_gebruiker_id = ?, liked_persoon_id = ?;",
        [FYSCloud.Session.get("userId", "Not Found"), userId]
    )

    console.log("Query is gestuurd naar database. (Like systeem)")
}

FYSCloud.API.queryDatabase(
    "SELECT * FROM `fys_is104_4_dev`.`gebruiker_has_gebruiker` WHERE ingelogde_gebruiker_id = \"0\" AND liked_persoon_id = \"1661805171101\" OR liked_persoon_id = \"0\" AND ingelogde_gebruiker_id = \"1661805171101\";",
).then(function (data){
    FYSCloud.API.queryDatabase(
        "INSERT INTO `matches` SET `gebruiker_id1` = ?, `gebruiker_id2` = ?;",
        [FYSCloud.Session.get("userId", "Not Found"), userId]
    )
})

