const router = require('express').Router();
const api = require('./api')

router.use('/api', api);

router.get('/', (reg, res) => {
    res.send('Welcome to SongNSeek');
})

module.exports = router;
