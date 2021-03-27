const sequelize = require('../config/connection');
const { User, Playlists, Songs, Artist, Albums, Library, Search } = require('../models');

const userData = require('./userData.json');
const libraryData = require('./libraryData.json');
const searchData = require('./searchData.json');
const songsData = require('./songsData.json');
const artistData = require('./artistData.json');
const albumsData = require('./albumsData.json');
const playlistData = require('./playlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const library of libraryData) {
    await Library.create({
      ...library,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
