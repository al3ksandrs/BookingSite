const currentUser = FYSCloud.Session.get("userId", "Not Found");
let language

FYSCloud.API.queryDatabase(
    'SELECT * FROM `talen` WHERE (`gebruiker_id` = ?)', [currentUser]
).then(function (data) {
// Loop through all the columns of first row
    for (let i = 1; i < Object.keys(data[0]).length; i++) {
        language = Object.keys(data[0])[i]
        document.getElementById(country).checked = Object.values(data[0])[i] === 1;
    }
}).catch(function (reason){
    console.log(reason)
})



// checkt of de checkbox gecheckt is
function Check(checkbox) {
    const checkId = checkbox.id;
    if (checkbox.checked === true) {
        console.log("Je hebt gekozen voor " + checkId);
        checkboxDb(checkbox, true);
        // checkboxTrueDb(checkbox)
    } else {
        console.log("Je hebt niet meer gekozen voor " + checkId);
        checkboxDb(checkbox, false);
        // checkboxFalseDb(checkbox)
    }
}
