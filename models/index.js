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
});
Playlists.belongsTo(Library, {
  foreignKey: 'Library_id',
  onUpdate: 'CASCADE'
});

Library.belongsToMany(Artist, {
  through:'library_artist',
});
Artist.belongsToMany(Library, {
  through: 'library_artist',
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


Library.hasMany(Search, {
  foreignKey: 'library_id',
  onUpdate: 'CASCADE'
});
Search.belongsTo(Library, {
  foreignKey: 'library_id',
});


Search.belongsToMany(Songs, {
  through: 'search_songs',
});
Songs.belongsToMany(Search, { 
  through: "search_songs",
});


Search.belongsToMany(Playlists, {
  through: 'search_playlist',
});
Playlists.belongsToMany(Search, { 
  through: "search_playlist",
});



Search.belongsToMany(Artist, {
  through: 'search_artist',
});
Artist.belongsToMany(Search, { 
  through: "search_artist",
});


module.exports = { User, Playlists, Songs, Artist, Albums, Library, Search };
