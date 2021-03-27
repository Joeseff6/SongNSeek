const router = require('express').Router();
const { Albums, Artist, Library, Songs, User} = require('../../models');

// library Routes
router.get('/', async (req, res) => {

})

router.post(`/`, async (req,res) => {
  try {
    const artistData = await Artist.create({
      artist_name: req.body.artist_name,
      artist_songs: req.body.artist_songs,
      artist_id: req.body.artist_id,
      artist_image: req.body.artist_image,
      library_id: req.session.libraryId,
    });

    const songData = await Songs.create({
      song_id: req.body.song_id,
      song_name: req.body.song_name,
      library_id: req.session.libraryId,
    });

    const albumData = await Albums.create({
      album_title: req.body.album_title,
      album_id: req.body.album_id,
      album_image: req.body.album_image,
      library_id: req.session.libraryId,
    });
  
    console.log(artistData);
    res.status(200).json(artistData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


})


// router.post('/artist', async (req, res) => {
//   try {
//     const artistData = await Artist.create({
//       artist_name: req.body.artist_name,
//       artist_songs: req.body.artist_songs,
//       artist_image: req.body.artist_image,
//       artist_id: req.body.artist_id,
//       library_id: req.session.libraryId,
//     });
  
//     res.status(200).json(artistData);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// router.post('/album', async (req, res) => {
//   try {
//     const albumsData = await Albums.create({
//       album_title: req.body.album_title,
//       album_id: req.body.album_id,
//       album_image: req.body.album_image,
//       artist_id: req.body.artist_id,
//       library_id: req.session.libraryId,
//     });

//     res.status(200).json(albumsData);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// router.post('/song', async (req, res) => {
//   try {
//     const songsData = await Songs.create({
//       song_name: req.body.song_name,
//       song_id: req.body.song_id,
//       artist_name: req.body.artist_name,
//       artist_songs: req.body.artist_songs,
//       artist_id: req.body.artist_id,
//       library_id: req.session.libraryId,
//     });
//     res.status(200).json(songsData);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

router.delete('/:artist_id', async (req, res) => {
  const { artist_id } = req.params;

  const [err, trip] = await to(Artist.destroy({
      where: {
        artist_id
      }
  }));

  if (err) return res.status(500).json(err);

  res.json(trip);
});

module.exports = router;
