const router = require('express').Router();
const { User, Albums, Artist, Library, Playlists, Search, Songs } = require(`../models`);

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


module.exports = router;
