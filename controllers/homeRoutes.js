const router = require('express').Router();
const { User, Albums, Artist, Library, Songs } = require(`../models`);

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render(`library-view`, { layout: `library` });
        return
    }

    res.render('homepage', { title: 'SongNSeek', layout: 'main' });
})

router.get(`/library`, async (req,res) => {
    if (!req.session.loggedIn) {
        res.render(`login`);
        return;
    }
    const userData = await User.findOne({
        where: {
            id: req.session.userId,
        },
    });
    const user = userData.get({plain: true});

    const artists = await Artist.aggregate(`artist_name`, `DISTINCT`, {plain: false}).then(function(response) {
        return response;
    })

    res.render(`library-view`, { layout: `library`, user } );
})

router.get(`/login`, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`library-view`, { layout: `library` });
        return
    }

    res.render(`login`);
})

router.get(`/signup`, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`library-view`, { layout: `library` });
        return
    }

    res.render(`signup`);
})

router.get(`/library/artists`, async (req,res) => {
        if (!req.session.loggedIn) {
            res.render(`login`);
            return;
        };
        const userData = await User.findOne({
            where: {
                id: req.session.userId,
            },
        });
        const user = userData.get({plain: true});
        const artistData = await Artist.findAll();
        const artists = artistData.map(artists => {
            return artists.get({plain: true});
        });
        console.log(artists)
        res.render(`artist`, { layout: `library`, user, artists } );
    })

router.get(`/library/albums`, async (req,res) => {
    if (!req.session.loggedIn) {
        res.render(`login`);
        return;
    };
    const userData = await User.findOne({
        where: {
            id: req.session.userId,
        },
    });
    const user = userData.get({plain: true});
    const albumData = await Albums.findAll();
    const albums = albumData.map(albums => {
        return albums.get({plain: true});
    });
    console.log(albums)
    res.render(`album`, { layout: `library`, user, albums } );
})

router.get(`/library/songs`, async (req,res) => {
    if (!req.session.loggedIn) {
        res.render(`login`);
        return;
    };
    const userData = await User.findOne({
        where: {
            id: req.session.userId,
        },
    });
    const user = userData.get({plain: true});
    const songData = await Artist.findAll();
    const songs = songData.map(songs => {
        return songs.get({plain: true});
    });
    console.log(songs)
    res.render(`songs`, { layout: `library`, user, songs } );
})

module.exports = router;
