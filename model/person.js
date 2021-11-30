const db = require('../config/db');

const Sequelize = db.sequelize;

const Person = Sequelize.import('../schema/person');
Person.sync({force:false});

class PersonModel {
  /**
   * 新建博主信息
   * @param {*} data 
   * @returns 
   */
  static async createPersonResume(data) {
    return await Person.create({
      name: data.name,
      description: data.description
    });
  }

  /**
   * 获取博主详情
   * @returns {Promise<Model>}
   */
  static async getPersonResume() {
    return await Person.findOne();
  }

  /**
   * 修改博主简介描述信息
   * @param {*} name 博主名称
   * @param {*} description 简介描述
   * @returns 
   */
  static async updatePersonResume(data) {
    return await Person.update({
      description: data.description
    }, {
      where: {
        name: data.name
      }
    });
  }

  /**
   * 删除博主信息
   * @param {*} data 
   * @returns 
   */
  static async deletePersonResume(data) {
    return await Person.destroy({
      where: {
        name: data.name
      }
    })
  }
}

module.exports = PersonModel;