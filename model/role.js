const db = require('../config/db');

const Sequelize = db.sequelize;

const Role = Sequelize.import('../schema/role');
Role.sync({force:false});

class RoleModel {
  /**
   * 新建角色
   * @param {*} data 
   * @returns 
   */
  static async createRole(data) {
    return await Role.create({
      roleName: data.roleName,
      roleText: data.roleText
    });
  }

  /**
   * 删除角色
   * @param {*} data 
   * @returns 
   */
  static async deleteRole(data) {
    return await Role.destroy({
      where: {
        roleName: data.roleName
      }
    })
  }

  /**
   * 获取账号列表
   * @returns 
   */
  static async getRolelist(data) {
    return await Role.findAndCountAll({
      offset: (data.page - 1) * data.pageSize,
      limit: data.pageSize
    });
  }
}

module.exports = RoleModel;