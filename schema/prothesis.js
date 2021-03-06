const moment = require('moment')
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('prothesis', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:true,
      autoIncrement:true
    },
    // 假体名称
    prothesisName: {
      type:DataTypes.STRING,
      allowNull:true,
      field: 'prothesisName'
    },
    // 假体类型
    prothesisType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'prothesisType'
    },
    // 假体厂商
    prothesisFactory: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'prothesisFactory'
    },
    assemblyPoint: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'assemblyPoint'
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'tag'
    },
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