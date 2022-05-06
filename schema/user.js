const moment = require('moment')
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('account', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:true,
      autoIncrement:true
    },
    // 账号
    userName: {
      type:DataTypes.STRING,
      allowNull:true,
      field: 'userName'
    },
    // 密码
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'password'
    },
    // 邮箱
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'email'
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'state'
    }
  },{
    freezeTableName:true
  });
}