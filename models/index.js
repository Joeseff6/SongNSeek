const User = require('./User');
const Playlists = require('./Playlists');
const Songs = require('./Songs');
const Artist = require('./Artist');
const Albums = require('./Albums');
const Library = require('./Library');
const Search = require('./Search');

// NEED HELP

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Playlists, Songs, Artist, Albums, Library, Search };
