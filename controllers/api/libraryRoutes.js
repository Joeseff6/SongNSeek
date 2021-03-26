const router = require('express').Router();
const { libraryRoutes} = require('../../models');

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

router.post('/artist', async (req, res) => {
  try {
    const newlibraryRoutes = await libraryRoutes.create({
      ...req.body,
      artist_id: req.session.user_id,
    });

    res.status(200).json(newlibraryRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/album', async (req, res) => {
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

router.post('/track', async (req, res) => {
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

router.post('/general', async (req, res) => {
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
