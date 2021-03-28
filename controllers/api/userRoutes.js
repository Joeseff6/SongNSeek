const router = require('express').Router();
const { User, Library } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.userId = userData.dataValues.id;

    const libraryData = await Library.create({
      user_id: req.session.userId
    });

    req.session.libraryId = libraryData.dataValues.id;

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: { 
        email: req.body.email 
      },
      include: {
        model: Library,
      },
    });
    req.session.userId = userData.dataValues.id;
    req.session.libraryId = userData.dataValues.library.dataValues.id;
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/deleteUser', async (req, res) => {
  try {
    User.destroy({
      where: {
        id: req.session.userId,
      },
    });
    req.session.destroy(() => {
      res.status(204).end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
