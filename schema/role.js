const moment = require('moment')
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('role', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:true,
      autoIncrement:true
    },
    // 角色
    roleName: {
      type:DataTypes.STRING,
      allowNull:true,
      field: 'roleName'
    },
    // 角色文本
    roleText: {
      type:DataTypes.STRING,
      allowNull:true,
      field: 'roleText'
    }
  },{
    freezeTableName:true
  });
}