const router = require('express').Router();
const userRoutes = require('./userRoutes');
const LibraryRoutes = require('./libraryRoutes');


router.use('/users', userRoutes);
router.use('/music', LibraryRoutes);


module.exports = router;
