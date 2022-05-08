const ProthesisModel = require('../model/prothesis');

class ProthesisControler {
  static async create(ctx) {
    let req = ctx.request.body;
    if (req.name && req.type && req.factory) {
      try {
        console.log(req);
        let data = await ProthesisModel.createProthesis(req);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '新建假体成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '新建假体失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }

  static async delete(ctx) {
    let req = ctx.request.body;
    if (req.id) {
      try {
        let data = await ProthesisModel.deleteProthesis(req.id);
        ctx.response.status = 200;
        ctx.response.body = {
          code: 200,
          msg: '删除假体成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.response.body = {
          code: 412,
          msg: '删除假体失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }

  static async list(ctx) {
    let req = ctx.request.body;
    if (req.page && req.pageSize) {
      try{
        const data = await ProthesisModel.getProthesislist(req);
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
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }
}

module.exports = ProthesisControler;