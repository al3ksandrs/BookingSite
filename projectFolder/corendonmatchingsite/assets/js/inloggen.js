FYSCloud.API.queryDatabase(
    "SELECT * FROM message"
).then(function(data) {
    console.log(data);
}).catch(function(reason) {
    console.log(reason);
});