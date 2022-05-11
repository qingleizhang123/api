const db = require('../config/db');

const Sequelize = db.sequelize;

const Prothesis = Sequelize.import('../schema/prothesis');
Prothesis.sync({force:false});

class ProthesisModel {
  /**
   * 新建假体
   * @param {*} data 
   * @returns 
   */
  static async createProthesis(data) {
    return await Prothesis.create({
      prothesisName: data.name,
      prothesisType: data.type,
      prothesisFactory: data.factory,
      tag: data.tag,
      assemblyPoint: data.assembly,
      description: data.desc,
    });
  }

  /**
   * 获取假体列表
   * @returns 
   */
  static async getProthesislist(data) {
    return await Prothesis.findAndCountAll({
      offset: (data.page - 1) * data.pageSize,
      limit: data.pageSize
    });
  }

  /**
   * 删除假体数据
   * @param {*} data 
   * @returns 
   */
   static async deleteProthesis(id) {
    return await Prothesis.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = ProthesisModel;