const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    artist_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [8],
        // },
    },
    artist_songs: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     len: [8],
        // },
    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    artist_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    album_releases: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     len: [8],
        // },
    },
    library_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'library',
        key: 'id',
        },
    },
    search_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'search',
        key: 'id',
        },
    },
},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'artist',
    }
);

module.exports = Artist;
