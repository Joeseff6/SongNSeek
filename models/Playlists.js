const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playlists extends Model {}

Playlists.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    personal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    suggested: {
      type: DataTypes.STRING,
      validate: {
        len: [8],
      },
    },
    length: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    modelName: 'Playlists',
  }
);

module.exports = Playlists;
