'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.item, {
        foreignKey: 'checklistId'
      });
    }
  }
  checklist.init({
    namaChecklist: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'checklist',
  });
  return checklist;
};