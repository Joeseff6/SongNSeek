const router = require('express').Router();
const { musicRoutes, Users } = require('../../models');

router.get('/', (req, res) => {
  musicRoutes.findAll({
    include: [{ model: musicRoutes }],
  }).then((Category) => res.json(Category));
})

router.get('/:id', (req, res) => {
  musicRoutes.findByPk(req.params.id).then((musicRoutes) => res.json(musicRoutes));
});



router.post('/', async (req, res) => {
  try {
    const newmusicRoutes = await musicRoutes.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newmusicRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const musicRoutesData = await musicRoutes.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!musicRoutesData) {
      res.status(404).json({ message: 'No musicRoutes found with this id!' });
      return;
    }

    res.status(200).json(musicRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
