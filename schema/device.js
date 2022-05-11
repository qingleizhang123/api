const moment = require('moment')
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('device', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:true,
      autoIncrement:true
    },
    // 器械名称
    deviceName: {
      type:DataTypes.STRING,
      allowNull:true,
      field: 'deviceName'
    },
    // 器械类型
    deviceType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'deviceType'
    },
    // 器械厂商
    deviceFactory: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'deviceFactory'
    },
    // 标签
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'tag'
    },
    // 器械描述
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description'
    },
    imgPath: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'imgPath'
    }
  },{
    freezeTableName:true
  });
}