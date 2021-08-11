const moment = require('moment')
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('person', {
    // 名称
    name: {
      type:DataTypes.STRING,
      allowNull:true,
      field: 'name'
    },
    // 介绍
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description'
    }
  },{
    freezeTableName:true
  });
}