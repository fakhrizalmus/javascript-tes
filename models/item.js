'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.checklist, {
        foreignKey: 'checklistId' 
      });
    }
  }
  item.init({
    namaItem: DataTypes.STRING,
    checklistId: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['undone', 'done']
    },
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};