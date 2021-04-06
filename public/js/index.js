const searchForm = $(`#searchForm`);
const searchField = $(`#searchField`);
const list = $(`#list`);
capitalize($(`#username`).text());
if (document.location.pathname === `/library` || document.location.pathname === `/`) {
    searchForm.show();
};
searchForm.submit((event) => {
    event.preventDefault();
    let searchText = searchField.val().split(` `);
    let searchQuery = searchText.join(`%20`);
    let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchQuery}&index=0&limit=15`;
    const settings = getRequest(searchUrl);
    $.ajax(settings).done(function (response) {
        let searchObj = response.data.map((search) => {
            let searchObj = {
                artist_name: search.artist.name,
                artist_songs: search.artist.tracklist,
                artist_id: search.artist.id,
                artist_image_med: search.artist.picture_medium,
                artist_image_big: search.artist.picture_big,
                album_title: search.album.title,
                album_id: search.album.id,
                album_image_med: search.album.cover_medium,
                album_image_big: search.album.cover_big,
                song_name: search.title,
                song_id: search.id,
            };
            return searchObj;
        })
        createList(searchObj);
        $(`.searchOption`).click(function () {
            let index = $(this).attr(`data-index`);
            let userChoice = searchObj[index];
            saveChoice(userChoice);
        });
    });
});
$(`#deleteUser`).click(function () {
    deleteUser();
});
function capitalize(text) {
    let newText = text.charAt(0).toUpperCase() + text.slice(1);
    $(`#username`).text(newText);
    return;
};
const createList = (searchObj) => {
    $(`.remove`).remove();
    if (searchObj.length === 0) {
        let listEl = $(`<li/>`);
        listEl
        .text(`No results found!`)
        .attr(`class`,`btn remove list-group-item`);
        list.append(listEl);
        searchField.val(``);
        return;
    };
    for (let i = 0; i < searchObj.length-1; i++) {
        let listEl = $(`<li/>`);
        listEl.text(`${searchObj[i].artist_name}/${searchObj[i].song_name}/${searchObj[i].album_title}`)
        .attr(`class`,`btn remove searchOption list-group-item`)
        .attr(`data-index`,`${i}`)
        list.append(listEl);
    };
    searchField.val(``);
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
const saveChoice = async (userChoice) => {
        await fetch(`/api/library/`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoice),
    });
    document.location.replace('/artists');
};
const deleteUser = async() => {
    await fetch(`/api/users/deleteUser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    document.location.replace(`/`);
};
const deleteArtist = async(artist_id) => {
    await fetch(`/api/library/artist`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(artist_id),
    });
};