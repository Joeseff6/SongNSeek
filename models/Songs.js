const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Songs extends Model {}

Songs.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    song_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'playlists',
        key: 'id',
        },
    },
    artist_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'artist',
        key: 'id',
        },
    },
    library_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'library',
        key: 'id',
        },
    },

},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'songs',
    }
);

module.exports = Songs;
