const router = require('express').Router();
const { User, Albums, Artist } = require(`../models`);
const signedOut = require(`../utils/signedOut`);

router.get(`/`, signedOut, async (req,res) => {
    let user = await getUserData(req);
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
});

router.get(`/:id`, signedOut, async (req,res) => {
    let user = await getUserData(req);
    const albumData = await Albums.findByPk(req.params.id, {
        include: {
            model: Artist,
        },
    });
    const album = albumData.get({plain: true});
    res.render(`albums`, { layout: `library`, user, album } );
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
