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

Artist.hasMany(Songs, {
  foreignKey: `art_id`,
  onDelete: `CASCADE`,
});

Songs.belongsTo(Artist, {
  foreignKey: `art_id`,
  onDelete: `CASCADE`,
});

Artist.hasMany(Albums, {
  foreignKey: `artist_id`,
  onDelete: `CASCADE`,
});

Albums.belongsTo(Artist, {
  foreignKey: `artist_id`,
  onDelete: `CASCADE`,
});


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


module.exports = { User, Songs, Artist, Albums, Library };
