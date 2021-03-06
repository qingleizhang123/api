const ArticleModel = require('../model/article');

class articleController {
  /**
   * 创建文章
   * @param {*} ctx 
   */
  static async create(ctx){
    let req = ctx.request.body;
    if(req.title&&req.author&&req.content&&req.articleTypeId){
      try{
        //创建文章模型
        const ret = await ArticleModel.createArticle(req);
        //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
        const data = await ArticleModel.getArticleDetail(ret.id);

        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '创建文章成功',
          data
        }
      }catch(err){
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '创建文章失败',
          err
        }
      }
    }else {
      ctx.response.status = 416;
      ctx.body = {
        code: 200,
        msg: '参数不齐全'
      }
    }
  }

  static async list(ctx) {
    let articleTypeId = ctx.params.articleTypeId;
    if(articleTypeId){
      try{
        // 获取选择类型的文章列表
        let data = await ArticleModel.getArticleListByType(articleTypeId);
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
          data
        }
      }
    }else{
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不全'
      }
    }
  }

  static async detail(ctx){
    let id = ctx.params.id;
    if(id){
      try{
        // 查询文章详情模型
        let data = await ArticleModel.getArticleDetail(id);
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
          data
        }
      }
    }else{
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '文章ID必须传'
      }
    }
  }
}

module.exports = articleController;