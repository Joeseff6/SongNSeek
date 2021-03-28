const router = require('express').Router();
const { User, Albums, Artist, Library, Songs } = require(`../models`);

router.get('/', async (req, res) => {
    if (req.session.loggedIn) {
        const userData = await User.findOne({
            where: {
                id: req.session.userId,
            },
        });
        const user = userData.get({plain: true});
        res.render(`library-view`, { layout: `library`, user });
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

    res.render(`library-view`, { layout: `library`, user } );
});

router.get(`/library/artists`, async (req,res) => {
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
    const artistData = await Artist.findAll({
        where: {
            library_id: req.session.libraryId,
        },
        include: [{
            model: Songs,
        },
        {
            model: Albums,
        }],
    });
    const artists = artistData.map(artists => {
        return artists.get({plain: true});
    });

    res.render(`artist`, { layout: `library`, user, artists } );
})

router.get(`/library/artists/:id`, async (req,res) => {
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
    const artistData = await Artist.findByPk(req.params.id, {
        include: [{
            model: Songs,
        },
        {
            model: Albums,
        },
        ]
    });
    const artist = artistData.get({plain: true});

    res.render(`artist`, { layout: `library`, user, artist } );
})

router.get(`/library/albums`, async (req,res) => {
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
    const albumData = await Albums.findAll({
        where: {
            library_id: req.session.libraryId,
        },
        include: {
            model: Artist,
        },
    });
    const albums = albumData.map(albums => {
        return albums.get({plain: true});
    });

    res.render(`albums`, { layout: `library`, user, albums } );
})

router.get(`/library/albums/:id`, async (req,res) => {
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
    const albumData = await Albums.findByPk(req.params.id, {
        include: {
            model: Artist,
        },
    });
    const album = albumData.get({plain: true});

    res.render(`albums`, { layout: `library`, user, album } );
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
    const songData = await Songs.findAll({
        where: {
            library_id: req.session.libraryId,
        },
        include: {
            model: Artist,
        },
    });
    const songs = songData.map(songs => {
        return songs.get({plain: true});
    });

    console.log(songs)
    res.render(`song`, { layout: `library`, user, songs } );
})

router.get(`/library/songs/:id`, async (req,res) => {
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
    const songData = await Songs.findByPk(req.params.id, {
        include: {
            model: Artist,
        },
    });
    const song = songData.get({plain: true});

    console.log(song)
    res.render(`song`, { layout: `library`, user, song } );
})


router.get(`/login`, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`library-view`, { layout: `library`, user });
        return
    }

    res.render(`login`);
});

router.get(`/signup`, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`library-view`, { layout: `library` });
        return
    }

    res.render(`signup`);
});

router.get(`/library/artists`, async (req,res) => {
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
    const artistData = await Artist.findAll();
    const artists = artistData.map(artists => {
        return artists.get({plain: true});
    });
    console.log(artists)
    res.render(`artist`, { layout: `library`, user, artists } );
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
    res.render(`albums`, { layout: `library`, user, albums } );
});

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
    const songData = await Songs.findAll();
    const songs = songData.map(songs => {
        return songs.get({plain: true});
    });
    console.log(songs)
    res.render(`song`, { layout: `library`, user, songs } );
});

module.exports = router;
