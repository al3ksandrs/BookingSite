FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is104_4.7xrJee8RutPdAeea",
    database: "fys_workshop_local",
    environment: "dev"
});

//filter van de matching+filter
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelector('.menu li');


    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        options.addEventListener('click', () => {
            select.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            option.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.remove('active');
        });
    });
});


