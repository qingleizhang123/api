const db = require('../config/db');

const Sequelize = db.sequelize;

const ArticleType = Sequelize.import('../schema/articleType');
ArticleType.sync({force:false});

class ArticleTypeModel {
  static async createArticleType(data) {
    return await ArticleType.create({
      category:data.category
    });
  }

  static async getArticleTypeDetail(id) {
    return await ArticleType.findOne({
      where: {
        id
      }
    })
  }

  static async getArticleTypeList() {
    return await ArticleType.findAndCountAll();
  }
}

module.exports = ArticleTypeModel;