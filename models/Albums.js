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
    album_image: {
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
    modelName: 'albums',
    }
);

module.exports = Albums;
