const router = require('express').Router();
const apiRoutes = require('./api')
const homeRoutes = require(`./homeRoutes`);
const artistRoutes = require(`./artistRoutes`);
const albumsRoutes = require(`./albumsRoutes`);
const songsRoutes = require(`./songsRoutes`);

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/artists', artistRoutes);
router.use('/albums', albumsRoutes);
router.use('/songs', songsRoutes);

module.exports = router;
