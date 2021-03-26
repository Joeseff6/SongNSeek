const router = require('express').Router();
const { Albums, Artist, Library, Playlists, Songs, User} = require('../../models');

// library Routes
router.get('/', (req, res) => {
  libraryRoutes.findAll({
    include: [{ model: libraryRoutes }],
  }).then((Category) => res.json(Category));
})

router.get('/:id', (req, res) => {
  libraryRoutes.findByPk(req.params.id).then((libraryRoutes) => res.json(libraryRoutes));
});



router.post('/', async (req, res) => {
  try {
    const newlibraryRoutes = await libraryRoutes.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newlibraryRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/music', async (req, res) => {
  try {
    const albumsData = await Albums.create({
      album_title: req.body.album_title,
      album_id: req.body.album_id,
      album_image: req.body.album_image,
      artist_id: req.body.artist_id,
      library_id: req.session.libraryId,
    });
    const artistData = await Artist.create({
      artist_name: req.body.artist_name,
      artist_songs: req.body.artist_songs,
      artist_image: req.body.artist_image,
      artist_id: req.body.artist_id,
      library_id: req.session.libraryId,
    });
    const songsData = await Songs.create({
      song_name: req.body.song_name,
      artist_name: req.body.artist_name,
      artist_songs: req.body.artist_songs,
      artist_id: req.body.artist_id,
      library_id: req.session.libraryId,
    });
    res.status(200).json(albumsData);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const libraryRoutesData = await libraryRoutes.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!libraryRoutesData) {
      res.status(404).json({ message: 'No libraryRoutes found with this id!' });
      return;
    }

    res.status(200).json(libraryRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
