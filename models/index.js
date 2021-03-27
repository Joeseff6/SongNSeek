const User = require('./User');
const Songs = require('./Songs');
const Artist = require('./Artist');
const Albums = require('./Albums');
const Library = require('./Library');

// User
User.hasOne(Library, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Library.belongsTo(User, {
  foreignKey: 'user_id',
})

Library.belongsToMany(Songs, {
  through: 'library_songs',
});
Songs.belongsToMany(Library, {
  through: 'library_songs',
});

Library.belongsToMany(Artist, {
  through:'library_artist',
  onDelete: `CASCADE`
});
Artist.belongsToMany(Library, {
  through: 'library_artist',
  onDelete: `CASCADE`
});

Artist.belongsToMany(Albums, { 
  through: 'artist_albums',
});

Albums.belongsToMany(Artist, {
  through: 'artist_albums'
});

Artist.belongsToMany(Songs, { 
  through: 'artist_songs',
});

Songs.belongsToMany(Artist, {
  through: 'artist_songs'
});

module.exports = { User, Songs, Artist, Albums, Library };
