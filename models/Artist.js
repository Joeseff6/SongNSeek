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
    },
    artist_songs: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_med: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_big: {
        type: DataTypes.STRING,
        allowNull: false,
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
    modelName: 'artist',
    }
);

module.exports = Artist;
