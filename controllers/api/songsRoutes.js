const router = require('express').Router();
const { songsRoutes, Library} = require('../../models');

router.get('/', (req, res) => {
    songsRoutes.findAll({
      include: [{ model: Library }],
    }).then((Category) => res.json(Category));
  })