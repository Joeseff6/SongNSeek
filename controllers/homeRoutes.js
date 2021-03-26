const router = require('express').Router();
const { Albums, Artist, Library, Playlists, Search, Songs } = require(`../models`)

router.get('/', (reg, res) => {
    res.render('homepage', { title: 'SongNSeek', layout: 'main' });
})

router.get(`/library`, (req,res) => {
    // if (!req.session.loggedIn) {
    //     res.render(`login`);
    //     return;
    // }

    res.render(`library-view`, { layout: `library` });
})

router.get(`/login`, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`main`);
        return;
    }

    res.render(`login`);
})

router.get(`/signup`, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`main`);
        return;
    }

    res.render(`signup`);
})


module.exports = router;
