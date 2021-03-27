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
    const artistData = await Artist.findAll();
    const artists = artistData.map(artists => {
        return artists.get({plain: true});
    });

    console.log(artists)
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
            attributes: [`song_name`],
        },
        {
            model: Albums,
        },
        ]
    });
    const artist = artistData.get({plain: true});

    console.log(artist)
    res.render(`artist`, { layout: `library`, user, artist } );
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


module.exports = router;
