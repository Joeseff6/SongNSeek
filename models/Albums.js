const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Albums extends Model {}

Albums.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    album_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    album_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'artist',
        key: 'artist_id',
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
    modelName: 'albums',
    }
);

module.exports = Albums;
