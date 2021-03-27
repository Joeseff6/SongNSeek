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
    },
    image_med: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_big: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: `artist`,
            key: `id`,
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
