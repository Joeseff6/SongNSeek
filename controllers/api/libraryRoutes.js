const router = require('express').Router();
const { Albums, Artist, Library, Songs, User} = require('../../models');

// library Routes

router.post(`/`, async (req,res) => {
  try {
    const artistData = await Artist.create({
      artist_name: req.body.artist_name,
      artist_songs: req.body.artist_songs,
      artist_id: req.body.artist_id,
      image_med: req.body.artist_image_med,
      image_big: req.body.artist_image_big,
      library_id: req.session.libraryId,
    });
    const artist = await Artist.findOne({
      where:  {
        artist_id: artistData.getDataValue(`artist_id`),
      },
    });

    const songData = await Songs.create({
      song_id: req.body.song_id,
      song_name: req.body.song_name,
      art_id: artist.id,
      library_id: req.session.libraryId,
    });

    const albumData = await Albums.create({
      album_title: req.body.album_title,
      album_id: req.body.album_id,
      image_med: req.body.album_image_med,
      image_big: req.body.album_image_big,
      artist_id: artist.id,
      library_id: req.session.libraryId,
    });
    
    musicData = [artistData, songData, albumData]
    res.status(200).json(musicData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


// router.delete('/:id', async (req, res) => {
//   try {
//     const libraryRoutesData = await libraryRoutes.destroy({
//       where: {
//         artist_id
//       }
//   }));

//   if (err) return res.status(500).json(err);

//   res.json(trip);
// });


module.exports = router;
