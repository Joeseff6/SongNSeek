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


Library.hasMany(Songs, {
  foreignKey: 'library_id',
  onUpdate: 'CASCADE'
});
Songs.belongsToMany(Library, { through: "Library_Songs"})

Library.hasMany(Playlists, {
  foreignKey: 'library_id',
  onUpdate: 'CASCADE'
});
Playlists.belongsTo(Library, {
  foreignKey: 'library_id',
  onUpdate: 'CASCADE'
});

Library.hasMany(Artist, {
  foreignKey: 'library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Artist.belongsToMany(Library, { through: "Library_Artist"});

Playlists.hasMany(Artist, {
  foreignKey: 'Playlists_id',
  onDelete: 'CASCADE',
});
Artist.belongsToMany(Playlists, { through: "Playlists_Artist"});


Playlists.hasMany(Songs, {
  foreignKey: 'Playlists_id',
});
Songs.belongsToMany(Playlists, { through: "Playlists_Songs"});


Library.hasMany(Search, {
  foreignKey: 'library_id',
  onUpdate: 'CASCADE'
});
Search.belongsTo(Library, {
  foreignKey: 'library_id',
});


Search.hasMany(Songs, {
  foreignKey: 'search_id',
  onDelete: 'CASCADE'
});
Songs.belongsToMany(Search, { through: "Search_Songs"});


Search.hasMany(Playlists, {
  foreignKey: 'search_id',
});
Playlists.belongsToMany(Search, { through: " Search_Playlist" });



Search.hasMany(Artist, {
  foreignKey: 'search_id',
});
Artist.belongsToMany(Search, { through: "Search_Artist"});

// // Songs
// Search.hasMany(Songs, {
//   foreignKey: 'search_id',
//   onDelete: 'CASCADE'
// });

// Artist.hasMany(Songs, {
  //   foreignKey: 'artist_id',
  //   onDelete: 'CASCADE',
  // });
  
  // Playlists.hasMany(Songs, {
    //   foreignKey: 'Playlists_id',
    //   onDelete: 'CASCADE',
    // });
    
    // // Artist
    // Search.hasMany(Artist, {
      //   foreignKey: 'search_id',
      //   onDelete: 'CASCADE'
      // });
      
      
      
      // // Albums
// Search.hasMany(Albums, {
//   foreignKey: 'search_id',
//   onDelete: 'CASCADE'
// });

// Library.hasMany(Albums, {
//   foreignKey: 'library_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

// Artist.hasMany(Albums, {
//   foreignKey: 'artist_id',
//   onDelete: 'CASCADE',
// });

// // Playlists
// Search.hasMany(Playlists, {
//   foreignKey: 'search_id',
//   onDelete: 'CASCADE'
// });

// Playlists.belongsTo(Library, {
//   foreignKey: 'library_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

// // Search
// Search.belongsTo(Library, {
//   foreignKey: 'library_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

module.exports = { User, Playlists, Songs, Artist, Albums, Library, Search };
