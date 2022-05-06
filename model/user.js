const db = require('../config/db');

const Sequelize = db.sequelize;

const User = Sequelize.import('../schema/user');
User.sync({force:false});

class PersonModel {
  /**
   * 新建账号
   * @param {*} data 
   * @returns 
   */
  static async createUser(data) {
    return await User.create({
      userName: data.userName,
      password: data.password,
      email: data.email,
      state: false
    });
  }

  /**
   * 账号密码验证
   * @returns {Promise<Model>}
   */
  static async getUser(userName) {
    return await User.findOne({
      where: {
        userName: userName
      }
    });
  }

  /**
   * 修改密码
   * @param {*} name 博主名称
   * @param {*} description 简介描述
   * @returns 
   */
  static async updateUserPassword(data) {
    return await User.update({
      password: data.password
    }, {
      where: {
        userName: data.userName
      }
    });
  }

  /**
   * 删除账号
   * @param {*} data 
   * @returns 
   */
  static async deleteUser(data) {
    return await User.destroy({
      where: {
        userName: data.userName
      }
    })
  }

  /**
   * 审核注册账号
   * @param {*} data 
   * @returns 
   */
  static async verifyUser(data) {
    return await User.update({
      state: data.state
    }, {
      where: {
        userName: data.userName
      }
    })
  }

  /**
   * 获取账号列表
   * @returns 
   */
  static async getUserlist() {
    return await User.findAndCountAll();
  }

  /**
   * 根据状态筛选账号列表
   * @param {*} state 
   * @returns 
   */
  static async getUserByState(state) {
    return await User.findOne({
      where: {
        state
      }
    })
  }
}

module.exports = PersonModel;