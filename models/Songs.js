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
        allowNull: false
    },
    song_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    art_id: {
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
    modelName: 'songs',
    }
);

module.exports = Songs;
