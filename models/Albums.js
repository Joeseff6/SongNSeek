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
    modelName: 'Albums',
    }
);

module.exports = Albums;
