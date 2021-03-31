const router = require('express').Router();
const { User, Artist, Songs } = require(`../models`);
const signedOut = require(`../utils/signedOut`);

router.get(`/`, signedOut, async (req,res) => {
    let user = await getUserData(req);
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
    res.render(`song`, { layout: `library`, user, songs } );
});

router.get(`/:id`, signedOut, async (req,res) => {
    let user = await getUserData(req);
    const songData = await Songs.findByPk(req.params.id, {
        include: {
            model: Artist,
        },
    });
    const song = songData.get({plain: true});
    res.render(`song`, { layout: `library`, user, song } );
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
