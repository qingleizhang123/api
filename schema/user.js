const moment = require('moment')
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('account', {
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
    }
  },{
    freezeTableName:true
  });
}