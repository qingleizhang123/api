module.exports = function(sequelize, DataTypes) {
  return sequelize.define('atricle_type',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:true,
      autoIncrement:true
    },
    category:{
      type:DataTypes.STRING,
      allowNull:false,
      field:'category'
    }
  },{
    freezeTableName:true
  });
}