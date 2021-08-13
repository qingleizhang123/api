const ArticleTypeModel = require('../model/articleType');

class ArticleTypeController {
  static async create(ctx){
    let req = ctx.request.body;
    if(req.category){
      try{
        const ret = await ArticleTypeModel.createArticleType(req);
        const data = await ArticleTypeModel.getArticleTypeDetail(ret.id);

        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '创建文章类型成功',
          data
        }
      }catch(err){
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '创建失败',
          err
        }
      }
    }else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }

  static async list(ctx) {
    let req = ctx.request.body;
    try{
      const data = await ArticleTypeModel.getArticleTypeList();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    }catch(err){
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        err
      }
    }
  }
}

module.exports = ArticleTypeController;