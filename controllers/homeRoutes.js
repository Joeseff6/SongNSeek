const router = require('express').Router();
const { User } = require(`../models`);
const loggedIn = require(`../utils/loggedIn`);
const signedOut = require(`../utils/signedOut`);


router.get('/', loggedIn, async (req, res) => {
    res.render('homepage');
});

router.get(`/library`, signedOut, async (req,res) => {
    let user = await getUserData(req);
    res.render(`library-view`, { layout: `library`, user } );
});

router.get(`/login`, loggedIn, async (req,res) => {
    res.render(`login`);
});

router.get(`/signup`, loggedIn, (req,res) => {
    if (req.session.loggedIn) {
        res.render(`library-view`, { layout: `library` });
        return;
    };
    res.render(`signup`);
});

router.get(`/deleteUser`, signedOut, async (req,res) => {
    let user = await getUserData(req);
    res.render(`delete-user`, { layout: `library`, user } );
});

const getUserData = async (req) => {
    let userData = await User.findOne({
        where: {
            id: req.session.userId,
        },
    });
    let user = userData.get({plain: true});
    return user;
};

module.exports = router;
