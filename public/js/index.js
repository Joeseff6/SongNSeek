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
                artist_name: search.artist.name,
                artist_songs: search.artist.tracklist,
                artist_id: search.artist.id,
                artist_image: search.artist.picture_big,
                album_title: search.album.title,
                album_id: search.album.id,
                album_image: search.album.cover_big,
                song: search.title,
            };
            return searchObj;
        })
        console.log(searchObj);

        createButtons(searchObj);

        $(`.searchOption`).click(function () {
            let index = $(this).attr(`data-index`);
            let userChoice = searchObj[index];
            console.log(userChoice)

            saveChoice(userChoice);
        })
    });
});

const createButtons = (searchObj) => {
    $(`.remove`).remove();
    for (let i = 0; i < searchObj.length-1; i++) {
        let buttonEl = $(`<button/>`);
        buttonEl.text(`${searchObj[i].artist}/${searchObj[i].song}/${searchObj[i].album}`)
        .attr(`class`,`btn remove searchOption`)
        .attr(`data-index`,`${i}`);

        buttonDiv.append(buttonEl);
    };
};

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
};

const saveChoice = (userChoice) => {
    fetch(`/api/options`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoice),
    });
} 