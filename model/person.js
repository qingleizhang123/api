const db = require('../config/db');

const Sequelize = db.sequelize;

const Person = Sequelize.import('../schema/person');
Person.sync({force:false});

class PersonModel {
  /**
   * 获取博主详情
   * @returns {Promise<Model>}
   */
  static async getPersonResume() {
    return await Person.findOne();
  }
}

module.exports = PersonModel;