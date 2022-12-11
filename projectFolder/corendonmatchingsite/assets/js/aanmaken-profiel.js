// FYSCloud.Utils
//     .getDataUrl(document.querySelector("#foto-bestand"))
//     .then(function(data) {
//         FYSCloud.API.uploadFile(
//             "test.png",
//             data.url
//         ).then(function(data) {
//             console.log(data);
//         }).catch(function(reason) {
//             console.log(reason);
//         });
//     }).catch(function(reason) {
//     console.log(reason);
// })

function gogo() {
    FYSCloud.Utils.getDataUrl("#foto-bestand")
            .then(function (data) {
                if (data.isImage) {
                    document.querySelector("#imagePreview").src = data.url;
                }
                console.log(data)
            }).catch(function (reason) {
                console.log(reason);
            })
}