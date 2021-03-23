// https://api.audiomack.com/v1
// const crypto = require('crypto')
// const OAuth = require('oauth-1.0a')

// const oauth = OAuth({
//     consumer: { key: '<your consumer key>', secret: '<your consumer secret>' },
//     signature_method: 'HMAC-SHA1',
//     hash_function(base_string, key) {
//         return crypto
//             .createHmac('sha1', key)
//             .update(base_string)
//             .digest('base64')
//     },
// })


const searchForm = $(`#searchForm`);
const searchField = $(`#searchField`);
const buttonDiv = $(`#buttonDiv`);

searchForm.submit((event) => {
    event.preventDefault();
    let searchText = searchField.val().split(` `);
    let searchQuery = searchText.join(`%20`);
    let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchQuery}&index=0&limit=20`

    const settings = getRequest(searchUrl);
    
    $.ajax(settings).done(function (response) {

        console.log(response);
        let searchObj = response.data.map((search) => {
            let searchObj = {
                artist: search.artist.name,
                artistID: search.artist.id,
                artistImage: search.artist.picture_big,
                album: search.album.title,
                albumId: search.album.id,
                albumImage: search.album.cover_big,
                song: search.title,
                top50: search.artist.tracklist,
            };
            return searchObj;
        })
        console.log(searchObj);

        createButtons(searchObj);
    });
});


const createButtons = (searchObj) => {
    for (let i = 0; i < searchObj.length-1; i++) {
        let buttonEl = $(`<button/>`);
        buttonEl.text(`${searchObj[i].artist}/${searchObj[i].song}/${searchObj[i].album}`).attr(`class`,`btn remove`).attr(`data-index`,`${i}`);
        buttonDiv.append(buttonEl);
    }
}


const getRequest = (searchUrl) => {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": searchUrl,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "4158f96d1emsh29be4d938fb2c05p1b6561jsn48bbd9b8afa1",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    };

    return settings;
}

