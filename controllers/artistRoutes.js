const router = require('express').Router();
const { User, Albums, Artist, Songs } = require(`../models`);
const signedOut = require(`../utils/signedOut`);

router.get(`/`, signedOut, async (req,res) => {
    let user = await getUserData(req);
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
});

router.get(`/:id`, signedOut, async (req,res) => {
    let user = await getUserData(req);
    const artistData = await Artist.findByPk(req.params.id, {
            include: [{
                model: Songs,
            },
            {
                model: Albums,
            },
        ],
    });
    const artist = artistData.get({plain: true});
    res.render(`artist`, { layout: `library`, user, artist } );
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
