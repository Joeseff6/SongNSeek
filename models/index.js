const User = require('./User');
const Playlists = require('./Playlists');
const Songs = require('./Songs');
const Artist = require('./Artist');
const Albums = require('./Albums');
const Library = require('./Library');
const Search = require('./Search');



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




Library.belongsToMany(Playlists, {
  through: 'library_playlist',
  onDelete: `CASCADE`
});
Playlists.belongsTo(Library, {
  foreignKey: 'Library_id',
  onUpdate: 'CASCADE'
});

Library.belongsToMany(Artist, {
  through:'library_artist',
  onDelete: `CASCADE`
});
Artist.belongsToMany(Library, {
  through: 'library_artist',
  onDelete: `CASCADE`
});

Playlists.belongsToMany(Artist, {
  through: 'playlist_artist',
});
Artist.belongsToMany(Playlists, { 
  through: "playlist_artist",
});


Playlists.belongsToMany(Songs, {
  through: 'playlists_songs',
});
Songs.belongsToMany(Playlists, { 
  through: 'playlists_songs',
});

Artist.belongsToMany(Albums, { 
  through: 'artist_albums',
});

Albums.belongsToMany(Artist, {
  through: 'artist_albums'
});


module.exports = { User, Playlists, Songs, Artist, Albums, Library, Search };
