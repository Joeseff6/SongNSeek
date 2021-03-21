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

// Songs
Search.hasMany(Songs, {
  foreignKey: 'search_id',
  onDelete: 'CASCADE'
});

Library.hasMany(Songs, {
  foreignKey: 'library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Artist.hasMany(Songs, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE',
});

Playlists.hasMany(Songs, {
  foreignKey: 'Playlists_id',
  onDelete: 'CASCADE',
});

// Artist
Search.hasMany(Artist, {
  foreignKey: 'search_id',
  onDelete: 'CASCADE'
});

Library.hasMany(Artist, {
  foreignKey: 'library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Albums
Search.hasMany(Albums, {
  foreignKey: 'search_id',
  onDelete: 'CASCADE'
});

Library.hasMany(Albums, {
  foreignKey: 'library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Artist.hasMany(Albums, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE',
});

// Playlists
Search.hasMany(Playlists, {
  foreignKey: 'search_id',
  onDelete: 'CASCADE'
});

Library.hasMany(Playlists, {
  foreignKey: 'library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Search
Library.hasOne(Search, {
  foreignKey: 'library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = { User, Playlists, Songs, Artist, Albums, Library, Search };
